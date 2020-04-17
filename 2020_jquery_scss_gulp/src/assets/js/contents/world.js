/**
 * world contents
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        pluginName = 'worldSection';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.gs-section.world',
            video: '.gs-video',
            SECTION_INDEX: 1,
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
            this.video = this.obj.find(this.opts.video);
        },
        // 이벤트 등록
        bindEvents: function () {},
        // 콜백 이벤트
        bindCallbackEvents: function () {
            this.contents.on('startSlide', $.proxy(this.onStart_slide, this));
            this.contents.on('endSlide', $.proxy(this.onEnd_slide, this));
        },
        // 슬라이드 변경 시작
        onStart_slide: function (e, from, to) {},
        // 슬라이드 변경 완료
        onEnd_slide: function (e, from, to) {
            if (this.opts.SECTION_INDEX == to) {
                this.play();
            } else if (this.opts.SECTION_INDEX == from) {
                this.pause();
                this.video[0].currentTime = 0;
            }
        },
        // 영상 시작
        play: function () {
            this.video[0].play();
        },
        // 영상 일시정지
        pause: function () {
            this.video[0].pause();
        },
    };
    $(function () {
        new win.AFP[pluginName]();
    });
})(window, window.jQuery);
