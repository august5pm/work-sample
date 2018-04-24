(function(ns, $, undefined){

	var navi = (function(){
		var _selectedIdx = 0,
			_timer = 0, 
			_len = 0, 
			_cur = 0, 
			_w = 0, 
			_h = 0,
			_row = 2,
			_isMotionComplete = false,
			_title = [ 'SAMSUNG MAKE IT MEANINGFUL', 'PRODUCT STORIES', 'MEANINGFUL STORIES', 'ABOUT US' ];
		
		var _init = function(){
				_cur = 0;
				_len = 58;
				_w = 199;
				_h = 14;
				
				_show();
			},
			
			
			
			_show = function(){
				_start();
				_makePosition();
			}, 
			
			_hide = function(){
				clearInterval(_timer);
			},
			
			_start = function(){
				if(!ns.isIE8){
					_timer = setInterval(_changeLoading, 1000/40);
				}else{
					_timer = setInterval(_changeLoading, 1000/60);
				}
			},
			
			_changeLoading = function(){
				var tgX, tgY;
				tgX = (_cur % _row) * -_w;
				tgY = (Math.floor(_cur / _row) * -_h ) ;
				
				$("#navi .navi-title").css('backgroundPosition', tgX+'px '+tgY+'px')
				
				_cur++;
				
				if(_cur > _len) {
					_cur = 0;
					_motionComplete();
				}
			}
				
			_motionComplete = function(){
				_hide();
			},
			
			
			_makePosition = function(){
				var barLen = 4,
					i = 0,
					selector = "",
					barX = 0,
					space = 130;
					
				for(i=0; i<barLen; i++){
					selector = $("#navi .navi-bar:eq("+i+")");
					barX = space*i;
					TweenLite.to(selector, 0.8, {css:{"left":barX}, ease:Cubic.easeInOut});
					TweenLite.to(selector, 0.4, {css:{"opacity":1}, delay:0.5});
					
					if(ns.isIE8){
						selector = $("#navi .navi-bar-ie8:eq("+i+")");
						barX = (space*i)-9;
						selector.css("left", barX).css("display", "block").css("opacity", "0");
					}
				}
				
				selector = $("#navi nav a");
				selector.css( {display:'block', opacity:0} );	// +++
				TweenLite.killTweensOf(selector);
				TweenLite.to(selector, 0.4, {css:{"opacity":1}, delay:0.5, onComplete:_makePositionComplete});
			},
			
			_makePositionComplete = function(){
				var selector = $("#navi nav a");
				
				selector.css("cursor", "pointer");
				_isMotionComplete = true;
				_onChangeBar(ns.selectedCategoryIdx);
			},
			
			_over = function($idx){
				if(!_isMotionComplete) return;
				
				var idx = parseInt($idx),
					selector = "",
					bar_left = "",
					bar_right = "";
					
				if(idx != 0) {
					selector = $("#navi nav a:eq("+(idx-1)+")");
					
					if(ns.selectedCategoryIdx != idx){
					if(ns.selectedCategoryIdx != 0 && ns.selectedCategoryIdx != ns.INDEX_SEARCH) _outBar(ns.selectedCategoryIdx)
						_overBar(idx);
					}
				}else{
					selector = $("#navi h2 a");
				}
				
				selector.css("text-decoration", "none");
			},
			
			_out = function($idx){
				if(!_isMotionComplete) return;
				var idx = parseInt($idx),
					selector = "",
					bar_left = "",
					bar_right = "";
					
				if(idx != 0) {
					selector = $("#navi nav a:eq("+(idx-1)+")");
					_outBar(idx);
					
				}else{
					selector = $("#navi h2 a");
				}
				
				if(ns.selectedCategoryIdx != idx){
					_outBar(idx)
				}
				
				if(ns.selectedCategoryIdx != 0 && ns.selectedCategoryIdx != ns.INDEX_SEARCH) _overBar(ns.selectedCategoryIdx);
			},
			
			_click = function($idx){
				var idx = parseInt($idx);
				if(ns.selectedCategoryIdx == idx && !_isMotionComplete) return;

				document.title = _title[idx];
				if(ns.selectedCategoryIdx != 0 && ns.selectedCategoryIdx != ns.INDEX_SEARCH) _outBar(ns.selectedCategoryIdx);
				ns.selectedCategoryIdx = idx;
				_selectedIdx = idx;
				if(ns.selectedCategoryIdx != 0 && ns.selectedCategoryIdx != ns.INDEX_SEARCH) _overBar(ns.selectedCategoryIdx);
				
				ns.router.onChangeHash();
			},
			
			_onChangeBar = function($idx){
				var idx = $idx;
				
				if(_selectedIdx == idx || !_isMotionComplete) return;
				if(_selectedIdx != 0 && _selectedIdx != ns.INDEX_SEARCH) _outBar(_selectedIdx);
				_selectedIdx = idx;
				if(_selectedIdx != 0 && _selectedIdx != ns.INDEX_SEARCH) _overBar(_selectedIdx);
			},
			
			_overBar = function($idx){
				
				var bar_left = $("#navi .navi-bar:eq("+($idx-1)+")"),
					bar_right = $("#navi .navi-bar:eq("+$idx+")");
				
				
				$("#navi nav a:eq("+($idx-1)+")").css("font-family", "samsungif_blk");
				
				TweenLite.killTweensOf(bar_left);
				TweenLite.killTweensOf(bar_right);
				
				if(!ns.isIE8){
					TweenLite.to(bar_left, 0.2, {css:{"rotation": "20deg"}, ease:Cubic.easeInOut});
					TweenLite.to(bar_right, 0.2, {css:{"rotation": "20deg"}, ease:Cubic.easeInOut});
				}else{
					TweenLite.to(bar_left, 0, {css:{"opacity": "0"}});
					TweenLite.to(bar_right, 0, {css:{"opacity": "0"}});
					
					bar_left = $("#navi .navi-bar-ie8:eq("+($idx-1)+")"),
					bar_right = $("#navi .navi-bar-ie8:eq("+$idx+")");
					
					TweenLite.to(bar_left, 0, {css:{"opacity": "1"}});
					TweenLite.to(bar_right, 0, {css:{"opacity": "1"}});
				}
				
			},
			
			_outBar = function($idx){
				var bar_left = $("#navi .navi-bar:eq("+($idx-1)+")"),
					bar_right = $("#navi .navi-bar:eq("+$idx+")");
				
				$("#navi nav a:eq("+($idx-1)+")").css("font-family", "samsungif_bd");
				
				TweenLite.killTweensOf(bar_left);
				TweenLite.killTweensOf(bar_right);
				
				if(!ns.isIE8){
					TweenLite.to(bar_left, 0.2, {css:{"rotation": "0deg"}, ease:Cubic.easeInOut});
					TweenLite.to(bar_right, 0.2, {css:{"rotation": "0deg"}, ease:Cubic.easeInOut});	
				}else{
					TweenLite.to(bar_left, 0, {css:{"opacity": "1"}});
					TweenLite.to(bar_right, 0, {css:{"opacity": "1"}});
					
					bar_left = $("#navi .navi-bar-ie8:eq("+($idx-1)+")"),
					bar_right = $("#navi .navi-bar-ie8:eq("+$idx+")");
					
					TweenLite.to(bar_left, 0, {css:{"opacity": "0"}});
					TweenLite.to(bar_right, 0, {css:{"opacity": "0"}});
				}
			}
			
			return {
				init : _init,
				over : _over,
				out : _out,
				click : _click,
				onChangeBar : _onChangeBar
			};
	})();
	
	ns.navi = navi;
	
}(AFO || {}, jQuery));
