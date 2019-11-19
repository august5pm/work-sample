require('./frame/tracking');

import es6Promise from 'es6-promise';
es6Promise.polyfill();

require('babel-polyfill');

import Vue from 'vue'
import { EventBus } from './interactive/common/event-bus.js';
var jQuery = require("jquery-easing");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var _this;
var _preset = {
    json_url : ''
};

var _beforeCreate = function () {
    console.log("========================================================================= 1 : beforeCreate");
    _this = this;
    _addEvent();
};

var _data = function () {
    console.log("========================================================================= 2 : data create");
    return{
        mainContent:_mainContent.data
    }
};

var _computed = {

};

var _created = function () {
    console.log("========================================================================= 3: created");
};

var _mainContent = {
    "data" : {template: '<div></div>'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var _init = function() {

};

var _addEvent = function () {
    EventBus.$once(EventBus.JSON_LOAD_COMPLETE, jsonData => {
        //console.log("=========================================================================JSON_LOAD_COMPLETE");
        _onLoad_json(jsonData);
    });
}

var _onLoad_json = function(jsonData){
    window.GlobalVars.json_data = jsonData;
    _set_component();
};



var _set_component = function(){
    EventBus.$emit(EventBus.FRAME_SET_COMPLETE);

    var el = document.querySelector("#app");
    DF.utils.removeClass(el, "loading");
};






import browser from './interactive/common/components/browser.vue'
import skip from './interactive/common/components/skip.vue'



import router from './interactive/router/index'

var _component = {
    "component-browser": browser
    ,"component-skip": skip
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Export
module.exports = {
    el:"#app",
    data: _data,
    computed :_computed,
    beforeCreate: _beforeCreate,
    created: _created,
    mainContent : _mainContent,
    preset :_preset,
    components:_component,
    router
};
