//高阶函数
var arr = [2,1,4,6,5,2,4,5];
arr.sort(function(a,b){
  return a - b;
});

console.log(arr);

//高阶函数就是将函数作为返回值进行传递,使关注点不是返回值还是在函数上

var emitter = new events.EventEmitter();
emitter.on('event_foo',function(){
  //TODO something
});
//node中的高阶函数通常有 ES5
//forEach() map() reduce() filter() every() some()
