
<!-- template -->
<template>
    <!--   desc 부분이 생략된 배너 추가 클래스:  none-desc    -->
    <div :class="['main-banner-wrap', contentsdata.wide_banner.lists[index].description == '' ? 'none-desc' : '']" v-parallax-df=" isMobile ? wideobj : '' ">
        <a v-if="(contentsdata.wide_banner.lists[index].link != '')"
           :href="(contentsdata.wide_banner.lists[index].link =='') ? '#': addParamsUrl(contentsdata.wide_banner.lists[index].link)"
           :target="contentsdata.wide_banner.lists[index].target"
           @click="onClick(contentsdata.wide_banner.lists[index].link, $event, contentsdata.wide_banner.lists[index].target)"
           :title="getLinkTitle(contentsdata.wide_banner.lists[index].target, contentsdata.wide_banner.lists[index].title)"
        >
            <div class="mod-main-list-wide">
                <div class="text-holder">
                    <strong class="title">
                        <span :class="getType_lang(contentsdata.wide_banner.lists[index].title_lang_type)" v-html="contentsdata.wide_banner.lists[index].title"></span>
                    </strong>
                    <p class="desc" v-if="contentsdata.wide_banner.lists[index].description">
                        <span :class="getType_lang(contentsdata.wide_banner.lists[index].description_lang_type)"  v-html="contentsdata.wide_banner.lists[index].description"></span>
                    </p>
                </div>
                <div class="img">
                    <div class="back-pannel">
                        <figure class="mod-covered-bg bg-pos-top" :style="'background-image:url(\''+contentsdata.wide_banner.lists[index].img_url+'\')'" v-parallax-df="{'type':'single_type', 'props':'main-wide-banner'}">
                            <figcaption>{{contentsdata.wide_banner.lists[index].alt_text}}</figcaption>
                        </figure>
                    </div>
                    <div v-if="contentsdata.wide_banner.lists[index].img_url_layer" class="front-pannel">
                        <figure class="mod-basic-bg" :style="'background-image:url(\''+isLayerImg+'\')'">
                            <figcaption>{{contentsdata.wide_banner.lists[index].alt_text_layer}}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </a>
        <div v-else>
            <div class="mod-main-list-wide">
                <div class="text-holder">
                    <strong class="title">
                        <span :class="getType_lang(contentsdata.wide_banner.lists[index].title_lang_type)" v-html="contentsdata.wide_banner.lists[index].title"></span>
                    </strong>
                    <p class="desc" v-if="contentsdata.wide_banner.lists[index].description">
                        <span :class="getType_lang(contentsdata.wide_banner.lists[index].description_lang_type_lang_type)"  v-html="contentsdata.wide_banner.lists[index].description"></span>
                    </p>
                </div>
                <div class="img">
                    <div class="back-pannel">
                        <figure class="mod-covered-bg bg-pos-top" :style="'background-image:url(\''+contentsdata.wide_banner.lists[index].img_url+'\')'" v-parallax-df="{'type':'single_type', 'props':'main-wide-banner'}">
                            <figcaption>{{contentsdata.wide_banner.lists[index].alt_text}}</figcaption>
                        </figure>
                    </div>
                    <div v-if="contentsdata.wide_banner.lists[index].img_url_layer" class="front-pannel">
                        <figure class="mod-basic-bg" :style="'background-image:url(\''+isLayerImg+'\')'">
                            <figcaption>{{contentsdata.wide_banner.lists[index].alt_text_layer}}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- script -->
<script>
    import Vue from 'vue'
    import common_mixin from "./../common/mixin/common_mixin.vue"

    export default {
        //name
        name: 'model-banner-wide',

        data: function() {
            return {
                isMobile : window.GlobalVars.isMobile,
                wideobj:{"type":"basic_type", "props":"up"}
            }
        },

        computed: {
            isLayerImg: function() {
                return window.GlobalVars.isMobile ? this.contentsdata.wide_banner.lists[this.index].img_url_layer_m : this.contentsdata.wide_banner.lists[this.index].img_url_layer
            }
        },

        props:{
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            },
            index:{
                type:Number,
                default:0
            }
        },

        methods : {
            onClick : function(link, e, target_type){
                e.preventDefault();

                console.log('click')
                let url  = this.addParamsUrl(link);
                if(target_type == "_blank") window.open(url);
                else window.location.href = url;
            }
        },

        mixins : [common_mixin]
    }
</script>


