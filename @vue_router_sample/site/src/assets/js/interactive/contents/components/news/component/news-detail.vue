<template>
    <!--<div id="container" class="news-detail" v-if="isDataLoaded">-->
        <div id="content-sb">
            <div id="con-sb" class="con">

                <!-- decorate : top-left -->
                <div class="content-deco-box top-left">
                    <div class="box"></div>
                </div>
                <!--// decorate : top-left -->

                <!-- content : S-->
                <section class="section-contents contents-single" :style="[{height:(isDataLoaded)?'auto':'5000px'}]">
                    <!-- back img area -->
                    <div class="back-color-box deco-bg-1"></div>
                    <div class="back-color-box deco-bg-2"></div>

                    <!-- news detail -->
                    <component-news-detail-img :img_url="jsonData.img_url" v-show="this.jsonData.img_url != null"></component-news-detail-img>
                    <component-news-detail-article :itemdata="jsonData"></component-news-detail-article>
                    <!-- 추천뉴스 -->
                    <component-news-detail-recommend :recommend_data="recommendData"></component-news-detail-recommend>
                </section>
                <!-- // content : E-->

                <!-- decorate : bottom-right -->
                <div class="content-deco-box bottom-right">
                    <div class="box"></div>
                </div>
                <!--// decorate : bottom-right -->

            </div>
        </div>
    <!--</div>-->
</template>

<script>
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';
    import $ from 'jquery';

    import news_detail_img from './news-detail-img';
    import news_detail_article from './news-detail-article';
    import news_detail_recommend from './news-detail-recommend';


    export default {
        name: "news-detail",
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
                loader : '',
                jsonData : {},
                recommendData : {},

                NEWS_LIST_PATH : '',
                isDataLoaded : false,
                isTrans : false
            }
        },

        beforeCreate: function () {

        },

        created : function(){
            this.setMeta();

            this.NEWS_LIST_PATH = window.GlobalVars.CATE_500_NEWS;


            EventBus.$on(EventBus.PAGE_TRANSITION_START, this.pageTransitionStart);
            EventBus.$on(EventBus.PAGE_TRANSITION_END, this.pageTransitionEnd);
            EventBus.$on(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
            this.loader = new loaderJson();
            this.getData();
        },

        mounted: function () {
            this.setPageTracking();
        },
        destroyed : function(){
            EventBus.$off(EventBus.PAGE_TRANSITION_START, this.pageTransitionStart);
            EventBus.$off(EventBus.PAGE_TRANSITION_END, this.pageTransitionEnd);
            EventBus.$off(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
        },
        methods: {
            setMeta : function(){
                EventBus.$emit(EventBus.CHANGE_METADATA, "news_detail")
            },
            setPageTracking : function(){
                var pageName = 'page_news_'+this.$route.params.id;
                window.Tracking.send_pageView(pageName);
            },
            pageTransitionStart : function(){
                this.isTrans = true;
            },
            pageTransitionEnd : function(){
                this.isTrans = false;
            },

            getData : function(){
                var url = window.GlobalPreset.JSON_URL.CATE_50_GET_NEWS_DETAIL+"?idx="+this.$route.params.id;
                this.loader.loadJsonData(url, this._uid);
            }
            ,
            getDataComplete : function (json, uid) {

                if(this._uid == uid){
                    this.jsonData = json.news.detail;
                    if(this.jsonData == null){
                        var errorPath = window.GlobalVars.CATE_900_ERROR;
                        this.$router.push(errorPath)
                    }else{
                        this.recommendData = this.jsonData.recommend;

                        if(!this.isTrans){
                            //this.moveTop();
                        }
                        this.isDataLoaded = true;
                    }

                }
            },

            moveTop : function(){

                $('html, body').stop().animate({
                    scrollTop: 0
                }, 10);

            }
        },

        components: {
            'component-news-detail-img' : news_detail_img,
            'component-news-detail-article' : news_detail_article,
            'component-news-detail-recommend' : news_detail_recommend,
        },
        watch :{
            '$route' (to, from) {
                //console.log('contentsetting :::::: ', to,from);
                this.getData();
                /*$('html, body').stop().animate({
                    scrollTop: 0
                }, 100);*/
            }
        }
    }
</script>
