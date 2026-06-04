import {Box2D} from "../../main/util/Box2D";
import {Vec2D} from "../../main/util/Vec2D";

/*eslint indent:0*/

// Widened, multi-tier arena for the 100-man mode: a big flat main platform
// (x = [-300, 300]) plus many Battlefield-style pass-through platforms in four
// ascending rows, so a large field of fighters has terrain to brawl across.
// The dynamic-zoom camera frames the swarm; default scale is lowered to fit.
export default {
  name : "fdest",
  box: [],
  polygon : [ [ new Vec2D(-300, 0), new Vec2D(300, 0), new Vec2D(300, -40), new Vec2D(-300, -40) ]],
  // Battlefield-height tiers (~27 units apart, like real Battlefield's 27.2/54.4)
  // so fighters can single-jump ground -> tier1 -> tier2 -> ... and CPUs reach them.
  platform: [
    // tier 1 (y=27, one jump from the ground)
    [new Vec2D(-270, 27), new Vec2D(-210, 27)], [new Vec2D(-150, 27), new Vec2D(-90, 27)], [new Vec2D(-30, 27), new Vec2D(30, 27)], [new Vec2D(90, 27), new Vec2D(150, 27)], [new Vec2D(210, 27), new Vec2D(270, 27)],
    // tier 2 (y=54, a jump from tier 1)
    [new Vec2D(-230, 54), new Vec2D(-170, 54)], [new Vec2D(-70, 54), new Vec2D(-10, 54)], [new Vec2D(10, 54), new Vec2D(70, 54)], [new Vec2D(170, 54), new Vec2D(230, 54)],
    // tier 3 (y=81)
    [new Vec2D(-130, 81), new Vec2D(-70, 81)], [new Vec2D(-30, 81), new Vec2D(30, 81)], [new Vec2D(70, 81), new Vec2D(130, 81)],
    // tier 4 (y=108)
    [new Vec2D(-30, 108), new Vec2D(30, 108)]
  ],
  ground: [[new Vec2D(-300, 0), new Vec2D(300, 0)]],
  ceiling: [[new Vec2D(-300, -40), new Vec2D(300, -40)]],
  wallL: [[new Vec2D(-300, 0), new Vec2D(-300, -40)]],
  wallR: [[new Vec2D(300, 0), new Vec2D(300, -40)]],
  startingPoint: [new Vec2D(-180, 10), new Vec2D(180, 10), new Vec2D(-60, 10), new Vec2D(60, 10)],
  startingFace: [1, -1, 1, -1],
  respawnPoints: [new Vec2D(48, 45), new Vec2D(-48, 45), new Vec2D(150, 45), new Vec2D(-150, 45)],
  respawnFace: [1, -1, 1, -1],
  blastzone: new Box2D([-450, -200], [450, 300]),
  ledge: [["ground", 0, 0], ["ground", 0, 1]],
  ledgePos: [new Vec2D(-300, 0), new Vec2D(300, 0)],
  scale: 1.5,
  offset: [600, 360],
  movingPlats: [],
  movingPlatforms: function () {
  }
};
