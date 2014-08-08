var AppModel = Backbone.Model.extend({
  initialize: function(params){
    this.set('Ask', params.askAQuestion);
    this.set('questions', params.Questions);
  },
});