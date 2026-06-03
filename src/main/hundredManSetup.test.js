import { test, expect } from "vitest";
import { buildMatchConfig } from "./hundredManSetup.js";

// roster entries are integer character ids (Marth=0, Jigglypuff=1, Fox=2, Falco=3, C.Falcon=4)
// startingPoint entries are [x, y] arrays, matching what playerObject/physicsObject consume.

test("builds N entries: one human, rest CPU", () => {
  const cfg = buildMatchConfig(100, [2, 3], [-100, 0], [100, 0]);
  expect(cfg.playerType).toHaveLength(100);
  expect(cfg.playerType[0]).toBe(0);            // human
  expect(cfg.playerType.slice(1).every(t => t === 1)).toBe(true); // CPUs
  expect(cfg.characterSelections).toHaveLength(100);
  expect(cfg.startingPoint).toHaveLength(100);
  expect(cfg.startingFace).toHaveLength(100);
  expect(cfg.cpuDifficulty).toHaveLength(100);
});

test("round-robins characters from the roster", () => {
  const cfg = buildMatchConfig(5, [2, 3], [-100, 0], [100, 0]);
  expect(cfg.characterSelections).toEqual([2, 3, 2, 3, 2]);
});

test("spreads start positions across the given x-range", () => {
  const cfg = buildMatchConfig(10, [2], [-100, 0], [100, 0]);
  const xs = cfg.startingPoint.map(p => p[0]);
  expect(Math.min(...xs)).toBeGreaterThanOrEqual(-100);
  expect(Math.max(...xs)).toBeLessThanOrEqual(100);
  expect(new Set(xs).size).toBeGreaterThan(1); // not all stacked
});

test("single fighter does not divide by zero", () => {
  const cfg = buildMatchConfig(1, [2], [-100, 0], [100, 0]);
  expect(cfg.startingPoint).toHaveLength(1);
  expect(Number.isFinite(cfg.startingPoint[0][0])).toBe(true);
});
