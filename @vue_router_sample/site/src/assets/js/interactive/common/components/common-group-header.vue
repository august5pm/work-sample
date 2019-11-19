<template>
    <header class="header-wrap" :class="{'type-black' : this.typeBlack}">
        <!-- header : S -->
        <div class="inner-header">
            <div class="main-navi-wrap clearfix"> <!--main-->
                <div class="logo-wrap float-l">
                    <router-link to="/"><span class="sd-logo"><!--로고--></span></router-link>
                </div>

                <div class="gnb-toggle-btn float-r"> <!-- only for mobile -->
                    <a href="#" @click.stop.prevent="onClick_menu" class="btn-toggle-gnb"><span class="ico-hamburg"><!--icon hamburger--></span></a>
                </div>
                <transition :name="transitionName" v-on:enter="enter(arguments,afterEnter)" v-on:after-enter="afterEnter" v-on:leave="leave(arguments,afterLeave)" v-on:after-leave="afterLeave">
                    <div class="gnb-wrap-tr" v-if="isOpenMenu && isStart || !isMobile && isStart" :class="{'onShow' : isMobile}">
                        <div class="gnb-wrap-tr2">
                            <div class="gnb-wrap-tr3">
                                <div class="gnb-wrap float-r">   <!-- 활성화 클래스(모바일 때만 / pc에서는 지워줄것) : active -->
                                    <!-- decorate --> <!-- only for mobile -->
                                    <div class="content-deco-box top-left mobile">
                                        <div class="box"></div>
                                    </div>
                                    <!--// decorate -->

                                    <!-- btn close --> <!-- only for mobile -->
                                    <div class="btn-wrap">
                                        <button type="button" @click.stop.prevent="onClick_close" class="btn-cta btn-type-close btn-close">
                                            <span class="ico-pop-close">
                                                <span class="line-holder">
                                                    <span class="line line-1"></span>
                                                    <span class="line line-2"></span>
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <!--// btn close -->

                                    <ul class="gnb-list depth-1">
                                        <li>
                                            <router-link to="/creator" target="_self"  @mouseover.stop.prevent.native= "onMouseOver_depth1" @mouseleave.stop.prevent.native= "onMouseLeave_depth1" class="depth-1 hover" title="크리에이터 페이지 바로가기">
                                                <span class="cta-box"></span>
                                                <span class="txt">크리에이터</span>
                                                <transition name = "tr-navi-sub">
                                                    <ul class="gnb-sub-list depth-2" v-if="indexSubClick == 1 || !isMobile || indexSubClick_temp==1">
                                                        <li class="menu-creators"><router-link to="/creator/creators" target="_self" title="크리에이터 보기 페이지 바로가기">크리에이터 보기</router-link></li> <!-- add class .on-->
                                                        <li class="menu-agent"><router-link to="/creator/agency" target="_self" title="강점 페이지 바로가기">강점</router-link></li>
                                                    </ul>
                                                </transition>
                                            </router-link>
                                            <button type="button" @click.stop.prevent="onClick_depth1" class="btn-depth1" v-if="isMobile && indexSubClick!=1 && indexSubClick_temp!=1"></button>
                                        </li>
                                        <li>
                                            <router-link to="/business" target="_self"  @mouseover.stop.prevent.native= "onMouseOver_depth1" @mouseleave.stop.prevent.native= "onMouseLeave_depth1" class="depth-1 hover" title="비즈니스 페이지 바로가기">
                                                <span class="cta-box"></span>
                                                <span class="txt">비즈니스</span>
                                                <transition name = "tr-navi-sub">
                                                    <ul class="gnb-sub-list depth-2" v-if="indexSubClick == 2 || !isMobile || indexSubClick_temp==2">
                                                        <li class="menu-bd-ad"><router-link to="/business/brand" target="_self" title="브랜드 광고 페이지 바로가기">브랜드 광고</router-link></li>
                                                        <li class="menu-ip-business"><router-link to="/business/ip" target="_self" title="IP 사업 페이지 바로가기">IP 사업</router-link></li>
                                                    </ul>
                                                </transition>
                                            </router-link>
                                            <button type="button" @click.stop.prevent="onClick_depth1" class="btn-depth1" v-if="isMobile && indexSubClick!=2 && indexSubClick_temp!=2"></button>
                                        </li>
                                        <li><router-link to="/esports" target="_self"  @mouseover.stop.prevent.native= "onMouseOver_depth1" @mouseleave.stop.prevent.native= "onMouseLeave_depth1" class="depth-1 hover" title="E스포츠 페이지 바로가기"><span class="cta-box"></span><span class="txt">E스포츠</span></router-link></li>
                                        <li><router-link to="/about" target="_self"  @mouseover.stop.prevent.native= "onMouseOver_depth1" @mouseleave.stop.prevent.native= "onMouseLeave_depth1" class="depth-1 hover" title="회사소개 페이지 바로가기"><span class="cta-box"></span><span class="txt">회사소개</span></router-link></li>
                                        <li><router-link to="/careers" target="_self"  @mouseover.stop.prevent.native= "onMouseOver_depth1" @mouseleave.stop.prevent.native= "onMouseLeave_depth1" class="depth-1 hover" title="인재채용 페이지 바로가기"><span class="cta-box"></span><span class="txt">인재채용</span></router-link></li>
                                    </ul>

                                    <!-- only for mobile -->
                                    <div class="gnb-sd-info" v-bind:class="{ isIOS:isIOS }">  <!-- only for mobile -->
                                        <ul class="btns-wrap">
                                            <li><router-link to="/news">최신 뉴스보기</router-link></li>
                                            <li><a href="https://post.naver.com/my.nhn?memberNo=44134674" target="_blank">포스트 보기</a></li>
                                            <li><router-link to="/ir-notice">IR 공고 </router-link></li>
                                            <li><router-link to="/privacy-policy">개인정보처리방침</router-link></li>
                                        </ul>
                                        <ul class="sns-list-wrap">
                                            <li>
                                                <a href="#" target="_blank" title="공식 유투브 페이지 바로가기">
                                                    <span class="hex-bg"></span>
                                                    <span class="ico-sns-youtube icon"><!--아이콘 유투브--></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank" title="공식 페이스북 바로가기">
                                                    <span class="hex-bg"></span>
                                                    <span class="ico-sns-facebook icon"><!--아이콘 페이스북--></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank" title="공식 인스타그램 바로가기">
                                                    <span class="hex-bg"></span>
                                                    <span class="ico-sns-insta icon"><!--아이콘 인스타--></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <transition name = "tr-subnavi">
                <div class="sub-navi-wrap" v-if="indexViewSubNavi > 0" :class="{'type-black' : this.typeBlack}"> <!-- active, type-black -->
                    <!-- 추가될 서브 메뉴 only for pc -->
                    <div class="inner-wrap">
                        <div class="sub-navi creator on clearfix" v-if="indexViewSubNavi == 1"> <!-- on -->
                            <p class="txt-tit float-l">크리에이터</p>
                            <ul class="gnb-sub-list active float-r">
                                <li class="menu-creators"><router-link to="/creator/creators" target="_self" title="크리에이터 보기 페이지 바로가기">크리에이터 보기</router-link></li> <!-- add class .on-->
                                <li class="menu-agent"><router-link to="/creator/agency" target="_self" title="강점 페이지 바로가기">강점</router-link></li>
                            </ul>
                        </div>
                        <div class="sub-navi business clearfix" v-if="indexViewSubNavi == 2">
                            <p class="txt-tit float-l">비즈니스</p>
                            <ul class="gnb-sub-list active float-r">
                                <li class="menu-bd-ad"><router-link to="/business/brand" target="_self" title="브랜드 광고 바로가기">브랜드 광고</router-link></li> <!-- add class .on-->
                                <li class="menu-ip-business"><router-link to="/business/ip" target="_self" title="IP 사업 바로가기">IP 사업</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </header>
