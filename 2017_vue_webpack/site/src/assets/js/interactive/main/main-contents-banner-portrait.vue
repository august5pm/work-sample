
<!-- template -->
<template>
<li :class="['box-1x2', isLeft?'':'float-r']"  v-parallax-df="{'type':'basic_type', 'props':'up'}"><!-- 1x2 리스트, left정렬 right : .float-r-->
    <a v-if="(itemdata.link !='')"
       :href="(itemdata.link=='') ? '#'
       :addParamsUrl(itemdata.link)"
       :target="itemdata.target" @click="onClick(itemdata.link, $event, itemdata.target)"
       :title="getLinkTitle(itemdata.target, itemdata.title)"
    >
        <dl>
            <dt class="title" v-html="itemdata.title"></dt>
            <dd class="desc hide" v-html="itemdata.description"></dd>
            <dd class="img">
                <figure class="mod-covered-bg" :style="'background-image:url(\''+ getImgUrl(itemdata.img_url.portrait, itemdata.img_url.portrait_2x) +'\')' ">
                    <figcaption>{{itemdata.img_url.alt_text}}</figcaption>
                </figure>
            </dd>
        </dl>
    </a>
    <div v-else>
        <dl>
            <dt class="title" v-html="itemdata.title"></dt>
            <dd class="desc hide" v-html="itemdata.description"></dd>
            <dd class="img">
                <figure class="mod-covered-bg" :style="'background-image:url(\''+ getImgUrl(itemdata.img_url.portrait, itemdata.img_url.portrait_2x) +'\')' ">
                    <figcaption>{{itemdata.img_url.alt_text}}</figcaption>
                </figure>
            </dd>
        </dl>
    </div>
</li>
</template>


<!-- script -->
<script>
    import { EventBus } from '../common/event-bus';
    import common_mixin from './../common/mixin/common_mixin.vue'

    export default {
        mixins:[common_mixin],
        props:{
            itemdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            },
            isLeft: {
                type: Boolean,
                default: false, // 기본값
            }
        },
        data: function() {
            return {

            }
        },

        mounted: function() {
            EventBus.$emit(EventBus.CHANGE_SCROLL ,DF.utils.getScrollPosY());
        },

        methods : {
            onClick : function(link, e, target_type){
                e.preventDefault();

                let url  = this.addParamsUrl(link);
                if(target_type == "_blank") window.open(url);
                else window.location.href = url;
            }
        }
    }
</script>