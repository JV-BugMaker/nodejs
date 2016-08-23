//node 网络操作
var http = require('http');
var fs = require('fs');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-type':'text/plain'});
    response.end('Hello world \n');
}).listen(8080);
// 在Linux系统下，监听1024以下端口需要root权限。因此，如果想监听80或443端口的话，需要使用sudo命令启动程序。

//http 提供两种使用方式：
//1.作为服务器端使用，创建一个http服务器，监听http客户端请求并返回响应
//2.作为客户端使用时，发起一个http客户端请求，获取响应


//作为服务器端使用
//除了可以使用request对象访问请求头数据外，还能把request对象当作一个只读数据流来访问请求体数据


http.createServer(function(request,response){
    var body = [];
    console.log(request.method);
    console.log(request.header);

    request.on('data',function(chunk){
        body.push(chunk);
    });

    request.on('end',function(){
        //字符串凭借 使用buffer拼接的好处是 效率高 以及 当拼接字符创的编码不一致的时候 不会出现问题
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(80);

//http 作为客户端时候的使用方式  发起http请求

var options = {
    'hostname':'gjw.web.com',
    'port':80,
    'path':'/start',
    'method':'POST',
    'header':{
        'Content-type':'application/x-www-form-urlencoded'
    }
};
var request = http.request(options,function(response){
  //response 作为接收对象处理数据

    console.log(response.statusCode);
    console.log(response.headers);
    var body = [];
    response.on('data',function(chunk){
        body.push(chunk);
    });

    response.on('end',function(){
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});

request.write('hello node');
request.end();
//http get 请求 不需要请求体 直接url
http.get('http://www.example.com/', function (response) {});

//https 的处理方式与http 模块基本相同 但是多出一个整数验证

//服务器端 处理

var options = {
    key:fs.readdirFileSync('./ssl/default.key'),
    cret:fs.readdirFileSync('./ssl/default.cre')
};

var server = http.createServer(options,function(request,response){

});
//多了一个options对象，通过key和cert字段指定了HTTPS服务器使用的私钥和公钥。
//
//NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。

server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
