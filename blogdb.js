var MongoClient = require("mongodb").MongoClient;

function BlogDB() {

    var db;

    this.connect = function (callback) {
        var self = this;
        MongoClient.connect("mongodb://127.0.0.1:27017/blog", function(err, db) {
            if (err) throw err;
            self.db = db;
            callback();
        });
    }

    this.allPosts = function (callback) {
        this.db.collection('post')
            .find()
            .toArray(function(err, posts) {
                if (err) throw err;
                callback(posts);
            });
    }

    var self = this;
    this.addPost = function (newPost, callback) {
        // XXX Why won't async.each work with "this" below?
        self.db.collection('post').insert(newPost, function(err, docs) {
            if (err) throw err;
            callback();
        });
    }

    this.clear = function (callback) {
        this.db.dropDatabase(function(err, results) {
            callback();
        });
    }

    this.close = function() {
        this.db.close();
    }
}

exports.BlogDB = BlogDB;
