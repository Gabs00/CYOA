var QuestionEntryView = Backbone.View.extend({
  tagName: 'LI',
  className: 'question',
  initialize: function(){
    this.render();
  },
  events: {
    'click .voteup': function(){ this.vote(1);},
    'click .votedown': function(){ this.vote(-1);}
  },
  vote: function(value){
    
    this.model.update(value);
  },
  template: function(attr){
    var HTML = _.template(
      '<div class="voteStatus">' +
          '<a class="vote voteup <%= voteup %>"></a>' +
        '<div class="votecount"><%= tally %></div>'+
          '<a class="vote votedown <%= votedown %>"></a>'+
      '</div>'+
      '<div class="questionText">'+
      '<p><%= question %></p><div class="questionAuthor">From: <%= author %></div>'+
      '</div>', attr);
  return HTML;
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});