
function (req,res){
    //判断body中是否存在内容  需要对内进行处理
    if(hasBody(req)){
        var buffers = [];
        req.on('data',function(chunk){
            buffers.push(chunk);
        });
        req.on('end',function(){
            req.rawBody = Buffer.concat(buffers).toString();
            handle(req,res);
        });
    }else{
        handle(req,res);
    }
}

//当上传的格式json和xml的时候 需要对rawBody进行解析 
var handle = function(req,res){
    if(mime(req) === 'application/json'){
        try{
            req.body = JSON.parse(req.rawBody);
        }catch(e){
            //handleError
            res.writeHead(400);
            res.end('json格式有误');
            return;
        }
    }
    //后续对json格式上传的内容还是可以使用req.body
    todo(req,res);
}

//xml
var xml2js = require('xml2js');
var handle = function(req,res){
    if(mime(req) === 'application/xml'){
        xml2js.parseString(req.rawBody,function(err,xml){
            if(err){
                res.writeHead(400);
                res.end('xml error');
                return;
            }
            req.body = xml;
            todo(req,res);
        });
    }
}

//file 文件处理  基于流式文件处理方式
var formidable = require('formidable');
var handle = function(req,res){
    if(hasBody(req)){
        if(mime(req) === 'multipart/form-data'){
            var form = new formidable.IncomingForms();
            form.parse(req,function(err,fields,files){
                if(err){
                    req.writeHead(400);
                    req.end();
                    return;
                }
                req.body = fields;
                req.files = files;
                handle(req,res);
            });
        }else{
            handle(req,res);
        }
    }
}


//对于文件上传的大小限制
var bytes = 1024;

function (req,res){
    var received = 0,
    var len = req.headers['content-length'] ? parseInt(req.headers['content-length'],10) : null;

    //如果内容超过长度限制 就直接返回400
    if(len && len > bytes){
        res.writeHead(413);
        res.end();
        return;
    }
    //limit
    req.on('data',function(chunk){
        received += chunk;
        if(received > bytes){
            //停止接收数据
            req.destory();
        }
    });

    handle();
}