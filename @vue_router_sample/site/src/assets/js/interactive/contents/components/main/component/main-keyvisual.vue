<template>
    <section class="section-keyvisual">
        <div class="content-wrap main-kv content-size-full content-pos-fixed"> <!-- full type .content-size-full / fixed type .content-pos-fixed -->
            <div class="inner-content-wrap">
                <div class="v-slick" v-if="isDataLoaded"> <!-- add class .v-slick -->
                    <div class="kv-slide-wrap"> <!-- full bg type .type-img-size-2560 -->

                        <!-- keyvisual image -->
                        <ul class="kv-img-wrap slide-img-wrap" v-bind:style="{ opacity : parallaxVars.slideImg_Opacity, top : parallaxVars.slideImg_Top, left: parallaxVars.slideImg_Left }">
                            <li class="kv-item"
                                :class="" v-for="(list, index) in arrImgList" :key="index"> <!--'onInit' : isStart && showIndex == index, 'onShow' : showIndex==index , 'onHideLeft' : index<showIndex || index==totalIndex&&showIndex==0, 'onHideRight' : index>showIndex || index==0&&showIndex==totalIndex-->
                                <div class="kv-item-img">
                                    <figure class="mod-covered-bg" :style="'background-image:url(\''+list+'\')'" ><!--이미지--></figure>
                                </div>
                            </li>
                        </ul>

                        <!-- keyvisual creator text -->
                       <!--<ul class="kv-item-wrap">-->
                        <slick ref="slick_kv" :options="slickOptions" @afterChange="handleAfterChange"
                               @beforeChange="handleBeforeChange" @init="initSlick" class="kv-item-wrap" v-bind:style="{ opacity : parallaxVars.slideTxt_Opacity, transform: 'translate(' + 0 +','+ parallaxVars.slideTxt_Top + ')', }">
                            <div class="kv-item" v-for="(list, index) in itemdata.lists" :key="index" :class="['kv-'+index]"> <!--:class="['kv-'+index, {'onShow' : showIndex==index && !isStart , 'onHide' : hideIndex==index && isTransAfter==true , 'onInit' : isStart && showIndex == index}]"-->
                                <!--<div class="kv-item-img">-->
                                <!--<figure class="mod-covered-bg" style="background-image: url('../assets/images/pc/template/main_kv_item_img_1.png');" >&lt;!&ndash;이미지&ndash;&gt;</figure>-->
                                <!--</div>-->
                                <div class="kv-item-tit tit-type-cover">
                                    <h1 class="txt-tit motion">
                                        <span class="txt-box" v-html="list.title"></span><!--POWER OF <br>IMAGINATION-->
                                    </h1>
                                    <strong class="txt-tit_explain motion">
                                        <span class="txt-box" v-html="list.desc"></span><!--크리에이터의 상상력으로 <br>세상을 즐겁게-->
                                    </strong>
                                    <div class="btn-wrap">
                                        <router-link :to="list.link.url" target="_self" class="btn-cta btn-type-box" v-if="checkLinkTarget(list.link.url)">
                                            <span class="btn-txt">{{list.link.text}}<!--크리에이터 보기--></span>
                                        </router-link>
                                        <a :href="list.link.url" target="_blank" class="btn-cta btn-type-box" v-else>
                                            <span class="btn-txt">{{list.link.text}}<!--크리에이터 보기--></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </slick>
                        <!--</ul>-->
                    </div>

                    <!-- count indi -->
                    <!--<div class="item-count-wrap" v-bind:style="{ opacity : parallaxVars.slideTxt_Opacity, transform: 'translateY(' + parallaxVars.slideTxt_Top + ')' }">
                        <span class="current">{{currentPage}}</span><span class="total">{{totalPage}}</span>
                    </div>-->

                    <!--<div class="btn-wrap btn-prev-next-wrap" v-bind:style="{ opacity : parallaxVars.slideTxt_Opacity, transform: 'translateY(' + parallaxVars.slideTxt_Top + ')' }">-->
                        <!--<button type="button" class="btn-cta btn-type-arrow btn-prev" @click.stop.prevent="prev">-->
                            <!--<span class="ico-prev-flat">&lt;!&ndash; prev &ndash;&gt;</span>-->
                        <!--</button>-->
                        <!--<button type="button" class="btn-cta btn-type-arrow btn-next" @click.stop.prevent="next"><span class="ico-next-flat">&lt;!&ndash; prev &ndash;&gt;</span></button>-->
                    <!--</div>-->

                    <div class="btn-wrap btn-prev-next-wrap type-bold" v-bind:style="{ opacity : parallaxVars.slideTxt_Opacity, transform: 'translateY(' + parallaxVars.slideTxt_Top + ')' }">
                        <button type="button" class="btn-cta btn-type-arrow btn-prev" @click.stop.prevent="prev">
                            <span class="line-holder">
                                <span class="line-mask top"><span class="line"></span></span>
                                <span class="line-mask bottom"><span class="line"></span></span>
                            </span>
                        </button>
                        <button type="button" class="btn-cta btn-type-arrow btn-next" @click.stop.prevent="next">
                            <span class="line-holder">
                                <span class="line-mask top"><span class="line"></span></span>
                                <span class="line-mask bottom"><span class="line"></span></span>
                            </span>
                        </button>
                        <div class="slide-indi-bar">
                            <div class="inner-mask">
                                <div class="bar">
                                    <div class="current-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- dim 활성화 클래스 .onShow -->
            <!--<div class="dim-kv" v-bind:style="{ opacity : parallaxVars.dim_Opacity }" v-bind:class="{ onShow : parallaxVars.isExceedKV_Limited }">&lt;!&ndash;&ndash;&gt;</div>-->
        </div>
    </section>
