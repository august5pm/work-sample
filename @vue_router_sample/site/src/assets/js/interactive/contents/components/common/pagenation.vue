<template>
    <div class="page-indicator">
        <!--<a href="#" class="ico-indi-arrow-l" @click.stop.prevent="onClick_prev" v-show="isPrevShow"></a>-->
        <a href="#" class="ico-indi-arrow-l" @click.stop.prevent="onClick_prev" v-bind:class="{ onShow:isPrevShow }"></a>
        <ol>
            <li v-for="(page, index) in viewNum" :class="(currentPage==(startPage+page))?'on':''" :key="page"><a href="#" @click.stop.prevent="onClick_page(startPage+page)">{{startPage+page}}</a></li>
        </ol>
        <!--<a href="#" class="ico-indi-arrow-r"  @click.stop.prevent="onClick_next" v-show="isNextShow"></a>-->
        <a href="#" class="ico-indi-arrow-r"  @click.stop.prevent="onClick_next" v-bind:class="{ onShow:isNextShow}"></a>
    </div>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';
    export default {
        name: "pagenation",
        props: {
            total_page: {
                type: Number,
                default: function () {
                    return 0;// 기본값
                }
            },

            view: {
                type: Number,
                default: function () {
                    return 0;// 기본값
                }
            },
        },

        data: function () {
            return {
                totalPage : 1,
                currentPage : 1,
                viewNum : 5,
                startPage : 0,
                gap : 0,
                isPrevShow : false,
                isNextShow : false
            }
        },

        beforeCreate: function () {

        },

        created : function(){

        },

        mounted: function () {
            EventBus.$on(EventBus.RESET_PAGENATION, this.onReset);
            this.onReset();
        },
        destroyed : function() {
            EventBus.$off(EventBus.RESET_PAGENATION, this.onReset);
        },
        methods: {
            onReset : function(){
                this.currentPage = 1;
                this.isPrevShow = false;
                this.isNextShow = false;

                this.setPagenation();
                this.checkPrevNext();
            },

            setPagenation : function(){
                this.viewNum = (this.total_page>this.view)?this.view:this.total_page;
                this.totalPage = this.total_page;
                this.gap = Math.ceil(this.viewNum/2);
            },

            onClick_page : function(currentPage){
                this.changePage(currentPage);
            },

            onClick_prev : function(){
                var tempPage = this.currentPage -1;
                if(tempPage<1){
                    tempPage = 1;
                }
                this.changePage(tempPage);
            },

            onClick_next : function(){
                var tempPage = this.currentPage +1;
                if(tempPage>this.totalPage){
                    tempPage = this.totalPage;
                }
                this.changePage(tempPage);
            },

            changePage : function(currentPage){
                this.currentPage = currentPage;
                if(this.viewNum<this.totalPage){
                    this.setStartPage();
                }

                this.checkPrevNext();
                EventBus.$emit(EventBus.CHANGE_PAGENATION, this.currentPage);
            },

            setStartPage : function(){
                var tempStartPage = (this.currentPage - this.gap);
                if(tempStartPage<1) {
                    tempStartPage = 0;
                }else if(tempStartPage>(this.totalPage-this.viewNum)) {
                    tempStartPage = this.totalPage-this.viewNum
                }

                this.startPage = tempStartPage;
            },

            checkPrevNext : function(){
                if(this.currentPage==1){
                    this.isPrevShow = false;
                }else{
                    this.isPrevShow = true;
                }

                if(this.currentPage==this.totalPage){
                    this.isNextShow = false;
                }else{
                    this.isNextShow = true;
                }
            }
        },
        watch : {
            total_page : function(){
                this.onReset();
            }
        }
    }
</script>
