<template>
    <li class="col-2"> <!-- col-2, col-3 -->
        <dl class="inp-name-wrap">
            <dt><label for="form_name">{{name_title}}</label></dt>
            <dd>
                <input type="text" id="form_name" name="form_name" :title="name_placeholder" :placeholder="name_placeholder" class="inp-field" @focusout="onFocusOut_name">
                <p class="alert-holder" :class="isError_name?'on':''">필수 입력 정보입니다.</p> <!--활성화클래스 : on-->
            </dd>
        </dl>
        <dl class="inp-comp-name-wrap">
            <dt><label for="form_company_name">기업(단체)명</label></dt>
            <dd>
                <input type="text" id="form_company_name" name="form_company_name" title="기업(단체)명을 작성해주세요." placeholder="기업(단체)명을 작성해주세요." class="inp-field" @focusout="onFocusOut_company">
                <p class="alert-holder" :class="isError_company?'on':''">필수 입력 정보입니다.</p> <!--활성화클래스 : on-->
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-name-company",
        props: {
            itemdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            },

            name_index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            },

            company_index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            },

            name_title : {
                type: String,
                default: function () {
                    return '';// 기본값
                }
            },

            name_placeholder : {
                type: String,
                default: function () {
                    return '';// 기본값
                }
            }
        },

        data: function () {
            return {
                isError : false,
                isError_name : false,
                isError_company : false
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
                this.isError_name = false;
                document.getElementById('form_name').value = "";

                this.isError_company = false;
                document.getElementById('form_company_name').value = "";
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.onCheck_name(true);
                this.onCheck_company(true);
            },

            // 이름 체크
            onCheck_name : function(isEmit){
                var val = document.getElementById('form_name').value;
                if(val == ''){
                    // error
                    this.isError_name = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.name_index);
                }else{
                    // 성공
                    this.isError_name = false;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.name_index, val)
                }
            },

            // 회사명 체크
            onCheck_company : function(isEmit){
                var val = document.getElementById('form_company_name').value;
                if(val == ''){
                    // error
                    this.isError_company = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.company_index);
                }else{
                    // 성공
                    this.isError_company = false;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.company_index, val)
                }
            },

            // 이름에서 포커스 아웃 했을 경우
            onFocusOut_name : function(){
                this.onCheck_name(false);
            },

            // 회사명에서 포커스 아웃 했을 경우
            onFocusOut_company : function(){
                this.onCheck_company(false);
            }
        },

        components: {

        },
    }
</script>
