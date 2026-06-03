import { test, expect } from "vitest";
import { computeCamera } from "./camera.js";

const opts = { screenW: 800, screenH: 600, margin: 1.2, minScale: 1, maxScale: 8 };

test("centres on the midpoint of the fighters", () => {
  const cam = computeCamera([{ x: -10, y: 0 }, { x: 10, y: 0 }], opts);
  // world x=0 should map to screen centre (offsetX = screenW/2)
  expect(cam.offsetX).toBeCloseTo(400, 0);
});

test("clamps zoom to maxScale when fighters are tight", () => {
  const cam = computeCamera([{ x: 0, y: 0 }, { x: 0.01, y: 0 }], opts);
  expect(cam.scale).toBe(8);
});

test("zooms out (smaller scale) as the spread grows", () => {
  const tight = computeCamera([{ x: -10, y: 0 }, { x: 10, y: 0 }], opts).scale;
  const wide = computeCamera([{ x: -400, y: 0 }, { x: 400, y: 0 }], opts).scale;
  expect(wide).toBeLessThan(tight);
});

test("never returns scale below minScale", () => {
  const cam = computeCamera([{ x: -1e6, y: 0 }, { x: 1e6, y: 0 }], opts);
  expect(cam.scale).toBeGreaterThanOrEqual(1);
});
