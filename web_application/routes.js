
var routes = [];

var use = function(path,action){
    routes.push([path,action]);
};


function (req,res){
    var pathname = url.parse(req.url).pathname;
    for(var i = 0;i < routes.length;i++){
        var route = routes[i];
        if(pathname == routes[0]){
            var action = route[1];
            action(req,res);
            return;
        }
    }
    //处理404
    handle(req,res);
}

//按照规则进行 自然映射
function (req,res){
    var pathname = url.parse(req.url).pathname;
    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);
    var module;
    try{    
        module = require('./controller/'+controller);
    }catch(e){
        handle500(e);
        return;
    }
    var method = module[action];
    if(method){
        //method 指向的是global 全局执行
        method.apply(null,[req,res].concat(args));
    }else{
        handle500(req,res);
    }
}