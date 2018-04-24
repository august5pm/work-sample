<!-- template -->
<template>

    <transition name="basic-fade">

        <div class="inner-wrap" v-if="this.dataloaded" key="main">
            <!-- Add Contents -->
            <!-- keyvisual -->
            <transition name="basic-fade" appear>
                <component-main-keyvisual :kvdata="this.kvdata"></component-main-keyvisual>
            </transition>

            <!-- tag list -->
            <component-main-contents-tag :contentsdata="this.contentsdata"></component-main-contents-tag>

            <!-- top banner -->
            <component-main-contents-banner-top :contentsdata="this.contentsdata"></component-main-contents-banner-top>

            <!-- 와이드 섹션 v-bind : index = wide banner 순서를 위한 값 -->
            <component-main-contents-banner-wide :contentsdata="this.contentsdata"
                                                 :index="0"></component-main-contents-banner-wide>

            <!-- 선택형 레이아웃 섹션 -->
            <component-main-contents-post :contentsdata="this.contentsdata"></component-main-contents-post>

            <!-- 와이드 섹션 v-bind : index = wide banner 순서를 위한 값  -->
            <component-main-contents-banner-wide :contentsdata="this.contentsdata"
                                                 :index="1"></component-main-contents-banner-wide>

            <div class="main-list-wrap no-pad-btm">
                <component-main-contents-post-group
                        :itemsdata='this.morecontentsdata'></component-main-contents-post-group>
            </div>

            <!-- 더보기 -->
            <p class="btn-main-more" v-if="this.ismorebtn">
                <a href="#btn-more" @click.stop.prevent="onClick_btnMore">
                    <span class="txt">more</span>
                    <span class="line"></span>
                </a>
            </p>
            <!-- //Add Contents -->
        </div>


        <div v-else class="loading-con" key="loading"></div>


    </transition>


</template>


<!-- script -->
<script>
    //////////////////////////////////////////////////////////////
    //component common
    import Vue from 'vue'
    import {EventBus} from '../common/event-bus';
    import scroll_event from '../common/scroll-event';
    import parallax from '../common/custom-parallx'
    import TWEEN from 'tween.js';
    import mixin from "../common/mixin/common_mixin.vue"

    import contentPostGroup from './components/main-contents-post-group.vue'

    Vue.use(parallax)
    //////////////////////////////////////////////////////////////
    // main component

    import main_keyvisual from '../components/keyvisual.vue'
    import main_contents_tag from './main-contents-tag.vue'
    import main_contents_banner_top from './main-contents-banner-top.vue'
    import main_contents_banner_wide from './main-contents-banner-wide.vue'
    import main_contents_post from './main-contents-post.vue'

    export default {

        data: function () {
            return {
                kvdata: {},
                contentsdata: {},

                ismorebtn: true,
                morecontentsdata: [],
                morecontentsdataindex: 8,
                //more 클릭시 추가 갯수
                morecontentsdataadd: 8,

                dataloaded: false
            }
        },


        beforeCreate: function () {
            var app = this;

            EventBus.$once(EventBus.FRAME_SET_COMPLETE, () => {
                var jsonData = window.GlobalVars.json_data;

                app.kvdata = jsonData.main.keyvisual;
                app.contentsdata = jsonData.main;

                app.dataloaded = true;

                if(app.contentsdata.posts.lists.length <= app.morecontentsdataadd){
                    app.ismorebtn = false;
                }
            });
        },

        mounted: function () {

        },



        methods: {
            // add more contents
            onClick_btnMore: function () {
                this.addMoreContentsData();
                //scroll

                this.moveScroll(DF.utils.getScrollPosY() + 150, 300)
            },

            addMoreContentsData: function () {
                var stIndex = this.morecontentsdataindex;
                var addNum = this.morecontentsdataadd;
                var tot = stIndex + addNum;

                if (tot >= this.contentsdata.posts.lists.length) {
                    tot = this.contentsdata.posts.lists.length;
                    this.ismorebtn = false;
                }

                for (var i = stIndex; i < tot; i++) {
                    this.morecontentsdataindex++;
                    this.morecontentsdata.push(this.contentsdata.posts.lists[i]);
                }
            }



        },

        components: {
            "component-main-keyvisual": main_keyvisual
            , "component-main-contents-tag": main_contents_tag
            , "component-main-contents-banner-top": main_contents_banner_top
            , "component-main-contents-banner-wide": main_contents_banner_wide
            , "component-main-contents-post": main_contents_post
            , "component-main-contents-post-group": contentPostGroup,
        },

        mixins: [mixin]

    }
</script>
