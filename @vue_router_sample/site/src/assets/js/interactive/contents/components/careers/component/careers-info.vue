<template>
    <div id="content-sb">
        <div id="con-sb" class="con">

            <!-- content : S-->
            <!-- 키비주얼 -->
            <component-careers-info-keyvisual></component-careers-info-keyvisual>

            <!-- contents -->
            <section class="section-contents">
                <!-- back img area -->
                <div class="back-color-box deco-bg-1"></div>
                <div class="back-color-box deco-bg-2">
                </div>

                <div class="content-wrap slide-holder m-content-full">
                    <div class="inner-content-wrap">
                        <ul class="slide-con">
                            <!--  문화 -->
                            <component-careers-info-culture></component-careers-info-culture>

                            <!--  인재상 -->
                            <component-careers-info-talent></component-careers-info-talent>

                        </ul>
                    </div>
                </div>


                <!--  복지제도 -->
                <component-careers-info-welfare></component-careers-info-welfare>

                <!-- 채용공고 게시판 -->
                <component-careers-info-board :class="'js-careers-info-board'"></component-careers-info-board>

            </section>
            <!-- // content : E-->

            <!-- decorate -->
            <div class="content-deco-box top-left">
                <div class="box"></div>
            </div>
            <div class="content-deco-box bottom-right">
                <div class="box"></div>
            </div>
            <!--// decorate -->

        </div>
    </div>

</template>

<script>

    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import $ from 'jquery'

    import careers_info_keyvisual from './careers-info-keyvisual';
    import careers_info_culture from './careers-info-culture';
    import careers_info_talent from './careers-info-talent';
    import careers_info_welfare from './careers-info-welfare';
    import careers_info_board from './careers-info-board';


    export default {
        name: "careers-info",
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
                isDataLoaded : false,

                device : 0,
                scrollTop:'',
                scrollBottom:'',
                winW : 0,
                winH : 0,

                fixedOpacity : 0,
                bgScrollY : 0,

            }
        },


        beforeCreate: function () {

        },

        created : function(){
            this.setMeta();

        },

        mounted: function () {
            this.setPageTracking();

            EventBus.$on(EventBus.GO_CAREERS_BOARD, this.goBoard)
            EventBus.$on(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$emit(EventBus.CONTENTS_UPDATED);
        },

        destroyed : function(){
            EventBus.$off(EventBus.GO_CAREERS_BOARD, this.goBoard)
            EventBus.$off(EventBus.CHANGE_SCROLL, this.onChange_scroll)
        },

        methods: {
            // 메타 데이터 넣기
            setMeta : function(){
                EventBus.$emit(EventBus.CHANGE_METADATA, "careers")
            },

            // 페이지 트래킹
            setPageTracking : function(){
                var pageName = 'page_recruit';
                window.Tracking.send_pageView(pageName);
            },

            // 게시물로 이동하기
            goBoard : function(){
                var rect = document.querySelector('.js-careers-info-board').getBoundingClientRect();
                var ty = DF.utils.getScrollPosY() + rect.top;

                $('html, body').stop().animate({
                    scrollTop: ty
                }, 400);
            },

            // 스크롤 변경시
            onChange_scroll : function(scrollTop){
                this.scrollTop = scrollTop;

                if(  window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_DESKTOP ){
                    this.scrollBottom = this.scrollTop + this.winH;
                    if( window.GlobalVars.isIE() ){
                        this.bgScrollY = 0;
                    }else{
                        this.bgScrollY = -((this.scrollTop) * 0.1 ) + 'px';
                    }
                }else{
                    this.scrollTop = 0;
                    this.scrollBottom = 0;
                    this.bgScrollY = 0;
                }
            },
        },

        components: {
            'component-careers-info-keyvisual':careers_info_keyvisual,
            'component-careers-info-culture':careers_info_culture,
            'component-careers-info-talent':careers_info_talent,
            'component-careers-info-welfare':careers_info_welfare,
            'component-careers-info-board':careers_info_board
        }
    }
</script>
