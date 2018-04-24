App.Views.ModelView = Backbone.View.extend({
    initialize : function(obj){
        App.animateNumberView = new App.Views.AnimateNumberView();
        App.modelVisualView = new App.Views.ModelVisualView( {resizeView:App.resizeView} );
        App.modelFeaturesView = new App.Views.ModelFeaturesView( {modelFeaturesCollection:App.modelFeaturesCollection, el:$(".tile-pics-wrap")} );
        App.modelExteriorView = new App.Views.ModelExteriorView( {modelExteriorModel:App.modelExteriorModel, modelExteriorVisualsCollection:App.modelExteriorVisualsCollection, modelExteriorIndicatorsCollection:App.modelExteriorIndicatorsCollection} );
        App.modelInteriorView = new App.Views.ModelInteriorView( {modelInteriorModel:App.modelInteriorModel, modelInteriorVisualsCollection:App.modelInteriorVisualsCollection, modelInteriorIndicatorsCollection:App.modelInteriorIndicatorsCollection} );
        App.modelWheelView = new App.Views.ModelWheelView( {modelWheelModel:App.modelWheelModel, modelWheelVisualsCollection:App.modelWheelVisualsCollection, modelWheelIndicatorsCollection:App.modelWheelIndicatorsCollection} );
        App.modelSpecView = new App.Views.ModelSpecView( {modelSpecModel:App.modelSpecModel, modelSpecTopItemsCollection:App.modelSpecTopItemsCollection, modelSpecListCollection:App.modelSpecListCollection} );
        App.modelEstimateView = new App.Views.ModelEstimateView( {modelEstimateModel:App.modelEstimateModel, animateNumberView:App.animateNumberView} );
        App.modelTestDriveView = new App.Views.ModelTestDriveView( {modelTestDriveModel:App.modelTestDriveModel} );

        this.NAVIGATION_TESTDRIVE_INDEX = 5;
        this.NAVIGATION_HEIGHT = 100;
        this.HREF_RXCAMPAIGN = '/rxcampaign/index.asp';
        this.visualLen = $(".contents-visual").length + 1;
        this.visualHeight = 800;
        this.containerPosiArr = [];
        this.containerPosiTopArr = [];
        this.curIndex = 0;
        this.curNaviIndex = App.GlobalVars.NAVIGATION_THIRD_INDEX;
        this.currentHash = "";
        this.scrollTime = 0;
        this.calculateTimer;
        this.calculateTimerCheck = 0;
        this.maxHeight = 0;
        this.jsonData = "";
        this.PAGE_VIEW_TRAKING_DELAY = 1000;
        this.pageViewTrakingTimer = "";
        this.isRXModelPage = ( App.GlobalVars.MODEL_NAME.indexOf('RX') > -1 ) ? true : false;   // RX 모델 페이지 체크
        this.btnShortcutTestdrive = $("#model-tab-navi button");            // Floating, 시승신청 바로가기 버튼( 모바일 && 전체 모델 )
        this.btnLnbRXCampaign = $('.banner-wrap').find('.rxcampaign-lnb');  // LNB, RX 캠페인 바로가기 버튼( RX 모델 && 웹 )
        this.isTestDriveButton = false;
        this.gnbDepth3 = $('.navi-wrap .top-level-menu>ul>li.models-menu>.detail-menu-wrap').eq(0).find('.detail-outer-wrap>.detail-list');
        this.rxcampaignTemplate = $('#template-navigation-rxcampaign').html();
        this.rxcampaignGNB = null;
        this.btnGnbRXCampaign = null;                                      // GNB, RX 캠페인 바로가기 버튼( RX 모델 && 모바일 )

        this.getModelData();
    },

    render: function (){
        App.modelVisualView.render();
        App.modelFeaturesView.render();
        App.modelExteriorView.render();
        App.modelInteriorView.render();
        App.modelWheelView.render();
        App.modelSpecView.render();
        App.modelEstimateView.render();
        App.modelTestDriveView.render();

//        _.delay( _.bind(this.calculatePos, this), 50 );
        _.delay( _.bind(function(){this.onChangeHash()}, this), 50 );
        this.onResize();
        this.show();
        this.startCheckCalculate();
//        this.onChangeHash();
    },

    show : function(){
        this.addEmptyIframe();
        this.addEvent();
        if($(window).scrollTop() == 0) this.onScrollMove(0);
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        $(window).on("hashchange", _.bind(this.onChangeHash, this));
        $(".visual-wrap .key-visual .btn-next-arr").on("click", _.bind(this.onArrowClick, this));
        this.btnShortcutTestdrive.on("click", _.bind(this.onClickTestdrive,this));
        this.btnLnbRXCampaign.on("click", _.bind(this.onClickLnbCampaign,this));

        this.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);
        this.listenTo(App, App.Events.SCROLL_MOVE, this.onScrollMove);
        this.listenTo(App, App.Events.CHANGE_MOBILE, this.onChangeMobile);
        this.listenTo(App, App.Events.CHANGE_WEB, this.onChangeWeb);
        this.listenTo(App, App.Events.CLICK_NAVI_THREEDEPTH, this.onClick_naviThree);
    },

    addEmptyIframe : function(){
        if(App.GlobalVars.isMSIE && $(".popup-wrap.youtube-pop ").hasClass("youtube-pop")){
            var selector = $(".youtube-player");
            var template = $("#template-empty-iframe").html();
            $(".popup.utube-pop").append(template);
        }
    },

    onArrowClick: function( $evt ) {
        $evt.preventDefault();

        $('html, body').stop().animate({ scrollTop: $(window).height() }, 1200, "easeInOutQuart");
    },

 
    onClickTestdrive: function( $evt ) {
        $evt.preventDefault();

        App.footerView.sendEventCode( App.GlobalVars.MODEL_NAME+'_mobile_testdrive' );
        App.navigationView.changeThirdIndex( this.NAVIGATION_TESTDRIVE_INDEX );
        this.onClick_naviThree( this.NAVIGATION_TESTDRIVE_INDEX );
    },


    onClickLnbCampaign: function( $evt ) {
        $evt.preventDefault();

        App.footerView.sendEventCode( 'Navi_'+App.GlobalVars.MODEL_NAME+'_campaign' );
        window.location = this.HREF_RXCAMPAIGN;
    },

    scrollShortcuTestdrive: function( $scrollTop ) {
        var scrollBottom = App.GlobalVars.windowHeight + $scrollTop;
        var testdriveTop = this.containerPosiTopArr[ this.NAVIGATION_TESTDRIVE_INDEX ] + this.NAVIGATION_HEIGHT;
        var idx = ( scrollBottom >= testdriveTop ) ? this.NAVIGATION_TESTDRIVE_INDEX : 0;
        this.isTestDriveButton = ( idx != this.NAVIGATION_TESTDRIVE_INDEX ) ? true : false;

        this.updateShortcuTestdrive( idx );
    },

    updateShortcuTestdrive: function( $idx ) {
        var o = ( $idx == this.NAVIGATION_TESTDRIVE_INDEX ) ? 0 : 1;
        TweenLite.killTweensOf( this.btnShortcutTestdrive );
        TweenLite.to( this.btnShortcutTestdrive, 0.4, {autoAlpha:o} );
    },

    removeEvent : function(){

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
        }

        this.calculateTimerCheck++;
        if(this.calculateTimerCheck > 30){
            this.stopCheckCalculate();
        }
    },

    calculatePos : function(){
        this.containerPosiArr = [];
        var i=0;
        var num = 0;

        // 비주얼 인덱스값 정의
        num = 0;
        this.containerPosiArr.push(num);

        for(i=0; i<this.visualLen-1; i++){
            num = num + this.visualHeight;
            this.containerPosiArr.push(num);
        }

        num = $(document).height() - $(window).height();
        this.containerPosiArr.push(num);

        // 네비게이션 인덱스값
        this.containerPosiTopArr = [];
        num = 0;
        this.containerPosiTopArr.push(num);
        num = $("#model-pg1").height();//web - $(window).height()+ ((this.visualLen-1) * this.visualHeight);
        this.containerPosiTopArr.push(num);
        num = num + $("#model-pg2").height();
        this.containerPosiTopArr.push(num);
        num = num + $("#model-pg3").height();
        this.containerPosiTopArr.push(num);
        num = num + $("#model-pg4").height();
        this.containerPosiTopArr.push(num);

        var marginBot = 0;
        var globalVars = App.GlobalVars;
        var footH = globalVars.currentBrowserMode == globalVars.BROWSER_MODE_WEB ? 0 : $("footer").height();
        if($("#model-pg6").height() > $(window).height()+marginBot){
            num = num + $("#model-pg5").height();
        } else {
            num = $(document).height() - $(window).height() - footH
        }
        this.containerPosiTopArr.push(num);

    },

    onChangeMobile : function(){
        App.modelVisualView.onChangeMobile();
    },

    onChangeWeb : function(){
        App.modelVisualView.onChangeWeb();
    },

    onResize : function(){
        App.modelVisualView.onResize();
        App.modelFeaturesView.onResize();
        App.modelExteriorView.onResize();
        App.modelInteriorView.onResize();
        App.modelWheelView.onResize();
        App.modelSpecView.onResize();
        App.modelEstimateView.onResize();
        App.modelTestDriveView.onResize();

        this.calculatePos();
        this.onScrollMove( $(window).scrollTop() );


        if( this.isRXModelPage ) {
            this.checkLnbRXCampaign();
            this.checkGnbRXCampaign();
        }
    },


    checkLnbRXCampaign: function() {
        var isWeb = ( App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB && App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB ) ? true : false;
        this.btnLnbRXCampaign.css( {display:isWeb ? 'block' : 'none'} );
    },


    checkGnbRXCampaign: function() {
        // 웹 || 모바일 디바이스 && 모바일 모드 사이즈
        if( App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_MOBILE ) {
            this.removeGnbRXCampaign();
            this.gnbDepth3.append( this.rxcampaignTemplate );
            this.gnbDepth3.addClass('rxcampaign-gnb');      // append & height reset
            this.rxcampaignGNB = this.gnbDepth3.find('>li.gnb-rxcampaign');
            this.btnGnbRXCampaign = this.rxcampaignGNB.find('a');
            this.btnGnbRXCampaign.on("click", _.bind(this.onClickGnbRXCampaign,this));

        } else {
            this.removeGnbRXCampaign();
        }
    },

    removeGnbRXCampaign: function() {
        if( this.rxcampaignGNB == null ) return;

        if( this.btnGnbRXCampaign != null ) {
            this.btnGnbRXCampaign.off();
            this.btnGnbRXCampaign = null;
        }

        this.rxcampaignGNB.remove();
        this.gnbDepth3.removeClass('rxcampaign-gnb');
    },

    onClickGnbRXCampaign: function( $evt ) {
        $evt.preventDefault();

        App.footerView.sendEventCode( 'Navi_'+App.GlobalVars.MODEL_NAME+'_campaign' );
        window.location = this.HREF_RXCAMPAIGN;
    },

    //on click navi
    onClick_naviThree : function(index){
        var hash = App.GlobalVars.MODELS_HASH[index];
        var targetY = this.containerPosiTopArr[index];

        var time = ( Math.abs( $(window).scrollTop() - targetY ) ) * 0.2;
        time = Math.max(time, 700);
        time = Math.min(time, 1500);

        var self = this;
        $('html, body').stop().animate({ scrollTop: targetY }, time * this.scrollTime, "easeInOutQuart", self.onCompleteScroll);
    },

    onCompleteScroll: function(){
//       
    },

    //move scroll
    onScrollMove : function(scroll){
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

                App.modelVisualView.onScrollMove(this.curIndex, per);
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
            this.changeHash(App.GlobalVars.MODELS_HASH[this.curNaviIndex]);
        }

        // 모바일 경우, 시승신청 바로가기
        if( globalVars.currentBrowserMode == globalVars.BROWSER_MODE_MOBILE ) {
            this.scrollShortcuTestdrive( scroll );
        }
    },

    //change hash
    changeHash : function(id){
        window.location.hash = id
        return false;
    },

    onChangeHash: function(){
        var windowHash = window.location.hash.split("#")[1];
        if (windowHash != this.currentHash) {
            this.currentHash = windowHash;

            for(var i=0 ; i<App.GlobalVars.MODELS_HASH.length ; i++){
                if(App.GlobalVars.MODELS_HASH[i] == this.currentHash){
            
                    // 주소창 변경으로 들어온 경우
                    if( this.curNaviIndex != i ) {
                        this.onClick_naviThree(i);
                        App.navigationView.changeThirdIndex(i);
                        this.updateShortcuTestdrive( i );

                    // 스크롤무브나 네비 클릭으로 들어온 경우
                    } else {
                        App.navigationView.changeThirdIndex(i);

                        if( this.isTestDriveButton ) {
                            this.updateShortcuTestdrive( i );
                        }
                    }
                }
            }

        }
        this.scrollTime = 1;
    },


    pageViewTrackingTimerEventHandler : function(){
        var hash = (this.currentHash != undefined)?this.currentHash:App.GlobalVars.MODELS_HASH[0];
        var code = this.jsonData.code +"_"+hash;
        App.footerView.sendPageViewCode(code);
    },

    //////////////////////////////////////////////
    //  get data
    //////////////////////////////////////////////
    getModelData : function(){
        var url = App.GlobalVars.GET_MODEL_DATA_URL+"?model="+App.GlobalVars.MODEL_NAME;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_GET_MODEL_DATA_URL+"?model="+App.GlobalVars.MODEL_NAME

        App.getJsonData(url, {}, this.getModelDataComplete);
    },

    getModelDataComplete : function($json){
        var _this = App.modelView;
        _this.jsonData = $json;

        // brochure url
        App.navigationView.setBrochureURL($json.models.brochure_url);

        // add 2016.02.06 dhkim
        App.navigationView.setThreeDepthModelCode($json.code);

        // features data
        App.modelFeaturesCollection.set($json.models.features);

        // exterior data
        App.modelExteriorModel.setModels($json.models.designs.exterior);
        App.modelExteriorCollection.setCollections($json.models.designs.exterior);

        // interior data
        App.modelInteriorModel.setModels($json.models.designs.interior);
        App.modelInteriorCollection.setCollections($json.models.designs.interior);

        // wheel data
        App.modelWheelModel.setModels($json.models.designs.wheel);
        App.modelWheelCollection.setCollections($json.models.designs.wheel);

        // spec data
        App.modelSpecModel.setModels($json.models.specs.spec_top);
        App.modelSpecCollection.setCollections($json.models.specs);

        // estimate data
        App.modelEstimateModel.set({"special_offer":$json.models.estimate.special_offer, "car_class":$json.models.estimate.car_class, "location":$json.models.estimate.location, "price":$json.models.estimate.price});

        // test drive data
        App.modelTestDriveModel.set({"location":$json.models.testdrive.location, "branch":$json.models.testdrive.branch, "service_center":$json.models.testdrive.service_center});

        App.modelView.render();
    }
});