App.Views.MainKeyvisualView = Backbone.View.extend({

    initialize : function(obj){
        this.resizeView = obj.resizeView;
        this.mainKeyvisualCollection = obj.mainKeyvisualCollection

        this.container = $(".visual-wrap");
        this.swipeCon = $(".swipe .swipe-wrap");
        this.indicatorContainer = $(".kv-indicator");
        this.btnPlay = $(".main-container .main-btns > a");

        this.idTag = "kv-cont-";
        this.addCount = 0;
        this.keyvisualLen = 0;
        this.currentBrowserMode="";
        this.currentKeyvisualIdx = -1;
        this.currentKeyvisualType = "";
        this.hideKeyvisualIdx = -1;
        this.isAddEventCompleteVideo = false;
        this.videoPlayer = "";
        this.metadataLoadNum = 0;
        this.isStartTimer = false;
        this.isTransition = false;
        this.isVideoPlay = false;
        this.isStart = false;


        // 컨텐츠 타입
        this.TYPE_IMAGE = "image";
        this.TYPE_VIDEO = "video";

        // 비주얼 기본 크기
        this.VISUAL_DEFAULT_WIDTH = 1400;
        this.VISUAL_DEFAULT_HEIGHT = 900;

        // 비주얼 타블렛 가로모드 기본 크기
        this.VISUAL_TABLET_DEFAULT_LANDSCAPE_WIDTH = 1024;
        this.VISUAL_TABLET_DEFAULT_LANDSCAPE_HEIGHT = 688;

        // 비주얼 모바일 세로모드 기본 크기
        this.VISUAL_TABLET_DEFAULT_PORTRAIT_WIDTH = 640;
        this.VISUAL_TABLET_DEFAULT_PORTRAIT_HEIGHT = 908;

        // 타이틀 중앙 지점 (네비게이션 제외한 넓이)
        this.CENTER_X = 790;
        this.POS_TL = 0;
        this.POS_TC = 1;
        this.POS_TR = 2;
        this.POS_BL = 3;
        this.POS_BC = 4;
        this.POS_BR = 5;

        this.timer = 0;
        this.time = 5000;
        this.timerConut = 0;
        this.isPlay = false;
        this.arrTitlePosX = [];

        this.mySwipe = "";
        this.retryTime = 20
    },

    render: function (){
        // 키비주얼 갯수 저장
        this.keyvisualLen = this.mainKeyvisualCollection.models.length;

        // 키비주얼 아이디 셋팅
        this.addMoreCollectionData();

        // 리스트 만들기
        this.addAll();
    },

    addAll : function(){
        this.mainKeyvisualCollection.forEach(this.addOne, this);
    },

    addOne : function($model){

        // 이미지 / 비디오 타입 여부
        var type = $model.get("type");

        // 템플릿 설정 해주기
        var htmlTemplate = _.template($('#template-keyvisual-list-image').html());
        if(type == this.TYPE_VIDEO) {
            htmlTemplate = _.template($('#template-keyvisual-list-video').html());
        }

        // 리스트 생성
        var listview = new App.Views.MainKeyvisualListView({model:$model, template:htmlTemplate});
        this.swipeCon.append(listview.render().el.childNodes);

        if(this.mainKeyvisualCollection.models[this.addCount].attributes.type_logo_image_url == "") {
            $(".visual-wrap figure:eq(" +this.addCount+ ") .logo-zero").addClass("hide")
        }

        // 인디게이터 생성
        var indicator = new App.Views.MainKeyvisualIndicatorView({model:$model});
        this.indicatorContainer.append(indicator.render().el.childNodes)
        $(".btn_kv_indicator").on("click", this.onClick_btnIndicator);

        // 생성 카운트 증가 시키기
        this.addCount++

        // 키비주얼 리스트가 모두 생성 되었을 때 이미지 경로 넣어주기
        if(this.keyvisualLen == this.addCount){
            this.addOneComplete();
        }
    },

    tempTimerFunc : function(){

    },

    addOneComplete : function(){
        this.isPlay = true;
        this.setImageUrl();
        this.show();
        App.mainView.mainBannerView.show();
        $("#main-body section").css("height", "auto");
        this.btnPlay.removeClass("on");
        if(App.GlobalVars.currentDevice != App.GlobalVars.DEVICE_TYPE_WEB) this.makeSwipe();

        $(".swipe .swipe-wrap .fig-txt a").on("click", this.onClick_keyvisualLink);
    },

    onClick_keyvisualLink : function(e){
        var name = $(this).attr("data-log");
        App.setGoogleHit(name);
    },

    makeSwipe : function(){
        var elem = document.getElementById("main-kv-swipe");
        $(".main-container .visual-wrap .swipe-wrap > figure").removeClass("hide")

        $(".main-container .visual-wrap .swipe").css({"width":"100%",
                                                    "overflow": "hidden",
                                                    "visibility": "hidden",
                                                    "position": "relative"});

        $(".main-container .visual-wrap .swipe-wrap").css({"width":"100%",
                                                            "overflow": "hidden",
                                                            "position": "relative"});

        $(".main-container .visual-wrap .swipe-wrap > figure").css({"float":"left",
                                                                    "width":"100%",
                                                                    "position":"relative"});

        this.mySwipe = Swipe(elem, {
             //startSlide: 1,
             //auto: 3000,
            continuous: false,
            // disableScroll: true,
            // stopPropagation: true,
             callback: function(index, element) {
                 var _this = App.mainView.mainKeyvisualView;
                 _this.stopTimer();
                 //console.log(_this.currentKeyvisualIdx, index);
                 _this.hideIndicator(_this.currentKeyvisualIdx);
                 _this.currentKeyvisualIdx = index;
                 _this.showIndicator(_this.currentKeyvisualIdx );
             },
            transitionEnd: function(index, element) {
                var _this = App.mainView.mainKeyvisualView;
                _this.timerConut = index;
                _this.startTimer();
            }
        });

        this.currentKeyvisualIdx = 0;
        this.showIndicator(this.currentKeyvisualIdx );
        this.startTimer();


    },

    addMoreCollectionData : function(){
        var i = 0;
        for(i=0; i<this.keyvisualLen; i++){
            // 키비주얼 콜렉션에 id 저장하기
            this.mainKeyvisualCollection.models[i].set("kid", this.idTag+i);

            // 키비주얼 콜렉션에 인디게이터 링크 경로 저장하기
            this.mainKeyvisualCollection.models[i].set("indicator_link_url", "#");

            // 키비주얼 콜렉션에 인디게이터 링크 텍스트 저장하기
            this.mainKeyvisualCollection.models[i].set("indicator_link_text", i+"번 키비주얼");

            // 타이틀 포지션 클래스 저장하기
            var titlePos = this.mainKeyvisualCollection.models[i].attributes.title_position;
            this.mainKeyvisualCollection.models[i].set("title_position_class", "title-pos-"+titlePos);
        }
    },

    // 브라우저 별 이미지로 변경해주기
    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var i = 0;

        var secectorKeyvisualImg = "";
        var selectorTitleImg = "";

        if(this.currentBrowserMode !== browserMode) {
            for (i = 0; i < this.keyvisualLen; i++) {
                secectorKeyvisualImg = $(".visual-wrap figure:eq(" + i + ") .fig-content img")
                selectorTitleImg = $(".visual-wrap figure:eq(" + i + ") .fig-txt img")

                if (browserMode == App.GlobalVars.BROWSER_MODE_WEB) {
                    // 이미지에 웹버전 경로 넣어주기
                    this.onChange_keyvisualImage(secectorKeyvisualImg, selectorTitleImg, secectorKeyvisualImg.attr("data-web-img-url"), selectorTitleImg.attr("data-web-img-url"))
                    this.changeVideoMode();

                    if(App.mainView.isShowBanner) $(".visual-wrap").css("left", App.mainView.keyvisualMoveX);
                } else if(browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                    // 이미지에 타블렛 버전 경로 넣어주기 (타이틀은 웹이미지 사용)
                    this.onChange_keyvisualImage(secectorKeyvisualImg, selectorTitleImg, secectorKeyvisualImg.attr("data-tablet-img-url"), selectorTitleImg.attr("data-web-img-url"))
                    this.changeVideoMode();
                    $(".visual-wrap").css("left", 0);
                }else{
                    // 이미지에 모바일 경로 넣어주기
                    this.onChange_keyvisualImage(secectorKeyvisualImg, selectorTitleImg, secectorKeyvisualImg.attr("data-mobile-img-url"),  selectorTitleImg.attr("data-mobile-img-url"))
                    this.changeVideoMode();
                    $(".visual-wrap").css("left", 0);
                }
            }

            this.currentBrowserMode = browserMode;
        }
    },

    // 키비주얼 이미지 변경
    onChange_keyvisualImage : function($eleKeyvisual, $eleTitle, $keyvisualImgUrl, $titleImgUrl){
        var secectorKeyvisualImg = $eleKeyvisual;
        var selectorTitleImg = $eleTitle;

        secectorKeyvisualImg.attr("src", $keyvisualImgUrl);
        selectorTitleImg.attr("src", $titleImgUrl);
    },

    show : function(){
        this.container.removeClass("hide");

        if(App.GlobalVars.isIE8 || App.GlobalVars.isIE9){
            $(".visual-wrap figure .video-player").addClass("hide");
            $(".video-image").css("opacity", 1);
        }
        this.addEvent();
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) this.onChange_keyVisual(0, false);
        this.onResize();
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        $(".visual-wrap figure .fig-txt a").on("click", this.onClick_textLink);
        this.btnPlay.on("click", this.onClick_btnPlay);
    },

    removeEvent : function(){

    },


    ////////////////////////////////////////////////////
    //  from MainBannerView.js
    ////////////////////////////////////////////////////

    slideInKeyvisual : function($target, $isTrans, $startX, $endX, $motionClass){
        this.isTransition = true;
        TweenLite.killTweensOf($target);
        TweenLite.to($target, 0.8, {"css":{"left":$endX}, ease:Cubic.easeInOut, onComplete:this.showKeyvisualComplete});
    },

    slideOutKeyvisual : function($target, $isTrans, $startX, $endX, $motionClass){
        this.isTransition = true;
        TweenLite.killTweensOf($target);
        TweenLite.to($target, 0.8, {"css":{"left":$endX}, ease:Cubic.easeInOut, onComplete:this.hideKeyvisualComplete});
    },

    ////////////////////////////////////////////////////

    onClick_btnPlay : function(e){
        var _this = App.mainView.mainKeyvisualView;
        if(_this.isPlay){
            _this.stopVisual();

        }else{
            _this.playVisual();
        }
        return false;
    },

    playVisual : function(){
        this.isPlay = true;
        if(!this.isVideoPlay) this.startTimer();
        this.btnPlay.removeClass("on");
    },

    stopVisual : function(){
        this.isPlay = false;
        this.stopTimer();
        this.btnPlay.addClass("on");
    },

    onClick_textLink : function(e){
        var menu = "keyvisual";
        var seq = $(this).attr("data-seq")
        App.setHit(menu, seq);
    },

    onClick_btnPlayVideo : function(e){
        // show popup
        this.pauseVideo();
        var videoUrl =  this.mainKeyvisualCollection.models[this.currentKeyvisualIdx].get("youtube_url");
        App.mainView.showVideoPlayerPopup(videoUrl);
        return false;
    },

    playVideo : function(){
        this.videoPlayer.get(0).play();
    },

    pauseVideo : function(){
        this.videoPlayer.get(0).pause();
    },

    onClick_btnIndicator : function(e){
        var index = $(this).index();
        var _this = App.mainView.mainKeyvisualView;

        if(index != _this.currentKeyvisualIdx && !_this.isTransition) {

            _this.timerConut = index;
            _this.onChange_keyVisual(index, true);
        }
        return false;
    },

    onChange_keyVisual : function($idx, $isTrans){
        if(this.currentKeyvisualIdx != $idx) {

            var oldIdx = this.currentKeyvisualIdx;
            var isNext = false;

            this.stopTimer();
            if($idx > this.currentKeyvisualIdx){
                isNext = true;
            }

            if(this.currentKeyvisualIdx != -1) {
                if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) {
                    this.hideKeyvisual(this.currentKeyvisualIdx, $isTrans, isNext);
                }
                this.hideIndicator(this.currentKeyvisualIdx);
            }

            this.currentKeyvisualIdx = $idx;

            this.showKeyvisual(this.currentKeyvisualIdx, $isTrans, isNext);
            this.showIndicator(this.currentKeyvisualIdx);
        }
    },

    showKeyvisual : function($idx, $isTrans, $isNext){
        var selectorKeyvisual = $(".visual-wrap figure").eq($idx);
        var startX = 0;

        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) {
            if ($isTrans) {
                if ($isNext) {
                    startX = (App.GlobalVars.windowInnerWidth / 4);
                } else {
                    startX = -(App.GlobalVars.windowInnerWidth / 4);
                }

                if (!App.GlobalVars.isIE8) {

                    selectorKeyvisual.removeClass("hide").css({"z-index": 1, "left": startX})
                } else {

                    selectorKeyvisual.removeClass("hide").css({"z-index": 1, "left": startX})
                }
            } else {
                if (!App.GlobalVars.isIE8) {

                    selectorKeyvisual.removeClass("hide").css({"z-index": 1, "left": startX});
                } else {


                    selectorKeyvisual.removeClass("hide").css({"z-index": 1, "left": startX});
                }
            }

            App.mainView.mainKeyvisualView.slideInKeyvisual(selectorKeyvisual, $isTrans, 0, 0, "animation-slide-keyvisual")
        }else{
            this.mySwipe.slide($idx)
        }
    },

    showKeyvisualComplete : function(){
        var index = $(this).index()-1;
        var _this = App.mainView.mainKeyvisualView;

        _this.checkType();
        _this.isTransition = false;
    },

    checkType : function(){
        var type = this.mainKeyvisualCollection.models[this.currentKeyvisualIdx].get("type");
        this.currentKeyvisualType = type;
        this.isVideoPlay = false;
        if (type === this.TYPE_IMAGE || App.GlobalVars.isIE8 || App.GlobalVars.isIE9) {
            this.startTimer();
        } else {
            this.checkCurrentVideoMode();
        }
    },

    checkCurrentVideoMode : function(){
        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB) {
            // 비디오 플레이어 시작
            var keyvisualImage = $(".visual-wrap figure:eq(" + this.currentKeyvisualIdx + ") .fig-content .video-image");

                keyvisualImage.css("opacity", 0);
                this.isVideoPlay = true;
                this.videoPlayer = $(".visual-wrap figure:eq(" + this.currentKeyvisualIdx + ") .video-player");
                this.videoPlayer.on("ended", _.bind(this.onComplete_video, this));
                this.metadataLoadNum = 0;
                this.checkVideoReady();

                // 비디오 플레이 버튼 이벤트 생성
                var btnPlayVideo = $(".visual-wrap figure:eq(" + this.currentKeyvisualIdx + ") .fig-btn-play a");
                btnPlayVideo.on("click", _.bind(this.onClick_btnPlayVideo, this));

        }else{
            this.isVideoPlay = false;
            var keyvisualImage = $(".visual-wrap figure:eq(" + this.currentKeyvisualIdx + ") .fig-content .video-image");
            TweenLite.killTweensOf(keyvisualImage);
            TweenLite.to(keyvisualImage, 0.4, {css:{"opacity": 1}});
            this.startTimer();
        }
    },

    // 브라우저 모드가 변할때 비디오 모드 체크
    changeVideoMode : function(){
        var keyvisualImage =(".visual-wrap figure .fig-content .video-image")
        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB) {
            $(".visual-wrap figure .video-player").removeClass("hide");
            TweenLite.killTweensOf(keyvisualImage);
            if(this.currentKeyvisualType !== this.TYPE_VIDEO) {
                if(!App.GlobalVars.isIE8 && !App.GlobalVars.isIE9) {
                    TweenLite.to(keyvisualImage, 0, {css:{"opacity": 0}});
                }
            }else{
                this.startTimer();
            }
        }else{
            this.isVideoPlay = false;
            $(".visual-wrap figure .video-player").addClass("hide");
            TweenLite.killTweensOf(keyvisualImage);
            TweenLite.to(keyvisualImage, 0, {css:{"opacity": 1}});
        }
    },

    checkVideoReady : function(){

        var _this = App.mainView.mainKeyvisualView;
        _this.metadataLoadNum++
        if(_this.metadataLoadNum != _this.retryTime) {
            if (!App.GlobalVars.isIE8 && !App.GlobalVars.isIE9) {


                if (_this.videoPlayer.get(0).readyState != 0) {

                     _this.videoPlayer.get(0).currentTime = 0;
                     _this.videoPlayer.get(0).muted = true;
                     _this.videoPlayer.get(0).play();
                     _this.isAddEventCompleteVideo = true;
                } else {
                    setTimeout(_this.checkVideoReady, 100);
                }
            } else {

                _this.showVideoImage();
                _this.startTimer();
            }
        }else{

            _this.showVideoImage();
            _this.startTimer();
        }
    },

    startTimer : function(){
		if (!this.isStartTimer && this.keyvisualLen > 1 && this.isPlay) {
			//console.log("start timer");
			this.timer = window.setInterval(this.timerEventHandler, this.time);
			this.isStartTimer = true;
		}

    },

    stopTimer : function(){
		if (this.isStartTimer && this.keyvisualLen > 1) {
			//console.log("stop timer");
			window.clearInterval(this.timer)
			this.isStartTimer = false;
		}
    },

    timerEventHandler : function(){
        var _this = App.mainView.mainKeyvisualView;
        _this.timerConut++
        if(_this.timerConut == _this.keyvisualLen){
            _this.timerConut = 0;
        }

        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) {
            _this.onChange_keyVisual(_this.timerConut, true);
        }else{
            _this.mySwipe.slide(_this.timerConut);
        }
    },

    consoleContainer: function(str){
        var str = $("consoleCon").html() + "<br>"
    },

    onComplete_video : function(){
        this.isVideoPlay = false;
        this.showVideoImage();
        this.startTimer();
    },

    showVideoImage : function(){
        var keyvisualImage = $(".visual-wrap figure:eq(" + this.currentKeyvisualIdx + ") .fig-content .video-image");
        TweenLite.killTweensOf(keyvisualImage);
        TweenLite.to(keyvisualImage, 1.2, {"opacity":1})
    },

    hideVideoImage : function(){
        var keyvisualImage = $(".visual-wrap figure:eq(" + this.hideKeyvisualIdx + ") .fig-content .video-image");
        TweenLite.killTweensOf(keyvisualImage);
        TweenLite.to(keyvisualImage, 0, {"opacity":0})
    },

    hideKeyvisual : function($idx, $isTrans, $isNext){

        var selectorKeyvisual = $(".visual-wrap figure").eq($idx);
        var targetX = 0;

        this.hideKeyvisualIdx = $idx;

        if($isNext){
            targetX = -App.GlobalVars.windowInnerWidth;
        }else{
            targetX = App.GlobalVars.windowInnerWidth;
        }

        if($isTrans) {
            selectorKeyvisual.removeClass("animation-slide-keyvisual").css({"z-index": 2, "left": 0});
        }else{
            selectorKeyvisual.css({"z-index": 2, "left": targetX});
        }

        App.mainView.mainKeyvisualView.slideOutKeyvisual(selectorKeyvisual, $isTrans, 0, targetX, "animation-slide-keyvisual")
    },

    hideKeyvisualComplete : function(){

        var index = $(this).index()-1;
        var _this = App.mainView.mainKeyvisualView;

        var selectorKeyvisual = $(".visual-wrap figure").eq(_this.hideKeyvisualIdx);
        var type = _this.mainKeyvisualCollection.models[_this.hideKeyvisualIdx].get("type");
        if (type === _this.TYPE_IMAGE || App.GlobalVars.isIE8 || App.GlobalVars.isIE9) {

        } else {
            // 비디오 플레이어 초기화
            _this.videoPlayer = $(".visual-wrap figure:eq(" + _this.hideKeyvisualIdx + ") .video-player");
            if(!App.GlobalVars.isIE8 && !App.GlobalVars.isIE9) {
                _this.videoPlayer.get(0).pause();
                _this.videoPlayer.get(0).currentTime = 0;
            }

            if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB) {
                // 비디오 플레이 버튼 이벤트 제거
                var btnPlayVideo = $(".visual-wrap figure:eq(" + _this.hideKeyvisualIdx + ") .fig-btn-play a");
                btnPlayVideo.off("click");

                if (_this.isAddEventCompleteVideo) {
                    _this.videoPlayer.off("ended");;
                    _this.isAddEventCompleteVideo = false;
                    _this.hideVideoImage();
                }
            }
        }

        selectorKeyvisual.css({"z-index": 0}).addClass("hide");
        _this.isTransition = false;

    },

    showIndicator : function($idx){
        var selector = $(".btn_kv_indicator:eq("+$idx+")");
        selector.addClass("on");
    },

    hideIndicator: function($idx){
        var selector = $(".btn_kv_indicator:eq("+$idx+")");
        selector.removeClass("on");
    },

    onResize : function(){

        if(App.GlobalVars.currentDevice != App.GlobalVars.DEVICE_TYPE_MOBILE) {
            var width = App.GlobalVars.WINDOW_DEFAULT_WIDTH
            var height = App.GlobalVars.WINDOW_DEFAULT_HEIGHT

            if (App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                if (App.GlobalVars.windowInnerWidth > App.GlobalVars.windowHeight) {
                    width = App.GlobalVars.TABLET_LANDSCAPE_DEFAULT_WIDTH;
                    height = App.GlobalVars.TABLET_LANDSCAPE_DEFAULT_HEIGHT;
                } else {
                    width = App.GlobalVars.TABLET_PORTRAIT_DEFAULT_WIDTH;
                    height = App.GlobalVars.TABLET_PORTRAIT_DEFAULT_HEIGHT;
                }
            } else if (App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_MOBILE) {
                if (App.GlobalVars.windowInnerWidth > App.GlobalVars.windowHeight) {
                    width = App.GlobalVars.MOBILE_LANDSCAPE_DEFAULT_WIDTH;
                    height = App.GlobalVars.MOBILE_LANDSCAPE_DEFAULT_HEIGHT;
                } else {
                    width = App.GlobalVars.MOBILE_PORTRAIT_DEFAULT_WIDTH;
                    height = App.GlobalVars.MOBILE_PORTRAIT_DEFAULT_HEIGHT;
                }
            }
            
            var per = this.resizeView.sumSizePer(App.GlobalVars.windowInnerWidth, App.GlobalVars.windowHeight, width, height);
            var i = 0;


            this.setImageUrl();
            this.setImgSize(per);
   

            for (i = 0; i < this.keyvisualLen; i++) {
                var titlePos = this.mainKeyvisualCollection.models[i].attributes.title_position;
                if (titlePos == this.POS_TC || titlePos == this.POS_BC) {
                    this.setTitlePos(i);
                    this.setPlayBtnPos(i);
                }
            }

            if (!this.isStart) {
                this.isStart = true;
            } else {
                this.resetTimer();
            }
        }

        this.setIndicatorPos();
    },

    resetTimer : function(){
        this.stopTimer();
        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB){

            if(this.currentKeyvisualType != this.TYPE_VIDEO){
                this.startTimer();
            }else{
                if(!this.isVideoPlay){
                    this.startTimer();
                }
            }
        }else{
            this.startTimer();
        }
    },

    setImgSize : function($per){
        var per = $per;
        var selectorFiguer = $(".visual-wrap figure");
        var selectorImgCon = $(".kv_type_image");

        var selectorImgParent = $(".fig-content");
        var selectorImg = $(".fig-content img");
        var width = Math.floor(this.VISUAL_DEFAULT_WIDTH * per);
        var height = Math.floor(this.VISUAL_DEFAULT_HEIGHT * per);
        var posX = 0;
        var posY = 0;
        var headerHeight = 0;
        var containerHeight = App.GlobalVars.windowHeight;

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_TABLET){
            headerHeight  = 50;
            if(App.GlobalVars.windowInnerWidth >  App.GlobalVars.windowHeight) {
                // landscape mode
                width = Math.floor(this.VISUAL_TABLET_DEFAULT_LANDSCAPE_WIDTH * per);
                height = Math.floor(this.VISUAL_TABLET_DEFAULT_LANDSCAPE_HEIGHT * per);
                containerHeight = (App.GlobalVars.windowHeight-headerHeight)
            }else{
                // portrait mode
                per = App.GlobalVars.windowInnerWidth / this.VISUAL_TABLET_DEFAULT_LANDSCAPE_WIDTH
                width = Math.floor(this.VISUAL_TABLET_DEFAULT_LANDSCAPE_WIDTH * per);
                height = Math.floor(this.VISUAL_TABLET_DEFAULT_LANDSCAPE_HEIGHT * per);
                containerHeight = (height-posY-headerHeight)
            }

        }

        if(App.GlobalVars.windowInnerWidth < width){
            posX = -((width - App.GlobalVars.windowInnerWidth)/2)
        }

        if(App.GlobalVars.windowHeight < height){
            posY = -((height - App.GlobalVars.windowHeight)/2)
        }

        this.container.css({"width":App.GlobalVars.windowInnerWidth, "height":containerHeight});
        selectorImg.css({"width":width, "height":height, "top": posY, "left":posX});
        selectorImgParent.css({"width":App.GlobalVars.windowInnerWidth, "height":(height-posY-headerHeight)});
        selectorImgCon.css({"width":App.GlobalVars.windowInnerWidth, "height":(height-posY-headerHeight)});
        selectorFiguer.css({"width":App.GlobalVars.windowInnerWidth, "height":containerHeight});

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_MOBILE){
            //this.container.removeAttr("style");
            var per = this.VISUAL_TABLET_DEFAULT_PORTRAIT_HEIGHT / this.VISUAL_TABLET_DEFAULT_PORTRAIT_WIDTH
            this.container.css({"width":App.GlobalVars.windowInnerWidth, "height":App.GlobalVars.windowInnerWidth*per});
            selectorImg.removeAttr("style");
            selectorImgParent.removeAttr("style");
            selectorImgCon.removeAttr("style");
            selectorFiguer.removeAttr("style");
        }
    },

    setTitlePos : function($idx){
        var target = $("#"+this.idTag+$idx+" .fig-txt");
        var targetImg = $("#"+this.idTag+$idx+" .fig-txt img")
        this.setCenterPos(target, targetImg);
    },

    setIndicatorPos : function(){
        var indicatorCon = $(".visual-wrap .main-btns");
        var indicatorW = $(".visual-wrap .main-btns").width()/2;

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB){
            indicatorCon.css({"left":"50%", "margin-left":-indicatorW+(App.GlobalVars.NAVIGATION_WIDTH/2)});
        }else if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_TABLET){
            indicatorCon.css({"left":"50%", "margin-left":-indicatorW});
        }else{
            indicatorCon.css({"left":"50%", "margin-left":-indicatorW});
        }
    },

    setPlayBtnPos : function($idx){
        var target = $("#"+this.idTag+$idx+" .fig-btn-play");
        var targetImg = $("#"+this.idTag+$idx+" .fig-btn-play img")
        this.setCenterPos(target, targetImg);
    },

    setCenterPos : function($target, $targetImg){
        var per = App.GlobalVars.windowInnerWidth / App.GlobalVars.WINDOW_DEFAULT_WIDTH
        var posCenterX = this.CENTER_X * per;
        var targetWidth = $targetImg.width();
        var targetX = posCenterX - (targetWidth/2)-70

        $target.css("left",targetX);
    }
});

////////////////////////////////////////////////////////
//  키비주얼 리스트 뷰
////////////////////////////////////////////////////////
App.Views.MainKeyvisualListView = Backbone.View.extend({
    initialize : function(obj){
        this.template = obj.template;
    },
    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

////////////////////////////////////////////////////////
//  키비주얼 인디게이터 뷰
////////////////////////////////////////////////////////
App.Views.MainKeyvisualIndicatorView = Backbone.View.extend({
    template :_.template($('#template-keyvisual-indicator').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});