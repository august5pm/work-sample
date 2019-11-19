<template>
    <li>
        <dl class="inp-chn-wrap">
            <dt><label for="form_channel">Youtube 운영 채널</label></dt>
            <dd class="col-2">
                <input type="text" id="form_channel" name="form_channel" title="유투브 채널의 url을 입력해주세요." placeholder="구글계정을 통하여 채널 URL이 자동으로 입력됩니다." class="inp-field" disabled>
                <button type="button" id="form_google_login" class="btn-cta btn-type-square btn-g-login"><span>G LOGIN</span></button>
                <p class="alert-holder" :class="isError?'on':''">필수 입력 정보입니다.</p>
            </dd>
        </dl>
        <span class="add-desc">* 해당 정보는 본인 채널 여부 및 기타 지표 확인을 위해서 사용되며, 자동 가입 등의 절차로 연결되지 않습니다.</span>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    import $ from 'jquery';



    export default {
        name: "form-channel",
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

            title_index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            }
        },

        data: function () {
            return {
                googleUser: {},
                auth2: {},
                isError : false,
                isLogin : false,
            }
        },


        created: function () {
            EventBus.$on(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$on(EventBus.RESET_FORM, this.onReset_form);
        },

        mounted: function () {
            var ele = document.getElementById('form_google_login')
            var input = document.getElementById('form_channel')
            console.log('index2 : ',this.title_index,' / ',this.index)
            window.oauth2.init(ele, input)
        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$off(EventBus.RESET_FORM, this.onReset_form);
        },

        methods: {
            // 폼 초기화
            onReset_form : function(){
                this.isError = false;
                this.isLogin = false;
                document.getElementById('form_channel').value = "";
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;
                this.checkChannel();
                this.checkError();
            },

            // 채널정보 체크
            checkChannel : function(){
                var ele = document.getElementById('form_channel');
                var val = ele.value;
                if(val == ''){
                    this.isError = true;
                }else if(!window.DF.validator.url(val)){
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

            // 밸리데이션 체크 완료시
            onComplete_validation : function(){
                var val = document.getElementById('form_channel').value;
                var val2 = document.getElementById('form_channel').title;
                //console.log('validation : ',val,val2)
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val);
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.title_index, val2);
            },

            // 포커스 아웃
            onFocusOut : function(){
                this.isError = false;
                this.checkChannel();
            }
        },

        components: {

        }
    }
</script>
