//路径解析处理

//常用静态文件的处理
function (req,res){
    var pathname = url.parse(req.url).pathname;
    fs.readFile(path.join(ROOT,pathname),function(err,file){
        if(err){
            res.writeHead(404);        
            res.end('can not found file');
            return;
        }
        res.writeHead(200);
    });
}

//controller 对应控制器处理

function (req,res){
    var pathname = url.parse(req.url).pathname;
    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);

    if(handlers[controller] && handles[controller][action]){
        handlers[controller][action].apply(null,[req,res].concat(args))
    }else{
        res.writeHead(500);
        res.end('找不到对应服务器');
    }
}

//但是这样的有瑕疵 不够灵活 不能灵活调整
