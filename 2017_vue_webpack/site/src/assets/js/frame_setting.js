require("./frame/tracking");
require("./frame/Google_ads");

import es6Promise from 'es6-promise';
es6Promise.polyfill();

require("babel-polyfill");

//component common
import Vue from 'vue'
import loaderJson from './interactive/common/loader-json'
import { EventBus } from './interactive/common/event-bus.js';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public
var _this;

var _preset = {
    json_url:window.GlobalPreset.JSON_URL.CAT_00_HOME,
    isRedirect_ifNotMobile : false
};

//////////// STEP - 1
var _beforeCreate = function(){
    //console.log("========================================================================= 1 : beforeCreate");
    _this = this;
    _addEvent();
};

//////////// STEP - 2
var _data = function(){ // must define function
    //console.log("========================================================================= 2 : data create");
    return {
                navidata:{},
                quickmenudata:{},
                footerdata:{},
                mainContent:_mainContent.data,
                $loaderJson: null
            }
};

var _computed = {
    utildata : function(){
        return _this.quickmenudata
    }
}

//////////// STEP - 3
var _created = function(){
    //console.log("========================================================================= 3: created");
    _init();
};

var _mainContent = {
    "data":{template: '<div class="inner-wrap" style="display: none"></div>'}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// private

var _init = function(){
    // load json
    _this.$loaderJson = new loaderJson();

    var url = _preset.json_url;
    console.log("============================================= JSON _URL : "+ url);

    _this.$loaderJson.loadJsonData(url);
};

var _addEvent = function(){

    EventBus.$once(EventBus.JSON_LOAD_COMPLETE, jsonData => {
        //console.log("=========================================================================JSON_LOAD_COMPLETE");
        _onLoad_json(jsonData);
    });
};

var _onLoad_json = function(jsonData){
    window.GlobalVars.json_data = jsonData;
    _set_component();
};

var _set_component = function(){
    var jsonData = window.GlobalVars.json_data;
    _this.navidata = jsonData.navigation;
    _this.quickmenudata = jsonData.utils_quickmenu;
    _this.footerdata = jsonData.footer;

    if(!window.GlobalVars.isMobile && _preset.isRedirect_ifNotMobile){

        var url = jsonData.models != undefined ? jsonData.models.line.model.communication_model.link : jsonData.concept.communication_model.link;
        //url = addParamsUrl(url);
        var param = window.location.search
        window.location.href = url+param
        //window.location.href = url
        return;
    }

    _tracking_pageName();
    EventBus.$emit(EventBus.FRAME_SET_COMPLETE);

    var el = document.querySelector("#app");
    DF.utils.removeClass(el, "loading");

    _tracking_count();
};


var _tracking_pageName = function(){
   /* console.log("========================================================================================== JSON data: "+ window.GlobalVars.json_data.common.tracking_pageview);
    var page_name = window.GlobalVars.json_data.common.tracking_pageview;
    window.Tracking.send_pageView(page_name);*/
};

var _tracking_count = function(){
    var count_code = window.GlobalVars.count_code;

    if(count_code != null && count_code != "") window.Tracking.send_count(count_code);
};

import browser from './interactive/common/components/browser.vue'
import skip from './interactive/common/components/skip.vue'

import common_group_header from './interactive/common/components/common-group-header.vue'
import common_group_footer from './interactive/common/components/common-group-footer.vue'

var _component = {
    "component-browser": browser
    ,"component-skip": skip

    ,"common-group-header":common_group_header
    ,"common-group-footer":common_group_footer
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
    components:_component
};