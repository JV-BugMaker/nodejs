
var net = require('net');

var client = net.connect({port:8124},function(){
    console.log('client connect');
    client.write('world!\r\n');
});

client.on('data',function(data){
    console.log(data.toString());
    client.end();
});

client.on('end',function(){
    console.log('client disconnect');
});

//在node中 TCP已经默认启用nagle算法 可以调用 socket.setNoDelay(true)来去掉这个算法 使得write()可以立即发送数据

