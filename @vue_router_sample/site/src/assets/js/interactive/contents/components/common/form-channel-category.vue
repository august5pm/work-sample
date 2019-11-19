<template>
    <li>
        <dl class="inp-chn-category-wrap">
            <dt><label for="form_channel_category">채널 카테고리</label></dt>
            <dd class="col-3">
                <select id="form_channel_category" class="inp-field inp-chn-category" title="운영하고 있는 채널의 주요 카테고리를 선택해주세요." @change="onChange_select">
                    <option value="" disabled selected>운영하고 있는 채널의 주요 카테고리를 선택해주세요.</option>
                    <option value="게임">게임</option>
                    <option value="키즈">키즈</option>
                    <option value="먹방">먹방</option>
                    <option value="예능">예능</option>
                    <option value="일상">일상</option>
                    <option value="취미">취미</option>
                    <option value="기타">기타</option>
                </select>
                <p class="alert-holder" :class="isError?'on':''">필수 입력 정보입니다.</p>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-channel-category",
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
                isError : false
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
                document.getElementById('form_channel_category').getElementsByTagName('option')[0].selected = 'selected'
                document.getElementById('form_channel_category').value = 0;
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.isError = false;
                this.checkChannelCategory();
                this.checkError();
            },

            // 채널 카테고리 체크
            checkChannelCategory : function(){
                var ele = document.getElementById('form_channel_category');
                var val = ele.value;

                if(val == ''){
                    this.isError = true;
                }else{
                    this.isError = false;
                }
            },

            // 셀렉트 변경시
            onChange_select : function(){
                this.checkChannelCategory();
            },

            // 에러 유무 체크
            checkError : function(){
                if(this.isError) {
                    EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.onComplete_validation();
                }
            },

            // 밸리데이션 체크 완료
            onComplete_validation : function(){
                var val = document.getElementById('form_channel_category').value;
                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, val);
            }
        },

        components: {

        },
    }
</script>
