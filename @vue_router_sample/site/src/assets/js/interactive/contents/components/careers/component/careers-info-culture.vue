<template>
    <li class="slide-1 ul-list">
        <div class="content-tit-wrap tit-type-half-line type-black">
            <h2 class="txt-tit motion">
                <span class="txt">
                    상상력으로 가득찬 놀이터,<br>
                    의<br class="_m">
                    문화를 소개합니다
                    <span class="half-line"></span>
                </span>
            </h2>
        </div>
        <div class="v-slick">
            <slick ref="slick" :options="slickOptions" @afterChange="handleAfterChange"
                   @beforeChange="handleBeforeChange">
                <div class="ol-list">
                    <div class="content-tit-wrap">
                        <div class="txt-box">
                            <strong>Imagination</strong>
                            <div class="des">
                                <span>상상력을 존중합니다.</span>
                                <em>
                                    는 ‘상상력’이 넘치는 인재들을 신중하게 영입하고,<br class="_pc"><br class="_m">
                                    직원 모두 ‘상상’을 자유롭게 말하며 ‘상상’이 현실이 되는 <br class="_m">과정의 즐거움과 보람을 즐깁니다.
                                </em>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ol-list">
                    <div class="content-tit-wrap">
                        <div class="txt-box">
                            <strong>Flexible</strong>
                            <div class="des">
                                <span>다양성을 사랑하고 변화에 유연합니다.</span>
                                <em>
                                    에는 세상 어느조직보다 다양한 크리에이터들과<br class="_m"> 직원들이 모여 있습니다. 우리는 서로 너무 다르지만<br class="_pc">
                                    <br class="_m">그 다양성의 불편함을 기꺼이 받아들이며, 다양성의 힘으로 <br class="_m">매일 마주하는 변화에 유연하게 대처하며 변화와 함께<br class="_m"> 성장하고 있습니다.
                                </em>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ol-list">
                    <div class="content-tit-wrap">
                        <div class="txt-box">
                            <strong>Pioneer</strong>
                            <div class="des">
                                <span>불확실함 위에서 흔들리지 않고 빠르게 실행합니다.</span>
                                <em>
                                    는 빠르게 성장하는 디지털 엔터테인먼트 영역에서<br class="_m"> 세상에 없던 직무와 사업을 만들어가고 있습니다.<br class="_pc">
                                    이러한 <br class="_m">불확실한 영역에서 빠르게 실행하고 실수하며 배움을 얻으면서<br class="_m"> 누구도 가지 않은 길을 흔들리지 않고 개척해 나가고 있습니다.
                                </em>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ol-list">
                    <div class="content-tit-wrap">
                        <div class="txt-box">
                            <strong>Conversation</strong>
                            <div class="des">
                                <span>치열하게 소통하고 책임감있게 협동합니다.</span>
                                <em>
                                    우리는 서로의 전문성을 존중하고 경청하며, 모두가 즐기고 <br class="_m">사랑하는 콘텐츠와 제품을 출시하기 위해 치열하게 소통합니<br class="_pc"><br class="_m">
                                    다. 또한 소통을 통해 도출된 결론에 대해 모두가 함께 책임지며 <br class="_m">협동하는 조직입니다.
                                </em>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ol-list">
                    <div class="content-tit-wrap">
                        <div class="txt-box">
                            <strong>Pleasure</strong>
                            <div class="des">
                                <span>즐거운 것이 위대한 것이라 믿습니다.</span>
                                <em>
                                    힘든 일을 이루어 내기 위해서는<br class="_m"> 스스로 일에서 즐거움을 느껴야 한다고 생각합니다.<br class="_pc"><br class="_m">
                                    는 콘텐츠를 진정으로 즐기는 사람들과 함께하며,<br class="_m"> 그들과 함께 위대한 일을 해내고 있다고 믿습니다.
                                </em>
                            </div>
                        </div>
                    </div>
                </div>
            </slick>
        </div>
    </li>
</template>

<script>
    import Slick from 'vue-slick'
    export default {
        name: "careers-info-culture",
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
                slickOptions: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows : false,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    slideToShow: 1,
                },
            }
        },


        beforeCreate: function () {

        },

        mounted: function () {

        },

        methods: {
            prev: function () {
                if(this.$refs.slick != null){
                    this.$refs.slick.prev();
                }

            },

            next: function () {
                if(this.$refs.slick != null) {
                    this.$refs.slick.next();
                }
            },

            handleAfterChange : function(event, slick, currentSlide){

            },

            handleBeforeChange : function(event, slick, currentSlide, nextSlide){

            },
        },

        components: {
            "slick": Slick
        }
    }
</script>
