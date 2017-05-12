import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  actions: {
    iphoneQuery() {
      console.log("Querying ebay for iphone7...");
      return this.get('ajax').request('https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iphone7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=', {
        method: 'POST',
        dataType: "jsonp"
      }).then(result => {
        var resultsArray = result.findItemsByKeywordsResponse["0"].searchResult["0"].item;
        var averageprice = 0;
        for(var i = 0; i < resultsArray.length; i++)
        {
          averageprice += parseInt(resultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
        }
        const iphoneaverageprice = averageprice/resultsArray.length;
        console.log(iphoneaverageprice);
        this.store.createRecord('iphone', {averageprice: parseFloat(iphoneaverageprice)}).save();
        return iphoneaverageprice;
      });
    },

    galaxyQuery(){
      console.log("Querying ebay for galaxyS7...");
      return this.get('ajax').request('https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=Galaxy,S7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=', {
        method: 'POST',
        dataType: "jsonp"
      }).then(result => {
        var resultsArray = result.findItemsByKeywordsResponse["0"].searchResult["0"].item;
        var averageprice = 0;
        for(var i = 0; i < resultsArray.length; i++)
        {
          averageprice += parseInt(resultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
        }
        const galaxyaverageprice = averageprice/resultsArray.length;
        console.log(galaxyaverageprice);
        this.store.createRecord('galaxy', {averageprice: parseFloat(galaxyaverageprice)}).save();
        return galaxyaverageprice;
      });;
    },

    queryEbay() {
      let self = this
      Ember.run.later(function() {
        self.send('iphoneQuery');
        self.send('galaxyQuery');
      }, 5000);
    }
  }

});
