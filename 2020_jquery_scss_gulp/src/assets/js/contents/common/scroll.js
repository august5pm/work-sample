/**
 * scroll event add motion
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        pluginName = 'scroll';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.contents',
            motionList: '.motion',
            viewInClass: '.view-in',
        };
        this.opts = UTIL.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AFP[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.bindEvents();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.contents = $(this.opts.contents);
            this.motionList = this.obj.find(this.opts.motionList);
        },
        // 이벤트 등록
        bindEvents: function () {
            $(win).on('scroll', $.proxy(this.scrollHandler, this));
            this.scrollHandler();
        },
        // 스크롤 이벤트 핸들러
        scrollHandler: function (event) {
            var st = $(win).scrollTop();
            var scrollBottom = st + win.innerHeight;
            this.setElementScroll(this.motionList, scrollBottom);
        },
        // 스크롤 위치에 따른 엘리먼트 체크
        setElementScroll: function (list, scrollBottom) {
            for (var i = 0; i < list.length; i++) {
                this.setElementFocus($(list[i]), scrollBottom, i);
            }
        },
        // 스크롤 위치에 있는 엘리먼트에 포커스
        setElementFocus: function (elem, scrollBottom, index) {
            //var ty = elem.offset().top + (elem.height() * 0.65);
            // 엘리먼트가 보여질 위치 0 ~ 1;
            var viewPoint = 0;
            var ty = elem.offset().top + elem.height() * viewPoint;

            if (scrollBottom > ty) {
                this.viewIn(elem);
            }

            if (scrollBottom <= elem.offset().top) {
                this.viewOut(elem);
            }
        },
        // 보여지는 컨텐츠
        viewIn: function (elem) {
            if (!elem.hasClass(this.opts.viewInClass)) {
                elem.addClass(this.opts.viewInClass);
            }
        },
        // 보여지지 않는 컨텐츠
        viewOut: function (elem) {
            if (elem.hasClass(this.opts.viewInClass)) {
                elem.removeClass(this.opts.viewInClass);
            }
        },
    };
    $(function () {
        new win.AFP[pluginName]();
    });
})(window, window.jQuery);