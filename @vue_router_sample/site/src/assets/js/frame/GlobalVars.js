window.GlobalVars = (function () {
    // is Mobile
    var _detectClass = document.querySelector('html').className;
    var _isMobile = _detectClass.indexOf("mobile") == -1 ? false : true;
    var _isIOS = function(){
        var el = document.querySelector('html');
        if( DF.utils.hasClass(el,"ios") ){
            return true;
        }else{
            return false;
        }
    };

    var _isTablet = false;
    if (!_isMobile) {
        if (_detectClass.indexOf("tablet") == -1) {
            _isTablet = false;
        } else {
            _isTablet = _detectClass.indexOf("ie") == -1 ? true : false;
        }
    } else _isTablet = false;

    var _isIE = function(){
        var el = document.querySelector('html');
        if( DF.utils.hasClass(el,"ie") || DF.utils.hasClass(el,"edge")){
            return true;
        }else{
            return false;
        }
    }

    //sever check
    var _getServerIndex = function () {

        var locate = location.href;
        var isLocal = (/^127|^192|localhost/).test(document.location.hostname);
        if (!isLocal) {
            if(locate.indexOf('/dev/') == -1) {
                return window.GlobalVars.INDEX_0_SERVER;
            }
            else{
                return window.GlobalVars.INDEX_1_DEV;
            }

        }else{
            return window.GlobalVars.INDEX_2_LOCAL;
        }
    }

    var _getDeviceType = function() {
        var type = -1;
        if(_isMobile) {
            type = window.GlobalVars.DEVICE_MOBILE;
        }else if(_isTablet) {
            type = window.GlobalVars.DEVICE_TABLET;
        }else{
            type = window.GlobalVars.DEVICE_PC;
        }

        return type;
    }


    return {

        // 모바일 디바이스 유무
        isMobile: _isMobile,
        isTablet: _isTablet,
        //PC에서 모바일 환경
        isMobileInPC : false,
        //서버 상태m
        isIOS : _isIOS,
        getServerIndex: _getServerIndex,

        getDeviceType : _getDeviceType,

        isIE : _isIE
    };

})();

// ....
// ....
// ....

// 그밖에 변수값 저장
window.GlobalVars.page_name = "not_defined_yet ";
window.GlobalVars.jsonUrl = {};
window.GlobalVars.json_data = {};
window.GlobalVars.device = {"pixel_ratio": window.devicePixelRatio, "isHighDPI": window.devicePixelRatio > 1};

window.GlobalVars.INDEX_0_SERVER = 0;
window.GlobalVars.INDEX_1_DEV = 1;
window.GlobalVars.INDEX_2_LOCAL = 2;
window.GlobalVars.INDEX_3_BACKDATA = 3;
window.GlobalVars.severIndex = window.GlobalVars.getServerIndex();

window.GlobalVars.SIZE_TABLET = 1279.7;
window.GlobalVars.SIZE_MOBILE = 767.7;
window.GlobalVars.DEVICE_MOBILE = 0;

window.GlobalVars.DEVICE_MOBILE = 0;
window.GlobalVars.DEVICE_TABLET = 1;
window.GlobalVars.DEVICE_PC = 2;

window.GlobalVars.typeBrowser = '';
window.GlobalVars.BROWSER_TYPE_DESKTOP = "browser-type-desktop";
window.GlobalVars.BROWSER_TYPE_TABLET = "browser-type-tablet";
window.GlobalVars.BROWSER_TYPE_MOBILE = "browser-type-mobile";


