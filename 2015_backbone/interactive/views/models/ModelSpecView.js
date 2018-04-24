App.Views.ModelSpecView = Backbone.View.extend({

    initialize : function(obj){
        this.modelSpecModel = obj.modelSpecModel;
        this.modelSpecTopItemsCollection = obj.modelSpecTopItemsCollection;
        this.modelSpecListCollection = obj.modelSpecListCollection;

        // spec top item
        this.specTopCon = $(".spec-list-0 .spec-tbl-wrap .tbl-spec-list-wrap");
        this.specTopItemLen = 0;
        this.addSpecTopItemCount = 0;

        // spec list
        this.specListCon = $(".spec-section .spec-list-wrap");
        this.specListLen = 0;
        this.addSpecListCount = 0;

        this.completeNum = 0;
    },

    render: function (){
        this.renderSpecTop();
        this.renderSpecList();
    },

    ////////////////////////////////////////////////////////////////////
    //  render spec top
    ////////////////////////////////////////////////////////////////////

    renderSpecTop : function(){
        this.specTopItemLen = this.modelSpecTopItemsCollection.models.length;
        this.setSpecTopCarImage();
        this.addAllSpecTopItem();
        this.addSpecTopInfoText();
    },

    // 스펙 상단 자동차 이미지
    setSpecTopCarImage : function(){
        // 이미지 경로
        var front_image_url  = this.modelSpecModel.attributes.front_image_url;
        var side_image_url  = this.modelSpecModel.attributes.side_image_url;
        var back_image_url  = this.modelSpecModel.attributes.back_image_url;

        // 알트 텍스트
        var front_alt_text  = this.modelSpecModel.attributes.front_alt_text;
        var side_alt_text  = this.modelSpecModel.attributes.side_alt_text;
        var back_alt_text  = this.modelSpecModel.attributes.back_alt_text;

        $("#spec-info-1 .spec-tbl-wrap .spec-img-holder .img-0 img").attr({"src":front_image_url, "alt":front_alt_text});  // 정면 이미지
        $("#spec-info-1 .spec-tbl-wrap .spec-img-holder .img-1 img").attr({"src":side_image_url, "alt":side_alt_text});    // 측면 이미지
        $("#spec-info-1 .spec-tbl-wrap .spec-img-holder .img-2 img").attr({"src":back_image_url, "alt":back_alt_text});    // 후면 이미지
    },

    addAllSpecTopItem : function(){
        this.modelSpecTopItemsCollection.forEach(this.addOneSpecTopItem, this);
    },

    // 스펙 탑 항목들 만들어주기
    addOneSpecTopItem : function($model){
        var specTopItemView = new App.Views.ModelSpecTopItemView({model:$model});

        this.specTopCon.append(specTopItemView.render().el.childNodes)
        this.addSpecTopItemList();
        this.addSpecTopItemCount++

        if(this.addSpecTopItemCount%2 == 0){
            // 짝수 항목은 오른쪽으로 정렬시켜주기
            $(".tbl-spec-list.tbl-type-0").eq(this.addSpecTopItemCount-1).addClass("noma-r");
        }

        // 스펙 탑 항목들이 모두 ADD가 완료되면
        if(this.specTopItemLen == this.addSpecTopItemCount){
            this.addOneComplete();
        }
    },

    // 스펙 탑 항목 내에 리스트 만들어 주기
    addSpecTopItemList : function(){
        var container = $(".tbl-spec-list.tbl-type-0:eq("+this.addSpecTopItemCount+") tbody");
        var len = this.modelSpecTopItemsCollection.models[this.addSpecTopItemCount].attributes.list.length;
        var i = 0;
        var template = "";

        for(i=0; i<len; i++){
            template += $('#template-spec-top-items-list').html();
        }
        container.append(template);
        this.setSpecTopItemListData(len, container);
    },

    // 스펙 탑 항목 리스트에 데이터 넣어주기
    setSpecTopItemListData : function($len, $container){
        var i = 0;

        for(i=0; i<$len; i++){
            var secTitle = this.modelSpecTopItemsCollection.models[this.addSpecTopItemCount].attributes.list[i].spec_title;
            var secContents = this.modelSpecTopItemsCollection.models[this.addSpecTopItemCount].attributes.list[i].spec_contents;

            $container.find("tr").eq(i).find("th").html(secTitle);
            $container.find("tr").eq(i).find("td").html(secContents);
        }
    },

    // 스펙 탑 인포 텍스트 만들어 주기
    addSpecTopInfoText : function(){
        var container = $(".spec-list-0 .spec-tbl-wrap .msg-info-spec");
        var len = this.modelSpecModel.attributes.info_text.length;
        var i=0;
        var template ="";

        for(i=0; i<len; i++){
            template += $('#template-spec-top-info-text').html();
        }
        container.append(template);
        this.setSpecTopInfoTextData(len, container);
    },

    // 스펙 탑 인포 텍스트 데이터 넣어주기
    setSpecTopInfoTextData : function($len, $container){
        var i=0;

        for(i=0; i<$len; i++){
            var detailText = this.modelSpecModel.attributes.info_text[i];
            $container.find("li").eq(i).find("span").html(detailText);
        }
    },


    ////////////////////////////////////////////////////////////////////
    //  render spec list
    ////////////////////////////////////////////////////////////////////

    renderSpecList : function(){
        this.specListLen = this.modelSpecListCollection.models.length;
        this.addAllSpecList();
    },

    addAllSpecList : function(){
        var i=0;
        for(i=0; i<this.specListLen; i++){
            this.addOneSpecList(i);
        }
    },

    addOneSpecList : function($idx){
        var title = this.modelSpecListCollection.models[$idx].attributes.title;
        var template = $('#template-spec-list').html();
        this.specListCon.append(template);

        // 타이틀 넣어주기
        var titleCon = $(".spec-section .spec-list-wrap dt:eq("+($idx+1)+") a .tit");
        titleCon.html(title);

        var captionCon = $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list caption");
        captionCon.html(title);

        // 리스트 아이디 넣어주기
        var listCon = $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+")")
        listCon.attr("id", "spec-info-"+($idx+2));

        this.addSpecListClass($idx);
        this.addSpecListContents($idx);
        this.addSpecListCount++

        // 스펙 리스트가 모두 ADD가 완료되면
        if(this.specListLen == this.addSpecListCount){
            this.addOneComplete();
        }
    },

    // 스펙 리스트의 클래스(자동차등급) 만들어주기
    addSpecListClass : function($idx){
        // dd 의 eq에 +1을 해준 이유는 spec top을 리스트와 별도로 생성했기 때문에 top이 0번째 리스트는 1번째 부터 시작함
        var classLen = this.modelSpecListCollection.models[$idx].attributes.class_long_text.length;
        var abbrInfoCon = $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .abbr-info");
        var classCon =  $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list .class-item");
        var colgroupCon = $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list colgroup");
        var abbrTemplate = "";
        var classTemplate = "";
        var colTemplate = $('#template-spec-list-col').html();
        var checkedTemplate = "";
        var i = 0;

        for(i=0; i<classLen; i++) {
            // abbr-info
            abbrTemplate += $('#template-spec-list-abbr-info').html();

            // class text
            classTemplate += $('#template-spec-list-class').html();

            // colgroup
            colTemplate += $('#template-spec-list-col').html();
        }


        abbrInfoCon.append(abbrTemplate);
        classCon.append(classTemplate);
        colgroupCon.append(colTemplate);
        this.setSpecListClassData($idx, classLen);
    },

    // 스펙 리스트의 클래스(자동차등급) 데이터 넣어주기
    setSpecListClassData : function($idx, $classLen){
        var i = 0;

        var colPer = (100-($classLen*10))+"%";
        $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list colgroup col").eq(0).attr("width", colPer);

        for(i=0; i<$classLen; i++){
            var classShortText = this.modelSpecListCollection.models[$idx].attributes.class_short_text[i];
            var classLongText = this.modelSpecListCollection.models[$idx].attributes.class_long_text[i];

            // abbr-info
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .abbr-info li:eq("+i+") b").html(classShortText);
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .abbr-info li:eq("+i+") span").html(" = "+classLongText);

            // class text
            // th의 eq에 +1을 해준 이유는 내용이라는 th가 기본적으로 있기 때문에 클래스(자동차등급)는 1번째 부터 시작함
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .class-item th:eq("+(i+1)+") em").eq(0).html(classShortText);
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .class-item th:eq("+(i+1)+") em").eq(1).html(classLongText);

            // colgroup 배분
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list colgroup col").eq(i+1).attr("width", "10%");

        }
    },

    // 스펙 리스트 컨텐츠 만들어주기
    addSpecListContents : function($idx){
        var contentsLen = this.modelSpecListCollection.models[$idx].attributes.items.length;
        var classLen = this.modelSpecListCollection.models[$idx].attributes.class_long_text.length;
        var contentsCon = $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list tbody");
        var checkedCon = "";
        var template = "";
        var i=0, j=0;

        for(i=0; i<contentsLen; i++){
            template += $("#template-spec-list-contents").html();
        }
        contentsCon.append(template);

//        console.log(contentsLen);
        for(i=0; i<contentsLen; i++){

            checkedCon="";
            for(j=0; j<classLen; j++){
                checkedCon += $("#template-spec-list-checked").html();
            }
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list tbody tr:eq("+i+")").append(checkedCon);
        }



        this.setSpecListContentsData($idx, contentsLen);
    },

    // 스펙 리스트 컨텐츠 데이터 넣어주기
    setSpecListContentsData : function($idx, $contentsLen){
        var allClassLen = this.modelSpecListCollection.models[$idx].attributes.class_long_text.length;
        var i= 0, j= 0, k=0;

        for(i=0; i<$contentsLen; i++){
            // 클래스(자동차 등급) 체크
            var currentContensClassLen = this.modelSpecListCollection.models[$idx].attributes.items[i].class_long_text.length;
            for(j=0; j<currentContensClassLen; j++){
                var currentContensClassText = this.modelSpecListCollection.models[$idx].attributes.items[i].class_long_text[j];
                for(k=0; k<allClassLen; k++){
                    var checkClassText = this.modelSpecListCollection.models[$idx].attributes.class_long_text[k];
                    if(currentContensClassText == checkClassText){
                        $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list tbody tr:eq("+i+") td:eq("+(k+1)+") span").removeClass("hide")
                    }
                }
            }

            // 컨텐츠 텍스트
            var contentsText = this.modelSpecListCollection.models[$idx].attributes.items[i].spec_title;
            $(".spec-section .spec-list-wrap dd:eq("+($idx+1)+") .tbl-spec-list tbody tr:eq("+i+") td:eq(0)").html(contentsText);
        }
    },

    addOneComplete : function(){
        this.completeNum++
        if(this.completeNum == 2){
            this.show();
        }
    },

    show : function(){
        this.addEvent();
    },

    showComplete : function(){

    },

    hide : function(){

    },

    hideComplete : function(){

    },

    addEvent : function(){
        $(".spec-section .spec-list-wrap dt a").on("click", this.onClick_specList)
    },

    removeEvent : function(){

    },

    onResize : function(){

    },

    onClick_specList : function(e){
        var index = $(this).parent().index()/2;
        var isShow =  !$(".spec-section .spec-list-wrap dd:eq("+index+")").hasClass("hide");
        var _this = App.modelSpecView;

        if(isShow){
            _this.hideSpecList(index);
        }else{
            _this.showSpecList(index);
        }

        App.modelView.onResize();
        return false;
    },

    showSpecList : function($idx){
        $(".spec-section .spec-list-wrap dt:eq("+$idx+")").addClass("on");
        $(".spec-section .spec-list-wrap dd:eq("+$idx+")").removeClass("hide")
    },

    hideSpecList : function($idx){
        $(".spec-section .spec-list-wrap dt:eq("+$idx+")").removeClass("on");
        $(".spec-section .spec-list-wrap dd:eq("+$idx+")").addClass("hide")
    }
});


////////////////////////////////////////////////////////////////////
//  Spec Top Item View
////////////////////////////////////////////////////////////////////

App.Views.ModelSpecTopItemView = Backbone.View.extend({
    template: _.template($('#template-spec-top-items').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});