let wrapper=document.getElementById('wrapper');

wrapper.innerHTML+=wrapper.innerHTML;
utils.css(wrapper,'width',utils.css(wrapper,'width')*2);

setInterval(()=>{
    let curL=utils.css(wrapper,'left');
    curL-=2;
    utils.css(wrapper,{
        left:curL
    });
    if (Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width') / 2) {
        utils.css(wrapper, 'left', 0);
    }

},18)