<template>
    <div class="content-wrap apply" :style="[{height:(isDataLoaded)?'auto':'5000px'}]">
        <div class="inner-content-wrap">
            <div class="content-tit-wrap tit-type-half-line type-black type-kr">
                <h2 class="txt-tit motion">
                    <span class="txt">
                         채용공고
                        <span class="half-line"></span>
                    </span>
                </h2>
                <div class="tab txt-tit_explain">
                    <span :class="(cate_index==CATE_INDEX_0_AUGUST)?'onShow':''">
                        <a :href="CATE_410_CAREERS_AUGUST" @click.stop.prevent="onClick_tab(CATE_410_CAREERS_AUGUST, 'click_recruit_august')">
                             내부 채용
                        </a>
                    </span>
                    <span :class="(cate_index==CATE_INDEX_1_CREATOR)?'onShow':''">
                        <a :href="CATE_420_CAREERS_CREATOR" @click.stop.prevent="onClick_tab(CATE_420_CAREERS_CREATOR, 'click_recruit_creator')">
                            크리에이터 개별 채용
                        </a>
                    </span>
                </div>
                <!--pc !-->
                <ul class="tab txt_sorting-pc" v-if="!isMobile && cate_index==CATE_INDEX_0_AUGUST">
                    <li v-for="(list, index) in sortData" v-bind:class=" (paramIndex == index) ? 'on':'' ">
                        <a href="" @click.stop.prevent="onActiveBoardSortMenu(index)">
                            {{list.name}} ({{list.total }})
                        </a>
                    </li>
                    <!--<li v-bind:class=" (paramIndex == 0) ? 'on':'' ">
                        <a href="" @click.stop.prevent="onActiveBoardSortMenu(0)">
                            전체직군 ({{ sortData[0].total }})
                        </a>
                    </li>
                    <li v-bind:class=" (paramIndex == 1) ? 'on':'' ">
                        <a href="" @click.stop.prevent="onActiveBoardSortMenu(1)">
                            사업개발 ({{ sortData[1].total }})
                        </a>
                    </li>
                    <li v-bind:class=" (paramIndex == 2) ? 'on':'' ">
                        <a href="" @click.stop.prevent="onActiveBoardSortMenu(2)">
                            영상제작&디자인 ({{ sortData[2].total }})
                        </a>
                    </li>
                    <li v-bind:class=" (paramIndex == 3) ? 'on':'' ">
                        <a href="" @click.stop.prevent="onActiveBoardSortMenu(3)">
                            크리에이터 파트너십 ({{ sortData[3].total }})
                        </a>
                    </li>
                    <li v-bind:class=" (paramIndex == 4) ? 'on':'' ">
                        <a href="" @click.stop.prevent="onActiveBoardSortMenu(4)">
                            경영지원 ({{ sortData[4].total }})
                        </a>
                    </li>-->
                </ul>


                <!--mobile !-->
                <ul class="tab txt_sorting-m" v-if="isMobile && cate_index==CATE_INDEX_0_AUGUST">
                    <form id="form_2" class="form-group" action="/">
                        <fieldset>
                            <div class="inp-add-chn-wrap">
                                <!--<label for="form_add_channel_1">Youtube 외 추가로 운영 중인 플랫폼 (선택)</label>-->
                                <div class="col-3">
                                    <label for="apply_august"></label>
                                    <select id="apply_august" class="inp-field inp-chn" title="" @change="onChange_selectedBox">
                                        <option v-for="(list, index) in sortData" :value="list.code" :selected="(index==paramIndex)?'selected':''">{{list.name}} ({{ list.total }})</option>
                                        <!--<option value="" selected="selected">전체직군 ({{ tempData.all }})</option>
                                        <option value="Facebook">사업개발 ({{ tempData.business }})</option>
                                        <option value="Facebook">영상제작&디자인 ({{ tempData.videoprod }})</option>
                                        <option value="Facebook">크리에이터 파트너십 ({{ tempData.creator }})</option>
                                        <option value="Facebook">경영지원 ({{ tempData.businessSupport }})</option>-->
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </ul>
            </div>
            <ul class="tab-contents">
                <li id="tab1" class="onShow ul-list">
                    <div class="board" v-show="listLen > 0">
                        <ul>
                            <!-- table header -->
                            <component-careers-info-board-table-header></component-careers-info-board-table-header>

                            <!-- board list -->
                            <component-careers-info-board-list :list="list" v-for="(list, index) in jsonData.lists" :isParam="isParam" :key="index" :class="isTrans?'onTrans':''"></component-careers-info-board-list>
                        </ul>
                    </div>
                    <component-pagenation :total_page="pageData.total" :view="5" v-show="listLen > 0"></component-pagenation>

                    <div class="no-results-wrap type-gray" :class="(listLen == 0)?'on':''"> <!-- 활성화 클래스 .on -->
                        <div class="img-wrap"><figure><!-- no result image --></figure></div>
                        <div class="txt-wrap">
                            <strong class="txt-tit">진행 중인 채용 공고가 없습니다.</strong>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Slick from 'vue-slick'

    import { EventBus } from '../../../../../interactive/common/event-bus.js';
    import loaderJson from '../../../../../interactive/common/loader-json.js';

    import careers_info_board_table_header from './careers-info-board-table-header';
    import careers_info_board_list from './careers-info-board-list';

    import pagenation from  '../../common/pagenation';
    export default {
        name: "careers-info-board",
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
                pageData : {},
                sortData : {},
                loader : "",

                cate_index : 0,
                CATE_INDEX_0_AUGUST : 0,
                CATE_INDEX_1_CREATOR : 1,
                arrCateName : ['employee', 'creator'],

                CATE_410_CAREERS_AUGUST : '',
                CATE_420_CAREERS_CREATOR: '',

                currentPage : 1,
                listLen : -1,
                isDataLoaded : false,
                isTrans : false,

                params : ['all', 'business', 'production_design', 'creator_partnership', 'administration'],
                paramIndex : 0,

                arrCateCode : ['','R201', 'R202', 'R203', 'R204'],

                isMobile : '',
                isParam : false
            }
        },


        beforeCreate: function () {

        },
        created : function(){
            this.CATE_410_CAREERS_AUGUST = window.GlobalVars.CATE_410_CAREERS_AUGUST;
            this.CATE_420_CAREERS_CREATOR = window.GlobalVars.CATE_420_CAREERS_CREATOR;
            this.checkCateIndex();
            this.checkParams();
        },

        mounted: function () {


            this.loader = new loaderJson();
            EventBus.$on(EventBus.CHANGE_PAGENATION, this.onChange_page);
            EventBus.$on(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
            EventBus.$on(EventBus.CHANGE_RESIZE, this.onChange_resize);
            this.getData();

        },
        destroyed : function() {
            EventBus.$off(EventBus.CHANGE_PAGENATION, this.onChange_page);
            EventBus.$off(EventBus.JSON_LOAD_COMPLETE, this.getDataComplete);
            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resize);
        },
        methods: {
            // 파라미터 체크
            checkParams : function(){
                var paramObj = window.DF.utils.getUrlParameter();
                var index = 0;
                var len = this.params.length;
                if(paramObj.part != undefined){
                    for(var i=0; i<len; i++){
                        if(this.params[i] == paramObj.part){
                            index = i;
                        }
                    }
                    this.isParam = true;
                }else{
                    this.isParam = false;
                }

                this.paramIndex = index;
            },

            // 데이터 가져오기
            getData : function(){
                var cate = this.$route.path.split('/')[2];
                var url = window.GlobalPreset.JSON_URL.CATE_40_GET_CAREERS+'?cate='+cate+"&p="+this.currentPage+'&sort='+this.arrCateCode[this.paramIndex];
                this.loader.loadJsonData(url, this._uid);
            },

            // 데이터 가져오기 완료
            getDataComplete : function(json, uid){
                if(uid == this._uid){
                    this.jsonData = json.careers;
                    if(this.jsonData == null){
                        this.jsonData = {
                            "page":{
                                "current":1,
                                "total":1
                            },
                            "sort":[

                            ],
                            "lists":[
                            ]
                        };
                    }

                    this.pageData = this.jsonData.page;
                    this.sortData = this.jsonData.sort;
                    this.listLen = this.jsonData.lists.length;


                    this.isDataLoaded = true;
                    this.isTrans = true;
                }
            },

            // 탭 클릭했을 때
            onClick_tab : function(path, eventAction){
                EventBus.$emit(EventBus.STOP_SCROLL);
                var eventCategory = 'recruit';
                window.Tracking.send_event(eventCategory, eventAction);

                this.$router.push(path);
            },

            // 페이지 변경
            onChange_page : function(page){
                this.isTrans = false
                this.currentPage = page;
                this.getData();
            },

            // 라우터 변경
            changeRoute : function(){
                this.currentPage = 1;
                this.checkCateIndex();
                this.checkParams();
                this.getData();

                EventBus.$emit(EventBus.RESET_PAGENATION);
            },

            // 카테고리 인덱스 체크
            checkCateIndex : function(){
                var path = this.$route.path;
                var augustPath = window.GlobalVars.CATE_410_CAREERS_AUGUST;
                var creatorPath = window.GlobalVars.CATE_420_CAREERS_CREATOR;

                if(path == augustPath || path == augustPath+'/'){
                    this.cate_index = this.CATE_INDEX_0_AUGUST;
                }else if(path == creatorPath || path == creatorPath+'/'){
                    this.cate_index = this.CATE_INDEX_1_CREATOR;
                }
            }

            ,
            onActiveBoardSortMenu : function( idx ){
                this.goParam(idx);
            },

            onChange_selectedBox : function(){
                var idx = document.getElementById('apply_august').selectedIndex;
               this.goParam(idx);

            },

            goParam : function(idx){
                this.paramIndex = idx;
                this.currentPage = 1;
                var augustPath = window.GlobalVars.CATE_410_CAREERS_AUGUST+'/?part=';
                var url = augustPath+this.params[this.paramIndex];
                this.$router.push(url);
                EventBus.$emit(EventBus.STOP_SCROLL);
            },

            onChange_resize : function(){
                window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE ? this.isMobile = true : this.isMobile = false
            },
        },

        components: {
            "slick": Slick,
            'component-careers-info-board-table-header':careers_info_board_table_header,
            'component-careers-info-board-list':careers_info_board_list,

            'component-pagenation':pagenation
        },
        watch :{
            '$route' (to, from) {
                //console.log('contentsetting :::::: ', to,from);
                this.isTrans = false;
                this.changeRoute();
            }
        }
    }
</script>
