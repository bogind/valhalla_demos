var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map('map',{
    layers: [OpenStreetMap_Mapnik],

}).setView([32.055572,34.756429], 13);

const initLocation = {lat: 32.055572, lng: 34.756429};
map.on('contextmenu',generateContextMenu)



L.control.inputs({ position: 'topright' }).addTo(map);
document.getElementById("points_table").firstChild.className = "row_drag";
map.attributionControl.addAttribution('Server hosted by <a href="https://gis-ops.com">gis-ops</a> and funded by <a href="https://www.fossgis.de/">FOSSGIS e.V</a>')


//map.on('click', onMapClick);