// Selection
var country = d3.select("#country");

// Output
var confirmed = d3.select("#confirmed");
var recovered = d3.select("#recovered");
var fatalities = d3.select("#fatalities");
var lineChart = d3.select(".lineChart");
var barChart = d3.select(".barChart");

d3.select(window).on("load", onLoad);

function onLoad() {
    var selection = country.property("value", "Global");
    changeOutput();
};

// onChange
function changeOutput() {
    // Reset data from all.json
    var results = data;
 
    // Filter data
    var selection = country.property("value");
    results = results.filter(result => result["Country_Region"] === selection);
    result = results[0];
    
    // Assign results
    var stat_c = result["Confirmed"].toLocaleString(); 
    var stat_r = result["Recovered"].toLocaleString(); 
    var stat_f = result["Fatalities"].toLocaleString(); 
    var country_name = selection.replace(' ', '').toLowerCase();
    
    // Update output
    confirmed.text(stat_c);
    recovered.text(stat_r);
    fatalities.text(stat_f);
    lineChart.attr("src", `static/images/confirmed_${country_name}.png`);
    barChart.attr("src", `static/images/cvf_${country_name}.png`);    

    return;
};

country.on("change", changeOutput);
