// Edit the center point and zoom level
var map = L.map('map', {
  center: [41.78187123326233, -72.77748860360784], // rough midpoint of Avon, Bloomfield, West Hartford
  zoom: 13,
  scrollWheelZoom: false
});

// set bounds for geocoder
var minLatLng = [41.70655975258996, -72.9560164187985];
var maxLatLng = [41.88214910476504, -72.61269369727799];
var bounds = L.latLngBounds(minLatLng, maxLatLng);

var choroplethLayer;
var choroplethOpacity = 0.7;

// toggle baselayers; global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "topright",
  collapsed: false
}).addTo(map);

//baselayers
var presentStreets = new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map); // adds layer by default
controlLayers.addBaseLayer(presentStreets, 'Present Streets');

// https://esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html
var esriImagery = L.esri.basemapLayer('Imagery');
var esriTransportation = L.esri.basemapLayer('ImageryTransportation');
var esriLabels = L.esri.basemapLayer('ImageryLabels');
var presentAerial = L.layerGroup([esriImagery, esriTransportation, esriLabels]);
controlLayers.addBaseLayer(presentAerial, 'Present Aerial');

var searchControl = L.esri.Geocoding.geosearch({
  placeholder: "Search the Hartford area...",
  searchBounds: bounds
}).addTo(map);

// Prepend attribution to "Powered by Esri"
map.attributionControl.setPrefix('View\
  <a href="https://github.com/ontheline/otl-zoning-metro-hartford" target="_blank">sources and code on GitHub</a>,\
  created with ' + map.attributionControl.options.prefix);

 var results = L.layerGroup().addTo(map);

 searchControl.on('results', function (data) {
   results.clearLayers();
   for (var i = data.results.length - 1; i >= 0; i--) {
     results.addLayer(L.marker(data.results[i].latlng));
   }
 });

L.control.scale().addTo(map);

// https://colorbrewer2.org/#type=sequential&scheme=YlGn&n=5
var choroplethStyle = function(f) {
  var d = parseInt(f.properties.minlandfam);

  var color = d > 87000 ? '#006d2c' :
           d > 40000 ? '#31a354' :
           d > 30000 ? '#74c476' :
           d > 15000 ? '#bae4b3' :
           d > 9000 ? '#edf8e9' :
                     'gray' ;
  return {
    'color': 'black',
    'weight': 0.5,
    'fillColor': color,
    'fillOpacity': choroplethOpacity
  }
}

var addTownBounds = function (){
  $.getJSON("geojson/ct-towns-selected.geojson", function (data) {
    L.geoJson(data, {
      style: {
        fillOpacity: 0,
        color: 'black',
        weight: 2,
      },
      interactive: false,
    }).addTo(map);
  })
}

// zoning polygons with fillColor
$.getJSON("geojson/combined-zoning-1950s.geojson", function (data) {
  choroplethLayer = L.geoJson(data, {
    style: choroplethStyle,
    // Add tooltips
    onEachFeature: function(feature, layer) {
      var text = '<b>' + feature.properties.town + '</b><br>Zone: '
        + feature.properties.zone + '<br>Year: ' + feature.properties.year;

      layer.bindTooltip(text, { sticky: true });
    }
  }).addTo(map);

  map.fitBounds(choroplethLayer.getBounds());
  addTownBounds();
});

// zoning points with colored numeric markers; see also style.css
// $.getJSON("geojson/wh-area-markers-1924-whitten.geojson", function (data){
//   L.geoJson(data, {
//     pointToLayer: function( feature, latlng) {
//       var colors = {
//         'A': 'black', // cannot easily use hex colors here
//         'B': 'black', //
//         'C': 'black', //
//         'D': 'black', //
//         'E': 'black' //
//       }
//       var mIcon = L.ExtraMarkers.icon({
//         icon: 'fa-number',
//         number: feature.properties.area,
//         markerColor: colors[feature.properties.area]
//       });
//       var marker = L.marker(latlng, {icon: mIcon});
//       return marker;
//     }
//   }).addTo(map);
// });

// Add Opacity control
var opacity = L.control({position: 'topright'});
opacity.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'control-custom range');
  div.innerHTML = '<h4>Opacity: 1950s zones</h4>';
  div.innerHTML += '<input id="rangeSlider" type="range" min="0" max="100" value="70">';

  // Make sure the map doesn't move with slider change
  L.DomEvent.disableClickPropagation(div);
  return div;
};
opacity.addTo(map);

$('#rangeSlider').on('input', function() {
  choroplethOpacity = $(this).val() / 100;

  if (choroplethLayer) {
    choroplethLayer.setStyle(choroplethStyle);
  }
})


/* Add a custom image legend */
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML += '<img src="./1924-zoning-legend.png" alt="1924 Zoning Legend" width="110">';
  return div;
};

legend.addTo(map);
