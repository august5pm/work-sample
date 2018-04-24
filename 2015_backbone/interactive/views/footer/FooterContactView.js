App.Views.FooterContactView = Backbone.View.extend({
    initialize: function( $options ) {
        this.btnSend = $(".inner-cont-wrap .btn-base");
        this.popupWrap_complete = $(".popup-wrap.popup-1");
        this.btnCloseCompletePopup = $(".pcomplete .close-pop");
        this.btnConfirmCompletePopup = $(".pcomplete .btn-area .btn-base");
        this.checkBox1 = $(".inner-cont-wrap .person-info>p").eq(0);
        this.checkBox2 = $(".inner-cont-wrap .form-inner").find('p.certified');
        this.contentInput = $(".inner-cont-wrap .form-list dd:eq(4) textarea");

        // ��� �޼���
        this.ALERT_MSG_TITLE = "������ �Է����ּ���.";
        this.ALERT_MSG_NAME = "������ �� �̸��� �Է����ּ���.";
        this.ALERT_MSG_EMAIL = "E-MAIL�� �Է����ּ���.";
        this.ALERT_MSG_TEL = "����ó�� �Է����ּ���.";
        this.ALERT_MSG_CONTENTS = "������ �Է����ּ���.";
        this.ALERT_MSG_AGREE = "���� ���� Ȱ�� �������ּ���.";

        // �Էµ����� �ִ����
        this.ALERT_LENGTH_TITLE = 100;
        this.ALERT_LENGTH_NAME = 20;
        this.ALERT_LENGTH_EMAIL = 50;
        this.ALERT_LENGTH_TEL = 20;
        this.ALERT_LENGTH_CONTENTS = 3000;

        this.isCheckForm = true;
        this.STEP_TITLE = 0;
        this.STEP_NAME = 1;
        this.STEP_EMAIL = 2;
        this.STEP_TEL = 3;
        this.STEP_CONTENTS = 4;

        this.show();
    },

    render: function() {

    },

    show: function() {
        this.addEvent();
        _.delay( _.bind(this.replaceProtocol, this), 500 );
    },

    // �������� �����, ���ڼ� ���������� http �� https url �ٽ� ������� ġȯ 
    replaceProtocol: function() {
        $.each( $('a'), function( $index, $element ) {
            var href = String( $element );
            if( href.indexOf('#') > -1 || href.indexOf('contact') > -1 ) return;

            var replaceHref = href.replace('https', 'http');
            $(this).attr( {'href':replaceHref} );
        });
    },

    showComplete: function() {

    },

    hide: function() {

    },

    hideComplete: function() {

    },

    addEvent: function() {
        this.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);

        $(".inner-cont-wrap .form-list dd input").on("focusout", this.onFocusOut_input);
        $(".inner-cont-wrap .form-list dd textarea").on("focusout", this.onFocusOut_input);
        this.checkBox1.on("click", this.onClick_agreeCheckBox);

        // ���� ���� ��ư �̺�Ʈ
        this.btnSend.on("click", _.bind(this.onClick_btnSend, this));
        // �߰��� ���� üũ�ڽ� �̺�Ʈ
        this.checkBox2.on("click", _.bind(this.onClick_certifiedCheckBox, this));

        // complete popup
        this.btnCloseCompletePopup.on("click", _.bind(this.onClick_btnCloseCompletePopup, this));
        this.btnConfirmCompletePopup.on("click", _.bind(this.onClick_btnCloseCompletePopup, this));

        this.contentInput.on("focusin", _.bind(this.onFocusIn_content, this));
        this.contentInput.on("focusout", _.bind(this.onFocusOut_content, this));
        this.contentInput.on("change keyup paste input", _.bind(this.onKeyUp_content, this));
    },

    onFocusIn_content: function( $evt ) {
        var target = $($evt.currentTarget);
        var p = target.parent().find('p.alert-holder');
        p.css( {color:'#666'} );

        if( target.val().length == 0 ) {
            p.html('');

        } else {
            p.html( '���ڼ� '+target.val().length+' ��' );
        }
    },

    onFocusOut_content: function( $evt ) {
        var target = $($evt.currentTarget);
        var p = target.parent().find('p.alert-holder');
        // p.css( {color:'#ff0000'} );
    },

    onKeyUp_content: function( $evt ) {
        var target = $($evt.currentTarget);
        var val = target.val();
        var p = target.parent().find('p.alert-holder');
        p.html( '���ڼ� '+target.val().length+' ��' );

        if( val.length > 0 ) p.css( {color:'#666'} );

        if( val !== '' && val.length > this.ALERT_LENGTH_CONTENTS ) {
            p.css( {color:'#ff0000'} );
            p.html( '������ '+this.getCommonAletMsg(this.ALERT_LENGTH_CONTENTS) );
        }
    },

    removeEvent: function() {

    },

    onResize : function(){
        this.resizeCompletePopup();
    },

    resetData : function(){

        // Ÿ��Ʋ
        $(".inner-cont-wrap .form-list dd:eq(0) input").val("");

        // �����»��
        $(".inner-cont-wrap .form-list dd:eq(1) input").val("");

        // �̸���
        $(".inner-cont-wrap .form-list dd:eq(2) input").val("");

        // ��ȭ��ȣ
        $(".inner-cont-wrap .form-list dd:eq(3) input").val("");

        // ����
        $(".inner-cont-wrap .form-list dd:eq(4) textarea").val("");
        $(".inner-cont-wrap .form-list dd:eq(4) .alert-holder").html('');

        // üũ�ڽ�
        this.checkBox1.removeClass("checked");
        this.checkBox1.attr("data-checked", "false");
        $("input:checkbox[id='check-idx']").prop("checked", false);

        // �߰��� üũ�ڽ�
        this.checkBox2.removeClass("checked");
        this.checkBox2.attr("data-checked", "false");
        $("input:checkbox[id='check-certified']").prop("checked", false);
    },

    onClick_btnSend : function(e){
        this.isCheckForm = true;

        this.checkTitle();
        this.checkName();
        this.checkEmail();
        this.checkTel();
        this.checkContents();
        this.checkAgree();

        if(this.isCheckForm){
            this.sendData();
        }
        return false;
    },

    sendData : function(){
        var title = $(".inner-cont-wrap .form-list dd:eq(0) input").val();
        var name = $(".inner-cont-wrap .form-list dd:eq(1) input").val();
        var email = $(".inner-cont-wrap .form-list dd:eq(2) input").val();
        var tel = $(".inner-cont-wrap .form-list dd:eq(3) input").val();
        var contents = $(".inner-cont-wrap .form-list dd:eq(4) textarea").val()

        var dataObj_certified = {"title":title, "name":name, "email":email, "tel":tel, "contents":contents.replace(/\n/gi, "<br>")}

        title = escape( title );
        name = escape( name );
        contents = escape( contents );

       
        var dataObj = {"title":title, "name":name, "email":email, "tel":tel, "contents":contents.replace(/\n/gi, "<br>")}
        var url = (/^127|^192|localhost/).test(document.location.hostname) ? App.GlobalVars.DEBUG_SET_CONTACT_URL : App.GlobalVars.SET_CONTACT_URL;

        // App.getJsonData( url, dataObj, _.bind(this.setContactDataComplete, this) );
        this.setPostData( url, dataObj, _.bind(this.setContactDataComplete, this) );

        // �߰��� ���� üũ��, �߰��� ����Ʈ�� �������� �߼�     Add Jyjoo   DATE 2015.09.15
        var val = $(".inner-cont-wrap .form-inner .checkbox").attr("data-checked");
        if( val == 'true' ) {
            url = App.GlobalVars.SET_CONTACT_CERTIFIED_URL;
            this.setPostData( url, dataObj_certified );
        }
    },

    setPostData: function( $url, $data, $callback ) {
         $.ajax( {url:$url, type:"POST", data:$data, dataType:"jsonp",
             error: function( xhr, status, error ) {
             },
             success: function( $json ) {
                 $callback( $json );
             }
         });
    },

    setContactDataComplete: function( $param ) {
        this.showCompletePopup();
    },

    onFocusOut_input : function(e){
        var index = parseInt($(this).parent().attr("data-index"));
        var _this = App.footerContactView;
        _this.checkStep(index);
    },

    onClick_certifiedCheckBox: function(e){
        var checked = this.checkBox2.attr("data-checked");
        var c = ( checked == 'false' ) ? 'addClass' : 'removeClass';
        this.checkBox2.attr( {'data-checked':( checked == 'false' ) ? 'true' : 'false'} );
        this.checkBox2[c]('checked');
        $("input:checkbox[id='check-certified']").prop( {'checked':( checked == 'false' ) ? true : false} );
        return false;
    },

    onClick_agreeCheckBox : function(e){
        var isChecked = $(this).attr("data-checked");
        var _this = App.footerContactView;

        if(isChecked == "false"){
            $(this).attr("data-checked", "true");
            $(this).addClass("checked");
            $("input:checkbox[id='check-idx']").prop("checked", true);
        }else{
            $(this).attr("data-checked", "false");
            $(this).removeClass("checked");
            $("input:checkbox[id='check-idx']").prop("checked", false);
        }

        _this.checkAgree();
        return false
    },

    getCommonAletMsg: function( $length ) {
        return $length+'�� �̳��� �Է��� �ּ���.';
    },

    // ���� �� üũ
    checkTitle : function(){
        var val = $(".inner-cont-wrap .form-list dd:eq(0) input").val();

        if(val == "") {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(0) .alert-holder").html(this.ALERT_MSG_TITLE);

        } else if( val !== '' && val.length > this.ALERT_LENGTH_TITLE ) {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(0) .alert-holder").html( '������ '+this.getCommonAletMsg( this.ALERT_LENGTH_TITLE ) );

        }else{
            $(".inner-cont-wrap .form-list dd:eq(0) .alert-holder").html("");
        }
    },

    // ������ ��� �� üũ
    checkName : function(){
        var val = $(".inner-cont-wrap .form-list dd:eq(1) input").val();
        if(val == ""){
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(1) .alert-holder").html(this.ALERT_MSG_NAME);

        } else if( val !== '' && val.length > this.ALERT_LENGTH_NAME ) {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(1) .alert-holder").html( '������ �� �̸��� '+this.getCommonAletMsg( this.ALERT_LENGTH_NAME ) );

        }else{
            $(".inner-cont-wrap .form-list dd:eq(1) .alert-holder").html("");
        }
    },

    // �̸��� �� üũ
    checkEmail : function(){
        var val = $(".inner-cont-wrap .form-list dd:eq(2) input").val();
        var re = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if( val == "" || !re.test(val) ) {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(2) .alert-holder").html(this.ALERT_MSG_EMAIL);

        } else if( val !== '' && val.length > this.ALERT_LENGTH_EMAIL ) {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(2) .alert-holder").html( 'E-MAIL�� '+this.getCommonAletMsg( this.ALERT_LENGTH_EMAIL ) );

        }else{
            $(".inner-cont-wrap .form-list dd:eq(2) .alert-holder").html("");
        }
    },

    // ����ó �� üũ
    checkTel : function(){
        var val = $(".inner-cont-wrap .form-list dd:eq(3) input").val();
        var re = /^[0-9\-]+$/;

        if(val == "" ||  !re.test(val)){
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(3) .alert-holder").html(this.ALERT_MSG_TEL);

        } else if( val !== '' && val.length > this.ALERT_LENGTH_TEL ) {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(3) .alert-holder").html( '����ó�� '+this.getCommonAletMsg( this.ALERT_LENGTH_TEL ) );

        }else{
            $(".inner-cont-wrap .form-list dd:eq(3) .alert-holder").html("");
        }
    },

    // ���� �� üũ
    checkContents : function(){
        var val = $(".inner-cont-wrap .form-list dd:eq(4) textarea").val();
        if(val == ""){
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(4) .alert-holder").css( {color:'#ff0000'} );
            $(".inner-cont-wrap .form-list dd:eq(4) .alert-holder").html(this.ALERT_MSG_CONTENTS);

        } else if( val !== '' && val.length > this.ALERT_LENGTH_CONTENTS ) {
            this.isCheckForm = false;
            $(".inner-cont-wrap .form-list dd:eq(4) .alert-holder").css( {color:'#ff0000'} );
            $(".inner-cont-wrap .form-list dd:eq(4) .alert-holder").html( '������ '+this.getCommonAletMsg( this.ALERT_LENGTH_CONTENTS ) );

        }else{
           
        }
    },

    // �������� ���� �� üũ
    checkAgree : function(){
        var val = $(".inner-cont-wrap .person-info .checkbox").attr("data-checked");
        if(val == "false"){
            this.isCheckForm = false;
            $(".inner-cont-wrap .person-info .alert-holder").html(this.ALERT_MSG_AGREE);
        }else{
            $(".inner-cont-wrap .person-info .alert-holder").html("");
        }
    },

    checkStep : function($index){
        switch($index){
            case this.STEP_TITLE:
                this.checkTitle();
                break;
            case this.STEP_NAME :
                this.checkName();
                break;
            case this.STEP_EMAIL :
                this.checkEmail();
                break;
            case this.STEP_TEL :
                this.checkTel();
                break;
            case this.STEP_CONTENTS :
                this.checkContents();
                break;
        }
    },

    ////////////////////////////////////////////////////////////////////////////
    //  �������� �Ϸ� �˾�
    /////////////////////////////////////////////////////////////////////////////

    showCompletePopup : function(){
        App.scrollView.isHold = true;
        var popup = $(".pcomplete");

        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $("body").css("overflow", "hidden");
        App.showDimmed();
        this.popupWrap_complete.removeClass("hide");
        this.resizeCompletePopup();
    },

    hideCompletePopup : function(){
        App.scrollView.isHold = false;
        var popup = $(".pcomplete");
        App.hideDimmed();
        this.popupWrap_complete.addClass("hide");
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $("body").css("overflow", "visible");
    },

    onClick_btnCloseCompletePopup : function(e){
        this.resetData();
        this.hideCompletePopup();
        return false;
    },

    resizeCompletePopup : function(){
        var completePopupCon = $("#popup-1");
        var targetY = (App.GlobalVars.windowHeight/2)-(completePopupCon.height()/2)

        if(targetY < 0) targetY = 0;
        completePopupCon.css("top", targetY);
    }
});