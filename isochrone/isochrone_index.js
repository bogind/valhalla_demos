var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map('map',{
    layers: [OpenStreetMap_Mapnik]
}).setView([32.055572,34.756429], 13);

const initLocation = {lat: 32.055572, lng: 34.756429};
var coord = initLocation;
var marker = createMarker(initLocation);
map.addLayer(marker);


L.control.inputs({ position: 'topright' }).addTo(map);

map.on('click', onMapClick);