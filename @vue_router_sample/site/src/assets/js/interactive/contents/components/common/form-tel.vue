<template>
    <li>
        <dl class="inp-tel-wrap">
            <dt><label for="form_tel">연락처</label></dt>
            <dd>
                <input type="text" id="form_tel" name="form_tel" title="연락처를 입력해주세요." placeholder="연락 가능한 전화번호 또는 핸드폰 번호를 작성해주세요." class="inp-field" maxlength="11" @focusout="onFocusOut">
                <p class="alert-holder" :class="isError?'on':''">{{errorMessage}}<!--필수 입력 정보입니다.--></p>
            </dd>
        </dl>
        <span class="add-desc">* ‘-’를 제외하고 작성해주세요</span>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-tel",
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
                ERROR_MESSAGE_FORM : '형식에 맞지 않는 번호입니다.',
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
            onReset_form : function(){
                this.isError = false;
                document.getElementById('form_tel').value = "";
            },

            onCheck_validation : function(){
                this.isError = false;
                this.checkTel();
                this.checkError();
            },

            checkTel : function(){
                var ele = document.getElementById('form_tel');
                var val = ele.value;

                this.errorMessage = this.ERROR_MESSAGE_DEFAULT;

                if(val == ""){
                    // 값 유무 체크
                    this.isError = true;
                }else if(!DF.validator.phone_only_number(val)){
                    // 숫자여부 체크
                    this.errorMessage = this.ERROR_MESSAGE_FORM;
                    this.isError = true;
                }
            },

            checkError : function(){
                if(this.isError){
                    EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.onComplete_validation();
                }
            },

            onComplete_validation : function(){
                var val = document.getElementById('form_tel').value;
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val);
            },

            onFocusOut : function(){
                this.isError = false;
                this.checkTel();
            }
        },

        components: {

        }
    }
</script>
