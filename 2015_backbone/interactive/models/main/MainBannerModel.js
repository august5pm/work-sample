App.Models.MainBannerModel = Backbone.Model.extend({
    'default':{
        "type":""   // 배너 레이어 타입
    }
});

////////////////////////////////////////////////////////
//  배너 리스트 모델
////////////////////////////////////////////////////////
App.Models.MainBannerListModel = Backbone.Model.extend({
    'default':{
        "web_image_url": "",      // 웹 이미지 경로
        "mobile_image_url": "",   // 모바일 이이지 경로
        "alt_text": "",         // 이미지 알트 텍스트
        "title_text": "",       // 타이틀 텍스트
        "contents_text": "",    // 내용 텍스트
        "link_url": "",         // 링크 경로
        "link_target": "",      // 링크 타겟,
        "log_text":""           // 구글태깅
    }
});