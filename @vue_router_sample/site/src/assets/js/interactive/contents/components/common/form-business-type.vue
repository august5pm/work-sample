<template>
    <li>
        <dl class="inp-business_type-wrap">
            <dt><label for="form_business_type">사업 형태</label></dt>
            <dd>
                <input type="text" id="form_business_type" name="form_business_type" title="문의하시는 IP 사업의 형태를 작성해주세요." placeholder="문의하시는 IP 사업의 형태를 작성해주세요." class="inp-field" required="required" @focusout="onFocusOut">
                <p class="alert-holder" :class="isError?'on':''">{{errorMessage}}<!--필수 입력 정보입니다.--></p>
            </dd>
        </dl>
        <span class="add-desc">* IP 사업 형태 : MD 라이센싱, OEM/ODM, 유통, 디지털 라이센싱, 게임 개발/콜라보레이션, 음성/음원, 방송 출연, 영상 제작/공급</span>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-business-type",
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
                document.getElementById('form_business_type').value = "";
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;
                this.checkInfo();
                this.checkError();
            },

            // 컨텐츠 내용 체크
            checkInfo : function(){
                var ele = document.getElementById('form_business_type');
                var val = ele.value;

                this.errorMessage = this.ERROR_MESSAGE_DEFAULT;

                if(val == ''){
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
                var val = document.getElementById('form_business_type').value;
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
