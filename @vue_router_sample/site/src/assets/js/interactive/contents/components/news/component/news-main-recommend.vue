<template>
    <div class="content-wrap news-slider m-content-full">
        <div class="inner-content-wrap">
            <div class="v-slick"> <!-- add class slick -->
                <div class="item-count-wrap type-black">
                    <span class="current">{{currentPage}}</span><span class="total">{{totalPage}}</span>
                </div>
                <slick ref="slick" :options="slickOptions" @afterChange="handleAfterChange"
                       @beforeChange="handleBeforeChange" class="news-slide-wrap" v-if="isDataLoaded">

                    <div class="swiper-list news-item" v-for="(list, index) in jsonData.lists" :key="index">
                        <div class="inner-item-wrap">
                            <router-link :to="NEWS_DETAIL_PATH+list.idx" v-if="list.link == null || list.link == '' || list.link == undefined">
                                <div class="item-tit">
                                    <span class="ico-news-ct">{{list.cate}}</span>
                                    <h1 class="txt-tit" v-html="list.title"></h1>
                                    <strong class="txt-day">{{list.date}}</strong>
                                </div>
                                <div class="item-img"><figure class="mod-covered-bg" :style="'background-image:url(\''+list.img_url+'\')'" ><!--뉴스이미지---></figure></div>
                            </router-link>
                            <a :href="list.link" target="_blank" v-else>
                                <div class="item-tit">
                                    <span class="ico-news-ct">{{list.cate}}</span>
                                    <h1 class="txt-tit" v-html="list.title"><!--어거스트네트워크, <br class="_m">교육 콘텐츠 업체 ‘유니브’ 인수--></h1>
                                    <strong class="txt-day">{{list.date}}</strong>
                                </div>
                                <div class="item-img"><figure class="mod-covered-bg" :style="'background-image:url(\''+list.img_url+'\')'" ><!--뉴스이미지---></figure></div>
                            </a>
                        </div>
                    </div>
                </slick>

                <div class="btn-wrap btn-prev-next-wrap type-bold has-circle">
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
</template>

<script>
    import Slick from 'vue-slick'
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';



    export default {
        name: "news-main-recommend",
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
                slickOptions: {
                    infinite: false,
                    speed: 700,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false,
                    draggable : false,
                    cssEase: 'cubic-bezier(0.65, 0.01, 0.29, 1)',
                    responsive: [
                        {
                            breakpoint: window.GlobalVars.SIZE_MOBILE,
                            settings: {
                                settings: "slick",
                                draggable : true,
                            }
                        }
                    ]
                },

                totalPage : 1,
                currentPage : 1,
                isStart : false,

                jsonData : "",
                isDataLoaded : false,
                NEWS_DETAIL_PATH : ""
            }
        },

        beforeCreate: function () {

        },

        mounted: function () {
            this.NEWS_DETAIL_PATH = window.GlobalVars.CATE_500_NEWS+'/';

            EventBus.$on(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
            var url = window.GlobalPreset.JSON_URL.CATE_50_GET_NEWS_RECOMMEND;
            this.getData(url);

            this.isStart = true;
            //console.log("news-list-recommend-uid : ",this._uid);

            this.$el.querySelector('.btn-prev-next-wrap').classList.add('onShow');
        },
        destroyed : function(){
            EventBus.$off(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
        },
        methods: {
            prev: function () {
                if(this.$refs.slick != null){
                    this.$refs.slick.prev();
                }

            },

            next: function () {
                if(this.$refs.slick != null) {
                    this.$refs.slick.next();
                }
            },

            handleAfterChange : function(event, slick, currentSlide){
                this.hideIndex = -1;
            },

            handleBeforeChange : function(event, slick, currentSlide, nextSlide){
                this.currentPage = (nextSlide+1);
                this.showIndex = nextSlide;
                this.hideIndex = currentSlide;
                this.isStart = false;
            },

            getData : function(url){
                var loader = new loaderJson();
                loader.loadJsonData(url,this._uid);
            }
            ,
            getDataComplete : function (json, uid) {
                console.log('recommend complete uid', uid)

                if(uid == this._uid){
                    this.jsonData = json.news.recommend;
                    this.totalPage = this.jsonData.lists.length;
                    this.isDataLoaded = true;
                }
            }
        },

        components: {
            "slick": Slick
        },

    }
</script>
