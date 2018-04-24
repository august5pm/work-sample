App.Collections.MainBannerCollection = Backbone.Collection.extend({
    model: App.Models.MainBannerListModel,
    parse: function (response) {
        return response.list;
    }
});