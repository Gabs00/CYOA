var AppModel = Backbone.Model.extend({
  initialize: function(){
    Backbone.io.connect();
    /*
    var initialQuestions = [ 
      new Question({question:'What is your quest?', author:'Brclassge Keeper'}),
      new Question({question: 'What is your favorite color?', author:'Brclassge Keeper'})
      ];*/
    this.set('Ask', new Question());
    this.newAsk();
    this.set('questions', new QuestionList());
    this.get('questions').fetch();
    this.set('user', new User());

    this.get('questions').on('user', function(callback, args, collection){
      args.push(this.get('user').get('username'));
      
      collection[callback].apply(collection, args);
    }, this);

  },

  newAsk: function(){
    var ask = this.get('Ask');
    ask.on('user', function(caller){
      var user = this.get('user');
      if(user !== undefined){
        caller.addAuthor(user.get('username'));
      }
    }, this);
    ask.on('complete', function(caller){
      var q = {question:ask.get('Question'), author:ask.get('Author')};
      this.get('questions').create(q);
      ask.set('Question', undefined);
      ask.set('Author', undefined);
    }, this);

  }
});