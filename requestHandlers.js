var exec = require("child_process").exec;

function start(response)
{
    console.log("request start handle there");
    //模拟http请求阻塞模式
    //Node.js可以在不新增额外线程的情况下，依然可以对任务进行并行处理 —— Node.js是单线程的。
    //它通过事件轮询（event loop）来实现并行操作，
    //对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。
    //用Node.js就有这样一种实现方案： 函数传递
    exec("find /",
    {timeout:10000,maxBuffer:2000*1024},
    function(error,stdout,stderr){
      response.writeHead(200,{"Content-type":"text/plain"});
      response.write(stdout);
      response.end();
    }
    );
    return "Hello Start";
}

function upload(response)
{
    console.log("request upload handle there");
    response.writeHead(200,{"Content-type":"text/plain"});
    response.write("Hello upload");
    response.end();
}
exports.start = start;
exports.upload = upload;
