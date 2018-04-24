<template>
    <header id="el_header">
        <div class="inner-wrap">
            <component-header-logo></component-header-logo>
            <component-header-navigation :navidata="this.navidata"></component-header-navigation>
        </div>
        <component-common-dimmed></component-common-dimmed>
    </header>
</template>
<script>
    import common_dimmed from './common-dimmed.vue'
    import header_logo from './header-logo.vue'
    import header_navigation from './header-navigation.vue'

    export default {
        props: {
            navidata: {
                type: Object,
                default: function () {
                    return {};
                }, // 기본값
            }
        },

        components : {
            "component-common-dimmed": common_dimmed
            ,"component-header-logo": header_logo
            ,"component-header-navigation": header_navigation
        }
    }
</script>
