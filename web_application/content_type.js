
res.send = function(filepath){
    fs.stat(filepath,function(err,stat){
        var stream = fs.createReadStream(filepath);
        //设置内容
        res.setHeader('Content-type',MimeType.lookup(filepath));
        //设置长度
        res.setHeader('Content-length',stat.size);
        //设置为附件
        res.setHeader('Content-Disposition','attachment;filename='+path.basename(filepath) + '');
        res.writeHeader(200);
        //流 管道
        stream.pipe(res);
    });
};

//response json
res.json = function(json){
    res.setHeader('Content-type','application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(json));
};

//response redirect
res.redirect = function(url){
    res.setHeader('Location',url);
    res.writeHeader(302);
    res.end('Redirect to' + url);
}

//render 
res.render = function(view,data){
    res.setHeader('Content-type','text/html');
    res.writeHeader(200);
    //实际渲染
    var html = render(view,data);
    res.end(html);
}
