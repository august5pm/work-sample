App.Views.ResizeView = Backbone.View.extend({
	
	initialize : function(obj){
        this.isAddMobileCss = true;
        this.IE8_CLASS_W1024LT = "w1024lt";
        this.IE8_CLASS_W1280LT = "w1280lt";
        this.IE8_CLASS_W1500GTE = "w1500gte";
        this.addEvent();
	},
	
	render: function (){

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
        $(window).on("resize", _.bind(this.onResize, this));
        this.onResize();
	},
	
	removeEvent : function(){

	},

    onResize : function(e){
        var globalVars = App.GlobalVars;

        // �۷ι� ������ ������ ������ �����ϱ�
        globalVars.windowWidth = $(window).width();
        globalVars.windowHeight = $(window).height();
        globalVars.windowInnerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // ����̽��� ��(pc)�϶��� ȣ���ϱ�
        if(globalVars.currentDevice == globalVars.DEVICE_TYPE_WEB){

            if(globalVars.isIE8){
                globalVars.currentBrowserMode = globalVars.BROWSER_MODE_WEB;
                this.checkIE8BrowserWidth()
                this.removeMobileCss();
            }else{
                this.checkBrowserMode();
            }

        }else{
            this.checkMobileBrowserMode();
        }

        App.trigger(App.Events.RESIZE_BROWSER);
    },

    checkIE8BrowserWidth : function(){
        var globalVars = App.GlobalVars;
        var hasClass1500GTE = false;
        var hasClass1280LT = false;
        var hasClass1024LT = false;

        hasClass1280LT = $("body").hasClass(this.IE8_CLASS_W1280LT);
        hasClass1024LT = $("body").hasClass(this.IE8_CLASS_W1024LT);
        hasClass1500GTE = $("body").hasClass(this.IE8_CLASS_W1500GTE);

        if(globalVars.windowWidth >=1500){
            // ������ ���̰� 1500 ���� Ŭ ��
            if(!hasClass1500GTE){
                $("body").addClass(this.IE8_CLASS_W1500GTE);
            }

            if(hasClass1280LT){
                $("body").removeClass(this.IE8_CLASS_W1280LT);
            }

            if(hasClass1024LT){
                $("body").removeClass(this.IE8_CLASS_W1024LT);
            }

        }else if(globalVars.windowWidth >=1280 && globalVars.windowWidth < 1500){
            // ������ ���̰� 1280 ~ 1499 �϶�

            if(hasClass1500GTE){
                $("body").removeClass(this.IE8_CLASS_W1500GTE);
            }

            if(hasClass1280LT){
                $("body").removeClass(this.IE8_CLASS_W1280LT);
            }

            if(hasClass1024LT){
                $("body").removeClass(this.IE8_CLASS_W1024LT);
            }
        }else if(globalVars.windowWidth >= 1024 && globalVars.windowWidth < 1280){
            // ������ ���̰� 1024 ~ 1279 �϶�

            if(hasClass1500GTE){
                $("body").removeClass(this.IE8_CLASS_W1500GTE);
            }

            if(!hasClass1280LT){
                $("body").addClass(this.IE8_CLASS_W1280LT);
            }

            if(hasClass1024LT){
                $("body").removeClass(this.IE8_CLASS_W1024LT);
            }

        }else if(globalVars.windowWidth < 1024){
            // ������ ���̰� 1024 ���� ���� ��

            if(hasClass1500GTE){
                $("body").removeClass(this.IE8_CLASS_W1500GTE);
            }

            if(!hasClass1280LT){
                $("body").addClass(this.IE8_CLASS_W1280LT);
            }

            if(!hasClass1024LT){
                $("body").addClass(this.IE8_CLASS_W1024LT);
            }
        }
    },


    // ������ ��� üũ
    checkBrowserMode : function(){
        var globalVars = App.GlobalVars;

        if(globalVars.windowInnerWidth > globalVars.TABLET_MAX_WIDTH){
            // �� ���
            globalVars.currentBrowserMode = globalVars.BROWSER_MODE_WEB;
            this.removeMobileCss();
        }else if(globalVars.windowInnerWidth> globalVars.MOBILE_MAX_WIDTH && globalVars.windowWidth <= globalVars.TABLET_MAX_WIDTH){
            // Ÿ�� ���
            globalVars.currentBrowserMode = globalVars.BROWSER_MODE_TABLET;
            this.addMobileCss();
        }else{
            // ����� ���
            globalVars.currentBrowserMode = globalVars.BROWSER_MODE_MOBILE;
            this.addMobileCss();
        }
    },

    checkMobileBrowserMode : function(){
        var globalVars = App.GlobalVars;
        if(globalVars.windowInnerWidth > globalVars.MOBILE_MAX_WIDTH) {
            // Ÿ�� ���
            globalVars.currentBrowserMode = globalVars.BROWSER_MODE_TABLET;

        }else {
            // ����� ���
            globalVars.currentBrowserMode = globalVars.BROWSER_MODE_MOBILE;
        }
    },

    addMobileCss : function(){
        if(!this.isAddMobileCss){
            // remove navigation transition

            if(App.navigationView != undefined){
                App.trigger(App.Events.CHANGE_MOBILE);
            }

            $("head").append($("#template-mobile-css").html());
            this.isAddMobileCss = true;
        }
    },

    removeMobileCss : function(){
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) {
            if (this.isAddMobileCss) {
                // add navigation transition
                App.trigger(App.Events.CHANGE_WEB);

                $("#mobile-css").remove();
                this.isAddMobileCss = false;
            }
        }
    },

    // ũ�� ���� ���
    sumSizePer : function($targetWidth, $targetHeight, $defaultWidth, $defaultHeight){
        var perWidth = $targetWidth / $defaultWidth;
        var perHeight = $targetHeight / $defaultHeight;
        var per = 0;

        if(perWidth > perHeight){
            per = perWidth;
        }else{
            per = perHeight;
        }

        return per;
    }
});