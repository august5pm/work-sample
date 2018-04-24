
<!-- template -->
<template>
    <div class="launcher-content main-type">
        <ul>
            <component-tag-name-btn v-for="item in contentsdata.tag.special_lists" :itemdata="item" :key="item.text" :isbold="true"></component-tag-name-btn>
            <component-tag-name-btn v-for="item in contentsdata.tag.lists" :itemdata="item" :key="item.text" :isbold="false"></component-tag-name-btn>
        </ul>
    </div>
</template>


<!-- script -->
<script>
    import tagnameBtn from '../components/tagname-btn.vue'

    export default {

        props:{
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        components :{
            "component-tag-name-btn" : tagnameBtn
        }
    }
</script>