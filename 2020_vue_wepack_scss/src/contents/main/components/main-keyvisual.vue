<template>
  <section class="gs-section main motion">
    <div class="inner">
      <button
        class="btn-popup"
        data-target="popup-youtube"
        data-youtube-id="fqI2DR860K8"
        @click="onClick_btnPopup"
      >PLAY</button>
      <button
        class="btn-popup"
        data-target="popup-youtube"
        data-youtube-id="NFtuHou-CyY"
        @click="onClick_btnPopup"
      >PLAY</button>
    </div>
  </section>
</template>

<script>
import { EventBus } from "../../common/event-bus";

export default {
  name: "main-keyvisual",
  props: {
    index: {
      type: Number,
      default: function() {
        return -1; // 기본값
      }
    }
  },
  data() {
    return {};
  },
  created() {
    this.addEvent();
  },
  mounted() {},
  methods: {
    addEvent: function() {
      EventBus.$on(EventBus.START_SLIDE, this.onStart_slide);
      EventBus.$on(EventBus.START_SLIDE, this.onEnd_slide);
    },
    onStart_slide: function(from, to) {},
    onEnd_slide: function(from, to) {},
    onClick_btnPopup: function(e) {
      var videoId = e.target.dataset.youtubeId;
      EventBus.$emit(EventBus.OPEN_POPUP_YOUTUBE, videoId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  background-color: gray;
}
</style>
