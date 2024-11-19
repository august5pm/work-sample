/**
 * main contents
 */
(function (win, $) {
	'use strict';
	win.AUGUST5PM = win.AUGUST5PM || {};
	var UTILS = win.AUGUST5PM.libs.utils,
		GlobalVars = win.AUGUST5PM.libs.globalVars,
		CustomEvents = win.AUGUST5PM.libs.customEvents,
		pluginName = 'mainPage';
	win.AUGUST5PM[pluginName] = function (container, args) {
		if (!(this instanceof win.AUGUST5PM[pluginName])) {
			return new win.AUGUST5PM[pluginName](container, args);
		}
		var defParams = {
			container: '#container',
			body: 'body',
			obj: '.main',
			mainVisual: '.main-visual',
			mainVoting: '.main-voting',
			mainPartner: '.main-partner',
			newsListCon: '.news-list-con',
			highlightListCon: '.highlight-list-con',
			swiperContainer: '.swiper-container',
			btnAppLink: '.btn-applink',
			iosClass: 'is-ios',
			andoridClass: 'is-android'
		};
		this.opts = UTILS.def(defParams, args || {});
		if (!(this.obj = $(this.opts.obj)).length) return;
		this.init();
	};
	win.AUGUST5PM[pluginName].prototype = {
		init: function() {
			this.setElements();
			this.setVars();
			this.setLayout();
			this.bindEvents();
			this.bindCallbackEvents();
			this.makeSwipe();
			this.getDataNewsList();
			this.getDataHighlightList();
		},
		// 엘리먼트 생성
		setElements: function () {
			this.container = $(this.opts.container);
			this.body = $(this.opts.body);
			this.obj = $(this.opts.obj);
			this.newsListCon = this.obj.find(this.opts.newsListCon);
			this.highlightListCon = this.obj.find(this.opts.highlightListCon);
			this.btnAppLink = this.obj.find(this.opts.btnAppLink);
		},
		// 변수 선언
		setVars: function(){
				this.MAX_NEWS_LIST = 4;
				this.MAX_HIGHLIGHT_LIST = 3;
		},
		setLayout: function(){
		
		},
		// 이벤트 등록
		bindEvents: function() {
		},
		// 콜백 이벤트
		bindCallbackEvents: function() {
			this.container.on(CustomEvents.SHOW_MENU, $.proxy(this.onShow_menu, this));
			this.container.on(CustomEvents.HIDE_MENU, $.proxy(this.onHide_menu, this));
			this.container.on(CustomEvents.CHANGE_BREAKPOINT, $.proxy(this.onChange_breakpoint, this));
			this.container.on(CustomEvents.RESIZE_START, $.proxy(this.onResize, this));
		},
		onChange_breakpoint: function() {
			this.makeSwipe();
		},
		onResize: function() {
			this.makeSwipeVisual();
		},
		makeSwipeVisual: function() {
			if (this.keyvisualSwiper !== undefined) {
				this.keyvisualSwiper.destroy();
			}
			const targetVisual = this.opts.mainVisual+' '+this.opts.swiperContainer;
			this.keyvisualSwiper  = new Swiper(targetVisual, {
				slidesPerView: 'auto',
				centeredSlides: true,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				navigation: {
					nextEl: targetVisual + ' .swiper-button-next',
					prevEl: targetVisual + ' .swiper-button-prev',
				},
				pagination: {
					el: targetVisual + ' .swiper-pagination',
					type: "fraction"
				}
			});
		},

		makeSwipeVoting: function() {
			// 투표부문
			if (this.votingSwiper !== undefined) {
				this.votingSwiper.destroy();
			}

			const targetVoting = this.opts.mainVoting+' '+this.opts.swiperContainer;
			const votingSpaceBetween = GlobalVars.isMobileWidth ? 12 : 20;
			const slidesOffsetBefore = GlobalVars.isMobileWidth ? 0 : 120;
			const slidesOffsetAfter = GlobalVars.isMobileWidth ? 0 : 120;
			this.votingSwiper  = new Swiper(targetVoting, {
				slidesPerView: 'auto',
				spaceBetween: votingSpaceBetween,
				freeMode: true,
				slidesOffsetBefore: slidesOffsetBefore,
				slidesOffsetAfter: slidesOffsetAfter
			});
		},
		makeSwipePartner: function() {
			if (this.partnerSwiper !== undefined) {
				this.partnerSwiper.destroy();
			}
			const targetPartner = this.opts.mainPartner+' '+this.opts.swiperContainer;
			const partnerSpaceBetween = GlobalVars.isMobileWidth ? 20 : 24;
			this.partnerSwiper = new Swiper(targetPartner, {
				slidesPerView: "auto",
				loop:true,
				autoplay: {
					delay: 0,
					disableOnInteraction: false
				},
				speed: 4000,
				spaceBetween: partnerSpaceBetween,
				touchRatio: 0,
				allowTouchMove: false
			}); 
		},
		// 스와이프 생성
		makeSwipe: function () {
			// 키비주얼
			this.makeSwipeVisual();

			// 투표부문
			this.makeSwipeVoting();

			// 파트너
			this.makeSwipePartner();
		},
		// 메뉴 보여주기
		onShow_menu: function() {
			
		},
		// 메뉴 감추기
		onShow_menu: function() {
			
		},
		// 뉴스 리스트 가져오기
		getDataNewsList: function() {
			const url = "/data/json/post_news/news_list.json";
			const params = {};
			UTILS.requestJsonData(url, params, $.proxy(this.onComplete_getDataNewsList, this));
		},
		// 뉴스 리스트 API 호출 완료
		onComplete_getDataNewsList: function(response) {
			this.setNewsList(response.content);
		},
		// 뉴스 리스트 생성
		setNewsList: function(content) {
			let ele = '';
			const len = content.length > this.MAX_NEWS_LIST ? this.MAX_NEWS_LIST : content.length;
			for (let i = 0; i < len; i++) {
				ele += this.getItemNewsList(content[i]);
			}
			this.newsListCon.html(ele);
		},
		// 뉴스 리스트 엘리먼트
		getItemNewsList: function(item) {
			let ele = `<li>
								<a href="${item.link}" target="_blank">
									<div class="img-holder">
										<img src="${item.img_url}" alt="">
									</div>
									<p class="tit">${item.title}</p>
								</a>
							</li>`;
			return ele;
		},
		// 하이라이트 리스트 API 호출
		getDataHighlightList: function() {
			const url = "/data/json/post_highlight/highlight_list.json";
			const params = {};
			UTILS.requestJsonData(url, params, $.proxy(this.onComplete_getDataHighlightList, this));
		},
		// 하이라이트 리스트 API 호출 완료
		onComplete_getDataHighlightList: function(response) {
			this.setHightlightList(response.content);
		},
		// 하이라이트 리스트 생성
		setHightlightList: function(content) {
			let ele = '';
			const len = content.length > this.MAX_HIGHLIGHT_LIST ? this.MAX_HIGHLIGHT_LIST : content.length;
			for (let i = 0; i < len; i++) {
				ele += this.getItemHighlightList(content[i]);
			}
			this.highlightListCon.html(ele);
		},
		// 하이라이트 엘리먼트
		getItemHighlightList: function(item) {
			let ele = `<li>
								<a href="${item.link}" target="_blank">
									<div class="img-holder">
										<img src="${item.img_url}" alt="">
									</div>
									<p class="tit">${item.title}</p>
								</a>
							</li>`;
			return ele;
		}
	};
	$(function () {
		new win.AUGUST5PM[pluginName]();
	});
})(window, window.jQuery);