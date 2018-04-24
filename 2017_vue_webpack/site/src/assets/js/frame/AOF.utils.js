
import TWEEN from 'tween.js';
import { EventBus } from '../interactive/common/event-bus';

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
        return top;
    }


    return {
        toggleClass : _toggleClass,
        addClass : _addClass,
        removeClass : _removeClass,
        hasClass : _hasClass,
        triggerEvent : _triggerEvent,
        addParamsUrl : _addParamsUrl,
        getScrollPosY : _getScrollPosY
    }
})();

(function(){

    if(window.DF == undefined) window.DF = {};
    window.DF.utils = utils;

})();