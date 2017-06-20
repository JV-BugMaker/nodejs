//Buffer 是js与c++结合实现的 在性能方面使用c++进行实现 在非性能则进行js变现

var str = '顾嘉伟 is JV';
var buff = new Buffer(str,'utf-8');

console.log(buff);

//指定编码下 中文占据3个字节
//值得注意 buffer数组时候 元素是整数时 范围是0到256

var buf = new Buffer(100); //100个长度的buf

buf[20] = -256;//当元素的值小于0时，会逐次增加256 直到在规定范围内 0
buf[20] = 257;//当元素的值大于256的时候，会逐次减256 直到在规定范围内

//node 采用slab分配机制 来分配内存 
/*
1.full 完全分配状态
2.partial 部分分配状态
3.empty 未分配状态
*/

//node 已8Kb来区分是大对象还是小对象

