<template>
<div class="btns-indicator">
    <div class="btn-wrap">
        <router-link :to="prev_link" class="btn-cta btn-type-box btn-type-black-outline" v-if="prev_index != null"><span class="btn-txt">이전</span></router-link>
        <router-link :to="next_link" class="btn-cta btn-type-box btn-type-black-outline" v-if="next_index != null"><span class="btn-txt">다음</span></router-link>
        <router-link :to="list_link" class="btn-cta btn-type-box btn-type-black-outline"><span class="btn-txt">목록</span></router-link>
    </div>
</div>
</template>

<script>

    export default {
        name: "careers-detail-btns",
        props: {
            prev_index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            },

            next_index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            }
        },

        data: function () {
            return {
                prev_link : "",
                next_link : "",
                list_link : "",
            }
        },

        beforeCreate: function () {

        },

        created : function(){


        },

        mounted: function () {

        },

        methods: {
            onClick_prev : function(){
                console.log('on click prev');
            },

            onClick_next : function(){
                console.log('on click next');
            }
        },

        components: {

        },

        watch:{
            prev_index : function(){
                this.prev_link = '/'+this.$route.path.split('/')[1]+'/'+this.$route.path.split('/')[2]+'/'+this.prev_index;


            },
            next_index : function(){
                this.next_link = '/'+this.$route.path.split('/')[1]+'/'+this.$route.path.split('/')[2]+'/'+this.next_index;
                this.list_link = '/'+this.$route.path.split('/')[1]+'/'+this.$route.path.split('/')[2]
            }

        }
    }
</script>
