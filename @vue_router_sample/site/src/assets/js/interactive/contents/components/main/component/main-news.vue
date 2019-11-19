<template>
    <div class="content-wrap main-news wrap-type-col-3 m-content-full">
        <div class="inner-content-wrap" >
            <div class="content-tit-wrap tit-type-half-line"> <!--v-bind:class="{onShow:isActive}"-->
                <h2 class="txt-tit motion">
                    <span class="txt">
                        AUGUST NEWS
                        <span class="half-line"></span>
                    </span>
                </h2>
                <p class="txt-tit_explain">어거스트와 크리에이터들의 새로운 소식을 전합니다.</p>
            </div>
            <div class="v-slick" v-if="!isMobile"> <!-- add v-slick -->
                <ul class="news-list-wrap">
                    <li class="news-item el-comp-card item-sorting sort-august" :class="(list.isNew)?'item-new':''" v-for="(list, index) in itemdata.lists" :key="index">
                        <a :href="'/news/'+list.idx" target="_self" v-if="list.link == null || list.link == '' || list.link == undefined" @click.stop.prevent="onClick_list(list.idx)">
                            <span class="ico-new"> <!-- .item-new -->
                                <span class="ico-new-txt">N</span><span class="hide">좌측 상단 뉴 아이콘</span>
                            </span>
                            <span class="ico-sort"><!--우측 상단 아이콘--><span class="ico-sort-txt">{{list.cate}}</span></span>
                            <p class="item-img">
                                <span class="hex-cont has-border">
                                    <span class="hex-border">
                                        <span class="hex-border-inner"><span class="hex-border-bg"></span></span>
                                    </span>
                                    <span class="hex-wrap">
                                        <span class="hexagon">
                                            <span class="hexagon-inner">
                                                <span class="hexagon-image-wrap">
                                                    <span class="hexagon-image" :style="'background-image:url(\''+list.img_url+'\')'"><!--크리에이터 이미지--></span>
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </p>
                            <p class="item-text">
                                <strong class="txt-tit btn-news" v-html="list.title">
                                    <!--어거스트 네트워크,<br>
                                    넵튠으로부터 100억 투자 유치.-->
                                </strong>
                                <span class="txt-desc" v-html="list.title_sub">
                                    <!--지난 12월 5일 공개된 온유의 첫 번째 미니앨 범 ‘VOIC E’는 아이튠즈 종합 앨범 차트에서 멕시코, 브라질, 볼리비아, 칠레, 페루, 핀란드, 러시아, 싱가포르, 사우디아라비아.-->
                                </span>
                                <span class="txt-date"><span class="year">{{list.date.split(' ')[0]}}</span><span class="month">{{list.date.split(' ')[1]}}</span><span class="day">{{list.date.split(' ')[2]}}</span></span>
                            </p>
                        </a>
                        <a :href="list.link" target="_blank" @click="onClick_outLink(list.idx)" v-else>
                            <span class="ico-new"> <!-- .item-new -->
                                <span class="ico-new-txt">N</span><span class="hide">좌측 상단 뉴 아이콘</span>
                            </span>
                            <span class="ico-sort"><!--우측 상단 아이콘--><span class="ico-sort-txt">{{list.cate}}</span></span>
                            <p class="item-img">
                                <span class="hex-cont has-border">
                                    <span class="hex-border">
                                        <span class="hex-border-inner"><span class="hex-border-bg"></span></span>
                                    </span>
                                    <span class="hex-wrap">
                                        <span class="hexagon">
                                            <span class="hexagon-inner">
                                                <span class="hexagon-image-wrap">
                                                    <span class="hexagon-image" :style="'background-image:url(\''+list.img_url+'\')'"><!--크리에이터 이미지--></span>
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </p>
                            <p class="item-text">
                                <strong class="txt-tit btn-news" v-html="list.title">
                                    <!--어거스트 네트워크,<br>
                                    넵튠으로부터 100억 투자 유치.-->
                                </strong>
                                <span class="txt-desc" v-html="list.title_sub">
                                    <!--지난 12월 5일 공개된 온유의 첫 번째 미니앨 범 ‘VOIC E’는 아이튠즈 종합 앨범 차트에서 멕시코, 브라질, 볼리비아, 칠레, 페루, 핀란드, 러시아, 싱가포르, 사우디아라비아.-->
                                </span>
                                <span class="txt-date"><span class="year">{{list.date.split(' ')[0]}}</span><span class="month">{{list.date.split(' ')[1]}}</span><span class="day">{{list.date.split(' ')[2]}}</span></span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="v-slick" v-else>
                <slick ref="slick_news" :options="slickOptions" @afterChange="handleAfterChange"
                       @beforeChange="handleBeforeChange" class="news-list-wrap motion" v-if="isDataLoaded" motion-pos = 0.35>
                    <div class="swiper-list news-item el-comp-card item-sorting sort-august" :class="(list.isNew)?'item-new':''" v-for="(list, index) in itemdata.lists" :key="index">
                        <router-link :to="'/news/'+list.idx" target="_self" v-if="list.link == null || list.link == ''">
                            <span class="ico-new"> <!-- .item-new -->
                                <span class="ico-new-shape"><!--삼각형객체--></span>
                                <span class="ico-new-txt">N</span><span class="hide">좌측 상단 뉴 아이콘</span>
                            </span>
                            <span class="ico-sort"><!--우측 상단 아이콘--><span class="ico-sort-txt">{{list.cate}}</span></span>
                            <p class="item-img">
                                <span class="hex-cont has-border">
                                    <span class="hex-border">
                                        <span class="hex-border-inner"><span class="hex-border-bg"></span></span>
                                    </span>
                                    <span class="hex-wrap">
                                        <span class="hexagon">
                                            <span class="hexagon-inner">
                                                <span class="hexagon-image-wrap">
                                                    <span class="hexagon-image" :style="'background-image:url(\''+list.img_url+'\')'"><!--크리에이터 이미지--></span>
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </p>
                            <p class="item-text">
                                <strong class="txt-tit btn-news" v-html="list.title">
                                    <!--어거스트 네트워크,<br>
                                    넵튠으로부터 100억 투자 유치.-->
                                </strong>
                                <span class="txt-desc" v-html="list.title_sub">
                                    <!--지난 12월 5일 공개된 온유의 첫 번째 미니앨 범 ‘VOIC E’는 아이튠즈 종합 앨범 차트에서 멕시코, 브라질, 볼리비아, 칠레, 페루, 핀란드, 러시아, 싱가포르, 사우디아라비아.-->
                                </span>
                                <span class="txt-date"><span class="year">{{list.date.split(' ')[0]}}</span><span class="month">{{list.date.split(' ')[1]}}</span><span class="day">{{list.date.split(' ')[2]}}</span></span>
                            </p>
                        </router-link>
                        <a :href="list.link" target="_blank" v-else>
                            <span class="ico-new"> <!-- .item-new -->
                                <span class="ico-new-shape"><!--삼각형객체--></span>
                                <span class="ico-new-txt">N</span><span class="hide">좌측 상단 뉴 아이콘</span>
                            </span>
                            <span class="ico-sort"><!--우측 상단 아이콘--><span class="ico-sort-txt">{{list.cate}}</span></span>
                            <p class="item-img">
                                <span class="hex-cont has-border">
                                    <span class="hex-border">
                                        <span class="hex-border-inner"><span class="hex-border-bg"></span></span>
                                    </span>
                                    <span class="hex-wrap">
                                        <span class="hexagon">
                                            <span class="hexagon-inner">
                                                <span class="hexagon-image-wrap">
                                                    <span class="hexagon-image" :style="'background-image:url(\''+list.img_url+'\')'"><!--크리에이터 이미지--></span>
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </p>
                            <p class="item-text">
                                <strong class="txt-tit btn-news" v-html="list.title">
                                    <!--어거스트 네트워크,<br>
                                    넵튠으로부터 100억 투자 유치.-->
                                </strong>
                                <span class="txt-desc" v-html="list.title_sub">
                                    <!--지난 12월 5일 공개된 온유의 첫 번째 미니앨 범 ‘VOIC E’는 아이튠즈 종합 앨범 차트에서 멕시코, 브라질, 볼리비아, 칠레, 페루, 핀란드, 러시아, 싱가포르, 사우디아라비아.-->
                                </span>
                                <span class="txt-date"><span class="year">{{list.date.split(' ')[0]}}</span><span class="month">{{list.date.split(' ')[1]}}</span><span class="day">{{list.date.split(' ')[2]}}</span></span>
                            </p>
                        </a>
                    </div>
                </slick>
            </div>
            <div class="btn-wrap btn-more">
                <a href="/news" class="btn-cta btn-type-box btn-type-outline" @click.stop.prevent="onClick_goNews"><span class="btn-txt">최신 뉴스 보러가기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick'
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    export default {
        name: "main-news",
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
                scrollTop : '',
                scrollBottom :'',
                winW : 0,
                winH : 0,

                isActive : false,

                slickOptions: {
                    //options can be used from the plugin documentation
                    infinite: false,
                    speed: 500,
                    arrows: false,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
                isMobile : false,
                isDataLoaded : false
            }
        },


        beforeCreate: function () {

        },
        created : function() {
            EventBus.$on(EventBus.CHANGE_DEVICE_SIZE, this.onChange_deviceSize);
        },
        mounted: function () {
            this.onChange_deviceSize();
        },
        destroyed : function() {
            EventBus.$off(EventBus.CHANGE_DEVICE_SIZE, this.onChange_deviceSize);
        },
        methods: {
            onClick_list : function(idx){
                var eventCategory = 'main';
                var eventAction = 'click_news_'+idx;
                window.Tracking.send_event(eventCategory, eventAction);

                var path = '/news/'+idx;
                this.$router.push(path);
            },

            onClick_outLink : function(idx){
                var eventCategory = 'main';
                var eventAction = 'click_news_'+idx;
                window.Tracking.send_event(eventCategory, eventAction);
            },

            onClick_goNews : function(){
                var eventCategory = 'main';
                var eventAction = 'click_news_page';
                window.Tracking.send_event(eventCategory, eventAction);

                this.$router.push('/news');
            },

            onChange_deviceSize : function(){
                var el = document.querySelector('body');
                this.isMobile = window.DF.utils.hasClass(el, window.GlobalVars.BROWSER_TYPE_MOBILE);
            },

            destroyed : function () {
                EventBus.$off(EventBus.CHANGE_DEVICE_SIZE, this.onChange_deviceSize);
            },

            prev: function () {
                if(this.$refs.slick_news != null){
                    this.$refs.slick_news.prev();
                }
            },

            next: function () {
                if(this.$refs.slick_news != null) {
                    this.$refs.slick_news.next();
                }
            },

            handleAfterChange : function(event, slick, currentSlide){

            },

            handleBeforeChange : function(event, slick, currentSlide){

            }
        },

        components: {
            "slick": Slick
        },
        watch : {
            itemdata : function(){
                this.isDataLoaded = true;
            }
        }
    }
</script>
