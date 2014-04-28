var blog = require("./blog");

function route(pathname) {
    // don't actually care about pathname for now
    return blog.dump;
}

exports.route = route;
