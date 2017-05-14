import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      galaxy: this.store.findAll('galaxy'),
      iphone: this.store.findAll('iphone')
    })
  },

  setupController(controller, models) {
    controller.set('galaxy', models.galaxy);
    controller.set('iphone', models.iphone);
  }
});
