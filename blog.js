var BlogDB = require("./blogdb").BlogDB;
var render = require("./render");
var async = require("async");

function dump(response) {
    var db = new BlogDB();
    db.connect(function() {
        db.allPosts(function(posts) {
            async.each(posts, function(post, callback) {
                db.getComments(post, function(err, comments) {
                    if (err) throw err;
                    post.comments = comments;
                    async.each(comments, function(comment, callback) {
                        db.getAuthor(comment, function(err, author) {
                            if (err) throw err;
                            comment.author = author;
                            console.log(comment.author.name);
                            callback();
                        });
                    }, callback);
                });
            }, function() {
                response.write(render.render(posts));
                response.end();
            });
        });
    });
}

exports.dump = dump;
