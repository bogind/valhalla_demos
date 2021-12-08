var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map('map',{
    layers: [OpenStreetMap_Mapnik],

}).setView([32.055572,34.756429], 13);

const initLocation = {lat: 32.055572, lng: 34.756429};
var coord = initLocation;
var geojson = null;
var tooltips = [];
var marker = createMarker(initLocation);
map.addLayer(marker);
marker.on('dragend',getContours)

L.control.inputs({ position: 'topright' }).addTo(map);
map.attributionControl.addAttribution('Server hosted by <a href="https://gis-ops.com">gis-ops</a> and funded by <a href="https://www.fossgis.de/">FOSSGIS e.V</a>')


map.on('click', onMapClick);