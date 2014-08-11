var UserInput = Backbone.Model.extend({

  validateString: function(string, caller){
    var isValid = false;
    if(string !== undefined && string !== null){
      if(string.length > 0){
        if(string === _.escape(string)){
          isValid = true;
        }
      }
    }
    this.validate(isValid, string, caller);
  },

  validate: function(isValid, string, caller){
    this.trigger('validation', isValid, string, caller);
  }


}); 