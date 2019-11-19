<template>
    <transition name="tr-page"  v-on:leave="leave(arguments,afterLeave)" v-on:after-leave="afterLeave">
        <div id="container-sb" :class="[container_name, (isInfo)?'careers':'', (isDetail)?'careers-detail':'', (isApply)?'careers-apply':'']">
            <careers-info v-if="isInfo"></careers-info>
            <careers-detail v-if="isDetail"></careers-detail>
            <careers-apply v-if="isApply"></careers-apply>
        </div>
    </transition>
</template>

<script>

    import { EventBus } from '../../../../interactive/common/event-bus.js';


    // component
    import careers_info from  './component/careers-info';
    import careers_detail from  './component/careers-detail';
    import careers_apply from  './component/careers-apply';
    import scroll_mixin from "../../../common/mixin/scroll_mixin.vue";

    export default {
        name: "careers-contents",
        props: {
            infodata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {
                tab_index : 0,
                container_name : '',

                isInfo : false,
                isDetail : false,
                isApply : false
                ,headerTypeBlack : false
                ,indexViewSubNavi : 0
                ,isStart : true
            }
        },

        beforeRouteEnter (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_ENTER,to,from,next);

            next();
        },
        beforeRouteLeave (to, from, next) {
            EventBus.$emit(EventBus.TRANS_ROUTE_LEAVE,to,from,next);
        },
        beforeCreate: function () {

        },
        created : function(){
            this.changeRoute();
        },
        mounted: function () {
            //this.headerTypeBlack = this.isDetail ? true : false;
            EventBus.$emit(EventBus.TRANS_ROUTE_MOUNTED , this.headerTypeBlack , this.indexViewSubNavi);

            this.isStart = false;
        },

        methods: {

            leave : function(el,done) {
                EventBus.$emit(EventBus.PAGE_TRANSITION_START);
            },
            afterLeave : function(el){
                EventBus.$emit(EventBus.PAGE_TRANSITION_END);
            }
            ,
            changeRoute : function() {

                var augustPath = window.GlobalVars.CATE_410_CAREERS_AUGUST;
                var creatorPath = window.GlobalVars.CATE_420_CAREERS_CREATOR;

                //console.log(this.$route.path.split('/')[4])
                if (this.$route.path == augustPath || this.$route.path == augustPath+'/' || this.$route.path == creatorPath || this.$route.path == creatorPath+'/') {
                    this.isInfo = true;
                    this.isApply = false;
                    if(this.isDetail){
                        window.setTimeout(function(){
                            EventBus.$emit(EventBus.GO_CAREERS_BOARD);
                        },100);
                    }
                    this.isDetail = false;
                    this.headerTypeBlack = true;
                }else if(this.$route.path.split('/')[4] == 'apply'){
                    this.isInfo = false;
                    this.isDetail = false;
                    this.isApply = true;
                    this.headerTypeBlack = true;
                }else if(this.$route.path.split('/')[4]==undefined && this.$route.params != undefined){
                    this.isInfo = false;
                    this.isDetail = true;
                    this.isApply = false;
                    this.headerTypeBlack = true;
                }else if(this.$route.path.split('/')[4]=='' && this.$route.params != undefined ){
                    this.isInfo = false;
                    this.isDetail = true;
                    this.isApply = false;
                    this.headerTypeBlack = true;
                }



                if(!this.isStart || window.GlobalVars.isStart) EventBus.$emit(EventBus.TRANS_HEADER_TYPE , this.headerTypeBlack);
                var path = this.$route.path;
                var list = path.split('/');
                list.shift();

                var listLen = list.length;
                if(list[listLen-1] == '') list.pop();
                this.container_name = list.join('-');


            },
        }
        ,
        watch :{
            '$route' (to, from) {
                //console.log('contentsetting :::::: ', to,from);
                this.changeRoute();
                this.reset_scroll();
                console.log('$route career ========================== 0 ' , this.container_name );
            }
        }
        ,
        mixins: [scroll_mixin],
        components: {
            'careers-info':careers_info
            ,'careers-detail':careers_detail
            ,'careers-apply':careers_apply
        }
    }
</script>
