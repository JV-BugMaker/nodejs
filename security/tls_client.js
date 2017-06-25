
var options = {
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
    ca:[fs.readFileSync('./keys/ca.crt')]
};

var stream = tls.connect(8000,options,function(){
    console.log('client connected',stream.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(stream);
});

stream.setEncoding('utf8');
stream.on('data',function(data){
    console.log(data);
});
stream.on('end',function(){
    server.close();
});