var App = new (Backbone.Router.extend({
    Models: {},
    Collections: {},
    Views: {},

    initialize: function() {
        // init
        // init
    },

    start: function (options) {
        // 현재 인덱스 저장하기
        this.GlobalVars.currentIndex = options.index;
        this.GlobalVars.NAVIGATION_FIRST_INDEX = options.naviFirstIndex;
        this.GlobalVars.NAVIGATION_SECOND_INDEX = options.naviSeconIndex;
        this.GlobalVars.NAVIGATION_THIRD_INDEX = options.naviThirdIndex;
        this.GlobalVars.NAVIGATION_BENEFIT_INDEX = options.naviBenefitIndex == undefined ? -1 : options.naviBenefitIndex;
        this.GlobalVars.NAVIGATION_ETC_INDEX = options.naviEtcIndex == undefined ? -1 : options.naviEtcIndex;

        this.GlobalVars.MODEL_NAME = options.modelName == undefined ? "" : options.modelName;
        this.GlobalVars.PAGE_VIEW_TRAKING_CODE = options.code == undefined ? "" : options.code;

     
        // detect.js의 ie8 여부 저장하기
        if( _Browser.ie8) {
            this.GlobalVars.isIE8 = true;
            this.GlobalVars.currentDevice = App.GlobalVars.DEVICE_TYPE_WEB;
        }else{
            // detect.js의 디바이스 타입 가져오기
            this.GlobalVars.currentDevice = _Device.type;
        }

        this.GlobalVars.isIE9 =  _Browser.ie9
        this.GlobalVars.currentOS = _Device.os;
        this.GlobalVars.isMSIE = _Browser.msie;
        this.GlobalVars.isDebugMode = (/^127|^192|localhost/).test(document.location.hostname);

        this.makeModel();
        this.makeCollection();
        this.makeView();
    },

    setMobileDeviceType : function(){
        if(this.GlobalVars.currentDevice == this.GlobalVars.DEVICE_TYPE_TABLET){
            this.GlobalVars.currentBrowserMode = this.GlobalVars.BROWSER_MODE_TABLET;
        }else if(this.GlobalVars.currentDevice == this.GlobalVars.DEVICE_TYPE_MOBILE){
            this.GlobalVars.currentBrowserMode = this.GlobalVars.BROWSER_MODE_MOBILE
        }
    },

    /////////////////////////////////////////////
    //	뷰 생성하기
    /////////////////////////////////////////////
    makeView : function(){
        var index = this.GlobalVars.currentIndex;

        // 공통 View 생성
        this.resizeView = new App.Views.ResizeView();
        this.navigationView = new App.Views.NavigationView({navigationModel:this.navigationModel});
        this.loaderView = new App.Views.LoaderView();
        this.scrollView = new App.Views.ScrollView();
        this.footerView = new App.Views.FooterView();

        // 카테고리 별 View 생성
        switch(index) {
            case this.GlobalVars.INDEX_0_MAIN :
                this.mainView = new App.Views.MainView({});
                break;
            case this.GlobalVars.INDEX_1_MODELS :
                this.modelView = new App.Views.ModelView({});
                break;
            case this.GlobalVars.INDEX_5_MEMBERSHIP :
                this.membershipView = new App.Views.MembershipView({});
                this.membershipView.show();
                break;
            case this.GlobalVars.INDEX_6_SERVICE :
                this.serviceView = new App.Views.ServiceView( {} );
                this.serviceView.show();
                break;
            case this.GlobalVars.INDEX_8_QUICK_TESTDRIVE :
                this.quickTestDriveView = new App.Views.QuickTestDriveView({quickTestDriveModel : this.quickTestDriveModel});
                break;
            case this.GlobalVars.INDEX_9_QUICK_SPEEDPRICE :
                this.quickSpeedPriceView = new App.Views.QuickSpeedPriceView({quickSpeedPriceModel : this.quickSpeedPriceModel});
                break;
            case this.GlobalVars.INDEX_10_SERVICECENTER :
                this.serviceCenterView = new App.Views.ServiceCenterView({serviceCenterModel : this.serviceCenterModel});
                break;
            case this.GlobalVars.INDEX_11_CONCEPTCAR_GALLERY :
                this.coceptcarGalleryView = new App.Views.ModelConceptcarGalleryView({});
                this.coceptcarGalleryView.show();
                break;
            case this.GlobalVars.INDEX_12_QUICK_SPECIALOFFER :
                this.quickSpecialOfferView = new App.Views.QuickSpecialofferView({el:$(".special-offer .pic-list-wrap"),
                                                                                    quickSpecialofferCollection:this.quickSpecialofferCollection,
                                                                                    quickSpecialofferModel:this.quickSpecialofferModel});
                break;
            case this.GlobalVars.INDEX_13_QUICK_BROCHURE :
                this.quickBrochureView = new App.Views.QuickBrochureView({el:$(".brochure .pic-list-wrap"),
                                                                            quickBrochureCollection:this.quickBrochureCollection,
                                                                            quickBrochureModel:this.quickBrochureModel});
                break;
            case this.GlobalVars.INDEX_14_FOOTER_CONTACT :
                this.footerContactView = new App.Views.FooterContactView();
                break;

            default :
                break;
        }
    },

    /////////////////////////////////////////////
    //	모델 생성하기
    /////////////////////////////////////////////
    makeModel : function(){

        var index = this.GlobalVars.currentIndex;
        this.navigationModel =  new App.Models.NavigationModel();

        // 카테고리 별 Model 생성
        switch(index) {
            case this.GlobalVars.INDEX_0_MAIN :
                this.mainBannerModel = new App.Models.MainBannerModel();
                this.mainBannerListModel = new App.Models.MainBannerListModel();
                this.mainKeyvisualModel = new App.Models.MainKeyvisualModel();
                break;
            case this.GlobalVars.INDEX_1_MODELS :
                this.modelFeaturesModel = new App.Models.ModelFeaturesModel();
                this.modelExteriorModel = new App.Models.ModelExteriorModel();
                this.modelInteriorModel = new App.Models.ModelInteriorModel();
                this.modelWheelModel = new App.Models.ModelWheelModel();
                this.modelSpecModel = new App.Models.ModelSpecModel();
                this.modelEstimateModel = new App.Models.ModelEstimateModel();
                this.modelTestDriveModel = new App.Models.ModelTestDriveModel();
                break;
            case this.GlobalVars.INDEX_7_COMPANY :
                this.companyModel = new App.Models.CompanyModel();
                break;
            case this.GlobalVars.INDEX_8_QUICK_TESTDRIVE :
                this.quickTestDriveModel = new App.Models.QuickTestDriveModel();
                break;
            case this.GlobalVars.INDEX_9_QUICK_SPEEDPRICE :
                this.quickSpeedPriceModel = new App.Models.QuickSpeedPriceModel();
                break;
            case this.GlobalVars.INDEX_10_SERVICECENTER :
                this.serviceCenterModel = new App.Models.ServiceCenterModel();
                break;
            case this.GlobalVars.INDEX_12_QUICK_SPECIALOFFER :
                this.quickSpecialofferModel = new App.Models.QuickSpecialofferModel();
                break;
            case this.GlobalVars.INDEX_13_QUICK_BROCHURE :
                this.quickBrochureModel = new App.Models.QuickBrochureModel();
                break;
            default :
                break;
        }
    },

    /////////////////////////////////////////////
    //	콜렉션 생성하기
    /////////////////////////////////////////////
    makeCollection : function(){

        var index = this.GlobalVars.currentIndex;

        // 카테고리 별 Collection 생성
        switch(index) {
            case this.GlobalVars.INDEX_0_MAIN :
                this.mainBannerCollection = new App.Collections.MainBannerCollection();
                this.mainKeyvisualCollection = new App.Collections.MainKeyvisualCollection();
                break;
            case this.GlobalVars.INDEX_1_MODELS :
                this.modelFeaturesCollection = new App.Collections.ModelFeaturesCollection();
                this.modelExteriorCollection = new App.Collections.ModelExteriorCollection();
                this.modelInteriorCollection = new App.Collections.ModelInteriorCollection();
                this.modelWheelCollection = new App.Collections.ModelWheelCollection();
                this.modelSpecCollection = new App.Collections.ModelSpecCollection();
                break;
            case this.GlobalVars.INDEX_7_COMPANY :
                this.companyCollection = new App.Collections.CompanyCollection();
                break;
            case this.GlobalVars.INDEX_8_QUICK_TESTDRIVE :
                this.quickTestDriveCollection = new App.Collections.QuickTestDriveCollection();
                break;
            case this.GlobalVars.INDEX_9_QUICK_SPEEDPRICE :
                this.quickSpeedPriceCollection = new App.Collections.QuickSpeedPriceCollection();
                break;
            case this.GlobalVars.INDEX_10_SERVICECENTER :
                this.serviceCenterCollection = new App.Collections.ServiceCenterCollection();
                break;
            case this.GlobalVars.INDEX_12_QUICK_SPECIALOFFER :
                this.quickSpecialofferCollection = new App.Collections.QuickSpecialofferCollection();
                break;
            case this.GlobalVars.INDEX_13_QUICK_BROCHURE :
                this.quickBrochureCollection = new App.Collections.QuickBrochureCollection();
                break;
            default :
                break;
        }
    },

    /////////////////////////////////////////////
    //	글로벌 변수
    /////////////////////////////////////////////
    GlobalVars : {

        isDebugMode : false,

        /* 디바이스 종류 */
        currentDevice : -1,
        DEVICE_TYPE_WEB : 0,
        DEVICE_TYPE_TABLET : 1,
        DEVICE_TYPE_MOBILE : 2,

        /* OS 종류 */
        currentOS : -1,
        OS_TYPE_ANDROID : 0,
        OS_TYPE_IOS : 1,
        OS_TYPE_ETC : 2,

        isIE8 : false,
        isIE9 : false,
        isMSIE : false,
        WINDOW_DEFAULT_WIDTH : 1400,
        WINDOW_DEFAULT_HEIGHT : 900,
        WINDOW_MIN_HEIGHT : 660,

        // 타블렛 가로모드 기본 사이즈
        TABLET_LANDSCAPE_DEFAULT_WIDTH : 1024,
        TABLET_LANDSCAPE_DEFAULT_HEIGHT : 715,

        // 타블렛 세로모드 기본 사이즈
        TABLET_PORTRAIT_DEFAULT_WIDTH : 768,
        TABLET_PORTRAIT_DEFAULT_HEIGHT : 974,

        // 모바일 가로모드 기본 사이즈
        MOBILE_LANDSCAPE_DEFAULT_WIDTH : 908,
        MOBILE_LANDSCAPE_DEFAULT_HEIGHT : 640,

        // 모바일 세로모드 기본 사이즈
        MOBILE_PORTRAIT_DEFAULT_WIDTH : 640,
        MOBILE_PORTRAIT_DEFAULT_HEIGHT : 908,

        /* 브라우저 모드 */

        currentBrowserMode : -1,
        BROWSER_MODE_WEB : 0,
        BROWSER_MODE_TABLET : 1,
        BROWSER_MODE_MOBILE : 2,
        /*
        * 브라우저 별 넓이 (pc에서는 960px까지 웹버전으로 보여주기 위하여 tablet 버전과 겹치는 영역 생김)
        *
        * 1. web version
        * 1) mobile : ~ 767px
        * 2) tablet : 768px ~ 959px
        * 3) web : 960px ~
        *
        * 2. tablet version
        * 1) tablet : 768px ~ 1280px
        *
        * */

        MOBILE_MAX_WIDTH : 767,
        TABLET_MAX_WIDTH : 959,

        NAVIGATION_WIDTH : 180,

        /* window size */
        windowWidth : 0,
        windowHeight : 0,
        windowInnerWidth : 0,
        /* index */
        currentIndex : -1,

        INDEX_0_MAIN : 0,
        INDEX_1_MODELS : 1,
        INDEX_5_MEMBERSHIP : 5,
        INDEX_6_SERVICE : 6,
        INDEX_7_COMPANY : 7,
        INDEX_8_QUICK_TESTDRIVE : 8,
        INDEX_9_QUICK_SPEEDPRICE : 9,
        INDEX_10_SERVICECENTER : 10,
        INDEX_12_QUICK_SPECIALOFFER : 12,
        INDEX_13_QUICK_BROCHURE : 13,
        INDEX_14_FOOTER_CONTACT : 14,
        INDEX_15_FUTURECAR : 15,
        INDEX_20_EVENT : 20,

        /* server url */
        GET_MAIN_DATA_URL : "/json/main_data.asp",
        GET_MODEL_DATA_URL : "/json/model_data.asp",
        GET_CONTRIBUTION_DATA_URL : "/json/company_contribution_data.asp",
        GET_NEWS_DATA_URL : "/json/company_news_data.asp",
        GET_QUICK_TESTDRIVE_URL : "/json/quick_testdrive_data.asp",
        GET_QUICK_SPEEDPRICE_URL : "/json/quick_speedprice_data.asp",
        GET_QUICK_SERVICECENTER_URL : "/json/quick_servicecenter_data.asp",
        GET_QUICK_SPECIALOFFER_URL : "/json/quick_specialoffer_data.asp",
        GET_QUICK_BROCHURE_URL : "/json/quick_brochure_data.asp",
        GET_NAVIGATION_URL : "/json/navigation_data.asp",
        GET_SERVICE_PARTSPRICE_URL : "/json/service_partsprice_data.asp",

        /* debug mode url */
        DEBUG_GET_MAIN_DATA_URL : "/asset/temp/data/main_data.json",
        DEBUG_GET_MODEL_DATA_URL : "/asset/temp/data/model_data.json",
        DEBUG_GET_CONTRIBUTION_DATA_URL : "/asset/temp/data/company_contribution_data.json",
        DEBUG_GET_NEWS_DATA_URL : "/asset/temp/data/company_news_data.json",
        DEBUG_GET_QUICK_TESTDRIVE_URL : "/asset/temp/data/quick_testdrive_data.json",
        DEBUG_GET_QUICK_SPEEDPRICE_URL : "/asset/temp/data/quick_speedprice_data.json",
        DEBUG_GET_QUICK_SERVICECENTER_URL : "/asset/temp/data/quick_servicecenter_data.json",
        DEBUG_GET_QUICK_SPECIALOFFER_URL : "/asset/temp/data/quick_specialoffer_data.json",
        DEBUG_GET_QUICK_BROCHURE_URL : "/asset/temp/data/quick_brochure_data.json",
        DEBUG_GET_NAVIGATION_URL : "/asset/temp/data/navigation_data.json",
        DEBUG_GET_SERVICE_PARTSPRICE_URL : "/asset/temp/data/service_partsprice_data.json",

        DEBUG_SET_TESTDRIVE_URL : "/proc/testdrive.asp",
        DEBUG_SET_CONTACT_URL : "/proc/contact.asp",


        NAVIGATION_FIRST_INDEX: 0,
        NAVIGATION_SECOND_INDEX: 0,
        NAVIGATION_THIRD_INDEX: 0,

        MODEL_NAME : "",

        PAGE_VIEW_TRAKING_CODE : "",

        MODELS_HASH : ["modelinfo", "feature", "design", "spec", "estimate", "testdrive"],
        CONCEPTCAR_HASH : ["inspiration", "memory", "challenge"],
        MEMBERSHIP_HASH : ["info", "join", "benefit"],
        gotoButtonDirect : false,
    },

    /////////////////////////////////////////////
    //	이벤트
    /////////////////////////////////////////////
    Events: {
        RESIZE_BROWSER : "resizebrowser",
        SCROLL_MOVE : "scrollmove",
        CHANGE_MOBILE : "changeMobile",
        CHANGE_WEB : "changeWeb",
        CLICK_NAVI_THREEDEPTH : "clickNaviThreeDepth",
        CLICK_NAVI_TWODEPTH : "CLICK_NAVI_TWODEPTH"
    },


    /////////////////////////////////////////////
    //	공통 함수
    /////////////////////////////////////////////

    showDimmed : function(){
        var dimmed = $(".overlay");
        dimmed.removeClass("hide");
    },

    hideDimmed : function(){
        var dimmed = $(".overlay");
        dimmed.addClass("hide");
    },

    imgPrefixer: function( $scope ) {
        var m = App.GlobalVars.currentBrowserMode;
        var w = App.GlobalVars.BROWSER_MODE_WEB;
        var t = App.GlobalVars.BROWSER_MODE_TABLET;
        var i, len, prop, secectorImg;

        if( $scope.currentBrowserMode !== m ) {
            for( i=0, len=$(".changable").length; i<len; i++ ) {
                prop = ( m == w || m == t ) ? 'data-web-img-url' : 'data-mobile-img-url';
                secectorImg = $(".changable").eq(i);
                secectorImg.attr( {src:secectorImg.attr(prop)} );
            }

            $scope.currentBrowserMode = m;
        }
    },

    getURLParameter : function(sParam){
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    },

    /////////////////////////////////////////////
    //	서버 통신
    /////////////////////////////////////////////

    getJsonData : function($url, $data, $callback){
        var  dType = "jsonp";
        if(App.GlobalVars.isDebugMode) dType = "json";

        $.ajax({
            url : $url,
            data : $data,
            dataType: dType,
            error : function(e){
                //console.log('error');
            },
            success : function($json){
                if($json.status == 200){
                    $callback($json);
                }else{
                    // error msg
                }
            }
        });
    },

    setPostData  : function($url, $data, $callback){
        $.ajax({
            url : $url,
            type: "POST",
            data : $data,
            dataType: "jsonp",
            error : function(e){
                //error
            },
            success : function($json){
                // success
            }
        });
    },



    /////////////////////////////////////////////
    //	데이터 보내기 / 받기
    /////////////////////////////////////////////
    setHit : function(menu, seq){

        var obj = {"menu":menu, "seq":seq}
        this.getJsonData (this.GlobalVars.SET_HIT_URL, obj, this.setHitComplete)
    },

    setHitComplete : function(){

    },

    setLog : function(code){
        var obj = {"code":code}
        this.getJsonData (this.GlobalVars.SET_LOG_URL, obj, this.setLogComplete)
    },

    setLogComplete : function(){

    },

    setEvent : function(code){
        var obj = {"code":code}
        this.getJsonData (this.GlobalVars.SET_EVENT_URL, obj, this.setEventComplete)
    },

    setEventComplete : function(){

    },

    setGoogleHit : function($name){
        googleEventTagging($name);
    }
}))();