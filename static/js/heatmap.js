var myMap = L.map("map", {
  center: [20,-20],
  // center: [37.7749, -122.4194],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// var data = "static/resources/confirmed.geojson";
// var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
// var confirmed = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";


// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'static/resources/confirmed.geojson');
// xhr.setRequestHeader('Content-Type', 'application/geojson');
// xhr.responseType = 'geojson';
// xhr.onload = function() {
//     if (xhr.status !== 200) return
//     L.geoJSON(xhr.response).addTo(map);
// };
// xhr.send();


// var data = await(fetchJSON('static/resources/confirmed.geojson').then(function(data) { return data }));

// d3.json(data, function(response) {

//   console.log(response);

//   var heatArray = [];

  // for (var i = 0; i < response.length; i++) {
  //   var location = response[i].location;

  //   if (location) {
  //     heatArray.push([location.coordinates[1], location.coordinates[0]]);
  //   }
  // }

  // var heat = L.heatLayer(heatArray, {
  //   radius: 20,
  //   blur: 35
  // }).addTo(myMap);

// });

