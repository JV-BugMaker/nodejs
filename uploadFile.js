//使用外部模块实现图片上传

var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res){
  //通过url进行判断 来处理不同的请求 
  if(req.url =='/upload'&& req.method.toLowerCase()=='post'){
    // parse a file upload
    var form =new formidable.IncomingForm();
    form.parse(req,function(err, fields, files){
      res.writeHead(200,{'content-type':'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

  // show a file upload form
  res.writeHead(200,{'content-type':'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8888);
