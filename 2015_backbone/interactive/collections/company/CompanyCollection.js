App.Collections.CompanyCollection = Backbone.Collection.extend({
    model: App.Models.CompanyModel,
    parse: function (response) {
        return response.list;
    }
});