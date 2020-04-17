/**
 * mouse wheel event (DESKTOP)
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        GlobalVars = win.AFP.libs.globalVars,
        pluginName = 'mouseWheel';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.contents',
            sectionList: '.gs-section',
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
            this.bindCallbackEvents();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.contents = $(this.opts.contents);
            this.sectionList = this.obj.find(this.opts.sectionList);
        },
        // 변수 선언
        setVars: function () {
            this.totalSlide = this.sectionList.length;
            this.currentSlide = 0;
            this.isTrans = false;
        },
        // 이벤트 등록
        bindEvents: function () {
            this.contents.on('mousewheel', $.proxy(this.onMouseWheelHandler, this));
        },
        // 콜백 이벤트 등록
        bindCallbackEvents: function () {
            this.contents.on('resizeComplete', $.proxy(this.onResizeComplete, this));
        },
        // 리사이즈 완료 되었을 때
        onResizeComplete: function (e, data) {
            this.move(this.currentSlide, true);
        },
        // 마우스 이벤트 핸들러
        onMouseWheelHandler: function (e, data) {
            if (this.isTrans) return;

            this.isTrans = true;
            var deltaY = e.originalEvent.deltaY;
            if (deltaY < 0) {
                this.prev();
            } else {
                this.next();
            }
        },
        // 이전 슬라이드
        prev: function () {
            var slide = this.currentSlide - 1;
            if (slide < 0) {
                slide = 0;
            }
            this.move(slide);
        },
        // 다음 슬라이드
        next: function () {
            var slide = this.currentSlide + 1;
            if (slide > this.totalSlide - 1) {
                slide = this.totalSlide - 1;
            }
            this.move(slide);
        },
        // 이동하기
        move: function (slide, isResize) {
            if (slide == this.currentSlide && (isResize == undefined || !isResize)) {
                this.isTrans = false;
                return;
            }
            this.contents.trigger('startSlide', [this.currentSlide, slide]);
            var targetY = $(win).height() * slide;
            var target = this.obj;
            gsap.to(target, {
                duration: 0.8,
                top: -targetY,
                ease: Cubic.easeInOut,
                onComplete: $.proxy(this.moveComplete, this),
                onCompleteParams: [slide],
            });
        },
        // 이동 완료
        moveComplete: function (slide) {
            this.isTrans = false;
            this.contents.trigger('endSlide', [this.currentSlide, slide]);
            this.currentSlide = slide;
        },
    };
    $(function () {
        if (!GlobalVars.isMobile) {
            new win.AFP[pluginName]();
        }
    });
})(window, window.jQuery);