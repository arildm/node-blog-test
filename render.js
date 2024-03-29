exports.render = function(data) {
    var output = "";

    for (i = 0; i < data.length; i++) {
        post = data[i];
        output += "# " + post.title + "\n";
        output += post.text + "\n\n";
        output += "## Comments\n";

        if (post.comments) {
            for (var j = 0; j < post.comments.length; j++) {
                var comment = post.comments[j];
                output += comment.author.name + " wrote: ";
                output += comment.text + "\n";
            }
        }

        output += "\n\n";
    }

    return output;
}
