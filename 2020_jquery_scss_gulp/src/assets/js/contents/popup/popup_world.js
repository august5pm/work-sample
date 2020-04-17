/**
 * popup world
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        pluginName = 'popupWorld';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.popup-world',
            popupId: 'popup-world',
            openClass: 'open',
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
            this.popup = $(this.opts.obj);
            this.contents = $(this.opts.contents);
        },
        // 변수 선언
        setVars: function () {
            this.player = {};
            this.isOpen = false;
        },
        // 이벤트 등록
        bindEvents: function () {},
        // 콜백 이벤트 등록
        bindCallbackEvents: function () {
            this.contents.on('open_popup', $.proxy(this.onOpen_popup, this));
            this.contents.on('close_popup', $.proxy(this.onClose_popup, this));
        },
        // 팝업 열기 이벤트
        onOpen_popup: function (e, data) {
            var popupId = this.opts.popupId;
            var targetId = data.popupId;
            if (popupId == targetId) {
                this.open();
            }
        },
        // 팝업 닫기 이벤트
        onClose_popup: function (e, data) {
            this.close();
        },
        // 팝업 열기
        open: function () {
            if (!this.isOpen) {
                this.isOpen = true;
                this.popup.addClass(this.opts.openClass);
            }
        },
        // 팝업 닫기
        close: function () {
            if (this.isOpen) {
                this.popup.removeClass(this.opts.openClass);
                this.isOpen = false;
            }
        },
    };
    $(function () {
        new win.AFP[pluginName]();
    });
})(window, window.jQuery);
