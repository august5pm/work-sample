
<!-- template -->
<template>

    <div class="tbl-wrap">
        <table>
            <caption>부품 가격 및 취급 정보 검색 결과</caption>
            <colgroup>
                <col class="tb-col-1" />
                <col class="tb-col-2" />
                <col class="tb-col-3" />
                <col class="tb-col-4" />
                <col class="tb-col-5" />
            </colgroup>
            <thead>
            <tr>
                <th scope="col">모델</th>
                <th scope="col">품번</th>
                <th scope="col">권장소비자가격 (원)</th>
                <th scope="col">품명 (국문)</th>
                <th scope="col">품명 (영문)</th>
            </tr>
            </thead>
            <tbody>
            <!-- todo/days:2017.06.15/데이터가 없을 경우-->
            <tr class="value-none" v-if="listdata.length==0">
                <td colspan="5"><p>검색된 결과가 없습니다</p></td>
            </tr>
            <!--tr v-if="listdata.length!=0">
                <th scope="row"><span class="m-th">모델</span><span>LS 460 AWD</span></th>
                <td><span class="m-th">품번</span><span>PZ36200209B6</span></td>
                <td><span class="m-th">권장소비자가격 (원)</span><span>42,143,900</span></td>
                <td><span class="m-th">품명 (국문)</span><span>오토 트랜스미션 플루이드 D-2 4L</span></td>
                <td><span class="m-th">품명 (영문)</span><span>ADJUSTER ASSY,FRONT SEAT VERTICAL,RH</span></td>
            </tr-->
            <tr v-if="listdata.length!=0" v-for="list in listdata">
                <th scope="row"><span class="m-th">모델</span><span>{{list.model}}</span></th>
                <td><span class="m-th">품번</span><span>{{list.product_number}}</span></td>
                <td><span class="m-th">권장소비자가격 (원)</span><span>{{list.price}}</span></td>
                <td><span class="m-th">품명 (국문)</span><span>{{list.product_name_kor}}</span></td>
                <td><span class="m-th">품명 (영문)</span><span>{{list.product_name_eng}}</span></td>
            </tr>

            </tbody>
        </table>
        <div class="paginate" v-if="listdata.length!=0">
            <a href="#btn-prev" class="btn-page prev" v-if="current_page_group!=1" @click.stop.prevent="onClick_prev"><span class="blind">previus</span><i><!--아이콘--></i></a>
            <!--a href="#page" class="selected">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">7</a>
            <a href="#">8</a>
            <a href="#">9</a>
            <a href="#">10</a-->
            <a :href="'#page'+page" v-for="page in arrPaginate" @click.stop.prevent="onClick_page(page)" :class="(page==current_page?'selected':'')">{{page}}</a>
            <a href="#btn-next" class="btn-page next" v-if="current_page_group!=total_page_group" @click.stop.prevent="onClick_next"><span class="blind">next</span><i><!--아이콘--></i></a>
        </div>
        <div class="note">
            본 부품의 가격은 변동되거나 실제품목과 일부 상이할 수 있으므로 정확한 가격은 가까운 딜러 서비스 센터로 문의하여 주시기 바랍니다.<br>
            권장 소비자 가격에는 부가세(10%)가 포함되어 있지 않습니다.
        </div>
    </div>

</template>


<!-- script -->
<script>
    import { EventBus } from '../../common/event-bus.js';
    export default {
        props: {
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            },

            responsedata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        data: function() {
            return {
                one_page_view : 10,
                total_page_group : 1,
                current_page_group : 1,
                current_page : 1,
                total_page : 1,
                start_page : 1,
                end_page : 1,
                arrPaginate : [],
                listdata : [],
                isMobile : false
            }
        },

        beforeMount : function(){
            this.isMobile = window.GlobalVars.isMobile;
            if(this.isMobile) this.one_page_view = 5;
        },


        methods:{

            set_paginate : function(){
                this.total_page_group = Math.ceil(this.total_page/this.one_page_view);
                this.current_page_group = Math.ceil(this.current_page/this.one_page_view);

                let i = 0;
                this.start_page = (this.one_page_view * this.current_page_group) - this.one_page_view+1
                this.end_page = (this.one_page_view * this.current_page_group)
                if(this.end_page > this.total_page) this.end_page = this.total_page;

                this.arrPaginate = [];
                for(i=this.start_page; i<=this.end_page; i++){
                    this.arrPaginate.push(i);
                }
            },

            onClick_prev : function(){
                let page = (this.one_page_view * (this.current_page_group-1))
                EventBus.$emit(EventBus.ON_SEARCH, page);
            },

            onClick_next : function(){
                let page = (this.one_page_view * (this.current_page_group+1)) - this.one_page_view+1
                EventBus.$emit(EventBus.ON_SEARCH, page);
            },

            onClick_page : function(page){
                EventBus.$emit(EventBus.ON_SEARCH, page);
            },

            updateData : function(){
                this.listdata = this.responsedata.lists
                this.current_page = this.responsedata.current_page;
                this.total_page = this.responsedata.total_page;

                this.set_paginate();
            }
        },

        watch : {
            responsedata : function(){
                this.updateData();
            }

        }
    }
</script>










