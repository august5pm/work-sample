App.Views.ModelConceptcarGalleryView = Backbone.View.extend({

    initialize : function(obj){
        // 컨텐츠 비주얼 기본 크기
        this.CONTETNS_VISUAL_DEFAULT_WIDTH = 1600;
        this.CONTENTS_VISUAL_DEFAULT_HEIGHT = 710;

        this.section0 = $("#sec-1");

        this.containerPosiArr = [];
        this.containerPosiTopArr = [];
        this.animationArr = [];

        this.curIndex = 0;
        this.curNaviIndex = App.GlobalVars.NAVIGATION_THIRD_INDEX;

        this.currentHash = "";
        this.scrollTime = 0;
        this.currentBrowserMode;
        this.delayID;
        this.isStart = true;

        this.calculateTimer;
        this.calculateTimerCheck = 0;
        this.maxHeight = 0;

        this.startGallery = 0;

        this.setGallery();
        this.setAnimate();
        this.onResize();

        this.startCheckCalculate();
//        _.delay( _.bind(this.calculatePos, this), 50 );
        _.delay( _.bind(function(){this.onChangeHash()}, this), 50 );
        this.addEvent();
    },

    setGallery: function(){
        //gallery
        this.gallery = "";
        this.galleryIndex = -1;
        this.galleryCon = $('#sec-2 .kv-gallery-wap');
        this.galleryData;
        this.galleryMenuType = -1;
        this.galleryDataSet();

        this.gallery_btnPrev = $(".conceptcar .content-2 .btn-prev-next a.prev");
        this.gallery_btnNext = $(".conceptcar .content-2 .btn-prev-next a.next");
        this.gallery_dimmed = $(".conceptcar .content-2 .bg-load");
        this.galleryMenu = $(".conceptcar .content-2 .navi-tabs-wrap .sub-tab li");

        for(var i=0 ; i<this.galleryMenu.length ; i++){
            $(this.galleryMenu[i]).attr("index", i);
        }
    },


    render: function (){

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
        this.listenTo(App, App.Events.SCROLL_MOVE, this.onScrollMove);
        this.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);
        this.listenTo(App, App.Events.CHANGE_MOBILE, this.onChangeMobile);
        this.listenTo(App, App.Events.CHANGE_WEB, this.onChangeWeb);
        this.listenTo(App, App.Events.CLICK_NAVI_THREEDEPTH, this.onClick_naviThird);
        $(window).on("hashchange", _.bind(this.onChangeHash, this));
        $(".conceptcar .btn-next-arr").on("click", _.bind(this.onArrowClick, this));

        this.galleryAddEvent();
    },

    galleryAddEvent: function(){
        this.gallery_btnPrev.on("click", _.bind(this.onClickPrev, this));
        this.gallery_btnNext.on("click", _.bind(this.onClickNext, this));
        this.galleryMenu.on("click", this.onClickGalleryMenu);
    },

    galleryRemoveEvent: function(){

    },



    removeEvent : function(){

    },

    onArrowClick: function(e){
        $('html, body').stop().animate({ scrollTop: $(window).height() }, 1200, "easeInOutQuart");
    },



    //////////////////////////////////////////////////////////////////////
    ///////  check load height resize
    //////////////////////////////////////////////////////////////////////
    startCheckCalculate: function(){
        this.calculateTimer = setInterval(_.bind(this.onTimerCalculate, this), 100);
    },

    stopCheckCalculate: function(){
        clearInterval(this.calculateTimer);
    },

    onTimerCalculate: function(){
        if(this.maxHeight != $(document).height() - $(window).height()){
            this.maxHeight = $(document).height() - $(window).height()
            this.calculatePos();
            //console.log(this.maxHeight)
        }

        this.calculateTimerCheck++;
        if(this.calculateTimerCheck > 30){
            this.stopCheckCalculate();
        }
    },








//////////////////////////////////////////////////////////////////////////
//    gallery
//////////////////////////////////////////////////////////////////////////
    changeGallery: function(galleryIndex){
        if(galleryIndex == this.galleryIndex) return;
        //console.log(galleryIndex)

        this.galleryIndex = galleryIndex;
        this.showGalleryDimmed();

        var time = 500;
        if(this.isStart){
            this.isStart = false;
            time = 0;
        }

        clearTimeout(this.delayID);
        this.delayID = _.delay(_.bind(this.delayChangeGallery, this), time);

    },

    delayChangeGallery: function(){
        this.controlGalleryMenu(this.galleryIndex);

        if(this.gallery != "") this.gallery.destory();
        // modify / 20161215 / do : 자세히보기 버튼 추가로 인해 인덱스값이 필요
        this.gallery = new App.Views.ModelConceptcarGalleryItemView({ model:this.galleryData.list[this.galleryIndex], galleryIndex:this.galleryIndex });
        this.galleryCon.html(this.gallery.el);
        this.gallery.render();
    },

    onClickPrev: function(e){
        this.gallery.prevImage();

        return false;
    },

    onClickNext: function(e){
        this.gallery.nexImage();

        return false;
    },

    onClickGalleryMenu: function(e){
        var index = $(this).attr("index");
        var conceptCar = App.coceptcarGalleryView;
        conceptCar.changeGallery(index);

        return false;

    },

    showGalleryDimmed: function(){
        this.gallery_dimmed.removeClass("off");
        _.delay(_.bind(this.hideGalleryDimmed, this), 500);

    },

    hideGalleryDimmed: function(){
        this.gallery_dimmed.addClass("off");
    },

    controlGalleryMenu: function(index){

        for(var i=0 ; i<this.galleryMenu.length ; i++){
            if(i == index){
                $(this.galleryMenu[i]).addClass("on");
            } else {
                $(this.galleryMenu[i]).removeClass("on");
            }
        }
    },


    prevGallery: function(){
        var index = (parseInt(this.galleryIndex)-1);
        if(index < 0) index = this.galleryMenu.length - 1;
        this.changeGallery(index);
    },

    nextGallery: function(){
        var index = (parseInt(this.galleryIndex)+1);
        if(index == this.galleryMenu.length) index = 0;
        this.changeGallery(index);
    },



//////////////////////////////////////////////////////////////////////////
//    resize
//////////////////////////////////////////////////////////////////////////
    onResize: function() {
        var globalVars = App.GlobalVars;

        if(this.gallery != "") this.gallery.onResize();

        if(globalVars.currentDevice == globalVars.DEVICE_TYPE_WEB){

            if(globalVars.currentBrowserMode == globalVars.BROWSER_MODE_WEB){
                var winH = $(window).height();
                var winW = $(window).width();

                this.section0.css("height", winH );
                this.isRemoveAttr = false;
            }else{

                if(this.isRemoveAttr == false){
                    this.section0.removeAttr('style');
                    this.isRemoveAttr = true;
                }
            }

        } else {


        }

        this.calculatePos();
        this.setKeyVisualImgSize();
        this.setImageUrl();
        this.galleryMenuResize();
    },

    setKeyVisualImgSize : function() {
        var globalVars = App.GlobalVars;
        var selectorKeyvisualImg = $(".conceptcar .content-1 .fig-content img");

        if(globalVars.currentBrowserMode == globalVars.BROWSER_MODE_MOBILE){
            selectorKeyvisualImg.css({"width": "100%", "height": "auto", "top": 0, "left": 0});
            return;
        }

        var tbGap = globalVars.currentBrowserMode == globalVars.BROWSER_MODE_TABLET ? 100 : 0;

        var per = App.resizeView.sumSizePer(App.GlobalVars.windowWidth, App.GlobalVars.windowHeight-tbGap, 1600, 800);

        var width = Math.floor(1600 * per);
        var height = Math.floor(800 * per);
        var posX = 0;
        var posY = 0;

        if (App.GlobalVars.windowWidth < width) {
            posX = -((width - App.GlobalVars.windowWidth) / 2)
        }

        if (App.GlobalVars.windowHeight < height) {
            posY = -((height - App.GlobalVars.windowHeight) / 2)
        }


        selectorKeyvisualImg.css({"width": width, "height": height, "top": posY, "left": posX});
    },



    calculatePos: function(){

        this.containerPosiArr = [];
        var num = 0;

        // 비주얼 인덱스값 정의
        num = 0;
        this.containerPosiArr.push(num);

        for(i=0; i<3; i++){
            num = num + 800;
            this.containerPosiArr.push(num);
        }

        num = $(document).height() - $(window).height();
        this.containerPosiArr.push(num);

        // 네비게이션 인덱스값
        this.containerPosiTopArr = [];
        num = 0;
        this.containerPosiTopArr.push(num);
        num = $("#sec-1").height();
        this.containerPosiTopArr.push(num);

        var sec2_h = $(".content-2 .kv-wrap").height() + ($(".content-2 .navi-tabs-wrap").height() + 35);

        var marginBot = 0;
        var globalVars = App.GlobalVars;
        var footH = globalVars.currentBrowserMode == globalVars.BROWSER_MODE_WEB ? 0 : $("footer").height();
        if($("#sec-3").height() > $(window).height()+marginBot){
            num = num + sec2_h;
        } else {
            num = $(document).height() - $(window).height() - footH
        }
        this.containerPosiTopArr.push(num);
    },


    galleryMenuResize: function(){
        var winW =  App.GlobalVars.windowInnerWidth;
        var paddingL = 10;
        var totW = 0;
        var liArr = $(".conceptcar .content-2 .navi-tabs-wrap .navi-list>li");

        var type = -1;

        if(App.GlobalVars.isIE8){
            if(winW > 1340){
                type = 0;
                for(var i=0 ; i<liArr.length ; i++){
                    totW += $(liArr[i]).width();
                }
                totW += paddingL;
            } else {
                type = 1;
                totW = "auto";
            }

            if(type == this.galleryMenuType){
                return;
            }
            this.galleryMenuType = type;


        } else {
            //var maxW = 1700;
            var maxW = 1280;
            if(winW <= maxW && winW >= 960){
                type = 1;

                if(type == this.galleryMenuType){
                    return;
                }

                totW = "auto";
            } else {
                if(winW > maxW){
                    type = 0;
                    paddingL = 10;
                } else {
                    type = 0;
                    paddingL = 30;
                }

                if(type == this.galleryMenuType){
                    return;
                }

                for(var i=0 ; i<liArr.length ; i++){
                    totW += $(liArr[i]).width();
                }
                totW += paddingL;

//                if(App.GlobalVars.isIE8) totW =  "auto";
            }

            this.galleryMenuType = type;



        }

        $(".conceptcar .content-2 .navi-tabs-wrap .navi-list").css("width", totW);



    },










//////////////////////////////////////////////////////////////////////////
//    navi & hash change
//////////////////////////////////////////////////////////////////////////
    //on click navi
    onClick_naviThird : function(index){
        var hash = App.GlobalVars.CONCEPTCAR_HASH[index];
        var targetY = this.containerPosiTopArr[index];

        var time = ( Math.abs( $(window).scrollTop() - targetY ) ) * 0.2;
        time = Math.max(time, 700);
        time = Math.min(time, 1500);

        var self = this;
        $('html, body').stop().animate({ scrollTop: targetY }, time * this.scrollTime, "easeInOutQuart", self.onCompleteScroll);
    },

    onCompleteScroll: function(){
//        console.log( "complete : ", $(window).scrollTop() );
    },

    onScrollMove: function(scroll){
        var globalVars = App.GlobalVars;

        if(globalVars.currentDevice == globalVars.DEVICE_TYPE_WEB){
            if(globalVars.currentBrowserMode == globalVars.BROWSER_MODE_WEB){
                var gap, cur, per;

                for(var i=0 ; i<this.containerPosiArr.length ; i++){

                    if(this.containerPosiArr[i] > scroll){

                        gap = this.containerPosiArr[i] - this.containerPosiArr[i-1];
                        cur = this.containerPosiArr[i] - scroll;
                        per = 1 - cur/gap;

                        this.curIndex = i;
                        this.curScroll = scroll;

                        break;
                    }
                }

                //console.log(this.curIndex);
                for(var i=0 ; i<this.animationArr.length ; i++){
                    if(i < this.curIndex-1){
                        this.setMotionEnd( this.animationArr[i] );
                    } else if(this.curIndex-1 == i){
                        this.checkSection(this.animationArr[i], per);
                    } else if(i > this.curIndex-1){
                        this.setMotionStart( this.animationArr[i] );
                    }
                }
            }
        }

        //check index
        var naviIndex = -1;
        var isEnd = true;
        for(var i=0 ; i<this.containerPosiTopArr.length ; i++){

            if(this.containerPosiTopArr[i] > scroll){
                naviIndex = i;
                isEnd = false;
                break;
            }
        }
        if(isEnd) naviIndex = this.containerPosiTopArr.length;

        if(this.curNaviIndex != naviIndex-1){
            this.curNaviIndex = naviIndex-1;
            //change hash
            this.changeHash(App.GlobalVars.CONCEPTCAR_HASH[this.curNaviIndex]);
        }
    },


    //change hash
    changeHash : function(id){
        window.location.hash = id;
        return false;
    },

    onChangeHash: function(){
        //change navi
        var windowHash = window.location.hash.split("#")[1];
        var checkModel;

        if (windowHash != this.currentHash)
        {
            if( $.inArray("/", windowHash) == -1){
                this.currentHash = windowHash;
            } else {
//                this.currentHash = windowHash.split("/")[0];
                this.startGallery = windowHash.split("/")[1];

                this.changeHash(windowHash.split("/")[0]);

                return;
            }

            for(var i=0 ; i<App.GlobalVars.CONCEPTCAR_HASH.length ; i++){
                if(App.GlobalVars.CONCEPTCAR_HASH[i] == this.currentHash){

                    if(this.curNaviIndex != i){

                        //주소창 변경으로 들어온 경우
                        this.onClick_naviThird(i);
                        App.navigationView.changeThirdIndex(i);

                    } else {
                        //스크롤무브나 네비 클릭으로 들어온 경우
                        App.navigationView.changeThirdIndex(i);
                    }
                } else {
                    //models change

                }
            }
        }

        if(this.isStart) this.changeGallery(this.startGallery);
        this.scrollTime = 1;
    },






    start: function(){

    },




//////////////////////////////////////////////////////////////////////////
//    scroll check
//////////////////////////////////////////////////////////////////////////
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
//                        if (!App.GlobalVars.isIE8) $(arr[i].selector).css('transform', 'scale(' + sc + ')');
                    } else if (proper == "") {

                    } else {
                        tg = this.getTweenedValue(startValue, endValue, per, 1, ease);
                        $(arr[i].selector).css(proper, tg);
                    }
                }


            } else if(scroll < arr[i].startAt){
                //start
//                _animateReset(i);
                this.changeProperStart(arr[i]);

            } else if(scroll > arr[i].endAt){
                //end
//                _animateEndReset(i);
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


    setAnimate: function() {
        this.animation_sec1 = [
            {
                selector: '#sec-1 .fig-txt h3',
                //움직임 시작 scroll값
                startAt: 0,
                //움직임 끝 scroll값
                endAt: 0.7,
                ease: TWEEN.Easing.Cubic.In,
                keyframes: [
                    {
                        position: 0,
                        properties: {
                            "margin-top": 0,
                            "opacity": 1
                        }
                    },
                    {
                        position: 10,
                        properties: {
                            "margin-top": -100,
                            "opacity": 0
                        }
                    }
                ]
            },
            {
                selector: '#sec-1 .fig-txt p',
                //움직임 시작 scroll값
                startAt: 0.1,
                //움직임 끝 scroll값
                endAt: 0.8,
                ease: TWEEN.Easing.Cubic.In,
                keyframes: [
                    {
                        position: 0,
                        properties: {
                            "margin-top": 0,
                            "opacity": 1
                        }
                    },
                    {
                        position: 10,
                        properties: {
                            "margin-top": -100,
                            "opacity": 0
                        }
                    }
                ]
            }
        ]

        this.animation_sec2 = [
            {
                selector: '#sec-3 .fig-txt h3',
                //움직임 시작 scroll값
                startAt: 0.2,
                //움직임 끝 scroll값
                endAt: 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position: 0,
                        properties: {
                            "margin-top": -400
                        }
                    },
                    {
                        position: 10,
                        properties: {
                            "margin-top": 0
                        }
                    }
                ]
            },
            {
                selector: '#sec-3 .fig-txt p',
                //움직임 시작 scroll값
                startAt: 0,
                //움직임 끝 scroll값
                endAt: 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position: 0,
                        properties: {
                            "margin-top": -400
                        }
                    },
                    {
                        position: 10,
                        properties: {
                            "margin-top": 0
                        }
                    }
                ]
            },
            {
                selector: '#sec-3 .conceptcar-movable img',
                //움직임 시작 scroll값
                startAt: 0,
                //움직임 끝 scroll값
                endAt: 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position: 0,
                        properties: {
                            "margin-top": -600
                        }
                    },
                    {
                        position: 10,
                        properties: {
                            "margin-top": 0
                        }
                    }
                ]
            },
            {
                selector: '#sec-3 .conceptcar-movable img',
                //움직임 시작 scroll값
                startAt: 0.2,
                //움직임 끝 scroll값
                endAt: 1,
                ease: TWEEN.Easing.Linear.None,
                keyframes: [
                    {
                        position: 0,
                        properties: {
                            "opacity": 0
                        }
                    },
                    {
                        position: 10,
                        properties: {
                            "opacity": 1
                        }
                    }
                ]
            }
        ]

        this.animationArr.push(this.animation_sec1);
        this.animationArr.push(this.animation_sec2);
    },

    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";
        var hybridLen = $(".changable").length;

        if(this.currentBrowserMode !== browserMode) {
            for (i = 0; i < hybridLen; i++) {
                secectorImg = $(".conceptcar .changable:eq(" + i + ")" );

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
    },



    galleryDataSet: function(){
        this.galleryData = {
            list:[
                
            ]
        };

    }


});