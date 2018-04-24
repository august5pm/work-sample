(function(window, $, undefined){

	var document = window.document,
		navigator = window.navigator,
		location = window.location;
	
	var main = (function(){
		var _isSearch = false;
		
		_initialize = function(){
			_onCheckBrowser();
			_onCheckTablet();
			
			AFO.loader.init();
			AFO.search.init();
			AFO.navi.init();
			AFO.resize.init();
			AFO.router.init();
			_start();
		},
		
		_start = function(){
			_showLogo();
			_setSkip();
			_addEvent();
			_onCompleteIntro();
		},
		
		_showLogo = function(){
			var selector = $("#logo");
			selector.css("display", "block");
			
			selector = $("#option");
			selector.css("display", "block");
		};
		
		_onCheckBrowser = function(){
			// IE version check
			if( navigator.appName.indexOf("Microsoft") > -1 ) // IE?
			{
				AFO.isIE = true;
				
				if(navigator.appVersion.indexOf("MSIE 8") > -1 || navigator.appVersion.indexOf("MSIE 7") > -1) // IE7?
				{
				  	AFO.isIE8 = true;
				}
			}
		},
		
		_onCheckTablet = function(){
			var minSiteWidth=480;
			/*Anything Less than or Equal to this will be in 'phone' view*/
			var maxSiteWidth=1024;
			/*Anything between this and min width will be tablet, anything greater will be Desktop*/
			//<![CDADA[
			if(navigator.userAgent.match(/Android/)!=null) {
				//android
				if(navigator.userAgent.match(/mobile|Mobile/)!=null) {
					//mobile
		
				} else {
					//tab
					AFO.isTablet = true;
				}
			} else {
				// not android
				var minSiteWidth=480;
				/*Anything Less than or Equal to this will be in 'phone' view*/
				var maxSiteWidth=1024;
				/*Anything between this and min width will be tablet, anything greater will be Desktop*/
				var w=($(window).width()<window.screen.width )?$(window).width():window.screen.width;
				if(navigator.userAgent.match(/webOS|iPhone|iPad|iPod|BlackBerry/)!=null) {
					if(w<=minSiteWidth) {
						//mobile
		
					} else if(w>minSiteWidth&&w<maxSiteWidth) {
						//tab
						AFO.isTablet = true;
					}
				}
			}
			//]]>
		},
		
		_setSkip = function(){
			$('.skip').focus(function(){ //skip navigation
				$(this).css('top',0);		
			});
			
			$('.skip').blur(function(){
				$(this).css('top',-50);		
			});

			$('.skip').click(function( $evt ){
				$evt.preventDefault();
				//$('#container .m1.con_out > p a').eq(0).focus();
				$("#container .item:eq(0) a").focus();
			});
		},
		
		_addEvent = function(){
			
			$(document).on("keyup", _keyUpHandler);
			$(document).on("keydown", _keyDownHandler);
			
			$('.zoom').on('click', _onClickZoom);
			$('.close-search').on('click', _onClickCloseSearch);
			$('.gotop').on("click", _onClickTop);
			
			
			if(AFO.isTablet){
				window.addEventListener("orientationchange", _orientationEventHandler, false);
				_orientationEventHandler();
			}
		},
		
		_orientationEventHandler = function(){
			
			if(window.orientation == 0 || window.orientation == 180){
				// 세로	
				AFO.scaleX = screen.width/1280;
			}else{
				// 가로
				AFO.scaleX = screen.height/1280;
			}
		},
		
		_keyUpHandler = function(){
			
		},
		
		// 키보드 다운 이벤트 핸들러
		_keyDownHandler = function($event){
			var keyCode = $event.keyCode;
			AFO.search.keyDownHandler(keyCode);
		},
		
		_onCompleteIntro = function(){
			$(".intro_container").css("display", "none");
			
			AFO.isIntroComplete = true;
			AFO.contents.start();
		},

		_onResize = function(){
			if(!AFO.isShowContents){
				
				if(AFO.window_width < 1024){
					$("#header").width(944)
				}else{
					$("#wrap").width("100%");
					$("#header").width("100%");
				}
	
				_wrapperRepos(AFO.window_width);
				
				if(AFO.isSearch){
					// 검색결과가 없을 때
					var noSearchHeight = (AFO.window_height - 330)
					$(".noSearch").css("height", noSearchHeight-(noSearchHeight/3));
					$(".noSearch div").css("margin-top", (noSearchHeight/3));
				}
				
				if(AFO.isIntroComplete) AFO.scroll.check();
			}else{
				if(AFO.isShowTransParent){
					var targetY =0,
						targetW = 0,
						targetH = 0;
					targetW = AFO.window_width;
					if(targetW < 1024){
						targetW = 1024;
					}
					
					targetH = AFO.window_height;
					if(targetH < 900){
						targetH = 900
					}
					
					$("#wrap").width(targetW).height(targetH);
					
					targetY = Math.floor(AFO.window_height/2) - 450;
					if(targetY < 0) targetY = 0;
					$("div.frame").css("top", targetY);
				}
			}
		},

		_wrapperRepos = function(obj){
			var selector = $('#container, #header, #footer')
			
			AFO.width_repos = obj - AFO.width_repos_margin;
			
			TweenLite.killTweensOf(selector);
			if(obj <= AFO.defaultContainer_size){
				selector.css({'width':AFO.defaultContainer_size , margin : '0 auto'});
			}
			
			if(obj >= AFO.defaultContainer_size){
				selector.css({'width':AFO.block_size*3 , margin : '0 auto'}); //1200 ( 3 cols )
			}

			if(obj >= AFO.defaultContainer_size + (AFO.block_size)){
				selector.css({'width':AFO.block_size*4 , margin : '0 auto'}); //1600 ( 4 cols )
			}

			if(obj >= AFO.defaultContainer_size + (AFO.block_size * 2)){
				selector.css({'width':AFO.block_size*5 , margin : '0 auto'}); //2000 ( 5 cols )
			}

			if(obj >= AFO.defaultContainer_size + (AFO.block_size * 3)){
				selector.css({'width':AFO.block_size*6 , margin : '0 auto'}); //2400 ( 6 cols )
			}

			if(obj >= AFO.defaultContainer_size + (AFO.block_size * 4)){
				selector.css({'width':AFO.block_size*7 , margin : '0 auto'}); //2400 ( 6 cols )
			}

			if(obj >= AFO.defaultContainer_size + (AFO.block_size * 5)){
				selector.css({'width':AFO.block_size*8 , margin : '0 auto'}); //2400 ( 6 cols )
			}
			
			
		}
		
		_onClickZoom = function( $evt ){
			$evt.preventDefault();
			_isSearch = true;

			$('.search-underline').css( {height:1} );
			$('.search-underline').animate( {width:250+24+22}, 400 );
			$('.search').animate( {width:250}, 400 );
			$('#search-txt').css( {display:'block'} );
			$('#search-txt').animate( {width:250}, 400, function(){
				$('#search-txt').focus();
			});

			$('.close-search').fadeIn();
		},

		_onClickCloseSearch = function(){
			if( _isSearch ) {
				_isSearch = false;
				$('.search-underline').animate( {width:0}, 400 );
				$('.search').animate( {width:0}, 400 );
				$('#search-txt').animate( {width:0}, 400, function(){
					$('#search-txt').css( {display:'none'} );
					$('.close-search').css( {display:'none'} )
				});

			}
			
			AFO.search.reset();
		},
		
		_onClickTop = function( $evt ){
			$evt.preventDefault();

			$("html, body").animate({ scrollTop: "0px" });
		},
		
		_onClickCloseContents = function(){
			AFO.isClickCloseContents = true;
			AFO.contents.onHideFrame();
		},
		
		_setIframeFocus = function(){
			$("div.frame iframe").focus();
		},
		
		_showFooter = function(){
			$('footer').css('visibility','visible');
		}
		
		
		return {
			init : _initialize,
			onResize : _onResize,
			showFooter : _showFooter,
			setIframeFocus : _setIframeFocus,
			onCompleteIntro : _onCompleteIntro,
			onClickCloseSearch : _onClickCloseSearch,
			onClickCloseContents : _onClickCloseContents,
			onLoadContentsXmlComplete : _onLoadContentsXmlComplete
		};
	})();
	
	$(function(){
		AFO.main = main;
	});
	
	$(document).ready(function(e) {
        AFO.main.init();
    });
}(window, jQuery));
