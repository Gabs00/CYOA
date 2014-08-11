var AskView = Backbone.View.extend({
  tagName:'DIV',
  className: 'newQuestionView',
  initialize: function(){
    this.render();
    this.$el.hide();
  },

  events: {
    'click a': 'validate',
  },

  serialize: function(){
    return $('textarea').val();
  },

  validate: function(){
    this.trigger('validate', this.serialize());
  },
  isValid: function(string){
    this.sendAskQuestion(string);
    $('textarea').val('');
  },

  isInValid: function(string){
    alert('value: ' + string + 'is invalid');
  },
  sendAskQuestion: function(string){
    this.model.addQuestion(string);
  },

  template: function(){
    var HTML =
      '<label for="newQuestion" class="questionPrompt">Adventurer wants to know...</label>'+
      '<textarea cols=20 rows=2 class="newQuestion" name="newQuestion"></textarea>'+
      '<a class="addItem" class="button">Ask now!</a>';
    return HTML;
  },
  render: function(){
    this.$el.html(this.template());
    return this.$el;
  }
});