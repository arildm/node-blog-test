var express = require("express");
var exphbs = require("express3-handlebars");
var BlogDB = require("./blogdb").BlogDB;
var render = require("./render");

var app = module.exports = express();
var blogdb = new BlogDB();

app.engine("handlebars", exphbs({defaultLayout: 'main'}));

app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "handlebars");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get("/", function(req, res) {
    blogdb.connect(function() {
        blogdb.allPosts(function(err, posts) {
            if (err) throw err;
            res.render("blogpage", {
                title: "Blog",
                posts: posts
                }
            );
        });
    });
});

app.listen(8888);
