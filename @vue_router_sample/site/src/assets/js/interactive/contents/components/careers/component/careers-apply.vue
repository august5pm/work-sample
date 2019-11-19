<template>
   <!-- <div id="container" class="careers-apply">-->
        <div id="content-sb">
            <div id="con-sb" class="con">

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
                            <div class="content-tit-wrap tit-type-half-line type-black type-kr">
                                <h2 class="txt-tit motion">
                                    <span class="txt">
                                        지원 양식 작성
                                        <span class="half-line"></span>
                                    </span>
                                </h2>
                            </div>
                            <form-agree-august v-if="jobGroup_index==0" :index="CHECK_INDEX_0_AGREE" :class="'js-focus-form'" :alert="'개인정보 수집 및 이용약관에 동의하셔야 지원이 가능합니다.'"></form-agree-august>
                            <form-agree-creator v-else :index="CHECK_INDEX_0_AGREE" :class="'js-focus-form'" :alert="'개인정보 수집 및 이용약관에 동의하셔야 지원이 가능합니다.'"></form-agree-creator>
                        </div>
                    </div>

                    <div class="content-wrap apply-terms-write">
                        <div class="inner-content-wrap">
                            <div class="terms-form-wrap">
                                <form id="form_2" class="form-group" action="/">
                                    <fieldset>
                                        <legend class="blind">지원양식 작성 부분</legend>
                                        <ul class="inp-list">
                                            <!-- 지원 직무 -->
                                            <form-job :job="detailData.job" :job_group="this.jobGroup"></form-job>
                                            <!-- 이름 -->
                                            <form-name :index="CHECK_INDEX_1_NAME" :class="'js-focus-form'"></form-name>
                                            <!-- 생일 -->
                                            <form-birthday :index="CHECK_INDEX_2_BIRTHDAY" :class="'js-focus-form'"></form-birthday>
                                            <!-- 연락처 -->
                                            <form-tel :index="CHECK_INDEX_3_TEL" :class="'js-focus-form'"></form-tel>
                                            <!-- 이메일 -->
                                            <form-email :index="CHECK_INDEX_4_EMAIL" :class="'js-focus-form'"></form-email>
                                            <!-- 자기소개 -->
                                            <!--<form-content :index="CHECK_INDEX_5_CONTENT" :class="'js-focus-form'" :title="'자기 소개'" :placeholder="'에 전달하고 싶은 자기소개를 자유롭게 작성해 주세요.'"></form-content> -->
                                            <!-- 파일 업로드 1 -->
                                            <form-file :index="CHECK_INDEX_6_FILE_1" :placeholder="'이력서 및 자기소개서 파일을 첨부해주세요.'" :isNote="false" :isTitle="true" :class="'js-focus-form'" :isValidation="true"></form-file>
                                            <!-- 파일 업로드 2 -->
                                            <form-file :index="CHECK_INDEX_7_FILE_2" :placeholder="'포트폴리오가 있는 경우, 파일을 첨부해주세요.'" :isNote="true" :class="'js-focus-form'"></form-file>
                                            <!-- 로봇 방지 폼 -->
                                            <form-recaptcha :index="CHECK_INDEX_8_RECAPTCHA" :class="'js-focus-form'"></form-recaptcha>
                                        </ul>

                                        <div class="btn-wrap align-c">
                                            <button type="submit" class="btn-cta btn-type-box btn-type-wide btn-type-black"  @click.stop.prevent="onClick_submit"><span class="btn-txt">지원하기</span></button>
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
    <!--</div>-->
</template>

