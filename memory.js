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
