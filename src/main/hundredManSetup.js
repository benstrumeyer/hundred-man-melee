// N-fighter match setup. Builds the parallel arrays that main.js/startGame()
// consume for a free-for-all of 1 human (port 0) + (count-1) CPUs, removing
// MeleeLight's hardcoded 4-player cap.
//
// This module is pure (no main.js import) so it can be unit-tested in the Node
// environment. The match starter (startHundredManMatch) lives in main.js, where
// applyMatchConfig/setStageSelect/startGame are in scope.

// Character ids are integer indices into `chars` (see src/menus/css.js):
//   Marth=0, Jigglypuff=1, Fox=2, Falco=3, C.Falcon=4.
// startingPoint entries are [x, y] arrays, which physicsObject() consumes as
// `new Vec2D(pos[0], pos[1])` (src/main/player.js).

// Pure: produce the parallel arrays startGame() consumes, for `count` fighters.
// index 0 = human (playerType 0), the rest = CPU (playerType 1); characters are
// round-robined from `roster`; start positions are spread evenly between
// leftPos..rightPos (each an [x, y] array).
export function buildMatchConfig(count, roster, leftPos, rightPos) {
  const characterSelections = [];
  const startingPoint = [];
  const startingFace = [];
  const playerType = [];
  const cpuDifficulty = [];
  // Lay fighters out in a GRID within the [leftPos..rightPos] x-range, stacking
  // rows upward from leftPos[1] so they rain down onto the stage spread out
  // (a single packed line at one height makes them murder-pile / fall off).
  const minX = leftPos[0];
  const maxX = rightPos[0];
  const baseY = leftPos[1];
  const cols = Math.max(1, Math.ceil(Math.sqrt(count)));
  const rowGap = 22; // world units between stacked rows
  for (let i = 0; i < count; i++) {
    characterSelections.push(roster[i % roster.length]);
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = cols === 1 ? (minX + maxX) / 2 : minX + (maxX - minX) * (col / (cols - 1));
    const y = baseY + row * rowGap;
    startingPoint.push([x, y]);
    startingFace.push(x < 0 ? 1 : -1);
    playerType.push(i === 0 ? 0 : 1);
    cpuDifficulty.push(3);
  }
  return { characterSelections, startingPoint, startingFace, playerType, cpuDifficulty };
}

// Default FFA roster, round-robined across fighters: Fox, Falco, C.Falcon, Marth, Jigglypuff.
export const defaultRoster = [2, 3, 4, 0, 1];
