
var sessions = {};

var key = 'session_id';
var EXPIRES = 20 * 60 * 1000;

var generate = function(){
    var session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire:(new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return sessions;
}

//cookie中的口令与服务器进行比较
function (req,res){
    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = sessions[id];
        if(session){
            if(session.expire > (new Date()).getTime()){
                //更新时效
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            }else{
                //超时
                delete sessions[id];
                req.session = generate();
            }
        }else{
            req.session = generate();
        }
    }
    handle(req,res);
}

//更新client的cookie
var writeHead = res.writeHead;
res.writeHead = function(){
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize(key,req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies,session];
    res.setHeader('Set-Cookie',cookies);
    return writeHead.apply(this,arguments);
}
//redis作为session存储方案
function (req,res){
    var id = req.cookie[key];
    if(!id){
        req.session = generate();
        handle(req,res);
    }else{
        store.get(id,function(err,session){
            if(session){
                if(session.expire > (new Date()).getTime()){
                    //更新时效
                    session.cookie.expire = (new Date()).getTime() + EXPIRES;
                    req.session = session;
                }else{
                    //超时
                    delete sessions[id];
                    req.session = generate();
                }
            }else{
                req.session = generate();
            }
        });
        
    }
    handle(req,res);
}

var writeHead = res.writeHead;
res.writeHead = function(){
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize(key,req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies,session];
    res.setHeader('Set-Cookie',cookies);
    //保存回session
    store.save(req.session);
    return writeHead.apply(this,arguments);
}