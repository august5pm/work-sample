import Vue from 'vue'

var frame = require("./frame_setting");

frame.preset.json_url = window.GlobalPreset.JSON_URL.CAT_00_MAIN;
frame.mainContent.data = require("./interactive/main/main-setting.vue");

new Vue(frame);

