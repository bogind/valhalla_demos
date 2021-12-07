L.Control.Inputs = L.Control.extend({
    onAdd: function(map) {
        let container = L.DomUtil.create('div', 'leaflet-bar control');
        L.DomEvent.disableScrollPropagation(container);
        L.DomEvent.disableClickPropagation(container);

        let latlngLabel = L.DomUtil.create('label')
        latlngLabel.innerText = 'lat lng: ';

        let latlngInput = L.DomUtil.create('input');
        latlngInput.id = 'latlng';
        latlngInput.type = 'text';
        latlngInput.value = "32.055572, 34.756429";
        latlngInput.size = "20";

        container.append(latlngLabel,latlngInput,L.DomUtil.create('br'));

        
        let GeneralizeLabel = L.DomUtil.create('label');
        GeneralizeLabel.innerText = 'Generalize: ';

        let GeneralizeInput = L.DomUtil.create('input');
        GeneralizeInput.id = "generalize";
        GeneralizeInput.type = "range";
        GeneralizeInput.min = "0";
        GeneralizeInput.max = "1000";
        GeneralizeInput.value = "0";
        GeneralizeInput.step = "1"
        GeneralizeInput.onchange = function(){
            document.getElementById('generalize_text').value=this.value;
        }

        let GeneralizeTextInput = L.DomUtil.create('input');
        GeneralizeTextInput.type = "text";
        GeneralizeTextInput.id = "generalize_text";
        GeneralizeTextInput.value = "0";
        GeneralizeTextInput.maxlength = "4";
        GeneralizeTextInput.size = "4";
        GeneralizeTextInput.onchange = function(){
            this.value = Math.max(0, Math.min(this.value, 1000)); 
            document.getElementById('generalize').value=this.value;
        }


        container.append(GeneralizeLabel,GeneralizeInput,GeneralizeTextInput,L.DomUtil.create('br'))

        let DistanceLabel = L.DomUtil.create('label');
        DistanceLabel.innerText = 'Distance'
        DistanceLabel.for = "type_distance"

        let DistanceTypeInput = L.DomUtil.create('input');
        DistanceTypeInput.id = "type_distance"
        DistanceTypeInput.type = "radio";
        DistanceTypeInput.name = "type_select";
        DistanceTypeInput.value = "distance";
        DistanceTypeInput.checked = 1;

        let TimeLabel = L.DomUtil.create('label');
        TimeLabel.innerText = "Time";
        TimeLabel.for = "type_time";

        let TimeInput = L.DomUtil.create('input');
        TimeInput.id = "type_time";
        TimeInput.type = "radio";
        TimeInput.name = "type_select";
        TimeInput.value = "time";

        container.append(DistanceLabel,DistanceTypeInput,TimeLabel,TimeInput,L.DomUtil.create('br'))

        let DistanceInputLabel = L.DomUtil.create('label');
        DistanceInputLabel.innerText = 'Distance: '
        DistanceInputLabel.for = "distance"

        let DistanceSelect = L.DomUtil.create('select');
        DistanceSelect.id = "distance";

        let distance100meters = L.DomUtil.create('option');
        distance100meters.value = "0.1";
        distance100meters.innerText = "100 Meters";

        let distance250meters = L.DomUtil.create('option');
        distance250meters.value = "0.25";
        distance250meters.innerText = "250 Meters";

        let distance500meters = L.DomUtil.create('option');
        distance500meters.value = "0.5";
        distance500meters.innerText = "500 Meters";

        let distance1kilometers = L.DomUtil.create('option');
        distance1kilometers.value = "1";
        distance1kilometers.innerText = "1 Kilometer";

        let distance15kilometers = L.DomUtil.create('option');
        distance15kilometers.value = "1.5";
        distance15kilometers.innerText = "1.5 Kilometers";

        let distance2kilometers = L.DomUtil.create('option');
        distance2kilometers.value = "2";
        distance2kilometers.innerText = "2 Kilometers";

        let distance3kilometers = L.DomUtil.create('option');
        distance3kilometers.value = "3";
        distance3kilometers.innerText = "3 Kilometers";

        let distance4kilometers = L.DomUtil.create('option');
        distance4kilometers.value = "4";
        distance4kilometers.innerText = "4 Kilometers";

        let distance5kilometers = L.DomUtil.create('option');
        distance5kilometers.value = "5";
        distance5kilometers.innerText = "5 Kilometers";

        DistanceSelect.append(distance100meters,distance250meters,distance500meters,distance1kilometers,distance15kilometers,distance2kilometers,distance3kilometers,distance4kilometers,distance5kilometers)

        container.append(DistanceInputLabel,DistanceSelect,L.DomUtil.create('br'));


        let TimeInputLabel = L.DomUtil.create('label');
        TimeInputLabel.innerText = 'Time: '
        TimeInputLabel.for = "minutes"

        let TimeSelect = L.DomUtil.create('select');
        TimeSelect.id = "minutes";

        let time10minutes = L.DomUtil.create('option');
        time10minutes.value = "10";
        time10minutes.innerText = "10 Minutes";

        let time20minutes = L.DomUtil.create('option');
        time20minutes.value = "20";
        time20minutes.innerText = "20 Minutes";

        let time30minutes = L.DomUtil.create('option');
        time30minutes.value = "30";
        time30minutes.innerText = "30 Minutes";

        TimeSelect.append(time10minutes,time20minutes,time30minutes)

        container.append(TimeInputLabel,TimeSelect,L.DomUtil.create('br'));




        

        

        return container;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.inputs = function(opts) {
    return new L.Control.Inputs(opts);
}