export function initGoogleMap(windowObj) {
  function initMap() {
    windowObj.map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: -23.59786,
        lng: -46.68858,
      },
      zoom: 15,
    });
  }
  windowObj.initMap = initMap;
}
