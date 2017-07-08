
//测试的时候 测试 真实的文件读取 成本比较高 就用替换 模式 来mock

var fs = require('fs');
var muk = require('muk');

before(function(){
    muk(fs,'readFileSync',function(path,encoding){
        throw new Error('mock readFileSync error');
    });
});

//it()

//还原

after(function(){
    muk.restore();
});

//当有多个用例的时候 使用beforEach()

fs.readFile = function(filename,encoding,callback){
    //mock 异步调用 防止变成同步调用
    process.nextTick(function(){
        callback('new Error("mock file error")');
    });
}

