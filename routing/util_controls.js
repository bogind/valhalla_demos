L.Control.Inputs = L.Control.extend({
    onAdd: function(map) {
        let container = L.DomUtil.create('div', 'leaflet-bar control');
        L.DomEvent.disableScrollPropagation(container);
        L.DomEvent.disableClickPropagation(container);

        //#########################
        // costing
        //#########################

        let CostingInputLabel = L.DomUtil.create('label');
        CostingInputLabel.innerText = 'Costing: '
        CostingInputLabel.for = "costing"

        let CostingPedestrian = L.DomUtil.create('button');
        CostingPedestrian.className = "costing-button";
        CostingPedestrian.name = "costing"
        CostingPedestrian.id = "costing-pedestrian"
        CostingPedestrian.value = "pedestrian"
        CostingPedestrian.innerHTML = '<i class="fas fa-walking"></i>'
        CostingPedestrian.onclick = switchCosting

        let CostingBicycle = L.DomUtil.create('button');
        CostingBicycle.className = "costing-button";
        CostingBicycle.name = "costing"
        CostingBicycle.id = "costing-bicycle"
        CostingBicycle.value = "bicycle"
        CostingBicycle.innerHTML = '<i class="fas fa-bicycle"></i>'
        CostingBicycle.onclick = switchCosting

        let CostingAuto = L.DomUtil.create('button');
        CostingAuto.className = "costing-button active";
        CostingAuto.name = "costing"
        CostingAuto.id = "costing-bicycle"
        CostingAuto.value = "auto"
        CostingAuto.innerHTML = '<i class="fas fa-car"></i>'
        CostingAuto.onclick = switchCosting
        
        let CostingBus = L.DomUtil.create('button');
        CostingBus.className = "costing-button";
        CostingBus.name = "costing"
        CostingBus.id = "costing-bicycle"
        CostingBus.value = "bus"
        CostingBus.innerHTML = '<i class="fas fa-bus"></i>'
        CostingBus.onclick = switchCosting


        container.append(CostingPedestrian,CostingBicycle,CostingAuto,CostingBus,L.DomUtil.create('br'),L.DomUtil.create('br'))

        let PointsTable = document.createElement('table');
        PointsTable.id = "points_table";
        PointsTable.className = "table table-bordered";
        

        let startPointTR = PointsTable.insertRow();
        let startInputTD = document.createElement('td');
        let startInput = document.createElement('input');
        startInput.type = "text";
        startInputTD.append(startInput);
        let startAddressTD = document.createElement('td');
        let startAddress = document.createElement('i');
        startAddressTD.append(startAddress)
        startPointTR.append(startInputTD,startAddressTD)

        let endPointTR = PointsTable.insertRow()
        let endInputTD = document.createElement('td');
        let endInput = document.createElement('input');
        endInput.type = "text";
        endInputTD.append(endInput);
        let endAddressTD = document.createElement('td');
        let endAddress = document.createElement('i');
        endAddressTD.append(endAddress)
        endPointTR.append(endInputTD,endAddressTD)
        

        container.append(PointsTable,L.DomUtil.create('br'),L.DomUtil.create('br'))

        

        let GoButton = L.DomUtil.create('button');
        GoButton.id = "go"
        GoButton.innerText = "Go"
        //GoButton.onclick = getContours


        container.append(GoButton)


        return container;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

function switchCosting(){
    
    if(event.target.value){
        value = event.target.value
    }else{
        value = event.target.parentElement.value
    }
    let buttons = document.getElementsByName("costing")
    buttons.forEach(x => {
        x.classList.remove('active')
    })
    document.querySelector(`button[value=${value}]`).classList.add('active');
    

}

function addPointRow(coord=null){

}

L.control.inputs = function(opts) {
    return new L.Control.Inputs(opts);
}

$( ".row_drag" ).sortable({
    delay: 100,
    stop: function() {
        var selectedRow = new Array();
        $('.row_drag>tr').each(function() {
            selectedRow.push($(this).attr("id"));
        });
       alert(selectedRow);
    }
});