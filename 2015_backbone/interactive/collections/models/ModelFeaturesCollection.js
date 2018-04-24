App.Collections.ModelFeaturesCollection = Backbone.Collection.extend({
    model: App.Models.ModelFeaturesModel,
    parse: function (response) {
        return response.features;
    }
});