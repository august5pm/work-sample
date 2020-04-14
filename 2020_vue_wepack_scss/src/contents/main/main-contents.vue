<template>
  <div id="contents" class="contents" v-if="!isMobile">
    <component-main-keyvisual :index="0"></component-main-keyvisual>
    <component-main-world :index="1"></component-main-world>
    <component-main-character :index="2"></component-main-character>
    <component-main-weapon :index="3"></component-main-weapon>
    <component-main-media :index="4"></component-main-media>
  </div>
  <swiper
    v-else
    ref="mySwiper"
    :options="swiperOptions"
    @slideChangeTransitionStart="onStart_slide"
    @transitionEnd="onEnd_slide"
  >
    <component-main-keyvisual class="swiper-slide" :index="0"></component-main-keyvisual>
    <component-main-world class="swiper-slide" :index="1"></component-main-world>
    <component-main-character class="swiper-slide" :index="2"></component-main-character>
    <component-main-weapon class="swiper-slide" :index="3"></component-main-weapon>
    <component-main-media class="swiper-slide" :index="4"></component-main-media>
  </swiper>
</template>

<script>
import { EventBus } from "../common/event-bus";
import { isMobile } from "mobile-device-detect";
import axiosMixin from "../common/mixin/aixosMixin";

import mainKv from "./components/main-keyvisual";
import mainWorld from "./components/main-world";
import mainCharacter from "./components/main-character";
import mainWeapon from "./components/main-weapon";
import mainMedia from "./components/main-media";

export default {
  name: "main-contents",
  data() {
    return {
      isMobile: false,
      isTrans: false,
      currentSlide: 0,
      totalSlide: 0,
      contentsEle: null,
      slideTo: 0,
      slideFrom: 0,
      swiperOptions: {
        speed: 600,
        direction: "vertical",
        loop: false
      }
    };
  },
  computed: {
    swiper() {
      if (this.isMobile) {
        return this.$refs.mySwiper.$swiper;
      }
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {
    var htmlEle = document.querySelector("html");
    this.isMobile = AFP.libs.utils.hasClass(htmlEle, "mobile");
    this.contentsEle = document.querySelector(".contents");
    this.addEvent();
    this.setTotalSlide();
    this.getData();
  },
  destroyed() {},
  methods: {
    addEvent: function() {
      if (!this.isMobile) {
        this.contentsEle.addEventListener("wheel", this.onMouseWheelHandler);
      }
    },
    // 슬라이드 이동 시키기
    onMove_slide: function(index) {
      this.swiper.slideTo(index);
    },
    // 슬라이드 이동 시작 이벤트
    onStart_slide: function() {
      this.moveStartSet(this.swiper.activeIndex);
    },
    // 슬라이드 이동 끝 이벤트
    onEnd_slide: function() {
      this.moveComplete(this.swiper.activeIndex);
    },
    // 슬라이드 총 갯수
    setTotalSlide: function() {
      this.totalSlide = document.querySelectorAll(".gs-section").length;
    },
    // 마우스 휠 이벤트 핸들러
    onMouseWheelHandler: function(e) {
      if (this.isTrans) return;

      this.isTrans = true;
      var deltaY = e.deltaY;
      if (deltaY < 0) {
        this.prev();
      } else {
        this.next();
      }
    },
    // 이전 슬라이드
    prev: function() {
      var slide = this.currentSlide - 1;
      if (slide < 0) {
        slide = 0;
      }
      this.move(slide);
    },
    // 다음 슬라이드
    next: function() {
      var slide = this.currentSlide + 1;
      if (slide > this.totalSlide - 1) {
        slide = this.totalSlide - 1;
      }
      this.move(slide);
    },
    // 이동하기
    move: function(slide, isResize) {
      if (slide == this.currentSlide && (isResize == undefined || !isResize)) {
        this.isTrans = false;
        return;
      }

      var targetY = window.innerHeight * slide;
      var target = this.contentsEle;
      this.moveStartSet(slide);

      const { TweenLite, Cubic } = gsap;
      TweenLite.to(target, {
        duration: 0.8,
        top: -targetY,
        ease: Cubic.easeInOut,
        onComplete: this.moveComplete,
        onCompleteParams: [slide]
      });
    },
    // 이동 시작
    moveStartSet: function(slide) {
      this.slideFrom = this.currentSlide;
      this.slideTo = slide;
      EventBus.$emit(EventBus.START_SLIDE, this.slideFrom, this.slideTo);
    },
    // 이동 완료
    moveComplete: function(slide) {
      this.isTrans = false;
      EventBus.$emit(EventBus.END_SLIDE, this.slideFrom, this.slideTo);
      this.currentSlide = slide;
    },
    getData : function(){
        
        var url = './static/data/getData.json';
        var data = {'idx':1}

       this.requestPostJson(url, data);
    }
  },
  watch: {},
  components: {
    "component-main-keyvisual": mainKv,
    "component-main-world": mainWorld,
    "component-main-character": mainCharacter,
    "component-main-weapon": mainWeapon,
    "component-main-media": mainMedia
  },
  mixins:[axiosMixin]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contents {
  position: relative;
  height: 100%;
  .inner {
    height: 100%;
  }
  .gs-section {
    position: relative;
    height: 100%;
  }
}
</style>
