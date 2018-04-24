App.Views.ModelWheelView = Backbone.View.extend({

    initialize : function(obj){
        this.modelWheelModel = obj.modelWheelModel;
        this.modelWheelVisualsCollection = obj.modelWheelVisualsCollection;
        this.modelWheelIndicatorsCollection = obj.modelWheelIndicatorsCollection;

        this.visualCon = $(".wheel-type .gallery-room");
        this.indicatorCon = $(".wheel-type .indicator-wrap .indicator");

        this.addVisualCount = 0;
        this.addIndicatorCount = 0;
        this.wheelLen = 0;
        this.currentBrowserMode = "";
        this.currentIdx = -1;
        this.completeNum = 0;

        this.DEFAULT_VISUAL_WIDTH = 1600;
    },

    render: function (){
        this.wheelLen = this.modelWheelIndicatorsCollection.models.length;
        this.addAllVisual();
        this.addAllIndicator();
    },

    ////////////////////////////////////////////////////////////////////
    //  add visual
    ////////////////////////////////////////////////////////////////////

    addAllVisual : function(){
        this.modelWheelVisualsCollection.forEach(this.addOneVisual, this);
    },

    addOneVisual : function($model){
        var visualView = new App.Views.ModelWheelVisualView({model:$model});
        this.visualCon.append(visualView.render().el.childNodes)
        $(".wheel-type .gallery-room figure").addClass("hide");
        this.addVisualCount++

        // 인디게이터 ADD가 완료되면
        if(this.wheelLen == this.addVisualCount){
            this.addOneComplete();
        }
    },


    ////////////////////////////////////////////////////////////////////
    //  add indicator
    ////////////////////////////////////////////////////////////////////

    addAllIndicator : function(){
        this.modelWheelIndicatorsCollection.forEach(this.addOneIndicator, this);
    },

    addOneIndicator : function($model){
        var indicatorView = new App.Views.ModelWheelIndicatorView({model:$model});
        this.indicatorCon.append(indicatorView.render().el.childNodes)

        this.addIndicatorCount++

        // 인디게이터 ADD가 완료되면
        if(this.wheelLen == this.addIndicatorCount){
            this.addOneComplete();
        }
    },

    addOneComplete : function(){
        this.completeNum++

        if(this.completeNum == 2){
            this.setImageUrl();
            this.setIndicator();
            this.onChangeContents(0);
            this.onResize();
            this.show();
        }
    },

    setIndicator : function(){
        $(".wheel-type .indicator-wrap .indicator li").eq(this.wheelLen-1).addClass("last");
    },

    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";

        if(this.currentBrowserMode !== browserMode) {
            for (i = 0; i < this.wheelLen; i++) {
                secectorImg = $(".wheel-type .gallery-room figure:eq("+i+") .incase img");
                if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                    // 이미지에 웹버전 경로 넣어주기
                    imgUrl = secectorImg.attr("data-web-image-url");
                    secectorImg.attr("src", imgUrl);
                } else {
                    // 이미지에 모바일 경로 넣어주기
                    imgUrl = secectorImg.attr("data-mobile-image-url");
                    secectorImg.attr("src", imgUrl);
                }
            }

            this.currentBrowserMode = browserMode;
        }
    },

    onChangeContents : function($idx){
        if(this.currentIdx !== $idx){
            this.changeVisual(this.currentIdx, $idx);
            this.changeIndicator(this.currentIdx, $idx);
            this.changeText($idx);
            this.currentIdx =  $idx;
            this.onResize();
        }
    },

    changeVisual : function($hideIdx, $showIdx){
        if($hideIdx !== -1){
            $(".wheel-type .gallery-room figure:eq("+$hideIdx+")").addClass("hide");
        }

        $(".wheel-type .gallery-room figure:eq("+$showIdx+")").removeClass("hide");
    },

    changeIndicator : function($hideIdx, $showIdx){
        if($hideIdx !== -1){
            $(".wheel-type .indicator-wrap .indicator li").eq($hideIdx).removeClass("on");
        }
        $(".wheel-type .indicator-wrap .indicator li").eq($showIdx).addClass("on");
    },

    changeText : function($showIdx){
        var txt = this.modelWheelModel.attributes.wheel_names[$showIdx];
        $(".wheel-type .indicator-wrap .select-txt").text(txt);
    },

    show : function(){
        this.addEvent();
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        $(".wheel-type .indicator-wrap .indicator li").on("click", this.onClick_indicator);
    },

    removeEvent : function(){
        $(".wheel-type .indicator-wrap .indicator li").off("click");
    },

    onClick_indicator : function(e){
        var index = $(this).index();
        var _this = App.modelWheelView;
        _this.onChangeContents(index);
        return false;
    },

    onResize : function(){
        this.setImageUrl();
        this.setImgLayout();
    },

    setImgLayout : function(){
        var i = 0;
        var browserMode = App.GlobalVars.currentBrowserMode;
        for(i=0; i<this.wheelLen; i++) {
            var selectorCon = $(".wheel-type .gallery-room figure:eq("+i+")");
            var secectorImg = $(".wheel-type .gallery-room figure:eq("+i+") .incase img");
            var selectorConWidth = selectorCon.width();

            var imgWidth = this.DEFAULT_VISUAL_WIDTH;
            var posX = 0;
            if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                if (App.GlobalVars.windowWidth < (App.GlobalVars.NAVIGATION_WIDTH + this.DEFAULT_VISUAL_WIDTH)) {
                    posX = -((imgWidth - selectorConWidth) / 2)
                }
                secectorImg.css("left", posX);
            }else{
                secectorImg.removeAttr("style");
            }
        }
    }
});



////////////////////////////////////////////////////////////////////
//  Interior Visual View
////////////////////////////////////////////////////////////////////

App.Views.ModelWheelVisualView = Backbone.View.extend({
    template: _.template($('#template-wheel-visual').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});



////////////////////////////////////////////////////////////////////
//  Interior Indicator View
////////////////////////////////////////////////////////////////////

App.Views.ModelWheelIndicatorView = Backbone.View.extend({
    template: _.template($('#template-wheel-indicator').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});