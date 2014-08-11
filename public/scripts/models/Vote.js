var Vote = Backbone.Model.extend({
  initialize: function(){
    this.set('value', 0);
  },
  
  vote: function(){
    this.trigger('vote', this);
  },

  setVote: function(user, vote){
    this.set('user', user);
    this.set('value', vote);
  },
});