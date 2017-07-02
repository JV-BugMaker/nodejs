

var routes = {'all':[]};
var app = {};
app.use = function(path,action){
    routes.all.push([pathRegexp(path),action]);
};

['get','put','delete','post'].forEach(function(method){
    routes[method] = [];
    app[method] = function(path,action){
        routes[method].push([pathRegexp(path),action]);
    };
});

//路由匹配
var match = function(pathname,routes){
    for(var i = 0 ; i < routes.length;i++){
        var route = routes[i];
        //正则匹配
        var reg = route[0].regexp;
        var keys = route[0].keys;
        var matched = reg.exec(pathname);
        if(matched){
            //抽象具体值
            var params = {};
            for(var i = 0,l = keys.length;i < l;i++){
                var value = matched[i+1];
                if(value){
                    params[keys[i]] = value;
                }
            }
            req.params = params;

            var action = route[1];
            action(req,res);
            return true;
        }
    }
    return false;
};

function (req,res){
    var pathname = url.parse(req.url).pathname;
    //请求方法变为小写 全部
    var method = req.method.toLowerCase();
    if(routes.hasOwnPerperty(method)){
        //分发
        if(match(pathname,routes[method])){
            return;
        }else{
            if(match(pathname,routes.all)){
                return;
            }
        }
    }else{
        //直接让 all()处理
        if(match(pathname,routes.all)){
            return;
        }
        handle404(req,res);
    }
}
