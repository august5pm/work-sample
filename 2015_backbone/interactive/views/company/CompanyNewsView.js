App.Views.CompanyView = Backbone.View.extend({
    initialize: function( $options ) {
        App.GlobalVars.isDebugMode = ( String( document.location ).indexOf('localhost') > -1 ) ? true : false;

        this.collection = null;
        this.pageTotal = 0;
        this.pageIdx = 1;
        this.listTotal = 0;
        this.columnIdx = 0;
        this.addCount = 0;
        this.paramSeq = 0;
        this.listIdx = 0;
        this.isDeepLink = false;
        this.popup = new App.Views.CompanyPopupView( {el:$('.company-pop')} );
        this.previous = new App.Views.CompanyIframePopupView( {el:$('.company-iframe-pop')} );
        this.requestUrl = App.GlobalVars.isDebugMode ? App.GlobalVars.DEBUG_GET_NEWS_DATA_URL : App.GlobalVars.GET_NEWS_DATA_URL;
    },

    render: function() {
        this.addEvent();
        this.checkParam();

        this.loadList( this.getRequestUrl() );
        App.trigger( App.Events.RESIZE_BROWSER );
    },

    checkParam: function() {
        var seq = App.getURLParameter("seq");
        if( seq !== undefined ) {
            this.paramSeq = seq;
        }
    },

    getRequestUrl: function() {
        var pageIdx = this.pageIdx;
        var keyfield = $('#select-dwn option:selected').val();
        keyfield = ( keyfield != 'no' ) ? keyfield : '';
        var keyword = $('#sch-txt').val();

        return this.requestUrl+'?page='+pageIdx+'&keyfield='+keyfield+'&keyword='+keyword;
    },

    addEvent: function() {
        App.companyCollection = new App.Collections.CompanyCollection();
        App.companyCollection.on('reset', _.bind( this.loadCompliteList, this ));
        App.companyCollection.on('error', _.bind( this.loadErrorList, this ));
        App.listenTo(App, App.Events.RESIZE_BROWSER, this.onResize);

        $('#sch-txt').on( 'keypress', _.bind(this.keypressSearchTxt, this) );
        $('.btn-sch').on( 'click', _.bind(this.clickSearchBtn, this) );
        $('.previous').find('a').on( 'click', _.bind(this.clickPrevPopup, this) );
        $('.btn-more').find('a').on( 'click', _.bind(this.clickMoreBtn, this) );
    },

    loadList: function( $requestUrl ) {
        App.companyCollection.url = $requestUrl;        // /json/company_news_data.asp?page=1&keyfield=title
        App.companyCollection.fetch( {reset:true, dataType: 'jsonp'} );
    },

    loadCompliteList: function( $data ) {
        App.companyView.columnIdx += this.listTotal;
        this.collection = $data;
        this.listTotal = 0;
        for( var i=0, total=this.collection.length; i<total; i++ ) if( this.collection.at(i).attributes.seq !== undefined ) this.listTotal++;
        // if( this.pageIdx == this.pageTotal ) $('.btn-more').remove();
        var d = ( this.pageIdx == this.pageTotal ) ? 'none' : 'block';
        $('.btn-more').css( {display:d} );

        this.addAllListItem();
        this.isDeepLink = this.ckeckDeepLink();

        // 특정 게시글 바로보기  
        if( this.isDeepLink && this.listIdx > -1 ) {
            $('.pic-list-wrap li').eq(this.listIdx).find('a').trigger('click');
        }
    },

    ckeckDeepLink: function() {
        var seq = '';
        for( var i=0, total=this.collection.length; i<total; i++ ) {
            seq = this.collection.at(i).attributes.seq;
            if( seq !== undefined ) {
                if( seq == this.paramSeq ) {
                    this.listIdx = i;
                    return true;
                }
            }
        }

        return false;
    },

    loadErrorList: function( $data ) {
        alert( '정보가 없습니다.' );       // // this.status == 0 경우 예외처리

        this.pageIdx = 1;
        $('#sch-txt').val('');
        this.loadList( this.getRequestUrl() );
    },

    addAllListItem: function() {
        this.collection.forEach( this.addOneListItem, this );
    },

    addOneListItem: function( $model, $idx ) {
        if( $model.attributes.seq === undefined ) return;

        this.item = new App.Views.CompanyItemView( {model:$model} );
        this.$el.append( this.item.render( this.columnIdx+$idx, this.listTotal ).el );

        $(".pic-list-wrap li:eq("+this.addCount+") .btn-news-list").on("click", this.onClick_btnList);
        this.addCount++;
    },

    onClick_btnList : function(e){
        var menu = "press";
        var seq = $(this).attr("data-seq")
        App.setHit(menu, seq);
    },

    keypressSearchTxt: function( $evt ) {
        if( $evt.which == 13 ) {
            this.checkValidator();
        }
    },

    clickSearchBtn: function( $evt ) {
        $evt.preventDefault();

        this.checkValidator();
    },

    checkValidator: function() {
        if( $('#select-dwn option:selected').val() == 'no' ) {
            alert("분류를 선택하십시오");
            $('#select-dwn').focus();
            return;
        }

        if( $('#sch-txt').val().length == 0 ) {
            alert("검색할 단어를 입력하세요");
            $('#sch-txt').focus();
            return;
        }

        this.$el.empty();       // $('.pic-list-wrap')
        this.pageIdx = 1;
        this.loadList( this.getRequestUrl() );
    },

    clickPrevPopup: function( $evt ) {
        $evt.preventDefault();

        this.previous.show();
    },

    clickMoreBtn: function( $evt ) {
        $evt.preventDefault();

        this.pageIdx++;
        this.loadList( this.getRequestUrl() );
    },

    removeEvent: function() {

    },

    onResize : function(){
        var _this = App.companyView;
        var img =  $(App.companyView.popup.el).find('.pic img');
        var imgUrl = img.attr('src');
        imgUrl = ( $(window).width() > 768 ) ? imgUrl.replace('_mobile', '_web') : imgUrl.replace('_web', '_mobile');
        img.attr( {src:imgUrl} );

        _this.popup.onResize();

        if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB){
            _this.previous.onResize();
        }else{
            _this.previous.hide();
        }
    }
});

