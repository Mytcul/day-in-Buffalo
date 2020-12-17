// https://mappa.js.org/docs/getting-started.html

// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To

// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet
const mappa = new Mappa('Leaflet');

// These are all our map options in a single JavaScript object
// We will access these map options with the DOT notation 42.94899521546636, -78.813702153553
let options = {
  lat: 42.94899521546636,
  lng: -78.813702153553,
  zoom: 18,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function preload() {
  // With this code, you will need to convert your GPX file to CSV
  // Google search online converters and select one to test
  // firstPath = loadTable('track_points.csv', 'csv', 'header');

  // STEP 1: Swap out your CSV file
  firstPath = loadTable('Anna_track_points.csv', 'csv', 'header');
}

function setup() {
  canvas = createCanvas(800, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);

  myMap.onChange(drawPathReduce.bind(null, firstPath));
  }

function draw() {
}


function drawPathReduce(path) {
  for (let i = 0; i < path.getRowCount() - 1; i=i+3){
    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke(); // Control stroke: https://p5js.org/reference/#/p5/stroke
      noFill(); // Control fill: https://p5js.org/reference/#/p5/fill
        ellipse(pos.x, pos.y, 10,10)

      stroke('cyan');
      strokeWeight(1);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}


  function drawPath(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
      const latitude = Number(path.getString(i, 'reclat'));
      const longitude = Number(path.getString(i, 'reclon'));

      if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
        const pos = myMap.latLngToPixel(latitude, longitude);

        // Step 2: Customize graphics
        noStroke(); // Control stroke: https://p5js.org/reference/#/p5/stroke
        fill(255, 255, 255); // Control fill: https://p5js.org/reference/#/p5/fill
        ellipse(pos.x, pos.y, 1, 1)

        stroke('white');
        strokeWeight(1);
        line(pos.x, pos.y, pos.x, pos.y);
      }
    }
  }
