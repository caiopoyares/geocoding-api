import { colors } from "./colors";
class UI {
  constructor() {
    this.map = document.getElementById("map");
    this.input = document.querySelector("#address-input");
    this.submitBtn = document.querySelector("#submit-btn");
    this.warningBox = document.querySelector("#warning");
    this.optionsList = document.querySelector("#options-list");
    this.optionsTitle = document.querySelector("#options-title");
  }

  onNoResults() {
    this.warningBox.innerText =
      "Desculpe, não encontramos nenhum resultado para a sua pesqthissa.";
    this.warningBox.style.color = colors.secondaryText;
    this.warningBox.style.display = "block";
    this.submitBtn.innerText = "Vamos lá!";
  }

  onSearchError() {
    this.warningBox.innerText =
      "Desculpe, tivemos um erro inesperado. Tente novamente.";
    this.warningBox.style.color = colors.warning;
    this.warningBox.style.display = "block";
    this.submitBtn.innerText = "Vamos lá!";
  }

  onNoInputValue() {
    this.warningBox.innerText = "Por favor, preencha o campo de endereço.";
    this.warningBox.style.color = colors.warning;
    this.warningBox.style.display = "block";
  }

  onOptionSelected() {
    this.optionsList.innerHTML = "";
    this.submitBtn.innerText = "Vamos lá!";
    this.optionsList.style.display = "none";
    this.optionsTitle.style.display = "none";
  }

  onDisplayOptions() {
    this.optionsTitle.style.display = "block";
    this.submitBtn.innerText = "Vamos lá!";
    this.optionsTitle.innerText = "Escolha uma opção:";
  }
}

const ui = new UI();

export default ui;
