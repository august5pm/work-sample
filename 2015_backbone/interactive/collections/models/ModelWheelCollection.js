App.Collections.ModelWheelCollection = Backbone.Collection.extend({
    model: App.Models.ModelWheelModel,
    initialize : function(){
        App.modelWheelVisualsCollection = new App.Collections.ModelWheelVisualsCollection();
        App.modelWheelIndicatorsCollection = new App.Collections.ModelWheelIndicatorsCollection();
    },

    setCollections : function($json){
        App.modelWheelVisualsCollection.set($json.visuals);
        App.modelWheelIndicatorsCollection.set($json.indicators);
    }
});

App.Collections.ModelWheelVisualsCollection = Backbone.Collection.extend({
    model: App.Models.ModelWheelVisualsModel
});

App.Collections.ModelWheelIndicatorsCollection = Backbone.Collection.extend({
    model: App.Models.ModelWheelIndicatorsModel
});