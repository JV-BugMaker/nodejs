

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    //fork wokers
    for(var i = 0;i<numCPUs;i++){
        cluster.fork();
    }

    cluster.on('exit',function(worker,code,signal){
        console.log('worker' + worker.process.pid + 'died');
    });


}else{
    http.createServer(function(req,res){
        res.writeHeader(200);
        res.end('hello world\n');
    }).listen(8000);
} 
