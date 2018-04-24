
<!-- template -->
<template>

    <div class="box-line-cross-bul type-btm sec-tit-top">
        <p class="tit-type-bul">부품 가격 및 취급 정보</p>
        <form id="form_search" action="/">
            <fieldset class="search-wrap">
                <legend>부품 가격 검색하기</legend>
                <p class="sch-title">부품 가격을 쉽고 편리하게 조회 가능합니다.</p>
                <div class="sch-select-wrap">
                    <div class="form-group">
                        <div :class="['select-wrap', (alert_msg_model!='')?'selected-none':'']">
                            <select id="js-selectbox-model" :title="ALERT_MSG_PART_PRICE_MODEL" @change="onChange_model">
                                <option value="">모델</option>
                                <!--option value="">모델-1</option>
                                <option value="">모델-2</option-->
                                <option v-for="model in contentsdata.model.lists" :value="model.code">{{model.text}}</option>
                            </select>
                            <p class="alert-holder" v-if="alert_msg_model != ''">{{alert_msg_model}}</p>
                        </div>
                        <div :class="['select-wrap', (alert_msg_year!='')?'selected-none':'']">
                            <select id="js-selectbox-year" :title="ALERT_MSG_PART_PRICE_YEAR" @change="onChange_year">
                                <option value="">연식</option>
                                <!--option value="">연식-1</option>
                                <option value="">연식-2</option-->
                                <option v-if="selectedModelIndex != -1" v-for="year in yeardata.lists" :value="year.code">{{year.text}}</option>
                            </select>
                            <p class="alert-holder" v-if="alert_msg_year!=''">{{alert_msg_year}}</p>
                        </div>
                        <div class="btn-search-wrap">
                            <input type="text" id="js-txfield-part" placeholder="부품명" title="검색하고자 하는 단어를 입력하세요">
                            <input type="submit" value="검색 버튼" @click.stop.prevent="onClick_search">
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>

</template>


<!-- script -->
<script>
    import { EventBus } from '../../common/event-bus.js';
    import { AppConsts } from '../../../frame/AppConsts';
    export default {
        props: {
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        data: function() {
            return {
                ALERT_MSG_PART_PRICE_MODEL :"검색할 모델을 선택하세요.",
                ALERT_MSG_PART_PRICE_YEAR :"모델의 연식을 선택하세요.",

                alert_msg_model : "",
                alert_msg_year : "",

                selectedModelIndex : -1,
                yeardata : {},
                isCheckedAll : false
            }
        },

        beforeMount : function(){
            this.ALERT_MSG_PART_PRICE_MODEL = AppConsts.ALERT.MSG_PART_PRICE_MODEL;
            this.ALERT_MSG_PART_PRICE_YEAR = AppConsts.ALERT.MSG_PART_PRICE_YEAR;
        },

        methods:{
            onChange_model : function(){
                this.selectedModelIndex = (event.currentTarget || event.srcElement).selectedIndex-1;
                if(this.selectedModelIndex != -1){
                    this.yeardata = this.contentsdata.model.lists[this.selectedModelIndex].year
                    document.getElementById('js-selectbox-year').selectedIndex = 0;
                }
                this.checkModelVal();
            },

            onChange_year : function(){
                this.checkYearVal();
            },

            onClick_search : function(){
                this.isCheckedAll = true;
                this.checkVal();
                if(this.isCheckedAll){
                    this.onSearch();
                }
            },

            checkVal : function(){
                this.checkModelVal();
                this.checkYearVal();
            },

            checkModelVal : function(){
                let modelVal = document.getElementById('js-selectbox-model').value;
                if(modelVal == ""){
                    this.isCheckedAll = false;
                    this.alert_msg_model = this.ALERT_MSG_PART_PRICE_MODEL
                }else{
                    this.alert_msg_model = ""
                }
            },

            checkYearVal : function(){
                let yearVal = document.getElementById('js-selectbox-year').value;
                if(yearVal == ""){
                    this.isCheckedAll = false;
                    this.alert_msg_year = this.ALERT_MSG_PART_PRICE_YEAR
                }else{
                    this.alert_msg_year = ""
                }
            },

            onSearch : function(){
                let currentPage = 1;
                let modelVal = document.getElementById('js-selectbox-model').value;
                let yearVal = document.getElementById('js-selectbox-year').value;
                let partVal = document.getElementById('js-txfield-part').value;

                EventBus.$emit(EventBus.ON_SEARCH, currentPage, modelVal, yearVal, partVal);
            }
        }
    }
</script>