</template>

<script>
    import Slick from 'vue-slick';
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import initScroll_Motion from '../../../../../interactive/common/mixin/scrollMotion_mixin';
    import $ from 'jquery';

    export default {
        name: "main-keyvisual",
        props: {
            itemdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {
                /*
                isStart : '',
                device : 0,
                scrollTop : '',
                scrollBottom :'',
                winW : 0,
                winH : 0,


                // keyVisual Parallax Vars
                parallaxVars : {
                    slideImg_Top : 0,
                    slideImg_Left : 0,
                    slideTxt_Top : 0,
                    slideTxt_Left : 0,

                    slideImg_Opacity : 0,
                    slideTxt_Opacity : 0,
                    dim_Opacity : 0,
                    isExceedKV_Limited : false,
                },
                //
                */
                isMobile : false,
                scrollTop : '',
                scrollBottom :'',

                slickOptions: {
                    //options can be used from the plugin documentation
                    infinite: true,
                    dots: false,
                    speed: 800,
                    arrows: false,
                    fade: true,
                    cssEase: 'cubic-bezier(0.65, 0.01, 0.29, 1)',
                    draggable : false,
                    responsive: [
                        {
                            breakpoint: window.GlobalVars.SIZE_MOBILE,
                            settings: {
                                settings: "slick_kv",
                                fade: false,
                                slidesToShow: 1,
                                slidesToScroll : 1,
                                speed: 560,
                                cssEase: '',
                                draggable: true,
                                variableWidth: true,
                                autoplay: true,
                                autoplaySpeed: 3000,
                            }
                        }
                    ]
                },

                isDataLoaded : false,
                showIndex : -1,
                hideIndex : -1,
                totalIndex : 1,
                currentPage : 1,
                totalPage : 1,
                arrImgList : [],
                arrImgList_desktop : [],
                arrImgList_mobile : [],
                timerId : 0,
                isStart : true,
                isTransAfter : true,

                isRender : true,
                isInitSlick : false,

                isTouch : false,
                touchStart : false,
                touchStartX : 0,
                touchStartY : 0,
                touchX : 0,
                touchY : 0,
                kvMoveDistX : 0,
                kvMoveDistY : 0,

                indiBarW : 0,
                indiBarX : 0,
                slickStartTime : 0
            }
        },


        beforeCreate: function () {

        },

        created : function(){
            /*this.isStart = window.GlobalVars.isStart
            EventBus.$on(EventBus.PAGE_TRANSITION_START,this.pageTransitionStart);
            console.log( 'main:::::::::::::::::::::::::::::::::::::::::::::::',this.isStart );*/

            clearTimeout(this.timerId);

            if(window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE) {
                if(window.GlobalVars.isOpenMenu) {
                    this.slickStartTime = this.M_KV_READY_TIME;
                }else {
                    this.slickStartTime = 0;
                }
            }else {
                if(window.GlobalVars.isTransing) {
                    this.slickStartTime = this.KV_READY_TIME;
                }else{
                    this.slickStartTime = 0;
                }
            }
        },

        mounted: function () {
            EventBus.$on(EventBus.CHANGE_RESIZE, this.onChange_resizeMobile);
        },

        destroyed : function(){
            /*EventBus.$off(EventBus.PAGE_TRANSITION_START,this.pageTransitionStart);*/

            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resizeMobile);
            $('.kv-item-wrap.slick-slider').off('touchstart touchmove touchend click', this.kvTouchEvent);

            clearTimeout(this.timerId);
        },

        methods: {
            onChange_resizeMobile : function(w,h,device){
                this.isMobile = device == window.GlobalVars.BROWSER_TYPE_MOBILE? true : false;
                this.kvTitleMobileSetting();
            },

            initSlick : function(){

                this.timerId = setTimeout(() => {
                    this.isShow = true;
                    this.showIndex = 0;

                    EventBus.$emit(EventBus.SHOW_FLOAT_BTN);

                    // ==================== keyvisual setting =====================
                    // kv slide setting - image position change
                    this.kvImgSlideChange();

                    // kv slide setting - entry motion
                    $('.kv-item-wrap .slick-current .kv-'+this.showIndex).addClass('onInit');
                    // this.kvImgSlideInit();

                    // kv slide setting - next prev btns
                    $('.btn-prev-next-wrap').addClass('onShow');

                    // kv slide setting - touch event
                    $('.kv-item-wrap.slick-slider').on('touchstart touchmove touchend click', this.kvTouchEvent);

                    //kv slide setting - mobile setting
                    this.isMobile = window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE? true : false;
                    this.isInitSlick = true;
                    this.kvTitleMobileSetting();

                    // kv slide setting - indicator only mobile
                    //this.setSlideIndiBar();
                    // ==================== // keyvisual setting =====================

                }, this.slickStartTime);
            },

            prev: function () {
                if(this.$refs.slick_kv != null){
                    this.$refs.slick_kv.prev();
                }
            },

            next: function () {
                if(this.$refs.slick_kv != null) {
                    this.$refs.slick_kv.next();
                }
            },

            handleAfterChange : function(event, slick, currentSlide){
                this.isTransAfter = false;

                // hideIndex Element Reset
                $('.slick-slide.slick-cloned').find('.kv-'+this.hideIndex).removeClass('onHide').removeClass('onShow');
                $('.slick-slide').find('.kv-'+this.hideIndex).removeClass('onHide').removeClass('onShow');
            },

            handleBeforeChange : function(event, slick, currentSlide, nextSlide){
                this.isStart = false;
                this.isTransAfter = true;

                this.currentPage = (nextSlide+1);
                this.showIndex = nextSlide;
                if(nextSlide != currentSlide){
                    this.hideIndex = currentSlide;
                }

                // console.log(this.showIndex, this.hideIndex);
                // console.log($('.slick-current').find('.kv-'+this.showIndex));
                // console.log($('.slick-current').find('.kv-'+this.hideIndex));
                // console.log('=======================================================');

                // this.kvImgSlideInit();
                this.kvImgSlideChange();

                // hideIndex Element onHide
                $('.slick-current .kv-'+this.hideIndex).removeClass('onInit').addClass('onHide');

                // showIndex Element onShow
                $('.slick-slide.slick-cloned').find('.kv-'+this.showIndex).addClass('onShow');
                $('.slick-slide').find('.kv-'+this.showIndex).addClass('onShow');
            },

            kvTitleMobileSetting : function(){
                if(this.isInitSlick) {
                    if(this.isMobile) { // && !this.isStart
                        $('.slick-slide .kv-item').addClass('onSetMobile');
                    } else {
                        $('.slick-slide .kv-item').removeClass('onSetMobile');
                    }
                }
            },

            // kvImgSlideInit : function(){
            //     if (this.isStart) {
            //         $('.kv-img-wrap').find('.kv-item').eq(0).addClass('onInit');
            //     } else {
            //         $('.kv-img-wrap').find('.kv-item').eq(0).removeClass('onInit');
            //     }
            // },

            kvImgSlideChange : function() {
                //console.log('** slide : ' + 'showIndex : ' + this.showIndex + ' / hideIndex : '  + this.hideIndex);

                for(var i=0; i<=this.totalIndex; i++) {
                    // reset
                    $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onHideLeft');
                    $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onHideRight');
                    $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onShow');

                    // show Index
                    if(i == this.showIndex) {
                        $('.kv-img-wrap').find('.kv-item').eq(this.showIndex).addClass('onShow');
                    }

                    // hide Index
                    else {
                        // set hide position top right
                        if (i < this.showIndex) {
                            if (this.showIndex == this.totalIndex && i == 0) {
                                $('.kv-img-wrap').find('.kv-item').eq(i).addClass('onHideRight');
                                $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onHideLeft');
                            } else {
                                $('.kv-img-wrap').find('.kv-item').eq(i).addClass('onHideLeft');
                                $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onHideRight');
                            }
                        }
                        // set hide position left bottom
                        else if (i > this.showIndex) {
                            if (this.showIndex == 0 && i == this.totalIndex) {
                                $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onHideRight');
                                $('.kv-img-wrap').find('.kv-item').eq(i).addClass('onHideLeft');
                            } else {
                                $('.kv-img-wrap').find('.kv-item').eq(i).removeClass('onHideLeft');
                                $('.kv-img-wrap').find('.kv-item').eq(i).addClass('onHideRight');
                            }
                        }
                    }
                }
            },

            kvImgSlideZoom : function() {
                if(this.touchStart) {
                    $('.kv-img-wrap').find('.kv-item').eq(this.showIndex).addClass('onMoveZoomIn');
                    $('.btn-prev-next-wrap').addClass('onTransStraight');
                } else {
                    $('.kv-img-wrap').find('.kv-item').eq(this.showIndex).removeClass('onMoveZoomIn');
                    $('.kv-img-wrap').find('.kv-item').eq(this.hideIndex).removeClass('onMoveZoomIn');
                    $('.btn-prev-next-wrap').removeClass('onTransStraight');
                }
            },

            setImgList : function(){
                var len = this.itemdata.lists.length;
                for(var i=0; i<len; i++){
                    this.arrImgList_desktop.push(this.itemdata.lists[i].img_url);
                    this.arrImgList_mobile.push(this.itemdata.lists[i].img_url_m);
                }
            },

            kvTouchEvent : function(e) {
                // isMobile
                if (this.isMobile) {
                    //console.log(e.currentTarget);
                    //e.preventDefault();
                    //e.stopPropagation();

                    if(e.type === 'touchstart') {
                        this.touchStart = true;
                        this.touchStartX = e.originalEvent.touches[0].pageX;
                        this.touchStartY = e.originalEvent.touches[0].pageY;

                        // this.kvImgSlideZoom();
                        // this.onSlideIndiBar();

                        if(this.kvMoveDistX >= this.kvMoveDistY && this.touchStart) {
                            console.log('kvImageZoom ============================================== ', this.kvMoveDistX, this.kvMoveDistY);
                            this.kvImgSlideZoom();
                            //this.onSlideIndiBar();
                        }
                    }
                    if(e.type === 'touchmove' && this.touchStart) {
                        this.touchX = e.originalEvent.touches[0].pageX;
                        this.touchY = e.originalEvent.touches[0].pageY;

                        //console.log('==============================================');
                        //console.log('touchMove', '터치초기값 : ', this.touchStartX, this.touchStartY, ' / 현재터치값 :', this.touchX, this.touchY);

                        this.kvMoveDistX = Math.abs(this.touchStartX - this.touchX); //* (this.touchStartX/100) * 0.02;
                        this.kvMoveDistY = Math.abs(this.touchStartY - this.touchY);

                        if(this.kvMoveDistX >= this.kvMoveDistY) {
                            //this.kvImgSlideZoom();
                            //this.onSlideIndiBar();
                            this.touchStart = true;
                        } else {
                            this.touchStart = false;
                            console.log('touchMove, touchStart: ', this.touchStart);
                        }

                        console.log('==============================================', this.kvMoveDistX, this.kvMoveDistY, this.touchStart);

                        //$('.kv-img-wrap .kv-item.onShow').css('transform', 'scale(' + (1+this.kvScaleX) + ')');
                    }
                    if(e.type === 'touchend') {
                        //console.log('touchEnd');
                        this.touchStart = false;
                        this.kvImgSlideZoom();
                        //this.onSlideIndiBar();
                    }

                    if(e.type === 'click') {
                        this.touchStart = false;
                    }

                }
            },

            // setSlideIndiBar : function() {
            //     this.indiBarW = 100/this.totalPage;
            //     $('.current-bar').css({"width":this.indiBarW+"%"});
            // },

            // onSlideIndiBar : function() {
            //     this.indiBarX = 100 * this.showIndex;
            //
            //     if(this.touchStart) {
            //         $('.slide-indi-bar').addClass('onShow');
            //     } else {
            //         $('.slide-indi-bar').removeClass('onShow');
            //     }
            //
            //     $('.current-bar').css({"transform": "translate3d(" + this.indiBarX + "%, 0, 0)"});
            // },

            checkLinkTarget : function(url) {
                var boo;
                if(url.indexOf('www')!= -1 || url.indexOf('http')!= -1) {
                    boo = false;
                }else {
                    boo = true;
                }
                return boo;
            }

        },

        components: {
            "slick": Slick
        },
        mixins : [ initScroll_Motion ],

        watch:{
            itemdata : function(){
                this.totalPage = this.itemdata.lists.length;
                this.totalIndex = this.totalPage-1;
                this.setImgList();
                this.changeImgList();
                this.isDataLoaded = true;
            }
        }
    }
</script>
