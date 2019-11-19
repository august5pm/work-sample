import Vue from 'vue'
import { EventBus } from './event-bus.js';
import $ from 'jquery';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public

var _this;

var _meta = {
    "main":{
        "title":"AUGUST",
        "desc":"크리에이터들과 함께 세상을 즐겁게 만들어 나가는 MCN 업계 대표 디지털 엔터테인먼트 기업"
    },
    "creator_creators":{
        "title":"크리에이터 보기 | AUGUST",
        "desc":"개성 넘치는 어거스트 소속 크리에이터를 소개합니다."
    },
    "creator_agency":{
        "title":"어거스트의 강점 | AUGUST",
        "desc":"크리에이터들의, 크리에이터들에 의한, 크리에이터들을 위한 MCN 회사."
    },
    "business_brand":{
        "title":"브랜드 광고 | AUGUST",
        "desc":"어거스트 소속의 영향력있는 크리에이터들 통해 당신의 브랜드 가치를 높이세요!"
    },
    "business_brand_detail":{
        "title":"브랜드 광고 성공 사례 | AUGUST",
        "desc":"어거스트 소속의 영향력있는 크리에이터들 통해 당신의 브랜드 가치를 높이세요!"
    },
    "business_brand_contact":{
        "title":"브랜드 광고 제휴 문의 | AUGUST",
        "desc":"브랜드 광고 제휴 문의 AUGUST."
    },
    "business_ip":{
        "title":"IP 사업 | AUGUST",
        "desc":"어거스트 소속의 영향력있는 크리에이터들 통해 당신의 IP 사업을 강화시키세요!"
    },
    "business_ip_detail":{
        "title":"IP 사업 성공 사례 | AUGUST",
        "desc":"화제가 되었던 어거스트의 대표 IP 사업 성공 사례를 소개합니다."
    },
    "business_ip_contact":{
        "title":"IP 사업 제휴 문의 | AUGUST",
        "desc":"IP 사업 제휴 문의 페이지입니다."
    },
    "about":{
        "title":"회사소개 | AUGUST",
        "desc":"어거스트의 가치를 소개합니다."
    },
    "careers":{
        "title":"인재채용 | AUGUST",
        "desc":"상상력으로 가득찬 놀이터, 어거스트와 함께 걸어갈 지원자들을 기다립니다."
    },
    "careers_detail":{
        "title":"진행 중 공고 | AUGUST",
        "desc":"현재 어거스트에서 진행 중인 채용 공고입니다."
    },
    "careers_apply":{
        "title":"지원서 작성 | AUGUST",
        "desc":"어거스트와 함께 걸어갈 당신의 지원을 기다립니다."
    },
    "news":{
        "title":"어거스트 최신 뉴스 | AUGUST",
        "desc":"어거스트와 크리에이터들의 새로운 소식을 전합니다."
    },
    "news_detail":{
        "title":"어거스트 최신 뉴스 | AUGUST",
        "desc":"어거스트와 크리에이터들의 새로운 소식을 전합니다."
    },
    "privacy_policy":{
        "title":"개인정보처리방침 | AUGUST",
        "desc":"어거스트의 개인정보처리방침입니다."
    },

    "esports":{
        "title":"E스포츠 | AUGUST",
        "desc":"어거스트의 E스포츠 전문 클럽을 소개합니다."
    },

    "ir_notice":{
        "title":"IR 공고 | AUGUST",
        "desc":"크리에이터들의 놀이터, 국내 대표 MCN 회사 어거스트의 IR 공고를 전합니다."
    },

    "ir_notice_detail":{
        "title":"IR 공고 | AUGUST",
        "desc":"크리에이터들의 놀이터, 국내 대표 MCN 회사 어거스트의 IR 공고를 전합니다."
    },
}



var _created = function() {
    EventBus.$on(EventBus.CHANGE_METADATA, _onChange_metadata)
}

var _onChange_metadata = function(path){
    var title = _meta[path].title;
    var desc = _meta[path].desc;
    _setMetaData(title,desc);
}

var _setMetaData = function(title, desc){

    // 브라우저 타이틀
    $('.browser-title').text(title);

    // 메타데이터 타이틀
    $('.meta-title').attr('content', title);

    // 메타데이터 디스크립션
    $('.meta-desc').attr('content', desc);
}

module.exports = {
    created: _created()
}
