App.Collections.ModelSpecCollection = Backbone.Collection.extend({
    model: App.Models.ModelSpecModel,
    initialize : function(){
        App.modelSpecTopItemsCollection = new App.Collections.ModelSpecTopItemsCollection();
        App.modelSpecListCollection = new App.Collections.ModelSpecListCollection();
    },

    setCollections : function($json){
        App.modelSpecTopItemsCollection.set($json.spec_top.items);
        App.modelSpecListCollection.set($json.spec_list);
    }
});


////////////////////////////////////////////////////
//  spec top items collection
////////////////////////////////////////////////////
App.Collections.ModelSpecTopItemsCollection = Backbone.Collection.extend({
    model: App.Models.ModelSpecTopItemsModel
});


////////////////////////////////////////////////////
//  spec list collection
////////////////////////////////////////////////////
App.Collections.ModelSpecListCollection = Backbone.Collection.extend({
    model: App.Models.ModelSpecListModel
});