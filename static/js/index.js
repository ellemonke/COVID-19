// Data from confirmed.js
var results = data;

// Selection
var country = d3.select("#country");

// Output
var tested = d3.select("#tested");
var confirmed = d3.select("#confirmed");
var fatalities = d3.select("#fatalities");
var lineChart = d3.select(".lineChart");
var barChart = d3.select(".barChart");

// onChange
function changeOutput() {
 
    // Filter data
    var selection = country.property("value");
    results = results.filter(result => result.properties["Country/Region"] === selection);
    result = results[0].properties;
    
    // Assign results
    var stat_t = result["4/7/20"]; 
    var stat_c = result["4/7/20"]; 
    var stat_f = result["4/7/20"]; 
    var country_name = selection.toLowerCase();
    
    // Update output
    tested.text(stat_t);
    confirmed.text(stat_c);
    fatalities.text(stat_f);
    lineChart.attr("src", `static/images/model_sir_${country_name}.png`);
    barChart.attr("src", `static/images/model_sir_${country_name}.png`);    

    return;
};

country.on("change", changeOutput);
