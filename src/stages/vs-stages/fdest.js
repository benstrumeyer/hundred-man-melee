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
  platform: [
    // row 1 (low)
    [new Vec2D(-270, 45), new Vec2D(-210, 45)], [new Vec2D(-160, 45), new Vec2D(-100, 45)], [new Vec2D(-30, 45), new Vec2D(30, 45)], [new Vec2D(100, 45), new Vec2D(160, 45)], [new Vec2D(210, 45), new Vec2D(270, 45)],
    // row 2 (mid, offset)
    [new Vec2D(-220, 90), new Vec2D(-160, 90)], [new Vec2D(-80, 90), new Vec2D(-20, 90)], [new Vec2D(20, 90), new Vec2D(80, 90)], [new Vec2D(160, 90), new Vec2D(220, 90)],
    // row 3 (high)
    [new Vec2D(-150, 140), new Vec2D(-90, 140)], [new Vec2D(-30, 140), new Vec2D(30, 140)], [new Vec2D(90, 140), new Vec2D(150, 140)],
    // row 4 (top)
    [new Vec2D(-30, 190), new Vec2D(30, 190)]
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
  scale: 2.0,
  offset: [600, 400],
  movingPlats: [],
  movingPlatforms: function () {
  }
};
