var UserInput = Backbone.Model.extend({
 validate: function(value){
  var isValid = false;
  if(value !== undefined){
    if(value.length > 0){
      if(value === _.escape(value)){
        isValid = true;
      }
    }
  }
 },

 inValid: function(value){
  this.trigger('invalid', value);
 },

 valid: function(value){
  this.trigger('valid', value);
 },

 noEsc: function(value){
  var isValid = false;
  if(value !== undefined){
    if(value.length > 0){
      isValid = true;
    }
  }
 }
});