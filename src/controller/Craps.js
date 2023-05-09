import Side from "../model/Side.js";
import Crap from "../model/Crap.js";

//import Action Types
import {ROLL_DICE_AGAIN, ROLL_DICE_FROM_INACTIVE, DELETE_DICE, DONT_POINT, POINT, TURN_OFF_DICE
} from "../utils/actionTypes.js";

//import colors
import { YELLOW, BLUE, RED, GREEN } from "../utils/colors.js";
import { NUMBER_OF_CRAPS } from "../utils/GameConstans.js";

//import Avatars





//define sides for the crapsa
const Meeple = new Side("Meeple", GREEN, "Mepple" , ROLL_DICE_AGAIN, true);
const SpaceCraft = new Side("SpaceCraft", GREEN, "Cohete", DELETE_DICE, true);
const SuperHero = new Side("SuperHero", YELLOW, "Superheroe", TURN_OFF_DICE, true);
const Heart = new Side("Heart", RED, "Corazon",  ROLL_DICE_FROM_INACTIVE , true);
const Dragon = new Side("Dragon", YELLOW, "Dragon", DELETE_DICE, false);
const Point42 = new Side("Point42", RED, "42", POINT, false);


//define craps
function createInitialCraps() {
const craps = [];
for (let i = 0; i < NUMBER_OF_CRAPS ; i++) {
  craps.push(new Crap([Meeple, SpaceCraft, SuperHero, Heart, Dragon, Point42], i));
}
  console.log(craps);
  return craps;
}


export {
  createInitialCraps
}




