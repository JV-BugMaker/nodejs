//递归目录
//目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点。
//先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。
//因此使用这种遍历方式时，下边这棵树的遍历顺序是A > B > D > E > C > F。
var fs = require('fs');
var path = require('path');

//同步版本
function travelSync(dir,callback){
    fs.readdirSync(dir).forEach(function(file){
          var pathname = path.join(dir,file);
          //判断你是否是目录
          if(fs.statSync(pathname).isDirectory()){
              //是目录就继续递归调用
              travel(pathname,callback);
          }else{
              //是文件就会滴啊用回调函数 将文件路径传递过去
              callback(pathname);
          }
    });
}
//异步版本实现读取目录
function travel(dir,callback,finish){
    fs.readdir(dir,function(err,files){
        //闭包处理立即执行
        (function next(i){
            if(i < files.length){
                var pathname = path.join(dir,files[i]);
                fs.stat(pathname,function(err,stats){
                    if(stats.isDirectory()){
                        travel(pathname,callback,function(){
                            next(i+1);
                        });
                    }else{
                      callback(pathname, function () {
                              next(i + 1);
                      });
                    }
                });
            }else{
                finish && finish();
            }

        })(0);
    });
}


travel('/usr/local',function(pathname){
    console.log(pathname);
});
