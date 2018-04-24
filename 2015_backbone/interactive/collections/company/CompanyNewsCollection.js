App.Collections.CompanyCollection = Backbone.Collection.extend({
    // parse: function( $data ) { return $data.company; }
    parse: function( $data ) {
        App.companyView.pageTotal = $data.company.pageTotal;
        App.companyView.pageIdx = $data.company.pageIdx;

        return $data.company.list;
    }
});