<template>
    <div class="content-wrap main-inquire">
        <div class="inner-content-wrap">
            <div class="content-tit-wrap tit-type-half-line"> <!--v-bind:class="{onShow:isActive}"-->
                <h2 class="txt-tit motion">
                    <span class="txt">
                        CASE STUDY
                        <span class="half-line"></span>
                    </span>
                </h2>
                <p class="txt-tit_explain">
                    다양한 장르의<br class="_m"> 콘텐츠를 바탕으로<br class="_pc">
                    크리에이터들과 함께<br class="_m"> 성공적인 브랜드 콘텐츠를 제작하고 IP 사업을 진행합니다.
                </p>
            </div>
            <!--
            <div class="search-form-wrap">
                <form id="form_1" class="form-group" action="/">
                    <fieldset>
                        <legend class="blind">>브랜드 광고 &  IP 사업 제휴 문의 셀렉트 창</legend>
                        <select id="search-select-list" class="inp-field" title="">
                            <option value="브랜드 광고" selected="selected">브랜드 광고</option>
                            <option value="IP 사업 제휴">IP 사업 제휴</option>
                        </select>
                        <input type="email" id="search-text" class="inp-field" title="" placeholder="이메일을 작성해주세요" required="required">
                        <button type="submit">NEXT</button>
                    </fieldset>
                </form>
            </div>
            -->
            <div class="btn-wrap align-l">
                <router-link to="/business/brand" target="_self" class="btn-cta btn-type-box btn-type-black btn-type-wide"><span class="btn-txt">브랜드 광고 성공 사례</span></router-link>
                <router-link to="/business/ip" target="_self" class="btn-cta btn-type-box btn-type-black btn-type-wide"><span class="btn-txt">IP 사업 성공 사례</span></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../../../../../interactive/common/event-bus.js';

    export default {
        name: "main-business",
        props: {
            infodata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {
                scrollTop : '',
                scrollBottom :'',
                winW : 0,
                winH : 0,

                isActive : false,
            }
        },


        beforeCreate: function () {

        },

        mounted: function () {

        },
        destroyed : function () {

        },
        methods: {

        },

        components: {

        }
    }
</script>
