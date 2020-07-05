class UI {
  constructor() {
    this.map = document.getElementById("map");
    this.input = document.querySelector("#address-input");
    this.submitBtn = document.querySelector("#submit-btn");
    this.warningBox = document.querySelector("#warning");
    this.optionsList = document.querySelector("#options-list");
  }
}

const ui = new UI();

export default ui;
