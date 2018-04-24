
<!-- template -->
<template>
<div class="main-list-wrap contents-wrap">
    <ul class="mod-main-list type-basic">
        <component-main-contents-banner-top-box v-for="(item, index) in contentsdata.top_banner.lists" 
						:key="index" 
						:itemdata="item" 
						v-parallax-df="{'type':'basic_type'}">
	</component-main-contents-banner-top-box>
        
    </ul>
</div>
</template>


<!-- script -->
<script>
    import contentBannerTopBox from './components/main-contents-banner-top-box.vue'
    export default {
        props:{
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            },

        },

        components :{
            "component-main-contents-banner-top-box" : contentBannerTopBox
        }
    }
</script>