<template>
    <!-- news detail -->
    <div class="content-wrap detail-article">
        <div class="inner-content-wrap">
            <div class="detail-hd-wrap">
                <div class="detail_tit">
                    <h1 class="detail_tit-txt" v-html="itemdata.title">
                    </h1>
                </div>
                <div class="detail_date">
                    <span>{{itemdata.date}}</span>
                </div>
                <div class="detail_ct ico-news-ct">{{itemdata.cate}}</div>
            </div>
            <div class="detail-body-wrap list-style-on" v-html="itemdata.content"></div>
            <div class="btn-wrap align-l">
                <router-link :to="NEWS_LIST_PATH" class="btn-cta btn-type-box btn-type-black-outline"><span class="btn-txt">목록</span></router-link>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "news-detail-article",
        props: {
            itemdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        computed : {
            year : function(){
                return this.itemdata.date.split('.')[0]
            },
            month : function(){
                return this.itemdata.date.split('.')[1]
            },
            date : function(){
                return this.itemdata.date.split('.')[2]
            }
        },

        data: function () {
            return {
                NEWS_LIST_PATH : '',
                txtYear : '',
                txtMonth : '',
                txtDate : ''
            }
        },

        beforeCreate: function () {

        },

        created : function(){

        },

        mounted: function () {
            this.NEWS_LIST_PATH = window.GlobalVars.CATE_500_NEWS;
            /*this.txtYear = this.year();
            this.txtMonth = this.month();
            this.txtDate = this.date();*/

        },

        methods: {

        },

        components: {

        }
    }
</script>
