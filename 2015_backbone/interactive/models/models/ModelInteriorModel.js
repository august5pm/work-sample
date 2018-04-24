App.Models.ModelInteriorModel = Backbone.Model.extend({
    'default':{
        "interior_names":[]
    },

    initialize : function() {
        App.modelInteriorViewsModel = new App.Models.ModelInteriorVisualsModel();
        App.modelInteriorIndicatorsModel = new App.Models.ModelInteriorIndicatorsModel();
    },

    setModels : function($json){
        this.set({"interior_names":$json.interior_names});
    }
});

////////////////////////////////////////////////////////////
// Model Interior Visual
////////////////////////////////////////////////////////////

App.Models.ModelInteriorVisualsModel = Backbone.Model.extend({
    'default':{
        "mobile_image":"",
        "web_image":"",
        "alt_text" : ""
    }
});


////////////////////////////////////////////////////////////
// Model Interior Indicator
////////////////////////////////////////////////////////////

App.Models.ModelInteriorIndicatorsModel = Backbone.Model.extend({
    'default':{
        "indicator_image" : "",
        "alt_text":""
    }
});