if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var index = -1;
        fromIndex = fromIndex * 1 || 0;
        for (var k = 0, length = this.length; k < length; k++) {
            if (k >= fromIndex && this[k] === searchElement) {
                index = k;
                break;
            }
        }
        return index;
    };
}

if(!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
    };
}

if(!Number.toFixed){
    Number.prototype.toFixed = function(len){
        var times = Math.pow(10,len);
        return Math.round(this*times)/times;
    }
}

//firefox兼容innerText
(function (bool) { 
    function setInnerText(o, s) { 
        while (o.childNodes.length != 0) { 
            o.removeChild(o.childNodes[0]); 
        } 
        o.appendChild(document.createTextNode(s)); 
    } 
    function getInnerText(o) { 
        var sRet = ""; 
        for (var i = 0; i < o.childNodes.length; i ++) { 
            if (o.childNodes[i].childNodes.length != 0) { 
                sRet += getInnerText(o.childNodes[i]); 
            } 
            if (o.childNodes[i].nodeValue) { 
                if (o.currentStyle.display == "block") { 
                    sRet += o.childNodes[i].nodeValue + "\n"; 
                } else { 
                    sRet += o.childNodes[i].nodeValue; 
                } 
            } 
        } 
        return sRet; 
    } 
    if (bool) { 
        HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
            return this.ownerDocument.defaultView.getComputedStyle(this, null); 
        }); 
        HTMLElement.prototype.__defineGetter__("innerText", function () { 
            return getInnerText(this); 
        });
        HTMLElement.prototype.__defineSetter__("innerText", function(s) { 
            setInnerText(this, s); 
        });
    } 
})(/Firefox/.test(window.navigator.userAgent)); 

//跨浏览器DOM对象
var DOMUtil = {
    getStyle:function(node,attr){
        return node.currentStyle ? node.currentStyle[attr] : getComputedStyle(node,0)[attr];
    },
    getScroll:function(){           //获取滚动条的滚动距离
        var scrollPos={};
        if (window.pageYOffset||window.pageXOffset) {
            scrollPos['top'] = window.pageYOffset;
            scrollPos['left'] = window.pageXOffset;
        }else if (document.compatMode && document.compatMode != 'BackCompat'){
            scrollPos['top'] = document.documentElement.scrollTop;
            scrollPos['left'] = document.documentElement.scrollLeft;
        }else if(document.body){
            scrollPos['top'] = document.body.scrollTop;
            scrollPos['left'] = document.body.scrollLeft;
        }
        return scrollPos;
    },
    getClient:function(){           //获取浏览器的可视区域位置
        var l,t,w,h;
        l  =  document.documentElement.scrollLeft || document.body.scrollLeft;
        t  =  document.documentElement.scrollTop || document.body.scrollTop;
        w =   document.documentElement.clientWidth;
        h =   document.documentElement.clientHeight;
        return {'left':l,'top':t,'width':w,'height':h} ;
    },
    getNextElement:function(node){  //获取下一个节点
        if(node.nextElementSibling){
            return node.nextElementSibling;
        }else{
            var NextElementNode = node.nextSibling;
            while(NextElementNode.nodeValue != null){
                NextElementNode = NextElementNode.nextSibling
            }
            return NextElementNode;         
        }
    },
    getElementById:function(idName){
        return document.getElementById(idName);
    },
    getElementsByClassName:function(className,context,tagName){ //根据class获取节点
        if(typeof context == 'string'){
            tagName = context;
            context = document;
        }else{
            context = context || document;
            tagName = tagName || '*';
        }
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }
        var nodes = context.getElementsByTagName(tagName);
        var results= [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var classNames = node.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    results.push(node);
                    break;
                }
            }
        }
        return results;
    },
    addClass:function(node,classname){          //对节点增加class
        if(!new RegExp("(^|\s+)"+classname).test(node.className)){
            node.className = (node.className+" "+classname).replace(/^\s+|\s+$/g,'');
        }
    },
    removeClass:function(node,classname){       //对节点删除class
        node.className = (node.className.replace(classname,"")).replace(/^\s+|\s+$/g,'');
    }
};

//响应
(function(){
    var isIE= navigator.userAgent.indexOf("MSIE")>-1;
    if(isIE){
        var $body =  document.body;
        var resize = function(){
            if(document.documentElement.clientWidth<1200){
                $body.className="dev-small";
            }else if(document.documentElement.clientWidth<1400){
                $body.className="dev-middle";
            }else if(document.documentElement.clientWidth<1600){
                $body.className="dev-large";
            }else{
                $body.className="";
            }
        };
        window.attachEvent('onresize',resize);
        resize();   
    }
})();

//获取日期
(function() {
    var $mod_head = DOMUtil.getElementsByClassName('mod-head')[0];
    var $date = DOMUtil.getElementsByClassName('icon-date', $mod_head)[0];
    if($date){
        var today = new Date();
        $date.innerHTML = '' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
})();

//菜单
(function(){
    var $mod_head = DOMUtil.getElementsByClassName('mod-head')[0];
    var $mod_mask = DOMUtil.getElementsByClassName('mod-mask')[0];
    var $menu = DOMUtil.getElementsByClassName('menu',$mod_head)[0];
    var $wrapper = DOMUtil.getElementsByClassName('wrapper')[0];
    var toggle = {
        isOpen:false,
        open:function(){
            this.isOpen = true,
            DOMUtil.addClass($wrapper,'status-show');
            document.body.style.overflow = 'hidden';
        },
        close:function(){
            this.isOpen = false,
            DOMUtil.removeClass($wrapper,'status-show');
            document.body.style.overflow = '';
        }
    };
    if($mod_mask){
        $mod_mask.onclick = function(){
            toggle.close();
        };
    }
    if($menu){
        $menu.onclick = function(){
            if(toggle.isOpen){
                toggle.close();
            }else{
                toggle.open();
            }
        };
    }
})();

//回到顶部
(function(){
    var $mod_goback = DOMUtil.getElementsByClassName('mod-goback')[0];
    if($mod_goback){
        var scroll = function(){
            var top = document.documentElement.scrollTop||document.body.scrollTop;
            $mod_goback.style.display = top>420?'block':'none';
        }  
        window.onscroll = scroll;
    }
})();

//块链接
(function(){
    $(document).on('click', '.J_link', function(e) {
        if (!$(e.target).closest('a').length) {
            var $this = $(this);
            var url = $this.data('url');
            var target = $this.data('target');
            if(url){
                if (target == '_blank') {
                    window.open(url);
                } else {
                    location.href = url;
                }
            }else{                
                var $a = $this.find('a[href!="javascript:;"]');
                target = $a.attr('target');
                url = $a.attr('href')||'/';
                if (target == '_blank') {
                    window.open(url);
                } else {
                    location.href = url;
                }
            }
        }
    });
})(); 