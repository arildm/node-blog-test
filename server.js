var http = require("http");
var url = require("url");

function start(route, data) {
    function onRequest(request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        var pathname = url.parse(request.url).pathname;
        response.write(route(pathname)(data));
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server started");
}

exports.start = start;
