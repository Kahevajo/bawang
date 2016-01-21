const PORT = 5000; 

var express = require("express");
var cookieParser = require("cookie-parser");
var babel = require("babel-core/register");
var browserify = require("browserify");
var babelify = require("babelify");
var Bawang = require("./components/bawang/bawang.jsx");
var translateServer = require("./components/translate/server.js");
var path = require('path');


var app = express();
app.use(cookieParser());

var bundle = null;

function build_client(callback) {
    var b = browserify();
    b.add("./components/bawang/bawang.jsx");
    b.transform(babelify).bundle(function(err, buf) {
        if(err) console.error(err);
        bundle = buf;
        callback();
    });
}
build_client(() => {
    app.listen(PORT);
    console.log("Listening on", PORT);
});

app.get("/bundle.js", function(req, res) {
    res.send(bundle);
});

app.use('/node_modules', express.static('node_modules'));
app.use('/components/', express.static('components'));

app.get("/*", function(req, res) {
    translateServer.setlang(res, req);
    res.sendFile(path.resolve("./index.html"));
});
