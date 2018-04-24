App.Views.CompanyView = Backbone.View.extend({
    initialize: function( obj ) {
        this.imgUrl = '/asset/images/company/';
        this.container = $('.about').find('.inner-cont-wrap');
        this.onResize();
    },

    render: function() {

    },

    show: function() {
        this.addEvent();
        App.trigger( App.Events.RESIZE_BROWSER );
    },

    showComplete: function() {

    },

    hide: function() {

    },

    hideComplete: function() {

    },

    addEvent: function() {
        this.listenTo( App, App.Events.RESIZE_BROWSER, this.onResize );
    },

    removeEvent: function() {

    },

    onResize : function(){
        // console.log("company view resize");
        App.imgPrefixer( this );
    }
});