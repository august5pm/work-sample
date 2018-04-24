
<!-- template -->
<template>
    <nav id="el_gnb" class="gnb" v-if="dataloaded"> <!--  @focusin="onFocusIn_nav()" @focusout="onFocusOut_nav()" -->
        <h1 class="blind">글로벌 네비게이션과 연관 콘텐츠</h1>

        <!-- 모바일 gnb버튼 -->
        <a href="#gnb-depth-1" class="btn-base btn-toggle-gnb" @click.stop.prevent=""><span>MODEL</span></a>

        <!-- 메인 메뉴 -->
        <h2 class="blind">글로벌 네비게이션</h2>
        <!--<div>{{ this.debugarea }}</div>-->
        <transition name="basic-fade" appear>

            <div class="depth-1-wrap">
                <transition name="navi-trans">
                    <ul id="gnb-depth-1" class="depth-1" >
                        <!-- models -->
                        <li>
                            <a href="#">
                                <span>메뉴1</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>메뉴2</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>메뉴3</span>
                            </a>
                        </li>
                    </ul>
                </transition>
            </div>
        </transition>
    </nav>
</template>


<!-- script -->
<script>

    import { EventBus } from '../event-bus.js';


    export default {

        //name
        name: 'header-navigation',

        computed : {

        },

        props: {
            navidata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        data: function() {
            return{
                dataloaded: false
            }
        },

        mounted: function() {
            EventBus.$on(EventBus.CHANGE_SCROLL ,this.scrollHandler);
        },


        methods : {
            scrollHandler: function(scrollTop){

            }
        },

        watch : {
            navidata : function(){
                this.dataloaded = true;
            }
        },

        //지역 component
        components :{

        }
    }
</script>

