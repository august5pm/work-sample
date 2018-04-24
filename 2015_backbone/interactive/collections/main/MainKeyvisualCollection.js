App.Collections.MainKeyvisualCollection = Backbone.Collection.extend({
  model: App.Models.MainKeyvisualModel,
  parse: function (response) {
    return response.list;
  }  
});