<template>
    <li> <!-- col-2, col-3 -->
        <dl class="inp-duty-wrap">
            <dt><label for="form_duty">{{job_group+' - 지원 직군'}}</label></dt>
            <dd>
                <input type="text" id="form_duty" name="form_duty" title="지원 직무" placeholder="지원 직무" :value="job" class="inp-field type-fix-val" disabled> <!-- 확정된 값에 대한 추가 클래스 .type-fix-val -->
            </dd>
        </dl>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-job",
        props: {
            job: {
                type: String,
                default: function () {
                    return '';// 기본값
                }
            },

            job_group: {
                type: String,
                default: function () {
                    return '';// 기본값
                }
            },
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
