App.Collections.PartPriceCollection = Backbone.Collection.extend({
    model: App.Models.PartPriceListModel,
    parse: function (response) {
        return response.list;
    }
});