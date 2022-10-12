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

const chooseColor = depth => depth<10 ? 'lightgreen' : depth<30 ? 'green' : depth<50 ? 'yellow' : depth<70 ? 'orange' : depth<90 ? 'darkorange' : 'red';

// Creating a variable which holds our query url
 let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

d3.json(queryUrl).then(({features})=> {
    features.forEach(feature => {
        let { coordinates } = feature.geometry;
        let { mag, place } = feature.properties;
        //creating circles to plot each earthquake
        L.circle([coordinates[1],coordinates[0]],{radius: mag*20000, color: 'black', fillColor: chooseColor(coordinates[2]), fillOpacity: .65 }).addTo(myMap).bindPopup(place + "<br>" + "Magnitude:" + mag + "<br>" + "Depth:" + [coordinates[2]]);
    });
});

//creating a function by which the fill color of the circle will change based on the magnitude of the earthquake


// function chooseColor(depth) {
//     if (depth >= 0 & depth <= 1) return "lightgreen";
//     else if (depth > 1 & depth <= 3) return "green";
//     else if (depth > 3 & depth <= 5) return "yellow";
//     else if (depth > 5 & depth <= 7) return "orange";
//     else if (depth > 7 & depth <= 9) return "darkorange";
//     else return "red";
//   };

 //creating a legend
 var legend = L.control({
    position: "bottomright"
});
  
legend.onAdd = function(){
    var div = L.DomUtil.create("div", "legend");
    var categories = ['<10','<30','<50', '<70', '<90', '90+'];
    var colors = ["lightgreen", "green", "yellow", "orange", "darkorange", "red"];

    div.innerHTML = "<h4>Depth</h4>"

    categories.forEach((cat,i) => {
        div.innerHTML += `<i class="${colors[i]}">${cat}</i>`
    });

    return div;
};

// Add the info legend to the map.
legend.addTo(myMap);





