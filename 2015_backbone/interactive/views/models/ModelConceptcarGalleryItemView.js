App.Views.ModelConceptcarGalleryItemView = Backbone.View.extend({

    initialize : function(obj){
        // 컨텐츠 비주얼 기본 크기
        this.CONTETNS_VISUAL_DEFAULT_WIDTH = 1600;
        this.CONTENTS_VISUAL_DEFAULT_HEIGHT = 710;

        this.isSwipe = false;
        this.curIndex = 0;
        this.scrollTime = 0;
        this.galleryTot = 0;
        this.indigatorArr = [];
        this.slideSwipe = "";
        this.contentWidth = 1600;
        this.isImageUrlset = false;

        this.galleryIndex = obj.galleryIndex;

        this.onResize();
        this.addEvent();
    },

    render: function (){
        _.templateSettings = {
            interpolate: /\<\@\=(.+?)\@\>/g,
            evaluate: /\<\@(.+?)\@\>/g
        };

        var list = { "list":this.model.listItems };
        var templateHtml = $('#template-gallery-item').html();

        var galleryClassName = "model-"+this.galleryIndex;
        this.$el.html( _.template( templateHtml, {"type":this.model.type, "list":this.model.listItems, "name":galleryClassName } ) );

        this.galleryTot = this.model.listItems.length;
        this.indigatorArr = $(".conceptcar .content-2 .inner-cont-wrap .gallery-indicator li");
        for(var i=0 ; i<this.indigatorArr.length ; i++){
            $(this.indigatorArr[i]).attr("index", i);
        }
        this.indigatorArr.on("click", _.bind(this.onClickIndigator, this));

        this.onResize();
        this.setImageUrl();

        var globalVars = App.GlobalVars;

        if(globalVars.currentDevice == globalVars.DEVICE_TYPE_WEB) {
            //default
            this.isSwipe = false;
            //content width
            $(".conceptcar .content-2 .inner-cont-wrap .visual-wrap").css("width", this.galleryTot * this.contentWidth + "px");
        } else {
            //swipe
            var self = this;
            this.isSwipe = true;
            this.slideSwipe = new Swipe(document.getElementById('gallery-slide'), {
                speed: 600,
                continuous: false,
                callback: function(index, elem) {
                    self.curIndex =index;
                    self.controlIndigator(self.curIndex);
                }
            });
        }




        return this;
    },

    show : function(){

    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        this.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);
        this.listenTo(App, App.Events.CHANGE_MOBILE, this.onChangeMobile);
        this.listenTo(App, App.Events.CHANGE_WEB, this.onChangeWeb);
    },

    removeEvent : function(){

    },

    destory: function(){
        this.remove();

    },

    onClickIndigator: function(e){
        var index = parseInt($(e.currentTarget).attr("index"));
        this.curIndex = index;

        if(this.isSwipe) {
            this.slideSwipe.slide(this.curIndex);
        } else {
            this.controlGallery(this.curIndex);
        }
        this.controlIndigator(this.curIndex);

        e.preventDefault ? e.preventDefault() : e.returnValue = false;

    },

    nexImage: function(){
        this.curIndex = this.curIndex+1//(this.curIndex+1) % this.galleryTot;

        if(this.curIndex == this.galleryTot){
            App.coceptcarGalleryView.nextGallery();
            return;
        }

        if(this.isSwipe){
            this.slideSwipe.next();
        } else {
            this.controlGallery(this.curIndex);
            this.controlIndigator(this.curIndex);
        }
    },

    prevImage: function(){
        this.curIndex--;

        if(this.curIndex < 0){
            App.coceptcarGalleryView.prevGallery();
            return;
        }

        if(this.isSwipe){
            this.slideSwipe.prev();
        } else {
            this.controlGallery(this.curIndex);
            this.controlIndigator(this.curIndex);
        }
    },

    controlIndigator: function(index){
        for(var i=0 ; i<this.galleryTot ; i++){
            if(i == index){
                $(this.indigatorArr[i]).addClass("on");
                $(this.indigatorArr[i]).removeClass("off");
            } else {
                $(this.indigatorArr[i]).removeClass("on");
                $(this.indigatorArr[i]).removeClass("off");
            }
        }
    },

    controlGallery: function(index, time){
        var time = time == undefined ? 800 : time;
        //change img
        var tgX = -this.contentWidth * index;
        $("#visual-holder").stop().animate({"margin-left":tgX}, time, "easeInOutQuint");

        //change indigator



    },

    onClick_navi: function(e){

    },



//////////////////////////////////////////////////////////////////////////
//    resize
//////////////////////////////////////////////////////////////////////////
    onResize: function() {

        if(this.isSwipe){

        } else {

            if(App.GlobalVars.isIE8 && $(window).width() < 1020){
//            console.log(App.GlobalVars.isIE8, $(window).width())
                return;
            }

            var globalVars = App.GlobalVars;

            var tgH = 1;
            if(globalVars.currentDevice == globalVars.DEVICE_TYPE_WEB) {
                if (globalVars.currentBrowserMode != globalVars.BROWSER_MODE_WEB) {
                    this.contentWidth = $(window).width();
                    tgH = 0.7;
                } else {
                    this.contentWidth = 1600;
                }
            } else {
                this.contentWidth = $(window).width();
                tgH = 0.7;
            }

            var marginL = 0;
            var figureH = 0;

            if(globalVars.currentBrowserMode != globalVars.BROWSER_MODE_MOBILE) {
                marginL = (this.contentWidth - (tgH * 1600)) *.5;
                figureH = 710 * tgH;
            } else {
                figureH = 750 * (this.contentWidth/640);
            }



            $(".conceptcar .content-2 .inner-cont-wrap .kv-inner-wrap").css({"width": this.contentWidth, "margin-left": -this.contentWidth *.5});
            $(".conceptcar .content-2 .inner-cont-wrap .visual-wrap").css("width", this.galleryTot * this.contentWidth + "px");
            $(".conceptcar .content-2 .inner-cont-wrap .visual-wrap figure").css({"width": this.contentWidth, "height":figureH} );

            $(".conceptcar .content-2 .inner-cont-wrap .fig-content").css({"margin-left": marginL } );

            this.controlGallery(this.curIndex, 0);

        }



        this.setImageUrl();
    },


    // change mobile
    onChangeMobile: function(){

    },

    // change web
    onChangeWeb: function(){

    },


    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";
        var imgArr = this.$el.find("img");
        var hybridLen = imgArr.length;

        if(this.currentBrowserMode !== browserMode || !this.isImageUrlset) {
            if(hybridLen != 0) this.isImageUrlset = true;

            for (i = 0; i < hybridLen; i++) {
                secectorImg = $( imgArr[i] );


                if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                    imgUrl = secectorImg.attr("data-web-img-url");
                    secectorImg.attr("src", imgUrl);
                } else {
                    imgUrl = secectorImg.attr("data-mobile-img-url");
                    secectorImg.attr("src", imgUrl);
                }
            }

            this.currentBrowserMode = browserMode;
        }
    }


});