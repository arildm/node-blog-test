var async = require("async");
var BlogDB = require("./blogdb").BlogDB;

var blogdb = new BlogDB();

async.series([
    blogdb.connect,
    blogdb.clear,
    function(callback) {
        async.series([ // Can not be parallell because of unique index of author
            function(callback) {
                blogdb.addPost("Testinlägg", "Idag har jag klättrat i träd", function(err, posts) {
                    if (err) throw err;
                    async.parallel([
                        async.apply(blogdb.addComment, posts[0], "Klättring låter trevligt", "Ada", "ada@example.com"),
                        async.apply(blogdb.addComment, posts[0], "Klättring låter tråkigt", "Beda", "beda@example.com")
                    ], callback);
                });
            },
            function(callback) {
                blogdb.addPost("Festinlägg", "Idag har jag haft fest", function(err, posts) {
                    if (err) throw err;
                    async.parallel([
                        async.apply(blogdb.addComment, posts[0], "Fest låter trevligt", "Ada", "ada@example.com"),
                        async.apply(blogdb.addComment, posts[0], "Fest låter tråkigt", "Beda", "beda@example.com")
                    ], callback);
                });
            }
        ], callback);
    }
], function(err) {
   if (err) throw err;
   blogdb.close();
});
