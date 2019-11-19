<!-- template -->
<template>
    <transition name="tr-float-btn">
        <div class="float-btn-top" v-if="isShow">
            <div class="btn-wrap"> <!--활성화 클래스 on-->
                <button type="button" class="btn" @click.stop.prevent="onClick_btn()">
                    <span class="txt-box">
                        <span class="ico-arrow-top"><!--위 화살표--></span>
                        <span class="txt">TOP</span>
                    </span>
                </button>
            </div>
        </div>
    </transition>
</template>

<!-- script -->
<script>
    import {EventBus} from '../event-bus.js';
    import $ from 'jquery';

    export default {
        props: {
            index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            }
        },

        data: function () {
            return {
                winW: 0,
                winH: 0,
                scrollTop: '',
                scrollBottom: '',
                isTop: false,
                isBottom: false,
                bottom: 0,
                device: '',
                isShow: true,
                isFloat_Fixed: true,
                isOver_btnFloat: false,
                isStartedMotion: false,
                currentRouter: '',
                isStarted: true,
            }
        },

        created: function () {
            EventBus.$on(EventBus.SHOW_FLOAT_BTN, this.showFloatBtn);
            EventBus.$on(EventBus.HIDE_FLOAT_BTN, this.hideFloatBtn);
            EventBus.$on(EventBus.SHOW_PROFILE, this.isPopupOpen);
            EventBus.$on(EventBus.HIDE_PROFILE, this.isPopupClose);
            EventBus.$on(EventBus.AFTER_POPUP_OPENED, this.afterPopupOpened);

            clearTimeout(this.timerId);
        },

        mounted: function () {
            EventBus.$on(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$on(EventBus.CHANGE_RESIZE, this.onChange_resize);

            EventBus.$emit(EventBus.CONTENTS_UPDATED);
        },

        destroyed: function () {
            clearTimeout(this.timerId);

            EventBus.$off(EventBus.CHANGE_SCROLL, this.onChange_scroll);
            EventBus.$off(EventBus.CHANGE_RESIZE, this.onChange_resize);

            EventBus.$off(EventBus.SHOW_FLOAT_BTN, this.showFloatBtn);
            EventBus.$off(EventBus.HIDE_FLOAT_BTN, this.hideFloatBtn);

            EventBus.$off(EventBus.SHOW_PROFILE, this.isPopupOpen);
            EventBus.$off(EventBus.HIDE_PROFILE, this.isPopupClose);
            EventBus.$off(EventBus.AFTER_POPUP_OPENED, this.afterPopupOpened);
        },

        methods: {
            onClick_btn: function () {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            },

            showFloatBtn: function () {
                this.isShow = true;
            },
            hideFloatBtn: function () {
                this.isShow = false;
            },

            onChange_scroll: function (scrollTop) {
                this.scrollTop = scrollTop;
                this.scrollBottom = this.scrollTop + this.winH;
                let btnFloat = document.querySelector('.float-btn-top');

                if (window.GlobalVars.typeBrowser == window.GlobalVars.BROWSER_TYPE_MOBILE) {
                    // 모바일 일 경우
                } else {
                    // PC나 타블렛 일 경우
                    let target = document.querySelector('.footer-wrap');
                    let posTarget = target.offsetTop;

                    // 특정 높이에서 탑버튼 등장시키기
                    if (this.scrollBottom > this.winH + this.winH * 0.5) {
                        this.visibleFloatBtn();
                    } else {
                        this.hiddenFloatBtn();
                    }

                    // 브라우저의 바텀이 footer의 탑값에 도달할 경우 포지션 값 변경
                    if (this.scrollBottom >= posTarget) {
                        this.releaseFloatBtn();
                    } else {
                        this.fixFloatBtn();
                    }
                }
            },

            onChange_resize: function (w, h, device) {
                this.winW = w;
                this.winH = h;
            },

            isPopupOpen: function () {
                this.isShow = false;
            },

            isPopupClose: function () {
                this.isShow = true;
            },

            afterPopupOpened: function () {
            },

            fixFloatBtn: function () {
                window.DF.utils.removeClass(document.querySelector('.float-btn-top'), 'isSetMove');
            },

            releaseFloatBtn: function () {
                window.DF.utils.addClass(document.querySelector('.float-btn-top'), 'isSetMove');
            },

            hiddenFloatBtn: function () {
                window.DF.utils.removeClass(document.querySelector('.float-btn-top'), 'onShow');
            },

            visibleFloatBtn: function () {
                window.DF.utils.addClass(document.querySelector('.float-btn-top'), 'onShow');
            },
        },

        watch: {
            '$route'(to, from) {
            }
        }
    }
</script>
