<template>
<div class="title-box clearfix">
    <div class="subject">{{itemdata.job}}<!--상품 기획 MD--></div>
    <ul class="clearfix">
        <li class="subject-info float-r">
            <ul class="info clearfix">
                <li class="form">
                    <strong>형태</strong>
                    <span>{{itemdata.type}}<!--상시--></span>
                </li>
                <li class="job-group">
                    <strong>직군</strong>
                    <span>{{itemdata.area}}<!--Business Development--></span>
                </li>
                <li class="target">
                    <strong>대상</strong>
                    <span>{{itemdata.condition}}<!--경력--></span>
                </li>
            </ul>
        </li>
        <li class="date float-l">{{itemdata.term}}<!--2018.10.11 - 2018.12.31--></li>
    </ul>
</div>
</template>

<script>

    export default {
        name: "careers-detail-table-header",
        props: {
            itemdata: {
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
