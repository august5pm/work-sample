<template>

    <transition name="tr-page"  v-on:leave="leave(arguments,afterLeave)" v-on:after-leave="afterLeave">
        <div id="container-sb" :class="container_name">
            <compoent-news-main v-if="isMain"></compoent-news-main>
            <compoent-news-detail v-if="isDetail"></compoent-news-detail>
        </div>
    </transition>

</template>

<script>
    import $ from 'jquery'
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../interactive/common/loader-json.js';

    // component
    import news_main from  './component/news-main';
    import news_detail from  './component/news-detail';
    import scroll_mixin from "../../../common/mixin/scroll_mixin.vue";

    export default {
        name: "news-list-contents",
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
                tab_index : 0,
                container_name : '',
                isMain : false,
                isDetail : false
                ,headerTypeBlack : false
                ,indexViewSubNavi : 0
                ,isStart : true
            }
        },

        beforeRouteEnter (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_ENTER,to,from,next);

            next();
        },
        beforeRouteLeave (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_LEAVE,to,from,next);
        },
        beforeCreate: function () {

        },
        created : function(){
            this.changeRoute();
        },
        mounted: function () {
            EventBus.$emit(EventBus.TRANS_ROUTE_MOUNTED , this.headerTypeBlack, this.indexViewSubNavi);
            setTimeout(() => {
                EventBus.$emit(EventBus.SHOW_FLOAT_BTN);
            }, 1000);
            this.isStart = false;
        },

        methods: {
            changeRoute : function() {
                var newsPath = window.GlobalVars.CATE_500_NEWS;

                if (this.$route.path == newsPath || this.$route.path == newsPath+'/') {
                    this.isMain = true;
                    this.isDetail = false;
                    this.headerTypeBlack = false;
                }else{
                    this.isMain = false;
                    this.isDetail = true;
                    this.headerTypeBlack = true;
                }

                if(!this.isStart || window.GlobalVars.isStart) EventBus.$emit(EventBus.TRANS_HEADER_TYPE , this.headerTypeBlack);

                var path = this.$route.path;
                var list = path.split('/');
                if(-1<parseInt(this.$route.params.id)){
                    list[2] = 'detail';
                }

                list.shift();
                var listLen = list.length;
                if(list[listLen-1] == '') list.pop();
                this.container_name = window.GlobalVars.container_name = list.join('-');


                /*if(this.isDetail) {
                    var ty =0;
                    $('html, body').stop().animate({
                        scrollTop: ty
                    }, 10);
                }*/
            },
            leave : function(el,done) {
                EventBus.$emit(EventBus.PAGE_TRANSITION_START);
            },
            afterLeave : function(el){
                EventBus.$emit(EventBus.PAGE_TRANSITION_END);
            }
        }
        ,
        watch :{
            '$route' (to, from) {
                //console.log('contentsetting :::::: ', to,from);

                //console.log('scrollllllllllllllY : ', window.DF.utils.getScrollPosY())
                this.changeRoute();
                this.reset_scroll();
                console.log('$route news ========================== 0 ' , this.container_name );
            }
        }
        ,
        mixins: [scroll_mixin],
        components: {
            'compoent-news-main':news_main
            ,'compoent-news-detail':news_detail
        }

    }
</script>
