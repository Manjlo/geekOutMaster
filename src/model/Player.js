import Score from "./Score.js";

class Player {
  constructor(name) {
    this.name = name;
    this.isWinner = false;
    this.isLoser = false;
  }
  getName() {
    return this.name;
  }
  setIsWinner(isWinner) {
    this.isWinner = isWinner;
  }
  getIsWinner() {
    return this.isWinner;
  }
  setIsLoser(isLoser) {
    this.isLoser = isLoser;
  }
  getIsloser() {
    return this.isLoser;
  }
  getIsFalse() {
    return this.isFalse;
  }

}

export default Player;