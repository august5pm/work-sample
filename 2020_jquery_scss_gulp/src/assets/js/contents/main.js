/**
 * main contents
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
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
            this.contents.on('startSlide', $.proxy(this.onStart_slide, this));
            this.contents.on('endSlide', $.proxy(this.onEnd_slide, this));
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
/**
 * popup youtube player
 */
(function (win, $) {
    'use strict';
    win.AFP = win.AFP || {};
    var UTIL = win.AFP.libs.utils,
        GlobalVars = win.AFP.libs.globalVars,
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
            this.contents.on('open_popup', $.proxy(this.onOpen_popup, this));
            this.contents.on('close_popup', $.proxy(this.onClose_popup, this));
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
