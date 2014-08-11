var connect = require('connect'),
  st = require('serve-static'),
  backboneio = require('backbone.io');


var app = connect()
  .use(st(__dirname + '/public'))
  .listen(3000);

var backend = backboneio.createBackend();
backend.use(backboneio.middleware.memoryStore());
var io = backboneio.listen(app, {questionBackend: backend});