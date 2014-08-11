var InputAreaView = Backbone.View.extend({
  tagName: 'SECTION',
  className: 'userInput',
  model: new UserInput(),
  initialize: function(params){
    if(params.$loginEl && params.$askEl){
      this.loginView = new LoginView({model:params.login, el:params.$loginEl});
      this.AskView = new AskView({model:params.ask, el:params.$askEl});
    }
    else {
      this.loginView = new LoginView({model:params.login});
      this.AskView = new AskView({model:params.ask});
    }
    this.loginView.on('login', function(string){
      this.model.validateString(string, this.loginView);
    }, this);

    this.loginView.on('loggedIn', function(){
      this.AskView.$el.show();
      this.trigger('loggedIn');
    }, this);

    this.AskView.on('validate', function(string){
      this.model.validateString(string, this.AskView);
    }, this);


    this.model.on('validation', function(result, string, caller){
      
      if(result){
        caller.isValid(string);
      }
      else {
        caller.isInValid(string);
      }
    }, this);
    this.render();
  },

  template: function(){},
  render: function(){
    this.$el.children().detach();
    this.$el.append(
      this.loginView.render(),
      this.AskView.render()
    );
    return this.$el;
  }
});