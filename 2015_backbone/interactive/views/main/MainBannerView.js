App.Views.MainBannerView = Backbone.View.extend({

    initialize : function(obj){
        this.mainKeyvisualView = obj.mainKeyvisualView;
        this.mainBannerModel = obj.mainBannerModel;
        this.mainBannerListModel = obj.mainBannerListModel;
        this.mainBannerCollection = obj.mainBannerCollection;
        this.resizeView = obj.resizeView;

        this.container = $(".side-banner-wrap");

        this.addCount = 0;
        this.bannerLen = 0;
        this.currentBrowserMode = "";
        this.isShow = false;
        this.startTimer = "";

        // ��� Ÿ��
        this.currentLayoutType = -1;

        // �������� �ɶ� ������ �� ��� ũ��
        this.DEFAULT_BANNER_WIDTH = 360;
        this.DEFAULT_BANNER_HEIGHT = 300;

        this.DEFAULT_MOBILE_BANNER_WIDTH = 640;
        this.DEFAULT_MOBILE_BANNER_HEIGHT = 120;

        // Ÿ�Ժ� ��� ���� ( 1 : 1�� / 2 : 2�� - �ּ� ������ ��� ���� [���̺���, ���̺���])
        this.arrBannerSizePer = [[[2, 2],[1, 2],[1,1],[1,1],[1, 2],[1, 1],[1, 1]],
                                [[2, 2],[2, 1],[2, 1],[1, 1],[1, 1],[1, 1],[1, 1]],
                                [[2, 1],[1, 1],[1, 1],[2, 2],[2, 1],[1, 1],[1, 1]],
                                [[2, 1],[2, 1],[2, 1],[2, 1],[2, 1],[2, 1],[1, 1]],
                                [[2, 2],[1, 2],[1, 2],[1, 2],[1, 1],[1, 1]],
                                [[2, 2],[2, 1],[2, 1],[2, 1],[1, 1],[1, 1]],
                                [[2, 1],[2, 1],[2, 2],[2, 1],[1, 1],[1, 1]],
                                [[2, 1],[2, 1],[2, 1],[2, 1],[2, 1],[2, 1]]];

        // Ÿ�Ժ� ��� ��ġ (���� 2��� / ���� 6��� �� ���� ��ġ [x�� ��� ��ġ, y�� ��� ��ġ]);
        this.arrBannerPos = [[[0, 0],[0, 2],[1, 2],[1, 3],[0, 4],[1, 4],[1, 5]],
                            [[0, 0],[0, 2],[0, 3],[0, 4],[1, 4],[0, 5],[1, 5]],
                            [[0, 0],[0, 1],[1, 1],[0, 2],[0, 4],[0, 5],[1, 5]],
                            [[0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[0, 5],[1, 5]],
                            [[0, 0],[0, 2],[1, 2],[0, 4],[1, 4],[1, 5]],
                            [[0, 0],[0, 2],[0, 3],[0, 4],[0, 5],[1, 5]],
                            [[0, 0],[0, 1],[0, 2],[0, 4],[0, 5],[1, 5]],
                            [[0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[0, 5]]]
    },

    render: function (){
        // ���� ��� ���̾ƿ� Ÿ�� ����
        this.currentLayoutType = this.mainBannerModel.get("type");
        this.bannerLen = this.mainBannerCollection.models.length;

        if(this.bannerLen != 0) {
            // ����Ʈ �����
            this.addAll();
        }else{
            this.container.addClass("hide");
        }
    },

    addAll : function(){
        this.mainBannerCollection.forEach(this.addOne, this);
    },

    addOne : function($model){
        var listview = new App.Views.BannerListView({model:$model});
        this.$el.append(listview.render().el.childNodes)

        this.addCount++

        // ��� ����Ʈ�� ��� ADD �Ǿ��� �� �̹��� ��� �־��ֱ�
        if(this.bannerLen == this.addCount){
            this.addOneComplete();
        }
    },

    addOneComplete : function(){
        this.setClass();
        this.setImageUrl();
        $(".banner-list a").on("click", this.onClick_list);
        //this.show();
    },

    setClass : function(){
        // ��� ������ 7���� �� ������ 3���� Ŭ���� �־��ֱ�(Ÿ���϶� ������ ���� �ʿ�)
        if(this.bannerLen == 7){
            var i=4;
            $(".side-banner-wrap").addClass("seven-type");
            for(i=4; i<this.bannerLen; i++){
                $(".side-banner-wrap>ul>li").eq(i).addClass("col-3");
            }
        }
    },

    // �̹��� ��� �־��ֱ�
    setImageUrl : function(){
        var browserMode = App.GlobalVars.currentBrowserMode;
        var imgUrl = "";
        var i = 0;
        var secectorImg = "";

        if(this.currentBrowserMode !== browserMode) {
            for (i = 0; i < this.bannerLen; i++) {
                secectorImg = $(".side-banner-wrap ul li:eq(" + i + ") a img")
                if (browserMode == App.GlobalVars.BROWSER_MODE_WEB || browserMode == App.GlobalVars.BROWSER_MODE_TABLET) {
                    // �̹����� ������ ��� �־��ֱ�
                    imgUrl = secectorImg.attr("data-web-img-url");
                    secectorImg.attr("src", imgUrl);
                } else {
                    // �̹����� ����� ��� �־��ֱ�
                    imgUrl = secectorImg.attr("data-mobile-img-url");
                    secectorImg.attr("src", imgUrl);
                }
            }
            this.currentBrowserMode = browserMode;
        }
    },

    show : function(){
        this.container.removeClass("hide");
        this.onResize();
        this.hideBanner(true);
        this.addEvent();

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB) {
            _.delay(function () {
                var _this = App.mainView.mainBannerView;
                _this.showBanner(true)
            }, 1500);

            _.delay(function () {
                var _this = App.mainView.mainBannerView;
                _this.hideBanner(true)
            }, 2500);
        }
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        $(".btn-toggle-side").on("click", _.bind(this.onClick_btnSlide, this));
    },

    removeEvent : function(){

    },

    onClick_list : function(){
        var log_text = $(this).attr("data-log");
        App.setGoogleHit(log_text);
    },


    onClick_btnSlide : function(){
        if(this.isShow){
            this.hideBanner(true);
        }else{
            this.showBanner(true);
        }

        App.mainView.mainKeyvisualView.stopVisual();

        App.mainView.isShowBanner = this.isShow;
        return false;
    },

    // ��� �����ֱ�
    showBanner : function($isTrans){
        this.isShow = true;

        if(!App.GlobalVars.isIE8) {
            TweenLite.killTweensOf(this.container);
            TweenLite.to(this.container, 0.6, {"css": {"right": 0}, ease: Quart.easeInOut});

            TweenLite.killTweensOf($(".visual-wrap"));
            TweenLite.to($(".visual-wrap"), 0.5, {"css": {"left": App.mainView.keyvisualMoveX}, ease: Cubic.easeInOut});

            TweenLite.killTweensOf($(".visual-wrap figure .fig-txt"));
            TweenLite.to($(".visual-wrap figure .fig-txt"), 0.5, {"css": {"margin-left": -App.mainView.keyvisualMoveX}, ease: Cubic.easeInOut});
        }else{
            $(this.container).stop().animate({ "right": 0 }, 600, "easeOutQuart");
            $(".visual-wrap").stop().animate({ "left": App.mainView.keyvisualMoveX }, 500, "easeOutCubic");
            $(".visual-wrap figure .fig-txt").stop().animate({ "margin-left": - App.mainView.keyvisualMoveX }, 500, "easeOutCubic");
        }
    },

    showBannerComplete : function(){

    },

    // ��� ���߱�
    hideBanner : function($isTrans){
        var targetX = this.container.width();
        this.isShow = false;
        if($isTrans) {
            if (!App.GlobalVars.isIE8) {
                TweenLite.killTweensOf(this.container);
                TweenLite.to(this.container, 0.6, {"css": {"right": -targetX}, ease: Quart.easeInOut});

                TweenLite.killTweensOf($(".visual-wrap"));
                TweenLite.to($(".visual-wrap"), 0.5, {"css": {"left": 0}, ease: Cubic.easeInOut});

                TweenLite.killTweensOf($(".visual-wrap figure .fig-txt"));
                TweenLite.to($(".visual-wrap figure .fig-txt"), 0.5, {"css": {"margin-left": 0}, ease: Cubic.easeInOut});
            } else {
                $(this.container).stop().animate({ "right": -targetX }, 600, "easeInOutQuart");
                $(".visual-wrap").stop().animate({ "left": 0 }, 500, "easeInOutCubic");
                $(".visual-wrap figure .fig-txt").stop().animate({ "margin-left": 0}, 500, "easeInOutCubic");
            }
        }else{
            TweenLite.killTweensOf(this.container);
            TweenLite.to(this.container, 0, {"css": {"right": -targetX}});

            TweenLite.killTweensOf($(".visual-wrap"));
            TweenLite.to($(".visual-wrap"), 0, {"css": {"left": 0}});

            TweenLite.killTweensOf($(".visual-wrap figure .fig-txt"));
            TweenLite.to($(".visual-wrap figure .fig-txt"), 0, {"css":{"margin-left":0}, ease:Cubic.easeInOut});
        }
    },

    hideBannerComplete : function(){

    },

    onResize : function(){
        this.setImageUrl();
        this.setBannerContainerPosition();
        this.setBannerLayout();
    },

    setBannerContainerPosition : function(){
        if(!this.isShow){
            this.hideBanner(false);
        }
    },

    setBannerLayout : function(){
        var i = 0;
        var j = 0;
        var k = 0;
        var containerWidth = this.container.width();
        var containerHeight = this.container.height();

        for(i=0; i<this.bannerLen; i++){   // ��� ����
            var selectorBanner = $(".banner-list").eq(i);
            if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB) {
                var bannerPosX = this.arrBannerPos[this.currentLayoutType][i][0] * (containerWidth / 2);
                var bannerPosY = this.arrBannerPos[this.currentLayoutType][i][1] * (containerHeight / 6)
                var bannerWidth = this.arrBannerSizePer[this.currentLayoutType][i][0] * (containerWidth / 2);
                var bannerHeight = Math.ceil(this.arrBannerSizePer[this.currentLayoutType][i][1] * (containerHeight / 6))

                selectorBanner.css({left: bannerPosX,
                    top: bannerPosY,
                    width: bannerWidth,
                    height: bannerHeight});

                selectorBanner.find("a").css({ width: bannerWidth,
                    height: bannerHeight});

                this.setImgLayout(selectorBanner, bannerWidth, bannerHeight)
            }else{
                selectorBanner.removeAttr("style");
                selectorBanner.find("a").removeAttr("style");

                var bannerWidth = selectorBanner.width();
                var bannerHeight = selectorBanner.height();
                this.setImgLayout(selectorBanner, bannerWidth, bannerHeight)
            }
        }
    },

    setImgLayout : function($selectorBanner, $bannerWidth, $bannerHeight){
        var selectorImg = $selectorBanner.find("img");
        var per = this.resizeView.sumSizePer($bannerWidth, $bannerHeight, this.DEFAULT_BANNER_WIDTH, this.DEFAULT_BANNER_HEIGHT);
        var imgWidth = this.DEFAULT_BANNER_WIDTH * per;
        var imgHeight = this.DEFAULT_BANNER_HEIGHT * per;
        var posX = 0;
        var posY = 0;

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_MOBILE){
            per = this.resizeView.sumSizePer($bannerWidth, $bannerHeight, this.DEFAULT_MOBILE_BANNER_WIDTH, this.DEFAULT_MOBILE_BANNER_HEIGHT);
            imgWidth = this.DEFAULT_MOBILE_BANNER_WIDTH * per;
            imgHeight = this.DEFAULT_MOBILE_BANNER_HEIGHT * per;
        }

        if($bannerWidth < imgWidth){
            posX = -((imgWidth - $bannerWidth)/2)
        }

        if($bannerHeight < imgHeight){
            posY = -((imgHeight - $bannerHeight)/2)
        }


        selectorImg.css({"width":imgWidth, "height":imgHeight, "top": posY, "left":posX});
    }
});

App.Views.BannerListView = Backbone.View.extend({
    template: _.template($('#template-banner-list').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});