<template>
  <div
    class="popup popup-youtube"
    :class="isOpen ? 'open' : ''"
    id="popup-youtube"
  >
    <div class="inner">
      <span class="dimmed" @click="onClose_popup"></span>
      <div class="container" v-show="isPlay">
        <!-- youtube player add -->
        <youtube
          ref="youtube"
          :video-id="this.videoId"
          :player-vars="playerVars"
          :width="playerWidth"
          :height="playerHeight"
        ></youtube>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../common/event-bus";

export default {
  name: "popup-youtube",
  data() {
    return {
      isMobile: false,
      videoId: null,
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        rel: 0
      },
      youtubeIndex: -1,
      youtubeData: {},
      youtubeList: [],
      currentIndex: -1,
      playerWidth: 0,
      playerHeight: 0,
      isOpen: false,
      isPlay: false
    };
  },
  beforeCreate() {},
  created() {
    EventBus.$on(EventBus.OPEN_POPUP_YOUTUBE, this.onOpen_popup);
    EventBus.$on(EventBus.CLOSE_POPUP_YOUTUBE, this.onClose_popup);
  },
  mounted() {
    var ele = document.querySelector("html");
    this.isMobile = NPIXEL.libs.utils.hasClass(ele, "mobile");
    this.setSize();
  },
  destroyed() {},
  methods: {
    setSize: function() {
      if (this.isMobile) {
        this.playerWidth = "100%";
        this.playerHeight = "100%";
      } else {
        this.playerWidth = "1280px";
        this.playerHeight = "720px";
      }
    },
    onOpen_popup: function(videoId) {
      this.open(videoId);
    },
    onClose_popup: function(e) {
      this.close();
    },
    open: function(videoId) {
      if (!this.isOpen) {
        this.isOpen = true;
        this.load(videoId);
      }
    },
    close: function() {
      if (this.isOpen) {
        this.pause();
        this.videoId = null;
        this.isOpen = false;
        this.isPlay = false;
      }
    },
    load: function(videoId) {
      this.videoId = videoId;
      setTimeout(this.play, 200);
    },
    play: function() {
      this.isPlay = true;
    },
    pause: function() {
      this.$refs.youtube.player.pauseVideo();
    }
  },
  watch: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.youtube-player {
  display: none;
  &.play {
    display: block;
  }
}
</style>
