
<!-- template -->
<template>
<div class="main-list-wrap no-pad-btm">
    <component-main-contents-post-group :itemsdata='itemsdata_a'></component-main-contents-post-group>
    <!--  복합형 -->
    <ul class=" mod-main-list type-custom-layout custom-b">
        <component-main-contents-banner-portrait :itemdata="contentsdata.portrait_banner.lists[0]" :isLeft="true"></component-main-contents-banner-portrait>
        <component-main-contents-post-box :itemdata="contentsdata.posts.lists[4]"></component-main-contents-post-box>
        <component-main-contents-post-box :itemdata="contentsdata.posts.lists[5]"></component-main-contents-post-box>
        <component-main-contents-banner-portrait :itemdata="contentsdata.portrait_banner.lists[1]" :isLeft="false"></component-main-contents-banner-portrait>
        <component-main-contents-post-box :itemdata="contentsdata.posts.lists[6]"></component-main-contents-post-box>
        <component-main-contents-post-box :itemdata="contentsdata.posts.lists[7]"></component-main-contents-post-box>
    </ul>
    <!--<component-main-contents-post-group :itemsdata='itemsdata_c'></component-main-contents-post-group>-->
</div>
</template>


<!-- script -->
<script>
    import contentBannerPortrait from './main-contents-banner-portrait.vue'
    import contentPostGroup from './components/main-contents-post-group.vue'

    import contentPostBox from './components/main-contents-post-box.vue'

    export default {
        props:{
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        components :{
            "component-main-contents-banner-portrait" : contentBannerPortrait,
            "component-main-contents-post-group" : contentPostGroup,
            "component-main-contents-post-box" : contentPostBox
        },

        computed: {
            itemsdata_a: function () {
                return this.contentsdata.posts.lists.slice(0, 4);
            },

            itemsdata_c: function () {
                return this.contentsdata.posts.lists.slice(8, 12);
            }
        },


    }
</script>