<template>
    <footer class="footer-wrap">
        <div class="inner-footer tr-page-leave">
            <div class="con">
                <div class="footer-area clearfix">
                    <div class="footer-l-area">
                        <div class="logo-wrap">
                            <router-link :to="MAIN"><span class="sd-logo"><!--로고--></span></router-link>
                        </div>
                        <ul class="btns-wrap">
                            <li><a :href="NEWS_LIST_PATH" @click.stop.prevent="onClick_news(NEWS_LIST_PATH)">최신 뉴스보기</a></li>
                            <li><a href="https://post.naver.com/my.nhn?memberNo=44134674" target="_blank" @click="onClick_post">포스트 보기</a></li>
                            <li><router-link :to="IR_NOTICE_PATH">IR 공고</router-link></li>
                            <li><router-link :to="PRIVACY_POLICY_PATH">개인정보처리방침</router-link></li>
                        </ul>
                        <ul class="info-wrap">
                            <li><span>Copyright © 2019 COMPANY NAME Inc. All Rights Reserved</span></li>
                            <li><a href="mailto:E-mail : contact@domain.net">E-mail : contact@domain.co.kr</a></li>
                        </ul>
                    </div>
                    <div class="footer-r-area">
                        <ul class="sns-list-wrap">
                            <li>
                                <a href="#" target="_blank" title="공식 유투브 페이지 바로가기" @click="onClick_sns('click_sns_youtube')">
                                    <span class="hex-bg"></span>
                                    <span class="ico-sns-youtube icon"><!--아이콘 유투브--></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank" title="공식 페이스북 바로가기" @click="onClick_sns('click_sns_facebook')">
                                    <span class="hex-bg"></span>
                                    <span class="ico-sns-facebook icon"><!--아이콘 페이스북--></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank" title="공식 인스타그램 바로가기" @click="onClick_sns('click_sns_instagram')">
                                    <span class="hex-bg"></span>
                                    <span class="ico-sns-insta icon"><!--아이콘 인스타--></span>
                                </a>
                            </li>
                        </ul>
                        <div class="cert-wrap">
                            <figure class="mod-contain-bg"></figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
    import { EventBus } from '../../../interactive/common/event-bus.js';
    import $ from 'jquery';

    export default {
        name: "common-group-footer",
        props: {

        },

        data: function () {
            return {
                NEWS_LIST_PATH : '',
                PRIVACY_POLICY_PATH : '',
                IR_NOTICE_PATH : '',
                MAIN : '',
                isShow : false
            }
        },
        created: function () {
            EventBus.$on(EventBus.PAGE_TRANSITION_START,this.pageTransitionStart);
            EventBus.$on(EventBus.PAGE_TRANSITION_END,this.pageTransitionEnd);

        },
        mounted: function () {
            this.NEWS_LIST_PATH = window.GlobalVars.CATE_500_NEWS;
            this.PRIVACY_POLICY_PATH = window.GlobalVars.CATE_700_PRIVACY_POLICY;
            this.IR_NOTICE_PATH = window.GlobalVars.CATE_1000_IR_NOTICE;
            this.MAIN = window.GlobalVars.CATE_000_MAIN;

            /*var app = this;
            window.addEventListener('load', () => {
                app.isShow = true;
            });*/
        },
        methods: {
            onClick_news : function(path){
                var eventCategory = this.checkPageName();
                if(eventCategory != ''){
                    var eventAction = "click_news_footer";
                    window.Tracking.send_event(eventCategory, eventAction);
                }

                this.$router.push(path);
            },

            onClick_post : function(){
                var eventCategory = this.checkPageName();
                if(eventCategory != ''){
                    var eventAction = "click_post_footer";
                    window.Tracking.send_event(eventCategory, eventAction);
                }
            },

            onClick_sns : function(eventAction){
                var eventCategory = this.checkPageName();
                if(eventCategory != ''){
                    window.Tracking.send_event(eventCategory, eventAction);
                }
            },

            checkPageName : function(){
                var eventCategory = "";
                var path = this.$route.path;
                var oneDepth = path.split('/')[1];
                var twoDepth = path.split('/')[2];

                var main = window.GlobalVars.CATE_000_MAIN.split('/')[1];
                var creator = window.GlobalVars.CATE_100_CREATOR.split('/')[1];
                var creator_creators = window.GlobalVars.CATE_110_CREATOR_CREATORS.split('/')[2];
                var creator_agency = window.GlobalVars.CATE_120_CREATOR_AGENCY.split('/')[2];
                var business = window.GlobalVars.CATE_200_BUSINESS.split('/')[1];
                var business_brand = window.GlobalVars.CATE_210_BUSINESS_BRAND.split('/')[2];
                var business_ip = window.GlobalVars.CATE_220_BUSINESS_IP.split('/')[2];
                var about = window.GlobalVars.CATE_300_ABOUT.split('/')[1];
                var recruit = window.GlobalVars.CATE_400_CAREERS.split('/')[1];


                switch (oneDepth) {
                    case main :
                        eventCategory = "main";
                        break;
                    case creator:
                        if(twoDepth == creator_creators){
                            eventCategory = "creator_view";
                        }else if(twoDepth == creator_agency){
                            eventCategory = "strength";
                        }
                        break;
                    case business :
                        if(twoDepth == business_brand){
                            eventCategory = "brand";
                        }else if(twoDepth == business_ip){
                            eventCategory = "ip";
                        }
                        break;
                    case about :
                        eventCategory = "about";
                        break;
                    case recruit :
                        eventCategory = "recruit";
                        break;
                    default :
                        break
                }

                if(eventCategory != ""){
                    var eventAction = "click_news_footer";
                    window.Tracking.send_event(eventCategory, eventAction);
                }
            },

            pageTransitionStart : function() {
                console.log('footer start ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ');
                if(window.GlobalVars.isIE()) {
                    //DF.utils.addClass(document.getElementsByClassName('inner-footer')[0], 'tr-page-leave-to');
                    $('.inner-footer').css('height', $(window).height() * 2);
                    $('.inner-footer').stop().animate({'height': 0}, {queue: false, duration: 900, easing: 'easeInOutCubic'});
                }
                else {
                    DF.utils.addClass(document.getElementsByClassName('inner-footer')[0],'tr-page-leave-active');

                }
                DF.utils.addClass(document.getElementsByClassName('inner-footer')[0],'tr-page-leave-to');

                //DF.utils.addClass(document.getElementsByClassName('inner-footer')[0],'tr-page-leave-active');

            },
            pageTransitionEnd : function() {
                console.log('footer end ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ');
                DF.utils.removeClass(document.getElementsByClassName('inner-footer')[0],'tr-page-leave-active');
                DF.utils.removeClass(document.getElementsByClassName('inner-footer')[0],'tr-page-leave-to');
                if(window.GlobalVars.isIE()) $('.inner-footer').stop().animate({'height': $(window).height()}, {queue: false, duration: 0});
            },

            /*onClick_privacy : function(){
                alert('준비 중 입니다.');
            }*/
        },

        watch: {
            '$route' (to, from) {

            }
        }
    }
</script>
