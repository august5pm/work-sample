<template>
    <li>
        <dl class="inp-recaptcha-wrap">
            <dt class="blind">로봇방지체크박스</dt>
            <dd>
                <!-- 구글 reCAPTCHA	삽입 시작 -->
                <div id="g-recaptcha" class="g-recaptcha"></div>
                <!-- 구글 reCAPTCHA	삽입 종료 -->
                <p class="alert-holder" :class="isError?'on':''">스팸 로봇 방지 체크박스에 체크해 주세요.</p>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-recaptcha",
        props: {
            index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            }
        },

        data: function () {
            return {
                isError : false,
                timer :  ''
            }
        },


        created: function () {
            EventBus.$on(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$on(EventBus.RESET_FORM, this.onReset_form);
        },

        mounted: function () {

            /*var app = this;
            window.setTimeout(function(){
                app.setRecaptcha();
            },500)*/

            console.log('form-recaptcha mounted')
            this.startTimer();
        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$off(EventBus.RESET_FORM, this.onReset_form);
            this.stopTimer();
        },

        methods: {
            // 폼 초기화
            onReset_form : function(){
                grecaptcha.reset();
            },

            // 타이머 시작
            startTimer : function(){
                this.timer = window.setInterval(this.setRecaptcha,100);
            },

            // 타이머 정지
            stopTimer : function(){
                window.clearInterval(this.timer);
            },

            // 리캡챠가 렌더링 완료되었으면 셋팅해주기
            setRecaptcha : function(){
                if(grecaptcha.render != undefined){
                    this.stopTimer();
                    grecaptcha.render('g-recaptcha', {
                        'sitekey' : '6Ld1JJIUAAAAAKjxzEXB5z_OYV0jdF4FNzYFhLjn',
                        'callback' : this.verifyCallback
                    });
                }
            },

            // 완료
            verifyCallback : function(response){
                this.isError = false;
            },


            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;
                this.checkRecaptcha();
                this.checkError();
            },

            // 리캡챠 체크
            checkRecaptcha : function(){
                var	response = grecaptcha.getResponse();	// 인증	토큰값

                if (response.length	== 0) {
                    this.isError = true;

                }else{
                    this.isError = false;
                }
            },

            // 에러 유무 확인
            checkError : function(){
                if(this.isError){
                    EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.onComplete_validation();
                }
            },

            // 밸리데이션 체크 완료
            onComplete_validation : function(){
                var	response = grecaptcha.getResponse();
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, response);
            }
        },

        components: {

        }
    }
</script>
