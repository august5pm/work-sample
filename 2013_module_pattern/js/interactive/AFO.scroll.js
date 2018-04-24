(function(ns, $, undefined){

	var scroll = (function(){
		
		var _showHeightPercent = 0.3,
			_isAddEvent = false;
		
		var _init = function(){
				_check();
				if(!_isAddEvent) _addEvent();
			},
			
			_addEvent = function(){
				_isAddEvent = true;
				$(window).on("scroll", _onMoveScroll);
			},
			
			_check = function(){
			
				var i=0,
					len = ns.contentsLen,
					windowHeight = ns.window_height,
					scrollY = $(document).scrollTop(),
					containerY = ($("#header").height()*ns.scaleX) - scrollY,
					checkPointY = windowHeight,
					debug_txt = "";
				
				if(ns.isTablet){
					_showHeightPercent = 0;
				}
				
				for(i=0; i<len; i++){
					var contentsY= containerY + parseInt($(".item:eq("+i+")").css("top")),
						showPointY = (contentsY + ($(".item:eq("+i+")").height()*_showHeightPercent))*ns.scaleX;
					if(showPointY <= checkPointY){
						ns.contents.show(i);
						
					}else{
						ns.contents.hide(i);
						
					}
				}
			},
			
			_onMoveScroll = function(e){
				_check();
			}
			
			return {
				init : _init,
				check : _check,
				addEvent : _addEvent
			};
	})();
	
	ns.scroll = scroll;
	
}(AFO|| {}, jQuery));
