<template>
    <li class="type-add-file">
        <dl class="add-file-wrap">
            <dt v-bind:class="{blind: !isTitle}"><label :for="'input-file-'+index">파일 첨부</label></dt>
            <dd>
                <input type="text" :value="fileName" :placeholder="placeholder" class="inp-field inp-file-name" disabled>
                <label :for="'input-file-'+index" class="btn-cta btn-add-file"><span>파일 선택</span></label>
                <input type="file" :id="'input-file-'+index" accept=".zip, .doc, .docx, .ppt, .pptx, .pdf, .hwp " @change="onChange_file">
            </dd>
        </dl>
        <span class="add-desc" v-if="isNote">* 첨부파일은 10MB 이하의 파일로 선택해주세요.</span>
        <span class="file-spec" v-if="isNote">* 허용 확장자 : zip, doc, docx, ppt, pptx, pdf, hwp</span>
        <p class="alert-holder" :class="isError_name?'on':''">필수 입력 정보입니다.</p>
    </li>
</template>

<script>
    import { EventBus } from '../../../../interactive/common/event-bus.js';

    export default {
        name: "form-file",
        props: {
            index: {
                type: Number,
                default: function () {
                    return -1;// 기본값
                }
            },
            isTitle: {
                type: Boolean,
                default: function () {
                    return false;// 기본값
                }
            },
            isNote: {
                type: Boolean,
                default: function () {
                    return -1;// 기본값
                }
            },
            placeholder :{
                type:String,
                default : function(){
                    return ''
                }
            },
            isValidation : {
                type:Boolean,
                default:function(){
                    return false;
                }
            }
        },

        data: function () {
            return {
                isLoading : false,
                fileName : '',
                isFile : false,
                isError_name:false
            }
        },

        beforeCreate: function () {

        },

        created : function(){
            EventBus.$on(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$on(EventBus.RESET_FORM, this.onReset_form);
        },

        mounted: function () {
            console.log('---->' + this.isTitle);
        },

        destroyed : function(){
            EventBus.$off(EventBus.CHECK_VALIDATION, this.onCheck_validation);
            EventBus.$off(EventBus.RESET_FORM, this.onReset_form);
        },

        methods: {
            // 폼 초기화
            onReset_form : function(){
                this.isFile = false;
                this.fileName = "";
                var id = 'input-file-'+this.index;
                document.getElementById(id).value = "";
                this.isError_name = false;
            },

            // 파일 변경시
            onChange_file : function(){
                this.isFile = false;
                this.showFileSize();
            },

            // 파일 용량 체크
            showFileSize : function() {
                var input, file;

                // (Can't use `typeof FileReader === "function"` because apparently
                // it comes back as "object" on some browsers. So just see if it's there
                // at all.)
                if (!window.FileReader) {
                    console.log("The file API isn't supported on this browser yet.");
                    return;
                }

                var id = 'input-file-'+this.index;
                input = document.getElementById(id);
                if (!input) {
                    console.log("Um, couldn't find the fileinput element.");
                }
                else if (!input.files) {
                    console.log("This browser doesn't seem to support the `files` property of file inputs.");
                }
                else if (!input.files[0]) {
                    console.log("Please select a file before clicking 'Load'");
                }
                else {
                    file = input.files[0];

                    var fileSize = (file.size/1024/1024);
                    if(fileSize > 10){
                        alert('첨부파일은 10MB 이하의 파일로 선택해주세요.');
                        input.value = '';x
                        this.fileName = "";
                    }else{
                        this.fileName = file.name;
                        this.isFile = true;
                    }
                }
            },


            // 밸리데이션 체크
            onCheck_validation : function(){
                if(this.isFile){
                    var id = 'input-file-'+this.index;
                    var input = document.getElementById(id);
                    var file = input.files[0];

                    this.isError_name = false;
                    EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, file);
                }else{
                    if(this.isValidation) {
                        this.isError_name = true;
                        EventBus.$emit(EventBus.CHECK_ERROR, this.index);
                    }else{
                        EventBus.$emit(EventBus.CHECK_VALIDATION_COMPLETE, this.index, null);
                    }

                }
            }
        },

        components: {

        },
    }
</script>
