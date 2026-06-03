// src/main/ffaRules.js
// Pure FFA resolver. `fighters` is an array of objects with {stocks, alive}.
// Mutates `alive` to false on elimination; returns indices newly eliminated,
// the winner index (or null), and whether the match is over.
export function resolveFFA(fighters) {
  const newlyEliminated = [];
  for (let i = 0; i < fighters.length; i++) {
    const fighter = fighters[i];
    if (fighter.alive && fighter.stocks <= 0) {
      fighter.alive = false;
      newlyEliminated.push(i);
    }
  }
  const aliveIndices = [];
  for (let i = 0; i < fighters.length; i++) {
    if (fighters[i].alive) aliveIndices.push(i);
  }
  const winner = aliveIndices.length === 1 ? aliveIndices[0] : null;
  return { newlyEliminated, winner, over: aliveIndices.length <= 1 };
}
