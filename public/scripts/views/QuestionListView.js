var QuestionListView = Backbone.View.extend({
  tagName: 'UL',
  className: 'question',
  initialize: function(){
    this.collection.on('all', function(){
      this.render();
    }, this);
    this.collection.on('update', function(vote, question){
      
      this.collection.getUser('vote', [vote, question]);
    }, this);
    this.render();
    this.$el.hide();
  },

  template: function(){
    return "<ul></ul>";
  },
  render: function(){
    this.$el.children().detach();
    var i = 0;
    this.$el.append(
      this.collection.map(function(question){
        return new QuestionEntryView({model: question}).render();
      })
    );
    return this;
  }
});