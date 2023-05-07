class Side {
  constructor(name, color, avatar, action, isActionable ) {
    this.name = name;
    this.color = color;
    this.avatar = avatar;
    this.action = action;
    this.isActionable = isActionable;
  }

  getName() {
    return this.name;
  }
  
  executeAction(playState) {
    playState.isActiveAction = true;
    playState.setActiveAtion(this.action);
  }

}

export default Side;