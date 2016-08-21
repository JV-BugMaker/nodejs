var fs = require('fs');


function copy(src,dst){
    //node js的异步操作 在写数据的同时 去读取数据 异步
    fs.writeFileSync(dst,fs.readFileSync(src));
}
function copy_v2(src,dst){
    //node  创建流去读取数据和写入数据 在通过pipe管道 连接两个流
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
    //以上程序使用fs.createReadStream创建了一个源文件的只读数据流，
    //并使用fs.createWriteStream创建了一个目标文件的只写数据流，并且用pipe方法把两个数据流连接了起来。
    //避免了因为大文件一次性读取的时候内存爆仓的问题
}

function main(argv){
    copy(argv[0],argv[1]);
}

var argv = ["../README.md","./new.md"];
main(argv);
//console.log(process.argv);
//[ '/Users/JV/git/nvm/versions/node/v5.5.0/bin/node',
  // '/Users/JV/web/node/fs/fs.js' ]
  // process是一个全局变量，可通过process.argv获得命令行参数。由于argv[0]固定等于NodeJS执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。
