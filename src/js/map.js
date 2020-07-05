import ui from "./ui";
import * as utils from "./utils";
import CONSTANT from "./constants";

const initialAddress = {
  lat: -23.59786,
  lng: -46.68858,
};

export function initGoogleMap(windowObj) {
  function initMap() {
    windowObj.map = new google.maps.Map(ui.map, {
      center: initialAddress,
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
      fullscreenControl: false,
    });
  }
  windowObj.initMap = initMap;
}

export async function fetchLocation(inputValue) {
  const addressToFetch = utils.formatInputValueIntoAddress(inputValue);
  const response = await fetch(
    `${CONSTANT.endpoint}address=${addressToFetch}&key=${CONSTANT.apiKey}`
  );
  const addressData = await response.json();

  return addressData;
}

export function updateMap(address) {
  assignNewMapAddress(address);
  createMapMarker(address, global.map);
}

export function assignNewMapAddress(address) {
  global.map = new google.maps.Map(ui.map, {
    center: address,
    zoom: 16,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    },
    fullscreenControl: false,
  });
}

export function createMapMarker(address, mapReference) {
  return new google.maps.Marker({
    position: address,
    map: mapReference,
  });
}
