var airportUrl = "static/resources/airports/airports.geojson";
var confirmedUrl = "static/resources/cases/confirmed.geojson";
var last_day = '4/11/20';

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
    layer.bindPopup("<b>" + feature.properties.Airport + "</b><br />" + 
    feature.properties.Location + ", " + feature.properties.Country + "<br />" +
      "Passengers: " + passengers.split(/,/)[0] + " M<br />" +
      "Rank: " + feature.properties.Rank + "<br />");
  }

  var markers = L.geoJSON(airportData, {
    onEachFeature: onEachFeature
  });

  return markers;

}


function createHeatmap(confirmedData) {

  var heatArray = [];
  
  for (var i = 0; i < confirmedData.length; i++) {
    var location = confirmedData[i].geometry;
    var infections = confirmedData[i].properties[last_day];

    if (infections) {
      heatArray.push([location.coordinates[1], location.coordinates[0], infections]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 15
  });

  return heat;

}


function createMap(airports, confirmed) {

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: `Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a> Last updated: <b>${last_day}</b>`,
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: "pk.eyJ1IjoiZWxsZW1vbmtlIiwiYSI6ImNrNHp4dXR5NzBnYTczZHFnanBnZTNrcWkifQ.Z9GSLpER_hfFgzxhPbm2lw"
  });

  var baseMaps = {
    // "Street Map": streetmap,
  };

  var overlayMaps = {
    "Airports": airports,
    "COVID-19 Cases": confirmed,
  };

  var myMap = L.map("map", {
    center: [30, 10],
    // center: [37, -98],
    zoom: 2,
    layers: [streetmap, airports, confirmed]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
}
