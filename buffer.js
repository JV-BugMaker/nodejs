//buffer数据块
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
//console.log(bin[0]);通过索引来访问buffer中的数据
var str = bin.toString('utf-8'); //指定进行转换成相应编码的字符串
console.log(str);
