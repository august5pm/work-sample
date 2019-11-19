<template>
    <transition name="tr-page"  v-on:leave="leave(arguments,afterLeave)" v-on:after-leave="afterLeave">
        <div id="container-sb" class="main">
            <div id="content-sb">
                <div id="con-sb">

                    <!-- content : S-->
                    <!-- main kv -->
                    <component-main-keyvisual :itemdata="contents_data.keyvisual"></component-main-keyvisual>

                    <!-- contents -->
                    <section class="section-contents">
                        <!-- back img area -->
                        <div class="back-color-box deco-bg-1"></div>
                        <div class="back-color-box type-img deco-bg-2"><figure class="mod-contain-bg" v-bind:style="{ transform : 'translateY(' + fixedTransY+'%' + ') scale('+fixedScale+') skewY(30deg)', opacity : fixedOpacity}"><!--백그라운드 이미지 소스 --></figure></div>
                        <!--<div class="back-color-box type-img deco-bg-2"><figure class="mod-contain-bg" v-bind:style="{ transform: 'translateY(' + fixedTransY+'px' + ') skewY(30deg)'}">&lt;!&ndash;백그라운드 이미지 소스 &ndash;&gt;</figure></div>-->


                        <!-- main new creators -->
                        <component-main-new-creators :itemdata="contents_data.new_creators" ></component-main-new-creators>

                        <!-- main news -->
                        <component-main-news :itemdata="contents_data.news"></component-main-news>

                        <!-- main business -->
                        <component-main-business></component-main-business>

                        <!-- main ending -->
                        <component-main-bottom-copy></component-main-bottom-copy>
                    </section>

                    <!-- decorate -->
                    <div class="content-deco-box top-left">
                        <div class="box"></div>
                    </div>
                    <div class="content-deco-box bottom-right">
                        <div class="box"></div>
                    </div>
                    <!--// decorate -->

                </div>
                <!-- // content : E-->
            </div>
        </div>
    </transition>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../interactive/common/loader-json.js';
    import initScroll_Motion from '../../../../interactive/common/mixin/scrollMotion_mixin';
    import $ from 'jquery';

    import main_keyvisual from './component/main-keyvisual';
    import main_new_creators from './component/main-new-creators';
    import main_news from './component/main-news';
    import main_business from './component/main-business';
    import main_bottom_copy from './component/main-bottom-copy';

    import float_btns from  '../common/float-btns';

    import scroll_mixin from "../../../common/mixin/scroll_mixin.vue";

    export default {
        name: "main-contents",
        props: {

        },

        data: function () {
            return {
                contents_data :{}
                ,headerTypeBlack : false
                ,indexViewSubNavi : 0,

                device : 0,
                scrollTop:'',
                scrollBottom:'',
                winW : 0,
                winH : 0,

                interScroll : 0,
                fixedScale : 0,
                fixedOpacity : 0,
                fixedTransY : 0,
                isShowStep : false,
                timerNum : 0

            }
        },

        beforeRouteEnter (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_ENTER,to,from,next);

            EventBus.$once(EventBus.JSON_LOAD_COMPLETE, function(json){
                next(vm => {
                    // `vm`을 통한 컴포넌트 인스턴스 접근
                    vm.getDataComplete(json);
                })
            });

            var url = window.GlobalPreset.JSON_URL.CATE_00_GET_MAIN;
            to.matched[0].components.default.methods.getData(url);
        },
        beforeRouteLeave (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_LEAVE,to,from,next);

        },
        beforeCreate: function () {

        },

        created : function(){
            this.setMeta();


        },

        mounted: function () {
            // 트래킹

            this.setPageTracking();
            EventBus.$on(EventBus.CLICK_FLOAT_BTN, this.onClick_floatBtn);

            EventBus.$emit(EventBus.TRANS_ROUTE_MOUNTED , this.headerTypeBlack , this.indexViewSubNavi);
            EventBus.$on(EventBus.CHANGE_DEVICE_SETTING,this.change_device_setting);

            EventBus.$on(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$emit(EventBus.CONTENTS_UPDATED);

            clearTimeout(this.timerNum);
            this.timerNum = setTimeout(()=>{this.isShowStep = true;},1300);
        },

        destroyed : function(){
            EventBus.$off(EventBus.CLICK_FLOAT_BTN, this.onClick_floatBtn);
            EventBus.$off(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$off(EventBus.CHANGE_DEVICE_SETTING,this.change_device_setting);

            clearTimeout(this.timerNum);
        },

        methods: {
            setMeta : function(){
                EventBus.$emit(EventBus.CHANGE_METADATA, "main")
            },

            setPageTracking : function(){
                var pageName = 'page_main';
                window.Tracking.send_pageView(pageName);
            },

            getData: function (url) {
                var loader = new loaderJson();
                loader.loadJsonData(url);
            }
            ,
            getDataComplete: function (json) {
                //console.log(json)
                this.contents_data = json.main;
            }
            ,
            onClick_floatBtn : function(eventAction){
                var eventCategory = 'main';
                window.Tracking.send_event(eventCategory, eventAction);
            },
            leave: function (el, done) {
                EventBus.$emit(EventBus.PAGE_TRANSITION_START);
            },
            afterLeave: function (el) {
                EventBus.$emit(EventBus.PAGE_TRANSITION_END);
            },



            onChange_scroll : function(scrollTop){
                let target = document.querySelector('.type-img.deco-bg-2');
                let targetOffset = target.offsetTop;
                let footerHeight = 220;
                let sectionContentsOffset = document.querySelector('.section-contents').offsetTop + (document.querySelector('.section-contents').offsetHeight + footerHeight);
                let targetHeight = sectionContentsOffset - targetOffset;
                let disPer = ((this.scrollBottom - targetOffset ) / targetHeight - 0.4)*1/0.6;
                disPer = disPer > 1 ? 1 : disPer;
                disPer = disPer < 0 ? 0 : disPer;

                if( window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_DESKTOP ){
                    this.scrollTop = scrollTop;
                    this.scrollBottom = this.scrollTop + this.winH;
                    this.interScroll = -((this.scrollTop) * 0.2 ) + 'px';

                    let easingPer = window.GlobalVars.easing.easeInOutSine( disPer ,0,1,1 )

                    this.fixedScale = 1.2 - ((easingPer * 0.2 ));
                    this.fixedOpacity = disPer;
                    /*if( this.fixedScale >= 1 ) this.fixedScale = 1;*/

                    this.fixedTransY = (1 - easingPer)*25;
                }else{
                    this.scrollTop = 0;
                    this.scrollBottom = 0;
                    this.interScroll = 0;
                    this.fixedScale = 1;
                    this.fixedTransY = 0;
                    this.fixedOpacity = 1;
                }
            },
            change_device_setting : function(){
                this.reset_scroll();
            }
        }
        ,
        mixins: [scroll_mixin,initScroll_Motion],
        components: {
            'component-main-keyvisual':main_keyvisual
            ,'component-main-new-creators':main_new_creators
            ,'component-main-news':main_news
            ,'component-main-business':main_business
            ,'component-main-bottom-copy':main_bottom_copy
        }
    }
</script>
