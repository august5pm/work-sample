App.Views.ModelVisualView = Backbone.View.extend({

    initialize : function(obj){
        this.resizeView = obj.resizeView;
        this.keyVisualCon = $("#model-pg1 .key-visual");
        this.contentsVisualCon = $("#model-pg1 .contents-visual");
        this.keyvisualVideoCon = $("#model-pg1 .key-visual .fixed-area .fig-content");
        this.videoPlayer = $("#model-pg1 .key-visual .fixed-area .fig-content video");
        this.btnPlayVideo = $("#model-pg1 .key-visual .fixed-area .fig-txt a");
        this.btnClosePopupVideo = $("#model-popup-youtube .close-pop");

        // 키비주얼 기본 크기
        this.KEY_VISUAL_DEFAULT_WIDTH = 1600;
        this.KEY_VISUAL_DEFAULT_HEIGHT = 900;

        // 컨텐츠 비주얼 기본 크기
        this.CONTETNS_VISUAL_DEFAULT_WIDTH = 1600;
        this.CONTENTS_VISUAL_DEFAULT_HEIGHT = 800;

        // 가운데 정렬 텍스트 (width)
        this.contents_1_txt_default_widthArr = [468, 224];
        this.contents_3_txt_default_widthArr = [307, 158];

        // 정렬
        // 상단정렬
        this.ALIGN_TOP_LEFT = "TL";
        this.ALIGN_TOP_CENTER = "TC";
        this.ALIGN_TOP_RIGHT = "TR";

        // 가운데 정렬
        this.ALIGN_CENTER_LEFT ="CL";
        this.ALIGN_CENTER = "CENTER";
        this.ALIGN_CENTER_RIGHT = "CR";

        // 하단 정렬
        this.ALIGN_BOTTOM_LEFT = "BL";
        this.ALIGN_BOTTOM_CENTER = "BC";
        this.ALIGN_BOTTOM_RIGHT = "BR";

        this.curIndex = 1;
        this.firstGap = 0;
        this.animationArr = [];
        this.isShowPopup = false;
        this.isCompleteVideo = false;
        this.metadataLoadNum = 0;

        this.containerPosiArr = [];
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) {
            this.setAnimate();
        }

        this.onResize();
        this.addEvent();
        this.show();

        /*
        this.playVideo();
        this.showKeyvisualImage();
        */
    },

    checkVideoReady : function(){
        var _this = App.modelVisualView;
        _this.metadataLoadNum++

        if(_this.metadataLoadNum != 50) {
            if (!App.GlobalVars.isIE8) {
                if (_this.videoPlayer.get(0).readyState != 0) {
                    _this.videoPlayer.get(0).currentTime = 0;
                    _this.videoPlayer.get(0).muted = true;
                    _this.videoPlayer.get(0).play();
                    _this.isAddEventCompleteVideo = true;
                } else {
                    setTimeout(_this.checkVideoReady, 100);
                }
            } else {
                _this.showKeyvisualImage();
            }
        }else{
            _this.showKeyvisualImage();
        }
    },

    render: function (){
        this.checkVideoReady();
    },

    show : function(){
        $("#model-pg2").removeClass("hide");
        $("#model-pg3").removeClass("hide");
        $("#model-pg4").removeClass("hide");
        $("#model-pg5").removeClass("hide");
        $("#model-pg6").removeClass("hide");
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        this.videoPlayer.on("ended", _.bind(this.onComplete_video, this));
        this.btnPlayVideo.on("click", _.bind(this.onClick_btnPlayVideo, this));
        this.btnClosePopupVideo.on("click", _.bind(this.onClick_closePopup, this));
    },

    removeEvent : function(){

    },


    //////////////////////////////////////////////////////////////////////////
    //  video player event handler
    //////////////////////////////////////////////////////////////////////////

    resetVideo : function(){
        if(!App.GlobalVars.isIE8) this.videoPlayer.get(0).currentTime = 0;
    },

    playVideo : function(){
        if(!App.GlobalVars.isIE8) this.videoPlayer.get(0).play();
    },

    pauseVideo : function(){
        if(!App.GlobalVars.isIE8) this.videoPlayer.get(0).pause();
    },

    onComplete_video : function(e){

        this.isCompleteVideo = true;
        this.showKeyvisualImage();
    },

    showKeyvisualImage : function(){
        TweenLite.to($("#standard"), 1.2, {"opacity":1})
    },

    hideKeyvisualImage : function(){
        
    },

    onClick_btnPlayVideo : function(){
        this.onResize();
        this.showVideoPlayerPopup();

        return false;
    },

    // 팝업 닫기버튼을 눌렀을 때
    onClick_closePopup : function(e){
        this.hideKeyvisualImage();
        this.hideVideoPlayerPopup();
        this.onResize();
        return false;
    },


    // 유투브 플레이어 팝업 보여주기
    showVideoPlayerPopup : function(){
        var videoUrl = $("#model-popup-youtube iframe").attr("data-src")+"?autoplay=1&rel=0";
        $("body").css({"overflow": "hidden"});
        this.pauseVideo();
        this.showOverlay();
        $("#model-popup-youtube").removeClass("hide");
        $(".youtube-player").attr("src", videoUrl);
        this.resizeVideoPlayerPopup();
        this.isShowPopup = true;
    },

    // 유투브 플레이어 팝업 닫아주기
    hideVideoPlayerPopup : function(){
        this.hideOverlay();
        $("#model-popup-youtube").addClass("hide");
        $(".youtube-player").attr("src", "");
        $("body").css({"overflow": "visible"});

        if(!this.isCompleteVideo) this.playVideo();
        this.isShowPopup = false;
    },

    // 리사이즈
    resizeVideoPlayerPopup :function(){
        $("#main-popup-youtube").css({"width": App.GlobalVars.windowWidth,
            "height": App.GlobalVars.windowHeight});
        $(".youtube-player").attr({"width":App.GlobalVars.windowWidth,
            "height":App.GlobalVars.windowHeight});
    },

    // 오버레이 보여주기
    showOverlay : function(){
        $(".overlay").removeClass("hide");
    },

    // 오버레이 닫아주기
    hideOverlay : function(){
        $(".overlay").addClass("hide");
    },


    //////////////////////////////////////////////////////////////////////////
    //  resize event handler
    //////////////////////////////////////////////////////////////////////////
    onResize : function(){
        if(this.isShowPopup){
            this.resizeVideoPlayerPopup();
        }
        this.setKeyVisualImgSize();
        this.setContentsVisualImgSize();

        this.calculatePos();
    },

    setKeyVisualImgSize : function() {
        var per = this.resizeView.sumSizePer(App.GlobalVars.windowWidth, App.GlobalVars.windowHeight, App.GlobalVars.WINDOW_DEFAULT_WIDTH, App.GlobalVars.WINDOW_DEFAULT_HEIGHT);
        var selectorKeyvisualImg = $("#model-pg1 .key-visual .fixed-area .fig-content img");
        var width = Math.floor(this.KEY_VISUAL_DEFAULT_WIDTH * per);
        var height = Math.floor(this.KEY_VISUAL_DEFAULT_HEIGHT * per);
        var posX = 0;
        var posY = 0;

        if (App.GlobalVars.windowWidth < width) {
            posX = -((width - App.GlobalVars.windowWidth) / 2)
        }

        if (App.GlobalVars.windowHeight < height) {
            posY = -((height - App.GlobalVars.windowHeight) / 2)
        }

        this.keyVisualCon.css("height", App.GlobalVars.windowHeight);
        selectorKeyvisualImg.css({"width": width, "height": height, "top": posY, "left": posX});

        this.keyvisualVideoCon.css({"width":App.GlobalVars.windowWidth, "height":App.GlobalVars.windowHeight});
    },

    setContentsVisualImgSize : function(){
        var per = (App.GlobalVars.windowWidth-App.GlobalVars.NAVIGATION_WIDTH) / App.GlobalVars.WINDOW_DEFAULT_WIDTH
        var width = Math.floor(this.CONTETNS_VISUAL_DEFAULT_WIDTH * per);
        var height = Math.floor(this.CONTENTS_VISUAL_DEFAULT_HEIGHT * per);

        this.contentsVisualCon.css({"width":App.GlobalVars.windowWidth, "height":this.CONTENTS_VISUAL_DEFAULT_HEIGHT});

        if(App.GlobalVars.windowWidth > this.CONTETNS_VISUAL_DEFAULT_WIDTH) {
            // 브라우저 크기가 max 사이즈 보다 커지면 크기와 위치값 리사이징
            this.setContentsVisualImgPos($("#model-pg1 .content-1 .fig-content img"), this.ALIGN_CENTER, width, height);
            this.setContentsVisualImgPos($("#model-pg1 .content-2 .fig-content img"), this.ALIGN_CENTER_LEFT, width, height);
            this.setContentsVisualImgPos($("#model-pg1 .content-3 .fig-content img"), this.ALIGN_CENTER, width, height);

            // 마지막 컨텐츠는 리사이징 고정해달라는 요청에 의해 위치값만 리사이징
            this.setContentsVisualImgPos($("#model-pg1 .content-4 .fig-content img"), this.ALIGN_BOTTOM_RIGHT, this.CONTETNS_VISUAL_DEFAULT_WIDTH, this.CONTENTS_VISUAL_DEFAULT_HEIGHT);
        }else{
            // 브라우저 크기가 max 사이즈 보다 작으면 위치 값만 리사이징
            this.setContentsVisualImgPos($("#model-pg1 .content-1 .fig-content img"), this.ALIGN_CENTER, this.CONTETNS_VISUAL_DEFAULT_WIDTH, this.CONTENTS_VISUAL_DEFAULT_HEIGHT);
            this.setContentsVisualImgPos($("#model-pg1 .content-2 .fig-content img"), this.ALIGN_CENTER_LEFT, this.CONTETNS_VISUAL_DEFAULT_WIDTH, this.CONTENTS_VISUAL_DEFAULT_HEIGHT);
            this.setContentsVisualImgPos($("#model-pg1 .content-3 .fig-content img"), this.ALIGN_CENTER, this.CONTETNS_VISUAL_DEFAULT_WIDTH, this.CONTENTS_VISUAL_DEFAULT_HEIGHT);
            this.setContentsVisualImgPos($("#model-pg1 .content-4 .fig-content img"), this.ALIGN_BOTTOM_RIGHT, this.CONTETNS_VISUAL_DEFAULT_WIDTH, this.CONTENTS_VISUAL_DEFAULT_HEIGHT);
        }

        // 가운데 정렬 텍스트
        var naviWidth = 0;
        var posX = 0;
        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB) naviWidth = App.GlobalVars.NAVIGATION_WIDTH
        posX = ((App.GlobalVars.windowWidth-naviWidth)/2)-(this.contents_1_txt_default_widthArr[0]/2)
        $("#model-pg1 .content-1 .fig-txt h4").css({"left":posX});

        posX = ((App.GlobalVars.windowWidth-naviWidth)/2)-(this.contents_1_txt_default_widthArr[1]/2)
        $("#model-pg1 .content-1 .fig-txt p").css({"left":posX});

        posX = ((App.GlobalVars.windowWidth-naviWidth)/2)-(this.contents_3_txt_default_widthArr[0]/2)
        $("#model-pg1 .content-3 .fig-txt h4").css({"left":posX});

        posX = ((App.GlobalVars.windowWidth-naviWidth)/2)-(this.contents_3_txt_default_widthArr[1]/2)
        $("#model-pg1 .content-3 .fig-txt p").css({"left":posX});
    },

    // 컨텐츠 이미지 정렬시키기
    setContentsVisualImgPos : function(selector, align, width, height){
        var posX = 0;
        var posY = 0;

        switch(align){
            case this.ALIGN_TOP_LEFT :
                posX = 0;
                posY = 0;
                break;
            case this.ALIGN_TOP_CENTER :
                posX = -((width - App.GlobalVars.windowWidth)/2);
                posY = 0;
                break;
            case this.ALIGN_TOP_RIGHT :
                posX =  App.GlobalVars.windowWidth - width;
                posY = 0;
                break;
            case this.ALIGN_CENTER_LEFT :
                posX = 0;
                posY = -((height - this.CONTENTS_VISUAL_DEFAULT_HEIGHT)/2)
                break;
            case this.ALIGN_CENTER :
                posX = -((width - App.GlobalVars.windowWidth)/2);
                posY = -((height - this.CONTENTS_VISUAL_DEFAULT_HEIGHT)/2)
                break;
            case this.ALIGN_CENTER_RIGHT :
                posX = App.GlobalVars.windowWidth - width;
                posY = -((height - this.CONTENTS_VISUAL_DEFAULT_HEIGHT)/2)
                break;
            case this.ALIGN_BOTTOM_LEFT :
                posX = 0;
                posY = this.CONTENTS_VISUAL_DEFAULT_HEIGHT - height;
                break;
            case this.ALIGN_BOTTOM_CENTER :
                posX = -((width - App.GlobalVars.windowWidth)/2);
                posY = this.CONTENTS_VISUAL_DEFAULT_HEIGHT - height;
                break;
            case this.ALIGN_BOTTOM_RIGHT :
                posX = App.GlobalVars.windowWidth - width;
                posY = this.CONTENTS_VISUAL_DEFAULT_HEIGHT - height;
                break;
            default :
                break;
        }

        selector.css({"left":posX, "top":posY, "width":width, "height":height});
    },

    calculatePos: function(){
        
    },



    //////////////////////////////////////////////////////////////////////////
    //  scroll move event handler
    //////////////////////////////////////////////////////////////////////////
    onScrollMove : function(curIndex, per){
        
        this.curIndex = curIndex;
        for(var i=0 ; i<this.animationArr.length ; i++){
            if(i < this.curIndex-1){
                this.setMotionEnd( this.animationArr[i] );
            } else if(this.curIndex-1 == i){
                this.checkSection(this.animationArr[i], per);
            } else if(i > this.curIndex-1){
                this.setMotionStart( this.animationArr[i] );
            }
        }
    },


    checkSection: function(arr, scroll){

        for (var i = 0; i<arr.length; i++) {
            if (scroll >= arr[i].startAt && scroll <= arr[i].endAt) {
                var per = (scroll - arr[i].startAt) / (arr[i].endAt - arr[i].startAt);
                var startValue;
                var endValue;
                var proper;
                var tg;
                var ease;

                for (properties in arr[i].keyframes[0].properties) {
                    proper = properties;
                    startValue = arr[i].keyframes[0].properties[proper];
                    endValue = arr[i].keyframes[1].properties[proper];

                    if (arr[i].ease != undefined) {
                        ease = arr[i].ease;
                    } else {
                        ease = TWEEN.Easing.Sinusoidal.Out;
                    }

                    if (proper == "rotate") {
                        var angle = this.getTweenedValue(startValue, endValue, per, 1, ease);
                        if (!App.GlobalVars.isIE8) $(arr[i].selector).css('transform', 'rotate(' + angle + 'deg)');
                    } else if (proper == "scale") {
                        var sc = this.getTweenedValue(startValue, endValue, per, 1, ease);
                    } else if (proper == "") {

                    } else {
                        tg = this.getTweenedValue(startValue, endValue, per, 1, ease);
                        $(arr[i].selector).css(proper, tg);
                    }
                }


            } else if(scroll < arr[i].startAt){
                //start
                this.changeProperStart(arr[i]);

            } else if(scroll > arr[i].endAt){
                //end
                this.changeProperEnd(arr[i]);
            }

        }

    },

    // get tweened values
    getTweenedValue: function(start, end, currentTime, totalTime, tweener) {
        var delta = end - start;
        var percentComplete = currentTime/totalTime;

        if (!tweener) tweener = TWEEN.Easing.Linear.None;

        return tweener(percentComplete) * delta + start
    },



    setMotionStart: function(arr){
        for (var i = 0; i<arr.length; i++) {
            this.changeProperStart(arr[i]);
        }
    },

    changeProperStart: function(obj){
        var proper;
        for (properties in obj.keyframes[0].properties) {
            proper = properties;
            if(obj.keyframes[0].position == 0){
                $(obj.selector).css(proper, obj.keyframes[0].properties[proper]);
            }
        }
    },

    setMotionEnd: function(arr){
        for (var i = 0; i<arr.length; i++) {
            this.changeProperEnd(arr[i]);
        }
    },

    changeProperEnd: function(obj){
        var proper;
        for (properties in obj.keyframes[1].properties) {
            proper = properties;
            if(obj.keyframes[1].position == 10){
                $(obj.selector).css(proper, obj.keyframes[1].properties[proper]);
            }
        }
    },



    // change mobile
    onChangeMobile: function(){
        this.resetAllAnimation();
    },

    // change web
    onChangeWeb: function(){
        var scroll = $(window).scrollTop();
        this.onScrollMove(scroll);
    },

    resetAllAnimation: function(){
        for(var i=0 ; i<this.animationArr.length ; i++){
            var arr = this.animationArr[i]

            for(var j=0 ; j<arr.length ; j++){

                for (properties in arr[j].keyframes[0].properties) {
                    proper = properties;
                    $(arr[j].selector).css(proper, "");
                }
            }
        }
    },


    setAnimate: function(){
        this.animation_sec1 = [
            {
                selector : '#visual-holder .key-visual .fig-txt h3',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 0.7,
                ease: TWEEN.Easing.Cubic.In,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 0,
                            "opacity":1
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": -100,
                            "opacity":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .key-visual .fig-txt strong',
                //움직임 시작 scroll값
                startAt : 0.1,
                //움직임 끝 scroll값
                endAt : 0.8,
                ease: TWEEN.Easing.Cubic.In,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 0,
                            "opacity":1
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": -100,
                            "opacity":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .key-visual .fig-txt p',
                //움직임 시작 scroll값
                startAt : 0.2,
                //움직임 끝 scroll값
                endAt : 0.9,
                ease: TWEEN.Easing.Cubic.In,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 0,
                            "opacity":1
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": -100,
                            "opacity":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .key-visual .fig-txt a',
                //움직임 시작 scroll값
                startAt : 0.3,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Cubic.In,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 0,
                            "opacity":1
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": -100,
                            "opacity":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .key-visual .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 0
                        }
                    },
                    {
                        position:5,
                        properties: {
                            "margin-top": -200
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-1 .fig-txt h4',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 0.5,
                ease: TWEEN.Easing.Cubic.Out,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 400
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": 0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-1 .fig-txt p',
                //움직임 시작 scroll값
                startAt : 0.5,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Cubic.Out,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "margin-top": 400
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": 0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-1 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale":1,
                            "margin-top": -400,
                            "opacity":1
                        }
                    },
                    {
                        position:5,
                        properties: {
                            "scale":1.1,
                            "margin-top": 0,
                            "opacity":1
                        }
                    }
                ]
            }
        ],



        /////////////////////////////////////////////////////////////////////////////////////
        this.animation_sec2 = [
            {
                selector : '#visual-holder .key-visual .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:5,
                        properties: {
                            "margin-top": -200
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "margin-top": -400
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-1 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:5,
                        properties: {
                            "scale":1,
                            "margin-top": 0,
                            "opacity":1
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale":1.1,
                            "margin-top": 400,
                            "opacity":1
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-2 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "opacity":1,
                            "margin-top":-400
                        }
                    },
                    {
                        position:5,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":0
                        }
                    }
                ]
            }
        ],


        /////////////////////////////////////////////////////////////////////////////////////
        this.animation_sec3 = [
            {
                selector : '#visual-holder .content-2 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:5,
                        properties: {
                            "scale": 1,
                            "opacity":1,
                            "margin-top":0
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":400
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-3 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "opacity":1,
                            "margin-top":-400
                        }
                    },
                    {
                        position:5,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-3 .fig-txt h4',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 0.5,
                ease: TWEEN.Easing.Cubic.Out,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "margin-top":400
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "margin-top":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-3 .fig-txt p',
                //움직임 시작 scroll값
                startAt : 0.5,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Cubic.Out,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "margin-top":400
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "margin-top":0
                        }
                    }
                ]
            }
        ],



        /////////////////////////////////////////////////////////////////////////////////////
        this.animation_sec4 = [
            {
                selector : '#visual-holder .content-3 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:5,
                        properties: {
                            "scale": 1,
                            "opacity":1,
                            "margin-top":0
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":400
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-4 .fig-content img',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "opacity":0,
                            "margin-top":-600
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-4 .fig-txt h4',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "opacity":0,
                            "margin-top":-400
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":0
                        }
                    }
                ]
            },
            {
                selector : '#visual-holder .content-4 .fig-txt p',
                //움직임 시작 scroll값
                startAt : 0,
                //움직임 끝 scroll값
                endAt : 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position:0,
                        properties: {
                            "scale": 1,
                            "opacity":0,
                            "margin-top":-350
                        }
                    },
                    {
                        position:10,
                        properties: {
                            "scale": 1.1,
                            "opacity":1,
                            "margin-top":0
                        }
                    }
                ]
            }

        ],

        this.animationArr.push(this.animation_sec1);
        this.animationArr.push(this.animation_sec2);
        this.animationArr.push(this.animation_sec3);
        this.animationArr.push(this.animation_sec4);
    }
});