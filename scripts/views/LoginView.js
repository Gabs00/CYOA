var LoginView = Backbone.View.extend({
  tagName: 'DIV',
  className:'LoginView',
  initialize: function(param){
    param.model.on('loggedIn', function(value){
      //Do stuff to make this view hclasse
      console.log('LoginView received User trigger');
      this.$el.hide();
    }, this);
  },
  events: {
    'click a':'sendUserName',
  },

  attributes: {
    'class': 'chicken',
  },

  serialize: function(){
    return $('.userName').val();
  },

  sendUserName: function(caller){
    console.log(caller);
    console.log('fired click event');
    this.model.loginRequest(this.serialize());
  },

  template: function(){
    var HTML =    
    '<label for="userName" class="logInPrompt">Your name:</label>'+
    '<input class="userName" type="text"/>'+
    '<a class="logIn" class="button">That\'s me!</a>';
    return HTML;    
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  },
});