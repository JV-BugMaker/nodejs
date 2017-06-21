
var dgram = require('dgram');

var message = new Buffer('顾嘉伟');
var client = dgram.createSocket("udp4");
client.send(message,0,message.length,41234,"localhost",function(err,bytes){
    client.close();
});


//socket.send(buf,offset,length,port,address,[callback])
//client的port会随机产生

