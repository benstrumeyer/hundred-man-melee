// src/main/perfHud.js
// Lightweight FPS / sim-time overlay for the 100-man stress test.
let lastT = 0, frames = 0, fps = 0;
export function drawPerfHud(ctx, simMs, fightersAlive, nowMs) {
  frames++;
  if (nowMs - lastT >= 500) { fps = Math.round((frames * 1000) / (nowMs - lastT)); frames = 0; lastT = nowMs; }
  ctx.save();
  ctx.font = "16px monospace"; ctx.fillStyle = "#0f0"; ctx.textAlign = "left";
  ctx.fillText(`fps ${fps}  sim ${simMs.toFixed(1)}ms  alive ${fightersAlive}`, 12, 22);
  ctx.restore();
}
