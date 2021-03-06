
var handle = function(req,res){
    fs.stat(filename,function(err,stat){
        var lasrModified = stat.mtime.toUTCString();
        if(lasrModified === req.headers['if-modified-since']){
            res.writedHead(304,'Not Modified');
            res.end();
        }else{
            fs.readFile(filename,function(err,file){
                var lastModified = stat.mtime.toUTCString();
                res.setHeader('Last-Modified',lasrModified);
                res.writedHead(200,'ok');
                res.end();
            });
        }
    });
}

//E-tag 生成规则
var getHash = function(str){
    var shasum = crypto.createHash('sha1');
    return shasum.update(str).digest('base64');
}

//if-none-match/t-tag
var handle = function(req,res){
    fs.readFile(filename,function(err,file){
        var hash = getHash(file);
        var noneMatch = req.headers['if-none-match'];
        if(hash === noneMatch){
            res.writedHead(304,'Not Modified');
            res.end();
        }else{
            res.setHeader('E-Tag',hash);
            res.writedHead(200,'ok');
            res.end(file);
        }
    });
}

//Expires
var handle = function(req,res){
    fs.readFile(filename,function(err,file){
        var expires = new Date();
        expires.setTime(expires.getTime() + 10 * 365 * 24 *60 * 60 * 1000);
        res.setHeader('Expires',expires.toUTCString());
        res.writedHead(200,'ok');
        res.end(file);
    });
};

//Cache-Control

var handle = function(req,res){
    fs.readFile(filename,function(err,file){
        res.setHeader("Cache-Contrl","max-age=" + 10 * 365 * 24 *60 * 60 * 1000);
        res.writedHead(200,'ok');
        res.end(file);
    });
}

