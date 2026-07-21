import maplibregl from 'maplibre-gl';
import { badgeInitials, badgeColor } from '@/lib/badge';

// Imperative MapLibre engine behind <ClubGlobe> (successor of the three.js
// GlobeScene, same public API). Globe projection far out, seamlessly a crisp
// vector map when zoomed in; tiles/glyphs come from OpenFreeMap, the style
// JSONs live in public/map-styles and follow the Scorepath palette.

export interface MapClub {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  crest: string | null;
  colors?: [string, string];
}

export interface ClubMapOptions {
  container: HTMLElement;
  clubs: MapClub[];
  onClubClick?: (id: string) => void;
}

const LOGO_ZOOM = 4.6;     // vanaf deze zoom tonen markers het clublogo i.p.v. een stip
const FOCUS_ZOOM = 8.5;    // waar flyTo op een club landt
const AUTOROTATE_MAX_ZOOM = 3.2;

function styleUrl(): string {
  const isLight = document.documentElement.dataset.theme === 'light';
  return isLight ? '/map-styles/light.json' : '/map-styles/dark.json';
}

export class ClubMap {
  private map: maplibregl.Map;
  private markerEls = new Map<string, HTMLButtonElement>();
  private visibleIds: Set<string> | null = null;
  private selectedId: string | null = null;
  private autoRotate: boolean;
  private readonly reducedMotion: boolean;
  private raf = 0;
  private themeObserver: MutationObserver;
  private disposed = false;

  constructor(opts: ClubMapOptions) {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.autoRotate = !this.reducedMotion;

    this.map = new maplibregl.Map({
      container: opts.container,
      style: styleUrl(),
      center: [8, 46],
      zoom: 2.1,
      minZoom: 1,
      maxZoom: 16,
      attributionControl: { compact: true },
      // Vlakke top-down beleving: geen pitch/rotate, dat leidt hier alleen af.
      pitchWithRotate: false,
      dragRotate: false,
      touchPitch: false,
    });
    this.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    this.map.keyboard.disableRotation();
    // Belt-and-braces naast "projection" in de stijl-JSON.
    this.map.on('style.load', () => this.map.setProjection({ type: 'globe' }));

    // Clubs die een stadion delen (Letzigrund, San Siro, Teddy, ...) krijgen
    // een kleine lengtegraad-verschuiving zodat beide markers klikbaar blijven.
    const seenCoords = new Map<string, number>();
    for (const club of opts.clubs) {
      const key = `${club.lat.toFixed(4)},${club.lng.toFixed(4)}`;
      const dupes = seenCoords.get(key) ?? 0;
      seenCoords.set(key, dupes + 1);
      const el = this.buildMarkerElement(club, opts.onClubClick);
      this.markerEls.set(club.id, el);
      new maplibregl.Marker({ element: el })
        .setLngLat([club.lng + dupes * 0.006, club.lat])
        .addTo(this.map);
    }

    this.map.on('zoom', this.updateMarkerMode);
    this.updateMarkerMode();

    const stopRotate = () => {
      this.autoRotate = false;
    };
    this.map.on('mousedown', stopRotate);
    this.map.on('touchstart', stopRotate);
    this.map.on('wheel', stopRotate);
    if (this.autoRotate) this.spin();

    this.themeObserver = new MutationObserver(() => {
      this.map.setStyle(styleUrl());
    });
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // ── Public API (zelfde contract als de oude GlobeScene) ─────────────

  setFilter(ids: Set<string> | null): void {
    this.visibleIds = ids;
    for (const [id, el] of this.markerEls) {
      el.classList.toggle('club-marker--hidden', !(ids === null || ids.has(id)));
    }
  }

  setSelected(id: string | null): void {
    if (this.selectedId) this.markerEls.get(this.selectedId)?.classList.remove('club-marker--selected');
    this.selectedId = id;
    if (id) this.markerEls.get(id)?.classList.add('club-marker--selected');
  }

  focusClub(id: string): void {
    const el = this.markerEls.get(id);
    if (!el) return;
    this.autoRotate = false;
    const lngLat = JSON.parse(el.dataset.lngLat ?? '[8,46]') as [number, number];
    const target = { center: lngLat as maplibregl.LngLatLike, zoom: Math.max(this.map.getZoom(), FOCUS_ZOOM) };
    if (this.reducedMotion) this.map.jumpTo(target);
    else this.map.flyTo({ ...target, duration: 1400, essential: true });
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.themeObserver.disconnect();
    this.map.remove(); // ruimt ook de marker-elementen op
    this.markerEls.clear();
  }

  // ── Internals ───────────────────────────────────────────────────────

  private buildMarkerElement(club: MapClub, onClick?: (id: string) => void): HTMLButtonElement {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'club-marker';
    el.setAttribute('aria-label', club.name);
    el.dataset.lngLat = JSON.stringify([club.lng, club.lat]);

    const ring = document.createElement('span');
    ring.className = 'club-marker__ring';
    el.appendChild(ring);

    const dot = document.createElement('span');
    dot.className = 'club-marker__dot';
    el.appendChild(dot);

    if (club.crest) {
      const img = document.createElement('img');
      img.className = 'club-marker__logo';
      img.src = club.crest;
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      el.appendChild(img);
    } else {
      const badge = document.createElement('span');
      badge.className = 'club-marker__logo club-marker__badge';
      badge.style.background = club.colors?.[0] ?? badgeColor(club.id);
      badge.textContent = badgeInitials(club.name);
      el.appendChild(badge);
    }

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick?.(club.id);
    });
    return el;
  }

  private updateMarkerMode = (): void => {
    const logoMode = this.map.getZoom() >= LOGO_ZOOM;
    for (const el of this.markerEls.values()) {
      el.classList.toggle('club-marker--logo', logoMode);
    }
  };

  // Trage idle-rotatie van de globe tot de eerste interactie.
  private spin = (): void => {
    if (this.disposed || !this.autoRotate) return;
    this.raf = requestAnimationFrame(this.spin);
    if (this.map.getZoom() > AUTOROTATE_MAX_ZOOM || this.map.isMoving()) return;
    const center = this.map.getCenter();
    center.lng += 0.015;
    this.map.jumpTo({ center });
  };
}
