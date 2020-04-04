

var data = "static/resources/confirmed.json";

d3.json(data, function(response) {

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var lat = response[i].Lat;
    var long = response[i].Long;
    var infections = response[i]['4/2/20']/20;

    if (infections) {
      heatArray.push([lat, long, infections]);
    }
  }

  var myMap = L.map("map", {
    center: [20,-20],
    // center: [37.7749, -122.4194],
    zoom: 3
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: `Confirmed Cases: ${response.length} Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>`,
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 15
  }).addTo(myMap);

});

