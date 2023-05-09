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
  
  executeAction() {
    return [true, this.action]
    //playState.setIsActiveAction = true;
    //playState.setActiveAtion(this.action);
  }

}

export default Side;