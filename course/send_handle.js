
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