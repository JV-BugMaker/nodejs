
app.get('/profile',function(req,res){
    if(!cache[layout]){
        cache[layout] = fs.readFileSync(path.join(VIEW_FOLDER,layout),'utf8');
    }

    res.writeHeader(200,{'Content-type':'text/html'});
    res.writeHeader(render(complie(cache[layout])));
    ep.all('users','articles',function(){
        res.end();
    });
    eq.fail(function(err){
        res.end();
    });
    db.getData('sql1',function(err,data){
        data = err ? {} : data;
        res.write('<script>bigpipe.set("articles",'+JSON.stringify(data)+';</script>)');
    });
    db.getData('sql2',function(err,data){
        data = err ? {} : data;
        res.write('<script>bigpipe.set("copyright",'+JSON.stringify(data)+';</script>)');
    });
});