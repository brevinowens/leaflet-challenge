//creating a global variable for the street map
const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//creating a global variable for my map
let myMap = L.map("map", {
    center: [0,-40],
    zoom: 4,
    layers: [street]
});


// Creating a variable which holds our query url
 let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

d3.json(queryUrl).then(({features})=> {
    features.forEach(feature => {
        let { coordinates } = feature.geometry;
        let { mag, place } = feature.properties;
        //creating circles to plot each earthquake
        L.circle([coordinates[1],coordinates[0]],{radius: mag*10000, color: 'black', fillColor: chooseColor(feature.properties.mag), fillOpacity: [coordinates[2]]}).addTo(myMap).bindPopup(place + "<br>" + "Magnitude:" + mag + "<br>" + "Depth:" + [coordinates[2]]);
    });
});

//creating a function by which the fill color of the circle will change based on the magnitude of the earthquake
function chooseColor(mag) {
    if (mag >= 0 & mag <= 1) return "lightgreen";
    else if (mag > 1 & mag <= 3) return "green";
    else if (mag > 3 & mag <= 5) return "yellow";
    else if (mag > 5 & mag <= 7) return "orange";
    else if (mag > 7 & mag <= 9) return "darkorange";
    else return "red";
  };

 //creating a legend
 var legend = L.control({
    position: "bottomright"
});
  
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    labels = chooseColor(mag)
    categories = ['0-1','1-3','3-5','5-7','7-9','9+']
    return div;
};

  // Add the info legend to the map.
legend.addTo(myMap);






