import ui from "./ui";
import * as Map from "./map";

const RESPONSE_STATUS = {
  OK: "OK",
  ZERO_RESULTS: "ZERO_RESULTS",
};

export async function goSearch(e) {
  e.preventDefault();

  const inputValue = ui.input.value;

  if (!inputValue) {
    ui.onNoInputValue();
    return;
  }
  ui.warningBox.innerText = "";
  ui.warningBox.style.display = "none";
  ui.submitBtn.innerText = "Buscando...";

  const addressData = await Map.fetchLocation(inputValue);

  if (addressData.status === RESPONSE_STATUS.ZERO_RESULTS) {
    ui.onNoResults();
    return;
  }

  if (addressData.status !== RESPONSE_STATUS.OK) {
    ui.onSearchError();
    return;
  }

  if (addressData.results.length > 1) {
    displayAddressOptions(addressData);
    return;
  }

  const address = addressData.results[0].geometry.location;
  Map.updateMap(address);
  ui.submitBtn.innerText = "Vamos lá!";
}

function displayAddressOptions(addressData) {
  const options = addressData.results;

  ui.onDisplayOptions();

  options.forEach((option) => {
    const optionItem = document.createElement("li");
    const text = document.createTextNode(option.formatted_address);
    optionItem.appendChild(text);

    optionItem.addEventListener("click", () => handleSelectOption(option));
    ui.optionsList.appendChild(optionItem);
    ui.optionsList.style.display = "block";
  });
}

function handleSelectOption(option) {
  Map.updateMap(option.geometry.location);
  ui.onOptionSelected();
}
