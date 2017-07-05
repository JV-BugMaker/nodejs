//存储为worker.js
var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello world\n');
}).listen(Math.round((1+Math.random())) * 1000 , '127.0.0.1');


//通过这个来启动
var fork = require('child_process').fork;
var cpus = require('os').cpus();

for(var i = 0;i<cpus;i++){
    fork('./worker.js');
}