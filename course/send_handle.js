
//发送句柄
var child = require('child_process').fork('child.js');

//open up the server object and send the handle
var server = require('net').createServer();
server.on('connection',function(socket){
    socket.end('handle by parent\n');
});
server.listen(1337,function(){
    child.send('server',server);
});

//子进程代码

process.on('message',function(m,sever){
    if(m === 'server' ){
        server.on('connection',function(socket){
            socket.end('handle by child\n');
        });
    }
});


//===============================http层面============================

var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');

var server = require('http').createServer();
server.listen(1337,function(){
    child1.send('server',server);
    child2.send('server',server);
    //turnoff server
    server.close();
});


//child.js
var http = require('http');
var server = http.createServer(function(req,res){
    res.writeHeader(200,{'Content-type':'text/plain'});
    res.end('handle by child,pid is' + process.pid + '\n');
});

process.on('message',function(m,tcp){
    if(m === 'server'){
        tcp.on('connection',function(socket){
            server.emit('connection',socket);
        });
    }
});