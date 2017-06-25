
var socket = new WebSocket('ws://127.0.0.1:12010/updates');
socket.onopen = function(){
    setInterval(function(){
        if(socket.bufferedAmount == 0){
            socket.send(getUpdateData());
        }
    },50);
};
socket.onmessage = function(event){
    //TODO
}

var crypto = require('crypto');
var val = crypto.createHash('sha1').update(key).digest('bash64');


var WebSocket = function(url){
    this.options = parseUrl(url);
    this.connect();
};

WebSocket.prototype.onopen = function(){
    //TODO
}

WebSocket.prototype.setSocket = function(socket){
    this.socket = socket;
}

WebSocket.prototype.connect = function(){
    var that = this;
    var key = new Buffer(this.options.protocolVersion + '-' + Date.now()).toString('base64');
    var shasum = crypto.createHash('sha1');
    var expected = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5ABoD85B11').digest('base64');

    var options = {
        port:this.options.port,
        host:this.options.host,
        header:{
            'Connection':'Upgrade',
            'Upgrade':'websocket',
            'Sec-WebSocket-Version':this.options.protocolVersion,
            'Sec-WebSocket-Key':key
        }
    };

    var req = http.request(options);
    req.send();

    req.on('Upgrade',function(res,socket,upgradeHead){
        //连接成功
        that.setSocket(socket);
        //open
        that.onopen();
    });
}


