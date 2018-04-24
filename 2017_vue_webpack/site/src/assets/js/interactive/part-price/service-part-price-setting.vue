

<!-- template -->
<template>
    <div class="inner-wrap" v-if="dataloaded">
        <!-- Add Contents -->

        <!-- 모바일 Back버튼 -->
        <component-mobile-title-back :pagetitle="this.pagetitle" :backurl="this.backurl"></component-mobile-title-back>

        <div class="sub-content-body">
            <!-- 페이지 탭 모듈 -->
            <service-tab :contentsdata="this.contentsdata" :pagetitle="this.pagetitle" :menuindex="this.menuindex"></service-tab>

            <!-- 페이지 본문 컨텐츠 영역 -->
            <service-part-price-contents :contentsdata="this.contentsdata"></service-part-price-contents>
            <!-- //E .content-detail -->

        </div>
        <!-- //Add Contents -->
    </div>
</template>





<!-- script -->
<script>
    //////////////////////////////////////////////////////////////
    //component common
    import Vue from 'vue'
    import { AppConsts } from '../../../frame/AppConsts';
    import { EventBus } from '../../common/event-bus';

    //////////////////////////////////////////////////////////////
    // component

    import mobile_title_back from '../../common/mobile-title-back.vue'
    import service_tab from '../components/service-tab.vue'
    import service_part_price_contents from './service-part-price-contents.vue'



    export default {

        data(){
            return {
                pagetitle:"부품 및 취급 정보",
                backurl:"",
                contentsdata:{},
                dataloaded : false,
                isMobile : false,
                menuindex:4
            }
        },

        beforeCreate(){
            var app = this;
            this.isMobile = window.GlobalVars.isMobile;

            EventBus.$on(EventBus.FRAME_SET_COMPLETE, () => {
                var jsonData = window.GlobalVars.json_data;

//                app.backurl = jsonData.models.line.link;
//                app.pagetitle = window.GlobalVars.page_title;

                app.contentsdata = jsonData.service.part_price
                this.dataloaded = true;

                this.backurl = AppConsts.PAGE_URL.SERVICE;
            });
        },

        methods: {

        },

        components:{
            "component-mobile-title-back": mobile_title_back
            ,"service-tab": service_tab
            ,"service-part-price-contents": service_part_price_contents
        }
    }
</script>

