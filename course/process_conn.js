
var worker = new Worker('worker.js');
worker.onmessage = function(event){
    document.getElementById('result').textContent = event.data;
};

//其中worker.js
var n = 1;
search:while(true){
    n+1;
    for(var i =2;i <=    Math.sqrt(n);i+=1){
        if(n % i == 0){
            continue search;
        }
        postMessage(n);
    }    
};

//主线程和工作线程之间通信是通过onmessage() 和 postmessage()来通信

//子进程对象则通过send方法来实现主进程发送消息

var cp = require('child_process');
var n = cp.fork(__dirname + '/sub.js');

//事件机制
n.on('message',function(m){
    console.log('parent get message:',m);
});

n.send({hello:'world'});

//sub.js
process.on('message',function(m){
    console.log('child got message:',m);
});

process.send({foo:'bar'});

//fork 之后会创建子进程  子进程和父进程之间创建IPC通道