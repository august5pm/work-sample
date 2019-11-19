<template>
    <li>
        <dl class="inp-mail-wrap">
            <dt><label for="form_mail">이메일</label></dt>
            <dd>
                <input type="email" id="form_mail" name="form_mail" title="이메일 주소를 입력해주세요" placeholder="이메일 주소를 입력해주세요." class="inp-field" required="required" @focusout="onFocusOut">
                <p class="alert-holder" :class="isError?'on':''">{{errorMessage}}<!--필수 입력 정보입니다.--></p>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-email",
        props: {
            itemdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            },

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
                errorMessage : '',
                ERROR_MESSAGE_DEFAULT : '필수 입력 정보입니다.',
                ERROR_MESSAGE_FORM : '형식에 맞지 않는 이메일입니다.',
            }
        },


        created: function () {
            EventBus.$on(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$on(EventBus.RESET_FORM, this.onReset_form);

            this.errorMessage = this.ERROR_MESSAGE_DEFAULT;
        },

        mounted: function () {

        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$off(EventBus.RESET_FORM, this.onReset_form);
        },

        methods: {
            // 폼 초기화
            onReset_form : function(){
                this.isError = false;
                document.getElementById('form_mail').value = "";
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;
                this.checkEmail();
                this.checkError();
            },

            // 이메일 체크
            checkEmail : function(){
                var ele = document.getElementById('form_mail');
                var val = ele.value;

                this.errorMessage = this.ERROR_MESSAGE_DEFAULT;

                if(val == ""){
                    this.isError = true;
                }else if(!window.DF.validator.email(val)){
                    this.errorMessage = this.ERROR_MESSAGE_FORM;
                    this.isError = true;
                }
            },

            // 에러 유무 체크
            checkError : function(){
                if(this.isError){
                    EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.onComplete_validation();
                }
            },

            // 밸리데이션 체크 완료
            onComplete_validation : function(){
                var val = document.getElementById('form_mail').value;
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val);
            },

            // 포커스 아웃
            onFocusOut : function(){
                this.isError = false;
                this.checkEmail();
            }
        },

        components: {

        }
    }
</script>
