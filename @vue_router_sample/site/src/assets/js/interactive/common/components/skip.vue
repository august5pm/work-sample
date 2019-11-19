
<!-- template -->
<template>
    <!-- @ Skip Nav -->
    <div id="skip-navi">
        <a href="#main-sb" @click="onClick_skip($event, '#main-sb')" ><span>본문 바로가기</span></a>
    </div>
</template>

<!-- script -->
<script>
    export default {

        data: function() {
            return {

            }
        },
        methods:{
            onClick_skip: function(e, link){
                e.preventDefault();
                var id = link;
                var target = document.querySelector(id);

                var isAble_focusin = target.hasAttribute("tabindex");
                if(!isAble_focusin) target.setAttribute("tabindex", "0");
                target.focus();
                if(!isAble_focusin) target.removeAttribute("tabindex");
            }
        }
    }
</script>
