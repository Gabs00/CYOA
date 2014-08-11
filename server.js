var connect = require('connect'),
  st = require('serve-static');
var app = connect()
  .use(st(__dirname))
  .listen(3000);