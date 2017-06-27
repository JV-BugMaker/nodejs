
var url = require('url');
var querystring = require('querystring');
var query = querystring.parse(url.parse(req.url).query);
//直接使用query参数 如果查询字符串的key出现多次 那它的值就是一个数组 
