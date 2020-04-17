/**
 * window resize event
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        pluginName = 'windowResize';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.contents',
        };
        this.opts = UTIL.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AFP[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.setVars();
            this.bindEvents();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.contents = $(this.opts.contents);
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
            this.contents.trigger('resizeComplete');
        },
    };
    $(function () {
        new win.AFP[pluginName]();
    });
})(window, window.jQuery);
