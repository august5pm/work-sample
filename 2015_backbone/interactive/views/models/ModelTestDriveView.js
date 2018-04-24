App.Views.ModelTestDriveView = Backbone.View.extend({

    initialize : function(obj){
        this.modelTestDriveModel = obj.modelTestDriveModel;
        this.modelServiceCenter = new App.Views.ModelServiceCenterView({modelTestDriveModel : this.modelTestDriveModel});

        this.popupWrap_complete = $(".popup-wrap.popup-2");
        this.popupWrap_agree = $(".popup-wrap.popup-3");
        this.locationCon = $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area");
        this.branchCon = $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area");
        this.btnDetailView = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .more-info-agree .more");
        this.btnCloseDetailPopup = $(".agree-pop .close-pop");
        this.btnCloseCompletePopup = $(".pcomplete .close-pop");
        this.btnConfirmCompletePopup = $(".pcomplete .btn-area .btn-base");

        this.locationLen = 0;
        this.branchLen = 0;

        this.selectedLocationIdx = -1;
        this.selectedBranchIdx = -1;

        this.isCheckLocation = false;
        this.isCheckBranch = false;
        this.isCheckedAgree = false;
        this.isAgreePopupCheck = false;
        this.isAllChecked = false;

        // 경고 메세지
        this.ALERT_MSG_LOCATION = "지역을 선택해주세요.";
        this.ALERT_MSG_BRANCH = "전시장을 선택해주세요.";
        this.ALERT_MSG_NAME = "이름을 입력해주세요.";
        this.ALERT_MSG_PHONE = "연락처를 입력해주세요.";
        this.ALERT_MSG_PHONE_ERROR = "잘못된 형식의 전화번호입니다.";
        this.ALERT_MSG_RESIDENCE = "거주지를 입력해주세요.";
        this.ALERT_MSG_EMAIL = "E-MAIL을 입력해주세요.";
        this.ALERT_MSG_AGREE = "개인정보활용 동의를 체크해주세요.";
        this.ALERT_MSG_POP  = "자세히 보기 버튼을 눌러 개인 정보 활용에 동의해주세요.";

        // 단계
        this.currentStep = 0;
        this.STEP_0_LOCATION = 0;
        this.STEP_1_BRANCH = 1;
        this.STEP_2_USERINFO = 2
    },

    render : function (){

        this.setLocation();
        this.addOneComplete();
    },

    resetLocation : function(){
        for(i=0; i<this.locationLen; i++){
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+i+") input").prop("checked", false);


        }
    },

    setLocation : function(){
        this.locationLen = this.modelTestDriveModel.attributes.location.length;
        var i=0;
        var template = "";

        for(i=0; i<this.locationLen; i++){
            template += $("#template-testdrive-location").html();
        }
        this.locationCon.append(template);
        this.setLocationData();
    },

    setLocationData : function(){
        var i=0;
        for(i=0; i<this.locationLen; i++){
            var classText = this.modelTestDriveModel.attributes.location[i];
            // input
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+i+") input").attr("id", "rdo-svzlo-"+i);
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+i+") input").attr("data-idx", i);
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+i+") input").attr("value", classText);

            // label
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+i+") label").attr("for", "rdo-svzlo-"+i);
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+i+") label span").html(classText);
        }
    },



    resetBranch : function(){
        if(this.branchCon.children().length != 0) {
            this.branchCon.children().remove();
            this.setBranchTabText("");
            this.modelServiceCenter.setDefault();
            this.isCheckBranch = false;
            this.selectedBranchIdx = -1;
        }
    },

    setBranch : function($idx){
        if($idx != this.selectedLocationIdx) {
            this.resetBranch();
            this.branchLen = this.modelTestDriveModel.attributes.branch[$idx].length;
            var i=0;
            var template = "";

            for(i=0; i<this.branchLen; i++){
                template += $("#template-testdrive-branch").html();
            }
            this.branchCon.append(template);
            this.setBranchData($idx);
 
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li").on("click", this.onClick_branch);
        }
    },

    setBranchData : function($idx){
        var i=0;
        for(i=0; i<this.branchLen; i++){
            var classText = this.modelTestDriveModel.attributes.branch[$idx][i];
            // input
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+i+") input").attr("id", "rdo-svzct-"+i);
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+i+") input").attr("data-idx", i);
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+i+") input").attr("value", classText);

            // label
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+i+") label").attr("for", "rdo-svzct-"+i);
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+i+") label span").html(classText);
        }
    },

    addOneComplete : function(){
        this.onResize();
        this.show();
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

        // Agree Popup
        this.btnDetailView.on("click", _.bind(this.onClick_btnDetailView, this));
        this.btnCloseDetailPopup.on("click", _.bind(this.onClick_btnCloseAgreePopup, this));
        //$(".agree-pop .checkbox input").on("click", this.onClick_checkBoxAgreePopup);
       $(".agree-pop .custom-input.checkbox").on("click", this.onClick_checkBoxAgreePopup);
       //$(".agree-pop .custom-input.checkbox").change(this.onClick_checkBoxAgreePopup);
        $(".agree-pop .btn-area .btn-base").on("click", _.bind(this.onClick_agree, this));

        // complete popup
        this.btnCloseCompletePopup.on("click", _.bind(this.onClick_btnCloseCompletePopup, this));
        this.btnConfirmCompletePopup.on("click", _.bind(this.onClick_btnCloseCompletePopup, this));
    },

    removeEvent : function(){

    },

    onResize : function(){
        var leftCon = $("#model-pg6 .test-drive .toggle-list");
        if(App.GlobalVars.windowWidth > App.GlobalVars.MOBILE_MAX_WIDTH) {
            var rightCon = $("#model-pg6 .test-drive .center-location")
            var leftConMargin = parseInt(leftCon.css("margin-right"));
            //var targetWidth = $("#model-pg6 .test-drive").width() - (rightCon.width() + leftConMargin);
            var targetWidth = $(".inner-cont-wrap").width() - 360;

            $("#model-pg6 .test-drive").css("width", $(".inner-cont-wrap").width());
            leftCon.css("width", targetWidth);
        }else{
            leftCon.removeAttr("style");
            $("#model-pg6 .test-drive").removeAttr("style");
        }

        this.resizeAgreePopup();
        this.resizeCompletePopup();
    },

    resetData : function(){

        $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+this.selectedLocationIdx+") p").removeClass("checked");
        $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+this.selectedBranchIdx+") p").removeClass("checked");

        this.setLocationTabText("");
        this.setBranchTabText("");

        this.resetLocation();
        this.resetBranch();
        this.resetAgreePopup();


        this.hideTab(this.STEP_1_LOCATION);
        this.hideTab(this.STEP_2_USERINFO);
        this.showTab(this.STEP_0_LOCATION);

        this.currentStep = this.STEP_0_LOCATION;
        this.selectedLocationIdx = -1;
        this.selectedBranchIdx = -1;

        this.isCheckLocation = false;
        this.isCheckBranch = false;
        this.isCheckedAgree = false;
        this.isAgreePopupCheck = false;
        this.isAllChecked = false;
    },

    onClick_location : function(e){
        var index = parseInt($(this).find("input").attr("data-idx"));
        var _this = App.modelTestDriveView;

        _this.resetLocationRadioBtn();
        _this.setBranch(index);
        _this.changeLocation(index);
        _this.setLocationTabText($(this).find("input").val());
        _this.isCheckLocation = true;
        $("#model-pg6 .test-drive .toggle-list>li:eq(0) .alert-holder").html("");

        _this.onChangeStep(_this.STEP_1_BRANCH);

        return false
    },

    resetLocationRadioBtn : function(){
        $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li p input").prop("checked", false);
    },

    changeLocation : function($idx){
        if(this.selectedLocationIdx != -1){
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+this.selectedLocationIdx+") p").removeClass("checked");
        }

        this.selectedLocationIdx = $idx;

        $("#model-pg6 .test-drive .toggle-list>li:eq(0) .content-area li:eq("+this.selectedLocationIdx+") p").addClass("checked");
    },

    setLocationTabText : function($str){
        $("#model-pg6 .test-drive .toggle-list>li:eq(0) a .current-value .value-text").html($str);
    },

    onClick_branch : function(e){
        var index = parseInt($(this).find("input").attr("data-idx"));
        var _this = App.modelTestDriveView;

        _this.resetBranchRadioBtn();
        _this.changeBranch(index);
        _this.setBranchTabText($(this).find("input").val());
        _this.isCheckBranch = true;
        $("#model-pg6 .test-drive .toggle-list>li:eq(1) .alert-holder").html("");

        _this.onChangeStep(_this.STEP_2_USERINFO);
        _this.modelServiceCenter.setData(_this.selectedLocationIdx, _this.selectedBranchIdx);

        return false
    },

    resetBranchRadioBtn : function(){
        $("#model-pg6 .test-drive .toggle-list>li:eq(1)  .content-area li p input").prop("checked", false);
    },

    changeBranch : function($idx){
        if(this.selectedBranchIdx != -1){
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+this.selectedBranchIdx+") p").removeClass("checked");
        }

        this.selectedBranchIdx = $idx;
        $("#model-pg6 .test-drive .toggle-list>li:eq(1) .content-area li:eq("+this.selectedBranchIdx+") p").addClass("checked");
    },

    setBranchTabText : function($str){
        $("#model-pg6 .test-drive .toggle-list>li:eq(1) a .current-value .value-text").html($str);
    },


    onChange_selectGender : function(e){
        this.checkGenderInfo();
        //console.log("change gender : "+val)
    },



    onChange_selectAge : function(e){
        this.checkAgeInfo();
    },

    resetCheckAgree : function(){
        this.isCheckedAgree = false;
        $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .more-info-agree p").removeClass("checked");
        $("input:checkbox[id='chk-agree']").prop("checked", false)
    },

    onClick_checkAgree : function(e){
        var _this = App.modelTestDriveView;

        if(_this.isAgreePopupCheck){
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .more-info-agree .alert-holder").html("");

            if(_this.isCheckedAgree){
                _this.isCheckedAgree = false;
                $(this).removeClass("checked");
                $("input:checkbox[id='chk-agree']").prop("checked", false);
            }else{
                _this.isCheckedAgree = true;
                $(this).addClass("checked");
                $("input:checkbox[id='chk-agree']").prop("checked", true);
            }

            _this.checkAgreeInfo();
        }else{
            _this.isCheckedAgree = false;
            $(this).removeClass("checked");
            $("input:checkbox[id='chk-agree']").prop("checked", false);

            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .more-info-agree .alert-holder").html(_this.ALERT_MSG_POP);
        }

        return false;
    },

    onClick_btnApply : function(e){

        var code = App.GlobalVars.MODEL_NAME+'_testdrive_butt';
        App.footerView.sendEventCode( code );


        fbq('track', 'AddToCart');

        this.isAllChecked = true;
        this.checkLocationInfo();
        this.checkBranchInfo();
        this.checkNameInfo();
        this.checkPhoneInfo();
        this.checkResidenceInfo();
        this.checkEmailInfo();
        this.checkAgreeInfo();

        if(this.isAllChecked){
            this.sendDataTestDrive();
        }

        return false;
    },

    sendDataTestDrive : function(){
        var model = App.GlobalVars.MODEL_NAME
        var location = $("#model-pg6 .test-drive .toggle-list>li:eq(0) a .current-value .value-text").text();
        var branch = $("#model-pg6 .test-drive .toggle-list>li:eq(1) a .current-value .value-text").text();
        var name = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .name-holder #txt-psinfo-0").val();
        var phone = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .phone-holder #txt-psinfo-1").val();
        var residence = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .residence-holder #txt-psinfo-2").val();
        var email = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .email-holder #email-inp-1").val()+"@"+$("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .email-holder #email-inp-2").val();
        var currentDevice = ( App.GlobalVars.currentDevice !== App.GlobalVars.DEVICE_TYPE_WEB ) ? "mobile" : "web";

        location = escape( location );
        branch = escape( branch );
        name = escape( name );
        gender = escape(gender);   
        age = escape(age);        
        residence = escape( residence );


        var isCheckedAD =  $(".agree-pop .custom-input.checkbox").eq(3).attr("data-checked");
        if(isCheckedAD == "false"){
            name = "";
            gender = "";
        }
        var paramObj = { "model":model, "location":location, "branch": branch, "name": name, "gender":gender, "age":age, "phone": phone, "residence": residence, "email": email,"device":currentDevice, "cate":"models" };
        // 시승신청 배너 트래킹 코드가 있을경우, bt_code 배너 트래킹 코드 값 추가    
        if( TestDriveBannerTracking.isParam() ) {
            paramObj = { "model":model, "location":location, "branch": branch, "name": name,  "gender":gender, "age":age, "phone": phone, "residence": residence, "email": email,"device":currentDevice, 'bt_code':TestDriveBannerTracking.getParam(), "cate":"models"};
        }
        //for( var prop in paramObj ) console.log( prop+', '+paramObj[prop] );

        // App.getJsonData( App.GlobalVars.SET_TESTDRIVE_URL, paramObj, _.bind(this.setTestDriveDataComplete, this) );
        var url = (/^127|^192|localhost/).test(document.location.hostname) ? App.GlobalVars.DEBUG_SET_TESTDRIVE_URL : App.GlobalVars.SET_TESTDRIVE_URL;
        App.getJsonData( url, paramObj, _.bind(this.setTestDriveDataComplete, this) );
    },

    setTestDriveDataComplete : function(){
        this.showCompletePopup();
    },

    onClick_emailSelectBox : function(e){
        var val = $(this).val();
        var _this = App.modelTestDriveView;

        _this.checkEmailInfo();
    },

    /////////////////////////////////////////////////////////////////////////////
    //  key up event handler
    /////////////////////////////////////////////////////////////////////////////
    onKeyUp_inputName : function( $evt ) {
        var target = $($evt.currentTarget);
        var name = target.val(), isKor = '', maxInput = 0;
        if( name != '' ) {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .name-holder .alert-holder").html("");
            isKor = ( name.length > 0 && this.isKoreanAlphabet( name ) ) ? true : false;
            maxInput = isKor ? 10 : 20;
            target.attr( {maxlength:maxInput} );
        }
    },

    onKeyUp_inputPhone : function(e){
        var phone = $(this).val();
        if(phone != "") {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .phone-holder .alert-holder").html("");
        }
    },

    onKeyUp_inputResidence : function( $evt ){
        var target = $($evt.currentTarget);
        var residence = target.val(), isKor = '', maxInput = 0;
        if( residence != '' ) {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .residence-holder .alert-holder").html("");
            isKor = ( residence.length > 0 && this.isKoreanAlphabet( residence ) ) ? true : false;
            maxInput = isKor ? 10 : 20;
            target.attr( {maxlength:maxInput} );
        }
    },

    isKoreanAlphabet: function( $str ) {
        var cnt = 0;
        while( $str.length >= cnt ) {
            var str = $str.charCodeAt( cnt );
            if( 0xAC00 <= str && str <= 0xD7AF ) return true;
            cnt++;
        }
    },

    onKeyUp_inputEmailId : function( $evt ) {
        var target = $($evt.currentTarget);
        var emailId = target.val();
        var emailAddress = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .email-holder #email-inp-2").val();
        if(emailAddress != "" && emailId != ""){
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .email-holder .alert-holder").html("");
        }

        if( emailId != '' ) {
            target.attr( {maxlength:this.isKoreanAlphabet(emailId) ? 25 : 50} );
        }
    },

    onKeyUp_inputEmailAddress : function( $evt ) {
        var target = $($evt.currentTarget);
        var emailId = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .email-holder #email-inp-1").val();
        var emailAddress = target.val();
        if(emailAddress != "" && emailId != ""){
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .email-holder .alert-holder").html("");
        }

        if( emailAddress != '' ) {
            target.attr( {maxlength:this.isKoreanAlphabet(emailAddress) ? 25 : 50} );
        }
    },


    /////////////////////////////////////////////////////////////////////////////
    //  focus out event handler
    /////////////////////////////////////////////////////////////////////////////

    onFocusOut_inputName : function(e){
        this.checkNameInfo();
    },

    onFocusOut_selectGender : function(e){
        this.checkGenderInfo();
    },

    onFocusOut_selectAge : function(e){
        this.checkAgeInfo();
    },

    onFocusOut_inputPhone : function(e){
        this.checkPhoneInfo();
    },

    onFocusOut_inputResidence : function(e){
        this.checkResidenceInfo();
    },

    onFocusOut_inputEmail : function(e){
        this.checkEmailInfo();
    },


    ///////////////////////////////////////////////////////////////////////////////
    //  각 항목 선택 및 입력 여부 체크
    ///////////////////////////////////////////////////////////////////////////////
    checkLocationInfo : function(){
        if(!this.isCheckLocation){
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .alert-holder").html(this.ALERT_MSG_LOCATION);
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(0) .alert-holder").html("");
        }
    },

    checkBranchInfo : function(){
        if(!this.isCheckBranch){
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .alert-holder").html(this.ALERT_MSG_BRANCH);
            this.isAllChecked = false;
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(1) .alert-holder").html("");
        }
    },



    checkNameInfo : function(){
        var name = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .name-holder #txt-psinfo-0").val();
        if(name == "") {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .name-holder .alert-holder").html(this.ALERT_MSG_NAME);
            this.isAllChecked = false;
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .name-holder .alert-holder").html("");
        }
    },

    

    checkPhoneInfo : function(){
        var phone = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .phone-holder #txt-psinfo-1").val();
        var re = /^[0-9]+$/;
        var firstNumber = phone.substr(0, 3); 

        if(phone == "") {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .phone-holder .alert-holder").html(this.ALERT_MSG_PHONE);
            this.isAllChecked = false;
        }else if(!re.test(phone)){
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .phone-holder .alert-holder").html(this.ALERT_MSG_PHONE_ERROR);
            this.isAllChecked = false;
        }else if(phone.substr(0, 1) != "0"){
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .phone-holder .alert-holder").html(this.ALERT_MSG_PHONE_ERROR);
            this.isAllChecked = false;
        }else if(firstNumber == "010"){
            if(phone.length != 11){
                $("#model-pg6 .test-drive .toggle-list>li:eq(2) .phone-holder .alert-holder").html(this.ALERT_MSG_PHONE_ERROR);
                this.isAllChecked = false;
            }
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .phone-holder .alert-holder").html("");
        }
    },

    checkResidenceInfo : function(){
        var residence = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .residence-holder #txt-psinfo-2").val();
        if(residence == "") {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .residence-holder .alert-holder").html(this.ALERT_MSG_RESIDENCE);
            this.isAllChecked = false;
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .residence-holder .alert-holder").html("");
        }
    },


    checkEmailInfo : function(){
        var email_id = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .email-holder #email-inp-1").val();
        var email_address = $("#model-pg6 .test-drive .toggle-list>li:eq(2) .content-area .email-holder #email-inp-2").val();
        var emailFull = email_id+"@"+email_address;
        var re = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(email_id == "" || email_address == ""|| !re.test(emailFull)) {
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .email-holder .alert-holder").html(this.ALERT_MSG_EMAIL);
            this.isAllChecked = false;
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .email-holder .alert-holder").html("");
        }
    },

    checkAgreeInfo : function(){
        if(!this.isCheckedAgree){
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .more-info-agree .alert-holder").html(this.ALERT_MSG_AGREE);
            this.isAllChecked = false;
        }else{
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .more-info-agree .alert-holder").html("");
        }
    },

    ///////////////////////////////////////////////////////////////////////////////
    //  탭 클릭 이벤트
    ///////////////////////////////////////////////////////////////////////////////

    onClick_tabList : function(e){
        //console.log(App.GlobalVars.MODEL_NAME);

        if(App.GlobalVars.MODEL_NAME == "RC F" || App.GlobalVars.MODEL_NAME == "GS F" ){
            alert("해당 모델의 경우 전시장으로 연락주시기 바랍니다.");
        }else{
            var parent = $(this).parent();
            var index = parent.index();
            var _this = App.modelTestDriveView;
            var isShow = parent.hasClass("on");

            _this.checkListValue(index, isShow);
        }

        return false;
    },

    checkListValue : function($idx, $isShow){
        var isNextStep = false;
        switch($idx){
            case this.STEP_0_LOCATION :
                isNextStep = true;
                break;
            case this.STEP_1_BRANCH :
                if(this.isCheckLocation) isNextStep = true;
                else this.checkLocationInfo();
                break;
            case this.STEP_2_USERINFO :
                if(this.isCheckBranch){
                    isNextStep = true;
                }else{
                    if(!this.isCheckLocation){
                        this.checkLocationInfo();
                    }else{
                        this.checkBranchInfo();
                    }
                }
                break;
            default :
                break;
        }

        if(isNextStep){
            this.onChangeStep($idx, $isShow);
        }
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

        if(this.currentStep == this.STEP_2_USERINFO && App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB){

        }
    },

    showTab : function($idx){
        $("#model-pg6 .test-drive .toggle-list>li:eq("+$idx+")").addClass("on");
        $("#model-pg6 .test-drive .toggle-list>li:eq("+$idx+") .content-area").removeClass("hide");

        $("#model-pg6 .test-drive .toggle-list>li:eq("+$idx+") .alert-holder").removeClass("hide");
    },

    hideTab : function($idx){
        $("#model-pg6 .test-drive .toggle-list>li:eq("+$idx+")").removeClass("on");
        $("#model-pg6 .test-drive .toggle-list>li:eq("+$idx+") .content-area").addClass("hide");

        $("#model-pg6 .test-drive .toggle-list>li:eq("+$idx+") .alert-holder").addClass("hide");
    },


    /////////////////////////////////////////////////////////////////////////////
    //  개인정보 동의 팝업
    /////////////////////////////////////////////////////////////////////////////

    onClick_btnDetailView : function(e){
        this.showAgreePopupView();
        return false;
    },

    onClick_btnCloseAgreePopup : function(){
        if(!this.isCheckedAgree){
            this.isAgreePopupCheck = false;
        }
        if(!this.isAgreePopupCheck){
            this.isCheckedAgree = false;
            $("#model-pg6 .more-info-agree #chk-agree").parent().removeClass("checked");
            $("#model-pg6 .more-info-agree #chk-agree").prop("checked", false);
            $("#model-pg6 .test-drive .toggle-list>li:eq(2) .more-info-agree .alert-holder").html(this.ALERT_MSG_POP);
        }
        this.hideAgreePopupView();
        return false;
    },

    checkedAllAgreePopup : function(){
        $(".agree-pop .custom-input.checkbox").eq(0).attr("data-checked", true);
        $(".agree-pop .custom-input.checkbox").eq(1).attr("data-checked", true);
        $(".agree-pop .custom-input.checkbox").eq(2).attr("data-checked", true);

        $(".agree-pop .custom-input.checkbox").eq(0).addClass("checked");
        $(".agree-pop .custom-input.checkbox").eq(1).addClass("checked");
        $(".agree-pop .custom-input.checkbox").eq(2).addClass("checked");
    },

    resetAgreePopup : function(){
        $(".agree-pop .custom-input.checkbox").eq(0).attr("data-checked", false);
        $(".agree-pop .custom-input.checkbox").eq(1).attr("data-checked", false);
        $(".agree-pop .custom-input.checkbox").eq(2).attr("data-checked", false);
        $(".agree-pop .custom-input.checkbox").eq(3).attr("data-checked", false);

        $(".agree-pop .custom-input.checkbox").eq(0).removeClass("checked");
        $(".agree-pop .custom-input.checkbox").eq(1).removeClass("checked");
        $(".agree-pop .custom-input.checkbox").eq(2).removeClass("checked");
        $(".agree-pop .custom-input.checkbox").eq(3).removeClass("checked");
    },

    showAgreePopupView : function(){
        App.scrollView.isHold = true;
        var popup = $(".agree-pop");
        var targetY = $("#model-pg6").position().top;
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $("body").css("overflow", "hidden");
        App.showDimmed();
        this.popupWrap_agree.removeClass("hide");
        popup.css({"top": targetY});

        if(this.isCheckedAgree){
            this.checkedAllAgreePopup();
        }else{
            this.resetAgreePopup();
        }

        this.checkAgreeCheckBox();
        this.resizeAgreePopup();
    },

    hideAgreePopupView : function(){
        App.scrollView.isHold = false;
        var popup = $(".agree-pop");
        App.hideDimmed();
        this.popupWrap_agree.addClass("hide");
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $("body").css("overflow", "visible");
        App.modelView.onResize();
    },

    onClick_checkBoxAgreePopup : function(e){
        var _this = App.modelTestDriveView;
        var isChecked = $(this).attr("data-checked");

        if(isChecked == "false"){
            $(this).attr("data-checked", true);
            $(this).addClass("checked");
        }else{
            $(this).attr("data-checked", false);
            $(this).removeClass("checked");
        }
        _this.checkAgreeCheckBox();
    },

    checkAgreeCheckBox : function(){
        var isChecked1 =  $(".agree-pop .custom-input.checkbox").eq(0).attr("data-checked");
        var isChecked2 =  $(".agree-pop .custom-input.checkbox").eq(1).attr("data-checked");
        var isChecked3 =  $(".agree-pop .custom-input.checkbox").eq(2).attr("data-checked");
        if(isChecked1=="true" && isChecked2=="true" && isChecked3=="true"){
            // 확인버튼 활성화
            this.isAgreePopupCheck = true;
            if(!$(".popup.agree-pop .btn-area .btn-base").hasClass("on")) $(".popup.agree-pop .btn-area .btn-base").addClass("on");
            if($(".popup.agree-pop .btn-area .btn-base").hasClass("off")) $(".popup.agree-pop .btn-area .btn-base").removeClass("off");
            if($(".popup.agree-pop .btn-area .btn-base").hasClass("inact")) $(".popup.agree-pop .btn-area .btn-base").removeClass("inact");

        }else{
            // 확인버튼 비활성화
            this.isAgreePopupCheck = false;
            if($(".popup.agree-pop .btn-area .btn-base").hasClass("on")) $(".popup.agree-pop .btn-area .btn-base").removeClass("on");
            if(!$(".popup.agree-pop .btn-area .btn-base").hasClass("off")) $(".popup.agree-pop .btn-area .btn-base").addClass("off");
            if(!$(".popup.agree-pop .btn-area .btn-base").hasClass("inact")) $(".popup.agree-pop .btn-area .btn-base").addClass("inact");
        }
    },

    onClick_agree:function(e){
        if(this.isAgreePopupCheck){
            this.isCheckedAgree = true;
            $("#model-pg6 .more-info-agree #chk-agree").parent().addClass("checked");
            $("#model-pg6 .more-info-agree #chk-agree").prop("checked", true);
            this.checkAgreeInfo();
            this.hideAgreePopupView();
        }
        return false;
    },

    resizeAgreePopup : function(){
        var popup = $("#popup-3");
        var targetY = (App.GlobalVars.windowHeight/2) - (popup.height()/2) - 50;
        if(targetY < 0) targetY = 0;
        popup.css("top", targetY);
    },


    /////////////////////////////////////////////////////////////////////////////
    //  시승신청 완료 팝업
    /////////////////////////////////////////////////////////////////////////////

    showCompletePopup : function(){
        App.scrollView.isHold = true;
        var popup = $(".pcomplete");
        var targetY = $("#model-pg6").position().top;
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $("body").css("overflow", "hidden");
        App.showDimmed();
        this.popupWrap_complete.removeClass("hide");
        popup.css({"top": targetY});
        this.resizeCompletePopup();
    },

    hideCompletePopup : function(){
        App.scrollView.isHold = false;
        var popup = $(".pcomplete");
        App.hideDimmed();
        this.popupWrap_complete.addClass("hide");
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $("body").css("overflow", "visible");
        App.modelView.onResize();
    },

    onClick_btnCloseCompletePopup : function(e){
        this.resetData();
        this.hideCompletePopup();
        this.resetAgreePopup();
        this.resetCheckAgree();
        return false;
    },

    resizeCompletePopup : function(){
        var completePopupCon = $("#popup-2");
        var targetY = (App.GlobalVars.windowHeight/2)-(completePopupCon.height()/2);
        if(targetY < 0) targetY = 0;
        completePopupCon.css("top", targetY);
    }

});