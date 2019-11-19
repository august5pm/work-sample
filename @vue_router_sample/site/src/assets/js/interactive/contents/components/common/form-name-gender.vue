<template>
    <li class="col-2"> <!-- col-2, col-3 -->
        <dl class="inp-name-wrap">
            <dt><label for="form_name">이름</label></dt>
            <dd>
                <input type="text" id="form_name" name="form_name" title="실명을 작성해주세요." placeholder="실명을 작성해주세요." class="inp-field" @focusout="onFocusOut_name">
                <p class="alert-holder" :class="isError_name?'on':''">필수 입력 정보입니다.</p> <!--활성화클래스 : on-->
            </dd>
        </dl>
        <dl class="inp-gender-wrap">
            <dt><b>성별</b></dt>
            <dd class="custom-rdo">
                <input type="radio" id="rdo-gender-1" name="rdo-gender" @change="onChange_gender">
                <label for="rdo-gender-1" class=""><span>남자</span></label>
                <input type="radio" id="rdo-gender-2" name="rdo-gender" @change="onChange_gender">
                <label for="rdo-gender-2" class=""><span>여자</span></label>
                <p class="alert-holder" :class="isError_gender?'on':''">필수 입력 정보입니다.</p>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    export default {
        name: "form-name-gender",
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

            gender_index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            }
        },

        data: function () {
            return {
                isError : false,
                isError_name : false,
                isError_gender : false
            }
        },


        created: function () {
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

                this.isError_gender = false;
                //document.getElementById('rdo-gender').value = "";
                var rdoBtn = document.getElementsByName('rdo-gender')
                for(var i=0; i<rdoBtn.length; i++){
                    rdoBtn[i].checked = false;
                }
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.onCheck_name(true);
                this.onCheck_gender(true);
            },

            // 이름 체크
            onCheck_name : function(isEmit){
                var val = document.getElementById('form_name').value;

                if(val == ''){
                    // error
                    this.isError_name = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.name_index);
                }else if(window.DF.validator.blank(val)){
                    // error
                    this.isError_name = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.name_index);
                }else{
                    // 성공
                    this.isError_name = false;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.name_index, val)
                }
            },

            // 성별 체크
            onCheck_gender : function(isEmit){
                var isChecked = false;
                var checkIndex = -1;
                var checkValue = '';
                var rdoBtn = document.getElementsByName('rdo-gender')
                for(var i=0; i<rdoBtn.length; i++){
                    if(rdoBtn[i].checked){
                        isChecked = true;
                        checkValue = (i==0)?'M':'F'
                        checkIndex = i;
                    }
                }

                if(!isChecked) {
                    // error
                    this.isError_gender = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.gender_index);
                }else{
                    // 성공
                    this.isError_gender = false;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.gender_index, checkValue)
                }
            },

            // 이름에서 포커스 아웃 했을 경우
            onFocusOut_name : function(){
                this.onCheck_name(false);
            },

            // 성별에서 포커스 아웃 했을 경우
            onChange_gender : function(){
                this.onCheck_gender(false);
            }
        },

        components: {

        }
    }
</script>
