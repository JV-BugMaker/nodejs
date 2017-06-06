//async解决并行方案

async.parallelimit([
    function(callback){
        fs.readFile('file1.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('file2.txt','utf-8',callback);
    }
],1,function(err,results){
    //TODO
});

//与parallel类似但是多了一个用于限制并发数量的参数

//parallelimit无法动态添加任务  可以使用queue来实现

var q = async.queue(function(file,callback){
    fs.readFile(file,'utf-8',callback);
},2);

q.drain = function(){
    //完成队列中的所有任务
};

fs.readdirSync('.').forEach(function(file) {
    q.push(file,function(err,data){
        //TODO
    });
}, this);

//async queue并不是很丰富  