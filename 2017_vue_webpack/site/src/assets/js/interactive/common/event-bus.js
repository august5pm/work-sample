/*
*  Custom Events
*
*  import { EventBus } from './event-bus.js';
*
*  dispatch
*  EventBus.$emit(EventBus.CLICK_ALERT, param);
*
*  addEventListener
*  EventBus.$on(EventBus.CLICK_ALERT, this.hideContent);
* */


import Vue from 'vue';
export const EventBus = new Vue();

EventBus.CHANGE_MODEL_GRADE = "change_model_grade";
EventBus.JSON_LOAD_COMPLETE = "json_load_complete";
EventBus.DATA_REQUEST_COMPLETE = "data_request_complete";

// 스크롤 할 때마다 호출
EventBus.CHANGE_SCROLL = "change_scroll";
// 타겟으로 스크롤 이동
EventBus.TARGET_MOVE_SCROLL = "target_move_scroll";

// youtube
EventBus.SHOW_POPUP_YOUTUBE = "show_popup_youtube";
EventBus.HIDE_POPUP_YOUTUBE = "hide_popup_youtube";

EventBus.FRAME_SET_COMPLETE = "frame_set_complete";

// mobile title back
EventBus.BACK_CLICK = "back_click"

EventBus.CHANGE_STEP = "change_step";
EventBus.CHANGE_INDEX = "change_index";
EventBus.CHANGE_TITLE = "change_title";
EventBus.CHANGE_PAGE = "change_page";


EventBus.CHECKED = "checked";
EventBus.RESET_INPUT = "reset_input"

EventBus.SHOW_POPUP = "show_popup";
EventBus.HIDE_POPUP = "hide_popup";

EventBus.SHOW_POPUP_POST = "show_popup_post";
EventBus.HIDE_POPUP_POST = "hide_popup_post";

EventBus.SHOW_POPUP_ALERT = "show_popup_alert";
EventBus.HIDE_POPUP_ALERT = "hide_popup_alert";

EventBus.ON_SUBMIT = "on_submit";

EventBus.CLICK_LIST = "click_list";
EventBus.ON_SEARCH = "on_search";

EventBus.GET_DETAIL_DATA = "get_detail_data";


// dimmed control
EventBus.SHOW_DIMMED = "show_dimmed";
EventBus.HIDE_DIMMED = "hide_dimmed";
EventBus.CLICK_DIMMED = "click_dimmed";


//post
EventBus.CHANGE_POST_INDEX = "change_post_index"; //index, tot
EventBus.CHANGE_POST_CONTENT = "change_post_content"; //number
EventBus.CHANGE_POST_CONTROL_MODE = "change_post_control_mode"; //on, off


// mobile quick menu
EventBus.CLICK_MOBILE_QUICK = "click_mobile_quick";


