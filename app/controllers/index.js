import Ember from 'ember';
var iphoneprice = '739';
var galaxyprice = '439';
export default Ember.Controller.extend({
  ajax: Ember.inject.service(),


  init: function() {
      this.send("queryEbay");
  },

  actions: {

    iphoneQuery() {
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
        iphoneprice = iphoneaverageprice;
        this.store.createRecord('iphone', {averageprice: parseFloat(iphoneaverageprice)}).save();
        return iphoneaverageprice;
      });

    },

    galaxyQuery(){
      var yup = this.get('ajax').request('https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BrianNuc-Cellphon-PRD-f69e2c47f-23e2c69e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=Galaxy,S7&paginationInput.entriesPerPage=100&GLOBAL-ID=EBAY-US&siteid=0type=', {
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
        galaxyprice = galaxyaverageprice;
        this.store.createRecord('galaxy', {averageprice: parseFloat(galaxyaverageprice)}).save();
        this.set("averageprice", parseFloat(galaxyaverageprice))
        return galaxyaverageprice;
      });
    },

    myChart(){
      console.log("Galaxy Price: " + galaxyprice);
      console.log("Iphone Price: " + iphoneprice);
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'line',
          responsive: true,
          maintainAspectRatio: false,
          data: {
            labels: ["March 2016", "April 2016", "May 2016", "June 2016", "July 2016", "August 2016",
             "September 2016", "October 2016", "November 2016", "December 2016", "January 2017", "February 2017", "March 2017", "April 2017", "May 2017"],
       datasets: [
         {
           label: "Samsung Galaxy S7 - 32GB",
           backgroundColor: "rgba(220,220,220,0.5)",
           fillColor : "rgba(220,220,220,0.5)",
       strokeColor : "rgba(220,220,220,1)",
       pointColor : "rgba(220,220,220,1)",
       pointStrokeColor : "#419CF1",
       data : [659,869,650,595,620,600,565,555,535,635,600,378,500,479,galaxyprice]
         },
         {
           label: "Apple iPhone 7 - 128GB",
           backgroundColor: "rgba(151,187,205,0.5)",
           fillColor : "rgba(151,187,205,0.5)",
       strokeColor : "rgba(151,187,205,1)",
       pointColor : "rgba(151,187,205,1)",
       pointStrokeColor : "#fff",
       data : [0,0,0,0,0,0,1250,898,840,900,589,700,725,739,iphoneprice]
         }
       ],

          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
    },

    queryEbay() {
        this.send('iphoneQuery');
        this.send('galaxyQuery');
        this.send('myChart');
        let self = this;
        Ember.run.later( function (){
          self.send('queryEbay');
        }, 10000)
    }
  }
});
