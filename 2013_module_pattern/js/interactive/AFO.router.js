(function(ns, $, undefined){
	
	var location = window.location;
	
	var router = (function(){
		var _path = ""
			_isStart = false,
			_arrDeepLinkQuery = [],
			_strDeepLinkUrl = "";
		
		var _init = function(){
				ns.path = window.location.pathname;
				_path = window.location.pathname;
				
				ns.loader.xml(ns.CONTENTS_XML_URL_ALL, ns.router.xmlLoadComplete);
			},
			
			_xmlLoadComplete = function($xml){
				ns.contentsXmlData = $xml;
				_setContentsDeepLink();
			},
			
			_setContentsDeepLink = function(){
				var i = 0,
					xmlData = ns.contentsXmlData,			
					len = $(xmlData).find("list").length,
					selector_list = "",
					contents_url = "",
					deep_link = "";
					
					for(i=0; i<len; i++){
						selector_list = $(xmlData).find("list")[i];
						deep_link = $(selector_list).find("id").text();
						contents_url = $(selector_list).find("link").text()
						
						ns.contents_url.push(contents_url);
						ns.deep_link_contents.push(deep_link);
					}
				
				_addEvent();
			},
			
			_addEvent = function(){
				$(window).on("hashchange", function (e) {
					if(ns.isKeyLock == true) {	
						_onChangeHash();
						return;
					}
					_checkHash();
				});
				
				_checkHash();
			},
			
			// 해시태그 체크
			_checkHash = function(){
				
				var deepLink = location.hash.split("#/")[1];
				ns.isSearch = false;
				
				if(ns.isClickCloseContents) {
					ns.isClickCloseContents = false;
					return;
				}
				
				if(String(deepLink).split("?q=").length != 1){
					ns.query = deepLink.split("?q=")[1];
					deepLink = deepLink.split("?q=")[0];
					ns.isSearch = true;
				}else{
					var isShowNoSearch = $(".noSearch").hasClass("hidden");
					
					if(!isShowNoSearch){
						$(".noSearch").addClass("hidden");
					}
				}
				
				if(deepLink == "" || deepLink == undefined){
					ns.selectedCategoryIdx = 0;
					_onChangeHash();
				}else{
					_setCurrentDeepLink(deepLink);
				}
			},
			
			_setCurrentDeepLink = function($deepLink){
				var i=0,
					len = ns.deep_link_contents.length,
					checkIdx = -1;
				
				// 컨텐츠 딥링크 체크
				for(i=0; i<len; i++){
					if(ns.deep_link_contents[i] == $deepLink){
						if(!ns.isStartContentsMode){
							ns.isStartContentsMode = true;
							if(!_isStart) {
								_onChangePage();
							}
						}
						
						if(ns.isIntroComplete){
							ns.contents.onShowFrame(ns.contents_url[i]);
							
						}else{
							_onChangePage();	
						}
						
						return;
					}
				}
				
				// 카테고리 딥링크 체크
				len = ns.deep_link_one.length;
				checkIdx = -1;
				for(i=0; i<len; i++){
					if(ns.deep_link_one[i] == $deepLink){
						checkIdx = i;
					}
				}
	
				if(checkIdx == -1){
					if(ns.isShowContents){
						ns.contents.onHideFrame();
						return;
					}else{
						ns.selectedCategoryIdx = 0;
						_onChangeHash();
						return;
					}
					
				}else{
					ns.selectedCategoryIdx = checkIdx;
				}
				
				if(!_isStart){
					_isStart = true;	
				}
			
				// 페이지 변경
				_onChangePage();
			},
			
			
			// 페이지 변경하기
			_onChangePage = function(){
				var idx = ns.selectedCategoryIdx;
				
				if(ns.isShowContents){
					ns.contents.onHideFrame();
					return;
				}
				
				ns.navi.onChangeBar(idx);
				switch(idx){
					case ns.INDEX_ALL :
						ns.contents.reloadXml(ns.CONTENTS_XML_URL_ALL);
					break;
					case ns.INDEX_PRODUCT :
						ns.contents.reloadXml(ns.CONTENTS_XML_URL_PRODUCT);
					break;
					case ns.INDEX_MEANINGFUL :
						ns.contents.reloadXml(ns.CONTENTS_XML_URL_MEANINGFUL);
					break;
					case ns.INDEX_ABOUT :
						ns.contents.reloadXml(ns.CONTENTS_XML_URL_ABOUT);
					break;
					case ns.INDEX_SEARCH :
						ns.contents.reloadXml(ns.CONTENTS_XML_URL_SEARCH);
					break;
					case ns.INDEX_NEWS :
						ns.contents.reloadXml(ns.CONTENTS_XML_URL_NEWS);
					break;
					default :
					break;
				}
			},
			
			// 해시태그 주소 변경하기
			_onChangeHash = function($query){

				if($query != undefined){
					ns.query = $query;
					window.location.href = _path+"#/"+ns.deep_link_one[ns.selectedCategoryIdx]+"?q="+ns.query;
				}else{
					ns.query = "";
					window.location.href = _path+"#/"+ns.deep_link_one[ns.selectedCategoryIdx];
				}
			}
			
			return {
				init : _init,
				xmlLoadComplete : _xmlLoadComplete,
				onChangeHash : _onChangeHash
			};
	})();
	
	ns.router = router;
	
}(AFO || {}, jQuery));
