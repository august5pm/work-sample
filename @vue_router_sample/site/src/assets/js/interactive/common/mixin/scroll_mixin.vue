<script>
    import Vue from 'vue';
    import $ from 'jquery';
    import {EventBus} from './../event-bus';
    import TWEEN from 'tween.js';

    export default {

        data: function () {
            return {
                motionList: [],
                timerId : 0
            }
            //motionList: []
        },
        created : function () {

        },
        mounted: function () {
            this.setting_scroll();


        },
        destroyed : function() {
            EventBus.$off(EventBus.CHANGE_SCROLL, this.scrollHandler);
        },
        methods: {
            setting_scroll : function () {
                clearTimeout(this.timerId);
                this.timerId  = setTimeout(() => {

                    //this.setMotionList();
                    this.scrollHandler(DF.utils.getScrollPosY());

                    EventBus.$on(EventBus.CHANGE_SCROLL, this.scrollHandler);

                } , 300);
            },
            reset_scroll : function() {
                this.motionList = [];
                this.setting_scroll();
            },
         /*   setMotionList : function(){
                this.motionList = $('.motion');


                //console.log('+++++++++++++++++++++++++++++++++++',this.motionList);
            },*/
            scrollHandler: function (sy) {
                this.motionList = $('.motion');
                var scrollBottom = sy + window.innerHeight;
                //console.log('>>>>>>>>>>>>>>>>>>>>>>>',scrollBottom,this.motionList)
                this.setElementScroll(this.motionList, scrollBottom);
            },
            setElementScroll: function (list, scrollBottom) {

                for (var i = 0; i < list.length; i++) {
                    this.setElementFocus($(list[i]), scrollBottom);
                }
            },
            setElementFocus: function (elem, scrollBottom) {

                var ty = elem.attr('motion-pos') ? elem.offset().top + (elem.height() * Number(elem.attr('motion-pos'))) : elem.offset().top + (elem.height() * 0.65);
                //console.log('>>>>>>>>>>>>>>>>>>>>>>>',scrollBottom,ty)
                if (scrollBottom > ty) {
                    if (!elem.hasClass('view-in')) {
                        elem.addClass('view-in');
                    }
                }
                if (scrollBottom < elem.offset().top) {
                    if (elem.hasClass('view-in')) {
                        elem.removeClass('view-in');
                    }

                }
            },
            checkElementFocus : function(evt,el){
                var scrollBottom = DF.utils.getScrollPosY() + window.innerHeight;
                this.setElementFocus($(el), scrollBottom);
            },
            getOffset: function (name) {
                return {top:$(name).offset().top,left:$(name).offset().left};
            },
            getValue : function(name){
                return {width:$(name).width(),height:$(name).height(),outerWidth:$(name).outerWidth(true),outerHeight:$(name).outerHeight(true)}
            },

            // smooth scrollmove - tween.js
            moveScroll: function (tgY, time, complete) {
                var curScrollY = DF.utils.getScrollPosY();

                var animationFrame;
                var isSameScrollY = (curScrollY == tgY) ? true : false;
                var moveTime = isSameScrollY ? 100 : time;

                function animate(moveTime) {
                    TWEEN.update(moveTime)
                    animationFrame = requestAnimationFrame(animate)
                }

                new TWEEN.Tween({tweeningNumber: curScrollY})
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .to({tweeningNumber: tgY}, moveTime)
                    .onUpdate(function () {
                        if (isSameScrollY) {
                            EventBus.$emit(EventBus.CHANGE_SCROLL, Math.floor(this.tweeningNumber));
                        } else {
                            window.scroll(0, Math.floor(this.tweeningNumber));
                        }
                    })
                    .onComplete(function () {
                        if (complete != undefined) complete();
                        cancelAnimationFrame(animationFrame);
                        animationFrame = null;
                    })
                    .start();

                animationFrame = requestAnimationFrame(animate);
            }
        }
    }
</script>

