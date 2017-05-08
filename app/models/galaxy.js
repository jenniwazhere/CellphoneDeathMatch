import DS from 'ember-data';

export default DS.Model.extend({
  galaxyaverageprice: DS.attr('float'),
  galaxyimageurl: DS.attr('string')
});
