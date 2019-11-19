<template>
    <div class="content-wrap main-new-creators">
        <div class="inner-content-wrap">
            <div class="content-tit-wrap tit-type-half-line"> <!--v-bind:class="{onShow:isActive}"-->
                <h2 class="txt-tit motion">
                    <span class="txt">
                        new creators
                        <span class="half-line"></span>
                    </span>
                </h2>
                <p class="txt-tit_explain">새로운 크리에이터들을 소개합니다. </p>
            </div>
            <div class="v-slick" v-if="isDataLoaded">
                <slick ref="slick_cr" :options="slickOptions" @afterChange="handleAfterChange"
                       @beforeChange="handleBeforeChange" class="creator-list-wrap motion" motion-pos = 0.35>
                    <div class="swiper-list creator-item el-comp-hex-img" v-for="(list, index) in itemdata.lists" :key="index">
                        <a :href="list.link" :target="list.target">
                            <div class="item-img">
                                <div class="hex-cont has-border">
                                    <span class="hex-border"><span class="hex-border-inner"><span class="hex-border-bg"></span></span></span>
                                    <div class="hex-wrap">
                                        <div class="hexagon">
                                            <div class="hexagon-inner">
                                                <div class="hexagon-image-wrap">
                                                    <figure class="hexagon-image" :style="'background-image:url(\''+list.img_url+'\')'"><!--크리에이터 이미지--></figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="hex-ct-cont hex-cont-small">
                                    <div class="hexagon"><!--hexagon shape--></div>
                                    <span class="icons-wrap" :class="'type-'+list.cate.length">
                                        <slot v-for="(cate, cate_index) in list.cate">
                                            <span class="ico-category ico-ct-game" v-if="cate.code == CREATOR_CATE_1_GAME"><!--카테고리--><span class="blind">게임</span></span>
                                            <span class="ico-category ico-ct-kids" v-if="cate.code == CREATOR_CATE_2_KIDS"><!--카테고리--><span class="blind">키즈</span></span>
                                            <span class="ico-category ico-ct-food" v-if="cate.code == CREATOR_CATE_3_FOOD"><!--카테고리--><span class="blind">먹방, 예능</span></span>
                                            <span class="ico-category ico-ct-daily" v-if="cate.code == CREATOR_CATE_4_DAILY"><!--카테고리--><span class="blind">일상, 취미</span></span>
                                        </slot>
                                    </span>
                                </div>
                            </div>
                        </a>
                        <div class="item-tit">
                            <strong class="txt-name">{{list.name}}</strong>
                            <p class="txt-info">
                                <span class="txt-info_item" v-for="(subscriber, subscriber_index) in list.subscriber" :key="subscriber_index">
                                    <span class="hex-ct-cont hex-cont-small type-white">
                                        <span class="hexagon"><!--hexagon shape--></span>
                                        <span class="sns-icon-wrap">
                                            <span class="ico-sns-youtube-yl" v-if="subscriber.type == CREATOR_SUBSCRIBER_TYPE_YOUTUBE"><!-- icon : youtube --></span><span class="blind">유투브 구독자</span>
                                            <span class="ico-sns-twitch-yl" v-if="subscriber.type == CREATOR_SUBSCRIBER_TYPE_TWITCH"><!-- icon : twitch --></span><span class="blind">트위치 구독자</span>
                                            <span class="ico-sns-tiktok-yl" v-if="subscriber.type == CREATOR_SUBSCRIBER_TYPE_TIKTOK"><!-- icon : twitch --></span><span class="blind">틱톡 구독자</span>
                                        </span>
                                    </span>
                                    <span class="txt">{{subscriber.num}}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </slick>
            </div>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick'
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    export default {
        name: "main-new-creators",
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
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [
                        {
                            breakpoint:window.GlobalVars.SIZE_MOBILE,
                            settings: {
                                settings: "slick_cr",
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                },
                isDataLoaded : false,
                CREATOR_SUBSCRIBER_TYPE_YOUTUBE : '',
                CREATOR_SUBSCRIBER_TYPE_TWITCH : '',
                CREATOR_SUBSCRIBER_TYPE_TIKTOK : '',
                CREATOR_CATE_1_GAME : -1,
                CREATOR_CATE_2_KIDS : -1,
                CREATOR_CATE_3_FOOD : -1,
                CREATOR_CATE_4_DAILY : -1,
            }
        },


        beforeCreate: function () {

        },

        mounted: function () {
            this.CREATOR_SUBSCRIBER_TYPE_YOUTUBE = window.GlobalVars.CREATOR_SUBSCRIBER_TYPE_YOUTUBE;
            this.CREATOR_SUBSCRIBER_TYPE_TWITCH = window.GlobalVars.CREATOR_SUBSCRIBER_TYPE_TWITCH;
            this.CREATOR_SUBSCRIBER_TYPE_TIKTOK = window.GlobalVars.CREATOR_SUBSCRIBER_TYPE_TIKTOK;

            this.CREATOR_CATE_1_GAME = window.GlobalVars.CREATOR_CATE_1_GAME;
            this.CREATOR_CATE_2_KIDS = window.GlobalVars.CREATOR_CATE_2_KIDS;
            this.CREATOR_CATE_3_FOOD = window.GlobalVars.CREATOR_CATE_3_FOOD;
            this.CREATOR_CATE_4_DAILY = window.GlobalVars.CREATOR_CATE_4_DAILY;
        },

        destroyed : function () {
        },

        methods: {

            prev: function () {
                if(this.$refs.slick_cr != null){
                    this.$refs.slick_cr.prev();
                }

            },

            next: function () {
                if(this.$refs.slick_cr != null) {
                    this.$refs.slick_cr.next();
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
        watch: {
            itemdata : function(){
                this.isDataLoaded = true;
            }
        }
    }
</script>
