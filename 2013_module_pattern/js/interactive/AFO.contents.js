(function(ns, $, undefined){

	var contents = (function(){
		
		var _container = $('#container'),
			_moveGap = -3,
			_masonryCompleteNum = 0,
			_isMaked = false,
			_arrNewsColor = ["#fff", "#fff", "#fff"],		// ["#eee", "#c5c5c5", "#ddd"],
			_oldStageWidth = 0,
			_arrNewsElement = [],
			_isSearch = false;
		
		var _init = function(){
				
			}
			
			// XML 다시 로드 하기
			_reloadXml = function($url){
				if(_isMaked){
					_destroy();
				}
				
				ns.loader.xml($url, ns.contents.onLoadContentsXmlComplete);
			},
			
			// 컨텐츠 제거
			_destroy = function(){
				var conHeight = _container.height(),
					loading_box = $(".item .loading_box");
				
				TweenLite.killTweensOf(loading_box);
				$(".item .contents").css("display", "none");
				_removeBtnEvent();
				_container.masonry("destroy");
				$(".item").remove();
				_container.height(conHeight);
				_isMaked = false;
				
				conHeight = null;
				loading_box = null;
			},
			
			_start = function(){
				$(".item").css("display", "block");
				
				_addBtnEvent();
				$("#wrap").css("height", "100%").css("overflow", "visible");
				ns.scroll.init();
				
				if(ns.isStartContentsMode){
					_onShowFrame(ns.contents_url[ns.selectedContentsIdx]);
				}
			},
			
			// 컨텐츠 XML 로드 완료
			_onLoadContentsXmlComplete = function($xml){
				ns.contentsXmlData = $xml;
				_make();
			},
			
			// 컨텐츠 생성
			_make = function(){
				
			},
			
			// masonry
			_makeMasonry = function(){
				
				// initialize
				_container.masonry({
					columnWidth: ns.block_size,
					itemSelector: '.item',
					isAnimated : true,
					animationOptions: {
						duration: 500,
						easing: 'easeInOutCubic',
						queue: false,
						complete:function(){
							
							_masonryCompleteNum++
							if(_masonryCompleteNum == ns.contentsLen+1){
								ns.scroll.check();
								_masonryCompleteNum = 0;	
							}
						}
					}
				});
			},
			
			
			// 초기 컨텐츠 포지션
			_setContentsPosition = function(){
				var len = $(".item").length,
					i = 0,
					width = 0,
					height = 0;
				
				for(i=0; i<len; i++){
					width = parseInt($(".item:eq("+i+")").attr("data-width"));
					height = parseInt($(".item:eq("+i+")").attr("data-height"));
					
					if(width > height){
						$(".item:eq("+i+") .con_over").css("top", height+_moveGap);
					}else{
						$(".item:eq("+i+") .con_over").css("left", width+_moveGap);
					}
				}
				
				
				len = null;
				i = null;
				width = null;				
				height = null;
			},
	
			_imageLoad = function($selector, $idx){
				AFO.loader.image($selector, AFO.contents.onImageLoadComplete, $idx);
			},
	
			_onImageLoadComplete = function($idx){
				var selector = $(".item:eq("+$idx+") .contents");
				selector.attr("isLoadComplete", "1");
				_loadingBoxIn($idx);
			},
			
			_addBtnEvent = function(){
				
				if(!ns.isTablet){
					$(".btn").on("mouseover", _onOverContents); //ie position fixed
					$(".btn").on("mouseout", _onOutContents);
				}
				
				$(".btn").css("cursor", "default");
				
			},
			
			_removeBtnEvent = function(){
				if(!ns.isTablet){
					$(".btn").off("mouseover", _onOverContents); //ie position fixed
					$(".btn").off("mouseout", _onOutContents);
				}
			},
			
			_show = function($idx){
				var selector = $(".item:eq("+$idx+") .contents");
				
				
			},
			
			_hide = function($idx){
				
				var selector = $(".item:eq("+$idx+").contents");
				
				if(parseInt(selector.attr("isLoading")) == 1 && parseInt(selector.attr("isShow")) == 1){
					
					$(".item:eq("+$idx+") .btn").css("cursor", "default");
					selector.attr("isShow", 0)
				}
			},
			
			_loadingBoxIn = function($idx){
				var loading_box = $(".item:eq("+$idx+") .loading_box"),
					delay = 0.5;
				
				TweenLite.killTweensOf(loading_box);
				TweenLite.to(loading_box, 0.8, {css:{"left":-ns.border_thikness}, ease:Quart.easeInOut, delay:delay, onComplete:_loadingBoxOut, onCompleteParams:[$idx]});
			},
			
			_loadingBoxOut = function($idx){
				
				var loading_box = $(".item:eq("+$idx+") .loading_box"),
					selector = selector = $(".item:eq("+$idx+") .contents");
					targetX = (parseInt($(".item:eq("+$idx+")").attr("data-width"))),
					delay = 0,
					width = 0,
					height = 0;
				
				
				selector.css("display", "block");
				
				
				TweenLite.killTweensOf(loading_box);
				TweenLite.to(loading_box, 0.7, {css:{"left":targetX}, delay:delay, ease:Quart.easeInOut, onComplete:_onHideLoadingBoxComplete, onCompleteParams:[$idx]});
				
				loading_box = null;
				selector = null;
				targetX = null;
				delay = null;
				width = null;
				height = null;
				
			},
			
			_onHideLoadingBoxComplete = function($idx){
				var selector = selector = $(".item:eq("+$idx+") .contents");
				selector.attr("isTrans", "0");
				$(".item:eq("+$idx+") .btn").css("cursor", "pointer");
				ns.scroll.check();
				
				selector = null;
			},
			
			_onOverContents = function(e){
				
				
			},
	
			_onOutContents = function(e){
	
				
			},
			
			_onClickContents = function($isNews, $this){
				var idx = parseInt($($this).attr("data-idx"));
					isNews = false,
					isShow = false,
					url = $($this).attr("data-link"),
					deep_link = $($this).attr("data-id");
				
				
				if(parseInt($isNews) == 1) isNews = true;
				if(parseInt($(".item:eq("+idx+") .contents").attr("isShow")) == 1) isShow = true;

				ns.selectedContentsIdx = idx;
		
				if( _Device.tablet ) {
					if( url.indexOf('content11') != 0 ) url = url.replace( 'content11', 'content11_tablet' );
					window.location.href = url;
					return;
				}

				if(isShow && !ns.isShowContents){
					if(url == ""){
						alert("준비중입니다.");
						return;	
					}
					
					window.location.href = ns.path+"#/"+deep_link;
				}
				
				idx = null;
				isNews = null,
				isShow = null,
				url = null,
				deep_link = null;
			},
			

			
			_onShowFrame = function($url){
				var selector = "",
					stageHeight = ns.window_height;
					
				ns.isShowContents = true;
				ns.scrollTop = $(document).scrollTop();
				_oldStageWidth = ns.window_width;
				
				selector = $("div.transparent");
				selector.css("display", "block");
				TweenLite.killTweensOf(selector);
				_onShowCompleteFrame( $url );
				
				selector = $("div.frame");
			},
			
			_onShowCompleteFrame = function($url){
				var selector = $("#wrap"),
					targetW = 0,
					targetH = 0;
				ns.isShowTransParent = true;
				
				targetW = ns.window_width;
				if(targetW < 1280){
					targetW = 1280;
				}
				
				targetH = ns.window_height;
				if(targetH < 900){
					targetH = 900
				}
				
				selector.css("width", targetW).css("height", targetH).css("overflow", "hidden");
				
				selector = $("div.frame");
				if(selector.children().length == 0){
					ns.frame.add( $('div.frame'), $url, 1280, 900 );
				}
				
				
				selector = $("#wrap");
				targetW = null;
				targetH = null;
			},
			
			_onHideFrame = function(){
				var selector = "",
					stageHeight = ns.window_height;
					
				if(_isSearch){
					ns.router.onChangeHash(ns.query);
					var isHidden = $(".noSearch").hasClass("hidden");
					if(isHidden)	{
						$(".noSearch").removeClass("hidden");
					}
				}else{
					ns.router.onChangeHash();
				}
				
				ns.frame.remove();
				
				selector = $("div.transparent");
				TweenLite.killTweensOf(selector);
				_onHideCompleteFrame();
				
				
				selector = null;
				stageHeight = null;
			},

			_onHideCompleteFrame = function(){
				$('html,body').css( {overflow:'visible'} );

				var selector = $("#wrap");
				ns.isShowTransParent = false;
				selector.css("width", "100%").css("height", "100%").css("overflow", "visible");
				$('.item').eq(AFO.selectedContentsIdx).find('a').focus();
				
				
				selector = $("div.transparent");
				selector.css("display", "none");
				
				ns.isShowContents = false;
				
				if(_oldStageWidth != ns.window_width){
					ns.main.onResize();
					_container.masonry();
				}
				
				selector = null;
			}

			// --------------------------------------------------------------
			
			return {
				init : _init,
				show : _show,
				hide : _hide,
				start : _start,
				reloadXml : _reloadXml,
				onClickContents : _onClickContents,
				onShowFrame : _onShowFrame,
				onHideFrame : _onHideFrame,
				onImageLoadComplete : _onImageLoadComplete,
				onLoadContentsXmlComplete : _onLoadContentsXmlComplete
			};
	})();
	
	ns.contents = contents;
	
}(AFO|| {}, jQuery));
