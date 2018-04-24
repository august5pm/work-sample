
<!-- template -->
<template>
    <transition-group tag="ul" name="box-fade" class="mod-main-list type-custom-layout custom-a">
        <component-main-contents-post-box v-for="item in this.itemsdata" :itemdata=item :key=item.title></component-main-contents-post-box>transition
    </transition-group>
</template>


<!-- script -->
<script>
    import contentPostBox from './main-contents-post-box.vue'

    export default {
        name: 'main-post-group',

        props:{
            itemsdata: {
                type: Array,
                default: function() { return []; }, // 기본값
            }
        },

        components :{
            "component-main-contents-post-box" : contentPostBox
        },


    }
</script>




