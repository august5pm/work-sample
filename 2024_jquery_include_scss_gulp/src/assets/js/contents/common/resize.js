/**
 * window resize event
 */
(function (win, $) {
    'use strict';
    win.AUGUST5PM = win.AUGUST5PM || {};
    var UTILS = win.AUGUST5PM.libs.utils,
        CustomEvents = win.AUGUST5PM.libs.customEvents,
        GlobalVars = win.AUGUST5PM.libs.globalVars,
        pluginName = 'windowResize';
    win.AUGUST5PM[pluginName] = function (container, args) {
        if (!(this instanceof win.AUGUST5PM[pluginName])) {
            return new win.AUGUST5PM[pluginName](container, args);
        }
        var defParams = {
            container: '#container',
            obj: '#container',
        };
        this.opts = UTILS.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AUGUST5PM[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.setVars();
            this.bindEvents();
            this.onResize();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.container = $(this.opts.container);
        },
        // 변수 선언
        setVars: function () {
            this.timer = 0;
        },
        // 이벤트 등록
        bindEvents: function () {
            $(win).on('resize', $.proxy(this.onResize, this));
        },
        // 리사이즈 이벤트 핸들러
        onResize: function (e, data) {
            this.stopTimer();
            this.startTimer();
            const winWidth = $(window).width();
            const isMobileWidth = winWidth < GlobalVars.DESKTOP_MIN_WIDTH;
            if (isMobileWidth !== GlobalVars.isMobileWidth) {
                GlobalVars.isMobileWidth = isMobileWidth;
                this.container.trigger(CustomEvents.CHANGE_BREAKPOINT);
            }
            this.container.trigger(CustomEvents.RESIZE_START);
        },
        // 타이머 시작
        startTimer: function () {
            this.timer = setInterval($.proxy(this.timerHandler, this), 400);
        },
        // 타이머 정지
        stopTimer: function () {
            clearInterval(this.timer);
        },
        // 타이머 이벤트 핸들러
        timerHandler: function () {
            this.stopTimer();
            this.container.trigger(CustomEvents.COMPLETE_RESIZE);
        },
    };
    $(function () {
        new win.AUGUST5PM[pluginName]();
    });
})(window, window.jQuery);