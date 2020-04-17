/**
 * main contents
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        CustomEvents = win.NPIXEL.libs.customEvents,
        pluginName = 'mainSection';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.gs-section.main',
            SECTION_INDEX: 0,
        };
        this.opts = UTIL.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AFP[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.bindEvents();
            this.bindCallbackEvents();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.contents = $(this.opts.contents);
        },
        // 이벤트 등록
        bindEvents: function () {},
        // 콜백 이벤트
        bindCallbackEvents: function () {
            this.contents.on(CustomEvents.START_SLIDE, $.proxy(this.onStart_slide, this));
            this.contents.on(CustomEvents.END_SLIDE, $.proxy(this.onEnd_slide, this));
        },
        // 슬라이드 변경 시작
        onStart_slide: function (e, from, to) {},
        // 슬라이드 변경 완료
        onEnd_slide: function (e, from, to) {},
    };
    $(function () {
        new win.AFP[pluginName]();
    });
})(window, window.jQuery);