// router path
window.GlobalVars.CATE_000_MAIN =                       "/";
window.GlobalVars.CATE_100_CREATOR =                    "/creator";
window.GlobalVars.CATE_110_CREATOR_CREATORS =           "/creator/creators";
window.GlobalVars.CATE_111_CREATOR_CREATORS_PROFILE =   "/creator/creators/profile/:id";
window.GlobalVars.CATE_120_CREATOR_AGENCY =             "/creator/agency";
window.GlobalVars.CATE_200_BUSINESS =                   "/business";
window.GlobalVars.CATE_210_BUSINESS_BRAND =             "/business/brand";
window.GlobalVars.CATE_211_BUSINESS_BRAND_DETAIL =      "/business/brand/:id";
window.GlobalVars.CATE_212_BUSINESS_BRAND_CONTACT =     "/business/brand/contact";
window.GlobalVars.CATE_220_BUSINESS_IP =                "/business/ip";
window.GlobalVars.CATE_221_BUSINESS_IP_DETAIL =         "/business/ip/:id";
window.GlobalVars.CATE_222_BUSINESS_IP_CONTACT =        "/business/ip/contact";
window.GlobalVars.CATE_300_ABOUT =                      "/about";
window.GlobalVars.CATE_400_CAREERS =                    "/careers";
window.GlobalVars.CATE_410_CAREERS_AUGUST =            "/careers/august";
window.GlobalVars.CATE_411_CAREERS_AUGUST_DETAIL =     "/careers/august/:id";
window.GlobalVars.CATE_412_CAREERS_AUGUST_APPLY =      "/careers/august/:id/apply";
window.GlobalVars.CATE_420_CAREERS_CREATOR =            "/careers/creator";
window.GlobalVars.CATE_421_CAREERS_CREATOR_DETAIL =     "/careers/creator/:id";
window.GlobalVars.CATE_422_CAREERS_CREATOR_APPLY =      "/careers/creator/:id/apply";
window.GlobalVars.CATE_500_NEWS =                       "/news";
window.GlobalVars.CATE_510_NEWS_DETAIL =                "/news/:id";
window.GlobalVars.CATE_600_APPLY_CREATOR =              "/apply-creator";
window.GlobalVars.CATE_699_APPLY_CREATOR_DEV =          "/apply-creator-dev";
window.GlobalVars.CATE_700_PRIVACY_POLICY =             "/privacy-policy";
window.GlobalVars.CATE_800_ESPORTS =                    "/esports";
window.GlobalVars.CATE_900_ERROR =                      "/404";
window.GlobalVars.CATE_1000_IR_NOTICE =                 "/ir-notice";
window.GlobalVars.CATE_1001_IR_NOTICE_DETAIL =                 "/ir-notice/:id";

// creator
window.GlobalVars.CREATOR_SUBSCRIBER_TYPE_YOUTUBE = "youtube";
window.GlobalVars.CREATOR_SUBSCRIBER_TYPE_TWITCH = "twitch";
window.GlobalVars.CREATOR_SUBSCRIBER_TYPE_TIKTOK = "tiktok";
window.GlobalVars.CREATOR_CATE_0_ALL = "";
window.GlobalVars.CREATOR_CATE_1_GAME = "C001";
window.GlobalVars.CREATOR_CATE_2_KIDS = "C002";
window.GlobalVars.CREATOR_CATE_3_FOOD = "C003";
window.GlobalVars.CREATOR_CATE_4_DAILY = "C004";

// careers
window.GlobalVars.careers_apply_index = -1;
window.GlobalVars.careers_apply_job = '';

//news
window.GlobalVars.NEWS_CATE_0_ALL = "";
window.GlobalVars.NEWS_CATE_1_AUGUST = "N002";
window.GlobalVars.NEWS_CATE_2_CREATOR = "N001";

window.GlobalVars.transScrollY = 0;

window.GlobalVars.container_name = 'main';
window.GlobalVars.isStart = true;
window.GlobalVars.isTransing = false;
window.GlobalVars.isOpenMenu = false;




const PI_M2 = Math.PI*2;
const PI_D2 = Math.PI/2;
window.GlobalVars.easing = {


    linear : function(t, b, c, d){
        return c*t/d + b;
    },
    easeInSine : function(t, b, c, d){
        return -c * Math.cos(t/d * PI_D2) + c + b;
    },

    easeInCubic : function(t, b, c, d){
        return c*(t/=d)*t*t + b;
    },
    easeInQuad : function(t, b, c, d){
        return c*(t/=d)*t + b;
    },

    easeOutSine : function(t, b, c, d){
        return c * Math.sin(t/d * PI_D2) + b;
    },

    easeOutCubic : function(t, b, c, d){
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeOutQuad : function(t, b, c, d ){
        return -c *(t/=d)*(t-2) + b;
    },
    easeOutExpo : function(t, b, c, d ){
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },

    easeInOutCubic : function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    },
    easeInOutQuad : function(t, b, c, d){
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInOutQuint : function(t, b, c, d){
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInOutSine : function (t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    }
};


// ....
// ....
// ....

console.log("GlobalVars.isMobile : " + window.GlobalVars.isMobile);
console.log("GlobalVars.isTablet : " + window.GlobalVars.isTablet);
console.log("GlobalVars.device.isHighDPI : " + window.GlobalVars.device.isHighDPI);
