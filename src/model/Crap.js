class Crap{
    constructor(sides, id){
      this.sides = sides;
      this.id = id;
      this.currentSide = this.sides[0];
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

  turnOff() {
    //establece el siguiente que tenga el mismo color que el actual current side, no puede ser el actual
    this.currentSide = this.sides.find(side => side.color == this.currentSide.color && side != this.currentSide);
  }


}

export default Crap;
