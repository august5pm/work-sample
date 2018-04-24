App.Models.ModelSpecModel = Backbone.Model.extend({
    'default':{
        "front_image_url" : "",
        "side_image_url" : "",
        "back_image_url" : "",
        "front_alt_text" : "",
        "side_alt_text" : "",
        "back_alt_text" : "",
        "info_text" : []
    },

    initialize : function() {
        App.modelSpecTopItemsModel = new App.Models.ModelSpecTopItemsModel();
        App.modelSpecListModel = new App.Models.ModelSpecListModel();
    },

    setModels : function($json){
        this.set({"front_image_url":$json.car_images[0].front_image_url,
                    "side_image_url":$json.car_images[0].side_image_url,
                    "back_image_url":$json.car_images[0].back_image_url,
                    "front_alt_text":$json.car_images[0].front_alt_text,
                    "side_alt_text":$json.car_images[0].side_alt_text,
                    "back_alt_text":$json.car_images[0].back_alt_text,
                    "info_text" : $json.info_text});
    }
});


////////////////////////////////////////////////////
//  spec top items model
////////////////////////////////////////////////////

App.Models.ModelSpecTopItemsModel = Backbone.Model.extend({
    'default':{
        "title" : "",
        "list":""
    }
});

////////////////////////////////////////////////////
//  spec list model
////////////////////////////////////////////////////

App.Models.ModelSpecListModel = Backbone.Model.extend({
    'default':{
        "title" : "",
        "class_long_text":[],
        "class_short_text":[],
        "items":[]
    }
});

