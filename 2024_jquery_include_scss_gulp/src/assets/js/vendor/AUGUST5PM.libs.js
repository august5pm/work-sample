var validator = (function() {
    // 한글만 체크
    var _lan_kr = function(str) {
            var regexp = /^[가-힣]+$/;
            if (!regexp.test(str)) {
                return false;
            }
            return true;
        },
        // 숫자만 체크
        _only_number = function(str) {
            var regexp = /^[0-9]+$/;
            if (!regexp.test(str)) {
                return false;
            }
            return true;
        },
        // 전화번호 형식 체크
        _phone_number = function(str) {
            var regexp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
            if (!regexp.test(str)) {
                return false;
            }
            return true;
        },
        // 전화번호 숫자만 체크
        _phone_only_number = function(str) {
            var regexp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
            //var regexp = /^\d{3}\d{3,4}\d{4}$/;
            if (!regexp.test(str)) {
                return false;
            }
            return true;
        },
        // 전화번호 숫자만 체크 (앞자리 010 일때만)
        _phone_only_number_010 = function(str) {
            var regexp = /^010([0-9]{4})([0-9]{4})$/;
            //var regexp = /^\d{3}\d{3,4}\d{4}$/;
            if (!regexp.test(str)) {
                return false;
            }
            return true;
        },
        // 이메일 체크
        _email = function(str) {
            var regexp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            if (!regexp.test(str)) {
                return false;
            }

            return true;
        },
        // 공백 체크
        _blank = function(str) {
            if (str.search(/\s/) != -1) {
                return false;
            }

            var blank_pattern = /^\s+|\s+$/g;
            if (str.replace(blank_pattern, '') == '') {
                return false;
            }

            return true;
        };

    return {
        lan_kr: _lan_kr,
        only_number: _only_number,
        phone_number: _phone_number,
        phone_only_number: _phone_only_number,
        phone_only_number_010: _phone_only_number_010,
        email: _email,
        blank: _blank
    };
})();

