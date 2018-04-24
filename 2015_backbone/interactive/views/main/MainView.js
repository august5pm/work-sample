App.Views.MainView = Backbone.View.extend({

    initialize : function(obj){
        this.mainKeyvisualView = new App.Views.MainKeyvisualView({resizeView:App.resizeView,
                                                                    mainKeyvisualCollection : App.mainKeyvisualCollection,
                                                                    el:$(".visual-wrap")
                                                                });
        this.mainBannerView = new App.Views.MainBannerView({resizeView:App.resizeView,
                                                                mainKeyvisualView:this.mainKeyvisualView,
                                                                mainBannerModel:App.mainBannerModel,
                                                                mainBannerListModel:App.mainBannerListModel,
                                                                mainBannerCollection:App.mainBannerCollection,
                                                                el:$(".side-banner-wrap ul")
                                                            });

        this.isShowPopup = false;
        this.isShowBanner = false;
        this.keyvisualMoveX = -50;

        this.getMainData();
    },

    render: function (){
        this.mainBannerView.render();
        this.mainKeyvisualView.render();
        this.show();
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
        $(".close-pop").on("click", _.bind(this.onClick_closePopup, this));
        App.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize)
    },

    removeEvent : function(){
        $(".close-pop").off("click");
    },

    // 팝업 닫기버튼을 눌렀을 때
    onClick_closePopup : function(e){
        this.hideVideoPlayerPopup();
        return false;
    },

    // 유투브 플레이어 팝업 보여주기
    showVideoPlayerPopup : function($videoUrl){
        var videoUrl = $videoUrl+"?autoplay=1&rel=0";
        this.showOverlay();
        $("#main-popup-youtube").removeClass("hide");
        $(".youtube-player").attr("src", videoUrl);
        this.resizeVideoPlayerPopup();
        this.isShowPopup = true;
    },

    // 유투브 플레이어 팝업 닫아주기
    hideVideoPlayerPopup : function(){
        this.hideOverlay();
        $("#main-popup-youtube").addClass("hide");
        $(".youtube-player").attr("src", "");
        this.mainKeyvisualView.playVideo();
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

    onResize : function(){
        var _this = App.mainView;
        if(_this.isShowPopup){
            _this.resizeVideoPlayerPopup();
        }

       _this.mainBannerView.onResize();
       _this.mainKeyvisualView.onResize();
    },

    //////////////////////////////////////////////
    //  get data
    //////////////////////////////////////////////
    getMainData : function(){
        var url = App.GlobalVars.GET_MAIN_DATA_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_GET_MAIN_DATA_URL

        App.getJsonData(url, {}, this.getMainDataComplete);
    },

    getMainDataComplete : function($json){
        // 배너 모델에 타입 저장하기
        App.mainBannerModel.set({"type":$json.main.banner.type});

        // 메인 배너 콜렉션 / 키비주얼 콜렉션 에 리스트 파싱하기
        App.mainBannerCollection.set($json.main.banner.list);
        App.mainKeyvisualCollection.set($json.main.visual.list);
        App.mainView.render();
    }
});