<template>
    <!-- news detail -->
    <div class="content-wrap detail-hd-img">
        <div class="inner-content-wrap">
            <div class="img-wrap">
                <img :src="imgUrl">
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "news-detail-img",
        props: {
            img_url: {
                type: String,
                default: function () {
                    return '';// 기본값
                }
            }
        },

        data: function () {
            return {
                imgUrl : ''
            }
        },

        beforeCreate: function () {

        },

        created : function(){

        },

        mounted: function () {

        },

        methods: {

        },

        components: {

        },

        watch : {
            img_url : function(){
                this.imgUrl =  this.img_url;
            }
        }

    }
</script>
