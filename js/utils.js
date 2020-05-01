


let utils=(function(){
    let getCss=function(curEle,attr){
        if(typeof window.getComputedStyle==="undefined"){
            return;
        }
        let val=window.getComputedStyle(curEle,null)[attr],
            reg=/^-?\d+(\.\d+)?(px|em|rem|pt)?$/i;
        reg.test(val)?val=parseFloat(val):null;
        return val;

    }

    let setCss=function(curEle,attr,value){
        if(attr==='opacity'){
            curEle.style.opacity=value;
            curEle.style.filter=`alpha(opacity=${value *100})`;
            return;
        }
        if(!isNaN(value)){
            let reg=/^(width|height|fontSize|((margin|padding)?(left|right|top|bottom)?))$/i;
            reg.test(attr)? value+='px':null;
        }
        curEle['style'][attr]=value;
    }

    let setGroupCss=function(curEle,options={}){
        for (let attr in options) {
            if(!options.hasOwnProperty(attr)) break;
            setCss(curEle,attr,options[attr]);
        }
    };


    let css=function(...arg){
        let len=arg.length,
            fn=getCss;
        len>=3 ? fn=setCss : null;
        len===2 && (arg[1] instanceof Object) ? fn=setGroupCss :null;
        return fn(...arg);

    }

    let offset=function(curEle){
        let curTop=curEle.offsetTop,
            curLeft=curEle.offsetLeft,
            p=curEle.offsetParent;

        while(p.tagName!=='BODY'){
            curLeft+=p.clientLeft;
            curLeft+=p.offsetLeft;
            curTop+=p.clientTop;
            curTop+=p.offsetTop;
            p=p.offsetParent;
        }
        return {
            top:curTop,
            left:curLeft
        }
    }

    let winHandle=function(attr,value){
        if(typeof value!=='undefined'){
            document.documentElement[attr]=value;
            document.body[attr]=value;
            return;
        }
        return document.documentElement[attr]||document.body[attr];
    }

    return{
        css,
        offset,
        winHandle
    }
})();