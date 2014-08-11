window.App =

((function(){

  var Skeleton = function(){
    this.Classes = addClasses();
    this.user = {};
    this.questions = {};
  };
  Skeleton.prototype = {};
  Skeleton.prototype.init = function(attr){
      this.questions = this.Classes('QuestionList');
      this.setAttributes(attr);
      this.addLoginHandler(); 
      this.linkQuestions();
      this.addAskHandler();          
      this.SetQuestionOnClick();
  };
  Skeleton.prototype.setAttributes = function(attr){
      this.attr = attr;
      this.$parentQ = $('#' + this.attr.questionId);
      this.$newQuest = $('#'+ this.attr.newQuest);
      this.$login = $('#'+ this.attr.login);
  };
  Skeleton.prototype.linkQuestions = function(){
    var self = this;
    var questionsClass = '.question';
    $(questionsClass).each(function(i){
      $(this).addClass("question-"+ self.questions.length);

      //Question text
      var childNodes = $(this).children();
      var questionText = $(childNodes[1]).children();
      var text = $(questionText[0]).text();
      var author = $(questionText[1]).text().match(/From:\s?(.+?$)/)[1];

      //Question object
      var question = self.Classes('Question', {question:text, author:author});

      self.questions.addQuestion(question);

      //Set votes to initial values
      var votes = $(childNodes[0]).children();
      $(votes[1]).text(0);

      //remove selected class
      $(votes[2]).removeClass('selected');
    });
  };

  Skeleton.prototype.SetQuestionOnClick = function(){
    var self = this;
    //Hide Questions until the user logs in
    this.$parentQ.hide();

    //Vote click handler  
    this.$parentQ.on('click', '.vote', function(e){
      e.preventDefault();
      //Grabe the parent question to find out the id
      var $parent = $(this).closest('.question');

      //Getting the questions key and and users vote
      var vote  = $(this).prop('classList')[1].match(/vote(.+?$)/)[1];
      var key = $parent.prop('classList')[1].toString().match(/\-(\d+)/)[1];

      //getting vote info to update vote selection display
      var voteCount = self.questions.vote(parseInt(key), self.user, vote);
      if(voteCount!== undefined){
        $parent.find('.vote').removeClass('selected');
        $(this).addClass('selected');
        var $votes = $(this).siblings('.votecount');
        $votes.text(voteCount);
      }
    });  
  };
Skeleton.prototype.addLoginHandler = function(){
  var self = this;
  this.$login.on('click', '.button', function(e){
    var username = $('#userName').val();
    $('#userName').val('');
    if(username.length > 0){
      self.user = self.Classes('User', {username: username});
      console.log(self.user, username);
      self.$parentQ.show();
      self.$newQuest.show();
      self.$login.hide();
    }
  });
};

Skeleton.prototype.addAskHandler = function(){
  //Hide this view until username is entered
  this.$newQuest.hide();
  var self = this;
  this.$newQuest.on('click','#addItem', function(e){
    e.preventDefault();
    var $ta = $(this).siblings('textarea');
    var new_question = $ta.val();
    $ta.val('');
    if(new_question && new_question.length > 0){
      var user = self.user.getUsername();
      console.log(self.user);
      self.addNewQuestion(new_question, user);
    }
  });
};
Skeleton.prototype.addNewQuestion = function(question, author){
  var q = this.Classes('Question', {question:question, author:author});
  var key = this.questions.addQuestion(q);
  var el = this.QuestionTemplate(key);
  this.render(this.$parentQ, el);
  return key;
};
Skeleton.prototype.QuestionTemplate = function(key){
  var question = this.questions.getQuestionAt(key);
  var $new_elem = $('.question').first().clone();
  $($new_elem.find('div.votecount')).text(this.questions.getVoteTotal(key));
  $($new_elem.find('.vote')).removeClass('selected');
  var classes = $new_elem.prop('class', 'question question-'+key );

  console.log(key);
  var questionText = $($new_elem.children()[1]).children();
  console.log(questionText);
  $(questionText[0]).text(question.getQuestion());
  $(questionText[1]).text('From: '+ question.getAuthor());
  return $new_elem;
};
Skeleton.prototype.render = function($domNode, $element){
  $domNode.append($element);
};


return new Skeleton();
})());