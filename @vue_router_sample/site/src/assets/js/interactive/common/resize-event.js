import Vue from 'vue'
import {EventBus} from './event-bus.js';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public
var _isDeviceSizeChange = -1;

var _created = function () {
    window.addEventListener('resize', _resizeHandler);
    EventBus.$on(EventBus.CONTENTS_UPDATED, _resizeHandler);
}
var _mounted = function() {

}

var _resizeHandler = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>",w,h)
    //var typeBrowser;

    if (w <= window.GlobalVars.SIZE_MOBILE) {
        window.GlobalVars.typeBrowser = window.GlobalVars.BROWSER_TYPE_MOBILE;

        if (_isDeviceSizeChange) {
            _isDeviceSizeChange = false;
            var el = document.querySelector('body');
            window.DF.utils.addClass(el, window.GlobalVars.BROWSER_TYPE_MOBILE)
            EventBus.$emit(EventBus.CHANGE_DEVICE_SIZE,w,h, window.GlobalVars.typeBrowser);
        }

    }
    else if( w > window.GlobalVars.SIZE_MOBILE && w <= window.GlobalVars.SIZE_TABLET) {
        window.GlobalVars.typeBrowser = window.GlobalVars.BROWSER_TYPE_TABLET;

        if (!_isDeviceSizeChange) {
            _isDeviceSizeChange = true;
            var el = document.querySelector('body');
            window.DF.utils.removeClass(el, window.GlobalVars.BROWSER_TYPE_MOBILE);
            EventBus.$emit(EventBus.CHANGE_DEVICE_SIZE,w,h, window.GlobalVars.typeBrowser);
        }
    }
    else {
        window.GlobalVars.typeBrowser = window.GlobalVars.BROWSER_TYPE_DESKTOP;
        if (!_isDeviceSizeChange) {
            _isDeviceSizeChange = true;
            var el = document.querySelector('body');
            window.DF.utils.removeClass(el, window.GlobalVars.BROWSER_TYPE_MOBILE);
            EventBus.$emit(EventBus.CHANGE_DEVICE_SIZE,w,h, window.GlobalVars.typeBrowser);
        }

    }
    console.log('  window.GlobalVars.typeBrowser  :::::::::::::::::::' ,  window.GlobalVars.typeBrowser )
    EventBus.$emit(EventBus.CHANGE_RESIZE,w,h,window.GlobalVars.typeBrowser);
    EventBus.$emit(EventBus.COMMON_CHANGE_RESIZE,w,h,window.GlobalVars.typeBrowser);
    EventBus.$emit(EventBus.CHANGE_SCROLL, DF.utils.getScrollPosY());
    EventBus.$emit(EventBus.COMMON_CHANGE_SCROLL, DF.utils.getScrollPosY());

}


module.exports = {
    created: _created(),
    mounted : _mounted()
}
