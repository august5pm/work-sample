<template>
    <div id="el_body_wrap" class="body-wrapper">
        <common-group-header></common-group-header>
        <div id="main-sb">
            <div class="inner-wrap">
                <router-view></router-view>
            </div>
        </div>
        <common-group-footer></common-group-footer>
    </div>
</template>

<script>
    //////////////////////////////////////////////////////////////
    //component common
    import {EventBus} from '../common/event-bus';
    import $ from 'jquery';

    //////////////////////////////////////////////////////////////
    // main component

    import loaderJson from '../../interactive/common/loader-json.js';

    import common_group_header from '../../interactive/common/components/common-group-header.vue'
    import common_group_footer from '../../interactive/common/components/common-group-footer.vue'

    export default {
        name: "contents-setting",
        data: function () {
            return {
                dataloaded : false,
                infodata : {},
                target : null,
                isShowPopup : false,
                isStopScroll : false
            }
        },

        beforeCreate: function () {

        },

        updated: function () {

        },
        created: function(){
            EventBus.$on(EventBus.STOP_SCROLL, this.onStop_scroll);


            EventBus.$on(EventBus.SHOW_PROFILE, this.onShow_popup);
            EventBus.$on(EventBus.HIDE_PROFILE, this.onHide_popup);
        },
        mounted: function () {
            EventBus.$emit(EventBus.CONTENTS_UPDATED);
            if(window.GlobalVars.isIE()){
                var ele = document.querySelector('html');
                window.DF.utils.addClass(ele, 'desktop')
            }
        },

        methods: {
            onShow_popup : function(){
                this.isShowPopup = true;
            }
            ,
            onHide_popup : function(){
                this.isShowPopup = false;
            },

            onStop_scroll : function(){
                  this.isStopScroll = true;
            }
        },

        components: {
            "common-group-header":common_group_header
            ,"common-group-footer":common_group_footer
        },
        watch:{
            '$route' (to, from) {
                var path = this.$route.path;
                var list = path.split('/');
                list.shift();
                var name = list.join('-');
                window.GlobalVars.container_name = name == '' ? 'main' : name;

                //console.log('$route ========================== 2 ' , window.GlobalVars.container_name);
                if(!window.GlobalVars.isTransing) {
                    if(!this.isStopScroll){
                        $('html, body').stop().animate({
                            scrollTop: 0
                        },0);
                    }else{
                        this.isStopScroll = false;
                    }
                }
            }
        }
    }
</script>