// ItemView
App.Views.CompanyItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( $('#template-company-list').html() ),
    events: { 'click a': 'clickItem' },
    render: function( $idx, $total ) {
        var idx = $idx + 1;
        if( idx != 1 && idx % 2 == 0 ) this.$el.addClass( 'col-'+idx+' col-2' );
        if( idx != 1 && idx % 3 == 0 ) this.$el.addClass( 'col-'+idx+' col-3' );
        if( idx != 1 && idx % 4 == 0 ) this.$el.addClass( 'col-'+idx+' col-4' );
        if( idx == $total ) this.$el.addClass('last');
        this.$el.html( this.template(this.model.attributes) );
        return this;
    },

    clickItem: function( $evt ) {
        $evt.preventDefault();

        App.companyView.item = this;
        App.companyView.popup.show( $(this).parent().index() );
    }
});

 // PopupView
App.Views.CompanyPopupView = Backbone.View.extend({
    events: { 'click .close-pop a': 'clickCloseBtn' },
    initialize: function( $options ) {
        var loc = String( document.location );
        this.pageUrl = loc.substring( 0, loc.lastIndexOf("/") );
        this.idx = 0;
        this.titleTag = $(this.el).find('.title');
        this.imgTag = $(this.el).find('.pic img');
        this.contents = $(this.el).find('.custom-scroll');
        this.dateTag = $(this.el).find('.btm-cnt .date');
        this.hitTag = $(this.el).find('.btm-cnt .hits .hit-num');
        this.popupWrap = $(".popup-wrap.popup-1");
    },

    show: function( $idx ) {
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $('html,body').css( {'overflow':'hidden'} );

        this.idx = $idx;
        this.list = App.companyView.item.model.attributes;
        this.updateContent();
        this.updateHits();
    },

    // image_url, title_text, category_text, contents_text
    updateContent: function() {
        var imgUrl = ( $(window).width() > 768 ) ? this.list.web_image_url : this.list.mobile_image_url;
        this.imgTag.attr( {src:imgUrl} );
        this.titleTag.text( this.list.title_text );
        this.dateTag.text( this.list.date_text );
        this.hitTag.text( this.list.hit_count );
        this.contents.empty();
        this.contents.append( $.parseHTML( this.list.contents_text, false ) );
        this.imgTag.on( 'load', _.bind( this.completeContent, this ) );
    },

    completeContent: function() {
        this.contents.scrollTop(0);
        this.popupWrap.removeClass('hide');
        $('.overlay').removeClass('hide');
        this.onResize();
    },

    updateHits: function() {
        if( App.GlobalVars.isDebugMode ) return;

        $.ajax( {url:'/proc/hit.asp?menu=press&seq='+this.list.seq, dataType:"text"} );
    },

    hide: function() {
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) $('html,body').css( {'overflow':'auto'} );
        this.imgTag.attr( {src:''} );

        this.popupWrap.addClass('hide');
        $('.overlay').addClass('hide');
    },

    clickCloseBtn: function( $evt ) {
        $evt.preventDefault();

        this.hide();
    },

    onResize : function(){
        if(App.GlobalVars.currentDevice == App.GlobalVars.DEVICE_TYPE_WEB) {
            var targetY = ((App.GlobalVars.windowHeight/2)-($(this.el).height()/2))
            if(targetY < 10) targetY = 10;
            if(App.GlobalVars.currentBrowserMode == App.GlobalVars.BROWSER_MODE_WEB){
                $(this.el).css({"top": targetY, "margin-top":0, "margin-left":-($(this.el).width()/2)})
            }else{
                $(this.el).removeAttr("style").css({"top": targetY})
            }

        }else{
            var marginLR = ( App.GlobalVars.windowHeight > App.GlobalVars.windowWidth ) ? 10.6 : 0;
            var min = Math.min( App.GlobalVars.windowWidth, App.GlobalVars.windowHeight );
            var w = ( ( min / App.GlobalVars.windowWidth ) * 100 ) - marginLR;
            var l = ( 100 - w ) * 0.5;
            $(this.el).css( {top:10} );
        }
    }
});

// iFramePopupView
App.Views.CompanyIframePopupView = Backbone.View.extend({
    events: { 'click .close-pop a': 'clickCloseBtn' },
    initialize: function( $options ) {
        this.isShow = false;
        this.popupWrap = $(".popup-wrap.popup-2");
        $(this.el).css({"position":"absolute", "top":"50%"});
    },

    show: function() {
        if(!this.isShow) {
            $('html,body').css({'overflow': 'hidden'});

            this.popupWrap.removeClass('hide');
            $('.overlay').removeClass('hide');
            this.onResize();
            this.isShow = true;
        }
    },

    hide: function() {
        if(this.isShow) {
            $('html,body').css({'overflow': 'auto'});

            this.popupWrap.addClass('hide');
            $('.overlay').addClass('hide');
            this.isShow = false;
        }
    },

    clickCloseBtn: function( $evt ) {
        $evt.preventDefault();

        this.hide();
    },

    onResize : function(){

    }
});