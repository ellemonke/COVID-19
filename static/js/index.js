// confirmed.js
var results = data;

// Input
var country = d3.select("#country");

// Output
var tested = d3.select("#tested");
var confirmed = d3.select("#confirmed");
var fatalities = d3.select("#fatalities");
var lineChart = d3.select(".lineChart");
var barChart = d3.select(".barChart");

function changeOutput() {
    var selection = country.property("value");

    // properties["Country/Region"]
    // properties["4/7/20"]
    if (selection === "Italy") {

        // results.forEach(result => {
        //     Object.entries(result).forEach(([key, value]) => {
        //         if (key==="properties") {
        //         }
        //     });
        // });

        tested.text("1");
        confirmed.text("2");
        fatalities.text("3");
        lineChart.attr("src", "static/images/model_sir_b.png");
        barChart.attr("src", "static/images/model_sir_b.png");    
    }

    return;
};

country.on("change", changeOutput);
