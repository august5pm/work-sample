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

EventBus.OPEN_POPUP_YOUTUBE = "open_popup_youtube";
EventBus.CLOSE_POPUP_YOUTUBE = "close_popup_youtube";

EventBus.START_SLIDE = "start_slide";
EventBus.END_SLIDE = "end_slide";
