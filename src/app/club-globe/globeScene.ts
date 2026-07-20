import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getClubTexture, disposeTextureCache } from './markerTextures';
import { buildCityLabels, getCityLabelTexture, disposeCityLabelCache, type CityLabel } from './cityLabels';

// Imperative three.js engine behind <ClubGlobe>. Same pattern as Leaflet in
// PlayerMap.tsx: one class owning the canvas, React only drives it via props.
// Rendering is on-demand (dirty flag) so an idle globe costs ~nothing.
//
// Look: NASA day texture (light theme) / night texture (dark theme) with a
// topology bump map, country borders and club-city labels — plus the club
// dot/crest-sprite marker layers.

export interface GlobeClub {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  crest: string | null;
  colors?: [string, string];
}

export interface GlobeSceneOptions {
  canvas: HTMLCanvasElement;
  borders: number[][]; // polylines of [lat*100, lng*100, ...]
  clubs: GlobeClub[];
  onClubClick?: (id: string) => void;
  onHoverChange?: (id: string | null) => void;
}

const R = 1;                  // globe radius
const BORDER_ALT = 1.0015;    // border lines sit just above the sphere
const CLUB_ALT = 1.006;
const SPRITE_ALT = 1.015;
const LABEL_ALT = 1.010;
const SPRITE_ZOOM = 2.1;      // camera distance below which crest sprites appear
const LABEL_ZOOM = 1.6;       // camera distance below which city labels appear
const CAM_MIN = 1.07;
const CAM_MAX = 3.6;
const CAM_START = 2.9;

const TEXTURE_DAY = '/globe/earth-day.jpg';
const TEXTURE_NIGHT = '/globe/earth-night.jpg';
const TEXTURE_TOPOLOGY = '/globe/earth-topology.png';

export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

interface ThemeColors {
  sphere: THREE.Color;   // flat fallback while textures load
  club: THREE.Color;
  halo: THREE.Color;
  borderOpacity: number;
}

function readThemeColors(): ThemeColors {
  const style = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => new THREE.Color(style.getPropertyValue(name).trim() || fallback);
  const isLight = document.documentElement.dataset.theme === 'light';
  return {
    sphere: get('--bg-card', '#0D0D0D'),
    club: get('--cta', '#D93B1F'),
    // Vaste atmosferische blauwtinten — passend bij de realistische aarde.
    halo: new THREE.Color(isLight ? '#7FB4E8' : '#2E5C8F'),
    borderOpacity: isLight ? 0.6 : 0.32,
  };
}

// Round, size-attenuated dots with a per-point alpha attribute (the filter
// fades clubs out without touching geometry).
const DOT_VERTEX = /* glsl */ `
  attribute float alpha;
  varying float vAlpha;
  uniform float uSize;
  uniform float uScale;
  uniform float uMaxPx;
  void main() {
    vAlpha = alpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(uSize * uScale / -mv.z, uMaxPx);
    gl_Position = projectionMatrix * mv;
  }
`;
const DOT_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(uColor, uOpacity * vAlpha);
  }
`;

// Soft atmosphere rim so the sphere lifts off the page background.
const HALO_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const HALO_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(uColor, 1.0) * intensity;
  }
`;

function makeDotMaterial(color: THREE.Color, worldSize: number, opacity: number, maxPx: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: DOT_VERTEX,
    fragmentShader: DOT_FRAGMENT,
    uniforms: {
      uColor: { value: color },
      uSize: { value: worldSize },
      uScale: { value: 1 },
      uOpacity: { value: opacity },
      uMaxPx: { value: maxPx },
    },
    transparent: true,
    depthWrite: false,
  });
}

