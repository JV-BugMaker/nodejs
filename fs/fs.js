var fs = require('fs');


function copy(src,dst){
    //node js的异步操作 在写数据的同时 去读取数据 异步
    fs.writeFileSync(dst,fs.readFileSync(src));
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
