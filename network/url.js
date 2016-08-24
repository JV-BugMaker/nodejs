//url 处理

//protocol auth hostname port pathname search/query hash
var url = require('url');
var arr = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
console.log(arr);

//.parse 解析url 参数二和参数三布尔型
//参数二为true时候 该方法返回的URL对象中query字段不再是一个字符串而是经过queryString模块转换后的
//参数三为true时候 该方法可以正确解析不带协议头的URL

//format与parse相反 format就是讲字段组装成url

var obj = {
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
};
console.log(url.format(obj));

//.resolve 方法用于拼接URL

console.log(url.resolve('http://www.example.com/foo/bar', '../baz'));
/* =>
http://www.example.com/baz
*/
var queryString = require('queryString');
//queryString 模块用于实现URL参数字符串与参数对象的互相转换
//类似php中 http_build_string
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/

var http = require('http');
var zlib = require('zlib');
//数据压缩 解压  zlib gzip
http.createServer(function(request,response){
    var i = 1024,data ='';
    while(i--){
        data += '.';
    }
    //判断客户端是否支持gzip压缩
    if((request.headers['accept-encoding']||'').indexOf('gzip')!==-1){
        //response 数据进行压缩
        zlib.gzip(data,function(err,data){
              response.writeHead(200,{
                  'Content-type':'text/plain',
                  'Content-Encoding':'gzip'
              });
              response.end(data);
        });
    }else{
        response.writeHead(200,{
            'Content-type':'text/plain'
        });
        response.end(data);
    }
}).listen(80);

//使用zlib进行数据解压

var options = {
    'hostname':'gjw.web.com',
    'port':80,
    'path':'/',
    'method':'GET',
    'headers':{
      'Accept-Encoding':'gzip,deflate'
    }
};

http.request(options,function(response){
    var body = [];
    response.on('data',function(chunk){
        body.push(chunk);
    });

    response.on('end',function(){
        body = Buffer.concata(body);
        //判断服务器的响应数据是否经过gzip压缩的
        if(response.headers['Content-Encoding'] === 'gzip'){
            zlib.gunzip(body,function(err,data){
                  console.log(data.toString());
            });
        }else{
            console.log(body.toString());
        }
    });
});

//net 模块可用于创建socket 服务器或者socket客户端  。
var net = require('net');
net.createServer(function(conn){
    conn.on('data',function(data){
        //每行添加上换行符
        conn.write([
          'HTTP/1.1 200',
          'Content-type: text/plain',
          'Content-length:11',
          '',
          'hello world'
        ].join('\n'));
    });
}).listen(80);


//使用socket搭建客户端请求

var options = {
    port:80,
    host:'gjw.web.com'
};
var client = net.connect(options,function(){
      //这边是connect 服务器 没有response
      client.write([
        'GET / HTTP/1.1',
        'User-Agent:curl/7.26.0',
        'Host:gjw.web.com',
        'Accept:*/*',
        '',
        ''
      ],join('\n'));
      client.on('data',function(chunk){
          console.log(chunk.toString());
          client.end();
      });
});

//但是全局客户端默认只允许5个并发Socket连接，当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生socket hang up错误。
//通过http.globalAgent.maxSockets属性把这个数字改大些即可。另外，https模块遇到这个问题时也一样通过https.globalAgent.maxSockets属性来处理。
