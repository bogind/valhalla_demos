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

        

        return container;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.inputs = function(opts) {
    return new L.Control.Inputs(opts);
}