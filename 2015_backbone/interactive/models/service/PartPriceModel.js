App.Models.PartPriceModel = Backbone.Model.extend({
    'default':{
        "total_page" : 0,
        "current_page":0,
        "selectbox_items_model" : [],
        "selectbox_items_year" : []

    },

    initialize : function() {
        App.partPriceListModel = new App.Models.PartPriceListModel();
    }
});


App.Models.PartPriceListModel = Backbone.Model.extend({
    'default':{
        "model":"",
        "product_number":"",
        "price":"",
        "product_name_kor":"",
        "product_name_eng":""
    },

    initialize : function() {

    }
});