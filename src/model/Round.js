import Score from './Score.js';

class Round {
  constructor(roundNumber, initialCraps) {
    this.roundNumber = roundNumber;
    this.score = new Score();
    this.usedCraps = [];
    this.activeCraps = [];
    this.inactiveCraps = [];
    this.puntajeCraps = [];
    this.played = false;

    //init 7 aleatory craps

    for (let i = 0; i < 7; i++) {
      const randomDie = initialCraps[i];
      this.activeCraps.push(randomDie);

      //initialCraps.splice(randomIndex, 1);
    }
    console.log(this.activeCraps, "activeCraps");
    let inactiveCrapsFiltered = initialCraps.filter(crap => !this.activeCraps.some(crapActive => crapActive.id === crap.id));
    console.log(inactiveCrapsFiltered, "inactiveCrapsFiltered");
    this.inactiveCraps = inactiveCrapsFiltered;

    this.puntajeCraps = [];
    this.isCurrentRound = true;
  }
  setIsPlayed(){
    this.played = true;
  }
  getRoundNumber() {
    return this.roundNumber;
  }

  setActiveCraps(activeCraps) {
    this.activeCraps = activeCraps;
  }
  getActiveCraps() {
    return this.activeCraps;
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

  turnOffCrap(crap) {
    crap.turnOff();
  }

  useCrap(crap) {
    this.moveCrapFromActiveToUsed(crap);
    return crap.activeCrap()
  }

  deleteCrap(crap) {
    this.moveCrapFromActiveToInactive(crap);
  }

  rollAgain(crap) {
    crap.roll();
  }

  rollFromInactive(crap) {
    this.moveCrapFromInactiveToActive(crap);
    crap.roll();
  }

  rollCraps() {
    this.activeCraps.forEach(crap => {
      crap.roll();
    })
  }

}

export default Round;
