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
    let type = document.querySelector('input[name="type_select"]:checked').value;
    var json = {'contours':{}}
    var tooltipInner = document.querySelector('select[id="distance"]').options[document.querySelector('select[id="distance"]').selectedIndex].innerText

    if(type === "distance"){
      json['contours'] = [{ "distance" : Number(document.querySelector('select[id="distance"]').value)}]

    }else{
      json['contours'] = [ {"time" : Number(document.querySelector('select[id="minutes"]').value)}]
    }
    
    json['locations'] = [{"lat":coord.lat, "lon":coord.lng}];
    json['costing'] = document.querySelector('button[name="costing"].active').value;
    //json['denoise'] = document.getElementById('denoise').value;
    json['generalize'] = document.getElementById('generalize').value;
    json['polygons'] = document.getElementById('polygons_lines').checked;
    url += escape(JSON.stringify(json));
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(geojson != null){
        geojson.removeFrom(map);
      }
      //clear the tooltips
      tooltips.forEach(function (tooltip) {
        tooltip.removeFrom(map);
      });
      tooltips = [];
      //create the geojson object
      geojson = L.geoJson(data, {
        style: function(feature) { 
          return { opacity: feature.properties.opacity * 2,
                   color: feature.properties.color
                 };
        },
        onEachFeature: function(feature, layer) {
          var tooltip = layer.bindTooltip(tooltipInner, { sticky: true })//feature.properties.contour + ' min', { sticky: true });
          tooltips.push(tooltip);
          tooltip.addTo(map);
        }
      });

      //render the geojson
      geojson.addTo(map);

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href",     dataStr     );
          
    })
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