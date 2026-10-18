const POINT_EPS_DEG = 0.0005;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function pointBbox(lat, lon, eps = POINT_EPS_DEG) {
  return [clamp(lon - eps, -180, 180), clamp(lat - eps, -90, 90), clamp(lon + eps, -180, 180), clamp(lat + eps, -90, 90)];
}

function inRing(ring, x, y) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function inPolygon(rings, x, y) {
  if (!rings.length || !inRing(rings[0], x, y)) return false;
  return !rings.slice(1).some((hole) => inRing(hole, x, y));
}

export function pointInGeometry(geometry, lon, lat) {
  if (!geometry) return false;
  if (geometry.type === "Polygon") return inPolygon(geometry.coordinates, lon, lat);
  if (geometry.type === "MultiPolygon") return geometry.coordinates.some((poly) => inPolygon(poly, lon, lat));
  return false;
}
