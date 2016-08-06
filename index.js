//入口文件 引入其他模块文件进行 http相应处理
var server = require('./server.js');
var route = require('./route.js');
var requestHandlers = require('./requestHandlers.js');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
server.Start(route.route,handle);
