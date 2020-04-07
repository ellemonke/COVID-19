var data = "static/resources/airports/airports.geojson"

d3.json(data, function(response) {
  createFeatures(response.features);
});


function createFeatures(airportData) {

  function onEachFeature(feature, layer) {
    passengers = feature.properties['Total passengers']
    passengers = passengers.split(/ /).join('')
    layer.bindPopup(feature.properties.Airport + "<br />" + 
      "Rank: " + feature.properties.Rank + "<br />" + 
      "Intl Passengers: " + passengers);
  }

  var airports = L.geoJSON(airportData, {
    onEachFeature: onEachFeature
  });

  createMap(airports);
}


function createMap(airports) {

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
  };

  var overlayMaps = {
    Airports: airports
  };

  var myMap = L.map("map", {
    center: [20,-20],
    zoom: 3,
    layers: [streetmap, airports]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
