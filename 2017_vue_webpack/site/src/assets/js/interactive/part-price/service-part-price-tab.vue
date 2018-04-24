
<!-- template -->
<template>
    <div class="content-top has-tab-menu">
        <h1 class="pg-title">
            <span>고객서비스</span>
        </h1>

        <!-- 페이지 네비게이션 -->
        <nav class="pg-tab-menu-list">
            <ul class="menu">
                <li><a :href="addParamsUrl('/service/')"><span>서비스</span></a></li>
                <li><a :href="addParamsUrl('/service/service-program/')"><span>서비스 프로그램</span></a></li>
                <li><a :href="addParamsUrl('/service/service-center/')"><span>서비스 센터</span></a></li>
                <li><a :href="addParamsUrl('/service/custome-center/')"><span>고객 지원실</span></a></li>
                <li><a :href="addParamsUrl('/service/part-price/')" class="on"><span>부품 및 취급 정보</span></a></li>
            </ul>
        </nav>
    </div>
</template>


<!-- script -->
<script>
    import { EventBus } from '../../common/event-bus.js';

    export default {

        props: {
            contentsdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        data: function() {
            return {
                selectedIndex : 0,
                isMobile : false
            }
        },

        beforeMount : function() {
            this.isMobile = window.GlobalVars.isMobile;

        },

        methods:{
            //add params url - common func
            addParamsUrl: function (url) {
                var _url = window.GlobalVars.addParamsUrl(url);
                return _url;
            }
        },

        watch : {

        }
    }
</script>











