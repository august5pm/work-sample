<template>
  <section class="gs-section media motion">
    <div class="inner">
      <h2 class="title"><span class="hidden">Gran World</span></h2>
    </div>
  </section>
</template>

<script>
import { EventBus } from "../../common/event-bus";

export default {
  name: "main-media",
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
  methods: {
    addEvent: function() {
      EventBus.$on(EventBus.START_SLIDE, this.onStart_slide);
      EventBus.$on(EventBus.START_SLIDE, this.onEnd_slide);
    },
    onStart_slide: function(from, to) {},
    onEnd_slide: function(from, to) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.media {
  background-color: violet;
}
</style>
