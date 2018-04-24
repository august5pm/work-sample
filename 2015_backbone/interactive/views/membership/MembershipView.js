App.Views.MembershipView = Backbone.View.extend({

    initialize : function(obj){

        // 컨텐츠 비주얼 기본 크기
        this.CONTETNS_VISUAL_DEFAULT_WIDTH = 1600;      // 1220
        this.CONTENTS_VISUAL_DEFAULT_HEIGHT = 900;

        this.containerPosiTopArr = [];

        this.curIndex = 0;
        this.curNaviIndex = App.GlobalVars.NAVIGATION_SECOND_INDEX;

        this.currentHash = "";
        this.scrollTime = 0;

        this.currentBrowserMode = "";

        this.section0 = $("#page0");
        this.contentsVisualCon = $(".membership .contents-visual");



        _.delay( _.bind(this.calculatePos, this), 200 );
        _.delay( _.bind(function(){this.onChangeHash()}, this), 50 );

        this.addEvent();
        this.setBtnApp();
        this.onResize();
    },

    render: function (){

    },

    show : function(){
        //console.log("membership view show");
        //this.addEvent();
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        this.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);
        this.listenTo(App, App.Events.SCROLL_MOVE, this.onScrollMove);
        this.listenTo(App, App.Events.CLICK_NAVI_TWODEPTH, this.onClick_naviTwo);

        $(".membership .btn-next-arr").on("click", _.bind(this.onArrowClick, this));
        $(window).on("hashchange", _.bind(this.onChangeHash, this));

        $(".mbasic-list>li>a").on("click", _.bind(this.onClick_list, this));

        $(".btn-android").on("click", this.onClick_btnApp);
        $(".btn-ios").on("click", this.onClick_btnApp);
    },

    removeEvent : function(){
        //$("#model-pg5 .quick-price .toggle-list li:eq(0) .content-area li").off("click");
    },

    onArrowClick: function(e){
        $('html, body').stop().animate({ scrollTop: $(window).height() }, 1200, "easeInOutQuart");
    },

    // 멤버십 혜택 Hash 디벨롭 - 컨텐츠 추가, 유동적인 세로폭 길이 갱신
    onClick_list : function( $evt ){
        var target = $($evt.currentTarget);
        var isOpen = target.parent().hasClass("open");
        if( isOpen ) {
            target.parent().removeClass("open");
        }else{
            target.parent().addClass("open");
        }

        this.calculatePos();
        return false;
    },

    onClick_btnApp : function(e){
        var code = $(this).attr("data-code");
        App.footerView.sendEventCode(code);
    },

    setBtnApp : function(){
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB){
            $(".btn-android").removeClass("hide");
            $(".btn-ios").removeClass("hide");
        }else{
            //console.log("333333333333");
            if(App.GlobalVars.currentOS == App.GlobalVars.OS_TYPE_ANDROID){
                $(".btn-android").removeClass("hide");
            }else if(App.GlobalVars.currentOS == App.GlobalVars.OS_TYPE_IOS){
                $(".btn-ios").removeClass("hide");
            }else{

            }
        }
    },
    

    onResize : function(){
        var globalVars = App.GlobalVars;

        if(globalVars.currentDevice == globalVars.DEVICE_TYPE_WEB){

            if(globalVars.currentBrowserMode == globalVars.BROWSER_MODE_WEB){
                var winH = $(window).height();
                var winW = $(window).width();

                this.section0.css("height", winH);
                this.isRemoveAttr = false;
                if($(".mnav-idx-4 .banner-wrap").hasClass("hide")){
                    $(".mnav-idx-4 .banner-wrap").removeClass("hide");
                }
            }else{

                if(!$(".mnav-idx-4 .banner-wrap").hasClass("hide")){
                    $(".mnav-idx-4 .banner-wrap").addClass("hide");
                }
                this.section0.css("height", "auto" );
                if(this.isRemoveAttr == false){
                    this.isRemoveAttr = true;
                }
            }
        } else {
            this.section0.css("height", "auto" );
        }

        this.calculatePos();
        this.setImageUrl();
        this.setKeyVisualImgSize();

        if($(".content-1 .btns").hasClass("hide")){
            $(".content-1 .btns").removeClass("hide")
        }
    },

    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";
        var len = $(".changable").length;

        if(this.currentBrowserMode !== browserMode) {
            for (i = 0; i < len; i++) {
                secectorImg = $(".changable").eq(i);
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

    setKeyVisualImgSize : function() {
        var globalVars = App.GlobalVars;
        var selectorKeyvisualImg = $(".membership .content-1 .fig-content img");
        var selectorKeyvisualCon = $(".membership .content-1 figure");

        if(globalVars.currentBrowserMode == globalVars.BROWSER_MODE_MOBILE){
            selectorKeyvisualImg.css({"width": "100%", "height": "auto", "top": 0, "left": 0});
            selectorKeyvisualCon.css({"width":"100%", "height":"auto"});
            return;
        }

        var tbGap = globalVars.currentBrowserMode == globalVars.BROWSER_MODE_TABLET ? 100 : 0;
        var per = App.resizeView.sumSizePer(App.GlobalVars.windowWidth, App.GlobalVars.windowHeight-tbGap, this.CONTETNS_VISUAL_DEFAULT_WIDTH, this.CONTENTS_VISUAL_DEFAULT_HEIGHT);

        var width = Math.floor(this.CONTETNS_VISUAL_DEFAULT_WIDTH * per);
        var height = Math.floor(this.CONTENTS_VISUAL_DEFAULT_HEIGHT * per);
        var posX = 0;
        var posY = 0;

        if (App.GlobalVars.windowWidth < width) {
            posX = -((width - App.GlobalVars.windowWidth) / 2)
        }

        if (App.GlobalVars.windowHeight < height) {
            posY = -((height - App.GlobalVars.windowHeight) / 2)
        }

        posX = App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB ? posX+App.GlobalVars.NAVIGATION_WIDTH * .5 : posX;

        selectorKeyvisualCon.css({"height": App.GlobalVars.windowHeight-tbGap});
        selectorKeyvisualImg.css({"width": width, "height": height, "top": posY, "left": posX});
    },




    calculatePos: function(){
        var num = 0;

        // 네비게이션 인덱스값
        this.containerPosiTopArr = [];
        num = 0;
        this.containerPosiTopArr.push(num);
        num = $(".content-1").height();//web - $(window).height()+ ((this.visualLen-1) * this.visualHeight);
        this.containerPosiTopArr.push(num);
        num = num + $(".content-2").height();
        this.containerPosiTopArr.push(num);

        var marginBot = 50;
        var globalVars = App.GlobalVars;
        var footH = globalVars.currentBrowserMode == globalVars.BROWSER_MODE_WEB ? 0 : $("footer").height();
        if($(".content-3").height() > $(window).height()+marginBot){
            num = num + $(".content-3").height();
//            console.log("big")
        } else {
//            num = num + ( $(".sec-3").height() + $(".sec-4").height() -  $(window).height()) + marginBot;
            num = $(document).height() - $(window).height() - footH;
        }
        this.containerPosiTopArr.push(num);
    },





//////////////////////////////////////////////////////////////////////////
//    navi & hash change
//////////////////////////////////////////////////////////////////////////
    //on click navi
    onClick_naviTwo : function(index){
        var hash = App.GlobalVars.MEMBERSHIP_HASH[index];
        var targetY = this.containerPosiTopArr[index];

        var time = ( Math.abs( $(window).scrollTop() - targetY ) ) * 0.2;
        time = Math.max(time, 700);
        time = Math.min(time, 1500);

        var self = this;
        $('html, body').stop().animate({ scrollTop: targetY }, time * this.scrollTime, "easeInOutQuart", self.onCompleteScroll);
    },

    onCompleteScroll: function(){

    },

    onScrollMove: function(scroll){

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
            this.changeHash(App.GlobalVars.MEMBERSHIP_HASH[this.curNaviIndex]);

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

        if (windowHash != this.currentHash)
        {
            this.currentHash = windowHash;

            for(var i=0 ; i<App.GlobalVars.MEMBERSHIP_HASH.length ; i++){
                if(App.GlobalVars.MEMBERSHIP_HASH[i] == this.currentHash){
                    if(this.curNaviIndex != i){
                        //주소창 변경으로 들어온 경우
                        this.onClick_naviTwo(i);
                        App.navigationView.changeSecondIndex(i);
                    } else {
                        //스크롤무브나 네비 클릭으로 들어온 경우
                        App.navigationView.changeSecondIndex(i);
                    }
                }
            }
        }
        this.scrollTime = 1;

    }
});