//User needs to login 
//When user logs in,  who askquestion
//When user logs in, show question list
var User = Backbone.Model.extend({
  initialize: function(){
    this.set('username', undefined);
    this.set('isLoggedIn', false);
    this.on('change:isLoggedIn', this.loggedIn, this);
  },
  loginRequest: function(username){

    this.set('username', username);
    this.set('isLoggedIn', true);
  },

  loggedIn: function(status){
    this.trigger('loggedIn', status);
  },

});