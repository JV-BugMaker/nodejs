//node中由于是异步处理 对错误的处理方式存在不同

var async = function(callback){
  process.next(callback);
}

try{
  async(callback);
}catch(s){
  //TODO
}

//无法对callback中的错误进行捕捉
//在node中的异常处理方式 原则是是通过回调函数中传参数err进行处理
//原则一 必须执行调用方传入的回调函数
//原则二 正确传递异常供调用者处理

var async = function(callback){
    process.nextTick(function(){
        var result = something;
        if(error){
          //有错误直接传递错误信息
          return callback(error);
        }
        //没有错误直接将error设置为null
        callback(null,result);
    });
}
