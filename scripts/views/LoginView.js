var LoginView = Backbone.View.extend({
  tagName: 'DIV',
  className:'LoginView',
  initialize: function(param){
    param.model.on('loggedIn', function(value){
      //Do stuff to make this view hclasse
      
      this.$el.hide();
      this.trigger('loggedIn');
    }, this);
    this.render();
  },
  events: {
    'click a':'validate',
  },

  serialize: function(){
    return $('.userName').val();
  },

  validate: function(){
    this.trigger('login', this.serialize());
  },
  isValid: function(string){
    this.sendUserName(string);
  },

  isInValid: function(string){
    alert('value: ' + string + 'is invalid');
  },
  sendUserName: function(name){
    
    this.model.loginRequest(name);
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
    return this.$el;
  },
});