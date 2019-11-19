<template>
    <transition name="tr-page"  v-on:leave="leave(arguments,afterLeave)" v-on:after-leave="afterLeave">
        <div id="container-sb" class="apply-creator">
            <div id="content-sb">
                <div id="con-sb">

                    <!-- decorate : top-left -->
                    <div class="content-deco-box top-left">
                        <div class="box"></div>
                    </div>
                    <!--// decorate : top-left -->

                    <!-- content : S-->
                    <!-- contents -->
                    <section class="section-contents contents-single"> <!-- 키비주얼 섹션이 없고 컨텐츠 섹션만 있을 경우 .section-single -->
                        <!-- back img area -->
                        <div class="back-color-box deco-bg-1"></div>

                        <!-- main new creators -->
                        <div class="content-wrap apply-terms">
                            <div class="inner-content-wrap">
                                <div class="content-tit-wrap tit-type-half-line type-black">
                                    <h2 class="txt-tit motion">
                                        <span class="txt">
                                            크리에이터 지원하기
                                            <span class="half-line"></span>
                                        </span>
                                    </h2>
                                </div>
                                <component-form-agree :index="CHECK_INDEX_0_AGREE" :class="'js-focus-form'" :alert="'개인정보 수집 및 이용약관에 동의하셔야 지원이 가능합니다.'"></component-form-agree>
                            </div>
                        </div>

                        <div class="content-wrap apply-terms-write">
                            <div class="inner-content-wrap">
                                <div class="content-tit-wrap tit-type-under-line type-black">
                                    <h3 class="txt-tit motion"><span>지원양식 작성</span></h3>
                                </div>
                                <div class="terms-form-wrap">
                                    <form id="form_2" class="form-group" action="/">
                                        <fieldset>
                                            <legend class="blind">지원양식 작성 부분</legend>
                                            <ul class="inp-list">
                                                <!-- 이름, 성별 입력 폼 -->
                                                <component-form-name-gender :name_index="CHECK_INDEX_1_NAME" :gender_index="CHECK_INDEX_2_GENDER" :class="'js-focus-form'"></component-form-name-gender>
                                                <!-- 생일 입력 폼 -->
                                                <component-form-brithday :index="CHECK_INDEX_3_BIRTHDAY" :class="'js-focus-form'"></component-form-brithday>
                                                <!-- 전화번호 입력 폼 -->
                                                <component-form-tel :index="CHECK_INDEX_4_TEL" :class="'js-focus-form'"></component-form-tel>
                                                <!-- 이메일 입력 폼 -->
                                                <component-form-email :index="CHECK_INDEX_5_EMAIL" :class="'js-focus-form'"></component-form-email>
                                                <!-- 채널 입력 폼 -->
                                                <component-form-channel :index="CHECK_INDEX_6_CHANNEL" :title_index="CHECK_INDEX_11_CHANNEL_TITLE" :class="'js-focus-form'"></component-form-channel>
                                                <!-- 채널 카테고리 입력 폼 -->
                                                <component-form-channel-category :index="CHECK_INDEX_7_CHANNEL_CATEGORY" :class="'js-focus-form'"></component-form-channel-category>
                                                <!-- 플랫폼 입력 폼 -->
                                                <component-form-platform :index="CHECK_INDEX_8_PLATFORM" :class="'js-focus-form'"></component-form-platform>
                                                <!-- 자기 소개 입력 폼 -->
                                                <component-form-content :index="CHECK_INDEX_9_INTRODUCTION" :class="'js-focus-form'" :title="'자기 소개'" :placeholder="'전달하고 싶은 자기소개를 자유롭게 작성해 주세요.'"></component-form-content>
                                                <!-- 로봇방지 입력 폼 -->
                                                <component-form-recaptcha :index="CHECK_INDEX_10_RECAPTCHA" :class="'js-focus-form'"></component-form-recaptcha>
                                            </ul>

                                            <div class="btn-wrap align-c">
                                                <button type="submit" class="btn-cta btn-type-box btn-type-wide btn-type-black" @click.stop.prevent="onClick_submit"><span class="btn-txt">크리에이터 지원하기</span></button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- // content : E-->

                    <!-- decorate : bottom-right -->
                    <div class="content-deco-box bottom-right">
                        <div class="box"></div>
                    </div>
                    <!--// decorate : bottom-right -->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    import $ from 'jquery';

    import form_agree from  '../common/form-agree-apply-creator';
    import form_name_gender from  '../common/form-name-gender';
    import form_birthday from  '../common/form-birthday';
    import form_tel from  '../common/form-tel';
    import form_email from  '../common/form-email';
    import form_channel from  '../common/form-channel';
    import form_channel_category from  '../common/form-channel-category';
    import form_platform from  '../common/form-platform';
    import form_content from  '../common/form-content';
    import form_recaptcha from '../common/form-recaptcha'
    import scroll_mixin from "../../../common/mixin/scroll_mixin.vue";

    export default {
        name: "apply-creator-contents",
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
                check_index : -1,
                CHECK_INDEX_0_AGREE : 0,
                CHECK_INDEX_1_NAME : 1,
                CHECK_INDEX_2_GENDER : 2,
                CHECK_INDEX_3_BIRTHDAY : 3,
                CHECK_INDEX_4_TEL : 4,
                CHECK_INDEX_5_EMAIL : 5,
                CHECK_INDEX_6_CHANNEL : 6,
                CHECK_INDEX_7_CHANNEL_CATEGORY : 7,
                CHECK_INDEX_8_PLATFORM : 8,
                CHECK_INDEX_9_INTRODUCTION : 9,
                CHECK_INDEX_10_RECAPTCHA : 10,
                CHECK_INDEX_11_CHANNEL_TITLE : 11,

                timer : "",
                errorFocusNum : 100,
                apply_data : [],
                applyCompleteNum : 0,
                applyLen : 11,
                container_name : 'apply-creator',
                headerTypeBlack : true,
                indexViewSubNavi : 0
            }
        },

        beforeRouteEnter (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_ENTER,to,from,next);

            next();
        },
        beforeRouteLeave (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_LEAVE,to,from,next);
        },

        created: function () {
            EventBus.$on(EventBus.CHECK_ERROR, this.onError_validation);
            EventBus.$on(EventBus.CHECK_VALIDATION_COMPLETE, this.onComplete_validation);
        },

        mounted: function () {
            // 트래킹
            this.setPageTracking();
            EventBus.$emit(EventBus.TRANS_ROUTE_MOUNTED , this.headerTypeBlack , this.indexViewSubNavi);
        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_ERROR, this.onError_validation);
            EventBus.$off(EventBus.CHECK_VALIDATION_COMPLETE, this.onComplete_validation);
        },

        methods: {
            // 페이지 트래킹
            setPageTracking : function(){
                var pageName = 'page_creator_apply';
                window.Tracking.send_pageView(pageName);
            },
            // 제출하기 버튼 눌렀을 때
            onClick_submit : function(){
                //console.log('on click submit');
                this.applyCompleteNum = 0;
                EventBus.$emit(EventBus.CHECK_VALIDATION);
            },
            // 서버에 데이터 전송
            setData : function(){
                var data = {
                    "agree":this.apply_data[this.CHECK_INDEX_0_AGREE],
                    "name":this.apply_data[this.CHECK_INDEX_1_NAME],
                    "gender":this.apply_data[this.CHECK_INDEX_2_GENDER],
                    "birthday":this.apply_data[this.CHECK_INDEX_3_BIRTHDAY],
                    "tel":this.apply_data[this.CHECK_INDEX_4_TEL],
                    "email":this.apply_data[this.CHECK_INDEX_5_EMAIL],
                    "channel":this.apply_data[this.CHECK_INDEX_6_CHANNEL],
                    "category":this.apply_data[this.CHECK_INDEX_7_CHANNEL_CATEGORY],
                    "platform":this.apply_data[this.CHECK_INDEX_8_PLATFORM],
                    "introduction":this.apply_data[this.CHECK_INDEX_9_INTRODUCTION],
                    "g-recaptcha-response": this.apply_data[this.CHECK_INDEX_10_RECAPTCHA],
                    "title": this.apply_data[this.CHECK_INDEX_11_CHANNEL_TITLE]
                };
                console.log('data : ' , data);
                var url = window.GlobalPreset.JSON_URL.CATE_60_SET_CREATOR_APPLY;
                window.DF.utils.getJsonData(url,  data, this.setDataComplete, 'post');
            },
            // 서버 데이터 전송 완료
            setDataComplete : function(){
                alert("지원하기가 완료되었습니다!\n" +
                    "보내주신 내용은 직원들이 꼼꼼하게 검토 후 이메일 또는 연락처로 연락 드리겠습니다.\n" +
                    "지원해 주셔서 감사합니다.");
                EventBus.$emit(EventBus.RESET_FORM);
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            },
            // 에러 중 가장 먼저 발생한 위치 체크
            onError_validation : function(index){
                var tempIndex = (index < 2)?index:index-1;

                if(this.errorFocusNum > tempIndex){
                    this.errorFocusNum = tempIndex;
                }

                this.stopTimer();
                this.startTimer();
            },
            // 에러 중 가장 먼저 발생한 위치로 이동
            setFocus_form : function(){
                this.stopTimer();

                var rect = document.querySelectorAll('.js-focus-form')[this.errorFocusNum].getBoundingClientRect();
                var ty = DF.utils.getScrollPosY() + rect.top;

                $('html, body').stop().animate({
                    scrollTop: ty
                }, 400);
                this.errorFocusNum = 100;
            },
            // 타이머 시작
            startTimer : function(){
                this.timer = window.setInterval(this.setFocus_form, 200)
            },
            // 타이머 정지
            stopTimer : function(){
                window.clearInterval(this.timer);
            },

            leave : function(el,done) {
                EventBus.$emit(EventBus.PAGE_TRANSITION_START);
            },
            afterLeave : function(el){

                EventBus.$emit(EventBus.PAGE_TRANSITION_END);
            },
            // 밸레이데이션 체크 완료된 값 저장하기
            onComplete_validation : function(check_index, val){
                this.apply_data[check_index] = val;
                console.log('apply_data : ',this.apply_data)
                console.log('check_index : ',check_index)
                this.applyCompleteNum++;

                if(this.applyLen==this.applyCompleteNum){
                    this.setData();
                }
            }
        },
        mixins: [scroll_mixin],
        components: {
            'component-form-agree':form_agree
            ,'component-form-name-gender':form_name_gender
            ,'component-form-brithday':form_birthday
            ,'component-form-tel':form_tel
            ,'component-form-email':form_email
            ,'component-form-channel':form_channel
            ,'component-form-channel-category':form_channel_category
            ,'component-form-platform':form_platform
            ,'component-form-content':form_content
            ,'component-form-recaptcha':form_recaptcha
        }

    }
</script>
