App.Collections.QuickSpecialofferCollection = Backbone.Collection.extend({
    model: App.Models.QuickSpecialofferModel,
    parse: function (response) {
        return response.list;
    }
});

