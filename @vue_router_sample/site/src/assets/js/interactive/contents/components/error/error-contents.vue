<template>
    <transition name="tr-page"  v-on:leave="leave(arguments,afterLeave)" v-on:after-leave="afterLeave">
        <div id="container-sb" class="error" style="min-height: calc( 100vh - 220px )">
            <div id="content-sb">
                <div id="con-sb">

                    <!-- content : S-->
                    <section class="section-contents contents-single">
                        <!-- back img area -->
                        <div class="back-color-box deco-bg-1"></div>
                        <div class="back-color-box deco-bg-2"><figure class="mod-contain-bg"><!--백그라운드 이미지 소스 --></figure></div>

                        <!-- creator creators -->
                        <div class="content-wrap">
                            <div class="inner-content-wrap">
                                <div class="content-txt-box">
                                    <h2>SORRY!</h2>
                                    <p>요청하신 페이지를 찾을 수 없습니다</p>
                                    <div class="btn-wrap">
                                        <router-link to="/" class="btn-cta btn-type-box"><span class="btn-txt">메인으로 가기</span></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        </div>
    </transition>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../interactive/common/loader-json.js';

    export default {
        name: "error-contents",
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
                headerTypeBlack : false,
                indexViewSubNavi : 0,
                isLoading : false,
                isEnd_BgTrans : false,
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
        },

        mounted: function () {
            EventBus.$emit(EventBus.TRANS_ROUTE_MOUNTED , this.headerTypeBlack , this.indexViewSubNavi);
            EventBus.$on(EventBus.CHANGE_RESIZE, this.onChange_resizeMobile);
            EventBus.$emit(EventBus.CONTENTS_UPDATED);
            this.detectErrorPage();
        },

        destroyed : function(){
            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resizeMobile);
            DF.utils.removeClass(document.querySelector('#main-sb'),"fullScreen");
        },

        methods: {
            onChange_resizeMobile : function(w,h,device){
                // console.log('두둥', w, h);

                var footerH = document.querySelector('footer').offsetHeight;
                var contH = h - footerH;

                //var contH = h;

                this.$el.querySelector('.error .content-wrap').style.height = contH + 'px';
            },

            leave : function(el,done) {
                EventBus.$emit(EventBus.PAGE_TRANSITION_START);
            },

            afterLeave : function(el){
                EventBus.$emit(EventBus.PAGE_TRANSITION_END);
            },

            detectErrorPage : function(){
                var el = document.querySelector('#container-sb');
                var el_main = document.querySelector('#main-sb');
                if( DF.utils.hasClass(el,"error") ){
                    DF.utils.addClass(el_main,"fullScreen");
                }else{
                    DF.utils.removeClass(el_main,"fullScreen");
                }
            }
        }
    }
</script>
