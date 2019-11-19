
import TWEEN from 'tween.js';
import { EventBus } from '../interactive/common/event-bus';
import $ from  'jquery'

var utils = (function (){

    ////////////////////////////////////////////////////////////////////

    // add class FN
    function _toggleClass(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        if (check.test(element.className)) {
            element.className = element.className.replace(check, " ").trim();
        }else {
            element.className += " " + className;
        }
    }

    function _addClass(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        if (!check.test(element.className)) {
            element.className += " " + className;
        }
    }

    function _removeClass(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(check, " ").trim();
    }

    function _hasClass(element, className){
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className)
    }

    // < EVENT Trigger >
    // Usage example :
    // var el = document.querySelector('input[type="text"]');
    // triggerEvent(el, 'mousedown');

    function _triggerEvent(el, type){
        if ('createEvent' in document) {
            // modern browsers, IE9+
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            // IE 8
            var e = document.createEventObject();
            e.eventType = type;
            el.fireEvent('on'+e.eventType, e);
        }
    }

    function _addParamsUrl($url, $name, $value){
        var url = $url;
        var arr_hash = url.split("#")

        if(arr_hash.length >1){
            if(arr_hash[0].indexOf("?") > -1)   url = arr_hash[0] + "&";
            else                        url = arr_hash[0] + "?";
            url = url + $name + "=" + $value+"#"+arr_hash[1];
        }else{
            if(url.indexOf("?") > -1)   url = url + "&";
            else                        url = url + "?";
            url = url + $name + "=" + $value;
        }

        return url;
    }


    // 현재 스크롤 Y 값
    function _getScrollPosY() {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        //var scrollTop = ($(window).scrollTop()|| $('body').scrollTop());

        return top;
    }

    function _getJsonData(url, data, callback, type){
        var tempType = (type == undefined)?"GET":type;

        $.ajax({
            type:tempType,
            url : url,
            data : data,
            dataType: 'json',
            error : function(e){
                console.error('json parse error');
            },
            success : function(json){
                callback(json);
            }
        });
    }

    function _setFormJsonData(url, data, callback){
        $.ajax({
            url: url, // url where upload the image
            contentType: 'multipart/form-data',
            type: 'POST',
            data: data,
            dataType: 'json',
            mimeType: 'multipart/form-data',
            error : function (jqXHR, textStatus, errorThrown) {
                alert('ERRORS: ' + textStatus);
            },
            success: function (json) {
                callback(json);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }

    function _scrollTo(element, to, duration) {
        if (duration < 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 2;

        setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick;
            scrollTo(element, to, duration - 2);
        }, 10);
    }

    function _getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    function _getScrollbarWidth() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    function _getUrlParameter(){
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
    }

    return {
        toggleClass : _toggleClass,
        addClass : _addClass,
        removeClass : _removeClass,
        hasClass : _hasClass,
        triggerEvent : _triggerEvent,
        addParamsUrl : _addParamsUrl,
        getScrollPosY : _getScrollPosY,
        getJsonData : _getJsonData,
        setFormJsonData : _setFormJsonData,
        scrollTo : _scrollTo,
        getOffset : _getOffset,
        getScrollbarWidth : _getScrollbarWidth,
        getUrlParameter : _getUrlParameter
    }
})();

(function(){

    if(window.DF == undefined) window.DF = {};
    window.DF.utils = utils;

})();
