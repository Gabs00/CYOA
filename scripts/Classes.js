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
  this.voteUp = [];
  this.voteDown = [];
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