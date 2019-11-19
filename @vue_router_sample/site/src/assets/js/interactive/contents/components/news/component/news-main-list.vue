<template>
    <div class="content-wrap news-up-to  js-news-list" :style="[{height:(isDataLoaded)?'auto':'5000px'}]">
        <div class="inner-content-wrap">
            <div class="content-tit-wrap tit-type-half-line type-kr type-black">
                <h2 class="txt-tit motion">
                    <span class="txt">
                        최신 뉴스
                        <span class="half-line"></span>
                    </span>
                </h2>
                <p class="txt-tit_explain">크리에이터들의 새로운 소식을 전합니다.</p>
            </div>
            <ul class="sort-menu-wrap">
                <li><button type="button" class="btn-cta" :class="(cateIndex == CATE_INDEX_0_ALL)?'on':''" @click.stop.prevent="onClick_cate(CATE_INDEX_0_ALL, NEWS_CATE_0_ALL, 'click_ctg_all_news')"><span class="btn-txt">전체</span></button></li>
                <li><button type="button" class="btn-cta" :class="(cateIndex == CATE_INDEX_1_AUGUST)?'on':''" @click.stop.prevent="onClick_cate(CATE_INDEX_1_AUGUST, NEWS_CATE_1_AUGUST, 'click_ctg_august_news')"><span class="btn-txt"></span></button></li>
                <li><button type="button" class="btn-cta" :class="(cateIndex == CATE_INDEX_2_CREATOR)?'on':''" @click.stop.prevent="onClick_cate(CATE_INDEX_2_CREATOR, NEWS_CATE_2_CREATOR, 'click_ctg_creator_news')"><span class="btn-txt">크리에이터</span></button></li>
            </ul>
            <div class="recent-news-wrap">
                <ul class="news-list-wrap wrap-type-col-3 m-wrap-type-vertical" :class="(isTrans)?'onTrans':''"> <!-- pc type:col-3, mobile type:vertical-->
                    <component-news-card :newsdata="list" v-for="(list, index) in arrData" :key="index"></component-news-card>
                </ul>
                <div class="btn-wrap align-c" v-if="isShow_btnMore">
                    <button type="button" class="btn-cta btn-type-box btn-type-black-outline" @click.stop.prevent="onClick_btnMore">
                        <span class="btn-txt">더보기</span>
                        <span class="btn-txt count-num"><span class="current-page-num">{{currentPage}}</span><span>/</span><span class="tot-page-num">{{totalPage}}</span></span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';

    import news_card from './news-card';

    export default {
        name: "news-main-list",
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
                jsonData : "",
                arrData : [],
                loader : "",

                cateIndex : 0,
                CATE_INDEX_0_ALL : 0,
                CATE_INDEX_1_AUGUST : 1,
                CATE_INDEX_2_CREATOR : 2,

                cateCode : '',
                NEWS_CATE_0_ALL : '',
                NEWS_CATE_1_AUGUST : '',
                NEWS_CATE_2_CREATOR : '',

                totalPage : 1,
                currentPage : 1,
                view:9,
                isShow_btnMore : false,
                isTrans : false
            }
        },

        beforeCreate: function () {

        },

        mounted: function () {

            this.NEWS_CATE_0_ALL = window.GlobalVars.NEWS_CATE_0_ALL;
            this.NEWS_CATE_1_AUGUST = window.GlobalVars.NEWS_CATE_1_AUGUST;
            this.NEWS_CATE_2_CREATOR = window.GlobalVars.NEWS_CATE_2_CREATOR ;

            //console.log("news-list-contents-uid : ",this._uid);
            this.cateIndex = this.CATE_INDEX_0_ALL;
            this.cateCode = this.NEWS_CATE_0_ALL

            this.loader = new loaderJson();
            EventBus.$on(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
            this.getData();
        },
        destroyed : function(){
            EventBus.$off(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
        },
        methods: {
            reset : function(){
                this.arrData = [];
                this.isShow_btnMore = false;
                this.currentPage = 1;
                this.totalPage = 1;
            },

            getData : function(){
                var url = window.GlobalPreset.JSON_URL.CATE_50_GET_NEWS_LIST+'?cate='+this.cateCode;
                this.loader.loadJsonData(url, this._uid);
            }
            ,
            getDataComplete : function (json, uid) {
                if(uid == this._uid){
                    this.reset();
                    this.jsonData = json.news;
                    this.totalPage = Math.ceil(this.jsonData.lists.length/this.view);
                    if(this.totalPage>this.currentPage) this.isShow_btnMore = true;
                    this.setPage();
                    this.isDataLoaded = true;
                    this.isTrans = true;
                }
            },

            setPage : function(){
                var start = (this.currentPage-1) * this.view;
                var end = this.currentPage * this.view;
                var len = this.jsonData.lists.length;
                if(end > len) end = len;

                for(var i=start; i<end; i++){
                    var data = this.jsonData.lists[i];
                    this.arrData.push(data);
                }
            },

            onClick_btnMore : function(){
                this.nextPage();
            },

            nextPage : function(){
                var tempPage = this.currentPage + 1;
                if(tempPage >= this.totalPage){
                    this.isShow_btnMore = false;
                }
                this.currentPage = tempPage;
                this.setPage();
            },

            onClick_cate : function(index, code, eventAction){

                var eventCategory = 'news';
                window.Tracking.send_event(eventCategory, eventAction);


                if(this.cateIndex != index) this.arrData = [];
                this.isTrans = false;
                this.cateIndex = index;
                this.cateCode = code;
                this.getData();
            }
        },

        components: {
            'component-news-card':news_card
        },

    }
</script>
