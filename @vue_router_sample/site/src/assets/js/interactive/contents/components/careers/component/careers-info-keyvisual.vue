<template>
    <section class="section-keyvisual">
        <div class="content-wrap kv content-size-full content-pos-fixed"> <!-- full type .content-size-full / fixed type .content-pos-fixed -->
            <div class="inner-content-wrap">
                <div class="kv-item-bg">
                    <figure class="mod-covered-bg"><!--background image--></figure>
                </div>
                <div class="v-slick"> <!-- add class .v-slick -->
                    <div class="kv-slide-wrap">

                        <!-- keyvisual image -->
                        <ul class="kv-img-wrap slide-img-wrap" v-bind:style="{ opacity : parallaxVars.slideImg_Opacity, top : parallaxVars.slideImg_Top, left: parallaxVars.slideImg_Left }">
                            <li v-for="(list, index) in totalPage" class="kv-item nsy"
                                :class="['img-item-'+(index+1), arrImgClass[index]]" > <!--{'onShow' : showIndex==index , 'onHide' : hideIndex==index , 'onInit' : isStart && showIndex == index}-->
                                <div class="kv-item-img">
                                    <figure class="mod-covered-bg"><!--이미지--></figure>
                                </div>
                            </li>
                        </ul>

                        <!-- keyvisual text -->
                        <slick ref="slick" :options="slickOptions" @afterChange="handleAfterChange"
                               @beforeChange="handleBeforeChange" @init="initSlick" class="kv-item-wrap" v-bind:style="{ opacity : parallaxVars.slideTxt_Opacity, transform: 'translate(' + 0 +','+ parallaxVars.slideTxt_Top + ')', }">
                            <div class="kv-item kv-0 nsy ">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        <span class="txt-box">
                                            무조건 맞는 아이디어도,<br>
                                            무조건 틀린 아이디어도 <br class="_m">없다고<br class="_pc">
                                            믿는 것이 <br class="_m">의 <br class="_pc">문화입니다.
                                        </span>
                                    </h1>
                                    <p class="txt-tit_explain">
                                        <span class="txt-box">
                                            내가 생각해낸 아이디어를 전적으로 밀어주고 <br class="_m">실패하더라도 <br>
                                            시간낭비가 아니라고 믿어주는 <br class="_m">동료들을 보면서 일하는 보람을 느낍니다.
                                        </span>
                                    </p>
                                    <div class="txt-des">
                                        <span class="txt-box">
                                            크리에이터 파트너십 매니저 / 남석윤
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="kv-item kv-1 hhj">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        는 <br class="_pc">
                                        최고의 <br class="_m">크리에이터들과 함께 <br class="_pc">
                                        방구석 <br class="_m">즐거움의 가치를 <br class="_pc">
                                        무한대로 <br class="_m">키워나가는 <br class="_pc">일을 합니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        특별하진 않지만 평범하지도 않은 사람들이 모여 <br class="_m">최고의 <br class="_pc">
                                        크리에이터들과 함께 방구석의 만인들이 <br class="_m">사랑하고 즐기는 <br class="_pc">
                                        콘텐츠를 만들 때 <br class="_m">에서 일하는 희열이 찾아옵니다.
                                    </span>
                                    <div class="txt-des">
                                        <span class="txt-box">
                                            크리에이터 파트너십 매니저 / 하헌재
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="kv-item kv-2 hhc">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        에서는 콘텐츠에 대한 <br>
                                        자신의 상상이 정답이 될 수 있고, <br>
                                        문화적으로 유사한 구성원들과 <br>
                                        상상력을 공유할 수 있습니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        놀이터 모래밭 위에서 누구나 공평하고 <br class="_m">자유롭게 놀 수 있듯, <br class="_pc">
                                        에서는 <br class="_m">콘텐츠에 대한 자신의 발칙한 상상이 <br class="_m">정답이 될 수 있고, <br class="_pc">
                                        문화적으로 유사한 구성원들과 <br class="_m">상상력을 공유하며 소통할 수 있습니다.
                                    </span>
                                    <div class="txt-des">
                                        <span class="txt-box">
                                           프로듀서 / 황호찬
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="kv-item kv-3 ksj">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        는 처음이라는 도전을 <br>
                                        두려워하지 않으며, <br class="_pc">
                                        구성원들과 함께 <br class="_m">소통하며 <br class="_pc">
                                        서로가 제안한 아이디어를 <br>
                                        현실로 만들어나갑니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        저희가 하는 사업이나 서비스가 <br class="_m">업계에 처음인 경우도 많습니다. <br>
                                        도전을 두려워하지 않고 금요일 저녁에도 <br class="_m">집에 가지 않는 사람들이 모여 <br class="_pc">
                                        끈끈하게 소통하며 <br class="_m">서로가 낸 아이디어를 현실로 만들어나갑니다.
                                    </span>
                                    <span class="txt-des">
                                        <span class="txt-box">
                                            사업 개발 매니저 / 김소정
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="kv-item kv-4 bsw">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        는 창의적인 <br class="_m">생각과 <br class="_pc">
                                        의견을 자유롭게 발언하며 <br>
                                        서로의 의견을 존중하는 <br>
                                        Energetic한 회사입니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        창의적인 생각과 의견을 <br class="_m">자유롭게 발언할 수 있고 서로의 의견을 <br class="_pc">
                                        존중하며 <br class="_m">활력있는 문화를 만들어나갑니다. <br class="_m">또한 구성원 개개인에게 <br class="_pc">
                                        높은 책임감을 심어주어 <br class="_m">주인의식을 가지고 일할 수 있게 합니다.
                                    </span>
                                    <span class="txt-des">
                                        <span class="txt-box">
                                            크리에이터 교육 매니저 / 백승원
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="kv-item kv-5 arc">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        재미있고 새로운 콘텐츠를 <br>
                                        시청자들에게 선보인다는 설렘과, <br>
                                        웃음기 가득한 아이처럼 일하는 <br>
                                        팀원들과 협업할 수 있는 것은 <br>
                                        만의 큰 강점입니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        재미있는 콘텐츠를 기획하고 제작하는 일이 <br class="_m">압박이라기보다는 <br class="_pc">
                                        호기심과 도전으로 가득 차 <br class="_m">있습니다. 새로운 콘텐츠를 시청자들에게 <br class="_pc">
                                        선보인다는 <br class="_m">설렘이 에서 일하는 즐거움입니다.
                                    </span>
                                    <span class="txt-des">
                                        <span class="txt-box">
                                            애니메이터 / 안류천
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="kv-item kv-6 pjh">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        크리에이터만큼이나 끼가 많고 <br>
                                        재미있는 팀원들과  일하며 <br>
                                        멋진 콘텐츠를 만들 때 느끼는 보람이 <br>
                                        즐겁게 일할 수 있는 원동력입니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        는 직원 중에서 크리에이터만큼이나 <br class="_m">끼가 많고 재미있는 <br class="_pc">
                                        분들이 많습니다. <br class="_m">그런 팀원들과 즐겁게 일하며 <br class="_m">멋진 콘텐츠를 만들어 <br class="_pc">
                                        낼 때 느끼는 보람이 <br class="_m">에서 즐겁게 일할 수 있는 원동력입니다. <br>
                                    </span>
                                    <div class="txt-des">
                                        <span class="txt-box">
                                            프로듀서 / 박정훈
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="kv-item kv-7 ldw">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        는 건강한 <br class="_pc">
                                        크리에이터 <br class="_m">생태계와 구성원의 <br class="_pc">
                                        성장을 위한 <br class="_m">디딤돌이자 <br class="_pc">
                                        끊임없이 학습하는 <br class="_m">실험실입니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        서로 다른 배경과 역량을 가진 다양한 구성원들, <br class="_m">그들이 크리에이터와 <br class="_pc">
                                        만들어내는 콘텐츠를 <br class="_m">각자의 시선과 방식으로 이해하고 협력함으로써 <br>
                                        창의적인 결과물을 만들어 냅니다.
                                    </span>
                                    <div class="txt-des">
                                        <span class="txt-box">
                                            크리에이터 파트너십 매니저 / 이동욱
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="kv-item kv-8 psk">
                                <div class="kv-item-tit tit-type-cover sub">
                                    <h1 class="txt-tit">
                                        크리에이터를 나처럼 아끼고 <br>
                                        콘텐츠를 내가 만든 것처럼 사랑하는 <br>
                                        마음과, 문제를 제기할 수 있는 <br>
                                        셀프 리더십이 중요합니다.
                                    </h1>
                                    <span class="txt-tit_explain">
                                        우리는 아무도 가보지 않은 길을 개척해 나가는 <br class="_m">산업이기에 스스로 동기부여를 <br class="_pc">
                                        하고 <br class="_m">문제를 제기할 수 있는 셀프 리더십이 중요합니다. <br class="_m">가장 중요한 건, 콘텐츠에 <br class="_pc">
                                        대한 애정과 이해도가 <br class="_m">뒷받침 되어야 하며 크리에이터를 사랑하고 이해하며 <br>
                                        공감하실 수 있는 분이어야 한다는 점입니다.
                                    </span>
                                    <div class="txt-des">
                                        <span class="txt-box">
                                            인사 팀장 / 박수교
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </slick>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { EventBus } from '../../../../../interactive/common/event-bus';
    import Slick from 'vue-slick';
    import initScroll_Motion from '../../../../../interactive/common/mixin/scrollMotion_mixin';
    import $ from 'jquery';

    export default {
        name: "careers-info-keyvisual",
        props: {
            infodata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {
                isMobile :false,

                slickOptions: {
                    //options can be used from the plugin documentation
                    infinite: true,
                    speed: 1000,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    fade:true,
                    cssEase: 'cubic-bezier(0.65, 0.01, 0.29, 1)',
                    draggable : false,
                    responsive: [
                        {
                            breakpoint: window.GlobalVars.SIZE_MOBILE,
                            settings: {
                                settings: "slick",
                                fade: false,
                                speed: 560,
                                cssEase: '',
                                draggable: true,
                                //autoplay: true,
                                autoplaySpeed: 3000,
                                slideToShow: 1,
                            }
                        }
                    ]
                },

                arrImgClass : ['nsy','hhj','hhc','ksj','bsw','arc','pjh','ldw','psk'],
                totalPage : 9,
                currentPage : 1,
                showIndex : -1,
                hideIndex : -1,
                totalIndex : 1,
                timerId : 0,
                isStart:true,
                isInitSlick : false,

                isTouch : false,
                touchStart : false,
                touchStartX : 0,
                touchStartY : 0,
                touchX : 0,
                touchY : 0,
                kvMoveDistX : 0,
                kvMoveDistY : 0,
                slickStartTime : 0
            }
        },


        beforeCreate: function () {

        },

        created : function(){
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
            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resizeMobile);
            $('.kv-item-wrap.slick-slider').off('touchstart touchmove touchend click', this.kvTouchEvent);

            clearTimeout(this.timerId);
        },

        methods: {
            // 리사이즈
            onChange_resizeMobile : function(w,h,device){
                this.isMobile = device == window.GlobalVars.BROWSER_TYPE_MOBILE? true : false;
                this.kvTitleMobileSetting();
            },

            // 슬라이드가 초기화 완료 되었을 때
            initSlick : function(){
                this.timerId = setTimeout(() => {
                    this.showIndex = 0;
                    this.totalIndex = this.totalPage - 1;

                    EventBus.$emit(EventBus.SHOW_FLOAT_BTN);

                    // ==================== keyvisual setting =====================
                    // kv slide setting - image position change
                    this.kvImgSlideChange();

                    // kv slide setting - entry motion
                    $('.kv-item-wrap .slick-current .kv-'+this.showIndex).addClass('onInit');

                    // kv slide setting - next prev btns
                    $('.btn-prev-next-wrap').addClass('onShow');

                    // kv slide setting - touch event
                    $('.kv-item-wrap.slick-slider').on('touchstart touchmove touchend click', this.kvTouchEvent);

                    // kv slide setting - mobile setting
                    this.isMobile = window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE? true : false;
                    this.isInitSlick = true;
                    this.kvTitleMobileSetting();
                    // ==================== // keyvisual setting =====================

                }, this.slickStartTime);
            },

            // 이전 버튼 눌렀을 때
            prev: function () {
                if(this.$refs.slick != null){
                    this.$refs.slick.prev();
                }
            },

            // 다음 버튼 눌렀을 때
            next: function () {
                if(this.$refs.slick != null) {
                    this.$refs.slick.next();
                }
            },

            // 슬라이드 변경 후
            handleAfterChange : function(event, slick, currentSlide){
                // hideIndex Element Reset
                $('.slick-slide.slick-cloned').find('.kv-'+this.hideIndex).removeClass('onHide').removeClass('onShow');
                $('.slick-slide').find('.kv-'+this.hideIndex).removeClass('onHide').removeClass('onShow');
            },

            // 슬라이드 변경 전
            handleBeforeChange : function(event, slick, currentSlide, nextSlide){
                this.isStart = false;
                this.currentPage = (nextSlide+1);
                this.showIndex = nextSlide;
                this.hideIndex = currentSlide;

                this.kvImgSlideChange();

                // hideIndex Element onHide
                $('.slick-current .kv-'+this.hideIndex).removeClass('onInit').addClass('onHide');

                // showIndex Element onShow
                $('.slick-slide.slick-cloned').find('.kv-'+this.showIndex).addClass('onShow');
                $('.slick-slide').find('.kv-'+this.showIndex).addClass('onShow');

            },

            // 키비주얼 모바일 타이틀 셋팅
            kvTitleMobileSetting : function(){
                if(this.isInitSlick) {
                    if(this.isMobile) { // && !this.isStart
                        $('.slick-slide .kv-item').addClass('onSetMobile');
                    } else {
                        $('.slick-slide .kv-item').removeClass('onSetMobile');
                    }
                }
            },

            // 키비주얼 이미지 슬라이드
            kvImgSlideChange : function() {
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

            kvTouchEvent : function(e) {
                // isMobile
                if (this.isMobile) {

                    if(e.type === 'touchstart') {
                        this.touchStart = true;
                        this.touchStartX = e.originalEvent.touches[0].pageX;
                        this.touchStartY = e.originalEvent.touches[0].pageY;

                        if(this.kvMoveDistX >= this.kvMoveDistY && this.touchStart) {
                            //console.log('kvImageZoom ============================================== ', this.kvMoveDistX, this.kvMoveDistY);
                            this.kvImgSlideZoom();
                        }
                    }
                    if(e.type === 'touchmove' && this.touchStart) {
                        this.touchX = e.originalEvent.touches[0].pageX;
                        this.touchY = e.originalEvent.touches[0].pageY;

                        this.kvMoveDistX = Math.abs(this.touchStartX - this.touchX);
                        this.kvMoveDistY = Math.abs(this.touchStartY - this.touchY);

                        if(this.kvMoveDistX >= this.kvMoveDistY) {
                            this.touchStart = true;
                        } else {
                            this.touchStart = false;
                            //console.log('touchMove, touchStart: ', this.touchStart);
                        }
                    }
                    if(e.type === 'touchend') {
                        this.touchStart = false;
                        this.kvImgSlideZoom();
                    }

                    if(e.type === 'click') {
                        this.touchStart = false;
                    }

                }
            },

        },

        components: {
            "slick": Slick
        },
        mixins : [ initScroll_Motion ],
    }
</script>
