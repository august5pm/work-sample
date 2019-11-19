<template>
    <li class="col-2"> <!-- col-2, col-3 -->
        <dl class="inp-name-wrap">
            <dt><label for="form_name">이름</label></dt>
            <dd>
                <input type="text" id="form_name" name="form_name" title="이름을 작성해주세요." placeholder="이름을 작성해주세요." class="inp-field" @focusout="onFocusOut_name">
                <p class="alert-holder" :class="isError_name?'on':''">필수 입력 정보입니다.</p> <!--활성화클래스 : on-->
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
                isError_name : false
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
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.onCheck_name(true);
            },

            // 이름 체크
            onCheck_name : function(isEmit){
                var val = document.getElementById('form_name').value;
                if(val == ''){
                    // error
                    this.isError_name = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    // 성공
                    this.isError_name = false;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val)
                }
            },

            // 포커스 아웃
            onFocusOut_name : function(){
                this.onCheck_name(false);
            }
        },

        components: {

        },
    }
</script>
