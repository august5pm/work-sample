<template>
    <div class="content-wrap welfare">
        <div class="inner-content-wrap">
            <div class="content-tit-wrap tit-type-half-line type-black">
                <h2 class="txt-tit motion">
                    <span class="txt">
                         복지 제도
                        <span class="half-line"></span>
                    </span>
                </h2>
            </div>
            <ul class="careers_pc">
                <li>
                    <strong>비용 지원</strong>
                    <div class="des-con">
                        <div class="des-box">
                            <span>점심 식대 및 야근 식대 지원</span>
                            <span>자사 스토어 25% 할인 혜택 제공</span>
                            <span>명절선물 지급</span>
                            <span>청년내일채움공제 가입</span>
                        </div>
                        <div class="des-box">
                            <span>야근 택시비 지원</span>
                            <span>교육비 지원</span>
                            <span>인재추천금 지급</span>
                            <span>재직자내일채움공제 가입</span>
                        </div>
                        <div class="des-box">
                            <span>간식, 커피 및 생맥주 무한제공</span>
                            <span>경조비 및 화환 지급</span>
                            <span>임직원 우대금융상품 제공</span>
                        </div>
                    </div>
                </li>
                <li>
                    <strong>건강 및 휴식</strong>
                    <div class="des-con">
                        <div class="des-box">
                            <span>종합건강검진 지원</span>
                            <span>남/여 수면실 운영</span>
                        </div>
                        <div class="des-box">
                            <span>단체보험 가입 제공</span>
                            <span>안마의자 제공</span>
                        </div>
                        <div class="des-box">
                            <span>스탠딩 데스크 지원</span>
                        </div>
                    </div>
                </li>
                <li>
                    <strong>휴가 및 문화</strong>
                    <div class="des-con">
                        <div class="des-box">
                            <span>유연근무제 운영</span>
                            <span>경조휴가 제공</span>
                            <span>자유로운 복장</span>
                        </div>
                        <div class="des-box">
                            <span>연차 및 대체휴가 제공</span>
                            <span>사내 동호회 지원</span>
                            <span>일과 후 스튜디오 무료 이용</span>
                        </div>
                        <div class="des-box">
                            <span>출산휴가, 육아휴직 및 보건휴가 보장</span>
                            <span>격월 문화행사 진행</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="careers_m">
                <li>
                    <strong>비용 지원</strong>
                    <div class="des-con">
                        <div class="des-box">
                            <span>점심 식대 및 야근 식대 지원</span>
                            <span>자사 스토어 25% 할인 혜택 제공</span>
                            <span>명절선물 지급</span>
                            <span>야근 택시비 지원</span>
                            <span>교육비 지원</span>
                            <span>인재추천금 지급</span>
                        </div>
                        <div class="des-box">
                            <span>간식, 커피 및 생맥주 무한제공</span>
                            <span>경조비 및 화환 지급</span>
                            <span>임직원 우대금융상품 제공</span>
                            <span>청년내일채움공제 가입</span>
                            <span>재직자내일채움공제 가입</span>
                        </div>

                    </div>
                </li>
                <li>
                    <strong>건강 및 휴식</strong>
                    <div class="des-con">
                        <div class="des-box">
                            <span>종합건강검진 지원</span>
                            <span>남/여 수면실 운영</span>
                            <span>단체보험 가입 제공</span>
                        </div>
                        <div class="des-box">
                            <span>안마의자 제공</span>
                            <span>스탠딩 데스크 지원</span>
                        </div>
                    </div>
                </li>
                <li>
                    <strong>휴가 및 문화</strong>
                    <div class="des-con">
                        <div class="des-box">
                            <span>유연근무제 운영</span>
                            <span>경조휴가 제공</span>
                            <span>자유로운 복장</span>
                            <span>연차 및 대체휴가 제공</span>
                            <span>사내 동호회 지원</span>
                        </div>
                        <div class="des-box">
                            <span>일과 후 스튜디오 무료 이용</span>
                            <span>출산휴가, 육아휴직 및 <br class="_m">보건휴가 보장</span>
                            <span>격월 문화행사 진행</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: "careers-info-welfare",
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

            }
        },


        beforeCreate: function () {

        },

        mounted: function () {

        },

        methods: {

        },

        components: {

        }
    }
</script>
