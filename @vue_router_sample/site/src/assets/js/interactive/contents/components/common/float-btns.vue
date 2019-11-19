
<!-- template -->
<template>
    <transition name="tr-float-btn">
        <div class="float-btn" v-show="isShow"
             @mouseover="overFloatBtn"
             @mouseleave="outFloatBtn"
        >

            <div class="btn-wrap on"> <!--활성화 클래스 on-->
                <a :href="arrPath[index]" target="_self" @click.stop.prevent="onClick_btn(index, arrEventTracking[index])">
                    <p class="obj-box-wrap">
                        <span id="obj-box-canvas"></span>
                    </p>
                    <span class="txt float-btn-txt txt-0">크리에이터<i>지원하기</i></span>
                    <span class="txt float-btn-txt txt-1">브랜드 광고 제휴<i>문의하기</i></span>
                    <span class="txt float-btn-txt txt-2">IP 사업 제휴<i>문의하기</i></span>
                    <span class="txt float-btn-txt txt-3">채용공고<i>보러가기</i></span>
                    <span class="txt float-btn-txt txt-4"><i>공식 스토어</i></span>
                    <span class="txt float-btn-txt txt-5">회사소개<i>보러가기</i></span>
                </a>
            </div>
        </div>
    </transition>

</template>

<!-- script -->
<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    import $ from 'jquery';

    export default {
        props: {
            index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            }
        },

        watch : {
            isOver_btnFloat: function () {
            }
        },

        data: function() {
            return {
                box:null,
                slickStartTime : 0,
                winW:0,
                winH:0,
                scrollTop:'',
                scrollBottom:'',
                isTop:false,
                isBottom:false,
                bottom:0,
                device:'',
                isShow : false,
                isFloat_Fixed : true,
                isOver_btnFloat : false,
                isStartedMotion : false,
                currentRouter : '',
                isMovingToPage : false,
                isStarted : true,
                device_temp : '',
                arrPath :[
                    '/apply-creator',
                    '/business/brand/contact',
                    '/business/ip/contact',
                    '',
                    'https://auguststore.net/',
                    "/about"
                ],

                arrEventTracking : [
                    'click_apply_creator_float',
                    'click_brand_inquire_float',
                    'click_ip_inquire_float',
                    '',
                    'click_esports_float',
                    'click_about_page',
                ]
            }
        },

        created : function(){
            EventBus.$on(EventBus.SHOW_FLOAT_BTN,this.showFloatBtn);
            EventBus.$on(EventBus.HIDE_FLOAT_BTN,this.hideFloatBtn);
            EventBus.$on(EventBus.SHOW_PROFILE,this.isPopupOpen);
            EventBus.$on(EventBus.HIDE_PROFILE,this.isPopupClose);
            EventBus.$on(EventBus.AFTER_POPUP_OPENED,this.afterPopupOpened);
            EventBus.$on(EventBus.TRANS_ROUTE_ENTER,this.transRouteEnter);
            EventBus.$on(EventBus.TRANS_ROUTE_MOUNTED,this.transRouteMounted );

            clearTimeout(this.timerId);
        },

        mounted: function () {
            this.box = Box();
            let posFloatBtn = 555; // PC기준 float버튼 절대위치

            EventBus.$on(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$on(EventBus.CHANGE_RESIZE, this.onChange_resize);

            EventBus.$emit(EventBus.CONTENTS_UPDATED);

            this.setRouter();
            if(!this.box.isMouted)this.box.mounted(document.getElementById('obj-box-canvas') , this.index);
            if( this.scrollTop > posFloatBtn - posFloatBtn * 0.5 ){
                this.box.setShow(true);
            }else{
                this.box.setShow(false);
            }
            this.detectIdx();
        },

        destroyed : function(){
            clearTimeout(this.timerId);

            EventBus.$off(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resize);

            EventBus.$off(EventBus.SHOW_FLOAT_BTN,this.showFloatBtn);
            EventBus.$off(EventBus.HIDE_FLOAT_BTN,this.hideFloatBtn);

            EventBus.$off(EventBus.SHOW_PROFILE,this.isPopupOpen);
            EventBus.$off(EventBus.HIDE_PROFILE,this.isPopupClose);

            EventBus.$off(EventBus.AFTER_POPUP_OPENED,this.afterPopupOpened);

            EventBus.$off(EventBus.TRANS_ROUTE_ENTER,this.transRouteEnter);
            EventBus.$off(EventBus.TRANS_ROUTE_MOUNTED,this.transRouteMounted);

            this.isInited  = false;
            if(this.box.isMouted) this.box.garbage();
            // this.resetFloatBtn();
        },

        methods:{
            onClick_btn : function(index, eventAction){
                if(index != 3){
                    var path = this.arrPath[index];

                    EventBus.$emit(EventBus.CLICK_FLOAT_BTN, eventAction);
                    console.log(eventAction);

                    if( index === 4 ){
                        window.open(path, '_blank');
                    }else{
                        this.$router.push(path)
                    }
                }else{
                    this.goBoard();
                }

            },

            overFloatBtn : function(){
                if( !this.isMovingToPage ){
                    if( window.GlobalVars.typeBrowser !== window.GlobalVars.BROWSER_TYPE_MOBILE ){
                        this.box.setOver();
                        window.DF.utils.addClass(document.querySelector('.float-btn'),'onShow');
                    }
                }
            },

            outFloatBtn : function(){
                if( !this.isMovingToPage ){
                    if( window.GlobalVars.typeBrowser !== window.GlobalVars.BROWSER_TYPE_MOBILE ){
                        this.box.setOut();
                        window.DF.utils.removeClass(document.querySelector('.float-btn'),'onShow');
                    }
                }
            },

            showFloatBtn : function() {
                this.isShow = true;
            },
            hideFloatBtn : function() {
                this.isShow = false;
            },

            detectIdx : function(){
                if(document.querySelector('.float-btn-txt') !== null) {
                    let idx = this.index;
                    let targets = document.getElementsByClassName('float-btn-txt');
                    let targetEl = document.querySelector('.txt-'+ idx+'');
                    let classArr = ['btn-apply-creator','btn-business-brand-contact','btn-business-ip-contact','btn-careers','','btn-about']; //'btn-store'


                    $('.btn-wrap a').removeClass('btn-careers btn-business-brand-contact btn-business-ip-contact btn-apply-creator btn-about'); //btn-store
                    $('.btn-wrap a').addClass( classArr[idx] );


                    for( var i=0;i<targets.length;i++ ){
                        DF.utils.removeClass( targets[i],'on' );
                        DF.utils.removeClass( targets[i],'on' );
                    }
                    DF.utils.addClass( targetEl,'on' );
                }
            },

            setRouter : function(){
                let list = (window.location.pathname).split('/');
                let listLen = list.length;

                if(list[listLen-1] == '') list.pop();
                this.currentRouter = list[list.length -1];

                console.log('this.currentRouter============================================================',this.currentRouter);
            },

            onChange_scroll : function(scrollTop){
                this.scrollTop = scrollTop;
                this.scrollBottom = this.scrollTop + this.winH;
                let btnFloat = document.querySelector('.float-btn');


                    if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE ){
                        // 모바일 일 경우
                        let target = document.querySelector('.footer-wrap');
                        let posTarget = target.offsetTop;
                        // reset
                        window.DF.utils.removeClass(btnFloat,'onHide');
                        window.DF.utils.removeClass(btnFloat,'isSetFixed');
                        this.bottom = 0;


                        // 현재 보는 화면에서 조금 밑으로 내렸을 경우,
                        this.scrollTop > this.winH * 0.1 ? window.DF.utils.addClass(btnFloat,'onShow') : window.DF.utils.removeClass(btnFloat,'onShow');


                        // 화면의 아래가 footer에 도달했을 때
                        this.scrollBottom >= posTarget ? window.DF.utils.addClass(btnFloat,'release-fix') : window.DF.utils.removeClass(btnFloat,'release-fix')
                    }else{
                        // PC나 타블렛 일 경우

                        let posFloatBtn = '';
                        let targetpos = '';

                        if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_DESKTOP ){
                            posFloatBtn = 528;
                            targetpos = 70;
                        }else if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_TABLET ){
                            var targetValue0 = 41.25; //vw
                            posFloatBtn = (targetValue0 / 100) * this.winW;

                            var targetValue1 = 5.46875; //vw
                            targetpos = (targetValue1 / 100) * this.winW;
                        }

                        btnFloat.style.bottom = '';



                        // 브라우저 탑위치에서 float의 거리에서 50%의 위치에서 작게 만들기
                        if( this.scrollTop > posFloatBtn * 0.5 ){
                            this.scaleDownFloatBtn();
                            this.box.setState(false);
                        }else{
                            this.scaleUpFloatBtn();
                            this.box.setState(true);
                        }



                        // 브라우저 탑위치에서 70을 뺀 부분에서, float버튼 고정 시키기
                        if( this.scrollTop > posFloatBtn - targetpos ){
                            this.fixFloatBtn();
                        }else{
                            this.releaseFloatBtn();
                        }



                        // 인재채용 일 때만 작동
                        if( this.currentRouter === 'august'){
                            let apply_board_el_offset = DF.utils.getOffset(document.querySelector('.js-careers-info-board .content-tit-wrap')).top;
                            let apply_board_el_height = document.querySelector('.js-careers-info-board').offsetHeight;
                            if( this.scrollTop >= apply_board_el_offset - (apply_board_el_height * 0.2) ){
                                window.DF.utils.addClass(btnFloat,'onHidden');
                            }else{
                                window.DF.utils.removeClass(btnFloat,'onHidden');
                            }
                        }
                    }
            },

            onChange_resize : function(w,h,device){
                this.winW = w;
                this.winH = h;

                if(this.device_temp != device) {
                    if(device == window.GlobalVars.BROWSER_TYPE_MOBILE) {
                        if(this.box.isMouted) this.box.garbage();
                    }else{
                        if(!this.box.isMouted){
                            this.box.mounted(document.getElementById('obj-box-canvas') , this.index);

                            this.onChange_scroll(DF.utils.getScrollPosY());
                        }
                    }
                }

                this.device_temp = device;
            },

            resetFloatBtn : function(){
                if( document.querySelector('.float-btn') !== undefined ){
                    let btnFloat = document.querySelector('.float-btn');
                    window.DF.utils.removeClass(btnFloat,'onHide');
                    window.DF.utils.removeClass(btnFloat,'isSetFixed');
                    this.isFloat_Fixed = false;
                }
            },

            goBoard : function(){
                EventBus.$emit(EventBus.GO_CAREERS_BOARD)
            },

            isPopupOpen : function(){
                this.isShow = false;
            },

            isPopupClose : function(){
                this.isShow = true;

            },

            fixFloatBtn : function(){
                window.DF.utils.addClass(document.querySelector('.float-btn'),'isSetFixed');
            },

            releaseFloatBtn : function(){
                window.DF.utils.removeClass(document.querySelector('.float-btn'),'isSetFixed');
            },

            scaleUpFloatBtn : function(){
                window.DF.utils.removeClass(document.querySelector('.float-btn'),'onHide');
            },

            scaleDownFloatBtn : function(){
                window.DF.utils.addClass(document.querySelector('.float-btn'),'onHide');
            },

            afterPopupOpened : function(){
                this.isSeen = true;
            },

            transRouteEnter : function(){
                this.isMovingToPage = true;
            },

            transRouteMounted : function(){
                this.isMovingToPage = false;
            }
        }
    }
</script>
