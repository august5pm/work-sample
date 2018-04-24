App.Views.ModelServiceCenterView = Backbone.View.extend({

    initialize : function(obj){
        this.modelTestDriveModel = obj.modelTestDriveModel;

        this.imgCon = $("#model-pg6 .test-drive .checkzone .center-location .map-center #map-area img");
        this.titleCon = $("#model-pg6 .test-drive .checkzone .center-location .center-name");
        this.addressCon = $("#model-pg6 .test-drive .checkzone .center-location .location-wrap tbody tr:eq(0) td p");
        this.telCon = $("#model-pg6 .test-drive .checkzone .center-location .location-wrap tbody tr:eq(1) td a");
        this.faxCon = $("#model-pg6 .test-drive .checkzone .center-location .location-wrap tbody tr:eq(2) td");
        this.webCon = $("#model-pg6 .test-drive .checkzone .center-location .location-wrap tbody tr:eq(3) td a");
        this.btnMap = $("#model-pg6 .test-drive .checkzone .center-location .map-center a");
        this.mapTopLine = $("#model-pg6 .test-drive .checkzone span.hline")

        this.DEFAULT_IMG_SRC = this.imgCon.attr("data-default-src");
        this.DEFAULT_TITLE = "¿¸Ω√¿Â";

        this.setDefault();
    },

    setData : function($locationIdx, $branchIdx){
        var imgSrc = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].image_url;
        var title = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].branch+" "+this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].type;
        var address = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].address;
        var tel = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].tel;
        var fax = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].fax;
        var web = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].web;
        var mapUrl = this.modelTestDriveModel.attributes.service_center[$locationIdx][$branchIdx].map_url;

        this.imgCon.attr("src", imgSrc);
        this.titleCon.html(title);
        this.addressCon.html(address);
        this.telCon.css("display", "block").html(tel);
        this.telCon.attr("href", "tel:"+tel);
        this.faxCon.html(fax);
        this.webCon.css("display", "block").html(web).attr("href", web);
        this.btnMap.attr("href", mapUrl).attr("onclick","").removeClass("hide");
        this.mapTopLine.css("background", "#000");
    },

    setDefault : function(){
        this.imgCon.attr("src", this.DEFAULT_IMG_SRC);
        this.mapTopLine.css("background", "none");
        this.titleCon.html(this.DEFAULT_TITLE);
        this.addressCon.html("");
        this.telCon.html("").css("display", "none");
        this.faxCon.html("");
        this.webCon.html("").css("display", "none");
        this.btnMap.attr("href", "#").attr("onclick","return false").addClass("hide");
    }
});