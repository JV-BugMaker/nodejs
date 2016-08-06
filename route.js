function route(pathname,handle){
    //丫的 调试的时候看到一个 找不到这个handle  我以为是那边出现问题
    //丫的  默认的Request for /favicon.icoreceived can't not found handle 这个好烦
    //想办法去掉
    if(pathname == '/favicon.ico'){
      //todo
        return;
    }
    if(typeof handle[pathname] === "function"){
        handle[pathname]();
        console.log("About to router request "+ pathname);
    }else{
        console.log("can't not found handle ");
    }
}

//导出模块 供其他文件进行引入
exports.route = route;
