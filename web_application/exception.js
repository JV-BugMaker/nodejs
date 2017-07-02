
//对于异常的处理

var handle = function(req,res,stack){
    var next = function(err){
        //增加err 返回中间件处理过程中的异常
        if(err){
            return handle500(err,req,res,stack);
        }
        //从stack数组中取出中间件并执行
        var middle = stack.shift();
        if(middle){
            //传入next 函数
            try{
                middleware(req,res,next);
            }catch(e){
                next(err);
            }
        }
    };
    //启动执行
    next();
};

var session = function(req,res,next){
    var id = req.cookie.sessionid;
    store.get(id,function(err,session){
        if(err){
            return next(err);
        }
        req.session = session;
        next();
    });
};

//handle500 处理
var handle500 = function(err,req,res,stack){
    //选取异常处理中间件 过滤middleware长度大于4
    stack = stack.filter(function(middleware){
        return middleware.lenght > 4;
    });

    var next = function(){
        var middleware = stack.shift();
        if(middleware){
            //选出错误处理中间 然后进行传递到异常处理中间进行处理
            middleware(err,req,res,next);
        }
    };
    next();
};