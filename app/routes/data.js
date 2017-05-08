import Ember from 'ember';
window.iphoneresult = [];
window.galaxyresult = [];

// IPHONE AJAX QUERY DEFINITION
function iphonequery(iphonecallback){
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iphone7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=";
  Ember.$.ajax({
  async: false,
  url: url,
  dataType: "jsonp",
  success: function(iphoneresults) {
    iphonecallback(iphoneresults);
    return;
  },
  error: function() {
    console.log("There was no returned value.");
  },
  complete: function() {
    console.log("iphone request is done");
    console.log(iphoneresult);
  }
      }).done(function () {
        return;
      });
}

// GALAXY AJAX QUERY DEFINITION
function galaxyquery(galaxycallback){
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=Galaxy,S7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=";
  Ember.$.ajax({
  async: false,
  url: url,
  dataType: "jsonp",
  success: function(galaxyresults) {
    galaxycallback(galaxyresults);
    return;
  },
  error: function() {
    console.log("There was no returned value.");
  },
  complete: function() {
    console.log("galaxy request is done");
    console.log(galaxyresult);
  }
      }).done(function () {
        return;
      });
}

console.log('does this go first?');

// CALLING IPHONE QUERY WITH IPHONEDATAHANDLER AS THE CALLBACK THAT PARSES JSON RESULT
iphonequery(function iphoneDataHandler(results) {
  var resultsArray = results.findItemsByKeywordsResponse[0].searchResult[0].item;
  var averageprice = 0;
  for(var i = 0; i < resultsArray.length; i++)
  {
    averageprice += parseInt(resultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
  }
var iphoneimageurl = resultsArray["0"].galleryURL["0"];
var iphoneaverageprice = averageprice/resultsArray.length;
var iphonearray = [iphoneimageurl, iphoneaverageprice];
window.iphoneresult[0] = iphonearray[0];
window.iphoneresult[1] = iphonearray[1];
});

// CALLING GALAXY QUERY WITH GALAXYDATAHANDLER AS THE CALLBACK THAT PARSES JSON RESULT
galaxyquery(function galaxyDataHandler(galaxyresults) {
  var galaxyResultsArray = galaxyresults.findItemsByKeywordsResponse[0].searchResult[0].item;
  var galaxyaverageprice = 0;
  for(var i = 0; i < galaxyResultsArray.length; i++)
  {
    galaxyaverageprice += parseInt(galaxyResultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
  }
  var galaxyimageurl = galaxyResultsArray["0"].galleryURL["0"];
  var galaxyaverageprice = galaxyaverageprice/galaxyResultsArray.length;
  var galaxyarray = [galaxyimageurl, galaxyaverageprice];
  window.galaxyresult[0] = galaxyarray[0];
  window.galaxyresult[1] = galaxyarray[1];
});

export default Ember.Route.extend({
  model() {
    console.log(window.iphoneresult);
    console.log(window.galaxyresult);

    let galaxyrecord = this.store.createRecord('galaxy', {
      galaxyimageurl: galaxyresult[0],
      galaxyaverageprice: galaxyresult[1]
    });
    let iphonerecord = this.store.createRecord('iphone', {
      iphoneimageurl: iphoneresult[0],
      iphoneaverageprice: iphoneresult[1]
    });
    return [iphonerecord, galaxyrecord];
  }
});
