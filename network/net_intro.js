//net 对应TCP
//dgram 对应UDP
//http 对应http https对应https 

var net = require('net');

//基于事件订阅模式
var server = net.createServer(function(socket){
    //新的连接
    socket.on('data',function(data){
        socket.write("你好");
        socket.pipe(socket);
    });

    socket.on('end',function(){
        console.log('连接结束');
    });

    socket.write('展示');
});

server.listen(8124,function(){
    console.log('servr bound');
});