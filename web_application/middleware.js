
var middleware = function(req,res,next){
    next();
};

var querystring = function(req,res,next){
    req.query = url.parse(req.url,true).query;
    next();
};

var cookie = function(req,res,next){
    var cookie = req.headers.cookie;
    var cookies = {};
    if(cookie){
        var list = cookie.split(';');
        for(var i = 0;i< list.length;i++){
            var pair = list[i].split('=');
            cookies[pair[0].trim()] = pair[1];
        }
    }

    req.cookie = cookies;
    next();
};

app.use = function(path){
    var handle = {
        path:pathRegexp(path),
        stack:Array.prototype.slice.call(arguments,1)
    };
    routes.all.push(handle);
};

var match = function(pathname,routes){
    for(var i = 0;i < routes.length;i++){
        var route = routes[i];
        var reg = route.path.regexp;
        var matched = reg.exec(pathname);

        if(matched){
            handle(req,res,route.stack);
            return true;
        }
    }
    return false;
};


var handle = function(req,res,stack){
    var next = function(){
        var middleware = stack.shift();
        if(middleware){
            middleware(req,res,next);
        }
    };
    //启动执行
    next();
};

//改进use

app.use = function(path){
    if(typeof path === 'string'){
        handle = {
            //正常处理 路径的
            path:pathRegexp(path),
            stack:Array.prototype.slice.call(arguments,1)
        };
    }else{
        // typeof function 认为是基础组件 querystring cookie session 等基础middleware 参数
        handle = {
            path:pathRegexp('/'),
            stack:Array.prototype.slice.call(arguments,0),
        };
    }
    routes.all.push(handle);
};

//改进match  把所有符合匹配的中间件 存储起来
var match = function(pathname,routes){
    var stacks = [];
    for(var i = 0;i < routes.length;i++){
        var route = routes[i];
        var reg = route.path.regexp;
        var matched = reg.exec(pathname);

        if(matched){
            stacks = stacks.concat(route,stack);
        }
    }
    return stacks;
};

//改进分发
function (req,res){
    var pathname = url.parse(req.url).pathname;
    var method = req.method.toLowerCase();
    //获取all()方法里面的中间件
    var stacks = match(pathname,routes.all);
    if(routes.hasOwnPerperty(method)){
        //根据请求方法分发，获取相关中间件
        stacks.concat(match(pathname,routes[method]));
    }

    if(stacks.length){
        handle(req,res,stacks);
    }else{
        handle404(req,res);
    }
}