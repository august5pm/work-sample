<script>
    import Vue from 'vue';
    import { EventBus } from '../../../interactive/common/event-bus.js'
    import $ from 'jquery';

    export default {
        data: function () {
            return {
                // default
                scrollTop : '',
                scrollBottom :'',
                winW : 0,
                winH : 0,
                currentRouter : 0,
                isSeenPopup : '',


                // 키비 대기시간
                KV_READY_TIME : 850,
                M_KV_READY_TIME : 600,

                isFreeze : false,
                // keyVisual Parallax Vars
                parallaxVars : {
                    slideImg_Top : 0,
                    slideImg_Left : 0,
                    slideTxt_Top : 0,
                    slideTxt_Left : 0,
                    slideTxt_Top_Sub : 0,
                    bgScrollY : 0,


                    slideImg_Opacity : 0,
                    slideTxt_Opacity : 0,


                    isExceedKV_Limited : false,
                    dimExceedKv_Limited_value : 250,
                    dim_Opacity : 0,

                    currentRouter : ''
                },
            }
        },

        created: function () {
            EventBus.$on(EventBus.AFTER_POPUP_OPENED, this.after_Popup_Opened );
            EventBus.$on(EventBus.PAGE_TRANSITION_END,this.pageTransitionEnd);
            this.isFreeze = window.GlobalVars.isIE() ? false : true;
        },

        mounted:function(){
            EventBus.$on(EventBus.CHANGE_RESIZE, this.onChange_resize);
            EventBus.$on(EventBus.CHANGE_SCROLL, this.onChange_scroll);

            if(!window.GlobalVars.isTransing) this.isFreeze = false;

            EventBus.$emit(EventBus.CONTENTS_UPDATED);

            this.setRouter();
            this.kvMotion().init();
        },

        destroyed:function(){
            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resize);
            EventBus.$off(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$off(EventBus.AFTER_POPUP_OPENED, this.after_Popup_Opened);
            EventBus.$off(EventBus.PAGE_TRANSITION_END,this.pageTransitionEnd);
        },

        methods: {
            pageTransitionEnd : function() {
                this.isFreeze = false;
            },
            setRouter : function(){
                let list = (window.location.pathname).split('/');
                let listLen = list.length;

                if(list[listLen-1] == '') list.pop();
                this.currentRouter = list[list.length -1];
            },

            onChange_scroll : function(scrollTop){
                this.scrollTop = this.isFreeze ? 0 : scrollTop;
                this.scrollBottom = this.scrollTop + this.winH;
                if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_DESKTOP){
                    this.kvMotion().initScroll_Motion();
                }else{
                    this.kvMotion().reset();
                }
            },

            onChange_resize : function(w,h){
                this.winW = w;
                this.winH = h;

                let app = this;

                if( this.currentRouter === '' ){
                    if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE ){
                        if(!app.isMobile){
                            app.isMobile = true;
                            app.changeImgList();
                        }
                    }else{
                        if(app.isMobile){
                            app.isMobile = false;
                            app.changeImgList();
                        }
                    }
                }
                this.onChange_scroll(DF.utils.getScrollPosY());
            },

            changeImgList : function(){
                if(this.isMobile){
                    this.arrImgList = this.arrImgList_mobile;
                }else{
                    this.arrImgList = this.arrImgList_desktop;
                }
            },

            kvMotion : function(){
                let app = this;
                let _reset = function(){
                    app.scrollTop = 0;
                    app.scrollBottom = 0;
                    app.parallaxVars.slideImg_Top = 0;
                    app.parallaxVars.slideImg_Left = 0;
                    app.parallaxVars.slideImg_Opacity = 1;
                    app.parallaxVars.slideTxt_Opacity = 1;
                    app.parallaxVars.slideTxt_Left = 0;
                    app.parallaxVars.slideTxt_Top_Sub = 0;
                    app.parallaxVars.slideTxt_Top = 0;
                    app.parallaxVars.bgScrollY = 0;

                    app.parallaxVars.dim_Opacity = 0;
                    app.parallaxVars.isExceedKV_Limited = false;
                }

                let setting = function(){
                    _reset();
                };

                let _initScroll_Motion = function(){
                    if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_DESKTOP ){
                        if( !app.isSeenPopup ){
                            if( window.GlobalVars.isIE() ){
                                _reset();
                            }else{
                                app.parallaxVars.bgScrollY = -((app.scrollTop) * 0.1 ) + 'px';
                                // direction
                                app.parallaxVars.slideImg_Left = ((app.scrollTop * 0.1903)) + 'px';
                                app.parallaxVars.slideImg_Top = -((app.scrollTop * 1 ) + (app.scrollTop * 0.1)) + 'px';

                                app.parallaxVars.slideTxt_Left = ((app.scrollTop) * 0.1) + 'px';
                                app.parallaxVars.slideTxt_Top = -((app.scrollTop) * 1 ) + 'px';

                                // opacity
                                app.parallaxVars.dim_Opacity = app.scrollTop / app.winH;
                                if( app.scrollTop >= app.parallaxVars.dimExceedKv_Limited_value ){
                                    app.parallaxVars.isExceedKV_Limited = true;
                                }else{
                                    app.parallaxVars.isExceedKV_Limited = false;
                                }

                                app.parallaxVars.dim_Opacity = ((app.scrollTop - app.parallaxVars.dimExceedKv_Limited_value) / 1500);

                                if( app.parallaxVars.dim_Opacity <= 0 ) app.parallaxVars.dim_Opacity = 0;
                                if( app.parallaxVars.dim_Opacity >= 0.2 ) app.parallaxVars.dim_Opacity = 0.2;

                                let txt_op = ((app.scrollTop / 300)) - 1;
                                if( txt_op >= 1 ) txt_op = 1;
                                app.parallaxVars.slideTxt_Opacity = 1 - ( txt_op );


                                // main 페이지
                                if( app.currentRouter === '' ){
                                    const SLIDE_TXT_DIS = 800;
                                    const SLIDE_TXT_OP = 500;

                                    let slideTxt_disPer = window.GlobalVars.easing.easeInCubic( app.scrollTop / SLIDE_TXT_DIS ,0.2,1,1 );
                                    let slideTxt_opPer = window.GlobalVars.easing.easeInCubic( app.scrollTop / SLIDE_TXT_OP ,0,1,1 );

                                    app.parallaxVars.slideTxt_Left = (slideTxt_disPer * ( app.scrollTop * 0.6 )) + 'px';
                                    app.parallaxVars.slideTxt_Top = -( app.scrollTop ) + 'px';

                                    let txt_op = ( slideTxt_opPer ) - 0.9;
                                    if( txt_op >= 1 ) txt_op = 1;

                                    app.parallaxVars.slideTxt_Opacity = 1 - ( txt_op );
                                }


                                // main 페이지 인터렉션 베리에이션
                                if( app.currentRouter === 'creators' ){
                                    app.parallaxVars.slideTxt_Top_Sub = (-((app.scrollTop) * 1.15 ) ) + 'px';
                                    app.parallaxVars.slideTxt_Top =  (-((app.scrollTop) * 1.15 )) + 'px';
                                }

                                // career
                                if( app.currentRouter === 'august '){}

                                // 종 스크롤 인터렉션
                                if( app.currentRouter === 'brand' || app.currentRouter === 'ip' || app.currentRouter === 'about' || app.currentRouter === 'esports' || app.currentRouter === 'ir-notice'){
                                    const DIS = 800;

                                    if(app.currentRouter === 'ir-notice') {
                                        app.parallaxVars.slideImg_Top = ( (app.scrollTop) * 0.15 ) + 'px';
                                    } else {
                                        app.parallaxVars.slideImg_Top = ( (app.scrollTop) * 0.4 ) + 'px';
                                    }

                                    let slideImg_disPer = window.GlobalVars.easing.easeInCubic( app.scrollTop / DIS ,0,1,1 );
                                    app.parallaxVars.slideTxt_Top = -(( slideImg_disPer * app.scrollTop )) + 'px';

                                    app.parallaxVars.dim_Opacity = ((app.scrollTop - app.parallaxVars.dimExceedKv_Limited_value) / 1600);
                                }
                            }
                        }
                    }else{
                        _reset();
                    }
                }

                let _init = function(){
                    setting();
                };

                return{
                    init:_init,
                    reset:_reset,
                    initScroll_Motion:_initScroll_Motion
                }
            },

            after_Popup_Opened : function( isSeenPopup ){
                this.isSeenPopup = isSeenPopup;
            },
        },
    }
</script>