var utils = (function() {
    // JSON 데이터 요청하기
    var _requestJsonData = function(url, data, callback, type) {
            var tempType = type == undefined ? 'GET' : type;
            $.ajax({
                type: tempType,
                url: url,
                data: data,
                dataType: 'json',
                contentType: 'application/json',
                error: function(e) {
                    console.error('json parse error');
                    console.error(e);
                    var GlobalVars = window.AUGUST5PM.libs.globalVars;
                    var CustomEvents = window.AUGUST5PM.libs.customEvents;
                    var msg = '오류가 발생하였습니다. <br>다시 시도해 주세요';
                    $('#container').trigger(CustomEvents.SHOW_ALERT, [msg, GlobalVars.ALERT_TYPE_SINGLE]);
                },
                success: function(json) {
                    callback(json);
                }
            });
        },
        // 헤더와 함께 JSON 데이터 요청하기
        _requestJsonDataWithHeader = function(url, data, callback, type, token, hType) {
            var tempType = type == undefined ? 'GET' : type;
            //var t = 'Bearer '+token;
            var headerType = hType == undefined?'':hType;
            var t = headerType+token;
            $.ajax({
                type: tempType,
                url: url,
                data: data,
                headers: {
                    Authorization: t
                },
                dataType: 'json',
                contentType: 'application/json',
                error: function(e) {
                    console.error('json parse error');
                    var GlobalVars = window.AUGUST5PM.libs.globalVars;
                    var CustomEvents = window.AUGUST5PM.libs.customEvents;
                    var msg = '오류가 발생하였습니다. <br>다시 시도해 주세요';
                    $('#container').trigger(CustomEvents.SHOW_ALERT, [msg, GlobalVars.ALERT_TYPE_SINGLE]);
                },
                success: function(json) {
                    callback(json);
                }
            });
        },
        // X가 a 부터 b까지 변할 때 y는 c부터 d까지 변한다
        _linearFunc = function(x, a, b, c, d){
            y=(d-c)/(b-a)*(x-a)+c
            return y
        },
        // 로컬여부 체크
        _isLocal = function() {
            var isLocal = /^127|^192|localhost/.test(document.location.hostname);
            return isLocal;
        },
        // 파라미터 가져오기
        _getUrlParameter = function() {
            var ParameterObject = new Object();
            var locate = location.href;

            if (locate.indexOf('?') == -1) {
                return ParameterObject;
            }

            var parameter = locate.split('?')[1];
            parameter = parameter.split('#')[0];
            var paramAreay = parameter.split('&');
            for (var i = 0; i < paramAreay.length; i++) {
                var tem = paramAreay[i].split('=');
                ParameterObject[tem[0]] = tem[1];
            }
            _getUrlParameter = function() {
                return ParameterObject;
            };
            return ParameterObject;
        },
        // 클립보드에 넣기
        _setClipboard = function(id, msg, callback) {
            /* Get the text field */
            var copyText = document.getElementById(id);
            var isIOS = $('html').hasClass('ios');
            if (isIOS) {
                _iosCopyToClipboard(copyText);
            } else {
                _copyToClipboard(copyText);
            }

            /* Alert the copied text */
            if (callback == undefined) {
                alert(msg);
                return false;
            } else {
                callback();
                return false;
            }
        },
        // 클립보드 내용 복사
        _copyToClipboard = function(copyText) {
            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand('copy');
        },
        // IOS 클립보드 내용 복사
        _iosCopyToClipboard = function(el) {
            var oldContentEditable = el.contentEditable,
                oldReadOnly = el.readOnly,
                range = document.createRange();

            el.contentEditable = true;
            el.readOnly = false;
            range.selectNodeContents(el);

            var s = window.getSelection();
            s.removeAllRanges();
            s.addRange(range);

            el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

            el.contentEditable = oldContentEditable;
            el.readOnly = oldReadOnly;

            document.execCommand('copy');
        },
        // 페이스북 공유하기
        _shareFacebook = function(url) {
            var encodeUrl = encodeURIComponent(url);
            var link = 'http://www.facebook.com/sharer/sharer.php?u=' + encodeUrl;
            window.open(link, 'facebook', 'width=630, height=750');
        },
        // 트위터 공유하기
        _shareTwitter = function(msg, url) {
            var encodeMsg = encodeURIComponent(msg);
            var encodeUrl = encodeURIComponent(url);
            var link = 'https://twitter.com/intent/tweet?text=' + encodeMsg + '&url=' + encodeUrl;
            window.open(link, 'twitter', 'width=630, height=270');
        },
        // 네이버 블로그 공유하기
        _shareNaverBlog = function(msg, url) {
            var encodeMsg = encodeURIComponent(msg);
            var encodeUrl = encodeURIComponent(url);
            var link = 'http://blog.naver.com/openapi/share?title=' + encodeMsg + '&url=' + encodeUrl;
            window.open(link, 'naver_blog', 'width=630, height=750');
        },
        // 최대 글자수 체크 (모바일)
        _maxLengthCheck = function(obj) {
            if (obj.value.length > obj.maxLength) {
                obj.value = obj.value.slice(0, obj.maxLength);
            }
        },
        // 유저 에이전트 체크
        _checkUserAgent = function() {
            var currentOS;
            var mobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());
            if (mobile) {
                // 유저에이전트를 불러와서 OS를 구분합니다.
                var userAgent = navigator.userAgent.toLowerCase();

                if (userAgent.search('android') > -1) currentOS = 'android';
                else if (userAgent.search('iphone') > -1 || userAgent.search('ipod') > -1 || userAgent.search('ipad') > -1)
                    currentOS = 'ios';
                else currentOS = 'else';
            } else {
                // 모바일이 아닐 때
                currentOS = 'desktop';
            }

            $('html').addClass(currentOS);
        },
        _parseT1 = function(str) {
            var key = 'change_responsive_mode';
            var origin_str = str;
            var base64_decode_str = atob(origin_str);
            var utf8_dedode_str = decodeURIComponent(escape(base64_decode_str));
            var result_xor_decryption_str = utf8_dedode_str;
            var encryption_str_len = result_xor_decryption_str.length;
            var xor_decryption_str = '';
            for (var i = 0; i < encryption_str_len; i++) {
                var current = result_xor_decryption_str[i];
                var current_key = key[i % key.length];
                xor_decryption_str += String.fromCharCode(current['charCodeAt'](0) ^ current_key['charCodeAt'](0));
            }
            return xor_decryption_str;
        },
        _parseT2 = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        },
        // 세션스토리지에서 JSON 형태로 가져가기
        _getSessionStorageStringToJson = function(key) {
            return JSON.parse(sessionStorage.getItem(key));
        },
        // 세션스토리지에 JSON 형태로 저장
        _setSessionStorageJsonToString = function(key, data) {
            sessionStorage.setItem(key, JSON.stringify(data));
        },
        _digit = function(num) {
            var strNum = '';
            if (num < 10) {
                strNum = '0' + num;
            } else {
                strNum = num;
            }
            return strNum;
        },
        _comma3 = function(num){
            //var temp = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            var len, point, str; 
       
            num = num + ""; 
            point = num.length % 3 ;
            len = num.length; 
        
            str = num.substring(0, point); 
            while (point < len) { 
                if (str != "") str += ","; 
                str += num.substring(point, point + 3); 
                point += 3; 
            } 
            
            return str;
        },
        _shuffle = function (arr) {
            var resultArr = arr;
            var length = resultArr.length;
            
            while (length) {
         
                // 랜덤한 배열 index 추출
                var index = Math.floor((length--) * Math.random());
         
                // 배열의 끝에서부터 0번째 아이템을 순차적으로 대입
                var temp = resultArr[length];
         
                // 랜덤한 위치의 값을 맨뒤(this[length])부터 셋팅
                resultArr[length] = resultArr[index];
         
                // 랜덤한 위치에 위에 설정한 temp값 셋팅
                resultArr[index] = temp;
            }
         
            // 배열을 리턴해준다.
            return resultArr;
        },
        _sumDDay = function(now, target){
            var dataDate = {};
            var nowday = now;
            //nowday = new Date().getTime();

            //var target = new Date("December 21, 2020 22:00:00").getTime();//디데이
            var targetDay = target //디데이
            var distance = targetDay - nowday;//디데이에서 현재까지 뺀다.
        
            var d = Math.floor(distance / (1000 * 60 * 60 * 24));//일
        
            var h = Math.floor((distance / (1000*60*60)) % 24);//시간
            var m = Math.floor((distance / (1000*60)) % 60);//분
            var s = Math.floor((distance / 1000) % 60);//초

            dataDate = {
                distance: distance,
                day : d,
                h : h,
                m : m,
                s : s
            }
            return dataDate;
        },
        _def = function(org, src) {
            for (var prop in src) {
                if (!hasOwnProperty.call(src, prop)) continue;
                if ('object' === $.type(org[prop])) {
                    org[prop] = 'array' === $.type(org[prop]) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
                } else {
                    org[prop] = src[prop];
                }
            }
            return org;
        };

    return {
        requestJsonData: _requestJsonData,
        requestJsonDataWithHeader: _requestJsonDataWithHeader,
        linearFunc: _linearFunc,
        isLocal: _isLocal,
        getUrlParameter: _getUrlParameter,
        setClipboard: _setClipboard,
        shareFacebook: _shareFacebook,
        shareTwitter: _shareTwitter,
        shareNaverBlog: _shareNaverBlog,
        maxLengthCheck: _maxLengthCheck,
        checkUserAgent: _checkUserAgent,
        parseT1: _parseT1,
        parseT2: _parseT2,
        getSessionStorageStringToJson: _getSessionStorageStringToJson,
        setSessionStorageJsonToString: _setSessionStorageJsonToString,
        digit: _digit,
        comma3 :_comma3,
        shuffle: _shuffle,
        sumDDay : _sumDDay,
        def: _def
    };
})();

