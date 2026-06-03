// src/main/spatialHash.js
// Uniform-grid broad phase. Returns unique [i,j] index pairs whose points fall
// in the same or neighbouring cells. Replaces the naive all-vs-all loop.
export function candidatePairs(points, cellSize) {
  const buckets = new Map();
  const key = (cx, cy) => cx + "," + cy;
  for (let i = 0; i < points.length; i++) {
    const cx = Math.floor(points[i].x / cellSize);
    const cy = Math.floor(points[i].y / cellSize);
    const k = key(cx, cy);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(i);
  }
  const pairs = [];
  const seen = new Set();
  const addPair = (a, b) => {
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const pk = lo + "," + hi;
    if (lo !== hi && !seen.has(pk)) { seen.add(pk); pairs.push([lo, hi]); }
  };
  for (let i = 0; i < points.length; i++) {
    const cx = Math.floor(points[i].x / cellSize);
    const cy = Math.floor(points[i].y / cellSize);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const neighbours = buckets.get(key(cx + dx, cy + dy));
        if (!neighbours) continue;
        for (const j of neighbours) if (j !== i) addPair(i, j);
      }
    }
  }
  return pairs;
}
