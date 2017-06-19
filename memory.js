//查看内存使用情况

process.memoryUsage();

//rss 进程常驻内存 resident set size swap交换区 和文件系统
//headTotal 堆内存信息

var showMem = function(){
    var mem = process.memoryUsage();
    var format = function(bytes){
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    }

    console.log('Process:headTotal ' + format(mem.heapTotal) + 'heapUsed' + format(mem.heapUsed) + 'rss'+ format(mem.rss));
    console.log('--------');
}

var useMem = function(){
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for(var i = 0;i < size;i++){
        arr[i] = 0;
    }
    return arr;
}

var total = [];

for(var j = 0;j < 15;j++){
    showMem();
    total.push(useMem());
}

showMem();