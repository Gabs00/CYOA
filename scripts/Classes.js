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