var server = require("./server");
var data = require("./data");
var router = require("./router");

server.start(router.route, data);
