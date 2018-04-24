import Vue from 'vue'

var frame = require("./frame_setting");
frame.preset.json_url = window.GlobalPreset.JSON_URL.CAT_00_HOME;
//frame.mainContent.data = require("./interactive/contents/_contents_list.vue");

new Vue(frame);