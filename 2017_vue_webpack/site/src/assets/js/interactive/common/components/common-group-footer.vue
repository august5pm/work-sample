<template>
    <footer>
        <div class="inner-wrap">
            <h1 class="blind">풋터 컨텐츠</h1>
            <component-footer-sns></component-footer-sns>
            <component-footer-copyright></component-footer-copyright>
        </div>
    </footer>
</template>
<script>

    import footer_sns from './footer-sns.vue'
    import footer_copyright from './footer-copyright.vue'

    export default {
        props: {
            footerdata: {
                type: Object,
                default: function () {
                    return {};
                }, // 기본값
            }
        },

        components : {
             "component-footer-sns": footer_sns
             ,"component-footer-copyright": footer_copyright
        }
    }
</script>
