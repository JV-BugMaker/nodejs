//node 就是把js整理成一个一个模块 来进行处理
//node的模块 我们可以理解成php的类 也就是社区很多贡献出来的第三方类
var http = require("http");
var url = require("url");
var path = require("path");
var express = require("express");
var favicons = require("connect-favicons");

var app = express();
//middleware handle favicons can't found
app.use(favicons(__dirname + '/public/img/icons'));
app.use(express.static(path.join(__dirname, '/public')));

function Start(route,handle){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        route(pathname,handle);
        response.writeHead(200,{"Content-type":"text/plain"});
        response.write("hello world");
        response.end();
    }
    http.createServer(onRequest).listen(8888);
}
console.log("server start");

exports.Start = Start;