</template>
<script>
    import { EventBus } from '../../../interactive/common/event-bus.js';
    import $ from 'jquery';
    export default {
        name: "common-group-header",
        props: {

        },

        data: function () {
            return {
                isMobile : false,
                isTablet : false,
                isOpenMenu : false,
                isSubActive : false,
                indexViewSubNavi : 0,
                typeBrowser : '',
                typeBlack : false,
                indexSubClick : 0,
                indexSubClick_temp : 0,
                indexScrollTop : 0,
                transitionName : '',
                isStart : false,
                isTrans : false,
                timerid : null,

                isIOS : window.GlobalVars.isIOS()
            }
        },
        beforeCreate: function () {

        },
        created: function () {
            EventBus.$on(EventBus.COMMON_CHANGE_RESIZE,this.changeSize);
            //EventBus.$on(EventBus.CHANGE_SCROLL,this.changeScroll);
            EventBus.$on(EventBus.COMMON_CHANGE_SCROLL,this.changeScroll);

            EventBus.$on(EventBus.PAGE_TRANSITION_START,this.pageTransitionStart);
            EventBus.$on(EventBus.PAGE_TRANSITION_END,this.pageTransitionEnd);

            EventBus.$on(EventBus.TRANS_ROUTE_MOUNTED,this.transRouteMounted);

            EventBus.$on(EventBus.TRANS_HEADER_TYPE,this.transHeaderType);
        },
        mounted: function () {
            this.checkRoute();
            console.log("header mouted :::::::::::::")
        },
        methods: {
            changeSize : function(w,h,typeBrowser) {
                this.isStart = true;
                this.typeBrowser = typeBrowser;
                if(typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE) {
                    this.isMobile = true;
                    this.transitionName = 'tr-page';
                    $('.depth-1>li>a').removeClass('hover');
                }else{
                    this.isMobile = false;
                    this.isOpenMenu = false;
                    window.GlobalVars.isOpenMenu = false;
                    this.transitionName = '';
                    $('.depth-1>li>a').addClass('hover');

                    // gnb back dim
                    this.afterLeave();
                    $('#container-sb').removeClass('m-navi-active');
                }

            },
            changeScroll : function(delta) {
                if(this.indexViewSubNavi > 0 && !this.isTrans) {
                    var st = this.typeBrowser == window.GlobalVars.BROWSER_TYPE_DESKTOP ? 72 : 72/1280 * $(window).width();
                    if(delta > st) {
                        $('.sub-navi-wrap').addClass('show');
                    }else{
                        $('.sub-navi-wrap').removeClass('show');
                    }
                }

            },
            onClick_close : function() {
                this.isOpenMenu = false;
                window.GlobalVars.isOpenMenu = false;
                this.indexSubClick_temp = -1;
            },
            onClick_menu : function() {
                if(!this.isOpenMenu) {
                    this.isOpenMenu = true;
                    window.GlobalVars.isOpenMenu = true;
                }
            },
            onClick_depth1 : function(e) {
                var li = $(e.target).parent();
                this.indexSubClick_temp = li.index()+1;

            }
            ,
            onMouseOver_depth1 : function(e){
                if(!this.isMobile) {
                    if(!$(e.target).hasClass('router-link-active')&&!$(e.target).parent().hasClass('router-link-active')&&!$(e.target).parent().parent().hasClass('router-link-active')&&!$(e.target).parent().parent().parent().hasClass('router-link-active')){
                        $('.depth-1>li>.router-link-active').addClass('off');
                    }

                }
            },
            onMouseLeave_depth1 : function(e){
                if(!this.isMobile) {
                    $('.depth-1>li>.router-link-active').removeClass('off');
                }
            },
            pageTransitionStart : function() {
                this.isTrans = true;
                $('.header-wrap').addClass('tr-page-leave-active');
                $('.header-wrap').addClass('tr-page-leave-to');
            },
            pageTransitionEnd : function() {

                this.indexSubClick_temp = -1;



            },
            enter: function (el, done) {
                if(this.isOpenMenu) {
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 10);

                    var path = this.$route.path;
                    var name = '/'+ path.split('/')[1];

                    /* var list = path.split('/');
                     list.shift();
                     window.GlobalVars.container_name = list.join('-');*/
                    //console.log('::::::::>>>>>>>>>>>>>>>>>>>>>>>>',name);
                    switch (name) {
                        case window.GlobalVars.CATE_000_MAIN :
                            this.indexSubClick = 0;
                            break;
                        case window.GlobalVars.CATE_100_CREATOR :
                            this.indexSubClick = 1;
                            this.indexSub = 1;
                            break;
                        case window.GlobalVars.CATE_200_BUSINESS :
                            this.indexSubClick = 2;
                            this.indexSub = 2;
                            break;
                        case window.GlobalVars.CATE_300_ABOUT :
                            this.indexSubClick = 3;
                            break;
                        case window.GlobalVars.CATE_400_CAREERS :
                            this.indexSubClick = 4;
                            break;
                        case window.GlobalVars.CATE_500_NEWS :
                            this.indexSubClick = 5;
                            break;
                        case window.GlobalVars.CATE_600_APPLY_CREATOR :
                            this.indexSubClick = 6;
                            break;

                        default :
                            this.indexRoute = 100;
                            this.indexSubClick = 100;
                            break;
                    }
                }
            },
            afterEnter: function (el) {
                if(this.isOpenMenu) {
                    $('#main-sb').css('position','fixed');
                    $('#main-sb').css('width','100vw');

                    $('footer').css('display','none');

                    // gnb back dim
                    $('#container-sb').addClass('m-navi-active');
                }
            },
            leave: function (el, done) {
                if(!this.isOpenMenu) {

                    this.indexViewSubNavi = false;
                   /* if(window.GlobalVars.DEVICE_PC){
                        $('.header-wrap .gnb-wrap-tr3').css('overflow-y','hidden');
                        $('.header-wrap .gnb-wrap-tr3').css('margin-top',$(window).height()*0.5 - DF.utils.getScrollPosY());
                    }*/

                    // gnb back dim
                    $('#container-sb').removeClass('m-navi-active');
                }
            },
            afterLeave: function (el) {
                if(!this.isOpenMenu) {
                    $('#main-sb').css('position', 'static');
                    $('#main-sb').css('width', 'auto');
                    $('#main-sb').css('margin-top', 0);

                    $('footer').css('display','block');
                }
                $('.header-wrap').removeClass('tr-page-leave-active');
                $('.header-wrap').removeClass('tr-page-leave-to');
                this.isTrans = false;

                window.GlobalVars.isOpenMenu = false;
            },
            transRouteMounted : function(typeBlack,indexViewSubNavi) {
                clearTimeout(this.timerid);
                this.timerid = setTimeout(() => {
                    this.typeBlack = typeBlack;
                    this.indexViewSubNavi = indexViewSubNavi;
                }, 500);

                //console.log('__________________________________________',this.typeBlack ,  this.indexViewSubNavi )
            }
            ,
            transHeaderType : function(typeBlack) {
                clearTimeout(this.timerid);
                this.typeBlack = typeBlack;
            },
            checkRoute : function() {
                this.isOpenMenu = false;
            }
        },

        watch: {
            '$route' (to, from) {
                console.log('header route :::::: ', this.$route.path,to);
                this.checkRoute();
            }
        }
    }
</script>
