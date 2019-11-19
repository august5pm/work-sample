<template>
    <!--<div id="container" class="news">-->
    <div id="content-sb">
        <div id="con-sb">

            <!-- content : S-->
            <section class="section-contents contents-single" :style="[{height:(isDataLoaded)?'auto':'5000px'}]">
                <!-- back img area -->
                <div class="back-color-box deco-bg-1"></div>
                <div class="back-color-box type-img deco-bg-2"><figure class="mod-contain-bg"><!--백그라운드 이미지 소스 --></figure></div>

                <!-- main news -->
                <component-news-main-recommend></component-news-main-recommend>

                <component-news-main-list></component-news-main-list>
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
    <!--</div>-->
</template>

<script>
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';

    import news_main_recommend from  './news-main-recommend';
    import news_main_list from  './news-main-list';

    export default {
        name: "news-main",
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
                isDataLoaded : false
            }
        },

        beforeCreate: function () {

        },

        created : function(){
            this.setMeta();
        },

        mounted: function () {
            this.setPageTracking();
            EventBus.$on(EventBus.CLICK_FLOAT_BTN, this.onClick_floatBtn);
            this.isDataLoaded = true;
        },

        destroyed : function(){
            EventBus.$off(EventBus.CLICK_FLOAT_BTN, this.onClick_floatBtn);
        },

        methods: {
            setMeta : function(){
                EventBus.$emit(EventBus.CHANGE_METADATA, "news")
            },
            setPageTracking : function(){
                var pageName = 'page_news';
                window.Tracking.send_pageView(pageName);
            },
            onClick_floatBtn : function(eventAction){
                var eventCategory = 'news';
                window.Tracking.send_event(eventCategory, eventAction);
            },
        },

        components: {
            'component-news-main-recommend' : news_main_recommend
            ,'component-news-main-list' : news_main_list
        },

    }
</script>
