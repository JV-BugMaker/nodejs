//step(task1,task2,task3) step接收任意数量的任务 所有任务都将会串行一次执行

var fs = require('fs');
Step(
    function readFile1(){
        fs.readFile('file1.txt','utf-8',this);
    },
    function readFile2(err,content){
        //如果上面方法存在异常错误，将会把err在这个函数第一个参数
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
//使用parallel()方法注意 如果异步方法的结果是传回多个参数 ， step最多将只会取前面两个

//结果分组

Step(
    function readDir(){
        fs.readDir(__dirname,this);
    },
    function readFile(err,results){
        if(err) throw err;

        var group = this.group();
        results.forEach(function(filename) {
            if(/\.js$/.test(filename)){
                fs.readFile(__dirname+"/"+filename,'utf-8',group());
            }
        }, this);
    },
    function showAll(err,files){
        if(err) throw err;
        console.log(files);
    }
);
//第一次调用时告知step要并行执行，第二次调用是将结果生成一个回调函数，而回调函数接受的返回值将会按组存储
//function(err,result1,result2,result3...){}
//function(err,results){}
