<template>
  <div id="app" class="app">
    <div class="wrapper">
      <!--[D] HEADER -->
      <component-header></component-header>
      <router-view />
    </div>
    <component-popup-youtube></component-popup-youtube>
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import compHeader from "./contents/common/component/header-contents";
import popupYoutube from "./contents/popup/popup-youtube";
export default {
  name: "App",
  created() {
    if (isMobile) {
      var ele = document.querySelector("html");
      NPIXEL.libs.utils.addClass(ele, "mobile");
    }
  },
  mounted() {},
  components: {
    "component-header": compHeader,
    "component-popup-youtube": popupYoutube
  }
};
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .popup {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    &.open {
      display: block;
    }
    .inner {
      position: relative;
      text-align: center;
      height: 100%;
      font-size: 0;
      .dimmed {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #000;
        opacity: 0.8;
      }
      &::before {
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .container {
        display: inline-block;
        position: relative;
        background-color: gray;
        vertical-align: middle;
      }
    }
  }
}
.mobile {
  .app {
    .popup {
      .container {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 56.25vw;
        background-color: gray;
        vertical-align: middle;
      }
    }
  }
}
</style>
