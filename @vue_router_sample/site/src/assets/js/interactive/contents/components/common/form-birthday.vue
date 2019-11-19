<template>
    <li>
        <dl class="inp-birth-wrap">
            <dt><label for="form_birth_year">생년월일</label></dt>
            <dd class="col-3"> <!-- col-2, col-3 -->
                <input type="text" id="form_birth_year" name="form_birth" title="생년월일을 입력해주세요." placeholder="년 (4자)" class="inp-field inp-birth-year" maxlength="4" @focusout="onFocusout">
                <select id="form_birth_month" class="inp-field inp-birth-month" title="" @change="onFocusout">
                    <option value="0">월</option>
                    <option value="1">1월</option>
                    <option value="2">2월</option>
                    <option value="3">3월</option>
                    <option value="4">4월</option>
                    <option value="5">5월</option>
                    <option value="6">6월</option>
                    <option value="7">7월</option>
                    <option value="8">8월</option>
                    <option value="9">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                </select>
                <input type="text" id="form_birth_day" name="form_birth" title="" placeholder="일" class="inp-field inp-birth-day" maxlength="2" @focusout="onFocusout">
                <p class="alert-holder" :class="isError?'on':''">생년월일을 정확히 입력해주세요.</p>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-birthday",
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
                dateObj : ""
            }
        },


        created: function () {
            this.dateObj = new Date();
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
            // 폼 리셋
            onReset_form : function(){
                this.isError = false;
                document.getElementById('form_birth_year').value = "";

                document.getElementById('form_birth_month').getElementsByTagName('option')[0].selected = 'selected'
                document.getElementById('form_birth_month').value = 0;

                document.getElementById('form_birth_day').value = "";
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;

                this.checkYear();
                this.checkMonth();
                this.checkDay();
                this.checkError();
            },

            // 년도 체크
            checkYear : function(){
                var ele = document.getElementById('form_birth_year');
                var val = ele.value;
                var minAge = 0;
                var maxAge = 100;
                var age = (this.dateObj.getFullYear() - parseInt(val))+1;
                if(val == ""){
                    // 값 유무 체크
                    this.isError = true;
                }else if(!DF.validator.only_number(val)){
                    // 숫자여부 체크
                    this.isError = true;
                }else if(age<minAge || age>maxAge){
                    // 년도 체크
                    this.isError = true;
                }
            },

            // 월 체크
            checkMonth : function(){
                var ele = document.getElementById('form_birth_month');
                var val = parseInt(ele.value);
                if(val == 0){
                    this.isError = true;
                }
            },

            // 일 체크
            checkDay : function(){
                var year = parseInt(document.getElementById('form_birth_year').value);
                var month = parseInt(document.getElementById('form_birth_month').value);
                var lastDay = this.getLastDay(year, month);

                var ele = document.getElementById('form_birth_day');
                var val = ele.value;
                if(val == ""){
                    // 값 유무 체크
                    this.isError = true;
                }else if(!DF.validator.only_number(val)){
                    // 숫자여부 체크
                    this.isError = true;
                }else if(parseInt(val)<1 || parseInt(val)>lastDay){
                    // 1일 부터 해당 년도 월의 마지막 일 체크
                    this.isError = true;
                }
            },

            // 해당 년도, 월의 마지막 날 가져오기
            getLastDay : function(year, month){
                var lastDate = new Date(year, month, "");
                return lastDate.getDate();
            },

            // 에러가 있었는지 체크
            checkError : function(){
                if(this.isError) {
                    EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.onComplete_validation();
                }
            },

            // 밸리데이션 완료
            onComplete_validation : function(){
                var year = document.getElementById('form_birth_year').value;
                var month = document.getElementById('form_birth_month').value;
                var day = document.getElementById('form_birth_day').value;
                var val = year+'-'+month+'-'+day

                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val)
            },

            // focus 아웃시 밸리데이션 체크
            onCheck_birthday : function(){
                this.isError = false;
                this.checkYear();
                this.checkMonth();
                this.checkDay();
            },

            // 포커스 아웃
            onFocusout : function(){
                var yearVal = document.getElementById('form_birth_year').value;
                var monthVal = parseInt(document.getElementById('form_birth_month').value);
                var dayVal = document.getElementById('form_birth_day').value;

                if(yearVal != '' && monthVal != 0 && dayVal != ''){
                    this.onCheck_birthday();
                }

            }
        },

        components: {

        }
    }
</script>
