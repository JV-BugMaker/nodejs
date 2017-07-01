
function (req,res){
    var auth = req.headers['authorization'] || '';
    var parts = auth.split(' ');
    var method = parts[0] || ''; //basic
    var encoded = parts[1] || ''; //base64加密之后的串
    var decoded = new Buffer(encoded,'base64').toString('utf-8').split(':');
    var users = decoded[0]; //user
    var pass = decoded[1]; //pass
    if(!checkUser(user,pass)){
        res.setHeader('WWW-Authenticate','Basic relam="Secure Area"');
        res.writeHead(401);
        res.end();
    }else{
        handle(req,res);
    }
}