App.Views.NavigationView = Backbone.View.extend({
	
	initialize : function(obj){

        this.navigationModel = obj.navigationModel;

        this.firstIndex = App.GlobalVars.NAVIGATION_FIRST_INDEX;
        this.secondIndex = App.GlobalVars.NAVIGATION_SECOND_INDEX;
        this.thirdIndex = App.GlobalVars.NAVIGATION_THIRD_INDEX;
        this.benefitIndex = App.GlobalVars.NAVIGATION_BENEFIT_INDEX;
        this.etcIndex = App.GlobalVars.NAVIGATION_ETC_INDEX;

        this.curFirstIndex = -1;

        this.mobileSubMenu = "";
        this.mobileSubMenTitle = "";

        this.isDimmed = false;
        this.isFirstAreaIn = false;
        this.isNavigationOpen = true;
        this.isMobile = false;
        this.container = $("#main-navi .top-level-menu");

        //mobile navi control
        this.isMobileNavi_mainOpen = false;
        this.isMobileNavi_modelsOpen = false;
        this.isMobileNavi_thirdOpen = false;

        this.delayId;
        this.delaySecondId;
        this.delayTransitionId;
        this.delayNavioutId;


        this.modelCon = $("#navigation>.model-navis>.sub-menu");
        this.lineLen = 0;
       
        this.addCount = 0;
        this.classNameArr = ["","col-2","col-3", "col-4"];

        // third navi 컨테이너 인덱스 - 모델, 컨셉카, 퓨쳐카
        this.thirdNaviConIndex = 0;
        this.getNavigationData();
	},

    // change mobile
    onChangeMobile: function(){

        this.removeContainerTransition();
        this.removeWebEvent();
        this.isMobile = true;

        this.addContainerTransition();
        this.addMobileEvent();
    },

    // change web
    onChangeWeb: function(){
        this.removeContainerTransition();
        this.removeMobileEvent();
        this.isMobile = false;

        this.addContainerTransition();
        this.addWebEvent();

    },

    setting: function(){

        if($("#container").hasClass("conceptcar")){
            //conceptcar
            this.thirdNaviConIndex = 1;
            $(this.thirdNaviConArr[0]).addClass("hide");
            $(this.thirdNaviConArr[2]).addClass("hide");
            $(".navi-wrap .banners.brochure").addClass("hide");
        } else if($("#container").hasClass("futurecar")){
            //futurecar
            this.thirdNaviConIndex = 2;
            $(this.thirdNaviConArr[0]).addClass("hide");
            $(this.thirdNaviConArr[1]).addClass("hide");
            $(".navi-wrap .banners.brochure").addClass("hide");
        } else {
            //models
            this.thirdNaviConIndex = 0;
            $(this.thirdNaviConArr[1]).addClass("hide");
            $(this.thirdNaviConArr[2]).addClass("hide");
        }

        if(this.firstIndex == -1) {
            this.isNavigationOpen = true;
        } else {
            this.isNavigationOpen = false;

            if(this.thirdIndex == -1){
                this.setContainerPosition(1);
            } else {
                this.setContainerPosition(2);
            }
        }

        $(".benefit").removeClass("hide")

        this.controlThirdNavi(this.thirdIndex);
    },

    setNaviArr: function(){
        this.firstNaviArr = this.container.find('>ul>li');
        this.secondNaviArr = [];
        this.secondNaviConArr =[];
        this.thirdNaviArr = [];
        this.thirdNaviConArr =[];
        this.benefitNaviArr = [];
        this.etcNaviArr = [];
        this.modelsCategoryArr = [];

        for(var i=0 ; i<this.firstNaviArr.length ; i++){
            var con = $(this.firstNaviArr[i]).find('.submn-depth2');
            $(this.firstNaviArr[i]).attr("index", i);

            this.secondNaviConArr.push(con);

            var index = 0;
            var arr = [];
            if(i == 0){
                arr = $(con).find('.sub-menu ul>li');

                for(var j=0 ; j<arr.length ; j++){
                    $(arr[j]).attr("index", index++);
                }

                var thirdCon = $(this.firstNaviArr[i]).find('.submn-depth3');
                this.thirdNaviConArr = thirdCon;

                for(var n=0 ; n<thirdCon.length ; n++){
                    var conThird = $(thirdCon[n]).find('ul>li');

                    var num = 0;
                    for(var m=0 ; m<conThird.length ; m++){
                        $(conThird[m]).attr("index", num++);
                    }
                    this.thirdNaviArr.push(conThird);
                }

            } else {
                arr = $(con).find('.detail-list>li');

                for(var j=0 ; j<arr.length ; j++){
                    $(arr[j]).attr("index", index++);
                }
            }
            this.secondNaviArr.push(arr);
        }

        this.benefitNaviArr = $(".benefit").find('>ul>li');
        for(var i=0 ; i<this.benefitNaviArr.length ; i++){
            $(this.benefitNaviArr[i]).attr("index", i);
        }

        this.etcNaviArr = $(".foot-cont").find('>ul>li');
        for(var i=0 ; i<this.etcNaviArr.length ; i++){
            $(this.etcNaviArr[i]).attr("index", i);
        }

        this.modelsCategoryArr = $(".model-navis-wrap").find('.category>li');
        for(var i=0 ; i<this.modelsCategoryArr.length ; i++){
            $(this.modelsCategoryArr[i]).attr("index", i);
        }
    },

    setThirdNavi_name: function(modelname){
        $(".submn-depth3 .title span").html(modelname);
    },


	render: function (){
        this.lineLen = this.navigationModel.attributes.models.length;
        this.makeModelMenu();
	},

    makeModelMenu : function(){
        this.makeModelLine();
        this.makeModelList();
        this.setModelMenuData();
        this.addModelEtc();
        this.addNavigationComplete();

    },

    // 모델 메뉴 라인컨테이너 만들기
    makeModelLine : function(){
        var i = 0;
        var template = $('#template-navigation-model').html();
        var strEle = "";

        for(i=0; i<this.lineLen; i++){
            strEle += template;
        }

        $("#model-navi .sub-menu").append(strEle);
    },

    // 모델 메뉴 라인컨테이너에 모델 리스트 생성하기
    makeModelList : function(){
        var i= 0, j=0;
        var modelLen = 0;
        var template = $('#template-navigation-model-list').html();
        var strEle = "";
        var count = 0;
        var pos_class_name = "";

        for(i=0; i<this.lineLen; i++){
            modelLen =  this.navigationModel.attributes.models[i].menu.length;
            strEle = "";
            for(j=0; j<modelLen; j++){
                strEle += template;
            }
            var classname = "pos-def-"+i

            count = i+1;

            if (count % 2 == 0) {
                pos_class_name = this.classNameArr[1];
            }

            if (count % 3 == 0) {
                if (pos_class_name == "") {
                    pos_class_name = this.classNameArr[2];
                } else {
                    pos_class_name += " " + this.classNameArr[2];
                }
            }

            if (count % 4 == 0) {
                if (pos_class_name == "") {
                    pos_class_name = this.classNameArr[3];
                } else {
                    pos_class_name += " " + this.classNameArr[3];
                }
            }

            $("#model-navi .sub-menu>li:eq("+i+")").addClass(classname+" "+pos_class_name);
            $("#model-navi .sub-menu>li:eq("+i+") .model-list").append(strEle);

            // 초기화
            pos_class_name = ""
            count++
        }
    },

    // 생성된 모델 메뉴에 데이터 넣어주기
    setModelMenuData : function(){
        var i= 0, j= 0;
        var modelLen = 0;
        var subCount = 0;
        for(i=0; i<this.lineLen; i++){
            // 7번째에 Future Car 메뉴가 감춰저 있기 때문에 -> FutureCar 메뉴 삭제되면 변경요망
            var lineTag = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-code .line-tag").html(this.navigationModel.attributes.models[i].line_text);
            var carImg = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-code .pic img").attr("src", this.navigationModel.attributes.models[i].car_image_url);
            var carImgAltText = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-code .pic img").attr("alt", this.navigationModel.attributes.models[i].car_image_alt_text);


            modelLen =  this.navigationModel.attributes.models[i].menu.length;
            for(j=0; j<modelLen; j++){
                var menuText = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-list>li:eq("+j+") .atxt em").html(this.navigationModel.attributes.models[i].menu[j].menu_text);
                var linkUrl = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-list>li:eq("+j+") a").attr("href", this.navigationModel.attributes.models[i].menu[j].link_url);
                var linkTarget = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-list>li:eq("+j+") a").attr("target", this.navigationModel.attributes.models[i].menu[j].link_target);

                var modelSubIndex = $("#model-navi .sub-menu>li:eq("+i+") .model-list>li:eq("+j+") a").attr("second-index", subCount);
                var isHybrid = $("#model-navi .sub-menu>li:eq("+i+") .model-list>li:eq("+j+") a").attr("isHybrid", this.navigationModel.attributes.models[i].menu[j].isHybrid);
                var isFsports = $("#model-navi .sub-menu>li:eq("+i+") .model-list>li:eq("+j+") a").attr("isFsport", this.navigationModel.attributes.models[i].menu[j].isFSPORT);

                var code = $("#model-navi .model-navis .sub-menu .pos-def-"+i+" .model-list>li:eq("+j+") a").attr("data-code", "navi_models_"+this.navigationModel.attributes.models[i].menu[j].code);

                subCount++
            }
        }
    },



    addModelEtc : function(){
        var template = $('#template-navigation-model-etc').html();
        $("#model-navi .sub-menu").append(template);
    },

    checkModelSubIndex : function(){
        var i=0, j=0;
        var modelLen = 0;
        var subCount = 0;
        for(i=0; i<this.lineLen; i++){
            modelLen =  this.navigationModel.attributes.models[i].menu.length;
            for(j=0; j<modelLen; j++){
                var menuText = this.navigationModel.attributes.models[i].menu[j].menu_text
                if(menuText == App.GlobalVars.MODEL_NAME){
                    this.secondIndex = subCount;
                    return;
                }
                subCount++
            }
        }
    },



    addNavigationComplete : function(){
        this.addCount++
        // 모델, 렉서스 스토리 메뉴 ADD가 모두 완료되면
        if(this.addCount == 1){
            this.start();
        }
    },

    start:function(){
        this.setNaviArr();
        this.addEvent();

        this.listenTo(App, App.Events.CHANGE_MOBILE, this.onChangeMobile);
        this.listenTo(App, App.Events.CHANGE_WEB, this.onChangeWeb);

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB){
            this.isMobile = false;
            this.addWebEvent();
        }else{
            this.isMobile = true;
            this.addMobileEvent();
        }


        if(this.firstIndex == 0){
            this.checkModelSubIndex();
        }

        $("#navigator").removeClass("hide");
        this.addContainerTransition();
        this.setThirdNavi_name(App.GlobalVars.MODEL_NAME);
        this.delayFirstOut();
        this.setting();
        this.setCheckNavigation();


    },



	show : function(){

	},
	
	showComplete : function(){
		
	},
	
	hide : function(){
		
	},
	
	hideComplete : function(){

	},

    ////////////////////////////////////////////////
    // event
	addEvent : function(){
        // 1뎁스 클릭
        $("#navigator .top-level-menu>ul>li>a").on("click", this.onClick_oneDepth);

        // 2뎁스 클릭
        $(".submn-depth2 .detail-list>li>a").on("click", this.onClick_twoDepth);

        // 2뎁스 클릭
        $(".submn-depth2 .model-list>li>a").on("click", this.onClick_twoDepth);



        //mouseover
        this.modelsCategoryArr.on('mouseover', _.bind(this.onOverModels_category, this));

        // 3depth menu click event
        $(".detail-menu-wrap.submn-depth3 .detail-list li>a").on("click", this.onClick_threeDepth);

        // 2depth menu click event - hybrid
        $(".mnav-idx-2 .detail-menu-wrap.submn-depth2 .dpnavi-list li>a").on("click", this.onClick_hybridTwoDepth);
        $(".mnav-idx-3 .detail-menu-wrap.submn-depth2 .dpnavi-list li>a").on("click", this.onClick_fperformenceTwoDepth);

        $(".mnav-idx-4 .detail-menu-wrap.submn-depth2 .dpnavi-list li>a").on("click", this.onClick_membershipTwoDepth);
        $(".mnav-idx-5 .detail-menu-wrap.submn-depth2 .dpnavi-list li>a").on("click", this.onClick_serviceTwoDepth);



	},

    addWebEvent: function(){
        this.modelsCategoryArr.on('mouseout', _.bind(this.onOutModels_category, this));

        $(".btn-back").on("click", _.bind(this.onBackClick, this));

        $("#main-navi").on("mouseover", _.bind(this.onNaviOver, this));
        $("#main-navi").on("mouseout", _.bind(this.onNaviOut, this));

        this.container.find('>ul>li').on("mouseover", _.bind(this.onFirstOver, this));
        this.container.find('>ul>li').on("mouseout", _.bind(this.onFirstOut, this));

        $(".benefit").find('>ul>li').on("mouseover", _.bind(this.onBenefitOver, this));
        $(".benefit").find('>ul>li').on("mouseout", _.bind(this.onBenefitOut, this));

        $(".foot-cont").find('>ul>li').on("mouseover", _.bind(this.onEtcOver, this));
        $(".foot-cont").find('>ul>li').on("mouseout", _.bind(this.onEtcOut, this));

        for(var i=0 ; i<this.secondNaviArr.length ; i++){
            this.secondNaviArr[i].on("mouseover", _.bind(this.onSecondOver, this));
            this.secondNaviArr[i].on("mouseout", _.bind(this.onSecondOut, this));
        }

        for(var i=0 ; i<this.thirdNaviArr.length ; i++){
            this.thirdNaviArr[i].on("mouseover", _.bind(this.onThirdOver, this));
            this.thirdNaviArr[i].on("mouseout", _.bind(this.onThirdOut, this));
        }

        $(".model-navis-wrap").on("mouseover", _.bind(this.onModelsOver, this));
        $(".model-navis-wrap").on("mouseout", _.bind(this.onModelsOut, this));

        $(".submn-depth3").on("mouseover", _.bind(this.onThirdConOver, this));
        $(".submn-depth3").on("mouseout", _.bind(this.onThirdConOut, this));


        if(!App.isIE8) $(window).on("mousemove", _.bind(this.onMouseMove, this));
    },

    addMobileEvent : function(){
        $('.bnt-tgl-nav').on('click', _.bind(this.onToggleMainNavi, this));

        $('#main-navi').find('.models-menu>a').on('click', _.bind(this.toggleMobileModelMenu, this));

        $('.btn-back').on('click', _.bind( function(e){ this.toggleMobile3DethMenu(e) } , this));

        this.setMobile();
    },
	
	removeEvent : function(){
        //mouseover
        this.modelsCategoryArr.off('mouseover');

        this.removeWebEvent();
        this.removeMobileEvent();
	},

    removeWebEvent: function(){
        this.modelsCategoryArr.off('mouseout');
        $(".btn-back").off("click");

        $("#main-navi").off("mouseover");
        $("#main-navi").off("mouseout");

        this.container.find('>ul>li').off("mouseover");
        this.container.find('>ul>li').off("mouseout");

        $(".benefit").find('>ul>li').off("mouseover");
        $(".benefit").find('>ul>li').off("mouseout");

        $(".foot-cont").find('>ul>li').off("mouseover");
        $(".foot-cont").find('>ul>li').off("mouseout");

        for(var i=0 ; i<this.secondNaviArr.length ; i++){
            this.secondNaviArr[i].off("mouseover");
            this.secondNaviArr[i].off("mouseout");
        }

        for(var i=0 ; i<this.thirdNaviArr.length ; i++){
            this.thirdNaviArr[i].off("mouseover");
            this.thirdNaviArr[i].off("mouseout");
        }

        $(".model-navis-wrap").off("mouseover");
        $(".model-navis-wrap").off("mouseout");

        $(".submn-depth3").off("mouseover");
        $(".submn-depth3").off("mouseout");

        $(window).off("mousemove");
    },

    removeMobileEvent : function(){
        $('.bnt-tgl-nav').off('click');
        $('#main-navi').find('.models-menu>a').off('click');
        $('.btn-back').off('click');

        this.resetMobile();
    },


    ////////////////////////////////////////////////
    ////////////////////////// navi over
    onNaviOver: function(){
        clearTimeout(this.delayId);
    },

    onNaviOut: function(){

        clearTimeout(this.delayId);
        if(this.firstIndex == -1){
            this.delayId = _.delay(_.bind(this.delayFirstOut, this), 200);
        } else {
            if(!this.isFirstAreaIn && !this.isDimmed){
                if($("#main-navi").hasClass("depth2") || $("#main-navi").hasClass("depth3")) return;
                this.delayId = _.delay(_.bind(this.onBackClick, this), 500);
            }
        }
    },



    ////////////////////////////////////////////////
    //    mobile & tablet menu
    ////////////////////////////////////////////////

    onToggleMainNavi : function(e){
        e.preventDefault();

        if(this.isMobileNavi_mainOpen){
            //close
            this.mobile_MainsMenu_close();
            this.mobile_ModelsMenu_close();
        } else {
            //open
            this.mobile_MainsMenu_open();
            this.mobile_ThirdMenu_close();
        }
    },

    toggleMobileModelMenu : function(e){
        e.preventDefault();

        if(this.isMobileNavi_modelsOpen){
            this.mobile_ModelsMenu_close();
        } else {
            this.mobile_ModelsMenu_open();

        }
    },


    toggleMobile3DethMenu : function(e){

        if(this.isMobileNavi_thirdOpen){
            this.mobile_ThirdMenu_close();
        } else {
            this.mobile_ThirdMenu_open();

            if(this.isMobileNavi_mainOpen){
                this.mobile_MainsMenu_close();
            }
        }

        if(e != undefined) e.preventDefault();
    },

    ////////////////////////////////////////////////////
    //mobile main menu control
    mobile_MainsMenu_open: function(){
        this.isMobileNavi_mainOpen = true;

        $("#main-navi").addClass('open');
        $(".navi-wrap .top-level-menu").addClass('open');

        var tg = this.thirdIndex != -1 ? $(".models-menu .submn-depth3") : $(".navi-wrap .detail-menu-wrap");
        tg.addClass("sub-position");
    },

    mobile_MainsMenu_close: function(){
        this.isMobileNavi_mainOpen = false;

        $("#main-navi").removeClass('open');
        $(".navi-wrap .top-level-menu").removeClass('open');

        var tg = this.thirdIndex != -1 ? $(".models-menu .submn-depth3") : $(".navi-wrap .detail-menu-wrap");
        tg.removeClass("sub-position");
    },


    ////////////////////////////////////////////////////
    //mobile models menu control
    mobile_ModelsMenu_open: function(){
        this.isMobileNavi_modelsOpen = true;

        $(".navi-wrap .top-level-menu>ul>li.models-menu>a em.icon i").css("backgroundPositionY", "-70px");

        $(".model-navis").css({"height": $(window).height() - 80 +"px", "overflow": "scroll"});
        $(".model-navis-wrap").css({"height": $(window).height() - 80 +"px"});
    },

    mobile_ModelsMenu_close: function(){
        this.isMobileNavi_modelsOpen = false;

        $(".model-navis").scrollTop(0);
        $(".navi-wrap .top-level-menu>ul>li.models-menu>a em.icon i").css("backgroundPositionY", "");

        $(".model-navis").css({"height": "", "overflow": ""});
        $(".model-navis-wrap").css({"height": ""});
    },

    ////////////////////////////////////////////////////
    //mobile third menu control
    mobile_ThirdMenu_open: function(){
        this.isMobileNavi_thirdOpen = true;
        this.mobileMenu_setSubTitle();

        this.mobileSubMenu.find('.detail-list').addClass('open');

        $(".btn-back .icon").css("backgroundPositionY", "-70px");
//        this.mobileSubMenu.show();
    },

    mobile_ThirdMenu_close: function(){
        this.isMobileNavi_thirdOpen = false;

        this.mobileSubMenu.find('.detail-list').removeClass('open');
        $(".btn-back .icon").css("backgroundPositionY", "");
    },









    mobileMenu_setSubTitle: function(){
        this.mobileSubMenu = $(this.firstNaviArr[this.firstIndex]).find(".dpnavi-list .detail-outer-wrap");
        this.mobileSubMenTitle =$(this.firstNaviArr[this.firstIndex]).find(".dpnavi-list .title");
        this.mobileSubMenTitle = $(this.mobileSubMenTitle).find("em");
    },

    mobileMenu_changeSubTitle: function(title){
        this.mobileSubMenTitle.html(title);
    },

    setMobile: function(){
        this.mobileMenu_setSubTitle();
        this.changeThirdIndex(this.thirdIndex);

        if(this.firstIndex != -1 && this.benefitIndex == -1){
            $("footer .benefit").hide();
        }

    },

    resetMobile: function(){
        $("footer .benefit").show();

        this.isMobileNavi_mainOpen = false;
        this.isMobileNavi_modelsOpen = false;
        this.isMobileNavi_thirdOpen = false;

        this.mobile_MainsMenu_close();
        this.mobile_ModelsMenu_close();
        this.mobile_ThirdMenu_close();

        if(this.mobileSubMenu != ""){
            this.mobileSubMenTitle.html("")

            this.mobileSubMenu = "";
            this.mobileSubMenTitle = "";
        }
    },




    ////////////////////////////////////////////////
    //    second models menu - category over
    ////////////////////////////////////////////////
    onClickModels_category : function(e){
        var _this = App.navigationView;
        var code = $(this).find(">a").attr("data-code");


        _this.sendCode(code)
        return false;

    },

    onOverModels_category: function(e){

        var idx = $(e.currentTarget).attr("index");
        this.cotrolModelsCategory(idx);
        this.controlSecondNavi(-1);

    },

    onOutModels_category: function(){

        this.cotrolModelsCategory(0);
        this.controlSecondNavi(this.secondIndex);

    },

    cotrolModelsCategory: function(index){
        for(var i=0 ; i<this.modelsCategoryArr.length ; i++){
            if(i == index){
                $('#model-navi').find(".category>li:eq("+i+")").addClass('on');
            } else {
                $('#model-navi').find(".category>li:eq("+i+")").removeClass('on');
            }
        }

        var modelsNameArr = $('#model-navi').find('.model-list li');
        var onArr;

        if(index == 0){
            onArr = [];
        } else if(index == 1){
            //onArr = [1, 2, 3, 5, 6, 7, 9, 10, 11, 14, 15,19];
            onArr = this.checkHybrid();
        } else if(index == 2){
            //onArr = [0,1,2,3,4,5, 6,8,9,10,12,14, 16,17, 19];
            onArr = this.checkFsport();
        }

        $('#model-navi').find('.model-list li').removeClass('inactive');
        for(var i=0 ; i<modelsNameArr.length ; i++){
            if($.inArray(i, onArr) != -1){
                $('#model-navi .sub-menu').find('[index]').eq(onArr[$.inArray(i, onArr)]).addClass('inactive');
            }
        }
    },

    checkHybrid : function(){
        var tempArr = [];
        var i= 0, j=0;
        var modelLen = 0;
        var subCount = 0;
        for(i=0; i<this.lineLen; i++){
            modelLen =  this.navigationModel.attributes.models[i].menu.length;
            for(j=0; j<modelLen; j++){
                var isHybrid = this.navigationModel.attributes.models[i].menu[j].isHybrid
                if(isHybrid == false){
                    tempArr.push(subCount);
                }
                subCount++
            }
        }
        return tempArr;
    },

    checkFsport : function(){
        var tempArr = [];
        var i= 0, j=0;
        var modelLen = 0;
        var subCount = 0;
        for(i=0; i<this.lineLen; i++){
            modelLen =  this.navigationModel.attributes.models[i].menu.length;
            for(j=0; j<modelLen; j++){
                var isFSPORT = this.navigationModel.attributes.models[i].menu[j].isFSPORT
                if(isFSPORT == false){
                    tempArr.push(subCount);
                }
                subCount++
            }
        }

        return tempArr;
    },



    ////////////////////////////////////////////////
    ////////////////////////// first navi
    onFirstOver: function(e){
        var idx = $(e.currentTarget).attr("index");
        if(!this.isNavigationOpen) idx = this.firstIndex;
        clearTimeout(this.delayId);
        this.keepIndex = idx;
        if(this.isChangePossible){
            this.overFirstNavi(idx);
//            console.log("idx : ", idx)
        } else {

        }
    },

    onFirstOut: function(e){
//        this.delayId = _.delay(_.bind(this.delayFirstOut, this), 200);
    },

    delayFirstOut: function(){
        this.overFirstNavi(this.firstIndex);
        this.controlSecondNavi(this.secondIndex);
        this.controlThirdNavi(this.thirdIndex);
        this.controlBenefit(this.benefitIndex);
        this.controlEtc(this.etcIndex);

        if(this.firstIndex == 0){
            if(this.isNavigationOpen){
                //show - true
                this.delaySecondConOver();
            } else {
                //hide - false
                this.delaySecondConOut();
            }
        }

    },

    ////////////////////////////////////////////////
    ////////////////////////// benefit navi
    onBenefitOver: function(e){
        clearTimeout(this.delayId);
        this.overFirstNavi(this.firstIndex);

        this.controlSecondNavi(this.secondIndex);
        this.controlThirdNavi(this.thirdIndex);
        this.controlBenefit( $(e.currentTarget).attr("index") );
    },

    onBenefitOut:function(e){
        this.controlBenefit(this.benefitIndex);
//        this.controlSecondNavi(this.secondIndex);
    },

    ////////////////////////////////////////////////
    ////////////////////////// etc navi
    onEtcOver: function(e){
        this.controlEtc( $(e.currentTarget).attr("index") );
    },

    onEtcOut:function(e){
        this.controlEtc(this.etcIndex);
    },


    ////////////////////////////////////////////////
    ////////////////////////// second navi
    onSecondOver: function(e){
        clearTimeout(this.delayNavioutId);
        this.controlSecondNavi($(e.currentTarget).attr("index"));
    },

    onSecondOut:function(e){
        this.delayNavioutId = _.delay(_.bind(this.delaySecondOut, this), 100);
    },

    delaySecondOut: function(){
        this.controlSecondNavi(this.secondIndex, true);
    },


    ////////////////////////////////////////////////
    ////////////////////////// third navi
    onThirdOver: function(e){
        clearTimeout(this.delayNavioutId);
        this.controlThirdNavi($(e.currentTarget).attr("index"));
    },

    onThirdOut:function(e){
        this.delayNavioutId = _.delay(_.bind(this.delayThirdOut, this), 100);
    },

    delayThirdOut: function(){
        this.controlThirdNavi(this.thirdIndex);
    },


    // btn back click
    onBackClick: function(){
        this.showDimmed();
        this.delayFirstOut();

        if(this.isNavigationOpen){
            this.isNavigationOpen = false;
            $(".btn-back").removeClass("change");
            $(".btn-back .icon").css("backgroundPositionX", "0px");

            if(this.thirdIndex == -1){
                this.setContainerPosition(1);
            } else {
                this.setContainerPosition(2);
            }
        } else {
            this.isNavigationOpen = true;
            $(".btn-back").addClass("change");
            $(".btn-back .icon").css("backgroundPositionX", "-24px");

            this.setContainerPosition(0);
        }
        _.delay(_.bind(this.hideDimmed, this), 500);
    },








    ////////////////////////////////////////////////
    ////////////////////////// model container over
    onModelsOver: function(e){
//        clearTimeout(this.delaySecondId);
//        _.delay(this.delaySecondOver, 10);
    },

    onModelsOut: function(e){
//        this.delaySecondId = _.delay(_.bind(this.delaySecondOut, this), 100);

    },

    delaySecondConOver: function(){
        $('.submn-depth3 .dpnavi-list').addClass('open');
        $('.submn-depth3 .banner-wrap').addClass('open');
        $('.submn-depth3 .btn-back').removeClass('off');
        $('.submn-depth3 .dpnavi-list .title-box').removeClass('hide');
    },

    delaySecondConOut: function(){

		$('.submn-depth3 .dpnavi-list').removeClass('open');
		$('.submn-depth3 .banner-wrap').removeClass('open');
		$('.submn-depth3 .btn-back').addClass('off');
        $('.submn-depth3 .dpnavi-list .title-box').addClass('hide');

    },


    ////////////////////////////////////////////////
    ////////////////////////// third container over
    onThirdConOver: function(){
//        clearTimeout(this.delaySecondId);
//        _.delay(this.delaySecondOver, 10);
    },

    onThirdConOut: function(){
//        this.delaySecondId = _.delay(_.bind(this.delaySecondOut, this), 100);
    },




//    first navi over
    overFirstNavi: function(index){
        this.controlFirstNavi(index);
        this.openSecondNavi(index);
//        this.openSecondNavi(index);

        if(index == -1){
            this.setSecondBboxWidth("");
            this.delaySecondConOut();
        } else if(index == 0){
            this.setSecondBboxWidth("type1");
            $('.submn-depth3').addClass('open');
        } else {
            this.delaySecondConOut();
            this.setSecondBboxWidth("type0");
            $('.submn-depth3').removeClass('open');
        }
    },



    ////////////////////////////////////////////////
    // control navigation

    controlFirstNavi: function(index){
//        if(this.curFirstIndex == index - 1) return;
        this.curFirstIndex = index;

        for(var i=0 ; i<this.firstNaviArr.length ; i++){
            if(this.curFirstIndex == -1){
                $(this.firstNaviArr[i]).removeClass("on");
                $(this.firstNaviArr[i]).removeClass("off");
            } else {
                if(this.curFirstIndex == i){
                    $(this.firstNaviArr[i]).addClass("on");
                    $(this.firstNaviArr[i]).removeClass("off");
                } else {
                    $(this.firstNaviArr[i]).removeClass("on");
                    $(this.firstNaviArr[i]).addClass("off");
                }
            }
        }
        this.controlBenefit(-1);
        this.controlEtc(-1);
    },

    controlBenefit: function(index){

        for(var i=0 ; i<this.benefitNaviArr.length ; i++){
            if(index == i){
                $(this.benefitNaviArr[i]).addClass("on");
            } else {
                $(this.benefitNaviArr[i]).removeClass("on");
            }
        }
    },

    controlEtc: function(index){
        for(var i=0 ; i<this.etcNaviArr.length ; i++){
            if(index == i){
                $(this.etcNaviArr[i]).addClass("on");
            } else {
                $(this.etcNaviArr[i]).removeClass("on");
            }
        }
    },

    //second container open
    openSecondNavi: function(index){

        for(var i=0 ; i<this.secondNaviConArr.length ; i++){

            if(index == -1){
                $(this.secondNaviConArr[i]).removeClass("open");
            } else {
                $(this.secondNaviConArr[i]).addClass("open");
            }

            if(index == i){
                $(this.secondNaviConArr[i]).addClass("focus");
            } else {
                $(this.secondNaviConArr[i]).removeClass("focus");
            }
        }
    },

    controlSecondNavi: function(index, isOut){
        if(this.curFirstIndex == -1) return;
        var secondArr = this.secondNaviArr[this.curFirstIndex];
        var unfocus = this.firstIndex == this.curFirstIndex ? false : true;
        if(!isOut) unfocus = false;

        for(var i=0 ; i<secondArr.length ; i++){
            if(index < 0 || index >= secondArr.length || unfocus){
                $(secondArr[i]).removeClass("on");
                $(secondArr[i]).removeClass("off");
            } else {
                if(index == i){
                    $(secondArr[i]).addClass("on");
                    $(secondArr[i]).removeClass("off");
                    if(App.GlobalVars.currentBrowserMode != App.GlobalVars.BROWSER_MODE_WEB) {
                        var title = " / " + $(secondArr[i]).find("em").html();
                        this.mobileMenu_changeSubTitle(title);
                    }
                } else {
                    $(secondArr[i]).removeClass("on");
                    $(secondArr[i]).addClass("off");
                }

            }
        }
    },


    controlThirdNavi: function(index){
        if( this.thirdNaviArr == null ) return;     // add 2015.08.11

        var thirdArr = this.thirdNaviArr[this.thirdNaviConIndex];
        for(var i=0 ; i<thirdArr.length ; i++){
            if(index < 0 || index >= thirdArr.length){
                $(thirdArr[i]).removeClass("on");
                $(thirdArr[i]).removeClass("off");
            } else {
                if(index == i){
                    $(thirdArr[i]).addClass("on");
                    $(thirdArr[i]).removeClass("off");
                    if(App.GlobalVars.currentBrowserMode != App.GlobalVars.BROWSER_MODE_WEB) {
                        var title = " / " + $(thirdArr[i]).find("em").html();
                        this.mobileMenu_changeSubTitle(title);
                    }
                } else {
                    $(thirdArr[i]).removeClass("on");
                    $(thirdArr[i]).addClass("off");
                }

            }
        }

    },








    /////////////////////////////////////////////////////////////////////////
    // transition class setting
    addContainerTransition: function(){
        clearTimeout(this.delayTransitionId);
        if(this.isMobile){
            this.delayTransitionId = _.delay(_.bind(this.addMobile_ContainerTransition, this), 200);
        } else {
            this.delayTransitionId = _.delay(_.bind(this.addWeb_ContainerTransition, this), 200);
        }
    },

    removeContainerTransition: function(){
        clearTimeout(this.delayTransitionId);
        if(this.isMobile){
            this.removeMobile_ContainerTransition();
        } else {
            this.removeWeb_ContainerTransition();
        }
    },



    addWeb_ContainerTransition: function(){
//        console.log("addWeb_ContainerTransition")
        $(".navi-wrap").addClass("transition");
        $("header").addClass("transition");
        $(".model-navis-wrap").addClass("transition");
        $("footer .benefit").addClass("transition");
        $(".navi-wrap .detail-menu-wrap").addClass("transition");
        $(".navi-wrap .bbox-container").addClass("transition");
        $(".navi-wrap .submn-depth3").addClass("transition");
        $(".navi-wrap .submn-depth3 .dpnavi-list").addClass("transition");
        $(".navi-wrap .dpnavi-list .btn-back").addClass("transition");
        $(".navi-wrap .dpnavi-list .btn-back span.icon").addClass("transition");
        $(".navi-wrap .banner-wrap").addClass("transition");
    },

    removeWeb_ContainerTransition: function(){
//        console.log("removeWeb_ContainerTransition")
        clearTimeout(this.delayTransitionId);
        $(".navi-wrap").removeClass("transition");
        $("header").removeClass("transition");
        $(".model-navis-wrap").removeClass("transition");
        $("footer .benefit").removeClass("transition");
        $(".navi-wrap .detail-menu-wrap").removeClass("transition");
        $(".navi-wrap .bbox-container").removeClass("transition");
        $(".navi-wrap .submn-depth3").removeClass("transition");
        $(".navi-wrap .submn-depth3 .dpnavi-list").removeClass("transition");
        $(".navi-wrap .dpnavi-list .btn-back").removeClass("transition");
        $(".navi-wrap .dpnavi-list .btn-back span.icon").removeClass("transition");
        $(".navi-wrap .banner-wrap").removeClass("transition");
    },

    addMobile_ContainerTransition: function(){
//        console.log("addMobile_ContainerTransition")
        $(".navi-wrap .top-level-menu").addClass("transition");
        $(".model-navis-wrap").addClass("transition");
        $(".detail-menu-wrap").addClass("transition");
        $(".navi-wrap .detail-outer-wrap .detail-list").addClass("transition");
    },

    removeMobile_ContainerTransition: function(){
//        console.log("removeMobile_ContainerTransition")
        clearTimeout(this.delayTransitionId);
        $(".navi-wrap .top-level-menu").removeClass("transition");
        $(".model-navis-wrap").removeClass("transition");
        $(".detail-menu-wrap").removeClass("transition");
        $(".navi-wrap .detail-outer-wrap .detail-list").removeClass("transition");
    },







    // 1depth / 2depth / 3depth container position
    setContainerPosition: function(index){

        if(index == 0){
            this.isNavigationOpen = true;

            $(".navi-wrap").removeClass("depth2");
            $(".navi-wrap").removeClass("depth3");

            $("header").removeClass("depth2");
            $("header").removeClass("depth3");

            $("footer .benefit").removeClass("depth2");
            $("footer .benefit").removeClass("depth3");

        } else if(index == 1){
            $(".navi-wrap").addClass("depth2");
            $(".navi-wrap").removeClass("depth3");

            $("header").addClass("depth2");
            $("header").removeClass("depth3");

            $("footer .benefit").addClass("depth2");
            $("footer .benefit").removeClass("depth3");

        } else if(index == 2){
            $(".navi-wrap").removeClass("depth2");
            $(".navi-wrap").addClass("depth3");

            $("header").removeClass("depth2");
            $("header").addClass("depth3");

            $("footer .benefit").removeClass("depth2");
            $("footer .benefit").addClass("depth3");
        }
    },


    // second navigation bg
    setSecondBboxWidth: function(classname){
        var cn = classname;
        if(cn == ""){
            $('.navi-wrap .bbox-container').removeClass("type0");
            $('.navi-wrap .bbox-container').removeClass("type1");
            $('.navi-wrap .submn-depth3').removeClass("type0");
            $('.navi-wrap .submn-depth3').removeClass("type1");
        } else {
            $('.navi-wrap .bbox-container').removeClass("type0");
            $('.navi-wrap .bbox-container').removeClass("type1");
            $('.navi-wrap .submn-depth3').removeClass("type0");
            $('.navi-wrap .submn-depth3').removeClass("type1");

            if(!$('.navi-wrap .bbox-container').hasClass(classname)){
                $('.navi-wrap .bbox-container').addClass(classname);
                $('.navi-wrap .submn-depth3').addClass(classname);
            }

        }

    },



    //////////////////////////////////////////////////////////////////
    //    change navigation index

    changeFirstIndex: function(index){
        this.firstIndex = App.GlobalVars.NAVIGATION_FIRST_INDEX = index;
        this.controlFirstNavi(this.firstIndex);
        //console.log(this.firstIndex);
    },

    changeSecondIndex: function(index){
        this.secondIndex = App.GlobalVars.NAVIGATION_SECOND_INDEX = index;
        this.controlSecondNavi(this.secondIndex);
    },

    changeThirdIndex: function(index){
        this.thirdIndex = App.GlobalVars.NAVIGATION_THIRD_INDEX = index;
        this.controlThirdNavi(this.thirdIndex);


    },



    //////////////////////////////////////////////////////////////////
    //    control special offer

    showSpecialOffer: function(){

    },

    setSpecialOffer_name: function(txt){
        $(".navi-wrap .submn-depth3 .banners.cuppons .banner-case .event-desc").html(txt);
        $(".navi-wrap .submn-depth3 .banners.cuppons .banner-case").addClass("on");
    },


    setBrochureURL: function(url){
        $(".navi-wrap .banners.brochure a").attr("href", url);
    },


    // dimmed control
    showDimmed: function(){
        this.isDimmed = true;
        $("#overlay-bg").css("opacity", "0").removeClass("hide")
    },

    hideDimmed: function(){
        this.isDimmed = false;
        $("#overlay-bg").css("opacity", "1").addClass("hide")
    },






    ////////////////////////////////////////////////
    ////////////////////////// activity control
    ////////////////////////////////////////////////

    setCheckNavigation: function(){
        this.mouseposArr = [];
        this.mouseposArrLen = 5;

        this.isChangePossible = true;

        this.checkDelay = 100;
        this.checkGap = 3;

        this.checkW = 180;

        this.checkH_T = 50;
        this.checkH_B = 550;

        this.checkDelayId;
        this.keepIndex = -1;

    },

    onMouseMove: function(e){
        var curY = e.pageY - $(window).scrollTop();
        if(e.pageX < this.checkW && curY < this.checkH_B){
            this.mouseposArr.push({x: e.pageX, y: curY});

            if (this.mouseposArr.length > this.mouseposArrLen) {
                this.mouseposArr.shift();
            }
            this.checkPosition();
        } else {
            this.mouseposArr = [];
        }

        if(e.pageX < this.checkW && curY > 0){
            this.isFirstAreaIn = true;
        } else {
            this.isFirstAreaIn = false;
        }
    },

    checkPosition: function(){
        if($("#main-navi").hasClass("depth2") || $("#main-navi").hasClass("depth3")) return;

        this.isChangePossible = true;

        if(this.mouseposArr.length == this.mouseposArrLen){
            if(this.curFirstIndex != -1){

                if(this.mouseposArr[0].x + this.checkGap < this.mouseposArr[this.mouseposArrLen-1].x && this.mouseposArr[0].x < this.checkW){
                    // x in

                    var triW = this.checkW - this.mouseposArr[0].x;
                    var triT_H = this.mouseposArr[0].y - this.checkH_T;
                    var triB_H = this.checkH_B - this.mouseposArr[0].y;

                    var per = ( this.mouseposArr[this.mouseposArrLen-1].x - this.mouseposArr[0].x ) / triW;

                    var checkT_y = triT_H * per;
                    var checkB_y = triB_H * per;

                    if(this.mouseposArr[0].y - checkT_y < this.mouseposArr[this.mouseposArrLen-1].y && this.mouseposArr[0].y + checkB_y > this.mouseposArr[this.mouseposArrLen-1].y){
                        // y in
                        clearTimeout(this.checkDelayId);
                        this.isChangePossible = false;
                        this.checkDelayId =  _.delay(_.bind(this.delayCheck, this), this.checkDelay);
                    } else {

                    }

                } else {

                }

            } else {
                this.isChangePossible = true;
            }
        }
    },

    delayCheck: function(){
        this.isChangePossible = true;
        this.overFirstNavi(this.keepIndex);
//        console.log("this.keepIndex : ", this.keepIndex)
    },


    onClick_threeDepth : function(e){
        var _this = App.navigationView;
        if(App.GlobalVars.currentBrowserMode != App.GlobalVars.BROWSER_MODE_WEB){
            App.navigationView.toggleMobile3DethMenu();
        }
        var id = $(this).attr("href");
        var index = $( $(this).parent()).attr("index");
        var code = $(this).attr("data-code");

        _this.sendCode(code);
        App.trigger(App.Events.CLICK_NAVI_THREEDEPTH, index);
        return false;
    },

    onClick_hybridTwoDepth : function(e){
        if(App.GlobalVars.currentBrowserMode != App.GlobalVars.BROWSER_MODE_WEB){
            App.navigationView.toggleMobile3DethMenu();
        }

        var linkUrl = $(this).attr("href");
        var index = $( $(this).parent()).attr("index");
        var url = linkUrl + "#" + App.GlobalVars.HYBRID_HASH[index];

        if(App.GlobalVars.currentIndex != App.GlobalVars.INDEX_3_HYBRID_ZERO) {
            window.location.href = url;
        }else{
            App.trigger(App.Events.CLICK_NAVI_TWODEPTH, index);
        }

        return false;
    },

    onClick_fperformenceTwoDepth : function(e){
        if(App.GlobalVars.currentBrowserMode != App.GlobalVars.BROWSER_MODE_WEB){
            App.navigationView.toggleMobile3DethMenu();
        }

        var linkUrl = $(this).attr("href");
        var index = $( $(this).parent()).attr("index");
        var url = linkUrl + "#" + App.GlobalVars.F_PERFORMENCE_HASH[index];

        if(App.GlobalVars.currentIndex != App.GlobalVars.INDEX_4_F_PHILOSOPHY) {
            window.location.href = url;
        }else{
            App.trigger(App.Events.CLICK_NAVI_TWODEPTH, index);
        }

        return false;
    },

    onClick_membershipTwoDepth: function(e){
        if(App.GlobalVars.currentBrowserMode != App.GlobalVars.BROWSER_MODE_WEB){
            App.navigationView.toggleMobile3DethMenu();
        }

        var linkUrl = $(this).attr("href");
        var index = $( $(this).parent()).attr("index");
        var url = linkUrl + "#" + App.GlobalVars.MEMBERSHIP_HASH[index];

        if(App.GlobalVars.currentIndex != App.GlobalVars.INDEX_5_MEMBERSHIP) {
            window.location.href = url;
        }else{
            App.trigger(App.Events.CLICK_NAVI_TWODEPTH, index);
        }

        return false;

    },
  

    onClick_serviceTwoDepth : function(e){
      
    },

    // 1뎁스 메뉴를 클릭했을 때
    onClick_oneDepth : function(e){
        var _this = App.navigationView;
        var code = $(this).attr("data-code");

        _this.sendCode(code);
    },

    // 2뎁스 메뉴를 클릭했을 때
    onClick_twoDepth : function(e){
        var _this = App.navigationView;
        var code = $(this).attr("data-code");
        var oneDepthIndex = 0;

        if(App.GlobalVars.currentIndex == App.GlobalVars.INDEX_3_HYBRID_ZERO || App.GlobalVars.currentIndex == App.GlobalVars.INDEX_4_F_PERFORMANCE || App.GlobalVars.currentIndex == App.GlobalVars.INDEX_5_MEMBERSHIP){
            oneDepthIndex = parseInt($($(this).parent()).parent().attr("data-index"))
            if(oneDepthIndex == App.GlobalVars.currentIndex){
                return;
            }
        }

        _this.sendCode(code)
    },

    // 모델 3뎁스 코드 넣어주기 (ModelView.js에서 호출)
    setThreeDepthModelCode : function(code){
        var i=0;
        var threeDepthLen = App.GlobalVars.MODELS_HASH.length;
        for(i=0; i<threeDepthLen; i++){
            // todo : code 값을 json에서 받아오는 경우 변경해야함
            var strCode = App.GlobalVars.MODEL_NAME+"_"+App.GlobalVars.MODELS_HASH[i];
            $(".detail-menu-wrap.submn-depth3 .detail-list li:eq("+i+")>a").attr("data-code", "navi_"+strCode);
        }
    },

    // 코드 보내기
    sendCode : function(code){
        if(code != undefined && code != ""){
            App.footerView.sendEventCode(code);

        }
    },

    //////////////////////////////////////////////
    //  get data
    //////////////////////////////////////////////
    getNavigationData : function(){
        var url = App.GlobalVars.GET_NAVIGATION_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_GET_NAVIGATION_URL;

        App.getJsonData(url, {}, this.getNavigationDataComplete);
    },

    getNavigationDataComplete : function($json){
        App.navigationModel.set( {"models":$json.navigation.models );
        App.navigationView.render();

        // 시승신청 배너 트래킹 있을경우, 전체 href 속성 변경
        if( TestDriveBannerTracking.isParam() ) {
            TestDriveBannerTracking.replaceHref();
        }
    }
});

