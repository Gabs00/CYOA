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

    this.validate(username);
  },
  validate: function(username){
    if(username === undefined || username === null){
      this.set('isLoggedIn', false);
    }
    if(username.length > 0){
      this.set('username');
      this.set('isLoggedIn', true);
    }
  },
  loggedIn: function(status){
    this.trigger('loggedIn', status);
  },

});