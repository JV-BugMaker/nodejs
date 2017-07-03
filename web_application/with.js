var obj = {
    x: 10,
    foo: function () {
        with (this) {
            var x = 20;
            var y = 30;
            console.log(y);//30
        }
    }
};
obj.foo();
console.log(obj.x);//20
console.log(obj.y);//undefined
