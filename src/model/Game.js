import Score from "./Score.js";
import { DONT_POINT, POINT } from "../utils/actionTypes.js";
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

  setState(state) {
    this.player = state.player
    this.rounds = state.rounds
    this.activeRound = state.activeRound
    this.score = state.score
    this.isActiveAction = state.isActiveAction
    this.activeAction = state.activeAction
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

  setState(state) {
    this.playState.setState(state);
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
    console.log(this.playState, "calculateScore");
    const activeCraps = this.playState.activeRound.getActiveCraps();
    const hasLosingCraps = !activeCraps.every(crap => crap.currentSide.action === POINT);

    if (hasLosingCraps) {
      this.playState.activeRound.score.setScore(0);
      this.playState.score.setScore(0);
    } else if (!hasLosingCraps) {
      const score = this.pointsTable[this.playState.activeRound.getActiveCraps().length];
      this.playState.activeRound.score.setScore(score);
      this.playState.score.setScore(this.playState.score.getScore() + score);
    }
    this.nextRound();
    
  }

  checkGameState() {
    const activeRound = this.playState.activeRound;
    const activeCraps = activeRound.activeCraps;

    if (activeCraps.length === 0) {
      this.nextRound();

    } else if (activeCraps.length === 1) {
      const onlyOneActiveCrap = activeCraps[0];
      if (onlyOneActiveCrap.currentSide.isActionable) {
        this.calculateScore();
      }
    }
    else {
      const noMoreActivatesCraps = activeCraps.every(
        crap => !crap.currentSide.isActionable
      );
      if (noMoreActivatesCraps) {
        this.calculateScore();
      }

    }

  }
  nextRound() {

    console.log(this.playState, "nextRound");
    const numberRound = this.playState.activeRound.roundNumber;
    const roundLength = this.playState.rounds.length;
    if (numberRound === roundLength - 1) {
      this.calculateWin();
    }
    else {
      this.playState.activeRound.setIsPlayed();
      this.playState.setActiveRound(this.playState.rounds[numberRound + 1]);
    }

    console.log(this.playState, "nextRound1");
  }



}

export default Game;