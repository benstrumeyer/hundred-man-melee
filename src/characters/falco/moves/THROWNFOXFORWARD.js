import {Vec2D} from "main/util/Vec2D";
import {player} from "main/main";
export default {
  name : "THROWNFOXFORWARD",
  canEdgeCancel : false,
  canGrabLedge : [false,false],
  canBeGrabbed : false,
  offset : [[-7.74-0.08,-0.77],[-7.17-0.22,-0.03],[-7.15-0.24,0.12],[-7.34,0.13],[-7.44+0.68,0.30],[-7.65+1.67,0.49],[-8.06+2.69,0.65],[-8.77+3.47,0.72],[-10.03+4.04,0.61],[-12.03+4.61,0.38],[-12.03+4.61,0.38]],
  //[0.08,0.22,0.24,0,-0.68,-1.67,-2.69,-3.47,-4.04,-4.61]
  init : function(p,input){
    player[p].actionState = "THROWNFOXFORWARD";
    if (player[p].phys.grabbedBy < p){
      player[p].timer = -1;
    }
    else {
      player[p].timer = 0;
    }
    player[p].phys.grounded = false;
    player[p].phys.pos = new Vec2D(player[player[p].phys.grabbedBy].phys.pos.x,player[player[p].phys.grabbedBy].phys.pos.y);
    this.main(p,input);
  },
  main : function(p,input){
    player[p].timer++;
    if (!this.interrupt(p,input)){
      if (player[p].timer > 0){
        var thrower = player[player[p].phys.grabbedBy];
        if (!thrower) { return; } // grabber gone (e.g. KO'd mid-throw): don't crash
        // clamp to the last frame so timer overrun doesn't index past offset[] (was a hard crash that froze the whole game)
        var idx = Math.min(player[p].timer - 1, this.offset.length - 1);
        player[p].phys.pos = new Vec2D(thrower.phys.pos.x+this.offset[idx][0]*player[p].phys.face,thrower.phys.pos.y+this.offset[idx][1]);
      }
    }
  },
  interrupt : function(p,input){
    return false;
  }
};
