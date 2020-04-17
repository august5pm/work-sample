/**
 * popup youtube player
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        GlobalVars = win.AFP.libs.globalVars,
        CustomEvents = win.NPIXEL.libs.customEvents,
        pluginName = 'popupYoutubePlayer';

    win.AFP[pluginName] = function (container, args) {
        if (!(this instanceof win.AFP[pluginName])) {
            return new win.AFP[pluginName](container, args);
        }
        var defParams = {
            contents: '.contents',
            obj: '.popup-youtube',
            popupId: 'popup-youtube',
            openClass: 'open',
            playClass: 'play',
            container: '.container',
            youtubePlayerClass: '.youtube-player',
        };
        this.opts = UTIL.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AFP[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.setVars();
            this.bindCallbackEvents();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.popup = $(this.opts.obj);
            this.contents = $(this.opts.contents);
            this.container = this.popup.find(this.opts.container);
        },
        // 변수 선언
        setVars: function () {
            this.player = {};
            this.isOpen = false;
            this.currentIndex = -1;
            this.currentVideoId = null;
            this.youtubeData = {};
            this.playerWidth = !GlobalVars.isMobile ? '1280' : '100%';
            this.playerHeight = !GlobalVars.isMobile ? '720' : '100%';
        },
        // 콜백 이벤트 등록
        bindCallbackEvents: function () {
            this.contents.on(CustomEvents.OPEN_POPUP, $.proxy(this.onOpen_popup, this));
            this.contents.on(CustomEvents.CLOSE_POPUP, $.proxy(this.onClose_popup, this));
        },
        // 팝업 열기 이벤트
        onOpen_popup: function (e, data) {
            var popupId = this.opts.popupId;
            var targetId = data.popupId;
            if (popupId == targetId) {
                this.currentVideoId = data.videoId;
                this.open(this.currentVideoId);
            }
        },
        // 팝업 닫기 이벤트
        onClose_popup: function (e, data) {
            this.close();
        },
        // 팝업 열기
        open: function (videoId) {
            if (!this.isOpen) {
                this.isOpen = true;
                this.popup.addClass(this.opts.openClass);
                this.load(videoId);
            }
        },
        // 팝업 닫기
        close: function () {
            if (this.isOpen) {
                this.pause(this.currentVideoId);
                this.container.find(this.opts.youtubePlayerClass).removeClass(this.opts.playClass);
                this.popup.removeClass(this.opts.openClass);
                this.isOpen = false;
                this.currentVideoId = null;
            }
        },
        // 유투브 로드
        load: function (videoId) {
            if (this.youtubeData[videoId] == undefined) {
                this.container.append('<div id="' + videoId + '" class="youtube-player"></div>');
                this.youtubeData[videoId] = {};
                this.youtubeData[videoId].videoId = videoId;
                this.youtubeData[videoId].player = new YT.Player(videoId, {
                    videoId: videoId,
                    width: this.playerWidth,
                    height: this.playerHeight,
                    playerVars: {
                        autoplay: 1,
                        // controls : 0,
                        showinfo: 0,
                        rel: 0,
                        enablejsapi: 1,
                    },
                    fs: 1,
                });
                this.container.find('#' + videoId).addClass(this.opts.playClass);
            } else {
                this.container.find('#' + videoId).addClass(this.opts.playClass);
                this.youtubeData[videoId].player.seekTo(0);
                this.youtubeData[videoId].player.playVideo();
            }
        },
        // 유투브 정지
        pause: function (videoId) {
            if (this.youtubeData[videoId] != undefined) {
                this.youtubeData[videoId].player.pauseVideo();
            }
        },
    };
    $(function () {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        win.onYouTubeIframeAPIReady = function () {
            new win.AFP[pluginName]();
        };
    });
})(window, window.jQuery);