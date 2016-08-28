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
        port = config.port || 80;
    http.createServer(function(request,response){
        //从请求request中获取请求的路径参数 进行处理
        var urlInfo = parseURL(root,request.url);
        combineFiles(urlInfo.pathnames,function(err,data){
            if(err){
                response.writeHead(404);
                response.end(err.message);
            }else{
                response.writeHead(200,{
                    'Content-type':urlInfo.mine
                });
                response.end(data);
            }

        });
    }).listen(port);
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
