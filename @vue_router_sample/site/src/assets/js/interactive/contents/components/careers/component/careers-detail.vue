<template>
    <div id="content-sb" v-show="isDataLoaded">
        <div id="con-sb" class="con">

            <!-- decorate : top-left -->
            <div class="content-deco-box top-left">
                <div class="box"></div>
            </div>
            <!--// decorate : top-left -->

            <!-- content : S-->
            <section class="section-contents"> <!-- 포토샵에 디자인된 높이만큼을 올려줌 !-->
                <!-- back img area -->
                <div class="back-color-box deco-bg-1"></div>
                <!-- 30deg로 인한 높이(432px) 초기화 !-->

                <!-- main new creators -->
                <div class="content-wrap">
                    <div class="inner-content-wrap"> <!-- padding은 회전 전을 기준으로 psd파일에서의 높이를 기입합니다.!-->
                        <div class="careers-detail-box">
                            <!-- table header -->
                            <component-careers-detail-table-header :itemdata="detailData"></component-careers-detail-table-header>
                            <!-- contents -->
                            <component-careers-detail-contents :itemdata="detailData"></component-careers-detail-contents>
                            <!-- btns -->
                            <component-careers-detail-btns :prev_index="jsonData.prev_idx" :next_index="jsonData.next_idx"></component-careers-detail-btns>
                        </div>
                    </div>
                </div>
            </section>
            <!-- // content : E-->

            <!-- decorate : bottom-right -->
            <div class="content-deco-box bottom-right">
                <div class="box"></div>
            </div>
            <!--// decorate : bottom-right -->

        </div>
    </div>
</template>

<script>

    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';
    import $ from 'jquery';

    import careers_detail_table_header from './careers-detail-table-header';
    import careers_detail_contents from './careers-detail-contents';
    import careers_detail_btns from './careers-detail-btns';

    export default {
        name: "careers-detail",
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
                jsonData : {},
                detailData : {},
                loader : '',
                isTrans : false,
                isDataLoaded : false,
                isShowBtn : false
            }
        },


        beforeCreate: function () {

        },

        created : function(){
            this.setMeta();

            EventBus.$on(EventBus.PAGE_TRANSITION_START, this.pageTransitionStart);
            EventBus.$on(EventBus.PAGE_TRANSITION_END, this.pageTransitionEnd);
            EventBus.$on(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
            this.loader = new loaderJson();
            this.getData();
        },

        mounted: function () {
            this.setPageTracking();
        },
        destroyed : function () {
            EventBus.$off(EventBus.PAGE_TRANSITION_START, this.pageTransitionStart);
            EventBus.$off(EventBus.PAGE_TRANSITION_END, this.pageTransitionEnd);
            EventBus.$off(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
        },
        methods: {
            // 페이지 트래킹
            setPageTracking : function(){
                var pageName = 'page_recruit_list_'+this.$route.params.id;
                window.Tracking.send_pageView(pageName);
            },

            // 메타데이터 넣기
            setMeta : function(){
                EventBus.$emit(EventBus.CHANGE_METADATA, "careers_detail")
            },

            // 페이지 트랜지션 시작
            pageTransitionStart : function(){
                this.isTrans = true;
            },

            // 페이지 트랜지션 완료
            pageTransitionEnd : function(){
                this.isTrans = false;
            },

            // 데이터 가져오기
            getData : function(){
                var cate = this.$route.path.split('/')[2];
                var url = window.GlobalPreset.JSON_URL.CATE_40_GET_CAREERS_AUGUST_DETAIL+"?cate="+cate+"&idx="+this.$route.params.id;
                this.loader.loadJsonData(url, this._uid);
            },

            // 데이터 가져오기 완료
            getDataComplete : function (json, uid) {
                if(this._uid == uid){
                    this.jsonData = json.careers;

                    console.log(this.jsonData)
                    this.detailData = this.jsonData.detail;
                    if(this.detailData == null){
                        var errorPath = window.GlobalVars.CATE_900_ERROR;
                        this.$router.push(errorPath)
                    }else{
                        this.isDataLoaded = true;
                    }
                }
            }
        },

        components: {
            'component-careers-detail-table-header':careers_detail_table_header,
            'component-careers-detail-contents':careers_detail_contents,
            'component-careers-detail-btns':careers_detail_btns,
        },

        watch :{
            '$route' (to, from) {
                this.getData()
            }
        }

    }
</script>
