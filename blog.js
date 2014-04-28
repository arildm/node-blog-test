function dump(data) {
    var output = "";
    output += "# " + data.title + "\n";
    output += data.text + "\n\n";
    output += "## Comments\n\n";

    for (var i = 0; i < data.comments.length; i++) {
        var comment = data.comments[i];
        output += comment.author.name + " wrote:\n";
        output += comment.text + "\n\n";
    }

    return output;
}

exports.dump = dump;
