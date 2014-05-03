var BlogDB = require("./blogdb").BlogDB;
var render = require("./render");

function dump(response) {
    var db = new BlogDB();
    db.connect(function() {
        db.allPosts(function(posts) {
            response.write(render.render(posts));
            response.end();
        });
    });
}

exports.dump = dump;
