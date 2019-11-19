<template>
    <div class="content-wrap recommend-news">
        <div class="inner-content-wrap">
            <h2 class="rec-tit">또 다른 <br class="_m">최신 소식이 궁금하신가요?</h2>
            <ul class="news-list-wrap wrap-type-col-3 m-wrap-type-vertical">
                <component-news-card :newsdata="list" v-for="(list, index) in recommend_data.lists" :key="index"></component-news-card>
            </ul>
        </div>
    </div>
</template>

<script>
    import news_card from './news-card';

    export default {
        name: "news-detail-recommend",
        props: {
            recommend_data: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {

            }
        },

        beforeCreate: function () {

        },

        mounted: function () {

        },

        methods: {

        },

        components: {
            'component-news-card':news_card
        }
    }
</script>
