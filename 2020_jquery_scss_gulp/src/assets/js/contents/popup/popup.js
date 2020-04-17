/**
 * popup common module
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        pluginName = 'popupLayer';
    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.popup',
            btnPopup: '.btn-popup',
            dimmed: '.dimmed',
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
            this.popup = $(this.opts.obj);
            this.contents = $(this.opts.contents);
            this.btnPopup = this.contents.find(this.opts.btnPopup);
            this.dimmed = this.popup.find(this.opts.dimmed);
        },
        // 이벤트 등록
        bindEvents: function () {
            this.btnPopup.on('click', $.proxy(this.onClick_btnPopup, this));
            this.dimmed.on('click', $.proxy(this.onClick_dimmed, this));
        },
        // 팝업 버튼을 클릭 했을 때
        onClick_btnPopup: function (e, data) {
            var popupId = $(e.currentTarget).data('target');
            var youtubeId = $(e.currentTarget).data('youtube-id');
            var data = { popupId: popupId, videoId: youtubeId };
            this.contents.trigger('open_popup', data);
        },
        // 딤드를 클릭했을 때
        onClick_dimmed: function (e, data) {
            this.contents.trigger('close_popup');
        },
    };
    $(function () {
        new win.AFP[pluginName]();
    });
})(window, window.jQuery);
