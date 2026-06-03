// src/main/ffaRules.test.js
import { test, expect } from "vitest";
import { resolveFFA } from "./ffaRules.js";

const f = (stocks, alive = true) => ({ stocks, alive });

test("marks a fighter eliminated when stocks hit 0", () => {
  const fighters = [f(1), f(0), f(2)];
  const r = resolveFFA(fighters);
  expect(r.newlyEliminated).toEqual([1]);
  expect(fighters[1].alive).toBe(false);
});

test("no winner while 2+ alive", () => {
  expect(resolveFFA([f(1), f(1)]).winner).toBe(null);
});

test("declares winner when exactly one alive remains", () => {
  const fighters = [f(2), f(0), f(0)];
  const r = resolveFFA(fighters);
  expect(r.winner).toBe(0);
  expect(r.over).toBe(true);
});

test("already-dead fighters are not re-reported", () => {
  const fighters = [f(1), f(0, false)];
  expect(resolveFFA(fighters).newlyEliminated).toEqual([]);
});
