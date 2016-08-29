var cp = require('child_process');
var worker ;
function spawn(server,config){
    worker = cp.spawn('node',[server,config]);
    worker.on('exit',function(code){
        if(code !== 0){
            spawn(server,config);
        }
    });
}

function main(argv){
    spawn('pro.js',argv[0]);
    process.on('SIGTERM',function(){
        worker.kill();
        process.exit(0);
    });
}

main(argv.slice(2));
