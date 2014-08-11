var VoteList = Backbone.Collection.extend({
  model:Vote,
  initialize: function(params){
    this.on('add', function(vote){
      
    }, this);
  }
});