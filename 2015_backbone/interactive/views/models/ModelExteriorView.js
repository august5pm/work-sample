App.Views.ModelExteriorView = Backbone.View.extend({

    initialize : function(obj){
        this.modelExteriorModel = obj.modelExteriorModel;
        this.modelExteriorVisualsCollection = obj.modelExteriorVisualsCollection;
        this.modelExteriorIndicatorsCollection = obj.modelExteriorIndicatorsCollection;

        this.indicatorCon = $(".ext-type .indicator-wrap .indicator");
        this.galleryRoomCon = $(".model-design .ext-type .gallery-room");


        this.addCount = 0;
        this.exteriorLen = 0;
        this.rotationImgLen = 0;
        this.currentBrowserMode = "";
        this.currentCarIdx = -1;
        this.mousePosX = 0;
        this.mousePosY = 0;
        this.mouseStartX = 0;
        this.mouseStartY = 0;
        this.isMouseDown = false;
        this.rotationSpeed = 5;
        this.currentRotationIdx = 0;
        this.isDragHorizon = false;
        this.isDragOn = true;

        this.DEFAULT_CAR_WIDTH = 1024;
        this.DEFAULT_CAR_HEIGHT = 450;
    },

    render: function (){
        this.exteriorLen = this.modelExteriorIndicatorsCollection.models.length;
        this.addAllIndicator();
    },

    addAllIndicator : function(){
        this.modelExteriorIndicatorsCollection.forEach(this.addOneIndicator, this);
    },

    addOneIndicator : function($model){
        var indicatorView = new App.Views.ModelExteriorIndicatorView({model:$model});
        this.indicatorCon.append(indicatorView.render().el.childNodes)

        this.addCount++

        // 인디게이터 ADD가 완료되면
        if(this.exteriorLen == this.addCount){
            this.addOneIndicatorComplete();
        }
    },

    addOneIndicatorComplete : function(){
        this.setIndicator();
        this.setImageUrl();
        this.onChangeContents(0);
        this.show();
    },

    setIndicator : function(){
        $(".ext-type .indicator-wrap .indicator li").eq(this.exteriorLen-1).addClass("last");
    },

    setImageUrl : function(){

    },

    onChangeContents : function($idx){
        if(this.currentCarIdx !== $idx){
            this.currentRotationIdx = 0;
            this.changeCar(this.currentCarIdx, $idx);
            this.changeIndicator(this.currentCarIdx, $idx);
            this.changeText($idx);
            this.currentCarIdx =  $idx;
        }
    },

    changeBg : function($showIdx){
        var selector  = $(".model-design .ext-type .gallery-room figure .fig-content");
        var imgUrl = this.modelExteriorVisualsCollection.models[$showIdx].attributes.background_image_url;
        selector.css("background", "url('"+imgUrl+"') repeat-x");
    },

    changeCar : function($hideIdx, $showIdx){
        this.rotationImgLen = this.modelExteriorVisualsCollection.models[$showIdx].attributes.car_images_url.length;

        var imgElementLen = $(".model-design .ext-type .gallery-room figure .fig-content .incase img").length;
        var i=0;
        if(this.rotationImgLen > imgElementLen){
            // 자동차 이미지 갯수가 생성된 이미지 엘리먼트 갯수보다 많다면 이미지 엘리먼트 생성해주기
            this.makeCarImgElement(this.rotationImgLen, imgElementLen);
        }

        // 360도 자동차 이미지 넣어주기
        for(i=0; i<this.rotationImgLen; i++){
            var imgSrc = this.modelExteriorVisualsCollection.models[$showIdx].attributes.car_images_url[i];
            $(".model-design .ext-type .gallery-room figure .fig-content .incase img").eq(i).attr("src", imgSrc);
        }

        if(this.rotationImgLen > 1){
            // 이미지가 1개 이상일때는 드래그 기능 활성화
            this.isDragOn = true;
            this.dragOn();
        }else{
            // 이미지가 1개 이하일때는 드래그 기능 비활성화
            this.isDragOn = false;
            this.dragOff();
        }
        this.changeImage($showIdx, 0);
    },

    dragOn : function(){
        if($(".ext-type").hasClass("non-vr")){
            $(".ext-type").removeClass("non-vr")
        }

        if($(".ext-type .dir-mark").hasClass("hide")){
            $(".ext-type .dir-mark").removeClass("hide")
        }
    },

    dragOff : function(){
        if(!$(".ext-type ").hasClass("non-vr")){
            $(".ext-type").addClass("non-vr")
        }

        if(!$(".ext-type .dir-mark").hasClass("hide")){
            $(".ext-type .dir-mark").addClass("hide")
        }
    },

    makeCarImgElement : function($rotationImgLen, $imgElementLen){
        var i=0;
        var makeLen = $rotationImgLen - $imgElementLen;
        var strEle = "";
        var template = $('#template-exterior-visual').html();
        for(i=0; i<makeLen; i++){
            strEle += template
        }

        $(".model-design .ext-type .gallery-room figure .fig-content .incase").append(strEle);
    },

    changeIndicator : function($hideIdx, $showIdx){
        if($hideIdx !== -1){
            $(".ext-type .indicator-wrap .indicator li").eq($hideIdx).removeClass("on");
        }
        $(".ext-type .indicator-wrap .indicator li").eq($showIdx).addClass("on");
    },

    changeText : function($showIdx){
        var txt = this.modelExteriorModel.attributes.color_names[$showIdx];
        $(".ext-type .indicator-wrap .select-txt").text(txt);
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
        $(".ext-type .indicator-wrap .indicator li").on("click", this.onClick_indicator);

        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB){
            this.galleryRoomCon.on("mousedown", _.bind(this.onMouseDown_360view, this));
            this.galleryRoomCon.on("mousemove", _.bind(this.onMouseMove_360view, this));
            $(document).on("mouseup", _.bind(this.onMouseUp_360view, this));

        }else{
            this.galleryRoomCon.on("touchstart", _.bind(this.onTouchStart_360view, this));
            this.galleryRoomCon.on("touchmove", _.bind(this.onTouchMove_360view, this));
            $(document).on("touchend", _.bind(this.onTouchEnd_360view, this));
        }
    },

    removeEvent : function(){
        $(".ext-type .indicator-wrap .indicator li").off("click");
    },

    onClick_indicator : function(e){
        var index = $(this).index();
        var _this = App.modelExteriorView;
        _this.onChangeContents(index);
        return false;
    },

    onMouseDown_360view : function(e){
        if(this.isDragOn) {
            this.isMouseDown = true;
            if (App.GlobalVars.isIE8) {
                this.mousePosX = e.clientX - this.galleryRoomCon.offset().left + $(document).scrollLeft();
                this.mousePosY = e.clientY - this.galleryRoomCon.offset().left + $(document).scrollTop();
            }
            else {
                this.mousePosX = e.pageX - this.galleryRoomCon.offset().left;
                this.mousePosY = e.pageY - this.galleryRoomCon.offset().top;
            }
            this.mouseStartX = this.mousePosX;
            this.mouseStartY = this.mousePosY;
        }
    },

    onMouseUp_360view : function(e){
        if(this.isDragOn) this.isMouseDown = false;
    },

    onMouseMove_360view : function(e){
        if(this.isDragOn) {
            if (this.isMouseDown) {
                if (App.GlobalVars.isIE8) {
                    this.mousePosX = e.clientX - this.galleryRoomCon.offset().left + $(document).scrollLeft();
                    this.mousePosY = e.clientY - this.galleryRoomCon.offset().left + $(document).scrollTop();
                }
                else {
                    this.mousePosX = e.pageX - this.galleryRoomCon.offset().left;
                    this.mousePosY = e.pageY - this.galleryRoomCon.offset().top;
                }
                this.onRotation_360View(e);
            }
        }
    },

    onTouchStart_360view : function(e){
        if(this.isDragOn) {
            this.isMouseDown = true;
            this.mousePosX = e.originalEvent.touches[0].pageX - this.galleryRoomCon.offset().left;
            this.mousePosY = e.originalEvent.touches[0].pageY - this.galleryRoomCon.offset().top;
            this.mouseStartX = this.mousePosX;
            this.mouseStartY = this.mousePosY;
        }
    },

    onTouchEnd_360view : function(e){
        if(this.isDragOn) this.isMouseDown = false;
    },

    onTouchMove_360view : function(e){
        if(this.isDragOn) {
            if (this.isMouseDown) {
                this.mousePosX = e.originalEvent.touches[0].pageX - this.galleryRoomCon.offset().left;
                this.mousePosY = e.originalEvent.touches[0].pageY - this.galleryRoomCon.offset().top;

                var mouseMoveHorizonDistance = this.mousePosX - this.mouseStartX
                var mouseMoveVerticalDistance = this.mousePosY - this.mouseStartY;
                if (Math.abs(mouseMoveHorizonDistance) > Math.abs(mouseMoveVerticalDistance)) {
                    this.onRotation_360View(e);

                    if (e.preventDefault)    e.preventDefault();
                    else                    e.returnValue = false;

                }
            }
        }
    },

    onRotation_360View : function(e){
        if(this.isDragOn) {
            var mouseMoveHorizonDistance = this.mousePosX - this.mouseStartX
            var mouseMoveVerticalDistance = this.mousePosY - this.mouseStartY;


            if (Math.abs(mouseMoveHorizonDistance) % this.rotationSpeed == 0) {
                if (mouseMoveHorizonDistance > 0) {
                    this.rotationRight();
                    //this.rotationLeft();
                } else if (mouseMoveHorizonDistance < 0) {
                    this.rotationLeft();
                    //this.rotationRight();
                }
                this.mouseStartX = this.mousePosX;
            }
        }
    },

    rotationLeft : function(){
        this.currentRotationIdx--
        if(this.currentRotationIdx < 0){
            this.currentRotationIdx = this.rotationImgLen-1;
        }
        this.changeImage(this.currentCarIdx, this.currentRotationIdx);
    },

    rotationRight : function(){
        this.currentRotationIdx++
        if(this.currentRotationIdx > this.rotationImgLen-1){
            this.currentRotationIdx = 0;
        }
        this.changeImage(this.currentCarIdx, this.currentRotationIdx);
    },

    changeImage : function($carIdx, $currentRotationIdx){
        var imgUrl = this.modelExteriorVisualsCollection.models[$carIdx].attributes.car_images_url[$currentRotationIdx];
        $(".model-design .ext-type .gallery-room figure .fig-content .incase").css("background", "url('"+imgUrl+"') no-repeat 0 0");
    },

    onResize : function(){
        this.setImageUrl();
        this.setImgLayout();
    },

    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";

        if(this.currentBrowserMode !== browserMode) {
            secectorImg = $(".model-design .ext-type .gallery-room figure .fig-content span.dir-mark")
            if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                // 이미지에 웹버전 경로 넣어주기
                imgUrl = secectorImg.attr("data-web-img-url");
                secectorImg.css("background", "url('"+imgUrl+"') no-repeat 0 34px");
            } else {
                // 이미지에 모바일 경로 넣어주기
                imgUrl = secectorImg.attr("data-mobile-img-url");
                secectorImg.css("background", "url('"+imgUrl+"') no-repeat 0 34px");
            }

            this.currentBrowserMode = browserMode;
        }
    },

    setImgLayout : function(){
        var carImgCon = $(".model-design .ext-type .gallery-room figure .fig-content .incase");
        var dirMarkCon = $(".model-design .ext-type .gallery-room figure .fig-content .dir-mark");
        var per = (App.GlobalVars.windowWidth / this.DEFAULT_CAR_WIDTH)+0.08;
        var carWidth = 0;
        var carHeight = 0;
        var carPosX = 0;
        var carPosY = 0;

        carWidth = this.DEFAULT_CAR_WIDTH * per;
        carHeight = this.DEFAULT_CAR_HEIGHT * per;

        if (App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_MOBILE) {
            if (App.GlobalVars.isIE8) {
                carPosX = - (carWidth/2);
                carPosY = (this.DEFAULT_CAR_HEIGHT/2) - (carHeight/2);

                carImgCon.css({"zoom": per,
                                "margin-left": carPosX,
                                "margin-top": carPosY});
                dirMarkCon.css({"zoom": per,
                                "margin-left": carPosX,
                                "margin-top": carPosY});
            } else {
                carImgCon.css("transform", "scale("+per+")")
                dirMarkCon.css("transform", "scale("+per+")")
            }
        }else{
            if (App.GlobalVars.isIE8) {
                 carImgCon.css({"zoom": 1,
                    "margin-left": -514,
                    "margin-top": 0})
                dirMarkCon.css({"zoom": 1,
                    "margin-left": -514,
                    "margin-top": 0})
            } else {

                carImgCon.css("transform", "scale(1)");
                dirMarkCon.css("transform", "scale(1)");
            }
        }
    }
});


////////////////////////////////////////////////////////////////////
//  Exterior Indicator View
////////////////////////////////////////////////////////////////////


App.Views.ModelExteriorIndicatorView = Backbone.View.extend({
    template: _.template($('#template-exterior-indicator').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});