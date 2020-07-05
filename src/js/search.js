import ui from "./ui";
import * as Map from "./map";
import { colors } from "./colors";

const RESPONSE_STATUS = {
  OK: "OK",
  ZERO_RESULTS: "ZERO_RESULTS",
};

export async function goSearch(e) {
  e.preventDefault();

  const inputValue = ui.input.value;

  if (!inputValue) {
    ui.warningBox.innerText = "Por favor, preencha o campo de endereço.";
    ui.warningBox.style.color = colors.warning;
    return;
  }

  const addressData = await Map.fetchLocation(inputValue);
  console.log(addressData);

  if (addressData.status === RESPONSE_STATUS.ZERO_RESULTS) {
    handleNoResults();
    return;
  }

  if (addressData.status !== RESPONSE_STATUS.OK) {
    handleSearchError();
    return;
  }

  if (addressData.results.length > 1) {
    // mostrar as opcoes para o usuario
    displayAddressOptions(addressData);
    return;
  }

  const address = addressData.results[0].geometry.location;
  Map.updateMap(address);
}

function displayAddressOptions(addressData) {
  const options = addressData.results;
  console.log(options);

  options.forEach((option) => {
    const optionItem = document.createElement("li");
    const text = document.createTextNode(option.formatted_address);
    optionItem.appendChild(text);
    console.log(option);

    optionItem.addEventListener("click", () => handleSelectOption(option));
    ui.optionsList.appendChild(optionItem);
  });
}

function handleSelectOption(option) {
  Map.updateMap(option.geometry.location);
  ui.optionsList.innerHTML = "";
}

function handleNoResults() {
  ui.warningBox.innerText =
    "Desculpe, não encontramos nenhum resultado para a sua pesquisa.";
  ui.warningBox.style.color = colors.secondaryText;
}

function handleSearchError() {
  ui.warningBox.innerText =
    "Desculpe, tivemos um erro inesperado. Tente novamente.";
  ui.warningBox.style.color = colors.warning;
}
