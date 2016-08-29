//服务器会首先分析URL，得到请求的文件的路径和类型（MIME）。
//然后，服务器会读取请求的文件，并按顺序合并文件内容。
//最后，服务器返回响应，完成对一次请求的处理。

var fs = require('fs'),
    path = require('path'),
    http = require('http');

//文件类型
var MIME = {
    '.js':'application/javascript',
    '.css':'text/css'
};

//合并文件 回调函数处理异常 以及 end
function combineFiles(pathnames,callback){
    //输出用数组 进行存储
    var output = [];
    //闭包处理 递归
    (function next(i,len){
       if(i<len ){
         //异步读取文件
        //正确的做法不是改用并行IO，而是一边读取文件一边输出响应，把响应输出时机提前至读取第一个文件的时刻
         fs.readFile(pathnames[i],function(err,data){
            if(err){
              callback(err);
            }else{
              //文件名 就是输入到output数组对象中
              output.push(pathnames[i]);
              next(i+1,len);
            }
         });
       }else{
         callback(null,Buffer.concat(output));
       }
    })(0,pathnames.length);
}

function main(argv){
    //读取配置文件  同步读取参数一   为了防止有为空的参数  设置一个默认值
    var config = JSON.parse(fs.readFileSync(argv[0],'UTF-8')),
        root = config.root || '.',
        port = config.port || 80,
        server;
    server = http.createServer(function(request,response){
        //从请求request中获取请求的路径参数 进行处理
        var urlInfo = parseURL(root,request.url);
        //不采用串行的文件读写方式 采用 边度编写方式
        validateFiles(urlInfo.pathnames,function(err,pathname){
            if(err){
                response.writeHead(404);
                response.end(err.message);
            }else{
                response.writeHead(200,{
                    'Content-type':urlInfo.mine
                });
                outputFile(pathname,response);
            }
        });
    }).listen(port);
    process.on('SIGTERM',function(){
        server.close(function(){
            process.exit(0);
        });
    });
}
function parseURL(root,url){
    //处理url 为了一些特殊url进行处理
    var base, pathname,parts;
    //首先处理url中带 替换 url中带 localhost:port/
    if(url.indexOf('??') === -1){
        url = url.replace('/','/??');
    }
    //进行处理
    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function(value){
        //此处需要文件值
        return path.join(root,base,value);
    });
    return {
        mine:MIME[path.extname(pathnames[0])]||'text/plain',
        pathnames:pathnames
    };
}

//读取文件 输出文件内容
function outputFile(pathname,writer){
    (function next(i,len){
        if(i<len){
            var reader = fs.createReadStream(pathanme[i]);
            //通过管道方式进行
            reader.pipe(writer,{end:false});
            reader.on('end',function(){
                next(i+1,len);
            });
        }else{
            writer.end();
        }
    })(0,pathname.length);
}
function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function (err, stats) {
                if (err) {
                    callback(err);
                } else if (!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, pathnames);
        }
    }(0, pathnames.length));
}
