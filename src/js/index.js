import "normalize.css";
import "../scss/index.scss";
import * as Map from "./map";
import * as Search from "./search";
import ui from "./ui";

class App {
  constructor() {
    this.init();
  }

  setListeners() {
    ui.submitBtn.addEventListener("click", Search.goSearch);
  }

  init() {
    Map.initGoogleMap(global);
    this.setListeners();
  }
}

const app = new App();
