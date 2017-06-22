
var http = require('http');

http.createServer(function(req,res){
    //输出header信息
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello World');
}).listen(1377,'127.0.0.1');
console.log('Server starting at http://localhost');


