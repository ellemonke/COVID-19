var airportUrl = "static/resources/airports/airports.geojson";
var confirmedUrl = "static/resources/confirmed.geojson";

d3.json(airportUrl, function(airportData) {
  var airports = createFeatures(airportData.features);

  d3.json(confirmedUrl, function(confirmedData) {
    var confirmed = createHeatmap(confirmedData.features);

    createMap(airports, confirmed);
  });  
});


function createFeatures(airportData) {

  function onEachFeature(feature, layer) {
    passengers = feature.properties['Total passengers']
    passengers = passengers.split(/ /).join('')
    layer.bindPopup(feature.properties.Airport + "<br />" + 
      "Rank: " + feature.properties.Rank + "<br />" + 
      "Intl Passengers: " + passengers);
  }

  var markers = L.geoJSON(airportData, {
    onEachFeature: onEachFeature
  });

  return markers;
}


function createHeatmap(confirmedData) {

  // function onEachFeature(feature, layer) {
  //   infections = feature.properties['4/2/20'];
  //   layer.bindPopup("Confirmed: " + infections);
  // }

  // var markers = L.geoJSON(airportData, {
  //   onEachFeature: onEachFeature
  // });

  var heat = L.markerClusterGroup();

  for (var i = 0; i < confirmedData.length; i++) {
    var location = confirmedData[i].geometry;
    var infections = confirmedData[i].properties['4/2/20'];

    heat.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
      .bindPopup("Confirmed: " + infections));
  }

  // var heat = L.heatLayer(heatArray, {
  //   radius: 20,
  //   blur: 15
  // });

  return heat;
}


function createMap(airports, confirmed) {

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var baseMaps = {
    // "Street Map": streetmap,
  };

  var overlayMaps = {
    "Int'l Airports": airports,
    "COVID-19 Cases": confirmed,
  };

  var myMap = L.map("map", {
    center: [20,-20],
    zoom: 3,
    layers: [streetmap, airports, confirmed]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}