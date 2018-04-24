if(typeof AFO=='undefined' || !AFO){
	var AFO = {};
	
	AFO.window_width = 0;
	AFO.window_height = 0;

	
	/* xml url */
	AFO.CONTENTS_XML_URL_ALL = "/contents_list_all.jsp";
	AFO.CONTENTS_XML_URL_CATE1 = "/contents_list_cate2.jsp";
	AFO.CONTENTS_XML_URL_CATE2 = "/contents_list_cate2.jsp";
	AFO.CONTENTS_XML_URL_CATE3 = "/contents_list_cate3.jsp";
	AFO.CONTENTS_XML_URL_CATE4 = "/contents_list_cate4.jsp";
	AFO.CONTENTS_XML_URL_CATE5 = "/contents_list_cate5.jsp";
	
	AFO.path = "";
	AFO.contentsXmlData = "";
	AFO.contentsLen = 0;
	AFO.contents_index = -1;
	AFO.contents_url = [];
	
	/* contents box info */
	AFO.border_thikness = 3;
	AFO.box_color="#FFF";
	
	/* global idx */
	AFO.selectedCategoryIdx = 0;	// category idx
	AFO.selectedContentsIdx = 0;	// contents idx
	
	/* index number */
	AFO.INDEX_ALL = 0;
	AFO.INDEX_CATE1 = 1;
	AFO.INDEX_CATE2 = 2;
	AFO.INDEX_CATE3 = 3;
	AFO.INDEX_CATE4 = 4;
	AFO.INDEX_CATE5 = 5;
	
	/* deep link info */
	AFO.deep_link_one = ["all", "cate1","cate2","cate3", "cate4", "cate5"];
	AFO.deep_link_data = [AFO.deep_link_one];
	AFO.deep_link_contents = [];
	
	/* browser info */
	AFO.isIE = false;
	AFO.isIE8 = false;
	
	/* boolean */
	AFO.isIntroComplete = false;
	AFO.isShowContents = false;
	AFO.isShowTransParent = false;
	AFO.isStartContentsMode = false;
	AFO.isClickCloseContents= false;
	
	AFO.isTablet = false;
	AFO.isSearch = false;
	AFO.scaleX = 1;
	
	
	AFO.query = "";
	AFO.scrollTop = 0;
	
	
	/* KEY CODE */
	AFO.KEY_LEFT = 37;
	AFO.KEY_UP = 38;
	AFO.KEY_RIGHT = 39;
	AFO.KEY_DOWN = 40;
	AFO.KEY_ENTER = 13;
}