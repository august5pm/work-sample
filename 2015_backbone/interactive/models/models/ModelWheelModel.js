App.Models.ModelWheelModel = Backbone.Model.extend({
    'default':{
        "wheel_names":[]
    },

    initialize : function() {
        App.modelWheelViewsModel = new App.Models.ModelWheelVisualsModel();
        App.modelWheelIndicatorsModel = new App.Models.ModelWheelIndicatorsModel();
    },

    setModels : function($json){
        this.set({"wheel_names" : $json.wheel_names});
    }
});

////////////////////////////////////////////////////////////
// Model Wheel Visual
////////////////////////////////////////////////////////////

App.Models.ModelWheelVisualsModel = Backbone.Model.extend({
    'default':{
        "mobile_image":"",
        "web_image":"",
        "alt_text" : ""
    }
});


////////////////////////////////////////////////////////////
// Model Wheel Indicator
////////////////////////////////////////////////////////////

App.Models.ModelWheelIndicatorsModel = Backbone.Model.extend({
    'default':{
        "indicator_image" : "",
        "alt_text":""
    }
});