//buffer数据块
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
//console.log(bin[0]);通过索引来访问buffer中的数据  104
var str = bin.toString('utf-8'); //指定进行转换成相应编码的字符串
// console.log(str);
var reverBin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
console.log(reverBin);
// Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。
// 至于Buffer，更像是可以做指针操作的C语言数组。
// bin[0] = 0x48; 可以直接进行修改某个位置的数组
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2); //这边相当就是类似于C中的指针 这边引用的修改就会影响源数据

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>

// 如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。
// 这个类似于申请一块新的内存，并把已有内存中的数据复制过去。
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
//###################################################################

// 当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，
// 我们就需要用到数据流。NodeJS中通过各种Stream来提供对数据流的操作。

var rs = fs.createReadStream(pathname);
var ws = fs.createWriteStream(dst);
//数据接收 有数据的时候出发 进行stream进行数据的写入
rs.on('data',function(chunk){
    // dosomething();
    // rs.pause();
    // doSomething(chunk, function () {
    //     //处理完这块数据之前 先暂停数据的读取 处理完之后 在开启
    //     rs.resume();
    // });
    // ws.write(chunk,function(){
    //     rs.pause();
    // });
    // 我们可以根据.write方法的返回值来判断传入的数据
    // NodeJS直接提供了.pipe方法来做这件事情，能够防止数据操作的时候因为数据量大导致内存爆仓问题
    if(ws.write(chunk) ===false){
        rs.pause();
    }
});
rs.on('end',function(){
    //处理完成后 进行数据清除
    clearUp();
});
//Stream基于事件机制工作，所有Stream的实例都继承于NodeJS提供的EventEmitter。
//并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了
ws.on('drain',function(){
    rs.resume();
});

//文件的fs操作的束腰分三类
//属性读取：fs.state、fs.chmod fs.chown
//文件内容读取：fs.readFile fs.readdir fs.writeFile fs.mkdir
//底层文件操作: fs.open fs.read fs.write fs.close
//NODE中的异步操作  fs模块的回调函数参数一般有两个
fs.readFile(pathname, function (err, data) {
    if (err) {
        // Deal with error.
    } else {
        // Deal with data.
    }
});
//同步API除了方法名的末尾多了一个Sync之外，异常对象与执行结果的传递方式也有相应变化。
try {
    var data = fs.readFileSync(pathname);
    // Deal with data.
} catch (err) {
    // Deal with error.
}

//操作文件的时候需要对文件路径
//NodeJS提供了path内置模块来简化路径相关操作，并提升代码可读性
//path.normalize
//将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。
//如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性
var cache = {};

  function store(key, value) {
      cache[path.normalize(key)] = value;
  }

  store('foo/bar', 1);
  store('foo//baz//../bar', 2);
  console.log(cache);  // => { "foo/bar": 2 }
  //坑出没
  //标准化之后的路径里的斜杠在Windows系统下是\，而在Linux系统下是/。
  //如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。

//path.join 将传入的多个路径拼接为标准路径
//该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符
path.join('foo/','baz/','../bar'); // "foo/bar"
//获取文件的后缀名
path.extname('foo/bar.js'); // =>.js
