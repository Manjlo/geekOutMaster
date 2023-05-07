import Score from './Score.js';

class Round {
  constructor(roundNumber, initialCraps) {
    console.log(initialCraps);
    this.roundNumber = roundNumber;
    this.score = new Score();
    this.usedCraps = [];
    this.activeCraps = [];
    this.inactiveCraps = [];
    this.puntajeCraps = [];

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * initialCraps.length);
      const randomDie = initialCraps[randomIndex];
      this.activeCraps.push(randomDie);
      initialCraps.splice(randomIndex, 1);
    }
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * initialCraps.length);
      const randomDie = initialCraps[randomIndex];
      this.inactiveCraps.push(randomDie);
      initialCraps.splice(randomIndex, 1);
    }

    this.puntajeCraps = [];
    this.isCurrentRound = true;
  }

  getRoundNumber() {
    return this.roundNumber;
  }

  setActiveCraps(activeCraps) {
    this.activeCraps = activeCraps;
  }

  addActiveCraps(crap) {
    this.activeCraps.push(crap);
  }

  setInactiveCraps(inactiveCraps) {
    this.inactiveCraps = inactiveCraps;
  }

  addInactiveCraps(crap) {
    this.inactiveCraps.push(crap);
  }

  setUsedCraps(usedCraps) {
    this.usedCraps = usedCraps;
  }

  addUsedCraps(crap) {
    this.usedCraps.push(crap);
  }

  moveCrapFromActiveToUsed(crap) {
    this.activeCraps.splice(this.activeCraps.indexOf(crap), 1);
    this.usedCraps.push(crap);
  }

  moveCrapFromUsedToActive(crapId) {
    const crap = this.usedCraps.find(crap => crap.id === crapId);
    this.usedCraps.splice(this.usedCraps.indexOf(crap), 1);
    this.activeCraps.push(crap);
  }

  moveCrapFromActiveToInactive(crap) {
    this.activeCraps.splice(this.activeCraps.indexOf(crap), 1);
    this.inactiveCraps.push(crap);
  }

  moveCrapFromInactiveToActive(crap) {
    this.inactiveCraps.splice(this.inactiveCraps.indexOf(crap), 1);
    this.activeCraps.push(crap);
  }

  moveCrapFromActiveToPuntaje(crap) {
    this.activeCraps.splice(this.activeCraps.indexOf(crap), 1);
    this.puntajeCraps.push(crap);
  }

  setInactiveRound() {
    this.isCurrentRound = false;
  }

  setActiveRound() {
    this.isCurrentRound = true;
  }

}

export default Round;
