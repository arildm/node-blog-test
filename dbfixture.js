var BlogDB = require("./blogdb").BlogDB;
var data = require("./data");
var util = require("util");
var async = require("async");

var db = new BlogDB();
db.connect(function() {

    // clear collections
    db.clear(function() {

        // insert data
        async.each(data, db.addPost, function() {
            console.log("done");

            // dump for debug purposes
            db.allPosts(function(posts) {
                posts.forEach(function(post) {
                    console.log(util.inspect(post, false, null));
                });
                db.close();
            });
        });
    });
});

