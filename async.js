// //控制并发数量  使得连接数量在5个左右
//
//
// //引入依赖包
// var async = require('async');
// var superagent = require('superagent');
// var cheerio = require('cheerio');
// var url = require('url');
//
// var cnodeUrl = 'https://cnodejs.org/';
//
// var topicUrls = [];
// superagent.get(cnodeUrl)
//   .end(function (err, res) {
//     if (err) {
//       return console.error(err);
//     }
//   //解析DOM HTML而已
//     var $ = cheerio.load(res.text);
//     $('#topic_list .topic_title').each(function (idx, element) {
//       var $element = $(element);
//       var href = url.resolve(cnodeUrl, $element.attr('href'));
//       topicUrls.push(href);
//     });
//   });
//
//
//   //获取到足够的urls 后开始控制并发数量并抓取网页
//   var concurrencyCount = 0;
//   var fetchUrl = function(url,callback){
//       superagent.get(url)
//       .end(function(err,res){
//         if (err) {
//           return console.error(err);
//         }
//         var delay = parseInt((Math.random() * 10000000) % 2000, 10);
//         console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
//         setTimeout(function () {
//           concurrencyCount--;
//           callback(null, url + ' html content');
//         }, delay);
//       });
//   };
//   async.mapLimit(topicUrls,5,function(url,callback){
//     concurrencyCount++;
//     fetchUrl(url,callback);
//   },function(err,result){
//       console.log('final');
//       console.log(result);
//   });
var async = require('async');

var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};

var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});
