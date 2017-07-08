#!/bin/sh
DIR=`pwd`
NODE=`which node`
# get action
ACTION=$1

# help

usage(){
    echo "Usage ./appctl.sh {start|stop|restart}";
}

get_pid(){
    if [ -f ./run/app.pid ];then
        echo `cat ./run/app.pid`
    fi
}

# start app

start(){
    pid=`get_pid`
    if [ ! -z $pid ];then
        echo "server is running"
    else 
        $NODE $DIR/app.js 2>&1 &
        echo 'server is running'
    fi
}

stop(){
    pid=`get_pid`
    if [ -z $pid ];then
        echo 'server is not running'
    else 
        echo 'server is stopping ....'
        kill -15 $pid
        echo 'server is stop!'
    fi
}

restart(){
    stop
    sleep 0.5
    echo =====
    start
}

case "$ACTION" in
    start)
        start
    ;;
    stop)
        stop
    ;;
    restart)
        restart
    ;;
    *)
        usage
    ;;
esac

