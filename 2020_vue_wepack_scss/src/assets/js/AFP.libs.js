var validator = (function (){

    // 한글만 체크
    var _lan_kr = function(str){
        var regexp = /^[가-힣]+$/;
        if(!regexp.test(str)){
            return false;
        }
        return true;
    },

    // 숫자만 체크
    _only_number = function(str){
        var regexp = /^[0-9]+$/;
        if(!regexp.test(str)){
            return false;
        }
        return true;
    },

    // 전화번호 형식 체크
    _phone_number = function(str){
        var regexp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
        if(!regexp.test(str)){
            return false;
        }
        return true;
    },

    // 전화번호 숫자만 체크
    _phone_only_number = function(str){
        var regexp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
        //var regexp = /^\d{3}\d{3,4}\d{4}$/;
        if(!regexp.test(str)){
            return false;
        }
        return true;
    },

    // 이메일 체크
    _email = function(str){
        var regexp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(!regexp.test(str)){
            return false;
        }

        return true;
    },

    // 공백 체크
    _blank = function(str){
        if(str.search(/\s/) != -1){
            return false;
        }

        var blank_pattern = /^\s+|\s+$/g;
        if(str.replace( blank_pattern, '' ) == ""){
            return false;
        }

        return true;
    }


    return {
        lan_kr : _lan_kr,
        only_number : _only_number,
        phone_number : _phone_number,
        phone_only_number : _phone_only_number,
        email : _email,
        blank : _blank
    }
})();

