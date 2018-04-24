
<!-- template -->
<template>
    <div>
        <h2 class="blind">SNS</h2>
        <ul>
            <li><a href="#" class="tag-label icon-facebook circle"><em>페이스북</em></a></li>
            <li><a href="#" class="tag-label icon-instagram circle"><em>트위터</em></a></li>
            <li><a href="#" class="tag-label icon-instagram circle"><em>인스타그램</em></a></li>
            <li><a href="#" class="tag-label icon-youtube circle"><em>유투브</em></a></li>

            <!--<li v-for="item in footerdata.sns.lists"><a :href="item.link" :target="item.target" :class="['tag-label', item.icon_class, 'circle']" @click="onClick(item.tracking_event)"><em>{{item.text}}</em></a></li>-->
        </ul>
    </div>
</template>


<!-- script -->
<script>
    export default {
        name: 'footer-sns',

        props: {
            footerdata: {
                type: Object,
                default: function() { return {}; }, // 기본값
            }
        },

        data: function() {
            return{

            }
        },

        methods : {
            onClick : function(){

            }
        }
    }
</script>




