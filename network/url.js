//url 处理

//protocol auth hostname port pathname search/query hash
var url = require('url');
var arr = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
console.log(arr);

//.parse 解析url 参数二和参数三布尔型
//参数二为true时候 该方法返回的URL对象中query字段不再是一个字符串而是经过queryString模块转换后的
//参数三为true时候 该方法可以正确解析不带协议头的URL

//format与parse相反 format就是讲字段组装成url

var obj = {
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
};
console.log(url.format(obj));

//.resolve 方法用于拼接URL

console.log(url.resolve('http://www.example.com/foo/bar', '../baz'));
/* =>
http://www.example.com/baz
*/
var queryString = require('queryString');
//queryString 模块用于实现URL参数字符串与参数对象的互相转换
//类似php中 http_build_string
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/


//数据压缩 解压
