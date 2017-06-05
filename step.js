//step(task1,task2,task3) step接收任意数量的任务 所有任务都将会串行一次执行

var fs = require('fs');
Step(
    function readFile1(){
        fs.readFile('file1.txt','utf-8',this);
    },
    function readFile2(err,content){
        fs.readFile('file2.txt','utf-8',this);
    },
    function done(err,content){
        console.log(content);
    }
);

//step与前面提到的promise、事件模型有一个不同点就是用到了this 
//this在这边的作用就是step中的next()方法，将异步调用的结果传递给下一个任务作为参数，并调用执行。

//并行任务执行 用到了this中的parallel()方法

Step(
    function readFile1(){
        fs.readFile('file1.txt','utf-8',this.parallel());
        fs.readFile('file2.txt','utf-8',this.parallel());
    },
    function done(err,content1,content2){
        console.log(arguments);
    }
);