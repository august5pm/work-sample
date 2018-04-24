
<!-- template -->
<template>
    <div id="el_content" class="content-detail">
        <section class="content-area container-1100 border-top">
            <component-service-part-price-contents-search :contentsdata="this.contentsdata"></component-service-part-price-contents-search>
            <component-service-part-price-contents-board :contentsdata="this.contentsdata" :responsedata="this.responsedata"></component-service-part-price-contents-board>
            <component-service-part-price-contents-manual :contentsdata="this.contentsdata"></component-service-part-price-contents-manual>
        </section>
    </div>
</template>


<!-- script -->
<script>
    import { AppConsts } from '../../../frame/AppConsts';
    import { EventBus } from '../../common/event-bus.js';
    import loaderJson from '../../common/loader-json'

    import contentSearch from './service-part-price-contents-search.vue';
    import contentBoard from './service-part-price-contents-board.vue';
    import contentManual from './service-part-price-contents-maual.vue';

    export default {
        props: {
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        data: function() {
            return {
                part_model : "",
                part_year : "",
                part_keyword : "",
                requestJson : "",
                responsedata:{}
            }
        },

        beforeMount: function(){
            let _this = this;
            this.requestJson = new loaderJson();
            EventBus.$on(EventBus.ON_SEARCH, function(current_page, part_model, part_year, part_keyword) {

                _this.requestData(current_page, part_model, part_year, part_keyword);
            });

            EventBus.$on(EventBus.DATA_REQUEST_COMPLETE, function(data) {
                _this.onComplete_requestData(data);
            });
        },

        methods:{
            requestData : function(current_page, part_model, part_year, part_keyword){
                if(part_model != undefined) this.part_model = part_model;
                if(part_year != undefined) this.part_year = part_year;
                if(part_keyword != undefined) this.part_keyword = part_keyword;

                let data = {
                    "page":current_page,
                    "part_model":this.part_model,
                    "part_year":this.part_year,
                    "part_keyword":encodeURIComponent(this.part_keyword)
                }

                let param = this.getParam(data);
                let requestUrl = this.contentsdata.submit_url+param;

                this.requestJson.requestJsonData(requestUrl);
            },

            onComplete_requestData : function(response){
                this.responsedata = response.result;
            },

            getParam : function(param){
                let num = 0;
                let temp = "";
                for (var item in param){
                    if(num==0){
                        temp = "?"+item+"="+param[item];
                    }else{
                        temp += "&"+item+"="+param[item];
                    }
                    num++
                }
                return temp
            }
        },

        components :{
            "component-service-part-price-contents-search" : contentSearch,
            "component-service-part-price-contents-board" : contentBoard,
            "component-service-part-price-contents-manual" : contentManual
        }
    }
</script>









