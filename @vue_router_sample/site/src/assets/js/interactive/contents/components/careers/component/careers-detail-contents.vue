<template>
<div class="contents-box list-style-on" :style="[{height:(isDataLoaded)?'auto':'5000px'}]">
    <div v-html="itemdata.content"></div>
    <router-link :to="$route.path+'/'+'apply'" class="btn_apply">지원하기</router-link>
</div>
</template>

<script>

    export default {
        name: "careers-detail-contents",
        props: {
            itemdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {
                isDataLoaded : false
            }
        },

        beforeCreate: function () {

        },

        mounted: function () {

        },

        methods: {

        },

        components: {

        },

        watch : {
            itemdata : function(){
                this.isDataLoaded = true;
            }
        }
    }
</script>