var utils = (function (){
    // JSON 데이터 요청하기
    var _requestJsonData = function(url, data, callback, type){
        var tempType = (type == undefined)?"GET":type;
        $.ajax({
            type:tempType,
            url : url,
            data : data,
            dataType: 'json',
            contentType: "application/json",
            error : function(e){
                console.error('json parse error');
                console.error(e);
            },
            success : function(json){
                callback(json);
            }
        });
    }, 
    // 헤더와 함께 JSON 데이터 요청하기
    _requestJsonDataWithHeader = function(url, data, callback, type, token){
        var tempType = (type == undefined)?"GET":type;
        $.ajax({
            type:tempType,
            url : url,
            data : data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            dataType: 'json',
            contentType: "application/json",
            error : function(e){
                console.error('json parse error');
            },
            success : function(json){
                callback(json);
            }
        });
    },

    // 로컬여부 체크
    _isLocal = function(){
        var isLocal = (/^127|^192|localhost/).test(document.location.hostname);
        isLocal = false;
        return isLocal
    },

    // 파라미터 가져오기
    _getUrlParameter = function(){
        var ParameterObject = new Object();
        var locate = location.href;

        if(locate.indexOf("?")==-1){
            return ParameterObject;
        }

        var parameter = locate.split("?")[1];
        parameter = parameter.split("#")[0];
        var paramAreay = parameter.split("&");
        for ( var i=0; i<paramAreay.length; i++ )
        {
            var tem = paramAreay[i].split("=");
            ParameterObject[tem[0]] = tem[1];
        }
        _getUrlParameter = function () { return ParameterObject; }
        return ParameterObject;
    },

    // 클립보드에 넣기
    _setClipboard = function(id, msg, callback){
        /* Get the text field */
        var copyText = document.getElementById(id);
        var isIOS = $('html').hasClass('ios');
        if(isIOS){
            _iosCopyToClipboard(copyText);
        }else{
            _copyToClipboard(copyText);
        }

        /* Alert the copied text */
        if(callback==undefined){
            alert(msg);
            return false;
        }else{
            callback();
            return false;
        }
        
    },

    // 클립보드 내용 복사
    _copyToClipboard = function(copyText){
        /* Select the text field */
        copyText.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");
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
    _shareFacebook = function(url){
        var encodeUrl = encodeURIComponent(url);
        var link = 'http://www.facebook.com/sharer/sharer.php?u='+encodeUrl;
        window.open(link, 'facebook', 'width=630, height=750');
    },

    // 트위터 공유하기
    _shareTwitter = function(msg, url){
        var encodeMsg = encodeURIComponent(msg);
        var encodeUrl = encodeURIComponent(url);
        var link = 'https://twitter.com/intent/tweet?text='+encodeMsg+'&url='+encodeUrl;
        window.open(link, 'twitter', 'width=630, height=270');
    },

    // 네이버 블로그 공유하기
    _shareNaverBlog = function(msg, url){
        var encodeMsg = encodeURIComponent(msg);
        var encodeUrl = encodeURIComponent(url);
        var link = 'http://blog.naver.com/openapi/share?title='+encodeMsg+'&url='+encodeUrl;
        window.open(link, 'naver_blog', 'width=630, height=750');
    },

    // 최대 글자수 체크 (모바일)
    _maxLengthCheck = function(obj){
        if (obj.value.length > obj.maxLength){
            obj.value = obj.value.slice(0, obj.maxLength);
        }    
    },

    // 유저 에이전트 체크
    _checkUserAgent = function(){
        var currentOS;
        var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
        if (mobile) {
            // 유저에이전트를 불러와서 OS를 구분합니다.
            var userAgent = navigator.userAgent.toLowerCase();

            if (userAgent.search("android") > -1)
                currentOS = "android";
            else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1))
                currentOS = "ios";
            else
                currentOS = "else";
        } else {

            // 모바일이 아닐 때
            currentOS = "desktop";
        }

        $('html').addClass(currentOS);
    },
    _parseT1 = function(str){
        var key = "0312gran"
        var origin_str = str;
        var base64_decode_str = atob(origin_str);
        var utf8_dedode_str = decodeURIComponent(escape(base64_decode_str));
        var result_xor_decryption_str = utf8_dedode_str
        var encryption_str_len = result_xor_decryption_str.length
        var xor_decryption_str = ""
        for (var i = 0; i < encryption_str_len; i++) {
            current = result_xor_decryption_str[i]
            current_key = key[ i % key.length ]
            xor_decryption_str += String.fromCharCode(current.charCodeAt(0) ^ current_key.charCodeAt(0))
        }
        return xor_decryption_str
    },
    _parseT2 = function(token){
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    },
    // 세션스토리지에서 JSON 형태로 가져가기
    _getSessionStorageStringToJson = function(key){
        return JSON.parse(sessionStorage.getItem(key));
    },
    // 세션스토리지에 JSON 형태로 저장
    _setSessionStorageJsonToString = function(key, data){
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    _digit = function(num){
        var strNum = '';
        if(num < 10){
            strNum = '0'+num;
        }else{
            strNum = num;  
        }
        return strNum
    },
    _toggleClass = function(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        if (check.test(element.className)) {
            element.className = element.className.replace(check, " ").trim();
        }else {
            element.className += " " + className;
        }
    },
     _addClass = function(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        if (!check.test(element.className)) {
            element.className += " " + className;
        }
    },
    _removeClass = function(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(check, " ").trim();
    },
    _hasClass = function(element, className){
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className)
    },
    _getScrollPosY = function() {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        return top;
    }

    return {
        requestJsonData : _requestJsonData
        ,requestJsonDataWithHeader : _requestJsonDataWithHeader
        ,isLocal : _isLocal
        ,getUrlParameter : _getUrlParameter
        ,setClipboard : _setClipboard
        ,shareFacebook : _shareFacebook
        ,shareTwitter : _shareTwitter
        ,shareNaverBlog : _shareNaverBlog
        ,maxLengthCheck : _maxLengthCheck
        ,checkUserAgent : _checkUserAgent
        ,parseT1 : _parseT1
        ,parseT2 : _parseT2
        ,getSessionStorageStringToJson : _getSessionStorageStringToJson
        ,setSessionStorageJsonToString : _setSessionStorageJsonToString
        ,digit : _digit
        ,toggleClass : _toggleClass
        ,addClass : _addClass
        ,removeClass : _removeClass
        ,hasClass : _hasClass
        ,getScrollPosY : _getScrollPosY
    }
})();


(function(){
    if(window.NPIXEL == undefined) window.NPIXEL = {};
    window.NPIXEL.libs = {};
    window.NPIXEL.libs.validator = validator;
    window.NPIXEL.libs.utils = utils;
    window.NPIXEL.libs.globalVars = {};
  

})();
