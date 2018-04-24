App.Models.ModelExteriorModel = Backbone.Model.extend({
    'default':{
        "color_names":[]
    },

    initialize : function() {
        App.modelExteriorViewsModel = new App.Models.ModelExteriorVisualsModel();
        App.modelExteriorIndicatorsModel = new App.Models.ModelExteriorIndicatorsModel();
    },

    setModels : function($json){
        this.set({"color_names": $json.color_names});
    }
});

////////////////////////////////////////////////////////////
// Model Exterior Visual
////////////////////////////////////////////////////////////

App.Models.ModelExteriorVisualsModel = Backbone.Model.extend({
    'default':{
        "alt_text" : "",
        "bgcolor_image":"",
        "car_images":[]
    }
});


////////////////////////////////////////////////////////////
// Model Exterior Indicator
////////////////////////////////////////////////////////////

App.Models.ModelExteriorIndicatorsModel = Backbone.Model.extend({
    'default':{
        "indicator_image" : "",
        "alt_text":""
    }
});