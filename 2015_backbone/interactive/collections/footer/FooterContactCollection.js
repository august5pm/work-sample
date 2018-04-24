App.Collections.FooterCollection = Backbone.Collection.extend({
	url: '/asset/temp/data/footer_contact_data.json',
    parse: function( $data ) {
        return $data.contact;
    }
});