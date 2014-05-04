var MongoClient = require("mongodb").MongoClient;
var async = require("async");

function BlogDB() {

    var db;
    var self = this;

    this.connect = function (callback) {
        MongoClient.connect("mongodb://127.0.0.1:27017/blog", function(err, db) {
            if (err) throw err;
            self.db = db;
            callback();
        });
    }

    this.allPosts = function (callback) {
        self.db.collection('post')
            .find()
            .toArray(function(err, posts) {
                if (err) throw err;
                callback(posts);
            });
    }

    this.getComments = function (post, callback) {
        if (post._id === undefined) throw "post has no id";
        self.db.collection('comment')
            .find({post: post._id})
            .toArray(callback);
    }

    this.getAuthor = function (comment, callback) {
        if (comment._id === undefined) throw "comment has no id";
        self.db.collection('author')
            .findOne({_id: comment.author}, function(err, results) {
                callback(err, results);
            });
    }

    this.addPost = function (title, text, callback) {
        if (!title) throw "post must have title";
        if (!text) throw "post must have text";
        var newPost = {title: title, text: text};
        self.db.collection('post').insert(newPost, callback);
    }

    this.addComment = function (post, text, name, email, callback) {
        var author;
        async.waterfall([
                function(callback) {
                    // Make sure post exists
                    self.db.collection('post').count({_id: post._id}, callback);
                },
                function(count, callback) {
                    // Check input
                    if (count === undefined || count < 1) throw "no post with id: " + post._id;
                    if (!text) throw "comment has no text";
                    if (!name) throw "comment has no name";

                    // Insert author if new
                    author = {name: name, email: email};
                    self.db.collection('author').count(author, callback);
                },
                function(count, callback) {
                    if (count < 1) self.db.collection('author').insert(author, callback);
                    else self.db.collection('author').find(author).toArray(callback);
                },
                function(authors, callback) {
                    // Finally insert comment
                    self.db.collection('comment').insert({post: post._id, text: text, author: authors[0]._id}, callback);
                }
        ], callback);
    }

    this.clear = function (callback) {
        async.series([
            // XXX Can not use async.apply here, because of "self"???
            function (callback) {
                self.db.dropDatabase(callback);
            },
            function (callback) {
                self.db.collection('author').ensureIndex({"name": 1, "email": 1}, {"unique": true}, callback);
            }
        ], callback);
    }

    this.close = function () {
        if (self.db) self.db.close();
    }
}

exports.BlogDB = BlogDB;
