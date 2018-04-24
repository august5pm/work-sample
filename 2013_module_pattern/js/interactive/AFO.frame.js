
(function(ns, $, undefined){
	var frame = (function(){
		var _oldUrl = "";
		var _init = function(){
				
		},
		
		_add = function( $target, $url, $w, $h, $title ) {
			if( $target.children().length ) _remove();	

			var url = $url+"?"+Math.random()*3000;
			var y = Math.floor(ns.window_height/2) - 450;
			y = ( y > 0 ) ? y : 0;
			
			
			$target.append('<iframe src="'+$url+'" title="'+$title+'" frameBorder="0" width="'+$w+'" height="'+$h+'"></iframe>');
			$target.css( {top:y, display:'block'} );

			_oldUrl = $url;
		},

		_remove = function(){
			$('div.frame').css( {display:'none'} );
			$('div.frame iframe').remove();
		},
		
		_resize = function($height){
			$("iframe").css("height", $height);
		}
		
		return {
			init : _init,
			add : _add,
			remove : _remove,
			resize : _resize
		};
	})();
	
	ns.frame = frame;
	
}(AFO || {}, jQuery));