export class GlobeScene {
  private readonly canvas: HTMLCanvasElement;
  private readonly clubs: GlobeClub[];
  private readonly onClubClick?: (id: string) => void;
  private readonly onHoverChange?: (id: string | null) => void;

  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  private sphereMat: THREE.MeshPhongMaterial;
  private clubMat: THREE.ShaderMaterial;
  private haloMat: THREE.ShaderMaterial;
  private borderMat: THREE.LineBasicMaterial;
  private dayTexture: THREE.Texture | null = null;
  private nightTexture: THREE.Texture | null = null;

  private clubPoints: THREE.Points;
  private clubAlpha: Float32Array;
  private clubPositions: THREE.Vector3[];
  private clubIndexById = new Map<string, number>();

  private sprites = new Map<string, THREE.Sprite>();
  private spriteGroup = new THREE.Group();
  private cityLabels: CityLabel[];
  private citySprites = new Map<string, THREE.Sprite>();
  private cityGroup = new THREE.Group();
  private selectionRing: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;

  private raycaster = new THREE.Raycaster();
  private visibleIds: Set<string> | null = null;
  private selectedId: string | null = null;
  private hoveredId: string | null = null;

  private raf = 0;
  private needsRender = true;
  private autoRotate: boolean;
  private reducedMotion: boolean;
  private focusAnim: { from: THREE.Vector3; to: THREE.Vector3; start: number; duration: number } | null = null;
  private lastHoverCheck = 0;
  private pointerDown: { x: number; y: number } | null = null;

  private themeObserver: MutationObserver;
  private resizeObserver: ResizeObserver;
  private disposed = false;

  constructor(opts: GlobeSceneOptions) {
    this.canvas = opts.canvas;
    this.clubs = opts.clubs;
    this.onClubClick = opts.onClubClick;
    this.onHoverChange = opts.onHoverChange;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.autoRotate = !this.reducedMotion;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
    // Start centered on Europe, where most v1 clubs are.
    this.camera.position.copy(latLngToVector3(46, 8, CAM_START));

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.45;
    this.controls.zoomSpeed = 0.6;
    this.controls.minDistance = CAM_MIN;
    this.controls.maxDistance = CAM_MAX;
    this.controls.addEventListener('change', this.requestRender);
    this.controls.addEventListener('start', this.stopAutoRotate);

    const colors = readThemeColors();

    // Lighting: soft ambient + a headlight that follows the camera, so the
    // visible hemisphere is always evenly lit with a hint of relief.
    this.scene.add(new THREE.AmbientLight(0xffffff, 2.4));
    const headlight = new THREE.DirectionalLight(0xffffff, 1.1);
    headlight.position.set(0.4, 0.6, 1);
    this.camera.add(headlight);
    this.scene.add(this.camera);

    // Base sphere: flat theme colour until the NASA textures arrive.
    this.sphereMat = new THREE.MeshPhongMaterial({ color: colors.sphere, shininess: 4, bumpScale: 0.02 });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(R, 96, 96), this.sphereMat);
    sphere.renderOrder = 0;
    this.scene.add(sphere);
    this.loadEarthTextures();

    // Atmosphere rim.
    this.haloMat = new THREE.ShaderMaterial({
      vertexShader: HALO_VERTEX,
      fragmentShader: HALO_FRAGMENT,
      uniforms: { uColor: { value: colors.halo.clone() } },
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 64, 64), this.haloMat);
    halo.renderOrder = 0;
    this.scene.add(halo);

