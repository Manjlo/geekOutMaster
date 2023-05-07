import Score from "./Score.js";
import { DONT_POINT } from "../utils/actionTypes.js";
import { NUMBER_OF_POINTS_TO_WIN } from "../utils/GameConstans.js";
import { POINTS_TABLE } from "../utils/GameConstans.js";

class PlayState {
  constructor(player, rounds) {
    this.player = player;
    this.rounds = rounds;
    this.activeRound = rounds[0];
    this.score = new Score();
    this.isActiveAction = false;
    this.activeAction = null;
  }
  setIsActiveAction(isActiveAction) {
    this.isActiveAction = isActiveAction;
  }
  getIsActiveAction() {
    return this.isActiveAction;
  }
  setActiveAction(activeAction) {
    this.activeAction = activeAction;
  }
  
  setActiveRound(activeRound) {
    this.activeRound = activeRound;
  }
}

class Game {
  constructor(player, rounds) {
    this.pointsTable = POINTS_TABLE;
    this.playState = new PlayState(player, rounds);
  }

  getState() {
    return this.playState;
  }

  calculateWin() {
    const score = this.playState.score.getScore();
    if (score > NUMBER_OF_POINTS_TO_WIN) {
      this.playState.player.setIsWinner(true);
    } else {
      this.playState.player.setIsLoser(true);
    }
  }

  calculateScore() {

    const activeRound = this.playState.activeRound;
    const losingCraps = activeRound.activeCraps.filter(crap => crap.action === DONT_POINT);

    if (losingCraps.length > 0) {
      this.playState.activeRound.score.setScore(0);
      this.playState.score.setScore(0);
    } else {
      const score = this.pointsTable[activeRound.activeCraps.length];
      this.playState.activeRound.score.addScore(score);
      this.playState.score.addScore(score);
    }

  }

  checkGameState() {
    const activeRound = this.playState.activeRound;
    const activeCraps = activeRound.activeCraps;

    if (activeCraps.length === 0) {
      if (this.playState.activeRound === this.playState.rounds.length - 1) {
        this.calculateWin();
      } else {
        this.playState.setActiveRound(this.playState.rounds[activeRound + 1]);
      }
    } else if (activeCraps.length === 1 && activeCraps[0].action !== DONT_POINT) {
      this.calculateWin();
    }

    const noMoreActivatesCraps = activeCraps.every(crap => !crap.currentSide.isActionable);
    if (noMoreActivatesCraps) {
      this.calculateScore();
    }

    return this.playState;
  }
}

export default Game;