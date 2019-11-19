<template>
    <li class="board-heading">
        <ul>
            <li class="form">
                <strong>형태</strong>
            </li>
            <li class="field">
                <strong>모집분야</strong>
            </li>
            <li class="job-group">
                <strong>직군</strong>
            </li>
            <li class="target">
                <strong>대상</strong>
            </li>
        </ul>
    </li>
</template>

<script>

    export default {
        name: "careers-info-board-table-header",
        props: {
            infodata: {
                type: Object,
                default: function () {
                    return {};// 기본값
                }
            }
        },

        data: function () {
            return {

            }
        },


        beforeCreate: function () {

        },

        mounted: function () {

        },

        methods: {

        },

        components: {

        }
    }
</script>