// TestDrive 시승신청, 배너 트래킹 저장	DATE 2016.02.17

var TESTDRIVE_BANNER_TRACK = 'bt_code';
var TestDriveBannerTracking = TestDriveBannerTracking || (function( $ ) {
    'use strict';

    var _paramObj = getUrlParameter();
    var _paramTestdrive = _paramObj[ TESTDRIVE_BANNER_TRACK ];
    var _isParam = ( _paramTestdrive == undefined || _paramTestdrive == '' ) ? false : true;

   function replaceHrefLink() {
        $.each( $('a'), function( $index, $element ) {
            var href = String( $element );
            var addChar = ( href.indexOf('?') > 0 ) ? '&' : '?';
            var trackCode = TESTDRIVE_BANNER_TRACK+'=' + _paramTestdrive;

            // exception, membership telephone no
            if( href.indexOf('http') < 0 ) return;

            // exception, target property _blank
            // for( var prop in $element ) if( prop == 'target' && $element[ prop ] == '_blank' ) return;

            // exception, trackCode
            if( href.indexOf(trackCode) > 0 ) return;

            href = href + addChar + trackCode;
            $(this).attr( {'href':href} );
        });
    }

    function getUrlParameter() {
        var ParameterObject = new Object();
        var locate = location.href;
        if( locate.indexOf('?') == -1 ) return ParameterObject;

        var parameter = locate.split('?')[1];
        parameter = parameter.split('#')[0];
        var paramAreay = parameter.split('&');
        for( var i=0; i<paramAreay.length; i++ ) {
            var tem = paramAreay[i].split('=');
            ParameterObject[ tem[0] ] = tem[1];
        }
        getUrlParameter = function () { return ParameterObject; }
        return ParameterObject;
    }

    function isParam() { return _isParam; }
    function getParam() { return _paramTestdrive; }

    return {
        isParam: isParam,
        getParam: getParam,
        replaceHref: replaceHrefLink
    }
})( jQuery );
