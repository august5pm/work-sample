(function(ns, $, undefined){

	var search = (function(){
		var _isFocus = false,
			_memoryTxt = "";
		
		var _init = function(){
				_addEvent();
			},
			
			_addEvent = function(){
				var selector = $("#search-txt");
				selector.on("focusin", _onFocusInSearch);
				selector.on("focusout", _onFocusOutSearch);
			},
			
			_onFocusInSearch = function(){
				var selector = $("#search-txt");
				_isFocus = true;
			},
			
			_onFocusOutSearch = function(){
				var selector = $("#search-txt");
				_isFocus = false;
			},
			
			_keyDownHandler = function($keyCode){
				var keyCode = $keyCode;
				switch(keyCode){
					case ns.KEY_LEFT :
					break;
					case ns.KEY_RIGHT : 
					break;
					case ns.KEY_UP :
					break;
					case ns.KEY_DOWN :
					break;
					case ns.KEY_ENTER :
						if(_isFocus) _onEnterInputText();
					break;
					default :
					break;	
				}
			},
			
			_reset = function(){
				var selector = $("#search-txt");
				selector.val("");
			},
			
			_onEnterInputText = function(){
				var selector = $("#search-txt");
				ns.selectedCategoryIdx = ns.INDEX_SEARCH;
				ns.router.onChangeHash(selector.val());
			}
			
			return {
				init : _init,
				reset : _reset,
				keyDownHandler : _keyDownHandler
			};
	})();
	
	ns.search = search;
	
}(AFO|| {}, jQuery));
