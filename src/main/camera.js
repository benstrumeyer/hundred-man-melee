// Pure camera solve. Given living fighters' world positions, returns the
// render transform { scale, offsetX, offsetY } MeleeLight's renderer already
// consumes as activeStage.scale / activeStage.offset[0..1].
// World→screen: sx = x*scale + offsetX ;  sy = y*(-scale) + offsetY
export function computeCamera(positions, opts) {
  const { screenW, screenH, margin, minScale, maxScale } = opts;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of positions) {
    if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
  }
  const spanX = Math.max(1e-3, (maxX - minX) * margin);
  const spanY = Math.max(1e-3, (maxY - minY) * margin);
  const scaleX = screenW / spanX;
  const scaleY = screenH / spanY;
  let scale = Math.min(scaleX, scaleY);
  scale = Math.max(minScale, Math.min(maxScale, scale));
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const offsetX = screenW / 2 - cx * scale;
  const offsetY = screenH / 2 + cy * scale; // +cy*scale because screen-y is negated
  return { scale, offsetX, offsetY };
}

// Frame-rate-independent smoothing toward a target camera, to avoid jitter.
export function smoothCamera(current, target, alpha) {
  return {
    scale: current.scale + (target.scale - current.scale) * alpha,
    offsetX: current.offsetX + (target.offsetX - current.offsetX) * alpha,
    offsetY: current.offsetY + (target.offsetY - current.offsetY) * alpha,
  };
}
