
var agent = new http.Agent({
    maxSockets:10
});

var options = {
    hostname:'127.0.0.1',
    port:'1334',
    path:'/',
    method:'post',
    agent:agent
};

var req = http.request(options,function(res){
    console.log('STATUS:'+res.statusCode);
    console.log('HEADER:'+JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
        console.log(chunk);
    });
});

res.end();

