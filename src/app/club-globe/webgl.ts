// Deliberately three-free so the shell can probe WebGL support without
// pulling the three.js chunk into the initial bundle.
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
