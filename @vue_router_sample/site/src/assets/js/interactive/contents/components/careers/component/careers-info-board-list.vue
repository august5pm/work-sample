<template>
    <li class="board-list" :class="list.isEnd?'expire':''">
        <router-link :to="link">
            <div>
                <div class="form">
                    <strong>{{list.type}}<!--상시--></strong>
                </div>

                <div class="field">
                    <div class="mobile">
                        <span class="form">{{list.type}}<!--상시--></span>
                        <span class="job-group">{{list.area}}<!--Business Development--></span>
                    </div>
                    <p class="field-name">
                        <span>{{list.job}}<!--상품 기획 MD--></span>
                    </p>
                    <p class="date">{{list.term}}<!--2018.10.11 - 2018.12.31--></p>
                </div>

                <div class="job-group">
                    <p>{{list.area}}<!--Business Development--></p>
                </div>

                <div class="target">
                    <p>{{list.condition}}<!--신입/경력--></p>
                </div>
            </div>
        </router-link>
    </li>
</template>

<script>

    export default {
        name: "careers-info-board-list",
        props: {
            list: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            },

            isParam: {
                type: Boolean,
                default: function () {
                    return false;// 기본값
                }
            }
        },

        data: function () {
            return {
                link : ""
            }
        },


        beforeCreate: function () {

        },

        created : function(){

        },

        mounted: function () {
            this.setLink();
        },

        methods: {
            setLink : function(){
                var temp = this.$route.path.split('/');
                this.link = this.$route.path+'/'+this.list.idx;
                if(temp.length == 4) this.link = this.$route.path+this.list.idx;
            }
        },

        components: {

        },

        watch :{
            list : function(){
                this.setLink();
            }
        }
    }
</script>