(function() {
    if (window.AUGUST5PM == undefined) window.AUGUST5PM = {};
    window.AUGUST5PM.libs = {};
    window.AUGUST5PM.libs.validator = validator;
    window.AUGUST5PM.libs.utils = utils;

    // global vars
    window.AUGUST5PM.libs.globalVars = {};
    window.AUGUST5PM.libs.globalVars.isMobile = Detectizr.device.type == 'mobile' ? true : false;
    window.AUGUST5PM.libs.globalVars.isIE = Detectizr.browser.name == 'ie' ? true : false;
    window.AUGUST5PM.libs.globalVars.host = '/api';
    window.AUGUST5PM.libs.globalVars.OS = Detectizr.os.name;
    window.AUGUST5PM.libs.globalVars.OS_NAME_ANDROID = 'android';
    window.AUGUST5PM.libs.globalVars.OS_NAME_IOS = 'ios';
    window.AUGUST5PM.libs.globalVars.DEVICE_TYPE = Detectizr.device.type;
    window.AUGUST5PM.libs.globalVars.DEVICE_TYPE_TABLET = 'tablet';
    window.AUGUST5PM.libs.globalVars.DESKTOP_MIN_WIDTH = 1024;
    window.AUGUST5PM.libs.globalVars.isMobileWidth = false;

    // custom events
    window.AUGUST5PM.libs.customEvents = {};
    window.AUGUST5PM.libs.customEvents.TRAILER_END = 'trailer_end';
    window.AUGUST5PM.libs.customEvents.MOVE_SCROLL = 'move_scroll';
    window.AUGUST5PM.libs.customEvents.MOVE_SCROLL_BLOG = 'move_scroll_blog';
    window.AUGUST5PM.libs.customEvents.RESIZE_START = 'resize_start';
    window.AUGUST5PM.libs.customEvents.COMPLETE_RESIZE = 'complete_resize';
    window.AUGUST5PM.libs.customEvents.CHANGE_BREAKPOINT = 'change_breakpoint';
    window.AUGUST5PM.libs.customEvents.SHOW_MENU = 'show_menu';
    window.AUGUST5PM.libs.customEvents.HIDE_MENU = 'hide_menu';
})();
