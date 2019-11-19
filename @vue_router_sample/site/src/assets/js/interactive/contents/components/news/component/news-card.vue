<template>
    <li class="news-item el-comp-card item-sorting sort-august" :class="newsdata.isNew?'item-new':''">
        <router-link :to="NEWS_DETAIL_PATH+newsdata.idx" v-if="newsdata.link == null || newsdata.link == '' || newsdata.link == undefined">
            <span class="ico-new"> <!-- .item-new -->
                <span class="ico-new-txt">N</span><span class="hide">좌측 상단 뉴 아이콘</span>
            </span>
            <span class="ico-sort"><!--우측 상단 아이콘--><span class="ico-sort-txt">{{newsdata.cate}}<!--august--></span></span>
            <p class="item-img">
                <span class="hex-cont has-border">
                    <span class="hex-border">
                        <span class="hex-border-inner"><span class="hex-border-bg"></span></span>
                    </span>
                    <span class="hex-wrap">
                        <span class="hexagon">
                            <span class="hexagon-inner">
                                <span class="hexagon-image-wrap">
                                    <span class="hexagon-image" :style="'background-image:url(\''+newsdata.img_url+'\')'"><!--크리에이터 이미지--></span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
                </p>
                <p class="item-text">
                    <strong class="txt-tit btn-news" v-html="newsdata.title">

                    </strong>
                    <span class="txt-desc" v-html="newsdata.title_sub">
                        <!--지난 12월 5일 공개된 온유의 첫 번째 미니앨 범 ‘VOIC E’는 아이튠즈 종합 앨범 차트에서 멕시코, 브라질, 볼리비아, 칠레, 페루, 핀란드, 러시아, 싱가포르, 사우디아라비아.-->
                    </span>
                    <span class="txt-date"><span class="year">{{this.newsdata.date.split(' ')[0]}}</span><span class="month">{{this.newsdata.date.split(' ')[1]}}</span><span class="day">{{this.newsdata.date.split(' ')[2]}}</span></span>
                </p>
        </router-link>
        <a :href="newsdata.link" target="_blank" v-else>
            <span class="ico-new"> <!-- .item-new -->
                <span class="ico-new-txt">N</span><span class="hide">좌측 상단 뉴 아이콘</span>
            </span>
            <span class="ico-sort"><!--우측 상단 아이콘--><span class="ico-sort-txt">{{newsdata.cate}}<!--august--></span></span>
            <p class="item-img">
                <span class="hex-cont has-border">
                    <span class="hex-border">
                        <span class="hex-border-inner"><span class="hex-border-bg"></span></span>
                    </span>
                    <span class="hex-wrap">
                        <span class="hexagon">
                            <span class="hexagon-inner">
                                <span class="hexagon-image-wrap">
                                    <span class="hexagon-image" :style="'background-image:url(\''+newsdata.img_url+'\')'"><!--크리에이터 이미지--></span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            </p>
            <p class="item-text">
                <strong class="txt-tit btn-news" v-html="newsdata.title">

                </strong>
                <span class="txt-desc" v-html="newsdata.title_sub">
                        <!--지난 12월 5일 공개된 온유의 첫 번째 미니앨 범 ‘VOIC E’는 아이튠즈 종합 앨범 차트에서 멕시코, 브라질, 볼리비아, 칠레, 페루, 핀란드, 러시아, 싱가포르, 사우디아라비아.-->
                    </span>
                <span class="txt-date"><span class="year">{{this.newsdata.date.split(' ')[0]}}</span><span class="month">{{this.newsdata.date.split(' ')[1]}}</span><span class="day">{{this.newsdata.date.split(' ')[2]}}</span></span>
            </p>
        </a>
    </li>
</template>

<script>
    export default {
        name: "news-card",
        props: {
            newsdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },


        data: function () {
            return {
                NEWS_DETAIL_PATH : "",
            }
        },

        beforeCreate: function () {

        },

        mounted: function () {
            this.NEWS_DETAIL_PATH = window.GlobalVars.CATE_500_NEWS+'/'
        },

        methods: {

        },

        components: {

        },

    }
</script>
