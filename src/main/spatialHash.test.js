// src/main/spatialHash.test.js
import { test, expect } from "vitest";
import { candidatePairs } from "./spatialHash.js";

// point(x,y) with a radius the hash uses to size buckets
const p = (x, y) => ({ x, y });

test("near fighters are returned as a candidate pair", () => {
  const pts = [p(0, 0), p(5, 5), p(1000, 1000)];
  const pairs = candidatePairs(pts, 50); // cellSize 50
  expect(pairs).toContainEqual([0, 1]);
});

test("far fighters are NOT paired", () => {
  const pts = [p(0, 0), p(1000, 1000)];
  expect(candidatePairs(pts, 50)).toEqual([]);
});

test("each near pair appears exactly once", () => {
  const pts = [p(0, 0), p(1, 1), p(2, 2)];
  const pairs = candidatePairs(pts, 50);
  const key = (a) => a.join(",");
  expect(new Set(pairs.map(key)).size).toBe(pairs.length);
});
