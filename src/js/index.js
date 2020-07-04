import "normalize.css";
import "../scss/index.scss";
import * as Map from "./map";

function init() {
  Map.initGoogleMap(global);
}

init();
