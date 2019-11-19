import Vue from 'vue'

var frame = require('./frame_setting');

frame.preset.json_url = window.GlobalPreset.JSON_URL.GET_DATA_CONTENTS;
frame.mainContent.data = require("./interactive/contents/contents-setting.vue");

new Vue(frame);