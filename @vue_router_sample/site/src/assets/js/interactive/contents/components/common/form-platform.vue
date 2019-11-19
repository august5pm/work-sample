<template>
    <li>
        <dl class="inp-add-chn-wrap">
            <dt><label>Youtube 외 추가로 운영 중인 플랫폼 (선택)</label></dt>
            <dd class="col-3" v-for="(list, index) in listNum" :key="index" :class="(index > 0)?'add-chn':''">
                <select :id="'form_add_channel_'+index" class="inp-field inp-chn" title="">
                    <option value="facebook" selected="selected">Facebook</option>
                    <option value="twitch">Twitch</option>
                    <option value="twitter">Twitter</option>
                    <option value="africa">Africa</option>
                    <option value="instagram">Instagram</option>
                </select>
                <input type="text" :id="'form_add_channel_url_'+index" name="form_add_channel" title="운영 중인 플랫폼 URL을 작성해주세요." placeholder="운영 중인 플랫폼 URL을 작성해주세요." class="inp-field inp-chn-url">
                <button type="button" class="btn-cta btn-type-square" @click.stop.prevent="onClick_plus"><span class="ico-plus"></span></button>
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-platform",
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
                listNum : 1
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
                for(var i=0; i<this.listNum; i++){
                    var id = "form_add_channel_"+i;
                    document.getElementById(id).getElementsByTagName('option')[0].selected = 'selected'

                    var id_url = "form_add_channel_url_"+i;
                    document.getElementById(id_url).value = "";
                }
                this.listNum = 1;
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.onComplete_validation();
            },

            // 추가버튼 클릭시
            onClick_plus : function(){
                this.listNum++;
            },

            // 밸리데이션 체크 완료
            onComplete_validation : function(){
                var len = this.listNum;
                var data = {}

                for(var i=0; i<len; i++){
                    var platform_id = 'form_add_channel_'+i;
                    var platform_ele = document.getElementById(platform_id);
                    var platform_val = platform_ele.value;

                    var url_id = 'form_add_channel_url_'+i;
                    var url_ele = document.getElementById(url_id);
                    var url_val = url_ele.value;

                    if(url_ele.value != ''){
                        data[platform_val] = url_val;
                    }
                }

                EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, data);
            }
        },

        components: {

        }
    }
</script>
