
//spawn() 启动一个子进程来执行命令
//exec() 启动一个子进程来执行命令 回调函数 能够获知子进程的状况
//fork() 与spawn相同 只需要指定需要执行的文件就可以了
var cp = require('child_process');
cp.spawn('node',['worker.js']);
//错误 标准输出 标准错误
cp.exec('node worker.js',function(err,stdout,stderr){
    //TODO
});
cp.fork('./worker.js');


