//process 进程管理
//node js使用进程来处理拷贝文件目录

var child_process = require("child_process");

var util = require("util");

function copy(source,target,callback)
{
    child_process.exec(
      util.format('cp -r %s/* %s',source,target),callback);
}
copy('a','b',function(){
    //
});

//子进程是异步执行的，最终结果就是按照回调函数
//在node中可以通过process对象来进行感知和控制nodejs自身进程的方方面面
//process并不是模块 而是一个全局对象

//child_process 中可以创建和控制子进程 在child_process中最核心的就是.spawn
//cluster模块是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。
//使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。

//在node中可以通过process.argv来获取命令行参数
//但是值得注意的一点就是，node执行程序的路径和主模块文件路径固定占据了argv[0]和argv【1】
//所以第一个命令行参数就是从argv[2]开始
function main(argv){

}
main(process.argv.slice(2));

//正常程序执行完之后的退出状态是0  但是如果程序执行絮叨错误挂了 需要退出

try{

}catch(err){
    process.exit(1);
}
//此时指定的退出状态码是1


//控制输入 输出  stdin stdout  标准输入和标准输出  stderr 标准错误
//process.stdin process.stdout  process.stderr
//第一个是只读数据流  第二个和第三个是只写数据流
function log()
{
    process.stdout.write(
        util.format.apply(util,arguments)+'\n');

}

//node 进程进行权限操作  在linux中监听1024端口一下的需要root权限

var http = require('http');
http.createServer(function(request,response){
    var env = process.env,
        UID = parseInt(env('SUDO_UID')||process.getuid(),10),
        GID = parseInt(env('SUDO_GID')||process.getgid(),10);
    process.setgid(gid);
    process.setuid(uid);
}).listen(80);
//1.如果是通过sudo获取root权限的，运行程序的用户的UID和GID保存在环境变量SUDO_UID和SUDO_GID里边。如果是通过chmod +s方式获取root权限的，运行程序的用户的UID和GID可直接通过process.getuid和process.getgid方法获取。

// 2.process.setuid和process.setgid方法只接受number类型的参数。

//3.降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。


//创建子进程   spawn 参数一 是表示执行文件的路径 node php  mysql redis  参数二 是被执行的文件名 参数三是配置子进程执行的环境
var child = child_process.spawn('node',['test.js']);
child.stdout.on('data',function(data){
    console.log('stdout:'+data);
});

child.stderr.on('data',function(data){
    console.log('stderr:'+data);
});

child.on('close',function(code){
    console.log('child process exited with code '+code);
});
// 上例中虽然通过子进程对象的.stdout和.stderr访问子进程的输出，
// 但通过options.stdio字段的不同配置，可以将子进程的输入输出重定向到任何数据流上，
// 或者让子进程共享父进程的标准输入输出流，或者直接忽略子进程的输入输出。

var child = child_process.spawn('node',['child.js']);
//SIGTERM 父进程和子进程发送信号
child.kill('SIGTERM');

process.on('SIGTERM',function(){
    cleanUp();
    process.exit(0);
});

//上面代码是但向性通信

var child = child_process.spawn('node',['child.js'],
  {stdin:[0,12,'topic']}
);

child.on('message',function(msg){
    console.log(msg);
});

child.send({hello:'world'});
//

process.on('message',function(msg){
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
});

//父进程在创建子进程时，在options.stdio字段中通过ipc开启了一条IPC通道，之后就可以监听子进程对象的message事件接收来自子进程的消息，并通过.send方法给子进程发送消息。在子进程这边，可以在process对象上监听message事件接收来自父进程的消息，并通过.send方法向父进程发送消息。
//数据在传递过程中，会先在发送端使用JSON.stringify方法序列化，再在接收端使用JSON.parse方法反序列化。


//守护子进程

function spawn(mainModule)
{
    var worker = child_process.spawn('node',['child.js']);
    //node 基于事件驱动的 所以监听exit 当触发的时候 需要判断退出的状态码
    worker.on('exit',function(code){
        if(code !== 0 ){
            //非正常退出
            spawn(mainModule);
        }
    });
}
