/**
 * section-class
 */
(function (win, $) {
    'use strict';
    win.AUGUST5PM = win.AUGUST5PM || {};
    var UTILS = win.AUGUST5PM.libs.utils,
        GlobalVars = win.AUGUST5PM.libs.globalVars,
        CustomEvents = win.AUGUST5PM.libs.customEvents,
        pluginName = 'eventOpenSection';//새 섹션 생성시 변경
    win.AUGUST5PM[pluginName] = function (container, args) {
        if (!(this instanceof win.AUGUST5PM[pluginName])) {
            return new win.AUGUST5PM[pluginName](container, args);
        }
        var defParams = {
            container: '#container',
            obj: '.gs-section.event-open',//새 섹션 생성시 변경
            activeClass: 'is-active',
            hiddenClass: 'hidden',
            SECTION_INDEX: GlobalVars.PAGE_INDEX_EVENT_OPEN,//새 섹션 생성시 변경
        };
        this.opts = UTILS.def(defParams, args || {});
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.AUGUST5PM[pluginName].prototype = {
        init: function () {
            this.setElements();
            this.setVars();
            this.bindEvents();
            this.bindCallbackEvents();
            this.hide();
        },
        // 엘리먼트 생성
        setElements: function () {
            this.container = $(this.opts.container);
            this.obj = $(this.opts.obj);

            //this.characterHolder = this.obj.find(this.opts.characterHolder);
        },
        setVars: function(){
            this.isPageViewEvent = false;
        },
        // 이벤트 등록
        bindEvents: function () {
            //this.btnEvent.on('click', $.proxy(this.onClick_btnEvent, this));
        },
        // 콜백 이벤트
        bindCallbackEvents: function () {
            this.container.on(CustomEvents.START_SLIDE, $.proxy(this.onStart_slide, this));
            this.container.on(CustomEvents.END_SLIDE, $.proxy(this.onEnd_slide, this));
        },
        // 슬라이드 변경 시작
        onStart_slide: function (e, from, to) {
            if(to == this.opts.SECTION_INDEX){
                if(!this.isPageViewEvent){
                    this.isPageViewEvent = true;
                    //this.container.trigger(CustomEvents.GTM_EVENT, GlobalVars.GTM_GOH_KAKAO);
                }

                this.show();
                this.transIn();
            }
        },
        // 슬라이드 변경 완료
        onEnd_slide: function (e, from, to) {
            if(to == this.opts.SECTION_INDEX){
                
            }

            if(from == this.opts.SECTION_INDEX){
                this.hide();
            }
        },
        show: function(){
            this.obj.removeClass(this.opts.hiddenClass);
        },
        hide: function(){
            this.obj.addClass(this.opts.hiddenClass);
        },
        transIn: function(){
            /* var txtTop = this.txtTop;
            gsap.killTweensOf(txtTop)
            gsap.to(txtTop,{
                duration: 0,
                opacity:0,
                y: 50
            });
            gsap.to(txtTop,{
                duration: 0.6,
                opacity:1,
                y:0,
                delay: 0.4,
                ease:Cubic.easeOut
            }); */
        }
    };
    $(function () {
        new win.AUGUST5PM[pluginName]();
    });
})(window, window.jQuery);