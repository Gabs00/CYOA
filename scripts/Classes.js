var User = function(username){
  this.username = username;
};

User.prototype = {};
User.prototype.setUsername = function(newName){
  this.username = newName;
  return this.username;
};
User.prototype.getUsername = function(){
  return this.username;
};

var Question = function(question){
  this.question = question;
  this.vote = 0;
  this.userVotes = {};
};

Question.prototype = {};
Question.prototype.checkVote = function(user, direction){
  var vote = this.userVotes[user];
  if(vote === undefined){
      return 1;
  } else if(vote !== direction){
    return -2;
  }
  return 0;
};

Question.prototype.userVote = function(user, direction){
  var vote = this.checkVote(user, direction);
  if(vote !== 0){
    this.userVotes[user] = direction;
    if(direction === 'up'){
      this.vote+=vote;
    } else {
      this.vote-=vote;
    }
  }
};

Question.prototype.getVote =function(user){
  var vote = this.userVotes[user];
  if(vote === undefined){
    return "No Vote Placed";
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
  this._questionList[this.length] = question;
  this.length++;
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
  var oldVote = this._questionList[key].getVote(user);
  this._voteWatcher[key] = this._voteWatcher[key] || oldVote;
  this._questionList[key].vote(user, direction);
  var newVote = this._questionList[key].getVote(user);
  if(oldVote !== newVote){
    this._voteWatcher[key] = oldVote;
  }
};
QuestionList.prototype.getQuestionAt = function(key){
  if(key < 0 || key >= this.length){
    return;
  }
  return this._questionList[key];
};

QuestionList.prototype.getNextQuestion = function(){
  if(this._displayed < this.length){
    var key = this._displayed;
    this._displayed++;

    var question = this.getQuestionAt(key);
    if(question){
      return {
        question
      };
    }
  }
};
