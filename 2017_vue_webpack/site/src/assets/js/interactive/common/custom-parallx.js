
/*

# basic_type
    - opacity 등장 기본 타잎
     + props(up, down, left, right , scaleup, scaledown, rotateleft, rotateright)
     + transition speed (slow, fast)
       : props, speed 하나 씩의 속성만 추가 가능

     ex)
     v-parallax-df="{'type':'basic_type', 'props':'bot, slow'}"

# single_type
    - 지정한 객체를 위한 커스텀 parallax
      : main_wide - 메인 와이드 배너 타잎
      : post_kv - post에서 최상단 키비쥬얼 이미지, 텍스트 트랜지션

    ex)
     v-parallax-df="{'type':'single_type', 'props':'post_kv'}"

# custom_type - parallax


*/



import { EventBus } from '../common/event-bus';


module.exports = {
    install(Vue) {

        Vue.directive('parallax-df', {
            bind (el, binding, vnode, oldVnode) {

                var type = binding.value.type;
                var props = binding.value.props;
                var value = binding.value.value;

                var detectClass = document.querySelector('html').className;
                var isMobile = detectClass.indexOf("mobile") == -1 ? false : true;
                var isIe9 = detectClass.indexOf("ie9") == -1 ? false : true;

                if(!isIe9)
                    init();

                //scroll 할시 트랜지션 시작시점
                var startScroll = isMobile ? 0.9 : 1.0;


                function init(){
                    EventBus.$on(EventBus.CHANGE_SCROLL ,scrollHandler);

                    if(type == "basic_type") {
                        DF.utils.addClass(el, "parallax-init")

                        if(props != undefined){

                            var propsArr= String(props).split(",");

                            for(var i=0 ; i<propsArr.length ; i++){
                                if(propsArr[i] == "up") {
                                    DF.utils.addClass(el, "init-up");
                                } else if(propsArr[i] == "down") {
                                    DF.utils.addClass(el, "init-down");
                                } else if(propsArr[i] == "left") {
                                    DF.utils.addClass(el, "init-left");
                                } else if(propsArr[i] == "right") {
                                    DF.utils.addClass(el, "init-right");
                                } else if(propsArr[i] == "scaleup") {
                                    DF.utils.addClass(el, "init-scale-up");
                                } else if(propsArr[i] == "scaledown") {
                                    DF.utils.addClass(el, "init-scale-down");
                                } else if(propsArr[i] == "rotateleft") {
                                    DF.utils.addClass(el, "init-rotate-left");
                                } else if(propsArr[i] == "rotateright") {
                                    DF.utils.addClass(el, "init-rotate-right");
                                }

                                if(propsArr[i] == "slow") {
                                    DF.utils.addClass(el, "init-speed-slow");
                                } else if(propsArr[i] == "fast") {
                                    DF.utils.addClass(el, "init-speed-fast");
                                }
                            }
                        }
                    } else if(type == "single_type") {
                        if(props != undefined){
                            props = String(props);
                            if(props == "concept-kv") {
                                DF.utils.addClass(el, "concept-kv-init");
                            } else if(props == "post-kv") {
                                DF.utils.addClass(el, "post-kv-init");
                            } else if(props== "main-wide-banner") {
                                DF.utils.addClass(el, "main-wide-banner-init");
                            }
                        }
                    } else if(type == "custom_type"){


                    }

                }


                function animateElement () {

                    let rect = el.getBoundingClientRect();
                    let per = rect.top/(window.innerHeight || document.documentElement.clientHeight);
                    var animationFrame;

                    if(per > 1) per = 1;
                    else if(per < 0) per=0;



                    if(type == "basic_type"){
                        //스크롤 할시 등장
                        if(per < startScroll){
                            DF.utils.addClass(el, "add-stage")
                        } else {
                            DF.utils.removeClass(el, "add-stage")
                        }

                    } else if(type == "single_type"){
                        if(props == "concept-kv") {
                            DF.utils.addClass(el, "add-stage")
                        } else if(props == "post-kv") {
                            DF.utils.addClass(el, "add-stage")
                        } else if(props == "main-wide-banner") {

                            if(per < startScroll){
                                DF.utils.addClass(el, "add-stage")
                            } else {
                                DF.utils.removeClass(el, "add-stage")
                            }


                        }
                    }


                }


                function scrollHandler () {
                    window.requestAnimationFrame(() => {
                        if (isInView(el)) {
                            animateElement()
                        } else {
                            // if(type == "basic_type"){
                                let rect = el.getBoundingClientRect();
                                let per = rect.top/(window.innerHeight || document.documentElement.clientHeight);
                                if(per > 1.4) DF.utils.removeClass(el, "add-stage");
                            // }

                        }
                    })
                }
                function isInView (el) {

                    let rect = el.getBoundingClientRect()
                    // console.log(rect)
                    return (
                        rect.bottom >= 0 &&
                        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.width != 0 && rect.height != 0
                    )
                }
            }

        });


    }
};
