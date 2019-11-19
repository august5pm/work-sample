import Vue from 'vue'
import { EventBus } from './event-bus.js';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public

var _this;
var _scrollTop;

var _created = function() {
    window.addEventListener('scroll', _scrollHandler);
}
var _scrollHandler = function(){
    var top =  window.GlobalVars.transScrollY = DF.utils.getScrollPosY();
    //console.log('scroll ::::::::::::: ' , top);
    if(_scrollTop != top){
        _scrollTop = top;
        EventBus.$emit(EventBus.CHANGE_SCROLL, _scrollTop);
        EventBus.$emit(EventBus.COMMON_CHANGE_SCROLL, _scrollTop);
    }
}

module.exports = {
    created: _created()
}
