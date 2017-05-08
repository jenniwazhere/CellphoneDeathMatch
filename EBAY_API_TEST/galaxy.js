$(document).ready(function galaxyquery(){
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=Galaxy,S7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=";
$.ajax({
  url: url,
  dataType: "jsonp",
  success: function(results) {
    galaxyDataHandler(results);
  },
  error: function() {
    console.log("There was no returned value.")
  }
      });
})

function galaxyDataHandler(results) {
  var resultsArray = results.findItemsByKeywordsResponse[0].searchResult[0].item;
  var averageprice = 0;
  for(var i = 0; i < resultsArray.length; i++)
  {
    averageprice += parseInt(resultsArray[i].sellingStatus["0"].currentPrice["0"].__value__);
  }
  galaxyimageurl = resultsArray["0"].galleryURL["0"];
  iphoneaverageprice = averageprice/resultsArray.length;
  console.log(galaxyimageurl,galaxyaverageprice);
}