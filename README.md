# COVID-19 Analysis
This project analyzes the current COVID-19 epidemic from three perspectives:
1.	Compares the confirmed, recovered, and fatality rates globally and by country.
2.	Maps COVID-19 “hotspots” and compares them to airport locations.
3.	Debunks some early myths about risk factors related to COVID-19. 

The primary data comes from [CSSE at Johns Hopkins University on GitHub](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series).

## Live Site
https://ellemonke.github.io/COVID-19

## Tech Stack
- Data analysis using Python (Pandas, NumPy, SciPy) and web API requests
- Visualizations using Matplotlib, Leaflet.js and D3.js
- Front-end web development using HTML, CSS, Bootstrap, JavaScript

## Potential Future Development
- Machine Learning Model predicting rate of spread - airports and tourist traffic as features
- Effect of health expenditure on fatality rate
- Risk assessment for Africa, India 
- Reduce dependencies:
    1. Replace need for [CSV to GeoJSON Converter](https://www.convertcsv.com/csv-to-geojson.htm) with Python or JavaScript.
    2. Convert website to Node.js environment
