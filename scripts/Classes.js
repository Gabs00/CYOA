addClasses = function(){
var User = function(param){
  this.username = param.username;
};

User.prototype = {};
User.prototype.setUsername = function(newName){
  this.username = newName;
  return this.username;
};
User.prototype.getUsername = function(){
  return this.username;
};

var Question = function(params){
  this.question = params.question;
  this.author = params.author;
  this.votes = {};
};

Question.prototype = {};
Question.prototype.getQuestion = function(){
  return this.question;
};

Question.prototype.getAuthor = function(){
  return this.author;
};
Question.prototype.getVotes = function(){
  return this.votes;
};

Question.prototype.userVote = function(user, direction){
  this.votes[user] = direction; 
  return this.getUserVote(user);
};

Question.prototype.getUserVote =function(user){
  var vote = this.votes[user];
  if(vote === undefined){
    vote = 0;
    this.votes[user] = 0;
  }
  return vote;
};
var QuestionList = function(){
  this._questionList = {};
  this._voteWatcher = {};
  this._displayed = 0;
  this.length = 0;
};

QuestionList.prototype = {};
QuestionList.prototype.addQuestion = function(question){
  var key = this.length;
  this._questionList[key] = question;
  this._voteWatcher[key] = 0;
  this.length++;
  return key;
};
QuestionList.prototype.voteUpButton = function(link){
  if(link !== undefined){
    this.voteUp = link;
  }
  return this.voteUp;
};
QuestionList.prototype.voteDownButton = function(link){
  if(link !== undefined){
    this.voteDown = link;
  }
  return this.voteDown;
};
QuestionList.prototype.vote = function(key, user, direction){
  if(key < 0 || key >= this.length){
    return;
  }
  direction = (direction === 'up') ? 1:-1;
  var oldVote = this._questionList[key].getUserVote(user);
  this._questionList[key].userVote(user, direction);
  var newVote = this._questionList[key].getUserVote(user);
  if(oldVote !== newVote){
    this._voteWatcher[key] = this.getVoteTotal(key);
  }
  return this._voteWatcher[key];
};

QuestionList.prototype.getVoteTotal = function(key){
  if(key < 0 || key >= this.length){
    return;
  }
  var votes = this.getQuestionAt(key).getVotes();
  var total = _.reduce(votes, function(memo, value){
    value = parseInt(value);
    if(typeof value === 'number'){
      return memo+value;
    }
  }, 0);
  return total;
};
QuestionList.prototype.getUserVote = function(key,user){
  return this._questionList[key].getUserVote(user);
};
QuestionList.prototype.getQuestionAt = function(key){
  if(key < 0 || key >= this.length){
    return;
  }
  return this._questionList[key];
};

QuestionList.prototype.getNextQuestion = function(user){
  if(this._displayed < this.length){
    var key = this._displayed;
    this._displayed++;
    var self = this;
    var question = this.getQuestionAt(key);
    if(question){
      return {
        key:key,
        question:question.getQuestion(),
        author: question.getAuthor(),
        votes: question.getVotes(),
        my_vote:question.getUserVote(user),
        VOTE_UP_BUTTON: this.voteUpButton(),
        VOTE_DOWN_BUTTON: this.voteDownButton()
      };
    }
  }
};

/*
var PageHandler = function(){

};
PageHandler.prototype.UserLoginView = function(){
  return $();
};

PageHandler.prototype.AskAQuestionView = function(){

};

PageHandler.prototype.QuestionListView = function(){

};
*/
  return function(className, args){
    var classes = {
      'Question': Question,
      'QuestionList': QuestionList,
      'User':User,
    };
    return new classes[className](args);
  };
};