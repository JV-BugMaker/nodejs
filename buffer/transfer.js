//buffer 对象可以存储不同编码类型的字符串转码的值 调用write方法就可以了

buf.write(str,[offset],[length],[encoding]);

//buffer 转换成字符串

buf.toString([encoding],[start],[end]);

//可以指定编码进行转换 指定位置

Buffer.isEncoding(encoding); //来判断是否支持转换编码

setEncoding('utf-8');  //能够解决大部分的宽字节乱码问题 但是没有从根本上解决
string_decoder(); //从根本上来解决  但是编码有限制 

//解决方式 其实是 识别出编码的字节数 然后按照字节数的整数倍进行输出 不在拆分成2部分