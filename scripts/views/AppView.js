var AppView = Backbone.View.extend({
  model: new AppModel(),
  tagName: 'DIV',
  className: 'content',

  initialize: function(){
    this.model.on('change', this.render, this);
    this.inputArea = new InputAreaView({
      el: $('.inputArea'),
      login:this.model.get('user'), $loginEl:$('.LoginView'),
      ask:this.model.get('Ask'), $askEl: $('.newQuestionView')
    });
    this.inputArea.on('loggedIn', function(){
      this.questionsView.$el.show();
    }, this);
    
    //this.loginView = new LoginView({ model: this.model.get('user'), el:$('.LoginView') });
    //this.askView = new AskView({model: this.model.get('Ask'), el:$('.newQuestionView') });
    this.questionsView = new QuestionListView({collection: this.model.get('questions'), el: $('.questions')});
    this.render();
  },

  render:function(){
    
    return this;
  }
});