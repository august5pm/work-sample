App.Collections.ModelExteriorCollection = Backbone.Collection.extend({
    model: App.Models.ModelExteriorModel,
    initialize : function(){
        App.modelExteriorVisualsCollection = new App.Collections.ModelExteriorVisualsCollection();
        App.modelExteriorIndicatorsCollection = new App.Collections.ModelExteriorIndicatorsCollection();
    },

    setCollections : function($json){
        App.modelExteriorVisualsCollection.set($json.visuals);
        App.modelExteriorIndicatorsCollection.set($json.indicators);
    }
});

App.Collections.ModelExteriorVisualsCollection = Backbone.Collection.extend({
    model: App.Models.ModelExteriorVisualsModel
});

App.Collections.ModelExteriorIndicatorsCollection = Backbone.Collection.extend({
    model: App.Models.ModelExteriorIndicatorsModel
});