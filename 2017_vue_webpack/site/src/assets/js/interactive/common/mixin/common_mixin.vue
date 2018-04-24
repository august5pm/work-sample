<script>
    import Vue from 'vue';
    import {AppConsts} from '../../../frame/AppConsts'
    import TWEEN from 'tween.js';
    import {EventBus} from './../event-bus';

    export default {
        created: function () {
            //console.log('mixin hook called')
        },

        methods: {
            addParamsUrl: function (url) {
                if(url == undefined || url =="") return "#";
                else{
                    return window.GlobalVars.addParamsUrl(url);
                }
            },

            getLinkTarget:function(target_style){
                var _target = target_style;
                if(_target == undefined || _target == "") _target = "_self";
                return _target;
            },

            getLinkTitle : function(target, title){

                var link_title;
                if(target == "_blank"){
                    link_title = AppConsts.MSG.OPEN_NEW_WINDOW;
                }else if(title){
                    link_title = title.replace(/\<br>/g,'');
                }else{
                    link_title = ""
                }
                return link_title;
            },

            getImgUrl : function(img_1x, img_2x, img_m){
                if(img_2x == undefined || img_2x == "") img_2x = img_1x;
                var img_url = (window.GlobalVars.device.isHighDPI)?img_2x:img_1x;
                if(window.GlobalVars.isMobile && img_m != undefined && img_m != "") img_url = img_m;

                return img_url
            },

            getType_lang: function (lang_type) {
                var type_str = "global";
                if (lang_type == "en") type_str = "lang-en";
                else if (lang_type == "ko") type_str = "lang-ko";
                return type_str;
            },


            // smooth scrollmove - tween.js
            moveScroll: function(tgY, time, complete){
                var curScrollY = DF.utils.getScrollPosY();

                var animationFrame;
                var isSameScrollY = (curScrollY == tgY) ? true : false;
                var moveTime = isSameScrollY ? 100 : time;

                function animate (moveTime) {
                    TWEEN.update(moveTime)
                    animationFrame = requestAnimationFrame(animate)
                }
                new TWEEN.Tween({ tweeningNumber: curScrollY})
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .to({ tweeningNumber: tgY }, moveTime)
                    .onUpdate(function () {
                        if(isSameScrollY){
                            EventBus.$emit(EventBus.CHANGE_SCROLL, Math.floor(this.tweeningNumber));
                        } else {
                            window.scroll(0, Math.floor(this.tweeningNumber));
                        }
                    })
                    .onComplete(function () {
                        if(complete != undefined) complete();
                        cancelAnimationFrame(animationFrame);
                        animationFrame = null;
                    })
                    .start();

                animationFrame = requestAnimationFrame(animate);
            },
        }
    }
</script>


<!--
    import mixin from "./../common/mixin/common_mixin.vue"
    mixins: [mixin]
-->
