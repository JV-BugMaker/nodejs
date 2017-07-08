
//BDD风格

describe('Array',function(){
    before(function(){
        //TODO
    });
    describe('#indexOf()',function(){
        it('should return -1 when not present',function(){
            [1,2,3].indexOf(4).should.equal(-1);
        });
    });
    //异步调用 会增加对超时的判断  判断fn.length的长度问题 然后注入回调函数 done
    describe('#fs.readFile()',function(){
        this.timeout = 500; //对这个层级的测试 都设置同一个超时标准
        it('fs.readFile should be ok',function(done){
            fs.readFile('file_path','utf-8',function(err,data){
                should.not.exist(err);
                //done(); 对单个测试用例进行超时设置
                this.timeout = 500;
                setTimeout(function() {
                    done();
                }, 10000);
            });
        });
    });

});


//TDD 测试风格

suite('Array',function(){
    setup(function(){

    });

    suite('#indexOf',function(){
        test('should return -1 when not present',function(){
            assert.equal(-1,[1,2,3].indexOf(4));
        });
    });
});
