
//master.js

var fork = require('child_process').fork;
var cpus = require('os').cpus();

var server = require('net').createServer();

server.listen(1337);

var workers = {};

var createWorker = function(){
    var worker = fork(__dirname+'/worker.js');
    //退出时重新启动新的进程 监听了exit事件
    worker.on('exit',function(){
        console.log('worker' + worker.pid + 'exited.');
        delete workers[worker.pid]; //删除资源
        // createWorker();
    });
    //message 接收是否是自杀信号
    worker.on('message',function(message){
        if(message.act == 'suicide'){
            createWorker();
        }
    });
    //句柄转发
    worker.send('server',server);
    workers[worker.pid] = worker;
    console.log('Create worker.pid' + worker.pid);
}

for(var i = 0;i<cpus;i++){
    createWorker();
}


//进程自己退出时 让所有工作做进程退出

process.on('exit',function(){
    for(var pid in workers){
        workers[pid].kill();
    }
});

//自己退出的情形 无法清楚 知道  异常处理
var http = require('http');
var server = http.createServer(function(req,res){
    res.writeHeader(200,{'Content-type':'text/plain'});  
    res.end('handle by child,pid is' + process.pid + '\n');
});

var worker;
process.on('message',function(m,tcp){
    if(m == 'server'){
        worker = tcp;
        worker.on('connection',function(socket){
            server.emit('connection',socket);
        });
    }
});

process.on('uncaughtException',function(){
    //停止接收新的连接
    worker.close(function(){
        //所有连接已有连接断开后 退出进程
        process.exit(1);
    });
});

//收到异常错误的时候  向master进程发送 信号 停止接收新的进程 master 进程接收到信号之后 停止转发句柄和新建进程
process.on('uncaughtException',function(){
    process.send({act:'suicide'});
    //停止接收新的连接
    worker.close(function(){
        //所有连接已有连接断开后 退出进程
        process.exit(1);
    });
    //设置超时时间 避免长连接引起问题
    setTimeout(function() {
        process.exit(1);
    }, 5000);
});