<template>
    <li>
        <dl>
            <dt><b>{{title}}</b></dt>
            <dd>
                <textarea name="textarea" id="form_info" rows="10" cols="50" :placeholder="placeholder" class="noresize" @focusout="onFocusOut"></textarea>
                <p class="alert-holder" :class="isError?'on':''">{{errorMessage}}<!--100자 이상의 내용을 입력해주세요.--></p>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-content",
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
            },

            title : {
                type: String,
                default: function () {
                    return "";// 기본값
                }
            },

            placeholder : {
                type: String,
                default: function () {
                    return "";// 기본값
                }
            }
        },

        data: function () {
            return {
                isError : false,
                errorMessage : '',
                ERROR_MESSAGE_DEFAULT : '필수 입력 정보입니다.',
                ERROR_MESSAGE_FORM : '100자 이상의 내용을 입력해주세요.',
            }
        },


        beforeCreate: function () {

        },

        created : function(){
            EventBus.$on(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$on(EventBus.RESET_FORM, this.onReset_form);
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
                document.getElementById('form_info').value = "";
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;
                this.checkInfo();
                this.checkError();
            },

            // 컨텐츠 내용 체크
            checkInfo : function(){
                var ele = document.getElementById('form_info');
                var val = ele.value;
                var minLen = 100;

                this.errorMessage = this.ERROR_MESSAGE_DEFAULT;

                if(val == ''){
                    this.isError = true;
                }else if(val.length < minLen){
                    this.errorMessage = this.ERROR_MESSAGE_FORM;
                    this.isError = true;
                }
            },

            // 에러 유무 체크
            checkError : function(){
                if(this.isError){
                    this.isError = true;
                    EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.isError = false;
                    this.onComplete_validation();
                }
            },

            // 밸리데이션 체크 완료
            onComplete_validation : function(){
                var val = document.getElementById('form_info').value;
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val);
            },

            // 포커스 아웃
            onFocusOut : function(){
                this.isError = false;
                this.checkInfo();
            }

        },

        components: {

        }
    }
</script>
