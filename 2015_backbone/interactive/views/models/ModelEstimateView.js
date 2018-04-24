App.Views.ModelEstimateView = Backbone.View.extend({

    initialize : function(obj){
        this.modelEstimateModel = obj.modelEstimateModel;
        this.animateNumberView = obj.animateNumberView;

        this.classCon = $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area");
        this.locationCon = $("#model-pg5 .quick-price .toggle-list>li:eq(1) .content-area");

        this.classLen = 0;      // 등급 갯수

        this.selectedClassIdx = -1;     // 선택된 등급 IDX

        this.isCheckClass = false;      // 등급 체크 했는지 여부

        this.comma_unit = 3;    // 숫자에서 컴마를 몇째자리에 찍을 것인지

        // 스텝
        this.currentStep = 0;
        this.STEP_0_CLASS = 0;

        // 경고 메세지
        this.ALERT_MSG_CLASS = "등급을 선택해주세요.";
        this.ALERT_MSG_LOCATION = "지역을 선택해주세요.";
    },

    render: function (){
        this.setClass();
        this.setPrice();
        this.setSpecialOffer();
        this.addOnComplete();
    },

    // 등급 만들어주기
    setClass : function(){
        this.classLen = this.modelEstimateModel.attributes.car_class.length;
        var i=0;
        var template ="";

        for(i=0;i<this.classLen; i++){
            template += $("#template-estimate-class").html();
        }
        this.classCon.append(template);
        this.setClassData();
    },

    // 등급 데이터 넣어주기
    setClassData : function(){
        var i=0;
        for(i=0; i<this.classLen; i++){
            var classText = this.modelEstimateModel.attributes.car_class[i];
            // input
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+i+") input").attr("id", "rdo-qplv"+i);
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+i+") input").attr("data-idx", i);
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+i+") input").attr("value", classText);

            // label
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+i+") label").attr("for", "rdo-qplv"+i);
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+i+") label span").html(classText);
        }
    },

    // 가격 만들어주기
    setPrice : function(){
        this.priceLen = this.modelEstimateModel.attributes.car_class.length;;
    },

    addOnComplete : function(){
        this.onResize();
        this.show();
    },

    setSpecialOffer : function(){
        // 스페셜 오퍼 데이터가 있을 경우만 네비게이션에 입력해주기
        if(this.modelEstimateModel.attributes.special_offer[0].navi_text !== "") {
            App.navigationView.setSpecialOffer_name(this.modelEstimateModel.attributes.special_offer[0].navi_text);
        }

        if(this.modelEstimateModel.attributes.special_offer[0].contents_text !== "") {
            $("#model-pg5 .quick-offer .special-offer .text-box").css("background-image", "url('"+this.modelEstimateModel.attributes.special_offer[0].bg_image_url+"')");
            var tempOfferText = this.modelEstimateModel.attributes.special_offer[0].contents_text.split("<br>");
            var len = tempOfferText.length;
            var i = 0;
            var offerText = "";
            for(i=0; i<len; i++){
                if(i==0){
                    offerText += "<span>"+tempOfferText[i]+"</span>"
                }else{
                    offerText += "<span style='line-height:1.4'>"+tempOfferText[i]+"</span>"
                }

            }
            $("#model-pg5 .quick-offer .special-offer .text-box").append(offerText);
        }
    },

    show : function(){
        this.addEvent();
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li").on("click", this.onClick_class);
        $("#model-pg5 .quick-price .toggle-list>li:eq(1) .content-area li").on("click", this.onClick_location);

        $("#model-pg5 .quick-price .toggle-list>li>a").on("click", this.onClick_tabList);
    },



    removeEvent : function(){
        
    },

    onResize : function(){
        var leftCon = $("#model-pg5 .quick-price .toggle-list");
        if(App.GlobalVars.windowWidth > App.GlobalVars.MOBILE_MAX_WIDTH) {
            var rightCon = $("#model-pg5 .quick-price .quick-offer")
            var leftConMargin = parseInt(leftCon.css("margin-right"));
            var targetWidth = $(".inner-cont-wrap").width() - 360;

            $("#model-pg5 .quick-price").css("width", $(".inner-cont-wrap").width());
            leftCon.css("width", targetWidth);
        }else{
            leftCon.removeAttr("style");
            $("#model-pg5 .quick-price").removeAttr("style");
        }
    },

    onClick_tabList : function(e){
        var parent = $(this).parent();
        var index = parent.index();
        var _this = App.modelEstimateView;
        var isShow = parent.hasClass("on");

        _this.checkListValue(index, isShow);
        return false;
    },

    onChangeStep : function($step, $isShow){
        if($step != this.currentStep) {
            this.hideTab(this.currentStep);
            this.currentStep = $step;
            this.showTab(this.currentStep);
        }else{
            if($isShow){
                this.hideTab(this.currentStep);
            }else{
                this.showTab(this.currentStep);
            }
        }
    },

    showTab : function($idx){
        $("#model-pg5 .quick-price .toggle-list>li:eq("+$idx+")").addClass("on")
        $("#model-pg5 .quick-price .toggle-list>li:eq("+$idx+") .content-area").removeClass("hide");

        $("#model-pg5 .quick-price .toggle-list>li:eq("+$idx+") .alert-holder").removeClass("hide");
    },

    hideTab : function($idx){
        $("#model-pg5 .quick-price .toggle-list>li:eq("+$idx+")").removeClass("on")
        $("#model-pg5 .quick-price .toggle-list>li:eq("+$idx+") .content-area").addClass("hide");

        $("#model-pg5 .quick-price .toggle-list>li:eq("+$idx+") .alert-holder").addClass("hide");
    },

    checkListValue : function($idx, $isShow){
        var isNextStep = false;
        switch($idx){
            case this.STEP_0_CLASS :
                isNextStep = true;
                break;
            default :
                break;
        }

        if(isNextStep){
            this.onChangeStep($idx, $isShow);
        }
    },

    checkClassInfo : function(){
        if(!this.isCheckClass){
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .alert-holder").html(this.ALERT_MSG_CLASS);
        }else{
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .alert-holder").html("");
        }
    },

    onClick_class : function(e){
        var index = parseInt($(this).find("input").attr("data-idx"));
        var _this = App.modelEstimateView;
        _this.resetClassRadioBtn();
        _this.changeClass(index);
        _this.setClassTabText($(this).find("input").val());

        _this.isCheckClass = true;
        _this.setPriceValue();
        return false;
    },

    resetClassRadioBtn : function(){
        $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li p input").prop("checked", false);
    },

    changeClass : function($idx){
        if(this.selectedClassIdx != -1){
            $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+this.selectedClassIdx+") p").removeClass("checked");
        }
        this.selectedClassIdx = $idx;
        $("#model-pg5 .quick-price .toggle-list>li:eq(0) .content-area li:eq("+this.selectedClassIdx+") p").addClass("checked");

    },

    setClassTabText : function($str){
        $("#model-pg5 .quick-price .toggle-list li:eq(0) a .current-value .value-text").html($str);
    },

    onClick_location : function(e){
        var index = parseInt($(this).find("input").attr("data-idx"));
        var _this = App.modelEstimateView;
        _this.setPriceValue();
        return false;
    },

    setPriceValue : function(){
        if( this.isCheckClass ) {
            var priceValue = this.modelEstimateModel.attributes.price[this.selectedClassIdx].price;

            // 견적
            if(!App.GlobalVars.isIE8) {
                this.animateNumberView.animate("quick-offer-price-value", priceValue)
            }else{
                $("#model-pg5 .quick-price .quick-offer .price-wrap .pvalue").html(priceValue);
            }
        }
    },

    //comma : $number(자릿수를 붙혀질 숫자)
    commify : function($number) {
        var reg;

        if(this.comma_unit!=undefined){
            switch(this.comma_unit) {
                case  0 :
                    reg= /(^[+-]?\d+)(\d{})/;
                    break;

                case  1 :
                    reg= /(^[+-]?\d+)(\d{1})/;
                    break;

                case  2 :
                    reg= /(^[+-]?\d+)(\d{2})/;
                    break;

                case  3 :
                    reg= /(^[+-]?\d+)(\d{3})/;
                    break;

                case  4 :
                    reg= /(^[+-]?\d+)(\d{4})/;
                    break;

                case  5 :
                    reg= /(^[+-]?\d+)(\d{5})/;
                    break;

                default :
                    reg= /(^[+-]?\d+)(\d{})/;
                    break;
            }
        }else{
            reg= /(^[+-]?\d+)(\d{3})/;
        }

        $number += '';                          // to String

        while (reg.test($number))
            $number = $number.replace(reg, '$1' + ',' + '$2');

        return $number;
    }
});