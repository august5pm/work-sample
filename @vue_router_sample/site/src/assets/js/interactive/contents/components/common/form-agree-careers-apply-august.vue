<template>
    <div class="terms-form-wrap">
        <form id="form_1" class="form-group type-outline" action="/">
            <fieldset>
                <legend class="blind">채용 지원을 위한 이용약관 동의 텍스트</legend>
                <div class="custom-chk type-single">
                    <input type="checkbox" name="agree_1" title="개인 정보 수집 및 이용약관 동의 여부" id="agree_1" @change="onChange_checkbox">
                    <label for="agree_1"><span>개인 정보 수집 및 이용약관에 동의합니다.</span></label>

                    <!--<button type="button" class="btn-cta btn-type-open on"><span class="btn-txt">이용약관 보러가기</span></button>--> <!-- open : .on -->
                </div>
                <div class="custom-toggle-box terms-wrap" :class="isShow?'on':''"> <!-- .on class add -->
                    <div class="inner-scroll-area">
                        <h3>
                            회사는 직원 채용을 위하여 아래와 같이 개인정보를 수집 및 이용하고 있습니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오. 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만 동의를 거부하는 경우 채용 지원 서비스가 제한될 수 있습니다.
                        </h3>

                        <ol class="article-list article-1-depth">
                            <li>
                                <h4>1. 수집하는 개인정보</h4>
                                <ol>
                                    <li>
                                        <ul>
                                            <li>필수항목 : 이름, 생년월일, 전화번호(휴대전화번호), 이메일 주소, 경력사항, 자기소개서</li>
                                            <li>선택항목 : 선택학력정보, 자격증정보, 외국어시험정보, 기타 경력사항</li>
                                        </ul>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h4>2. 개인정보의 수집 및 이용 목적</h4>
                                <p>회사는 채용절차에 지원하는 지원자의 지원 의사를 확인하고 본인 확인을 하기 위해 개인정보를 수집 및 이용합니다. <br><br>또한 지원자의 중복 지원을 방지하고 서비스를 부정 이용하는 것을 방지하기 위해 개인정보를 수집 및 이용하며, 채용 심사 및 심사 결과 안내, 기타 각종 안내사항이나 고지사항을 전달하기 위해 개인정보를 수집 및 이용합니다. 또한 경력 및 자격사항을 확인하고 채용 관리를 위해 개인정보를 보유합니다.
                                </p>
                            </li>
                            <li>
                                <h4>3. 개인정보 보유기간</h4>
                                <p>회사는 상시 채용 제도를 운영하고 있기에 지원자가 개인정보 수집 및 이용에 동의한 날로부터 1년간 개인정보를 보유하면서 채용풀에 사용합니다. 또한 회사는 개인정보보호법령 등에 따라 특별히 보유하여야 할 필요가 있는 경우에는 법령상 기간을 준수하여 보유하고 있습니다.</p>
                            </li>
                            <li>
                                <h4>4. 개인정보의 파기</h4>
                                <p>회사는 수집 및 처리목적을 달성하여 개인정보 처리가 불필요한 것으로 인정되거나 개인정보 보유기간의 종료, 또는 정보주체의 별도 요청이 있는 경우 수집한 개인정보를 지체없이 파기하고 있습니다.</p>
                            </li>
                        </ol>
                    </div>
                </div>
                <p class="alert-holder" :class="isError?'on':''">{{alert}}</p>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-agree-careers-apply-august",
        props: {
            itemdata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            },

            index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            },

            alert: {
                type: String,
                default: function () {
                    return "";// 기본값
                }
            }
        },

        data: function () {
            return {
                isShow : false,
                isError : false,
            }
        },


        created: function () {
            EventBus.$on(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$on(EventBus.RESET_FORM, this.onReset_form);
        },

        mounted: function () {

        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$off(EventBus.RESET_FORM, this.onReset_form);
        },

        methods: {
            // 폼 초기화
            onReset_form : function(){
                this.isError = false;
                document.getElementById('agree_1').checked = false;
            },

            // 동의하기 클릭
            onClick_agree : function(e){
                if(this.isShow){
                    this.isShow = false;
                }else{
                    this.isShow = true;
                }
            },

            // 밸리데이션 체크
            onCheck_validation : function(){
                this.onCheck_agree(true);
            },

            // 동의 체크
            onCheck_agree : function (isEmit) {
                var isChecked = document.getElementById('agree_1').checked;
                if(!isChecked){
                    this.isError = true;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                }else{
                    this.isError = false;
                    if(isEmit) EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, true)
                }
            },

            // 체크박스 변경시
            onChange_checkbox : function(){
                this.onCheck_agree(false);
            }
        },

        components: {

        }
    }
</script>
