/**
 * swiper (MOBILE)
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        GlobalVars = win.AFP.libs.globalVars,
        pluginName = 'swiperCon';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.swiper-container',
        };
        this.opts = UTIL.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AFP[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.bindEvents();
            this.addSwiper();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.contents = $(this.opts.contents);
            this.mainSwiper = null;
        },
        // 이벤트 등록
        bindEvents: function () {},
        // 콜백 이벤트 등록
        bindCallbackEvents: function () {
            this.contents.on('open_popup', $.proxy(this.onOpen_popup, this));
            this.contents.on('close_popup', $.proxy(this.onClose_popup, this));
            this.contents.on('move_slide', $.proxy(this.onMove_slide, this));
        },
        // 스와이퍼 ADD
        addSwiper: function () {
            console.log('addSwiper');
            this.mainSwiper = new Swiper(this.obj, {
                // Optional parameters
                speed: 600,
                direction: 'vertical',
                loop: false,
                on: {
                    init: $.proxy(this.initSlide, this),
                    slideChangeTransitionStart: $.proxy(this.onStart_slide, this),
                    transitionEnd: $.proxy(this.onEnd_slide, this),
                },
            });
        },
        // 슬라이드 초기화
        initSlide: function () {},
        // 슬라이드 이동시키기
        move: function (index) {
            this.mainSwiper.slideTo(index);
        },
        // 슬라이드 시작 이벤트
        onStart_slide: function () {
            this.contents.trigger('startSlide', [this.mainSwiper.previousIndex, this.mainSwiper.activeIndex]);
        },
        // 슬라이드 끝 이벤트
        onEnd_slide: function () {
            this.contents.trigger('endSlide', [this.mainSwiper.previousIndex, this.mainSwiper.activeIndex]);
        },
        // 팝업이 열렸을 때
        onOpen_popup: function (e, data) {
            this.mainSwiper.allowTouchMove = false;
        },
        // 팝업이 닫혔을 때
        onClose_popup: function (e, data) {
            this.mainSwiper.allowTouchMove = true;
        },
        // 슬라이드 이동 이벤트
        onMove_slide: function (e, index) {
            this.move(index);
        },
    };
    $(function () {
        if (GlobalVars.isMobile) {
            new win.AFP[pluginName]();
        } else {
            $('.swiper-container').removeClass('swiper-container');
            $('.swiper-wrapper').removeClass('swiper-wrapper');
            $('.swiper-slide').removeClass('swiper-slide');
        }
    });
})(window, window.jQuery);