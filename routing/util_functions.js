let clickedCoord;
const provider = "esri"
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
    
  }

async function setStartPoint(){
    address = await reverseGeocode(clickedCoord, provider)
    console.log(clickedCoord)
    console.log(address)
}

async function reverseGeocode(coord, provider){
    if(provider === "esri"){
        let esriUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&location=${coord.lng},${coord.lat}`
        let response = await fetch(esriUrl)
        let resJson = await response.json()
        let address = await resJson.address.Match_addr        
        return address
    }else if(provider === "gsheets"){
      //TODO
    }
  }

function generateContextMenu(e){

    clickedCoord = e.latlng
    let xtable = document.createElement('table');
    let row1 = xtable.insertRow();
    let row1td = document.createElement('td');
    row1td.className = "context-button"
    row1td.innerText = "Set Start Point"
    row1td.onclick = setStartPoint
    row1.append(row1td)

    let row2 = xtable.insertRow();
    let row2td = document.createElement('td');
    row2td.className = "context-button"
    row2td.innerText = "Add Point Between"
    row2.append(row2td)

    let row3 = xtable.insertRow();
    let row3td = document.createElement('td');
    row3td.className = "context-button"
    row3td.innerText = "Set End Point"
    row3.append(row3td)
    

    var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(xtable)
        .openOn(map);
}