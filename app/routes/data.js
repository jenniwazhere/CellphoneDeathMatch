var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var iphonedata = iphonequery();
    var galaxydata = galaxyquery();

    let matchrecord = this.store.createRecord('iphone', {
      iphoneimageurl: iphonedata['image'],
      iphoneaverageprice: iphonedata['average'],
      galaxyimageurl: galaxydata['image'],
      galaxyaverageprice: galaxydata['average']
    })
    console.log(matchrecord.get('iphoneimageurl'), matchrecord.get('iphoneaverageprice'), matchrecord.get('galaxyimageurl'), matchrecord.get('galaxyaverageprice'));
    return [matchrecord];
  }
});

function iphonequery(){
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iphone7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=";
Ember.$.ajax({
  url: url,
  dataType: "jsonp",
  success: function(results) {
    return iphoneDataHandler(results);
  },
  error: function() {
    console.log("There was no returned value.")
  }
      });
}


function iphoneDataHandler(results) {
  var resultsArray = results.findItemsByKeywordsResponse[0].searchResult[0].item;
  var averageprice = 0;
  for(var i = 0; i < resultsArray.length; i++)
  {
    averageprice += parseInt(resultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
  }
var iphoneimageurl = resultsArray["0"].galleryURL["0"];
var iphoneaverageprice = averageprice/resultsArray.length;
var iphonedata = {'image': iphoneimageurl,
'average': iphoneaverageprice};
return iphonedata;
}

function galaxyquery(){
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=Galaxy,S7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=";
Ember.$.ajax({
  url: url,
  dataType: "jsonp",
  success: function(results) {
    return galaxyDataHandler(results);
  },
  error: function() {
    console.log("There was no returned value.")
  }
      });
}

function galaxyDataHandler(results) {
  var resultsArray = results.findItemsByKeywordsResponse[0].searchResult[0].item;
  var averageprice = 0;
  for(var i = 0; i < resultsArray.length; i++)
  {
    averageprice += parseInt(resultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
  }
  var galaxyimageurl = resultsArray["0"].galleryURL["0"];
  var galaxyaverageprice = averageprice/resultsArray.length;
  var galaxydata = {'image': galaxyimageurl,
'average': galaxyaverageprice};
  return galaxydata;
}
