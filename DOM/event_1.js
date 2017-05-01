//事件event属性的跨浏览器方案

var EventUtil = {
    addHandler:function(element,type,handler){
        //
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    removeHandler:function(element,type,handler){

    },

    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = false;
        }
    }
}
