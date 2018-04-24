window.GlobalVars = (function(){

    // is Mobile
    var _detectClass = document.querySelector('html').className;
    var _isMobile = _detectClass.indexOf("mobile") == -1 ? false : true;
    var _isTablet = false;
    if(!_isMobile){
        if(_detectClass.indexOf("tablet") == -1){
            _isTablet = false;
        }else{
            _isTablet = _detectClass.indexOf("ie") == -1 ? true : false;
        }
    }else _isTablet = false;

    // page ID
    var _page_id = "";
    var _element = document.querySelector('meta[property="aof:page_id"]');

    if(_element == undefined || _element == null || _element == ""){ // 트래킹 값이 입력되지 않은 경우, (empty + 페이지이름)
        // var path = window.location.pathname;
        // var page = path.split("/").pop();
        // var page_name = page.split(".html")[0];
        // _page_id = "empty_" + page_name;
        _page_id = "empty"
    }else{
        var _content = _element && _element.getAttribute("content");
        _page_id = _content;
    }

    // what from dealer
    var queryString = window.location.search || '';
    var keyValPairs = [];
    var _params      = {};
    queryString     = queryString.substr(1);
    if (queryString.length)
    {
        keyValPairs = queryString.split('&');
        for (var pairNum in keyValPairs)
        {
            var key = keyValPairs[pairNum].split('=')[0];
            if (!key.length) continue;
            if (typeof _params[key] === 'undefined')
                _params[key] = [];
            _params[key].push(keyValPairs[pairNum].split('=')[1]);
        }
    }


    var _browser_title = "";
    var _element_b_title = document.getElementsByTagName("title")[0].innerHTML;

    if(_element_b_title == undefined || _element_b_title == null || _element_b_title == ""){
        _browser_title = "empty"
    }else{
        _browser_title = _element_b_title;
    }


    return {
        // 페이지 ID
        page_id : _page_id,

        // 모바일 디바이스 유무
        isMobile : _isMobile,
        isTablet : _isTablet,

        // 그 밖에 쿼리 파라미터 저장
        params : _params,

        // 브라우져 타이틀
        browser_title : _browser_title
};

})();

// ....
// ....
// ....

// 그밖에 변수값 저장
window.GlobalVars.page_name = "not_defined_yet ";
window.GlobalVars.json_data = {};
window.GlobalVars.device = {"pixel_ratio" : window.devicePixelRatio, "isHighDPI" : window.devicePixelRatio > 1};
// ....
// ....
// ....

console.log("GlobalVars.page_id : " + window.GlobalVars.page_id);
console.log("GlobalVars.isMobile : " + window.GlobalVars.isMobile);
console.log("GlobalVars.isTablet : " + window.GlobalVars.isTablet);
console.log("GlobalVars.device.isHighDPI : " + window.GlobalVars.device.isHighDPI);
console.log("GlobalVars.browser_title : " + window.GlobalVars.browser_title);