    // Country borders (incl. coastlines) as one LineSegments draw call.
    const segments: number[] = [];
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    for (const line of opts.borders) {
      for (let i = 0; i + 3 < line.length; i += 2) {
        a.copy(latLngToVector3(line[i] / 100, line[i + 1] / 100, BORDER_ALT));
        b.copy(latLngToVector3(line[i + 2] / 100, line[i + 3] / 100, BORDER_ALT));
        segments.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const borderGeo = new THREE.BufferGeometry();
    borderGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(segments), 3));
    this.borderMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: colors.borderOpacity,
      depthWrite: false,
    });
    const borderLines = new THREE.LineSegments(borderGeo, this.borderMat);
    borderLines.renderOrder = 1;
    this.scene.add(borderLines);

    // Club dots. Clubs sharing a stadium (San Siro, Stadio Olimpico) get a
    // tiny longitude nudge so both markers stay visible and clickable.
    const seenCoords = new Map<string, number>();
    this.clubPositions = this.clubs.map((c) => {
      const key = `${c.lat.toFixed(3)},${c.lng.toFixed(3)}`;
      const dupes = seenCoords.get(key) ?? 0;
      seenCoords.set(key, dupes + 1);
      return latLngToVector3(c.lat, c.lng + dupes * 0.22, CLUB_ALT);
    });
    const clubPos = new Float32Array(this.clubs.length * 3);
    this.clubAlpha = new Float32Array(this.clubs.length).fill(1);
    this.clubs.forEach((c, i) => {
      this.clubIndexById.set(c.id, i);
      clubPos.set([this.clubPositions[i].x, this.clubPositions[i].y, this.clubPositions[i].z], i * 3);
    });
    const clubGeo = new THREE.BufferGeometry();
    clubGeo.setAttribute('position', new THREE.BufferAttribute(clubPos, 3));
    clubGeo.setAttribute('alpha', new THREE.BufferAttribute(this.clubAlpha, 1));
    this.clubMat = makeDotMaterial(colors.club.clone(), 0.02, 0.95, 14 * this.renderer.getPixelRatio());
    this.clubPoints = new THREE.Points(clubGeo, this.clubMat);
    this.clubPoints.renderOrder = 2;
    this.scene.add(this.clubPoints);

    this.cityGroup.renderOrder = 3;
    this.scene.add(this.cityGroup);
    this.cityLabels = buildCityLabels(this.clubs);

    this.spriteGroup.renderOrder = 4;
    this.scene.add(this.spriteGroup);

    // Selection ring around the active club, lying flat on the sphere.
    this.selectionRing = new THREE.Mesh(
      new THREE.RingGeometry(0.036, 0.044, 48),
      new THREE.MeshBasicMaterial({ color: colors.club, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false }),
    );
    this.selectionRing.visible = false;
    this.selectionRing.renderOrder = 5;
    this.scene.add(this.selectionRing);

    // Events.
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
    document.addEventListener('visibilitychange', this.handleVisibility);

    this.themeObserver = new MutationObserver(() => this.applyTheme());
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas.parentElement ?? this.canvas);

    this.resize();
    this.tick();
  }

  // ── Public API ──────────────────────────────────────────────────────

  setFilter(ids: Set<string> | null): void {
    this.visibleIds = ids;
    this.clubs.forEach((c, i) => {
      this.clubAlpha[i] = this.isVisible(c.id) ? 1 : 0;
    });
    (this.clubPoints.geometry.getAttribute('alpha') as THREE.BufferAttribute).needsUpdate = true;
    for (const [id, sprite] of this.sprites) {
      if (!this.isVisible(id)) sprite.visible = false;
    }
    for (const label of this.cityLabels) {
      const sprite = this.citySprites.get(label.city);
      if (sprite && !this.isCityVisible(label)) sprite.visible = false;
    }
    if (this.selectedId && !this.isVisible(this.selectedId)) this.setSelected(null);
    this.requestRender();
  }

  setSelected(id: string | null): void {
    this.selectedId = id;
    const idx = id ? this.clubIndexById.get(id) : undefined;
    if (id && idx !== undefined) {
      const pos = this.clubPositions[idx].clone().normalize().multiplyScalar(SPRITE_ALT);
      this.selectionRing.position.copy(pos);
      this.selectionRing.lookAt(pos.clone().multiplyScalar(2)); // flat on the sphere surface
      this.selectionRing.visible = true;
    } else {
      this.selectionRing.visible = false;
    }
    this.requestRender();
  }

  focusClub(id: string): void {
    const idx = this.clubIndexById.get(id);
    if (idx === undefined) return;
    this.stopAutoRotate();
    const distance = Math.min(Math.max(this.camera.position.length(), CAM_MIN + 0.15), 1.6);
    const to = this.clubPositions[idx].clone().normalize().multiplyScalar(distance);
    if (this.reducedMotion) {
      this.camera.position.copy(to);
      this.camera.lookAt(0, 0, 0);
      this.requestRender();
      return;
    }
    this.focusAnim = {
      from: this.camera.position.clone(),
      to,
      start: performance.now(),
      duration: 700,
    };
    this.requestRender();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.controls.dispose();
    this.themeObserver.disconnect();
    this.resizeObserver.disconnect();
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
      if (obj instanceof THREE.Sprite) obj.material.dispose();
    });
    this.dayTexture?.dispose();
    this.nightTexture?.dispose();
    disposeTextureCache();
    disposeCityLabelCache();
    this.renderer.dispose();
  }

  // ── Internals ───────────────────────────────────────────────────────

  private isVisible(id: string): boolean {
    return this.visibleIds === null || this.visibleIds.has(id);
  }

  private isCityVisible(label: CityLabel): boolean {
    return label.clubIds.some((id) => this.isVisible(id));
  }

  private requestRender = (): void => {
    this.needsRender = true;
  };

  private stopAutoRotate = (): void => {
    this.autoRotate = false;
  };

  private loadEarthTextures(): void {
    const loader = new THREE.TextureLoader();
    const maxAniso = Math.min(this.renderer.capabilities.getMaxAnisotropy(), 8);
    const prep = (t: THREE.Texture) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
      return t;
    };
    loader.load(TEXTURE_DAY, (t) => {
      if (this.disposed) return;
      this.dayTexture = prep(t);
      this.applyTheme();
    });
    loader.load(TEXTURE_NIGHT, (t) => {
      if (this.disposed) return;
      this.nightTexture = prep(t);
      this.applyTheme();
    });
    loader.load(TEXTURE_TOPOLOGY, (t) => {
      if (this.disposed) return;
      t.anisotropy = maxAniso;
      this.sphereMat.bumpMap = t;
      this.sphereMat.needsUpdate = true;
      this.requestRender();
    });
  }

  private applyTheme(): void {
    const colors = readThemeColors();
    const isLight = document.documentElement.dataset.theme === 'light';
    const map = isLight ? this.dayTexture : this.nightTexture;
    if (map) {
      this.sphereMat.map = map;
      this.sphereMat.color.set(0xffffff); // no tint over the texture
    } else {
      this.sphereMat.map = null;
      this.sphereMat.color.copy(colors.sphere);
    }
    this.sphereMat.needsUpdate = true;
    (this.clubMat.uniforms.uColor.value as THREE.Color).copy(colors.club);
    (this.haloMat.uniforms.uColor.value as THREE.Color).copy(colors.halo);
    this.borderMat.opacity = colors.borderOpacity;
    this.selectionRing.material.color.copy(colors.club);
    this.requestRender();
  }

  private resize(): void {
    const parent = this.canvas.parentElement;
    const w = parent?.clientWidth ?? this.canvas.clientWidth;
    const h = parent?.clientHeight ?? this.canvas.clientHeight;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const scale = (h * this.renderer.getPixelRatio()) / (2 * Math.tan((this.camera.fov * Math.PI) / 360));
    this.clubMat.uniforms.uScale.value = scale;
    this.requestRender();
  }

  private handleVisibility = (): void => {
    if (document.hidden) {
      cancelAnimationFrame(this.raf);
    } else if (!this.disposed) {
      this.requestRender();
      this.tick();
    }
  };

  private tick = (): void => {
    if (this.disposed || document.hidden) return;
    this.raf = requestAnimationFrame(this.tick);

    if (this.autoRotate) {
      // Slow idle spin until the user grabs the globe.
      const offset = this.camera.position.clone();
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.0009);
      this.camera.position.copy(offset);
      this.camera.lookAt(0, 0, 0);
      this.needsRender = true;
    }

    if (this.focusAnim) {
      const { from, to, start, duration } = this.focusAnim;
      const t = Math.min((performance.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      // Interpolate over the sphere surface (slerp) to keep a constant-ish altitude.
      const fromDir = from.clone().normalize();
      const toDir = to.clone().normalize();
      const dir = fromDir.clone().lerp(toDir, ease).normalize();
      const dist = THREE.MathUtils.lerp(from.length(), to.length(), ease);
      this.camera.position.copy(dir.multiplyScalar(dist));
      this.camera.lookAt(0, 0, 0);
      if (t >= 1) this.focusAnim = null;
      this.needsRender = true;
    }

    // Fine rotation control near the surface, normal speed when zoomed out.
    const camDist = this.camera.position.length();
    this.controls.rotateSpeed = 0.45 * THREE.MathUtils.clamp((camDist - 1) / 1.55, 0.05, 1);

    if (this.controls.update()) this.needsRender = true;
    this.updateOverlays();

    if (this.needsRender) {
      this.needsRender = false;
      this.renderer.render(this.scene, this.camera);
    }
  };

  // Crest sprites and city labels are created lazily once the camera is
  // close enough, and hidden again when filtered out or on the far side.
  private updateOverlays(): void {
    const camDist = this.camera.position.length();
    const camDir = this.camera.position.clone().normalize();
    const horizon = 1 / camDist + 0.05;
    // Roughly constant on-screen size: scale with the camera's height above
    // the sprite shell (not the globe centre), so deep zoom stays sane.
    const spriteAlt = Math.max(camDist - SPRITE_ALT, 0.02);
    const baseScale = THREE.MathUtils.clamp(0.056 * spriteAlt, 0.0035, 0.06);
    const ringScale = THREE.MathUtils.clamp(spriteAlt / (2 - SPRITE_ALT), 0.05, 1);
    if (Math.abs(this.selectionRing.scale.x - ringScale) > 0.001) {
      this.selectionRing.scale.setScalar(ringScale);
      this.needsRender = true;
    }

    const zoomedIn = camDist < SPRITE_ZOOM;
    this.clubs.forEach((club, i) => {
      const sprite = this.sprites.get(club.id);
      if (!zoomedIn) {
        if (sprite) sprite.visible = false;
        return;
      }
      const frontFacing = this.clubPositions[i].clone().normalize().dot(camDir) > horizon;
      const show = frontFacing && this.isVisible(club.id);
      if (!sprite) {
        if (!show) return;
        this.createSprite(club, i);
        return;
      }
      if (sprite.visible !== show) {
        sprite.visible = show;
        this.needsRender = true;
      }
      const target = club.id === this.hoveredId ? baseScale * 1.18 : baseScale;
      if (Math.abs(sprite.scale.x - target) > 0.0001) {
        sprite.scale.set(target, target, 1);
        this.needsRender = true;
      }
    });

    const labelsIn = camDist < LABEL_ZOOM;
    for (const label of this.cityLabels) {
      let sprite = this.citySprites.get(label.city);
      if (!labelsIn) {
        if (sprite && sprite.visible) {
          sprite.visible = false;
          this.needsRender = true;
        }
        continue;
      }
      const pos = latLngToVector3(label.lat, label.lng, LABEL_ALT);
      const frontFacing = pos.clone().normalize().dot(camDir) > horizon;
      const show = frontFacing && this.isCityVisible(label);
      if (!sprite) {
        if (!show) continue;
        sprite = this.createCitySprite(label, pos);
      }
      if (sprite.visible !== show) {
        sprite.visible = show;
        this.needsRender = true;
      }
      // Constant-ish on-screen size, smaller than the club logos.
      const aspect = (sprite.userData.aspect as number) ?? 4;
      const labelAlt = Math.max(camDist - LABEL_ALT, 0.02);
      const height = THREE.MathUtils.clamp(0.051 * labelAlt, 0.0022, 0.03);
      if (Math.abs(sprite.scale.y - height) > 0.0001) {
        sprite.scale.set(height * aspect, height, 1);
        this.needsRender = true;
      }
    }
  }

  private createSprite(club: GlobeClub, index: number): void {
    const material = new THREE.SpriteMaterial({ depthTest: true, transparent: true, opacity: 0 });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(this.clubPositions[index].clone().normalize().multiplyScalar(SPRITE_ALT));
    sprite.scale.setScalar(0.05);
    sprite.userData.clubId = club.id;
    this.sprites.set(club.id, sprite);
    this.spriteGroup.add(sprite);
    void getClubTexture(club).then((texture) => {
      if (this.disposed) return;
      material.map = texture;
      material.opacity = 1;
      material.needsUpdate = true;
      this.requestRender();
    });
  }

  private createCitySprite(label: CityLabel, pos: THREE.Vector3): THREE.Sprite {
    const { texture, aspect } = getCityLabelTexture(label.city);
    const material = new THREE.SpriteMaterial({ map: texture, depthTest: true, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(pos);
    // Anchor above centre so the text hangs just below its city point.
    sprite.center.set(0.5, 1.6);
    sprite.userData.aspect = aspect;
    sprite.scale.set(0.03 * aspect, 0.03, 1);
    this.citySprites.set(label.city, sprite);
    this.cityGroup.add(sprite);
    return sprite;
  }

  // ── Pointer interaction ─────────────────────────────────────────────

  private pickClub(event: PointerEvent): string | null {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(ndc, this.camera);

    // Crest sprites first (they visually cover the dots).
    const spriteHits = this.raycaster.intersectObjects([...this.sprites.values()].filter((s) => s.visible), false);
    if (spriteHits.length > 0) return (spriteHits[0].object.userData.clubId as string) ?? null;

    const camDist = this.camera.position.length();
    this.raycaster.params.Points.threshold = THREE.MathUtils.clamp(0.02 * (camDist - 1), 0.0015, 0.02);
    const camDir = this.camera.position.clone().normalize();
    const horizon = 1 / camDist + 0.02;
    const hits = this.raycaster.intersectObject(this.clubPoints, false);
    for (const hit of hits) {
      const idx = hit.index ?? -1;
      if (idx < 0) continue;
      const club = this.clubs[idx];
      if (!this.isVisible(club.id)) continue;
      // Ignore dots on the far side of the globe.
      if (this.clubPositions[idx].clone().normalize().dot(camDir) < horizon) continue;
      return club.id;
    }
    return null;
  }

  private handlePointerDown = (event: PointerEvent): void => {
    this.pointerDown = { x: event.clientX, y: event.clientY };
  };

  private handlePointerUp = (event: PointerEvent): void => {
    const down = this.pointerDown;
    this.pointerDown = null;
    if (!down) return;
    const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y);
    if (moved > 6) return; // it was a drag, not a click
    const id = this.pickClub(event);
    if (id) this.onClubClick?.(id);
  };

  private handlePointerMove = (event: PointerEvent): void => {
    const now = performance.now();
    if (now - this.lastHoverCheck < 40) return;
    this.lastHoverCheck = now;
    const id = this.pointerDown ? null : this.pickClub(event);
    if (id !== this.hoveredId) {
      this.hoveredId = id;
      this.canvas.style.cursor = id ? 'pointer' : 'grab';
      this.onHoverChange?.(id);
      this.requestRender();
    }
  };

  private handlePointerLeave = (): void => {
    if (this.hoveredId !== null) {
      this.hoveredId = null;
      this.onHoverChange?.(null);
      this.requestRender();
    }
  };
}
