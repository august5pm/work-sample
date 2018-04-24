'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import { EventBus } from './event-bus.js';
import axios from 'axios'

var loaderJson = function () {
    function loaderJson() {
    }
    _createClass(loaderJson, [{
        key: 'loadJsonData',
        value: function loadJsonData(url) {

            axios.get(url)
                .then(function (response) {
                    // app.navidata = response.data.navigation;
                    // console.log("getJsonData : ", response.data);
                    EventBus.$emit(EventBus.JSON_LOAD_COMPLETE, response.data);
                    return response.data;

                })
                .catch(function (error) {
                    // vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
                    console.log(error)
                })
        }
    },{
        key: 'requestJsonData',
        value: function requestJsonData(url, callback) {

            axios.get(url)
                .then(function (response) {
                    // app.navidata = response.data.navigation;
                    // console.log("getJsonData : ", response.data);
                    EventBus.$emit(EventBus.DATA_REQUEST_COMPLETE, response.data, callback);
                    return response.data;

                })
                .catch(function (error) {
                    // vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
                    console.log(error)
                })
        }
    },{
        key: 'requestJsonPostData',
        value: function requestJsonPostData(url, data, callback) {

            axios({
                method: 'post',
                url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: data
            }).then(function (response) {
                    // app.navidata = response.data.navigation;
                    // console.log("getJsonData : ", response.data);
                    EventBus.$emit(EventBus.DATA_REQUEST_COMPLETE, response.data, callback);
                    return response.data;

                })
                .catch(function (error) {
                    // vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
                    console.log(error)
                })
        }
    }]);
    return loaderJson;
}();
exports.default = loaderJson;