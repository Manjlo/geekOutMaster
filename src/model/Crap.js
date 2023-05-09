
class Crap{
    constructor(sides, id, audioDice){
      this.sides = sides;
      this.id = id;
      this.audio = new Audio(audioDice)
      //currentSide aleatorio
      this.currentSide = this.sides[Math.floor(Math.random() * this.sides.length)];
    }
  getCurrentSide() {
    return this.currentSide;
  }

  setCurrentSide(side) {
    this.currentSide = side;
  }

  roll() {
    this.currentSide = this.sides[Math.floor(Math.random() * this.sides.length)];
    return this.currentSide;
  }

  activeCrap () {
    return this.currentSide.executeAction();
  }

  turnOff() {
    //establece el siguiente que tenga el mismo color que el actual current side, no puede ser el actual
    this.currentSide = this.sides.find(side => side.color == this.currentSide.color && side != this.currentSide);
  }

  playSound() {
    this.audio.play();
  }

}

export default Crap;
