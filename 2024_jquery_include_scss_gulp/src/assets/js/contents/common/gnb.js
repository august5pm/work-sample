/**
 * gnb
 */
(function (win, $) {
	'use strict';
	win.AUGUST5PM = win.AUGUST5PM || {};
	var UTILS = win.AUGUST5PM.libs.utils,
		CustomEvents = win.AUGUST5PM.libs.customEvents,
		GlobalVars = win.AUGUST5PM.libs.globalVars,
		pluginName = 'headerGnb';
	win.AUGUST5PM[pluginName] = function (container, args) {
		if (!(this instanceof win.AUGUST5PM[pluginName])) {
			return new win.AUGUST5PM[pluginName](container, args);
		}
		var defParams = {
			container: '#container',
			body: 'body',
			obj: '.gnb-wrap',
			header: '.header',
			btnMenu: '.btn-menu',
			btnDepth2: '.btn-depth2',
			depth1: '.depth1',
			depth2: '.depth2',
			depth2Holder: '.depth2-holder',
			minHeightClass: 'is-min-height',
			showMenuClass: 'show-menu',
			activeClass: 'is-active',
		};
		this.opts = UTILS.def(defParams, args || {});
		if (!(this.obj = $(this.opts.obj)).length) return;
		this.init();
	};
	win.AUGUST5PM[pluginName].prototype = {
		init: function () {
			this.setElements();
			this.setVars();
			this.setLayout();
			this.bindEvents();
			this.bindCallbackEvents();
			this.onStart_resize();
		},
		// 엘리먼트 생성
		setElements: function () {
			this.container = $(this.opts.container);
			this.body = $(this.opts.body);
			this.obj = $(this.opts.obj);
			this.header = $(this.opts.header);
			this.btnMenu = this.header.find(this.opts.btnMenu);
			this.btnDepth2 = this.obj.find(this.opts.btnDepth2);
			this.depth2Holder = this.obj.find(this.opts.depth2Holder);
		},
		// 변수 선언
		setVars: function () {
			this.timer = 0;
			this.MIN_HEIGHT_MENU_MO = 640;
			this.MIN_HEIGHT_MENU_DESKTOP = 922;
			this.DEFAULT_HEIGHT_DEPTH2_MO = 30;
			this.DEFAULT_HEIGHT_DEPTH2_DESKTOP = 44;
		},
		// 레이아웃
		setLayout: function () {
			if (GlobalVars.OS === GlobalVars.OS_NAME_ANDROID) {
				// OS가 안드로이드 일 때
				this.body.addClass('is-android');
				if(GlobalVars.DEVICE_TYPE == GlobalVars.DEVICE_TYPE_TABLET){
					this.body.addClass('is-apad');
				}
			} else if (GlobalVars.OS === GlobalVars.OS_NAME_IOS) {
				// OS가 IOS 일 때
				this.body.addClass('is-ios');
				if(GlobalVars.DEVICE_TYPE == GlobalVars.DEVICE_TYPE_TABLET){
					this.body.addClass('is-ipad');
				}
			}
		},
		// 이벤트 등록
		bindEvents: function () {
			this.btnMenu.on('click', $.proxy(this.onClick_btnMenu, this));
			this.btnDepth2.on('mouseover', $.proxy(this.onOver_btnDepth2, this));
			this.btnDepth2.on('mouseout', $.proxy(this.onOut_btnDepth2, this));
			this.btnDepth2.on('click', $.proxy(this.onClick_btnDepth2, this));

			this.depth2Holder.on('mouseover', $.proxy(this.onOver_btnDepth2, this));
			this.depth2Holder.on('mouseout', $.proxy(this.onOut_btnDepth2, this));
		},
		// 콜백 이벤트
		bindCallbackEvents: function () {
			this.container.on(CustomEvents.RESIZE_START, $.proxy(this.onStart_resize, this));
			this.container.on(CustomEvents.CHANGE_BREAKPOINT, $.proxy(this.onChange_breakpoint, this));
		},
		// 리사이즈
		onStart_resize: function (e) {
			const winHeight = $(window).height();
			const isMinHeight = this.obj.hasClass(this.opts.minHeightClass);
			const minHeight = GlobalVars.isMobileWidth ? this.MIN_HEIGHT_MENU_MO : this.MIN_HEIGHT_MENU_DESKTOP;
			if (winHeight < minHeight) {
				if (!isMinHeight) {
					this.obj.addClass(this.opts.minHeightClass);
				}
			} else {
				if (isMinHeight) {
					this.obj.removeClass(this.opts.minHeightClass);
				}
			}
		},
		// DESKTOP, MOBILE 변경시
		onChange_breakpoint: function(e) {
			if (!GlobalVars.isMobileWidth) {
				const len = this.depth2Holder.length;
				for (let i = 0; i < len; i++){
					const depth2Holder = this.depth2Holder.eq(i);
					this.closeDepth2(depth2Holder, false);
					/* const isOpen = depth2Holder.hasClass(this.opts.activeClass);
					if (isOpen) {
						// 열려있는 상태라면 모드에 맞는 높이 값 재설정
						this.openDepth2(depth2Holder, false);
					} */
				}
			}
		},
		resetMenu: function() {
			const len = this.depth2Holder.length;
			for (let i = 0; i < len; i++){
				const depth2Holder = this.depth2Holder.eq(i);
				this.closeDepth2(depth2Holder, false);
			}
		},
		// 메뉴버튼 클릭시
		onClick_btnMenu: function(e) {
			const isShowMenu = this.body.hasClass(this.opts.showMenuClass);
			if (isShowMenu) {
				this.hideMenu();
			} else {
				this.resetMenu();
				this.showMenu();
				this.showTrans();
				this.onStart_resize();
			}
		},
		// 메뉴 보여주기
		showMenu: function() {
			this.body.addClass(this.opts.showMenuClass);
			this.obj.addClass(this.opts.activeClass);
			this.btnMenu.addClass(this.opts.activeClass);
			this.container.trigger(CustomEvents.SHOW_MENU);
		},
		// 메뉴 감추기
		hideMenu: function() {
			this.body.removeClass(this.opts.showMenuClass);
			this.obj.removeClass(this.opts.activeClass);
			this.btnMenu.removeClass(this.opts.activeClass);
			this.container.trigger(CustomEvents.HIDE_MENU);
		},
		// 보여주기 트랜지션
		showTrans: function() {
			const target = this.obj;
			gsap.killTweensOf(target);
			gsap.to(target, {
					duration: 0,
					opacity:0,
			});
			gsap.to(target, {
				duration: 0.4,
				opacity:1,
				ease: Cubic.easeOut
			});
		},
		onOver_btnDepth2: function(e) {
			if(!GlobalVars.isMobileWidth) {
				// PC 일때
				const target = $(e.currentTarget).closest(this.opts.depth1);
				const depth2Holder = $(target).find(this.opts.depth2Holder);
				this.openDepth2(depth2Holder, true);
			}
		},
		onOut_btnDepth2: function(e) {
			if(!GlobalVars.isMobileWidth) {
				// PC 일때
				const target = $(e.currentTarget).closest(this.opts.depth1);
				const depth2Holder = $(target).find(this.opts.depth2Holder);
				this.closeDepth2(depth2Holder, true);
			}
		},
		// 2뎁스 메뉴를 포함한 버튼 클릭시
		onClick_btnDepth2: function(e) {
			if(GlobalVars.isMobileWidth) {
				e.preventDefault();
				const target = $(e.currentTarget).closest(this.opts.depth1);
				this.checkOpenDepth2(target);
				return false;
			}
		},
		// 2뎁스 메뉴가 펼쳐져있는지 체크
		checkOpenDepth2: function(target) {
			const depth2Holder = $(target).find(this.opts.depth2Holder);
			const isOpen = depth2Holder.hasClass(this.opts.activeClass);
			if (isOpen) {
				this.closeDepth2(depth2Holder, true);
			} else  {
				this.openDepth2(depth2Holder, true);
			}
		},
		// 2뎁스 열어주기
		openDepth2: function(depth2Holder, isTrans) {
			depth2Holder.addClass(this.opts.activeClass);
			const menuLen = depth2Holder.find(this.opts.depth2).length;
			const defaultH = GlobalVars.isMobileWidth ? this.DEFAULT_HEIGHT_DEPTH2_MO : this.DEFAULT_HEIGHT_DEPTH2_DESKTOP;
			const targetH = defaultH * menuLen;
			const duration = isTrans ? 0.3 : 0;

			gsap.killTweensOf(depth2Holder);
			gsap.to(depth2Holder, {
				duration: duration,
				height: targetH,
				ease: Cubic.easeInOut
			});
		},
		// 2뎁스 닫아주기
		closeDepth2: function(depth2Holder, isTrans) {
			depth2Holder.removeClass(this.opts.activeClass);
			const duration = isTrans ? 0.3 : 0;
			gsap.killTweensOf(depth2Holder);
			gsap.to(depth2Holder, {
				duration: duration,
				height: 0,
				ease: Cubic.easeOut
			});
		}
	};
	$(function () {
		new win.AUGUST5PM[pluginName]();
	});
})(window, window.jQuery);