var connect = require('connect'),
  st = require('serve-static'),
  backboneio = require('backbone.io');

var io = require('socket.io');

io.configure( function() {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration",10);
});

var app = connect()
  .use(st(__dirname + '/public'))
  .listen(process.env.PORT || 3000);

var backend = backboneio.createBackend();
backend.use(backboneio.middleware.memoryStore());
var io = backboneio.listen(app, {questionBackend: backend});