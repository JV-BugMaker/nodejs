
var server = http.createServer(function(req,res){
    res.WriteHead(200,{'Content-type':'text/plain'});
    res.send('Hello World\n');

});

server.listen(12010);

server.on('upgrade',function(req,socket,upgradeHead){
    var head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    var key = req.headers['sec-websocket-key'];
    var shasum = crypto.createHash('sha1');
    key = shasum.update(key+'258EAFA5-E914-47DA-95CA-C5ABoD85B11').digest('bash64');
    var headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade:wesocket',
        'Connection:Upgrade',
        'Sec-WebSocket-Accept:'+key,
        'Sec-WebSocket-Protocol:' + protocol        
    ]
    //立即发送数据 buffer 小数据量推送策略
    socket.setNoDelay(true);
    socket.write(headers.concat('','').join('\r\n'));

    var websocket = new WebSocket();
    websocket.setSocket(socket);
});