/**
 * Created by Jenniwazhere on 5/8/2017.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  numberData: Ember.computed('model', function(){
    return{
      labels: ["March 2016", "April 2016", "May 2016", "June 2016", "July 2016", "August 2016",
        "September 2016", "October 2016", "November 2016", "December 2016", "January 2017", "February 2017", "March 2017", "April 2017", "May 2017"],
      datasets: [{
        label: "Samsung Galaxy S7 - 32GB",
        data: [659,869,650,595,620,600,565,555,535,635,600,378,500,479,439]
      }]
    }
  }),
  barOptions{
    responsive: true
  }
})
