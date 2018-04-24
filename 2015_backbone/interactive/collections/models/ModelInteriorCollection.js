App.Collections.ModelInteriorCollection = Backbone.Collection.extend({
    model: App.Models.ModelInteriorModel,
    initialize : function(){
        App.modelInteriorVisualsCollection = new App.Collections.ModelInteriorVisualsCollection();
        App.modelInteriorIndicatorsCollection = new App.Collections.ModelInteriorIndicatorsCollection();
    },

    setCollections : function($json){
        App.modelInteriorVisualsCollection.set($json.visuals);
        App.modelInteriorIndicatorsCollection.set($json.indicators);
    }
});

App.Collections.ModelInteriorVisualsCollection = Backbone.Collection.extend({
    model: App.Models.ModelInteriorVisualsModel
});

App.Collections.ModelInteriorIndicatorsCollection = Backbone.Collection.extend({
    model: App.Models.ModelInteriorIndicatorsModel
});