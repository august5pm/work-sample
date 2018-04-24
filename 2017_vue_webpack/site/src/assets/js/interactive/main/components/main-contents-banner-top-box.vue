
<!-- template -->
<template>
<li>
    <a v-if="(itemdata.link !='')"
       :href="(itemdata.link=='') ? '#':addParamsUrl(itemdata.link)"
       :target="itemdata.target"
       :title="getLinkTitle(itemdata.target, itemdata.title)"
       @click="onClick_banner($event, itemdata.link, itemdata.target, itemdata.tracking_event)"
    >
        <dl>
            <dt class="title" v-html="itemdata.title"></dt>
            <dd class="desc">{{itemdata.description}}</dd>
            <dd class="img">
                <figure class="mod-covered-bg" :style="'background-image:url(\''+getImgUrl(itemdata.img_url.thumb_B, itemdata.img_url.thumb_B_2x, itemdata.img_url.thumb_A_2x)+'\')' ">
                    <figcaption>{{itemdata.img_url.alt_text}}</figcaption>
                </figure>
            </dd>
        </dl>
    </a>
    <div v-else>
        <dl>
            <dt class="title" v-html="itemdata.title"></dt>
            <dd class="desc">{{itemdata.description}}</dd>
            <dd class="img">
                <figure class="mod-covered-bg" :style="'background-image:url(\''+getImgUrl(itemdata.img_url.thumb_B, itemdata.img_url.thumb_B_2x, itemdata.img_url.thumb_A_2x)+'\')' ">
                    <figcaption>{{itemdata.img_url.alt_text}}</figcaption>
                </figure>
            </dd>
        </dl>
    </div>
    <span class="line"></span>
</li>

</template>


<!-- script -->
<script>
    import mixin from "./../../common/mixin/common_mixin.vue"

    export default {
        computed:{

        },
        props:{
            itemdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },
        data: function() {
            return {
                isMobile : false
            }
        },

        beforeMount: function(){
            this.isMobile = window.GlobalVars.isMobile;
        },

        methods : {
            onClick_banner : function(e, link, target_type, tracking_code){
                e.preventDefault();

                if(tracking_code != undefined && tracking_code != null && tracking_code != ""){
                    window.Tracking.send_event(tracking_code, "click_main_top");
                }

                let url  = this.addParamsUrl(link);
                if(target_type == "_blank") window.open(url);
                else window.location.href = url;
            }
        },

        mixins: [mixin]
    }
</script>