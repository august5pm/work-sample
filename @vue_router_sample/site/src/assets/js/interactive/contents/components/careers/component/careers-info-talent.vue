<template>
<li class="slide-2 ul-list">
    <div class="content-tit-wrap tit-type-half-line type-black">
        <h2 class="txt-tit motion">
            <span class="txt">
                 인재상
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
                        <strong>Happiness of<br>Creators</strong>
                        <div class="des">
                            <span>크리에이터의 행복</span>
                            <em>
                                는 크리에이터들과 함께<br class="_m"> 디지털 콘텐츠 세상의 변화를 이끌어 갑니다.<br class="_m"><br class="_pc">
                                크리에이터를 나처럼, 크리에이터들의 콘텐츠를<br class="_m"> 내가 만든 것처럼 사랑할 분들이 함께하길 원합니다.
                            </em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ol-list">
                <div class="content-tit-wrap">
                    <div class="txt-box">
                        <strong>Endurance</strong>
                        <div class="des">
                            <span>인내와 끈기</span>
                            <em>
                                는 남들이 가지 않은 길을 만들어가며 불확실함을<br class="_m"> 확실함으로 증명하고 있습니다. 우리가 가는 길을 누군가가<br class="_m"> 안내해주고,<br class="_pc">
                                우리가 하는 일을 다른 사람이 정의해 <br class="_m"> 주길 바라는 분 이라면 에서는 힘든 시간을<br class="_m"> 보낼 수도 있습니다.
                            </em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ol-list">
                <div class="content-tit-wrap">
                    <div class="txt-box">
                        <strong>Problem<br class="_pc"><br class="_m">Solving</strong>
                        <div class="des">
                            <span>문제 해결 능력</span>
                            <em>
                                는 세상에 없던 콘텐츠, 비즈니스,<br class="_m"> 직업들을 만들어 가고 있습니다.<br class="_pc"><br class="_m">
                                한 번도 접해보지 못한 문제를 즐겁게, 창의적으로<br class="_m"> 풀 수 있는 인재들과 함께하길 바랍니다.
                            </em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ol-list">
                <div class="content-tit-wrap">
                    <div class="txt-box">
                        <strong>Love</strong>
                        <div class="des">
                            <span>협업과 애정</span>
                            <em>
                                에서는 혼자 일을 잘하는 분보다는 여럿이서 일을<br class="_m"> 잘하는 분을 인정합니다. 동료와 함께 일을 잘하는 분은<br class="_pc"><br class="_m">
                                마음속에서 동료를 사랑하고 이해하며 동료의 실패를 <br class="_m">묵과하지 않는  따뜻한 마음의 소유자일 것이라 믿습니다.
                            </em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ol-list">
                <div class="content-tit-wrap">
                    <div class="txt-box">
                        <strong>Ownership</strong>
                        <div class="des">
                            <span>주체성있는 주인의식</span>
                            <em>
                                는 폭발적으로 성장하는 산업에서 그 누구보다<br class="_m">  빠르게 성장하고 있습니다. 빠르게 성장하는 회사는<br class="_m"> <br class="_pc">
                                개인에게 큰 역할이 주어지게 되며 큰 역할을 <br class="_m"> 맡은 만큼 큰 오너십을 가진 인재가 절실히 필요합니다.
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
