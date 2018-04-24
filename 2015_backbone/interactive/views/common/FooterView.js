App.Views.FooterView = Backbone.View.extend({
	initialize : function(obj){
        this.pageViewCode = {};
        this.trackingCode = {};
        this.imagazinePopup = $("#imagazine")
        this.addEvent();
        //this.sendPageViewCode();
        this.getPageViewCode();
        App.trigger( App.Events.RESIZE_BROWSER );


		// /proc/in_tracking.asp?code=[코드명]
	},

	show : function(){

	},
	
	showComplete : function(){
		
	},
	
	hide : function(){
		
	},
	
	hideComplete : function(){
		
	},

	addEvent : function(){
        // 아이매거진
        $(".sns-btns .slink1 a").on("click", _.bind(this.onClick_facebook, this));
        $(".sns-btns .slink2 a").on("click", _.bind(this.onClick_youtube, this));
        $(".sns-btns .slink3 a").on("click", _.bind(this.onClick_pinterest, this));
        $(".sns-btns .slink4 a").on("click", _.bind(this.onClick_imagazine, this));

        $(".sitemap .facebook a").on("click", _.bind(this.onClick_facebook, this));
        $(".sitemap .youtube a").on("click", _.bind(this.onClick_youtube, this));
        $(".sitemap .pinterest a").on("click", _.bind(this.onClick_pinterest, this));
        $(".sitemap .i-magazine a").on("click", _.bind(this.onClick_imagazine, this));
        $(".popup-wrap.imz_wrap .close-pop a").on("click", _.bind(this.onClick_closeImagazine, this));


        $("footer .benefit>ul>li>a").on("click", _.bind(this.onClick_quickMenu, this))
        App.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);
	},

	removeEvent : function(){

	},

    onResize : function(){
        App.imgPrefixer( this );
    },

    onClick_facebook : function(e){
        var code = $(e.currentTarget).attr("data-code");
        this.sendEventCode(code);
    },

    onClick_youtube : function(e){
        var code = $(e.currentTarget).attr("data-code");
        this.sendEventCode(code);
    },

    onClick_pinterest : function(e){
        var code = $(e.currentTarget).attr("data-code");
        this.sendEventCode(code);
    },

    onClick_imagazine : function(e){
        $("html, body").css("overflow", "hidden")
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB){
            this.imagazinePopup.removeClass("hide");
            if($('body').is('#main-body')) $('#side-banner').hide();

        }else{
            var link = "";
            if(App.GlobalVars.currentOS == App.GlobalVars.OS_TYPE_ANDROID){
                //alert("android");
                link = $(".popup-wrap.imz_wrap .qr-btns .btns a").eq(0).attr("href");
                window.open(link, "_blank");
            }else if(App.GlobalVars.currentOS == App.GlobalVars.OS_TYPE_IOS){
                //alert("ios");
                link = $(".popup-wrap.imz_wrap .qr-btns .btns a").eq(1).attr("href");
                window.open(link, "_blank");
            }else{

            }
        }

        var code = $(e.currentTarget).attr("data-code");
        this.sendEventCode(code);
        return false;
    },

    onClick_closeImagazine : function(e){
        this.imagazinePopup.addClass("hide");

        if($('body').is('#main-body')) {
            $('#side-banner').show();
        }else{
            $("html, body").css("overflow", "visible")
        }
        App.resizeView.onResize();
        return false;
    },

    onClick_quickMenu : function(e){
        var code = $(e.currentTarget).attr("data-code")
        this.sendEventCode(code);
    },

    // 이벤트 태깅 보내기
    sendEventCode : function(code){
        // 구글 이벤트 태깅
        googleEventTagging(code);
        // 내부 이벤트 트래킹
        App.setEvent(code);
    },


    getPageViewCode : function(){
		var code = App.GlobalVars.PAGE_VIEW_TRAKING_CODE;
		if(code != ""){
			this.sendPageViewCode(code);
		}

    },

    // 페이지뷰 태깅 보내기
    sendPageViewCode : function(code){
        // 구글 페이지 트래킹
        googlePageTagging( code );
        // 내부 페이지 트래킹
        App.setLog(code);
    }
});