<script>
    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';
    import $ from 'jquery';

    import form_agree_august from '../../../components/common/form-agree-careers-apply-august';
    import form_agree_creator from '../../../components/common/form-agree-careers-apply-creator';
    import form_job from '../../../components/common/form-job';
    import form_name from '../../../components/common/form-name';
    import form_birthday from '../../../components/common/form-birthday';
    import form_tel from '../../../components/common/form-tel';
    import form_email from '../../../components/common/form-email';
    import form_content from '../../../components/common/form-content';
    import form_file from '../../../components/common/form-file';
    import form_recaptcha from '../../../components/common/form-recaptcha'

    export default {
        name: "careers-apply",
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
                detailData : {},
                loader : '',

                check_index : -1,
                CHECK_INDEX_0_AGREE : 0,
                CHECK_INDEX_1_NAME : 1,
                CHECK_INDEX_2_BIRTHDAY : 2,
                CHECK_INDEX_3_TEL : 3,
                CHECK_INDEX_4_EMAIL : 4,
                //CHECK_INDEX_5_CONTENT : 5,
                CHECK_INDEX_6_FILE_1 : 6,
                CHECK_INDEX_7_FILE_2 : 7,
                CHECK_INDEX_8_RECAPTCHA : 8,

                timer : "",
                errorFocusNum : 100,
                apply_data : [],
                applyCompleteNum : 0,
                applyLen : 8,

                jobGroup : '',
                jobGroup_index : -1,

                isTrans : false
            }
        },

        beforeRouteEnter (to, from, next) {
            //console.log('before--------careers > apply')
            EventBus.$once(EventBus.JSON_LOAD_COMPLETE, function(json){
                next(vm => {
                    // `vm`을 통한 컴포넌트 인스턴스 접근
                    vm.getDataComplete(json);
                })
            });
            var url = window.GlobalPreset.JSON_URL.GET_DATA_CONTENTS+'?idx='+to.params.id
            to.matched[0].components.default.methods.getData(url);
        },

        beforeCreate: function () {

        },

        created : function(){
            this.setMeta();

            EventBus.$on(EventBus.PAGE_TRANSITION_START, this.pageTransitionStart);
            EventBus.$on(EventBus.PAGE_TRANSITION_END, this.pageTransitionEnd);

            EventBus.$on(EventBus.CHECK_ERROR, this.onError_validation);
            EventBus.$on(EventBus.CHECK_VALIDATION_COMPLETE, this.onComplete_validation);
            EventBus.$on(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);

            var augustPath = window.GlobalVars.CATE_410_CAREERS_AUGUST;
            var creatorPath = window.GlobalVars.CATE_420_CAREERS_CREATOR;
            if(this.$route.path.split('/')[2] == augustPath.split('/')[2]){
                this.jobGroup = ' 내부 채용';
                this.jobGroup_index = 0;
            }else{
                this.jobGroup = '크리에이터 개별 채용';
                this.jobGroup_index = 1;
            }


            this.loader = new loaderJson();
            this.getData();
        },

        mounted: function () {
            this.setPageTracking();
        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_ERROR, this.onError_validation);
            EventBus.$off(EventBus.CHECK_VALIDATION_COMPLETE, this.onComplete_validation);
            EventBus.$off(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);

            EventBus.$off(EventBus.PAGE_TRANSITION_START, this.pageTransitionStart);
            EventBus.$off(EventBus.PAGE_TRANSITION_END, this.pageTransitionEnd);
        },

        methods: {
            // 메타데이터 넣기
            setMeta : function(){
                EventBus.$emit(EventBus.CHANGE_METADATA, "careers_apply")
            },

            // 페이지 트래킹
            setPageTracking : function(){
                var pageName = 'page_recruit_apply_'+this.$route.params.id;
                window.Tracking.send_pageView(pageName);
            },

            // 페이지 트랜지션 시작
            pageTransitionStart : function(){
                this.isTrans = true;
            },

            // 페이지 트랜지션 완료
            pageTransitionEnd : function(){
                this.isTrans = false;
            },

            // 제출하기 버튼 눌렀을 때
            onClick_submit : function(){
                console.log('on click submit');
                this.applyCompleteNum = 0;
                EventBus.$emit(EventBus.CHECK_VALIDATION);
            },

            // 데이터 가져오기
            getData : function(){
                var cate = this.$route.path.split('/')[2];
                var url = window.GlobalPreset.JSON_URL.CATE_40_GET_CAREERS_AUGUST_DETAIL+"?cate="+cate+"&idx="+this.$route.params.id;
                this.loader.loadJsonData(url, this._uid);
            },

            // 데이터 가져오기 완료
            getDataComplete : function (json, uid) {
                if(this._uid == uid){
                    this.detailData = json.careers.detail;
                    if(this.detailData == null){
                        var errorPath = window.GlobalVars.CATE_900_ERROR;
                        this.$router.push(errorPath)
                    }
                }
            },

            // 서버에 데이터 전송
            setData : function(){
                var cate = this.$route.path.split('/')[2];

                var datas = new FormData();
                datas.append('type', cate);
                datas.append('idx', this.$route.params.id);
                datas.append('agree', this.apply_data[this.CHECK_INDEX_0_AGREE]);
                datas.append('name', this.apply_data[this.CHECK_INDEX_1_NAME]);
                datas.append('birthday', this.apply_data[this.CHECK_INDEX_2_BIRTHDAY]);
                datas.append('tel', this.apply_data[this.CHECK_INDEX_3_TEL]);
                datas.append('email', this.apply_data[this.CHECK_INDEX_4_EMAIL]);
                //datas.append('introduction', this.apply_data[this.CHECK_INDEX_5_CONTENT]);
                datas.append('attach1', this.apply_data[this.CHECK_INDEX_6_FILE_1]);
                datas.append('attach2', this.apply_data[this.CHECK_INDEX_7_FILE_2]);
                datas.append('g-recaptcha-response', this.apply_data[this.CHECK_INDEX_8_RECAPTCHA]);

                var url = window.GlobalPreset.JSON_URL.CATE_40_SET_CAREERS_APPLY;
                window.DF.utils.setFormJsonData(url,  datas, this.setDataComplete);
            },

            // 서버에 데이터 전송 완료
            setDataComplete : function(){
                alert("채용공고 '"+this.detailData.job+"'에 지원이 완료되었습니다!\n보내주신 내용은  직원들이 꼼꼼하게 검토 후\n이메일 또는 연락처로 연락 드리겠습니다.\n지원해 주셔서 감사합니다.");
                EventBus.$emit(EventBus.RESET_FORM);
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            },

            // 에러 중 가장 먼저 발생한 위치 체크
            onError_validation : function(index){
                //var tempIndex = (index < 2)?index:index-1;
                var tempIndex = index;

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

            // 밸레이데이션 체크 완료된 값 저장하기
            onComplete_validation : function(check_index, val){
                this.apply_data[check_index] = val;
                this.applyCompleteNum++
                console.log(this.applyLen,this.applyCompleteNum)

                if(this.applyLen==this.applyCompleteNum){
                    this.setData();
                }
            }
        },

        components: {
            'form-agree-august':form_agree_august
            ,'form-agree-creator':form_agree_creator
            ,'form-job':form_job
            ,'form-name':form_name
            ,'form-birthday':form_birthday
            ,'form-tel':form_tel
            ,'form-email':form_email
            ,'form-content':form_content
            ,'form-file':form_file
            ,'form-recaptcha':form_recaptcha
        }
    }
</script>
