var Question = Backbone.Model.extend({
  initialize: function(params){
    if(params){
      this.set('Question', params.question);
      this.set('Auther', params.Auther);
    }
    this.set('tally', 0);
    this.set('voteup', '');
    this.set('votedown', '');
  },
  addQuestion: function(question){
    this.set('Question', question);
    this.userRequest();
  },
  addAuthor: function(author){
    this.set('Author', author);
    this.complete();
  },
  userRequest: function(){
    this.trigger('user', this);
  },
  complete: function(){
    if(this.get('Author') !== undefined &&
      this.get('Question') !== undefined){
      this.trigger('complete', this);
    }
  },

  update: function(item){
    
    this.trigger('update', item, this);
  },

  swap: function(value){
    if(value === 1){
      this.set('voteup', 'selected');
      this.set('votedown', '');
    }
    else{
      this.set('voteup', '');
      this.set('votedown', 'selected');
    }
  }


});