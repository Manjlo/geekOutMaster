class Rule {
  constructor(description, applyRule) {
    this.description = description;
    this.applyRule = applyRule;
  }

  getDescription() {
    return this.description;
  }

  applyRule(props) {
    return this.applyRule(props);
  }
}

export default Rule;
