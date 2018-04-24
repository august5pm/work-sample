App.Views.ModelFeaturesView = Backbone.View.extend({

    initialize : function(obj){
        this.modelFeaturesCollection = obj.modelFeaturesCollection;
        this.modelFeaturesPopupView = new App.Views.ModelFeaturesPopupView({modelFeaturesCollection : this.modelFeaturesCollection});

        this.container = $(".model-feature");

        this.addCount = 0;
        this.featuresLen = 0;
        this.currentBrowserMode = "";
        this.isResetMobileWidth = true;

        this.arrTypeClass = ["type-b", "type-a tright", "type-a tleft"];

        // 리사이즈 시 기준이 될 이미지 크기
        this.DEFAULT_A_TYPE_WIDTH = 800;
        this.DEFAULT_A_TYPE_HEIGHT = 330;

        this.DEFAULT_B_TYPE_WIDTH = 1600;
        this.DEFAULT_B_TYPE_HEIGHT = 390;

        this.DEFAULT_VISUAL_WIDTH = 1600;
    },

    render: function (){
        this.featuresLen = this.modelFeaturesCollection.models.length;
        this.modelFeaturesPopupView.render();
        this.addMoreCollectionData();

        // 리스트 만들기
        this.addAll();
        this.setModelName();
    },

    setModelName : function(){
        $(".model-name").html(App.GlobalVars.MODEL_NAME);
    },

    addAll : function(){
        this.modelFeaturesCollection.forEach(this.addOne, this);
    },

    addOne : function($model){
        var listview = new App.Views.ModelFeaturesListView({model:$model});
        this.$el.append(listview.render().el.childNodes)

        this.addCount++

        if(this.featuresLen == this.addCount){
            this.addOneComplete();
        }
    },

    addOneComplete : function(){
        this.setImageUrl();
        this.onResize();
        this.show();
    },

    addMoreCollectionData : function(){
        var i = 0;

        for(i=0; i<this.featuresLen; i++){
            // 타이틀 포지션 클래스 저장하기
            var imgType = this.modelFeaturesCollection.models[i].attributes.type;
            this.modelFeaturesCollection.models[i].set("type_class", this.arrTypeClass[imgType]);
        }
    },


    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";

        if(this.currentBrowserMode !== browserMode) {
            for (i = 0; i < this.featuresLen; i++) {
                secectorImg = $(".tile-pics-wrap li:eq(" + i + ") a img")
                if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                    // 이미지에 웹버전 경로 넣어주기
                    imgUrl = secectorImg.attr("data-thumb-web-image-url");
                    secectorImg.attr("src", imgUrl);
                } else {
                    // 이미지에 모바일 경로 넣어주기
                    imgUrl = secectorImg.attr("data-thumb-mobile-image-url");
                    secectorImg.attr("src", imgUrl);
                }
            }

            this.currentBrowserMode = browserMode;
        }
    },

    show : function(){
        this.addEvent();
    },

    showComplete : function(){

    },

    hide : function(){
        this.removeEvent();
    },

    hideComplete : function(){

    },

    addEvent : function(){
        $(".tile-pics-wrap li a").on("click", this.onClick_features)
    },

    removeEvent : function(){
        $(".tile-pics-wrap li a").off("click")
    },

    onClick_features : function(e){
        var index = $(this).parent().index();
        var _this = App.modelFeaturesView;
  
        var code = App.GlobalVars.MODEL_NAME+'_feature_'+(index+1);
        App.footerView.sendEventCode( code );
        _this.modelFeaturesPopupView.show(index);
        return false;
    },

    onResize : function(){
        this.setImageUrl();
        this.setImgLayout();
        this.modelFeaturesPopupView.onResize();
    },

    setImgLayout : function(){
        var i = 0;
        var browserMode = App.GlobalVars.currentBrowserMode;

        for(i=0; i<this.featuresLen; i++) {
            var selectorCon = $(".tile-pics-wrap li:eq(" + i + ")");
            var secectorImg = $(".tile-pics-wrap li:eq(" + i + ") a img");
            var selectorConWidth = selectorCon.width();
            var isTypeB = selectorCon.hasClass("type-b");
            var imgWidth = this.DEFAULT_B_TYPE_WIDTH;
            var posX = 0;

            if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                selectorCon.removeAttr("style");
                if (App.GlobalVars.windowWidth < (App.GlobalVars.NAVIGATION_WIDTH + this.DEFAULT_VISUAL_WIDTH)) {
                    if (isTypeB) {
                        // 긴 이미지
                        imgWidth = this.DEFAULT_B_TYPE_WIDTH;
                        posX = -((imgWidth - selectorConWidth) / 2)

                    } else {
                        // 반쪽짜리 이미지
                        imgWidth = this.DEFAULT_A_TYPE_WIDTH;
                        posX = -((imgWidth - selectorConWidth) / 2)
                    }
                }
                secectorImg.css("left", posX);
            }else{
                if (isTypeB) {
                    // 긴 이미지;
                }else{
                    // 짧은 이미지
                    selectorCon.css("width", ($("body")[0].scrollWidth/2)-1);
                }
                secectorImg.removeAttr("style");
            }
        }
    }
});


////////////////////////////////////////////////////////////////////
//  feature list view
////////////////////////////////////////////////////////////////////

App.Views.ModelFeaturesListView = Backbone.View.extend({
    template: _.template($('#template-features').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});