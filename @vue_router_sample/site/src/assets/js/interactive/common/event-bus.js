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
//contents-setting - updated 에서 실행
EventBus.CONTENTS_UPDATED = "contents_updated";

EventBus.JSON_LOAD_COMPLETE = "json_load_complete";
EventBus.FRAME_SET_COMPLETE = "frame_set_complete";

EventBus.SEND_DATA_COMPLETE = "send_data_complete";

// 리사이즈 할 때마다 호출
EventBus.CHANGE_RESIZE = "change_resize";
EventBus.COMMON_CHANGE_RESIZE = "common_change_resize";
EventBus.CHANGE_DEVICE_SIZE = "change_device_size";


// 스크롤 할 때마다 호출
EventBus.CHANGE_SCROLL = "change_scroll";
EventBus.COMMON_CHANGE_SCROLL = "common_change_scroll"; // header 등의 공통영역에서 쓰여지는 스크롤 이벤트(이벤트 삭제 시키지 않기 위해)

//페이지 트랜지션
EventBus.PAGE_TRANSITION_START = "page_transition_start";
EventBus.PAGE_TRANSITION_END = "page_transition_end";

EventBus.CHECK_VALIDATION = "check_validation";
EventBus.CHECK_VALIDATION_COMPLETE = "check_validation_complete";
EventBus.CHECK_ERROR = "check_error";
EventBus.RESET_FORM = "reset_form";

EventBus.CHANGE_PAGENATION = "change_pagenation";
EventBus.RESET_PAGENATION = "reset_pagenation";

EventBus.TRANS_ROUTE_ENTER = "trans_route_enter";
EventBus.TRANS_ROUTE_LEAVE = "trans_route_leave";
EventBus.TRANS_ROUTE_MOUNTED = "trans_route_mounted";

// 팝업 상태 관리
EventBus.SHOW_PROFILE = 'show_profile';
EventBus.HIDE_PROFILE = 'hide_profile';
EventBus.POS_BEFORE_SCROLL = 'pos_before_scroll';
EventBus.CLICKED_BTNPOPUP_TOMIXIN = 'clicked_btnpopup_tomixin'
EventBus.AFTER_POPUP_OPENED = 'after_popup_opened';


// 크리에이터 페이지에서, 더보기 버튼을 눌러서, 데이터 업데이트 할 때,
EventBus.CREATOR_REGETDATA_COMPLETE = 'creator_re_getdata_complete';

//
EventBus.CHANGE_DEVICE_SETTING = 'change_device_setting';

EventBus.GO_CAREERS_BOARD = "go_careers_board";

EventBus.TRANS_HEADER_TYPE = "trans_header_type";

EventBus.SHOW_FOOTER = "show_footer";

// 플로팅 버튼을 클릭했을 때
EventBus.CLICK_FLOAT_BTN = "click_float_btn";
EventBus.SHOW_FLOAT_BTN = "show_float_btn";
EventBus.HIDE_FLOAT_BTN = "hide_float_btn";

// 메터 데이터가 변경될 때
EventBus.CHANGE_METADATA = "change_metadata";

// 스크롤 움직임이 없어야 할 때
EventBus.STOP_SCROLL = "stop_scroll";

EventBus.GOOGLE_LOOGIN_CLICK = "google_login_click";
EventBus.GOOGLE_LOOGIN_COMPLETE = "google_login_complete";
