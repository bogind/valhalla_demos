function parseContour(s) {
    try {
      let range = n => [...Array(n).keys()]

      const time = parseInt(s.split(' '));
      var values = [];
      if (s.includes('increments')) {
        // [time, 2 * time, 3 * time, ...]
        values = range(3).map(i => (i + 1) * time);
      } else {
        values = [time];
      }

      return values.map(t => Object.fromEntries([["time", t]]));
    } catch (e) {
      console.error(e);
    }
  }


function createMarker(latlng) {
    var marker = new L.marker(latlng, {draggable:'true'});
    marker.on('dragend', event => {
        onLocationChanged(event.target.getLatLng());
    });
    return marker;
}

function onLocationChanged(new_coord) {
    coord = new_coord;
    document.getElementById('latlng').value = `${coord.lat.toFixed(6)},${coord.lng.toFixed(6)}`;
    //getContours();
  }

function onMapClick(e) {
    const new_coord = e.latlng;
    marker.setLatLng(new_coord, {draggable: 'true'});
    onLocationChanged(new_coord);
    reverseGeocode(new_coord,"esri")
  }

function getContours(){
    var url = 'https://valhalla1.openstreetmap.de/isochrone?json=';
    var json = {}
    json['locations'] = [{"lat":coord.lat, "lon":coord.lng}];
    json['costing'] = document.getElementById('costing').value;
    json['denoise'] = document.getElementById('denoise').value;
    json['generalize'] = document.getElementById('generalize').value;
    json['contours'] =  parseContour(document.getElementById('contours').value);
    json['polygons'] = document.getElementById('polygons_lines').value === 'polygons';
}

function reverseGeocode(coord, provider){
  if(provider === "esri"){
    let esriUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&location=${coord.lng},${coord.lat}`
    fetch(esriUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data.address.Match_addr)
    })
  }else if(provider === "gsheets"){
    //TODO
  }
}