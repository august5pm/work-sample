
<!-- template -->
<template>
    <li v-parallax-df="{'type':'basic_type', 'props':'up'}">
        <a :href="addParamsUrl(itemdata.link)" :target="itemdata.target">
            <dl>
                <dt class="title" v-html="itemdata.title"></dt>
                <dd class="desc" v-html="itemdata.description"></dd>

                <dd class="img">
                    <figure class="mod-covered-bg" :style="'background-image:url(\''+getImgUrl(itemdata.img_url.thumb_A, itemdata.img_url.thumb_A_2x)+'\')' ">
                        <figcaption>{{itemdata.img_url.alt_text}}</figcaption>
                    </figure>
                </dd>
            </dl>
        </a>
    </li>

</template>


<!-- script -->
<script>
    import { EventBus } from '../../common/event-bus';

    export default {

        name: 'main-post-box',

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

            }
        },

        mounted: function() {
            EventBus.$emit(EventBus.CHANGE_SCROLL ,DF.utils.getScrollPosY());
        },

        methods : {
            //add params url - common func
            addParamsUrl: function (url) {
                var _url = window.GlobalVars.addParamsUrl(url);
                return _url;
            },

            getImgUrl : function(smallImg, bigImg){
                var tempUrl = (window.GlobalVars.device.isHighDPI)?bigImg:smallImg;

                return tempUrl
            }
        }
    }
</script>