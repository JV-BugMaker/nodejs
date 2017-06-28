
var serialize = function(name,val,opt){
    var pairs = [name+'='+encode(val)];
    opt = opt || [];

    if(opt.maxAge) pairs.push('Max-Age='+opt.maxAge);
    if(opt.domain) pairs.push('Domain='+opt.domain);
    if(opt.path) pairs.push('Path='+opt.path);
    if(opt.expires) pairs.push('Expires='+opt.expires.toUTCString());
    if(opt.httpOly) pairs.push('HttpOlny');
    if(opt.secure) pairs.push('Secure');

    return pairs.join(';');
}

//cookie带来的性能问题
//1.减小cookie的大小，如果一旦你的path设置为了根目录，那在所有的服务端请求都会带上cookie
//2.设置独立静态域名，用来突破同域下的下载量限制，将下载线程数翻倍。
//3.减少DNS查询，依靠浏览器的DNS缓存。
