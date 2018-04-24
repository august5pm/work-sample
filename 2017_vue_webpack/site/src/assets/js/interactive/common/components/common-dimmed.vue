<!-- template -->
<template>
    <transition name="fade-dim">
        <div class="overlay show" v-if="isShow" @click.stop.prevent="onClick_dim"></div>
    </transition>
</template>


<!-- script -->


<!--

uniquecode 값을 넘겨서 dimmed 제어

EventBus.$emit(EventBus.SHOW_DIMMED, "gnb-dimmed");
EventBus.$emit(EventBus.HIDE_DIMMED, "gnb-dimmed");

-->

<script>
    import {EventBus} from '../event-bus.js';

    export default {

        // gnb-dimmed - gnb등장시 dimmed

        props: {
            uniquecode: {
                type: String,
                default: function () {
                    return "dimmed";
                }, // 기본값
            }
        },

        data: function () {
            return {
                isShow: false
            }
        },

        mounted: function () {

            EventBus.$on(EventBus.SHOW_DIMMED, this.showDimmed);
            EventBus.$on(EventBus.HIDE_DIMMED, this.hideDimmed);
        },

        methods: {
            //add params url - common func
            showDimmed: function (code) {
                if (code == this.uniquecode) {
                    this.isShow = true;
                }

            },

            hideDimmed: function (code) {
                if (code == this.uniquecode) {
                    this.isShow = false;
                }
            },

            onClick_dim: function(){
//                console.log("cliock dimmmmm", this.uniquecode)
                EventBus.$emit(EventBus.CLICK_DIMMED, this.uniquecode);
            }
        }

    }
</script>

