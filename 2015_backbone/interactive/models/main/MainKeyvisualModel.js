App.Models.MainKeyvisualModel = Backbone.Model.extend({
	'default':{
        "seq":"",                         // 서버에 전달할 seq
        "type": "",                       // 이미지 / 비디오 타입
        "kid" : "",                       // 키비주얼 아이디
        "title_web_image_url": "",        // 타이틀 웹 이미지 경로
        "title_mobile_image_url": "",     // 타이틀 모바일 이미지 경로
        "title_alt_text": "",             // 타이틀 이미지 알트 텍스트
        "title_position": -1,             // 타이틀 위치지정
        "title_position_class":"",        // 타이틀 위치 클래스
        "keyvisual_web_image_url": "",    // 키비주얼 웹 이미지 경로
        "keyvisual_tablet_image_url": "", // 키비주얼 타블렛 이미지 경로
        "keyvisual_mobile_image_url": "", // 키비주얼 모바일 이미지 경로
        "keyvisual_alt_text": "",         // 키비주얼 이미지 알트 텍스트
        "link_url": "",                   // 링크 경로
        "link_target": "",                // 링크 타겟
        "video_mp4_url": "",              // 비디오 확장자 mp4 경로
        "video_webm_url": "",             // 비디오 확장자 webm 경로
        "youtube_url": "",                // 유투브 동영상 경로
        "indicator_link_url":"",          // 인디게이터 링크 경로
        "indicator_link_text":"",         // 인디게이터 링크 텍스트
        "type_logo_image_url":"",         //
        "log_text":""                     // 구글태깅
	}
});

