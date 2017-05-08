import DS from 'ember-data';

export default DS.Model.extend({
  iphoneaverageprice: DS.attr('float'),
  iphoneimageurl: DS.attr('string')
});
