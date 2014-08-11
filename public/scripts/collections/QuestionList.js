var QuestionList = Backbone.Collection.extend({
  model: Question,
  backend: 'questionBackend',
  initialize: function(){
    this.bindBackend();
  },
  vote: function(vote, question, user){
    question = this.get(question);
    var votes = question.get('votes');
    if(votes === undefined){
      question.set('votes', {});
      votes = question.get('votes');
    }
    votes[user] = vote;
    question.swap(vote);
    this.votes(question);
  },
  votes: function(question){
    var votes = question.get('votes');
    
    var tally = _.reduce(votes, function(total, vote){
      return total+vote;
    }, 0);
    
    question.set('tally', tally);
  },
  userVote: function(question){
    var user = this.get('user');
    return this.get(question).get('votes')[user] || 0;
  },
  getUser: function(callback, args){
    
    this.trigger('user', callback, args, this);
  }
});