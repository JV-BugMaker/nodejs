//node 文件编码处理 BOM
// BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），
// 位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：
// Bytes      Encoding
// ----------------------------
//    FE FF       UTF16BE
//    FF FE       UTF16LE
//    EF BB BF    UTF8
var fs = require('fs');

//我们可以根据文本文件头几个字节等于啥来判断文件是否包含BOM

function readFile(pathname){
    var bin =fs.readFileSync(pathname);
    //判断文件头几个是不是特殊的 针对UTF-8文件
    if(bin[0] === 0xEF && bin[1] === 0xBB && bin[2] ===0xBF ){
        //出去前三个字节
        bin = bin.slice(3);
    }
    return bin.toString('utf-8');
}

//GBK转换成utf-8 需要第三方包支持
var iconv = require('iconv-lite');

function readGBKTOUTF(pathname){
    var bin = fs.readFileSync(pathname);
    //decode 解码
    return iconv.decode(bin,'gbk');
}

//单字节转码
// 1. GBK编码源文件内容：
//     var foo = '中文';
// 2. 对应字节：
//     76 61 72 20 66 6F 6F 20 3D 20 27 D6 D0 CE C4 27 3B
// 3. 使用单字节编码读取后得到的内容：
//     var foo = '{乱码}{乱码}{乱码}{乱码}';
// 4. 替换内容：
//     var bar = '{乱码}{乱码}{乱码}{乱码}';
// 5. 使用单字节编码保存后对应字节：
//     76 61 72 20 62 61 72 20 3D 20 27 D6 D0 CE C4 27 3B
// 6. 使用GBK编码读取后得到内容：
//     var bar = '中文';

//不关心转码之后变成什么样子 只关心是否是对应关系
function replace(pathname) {
    //先转换成二进制 然后去处理  不关心如何处理  写入的时候还是按照二进制去写
    var str = fs.readFileSync(pathname, 'binary');
    str = str.replace('foo', 'bar');
    fs.writeFileSync(pathname, str, 'binary');
}
