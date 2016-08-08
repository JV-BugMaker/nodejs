function route(pathname,handle){
    //丫的 调试的时候看到一个 找不到这个handle  我以为是那边出现问题
    //丫的  默认的Request for /favicon.icoreceived can't not found handle 这个好烦
    //想办法去掉
    if(pathname == '/favicon.ico'){
      //todo
      //太鸡巴坑了  这个favicon 太操蛋了 真的是MDZZ 不返回 在write那边就会报错 真的是
        return "not found favicon";
    }
    if(typeof handle[pathname] === "function"){
        return handle[pathname]();
    }else{
        console.log("can't not found handle ");
        return "4O4 NOT FOUND";
    }
}

//导出模块 供其他文件进行引入
exports.route = route;
