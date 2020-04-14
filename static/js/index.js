// Selection
var country = d3.select("#country");

// Output
var confirmed = d3.select("#confirmed");
var recovered = d3.select("#recovered");
var fatalities = d3.select("#fatalities");
var chart1 = d3.select(".chart1>img");
var chart2 = d3.select(".chart2>img");
var desc_global = d3.selectAll(".desc_global");
var desc_country = d3.selectAll(".desc_country");

d3.select(window).on("load", onLoad);

function onLoad() {
    var selection = country.property("value", "Global");
    changeOutput();
};

// onChange
function changeOutput() {
    // Reset data from all.json
    var results = data;

    // Reset global description
    desc_global.attr("style", "display: block;");
    desc_country.attr("style", "display: none;");

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
    chart1.attr("src", `static/images/chart1_${country_name}.png`);
    chart2.attr("src", `static/images/chart2_${country_name}.png`);    

    // Change global description to country description
    if (selection!=='Global') {
        desc_global.attr("style", "display: none;");
        desc_country.attr("style", "display: block;");
    }

    return;
};

country.on("change", changeOutput);
