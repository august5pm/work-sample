<template>
  <section class="gs-section world motion">
    <div class="inner">
      <h2 class="title">
        <span class="hidden">World</span>
      </h2>
      <button class="btn-popup" data-target="popup-world">WORLD POPUP</button>
      <div class="story">
        <video
          muted
          loop
          preload="none"
          class="gs-video"
          id="world-video"
          poster="../../../assets/images/desktop/world/img_world01.jpg"
        >
          <source
            src="../../../assets/video/video_world01.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  </section>
</template>

<script>
import { EventBus } from "../../common/event-bus";

export default {
  name: "main-world",
  props: {
    index: {
      type: Number,
      default: function() {
        return -1; // 기본값
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  created() {
    this.addEvent();
  },
  mounted() {
    this.player = document.getElementById("world-video");
  },
  methods: {
    addEvent: function() {
      EventBus.$on(EventBus.START_SLIDE, this.onStart_slide);
      EventBus.$on(EventBus.START_SLIDE, this.onEnd_slide);
    },
    onStart_slide: function(from, to) {},
    onEnd_slide: function(from, to) {
      if (this.index == to) {
        this.play();
      } else if (this.index == from) {
        this.pause();
        this.reset();
      }
    },
    play: function() {
      this.player.play();
    },
    pause: function() {
      this.player.pause();
    },
    reset: function() {
      this.player.currentTime = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.world {
  background-color: green;
  .inner {
    height: 100%;
    min-height: 900px;
    button {
      position: absolute;
      z-index: 30;
    }
    .story {
      position: absolute;
      height: 100%;
      .gs-video {
        width: 100%;
        top: 0;
        left: 0;
      }
    }
  }
}
.mobile {
  .world {
    .inner {
      min-height: 100vh;
      .story {
        .gs-video {
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
