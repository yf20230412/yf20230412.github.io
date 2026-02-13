// 页面加载时默认激活 JSON 格式化功能
document.addEventListener('DOMContentLoaded', function() {
    activateJsonFormat();
});

/**
 * 激活指定功能并更新界面
 * @param {string} placeholderInput - 输入框的提示文本
 * @param {string} placeholderOutput - 输出框的提示文本
 * @param {string} controlsId - 需要显示的控件 ID
 * @param {string} activeLinkId - 需要激活的菜单项 ID
 * @param {boolean} [showSwapButton=false] - 是否显示交换按钮
 */
function activateFunction(placeholderInput, placeholderOutput, controlsId, activeLinkId, showSwapButton = false) {
    // 更新界面提示
    document.getElementById('inputText').placeholder = placeholderInput;
    document.getElementById('outputText').placeholder = placeholderOutput;

    // 显示相关按钮，隐藏其他按钮
    const allControls = ['jsonControls', 'urlControls', 'base64Controls', 'punycodeControls', 'unicodeControls', 'gzipControls', 'HexControls'];
    allControls.forEach(id => {
        document.getElementById(id).style.display = id === controlsId ? 'flex' : 'none';
    });

    // 显示或隐藏交换按钮
    document.getElementById('swapButton').style.display = showSwapButton ? 'inline-block' : 'none';

    // 设置菜单项的激活状态
    const allLinks = ['jsonFormatLink', 'urlLink', 'base64Link', 'punycodeLink', 'unicodeLink', 'gzipLink', 'HexLink'];
    allLinks.forEach(id => {
        document.getElementById(id).classList.toggle('active', id === activeLinkId);
    });

    // 清空错误提示
    document.getElementById('errorMessage').textContent = '';
}

// 激活 JSON 格式化功能
function activateJsonFormat() {
    activateFunction(
        "请输入需要进行JSON格式化的内容...",
        "格式化或压缩后的JSON...",
        "jsonControls",
        "jsonFormatLink"
    );
}

// 激活 Url 编码解码功能
function activateUrl() {
    activateFunction(
        "请输入需要进行Url编码或解码的内容...",
        "Url处理结果...",
        "urlControls",
        "urlLink",
        true // 显示交换按钮
    );
}

// 激活 Base64 编码解码功能
function activateBase64() {
    activateFunction(
        "请输入需要进行Base64编码或解码的内容...",
        "Base64处理结果...",
        "base64Controls",
        "base64Link",
        true // 显示交换按钮
    );
}

// 激活 punycode 编码解码功能
function activatePunycode() {
    activateFunction(
        "请输入需要进行ASCII域名与Unicode域名转换的内容...",
        "punycode处理结果...",
        "punycodeControls",
        "punycodeLink",
        true // 显示交换按钮
    );
}

// 激活 Unicode 编码解码功能
function activateUnicode() {
    activateFunction(
        "请输入需要进行Unicode与中文编码或解码的内容...",
        "Unicode处理结果...",
        "unicodeControls",
        "unicodeLink",
        true // 显示交换按钮
    );
}

// 激活 Gzip 加密解密功能
function activateGzip() {
    activateFunction(
        "请输入需要进行 Gzip 加密或解密的内容...",
        "Gzip 处理结果...",
        "gzipControls",
        "gzipLink",
        true // 显示交换按钮
    );
}

// 激活 16进制转字符串功能
function activatehex() {
    activateFunction(
        "请输入需要进行16进制与字符串转换的内容...",
        "16进制处理结果...",
        "HexControls",
        "HexLink",
        true // 显示交换按钮
    );
}

// 交换输入框和输出框的内容
function swapContent() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText').value;

    if (!inputText && !outputText) {
        alert('输入框和输出框均为空，无需交换！');
        return;
    }

    document.getElementById('inputText').value = outputText;
    document.getElementById('outputText').value = inputText;
}


// 2. Base64 编码
function encodeBase64() {
    const inputText = document.getElementById('inputText').value.trim(); // 使用trim()方法去除两端空白字符
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);
    const encodedText = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
    try {
        document.getElementById('outputText').value = encodedText;
        document.getElementById('errorMessage').textContent = '';
    } catch (error) {
        document.getElementById('errorMessage').textContent = '编码失败：出现未知错误';
    }
}

// Base64 解码
function decodeBase64() {
    const inputText = document.getElementById('inputText').value.trim(); // 使用trim()方法去除两端空白字符
    try {
        const binaryString = atob(inputText);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        const decodedText = decoder.decode(bytes);
        document.getElementById('outputText').value = decodedText;
        document.getElementById('errorMessage').textContent = '';
    } catch (error) {
        document.getElementById('errorMessage').textContent = '解码失败：输入内容不是有效的Base64编码';
    }
}

//3. common.js
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


//4. compression.js
// 普通压缩功能
function compressText() {
    const inputText = document.getElementById('inputText').value;
    const errorMessage = document.getElementById('errorMessage');

    // 检查输入是否为有效 JSON
    try {
        JSON.parse(inputText);
        // 如果有效，清空错误信息
        errorMessage.textContent = '';
    } catch (error) {
        // 如果无效，显示错误信息
        errorMessage.textContent = `压缩错误：${error.message}`;
    }

    // 无论输入是否有效，都执行压缩操作
    const compressedText = compressJson(inputText);
    document.getElementById('outputText').value = compressedText;
}

// 压缩 JSON 字符串
function compressJson(jsonString) {
    // 去掉多余的空格和空行，但保留符号
    let compressed = jsonString
       .replace(/\s*\n\s*/g, '') // 去掉换行和换行周围的空格
       .replace(/\s+/g, ''); // 将所有空格都删除


    // 只在 }, 这种形式下添加换行，不单独空出一行所以是一个\n
    // compressed = compressed.replace(/\},/g, '},\n');
    
    
    // 只在 },  { 这种形式下添加换行（包括},与{之间有空白字符的情况）并单独空一行,所以是两个\n
    compressed = compressed.replace(/},\s*(?={)/g, '},\n\n');
 
    
          
    // 处理最后一个 }, 确保它后面有换行
    if (compressed.endsWith('}')) {
        compressed += '\n';
    }

    return compressed;
}

//5. copyemptying.js

// 复制与清空
        function clearInput() {
            document.getElementById('inputText').value = '';
            document.getElementById('outputText').value = '';
            document.getElementById('errorMessage').textContent = '';
        }
        
        function copyOutput() {
            const output = document.getElementById('outputText');
            output.select();
            document.execCommand('copy');
            alert('已复制到剪贴板！');
        }

//6. dropdown-toggle.js
function toggleDropdown(event) {
    event.stopPropagation(); // 阻止事件冒泡
    const subbMenu = event.target.nextElementSibling; // 获取 <a> 标签的下一个兄弟元素（即 .subb）
    if (subbMenu) {
        if (subbMenu.style.display === 'block') {
            subbMenu.style.display = 'none'; // 如果已显示，点击后隐藏
        } else {
            subbMenu.style.display = 'block'; // 如果未显示，点击后显示
        }
    }
}

// 点击空白处隐藏下拉菜单
function toggleDropdown(event) {
    event.stopPropagation(); // 阻止事件冒泡
    const subbMenu = event.target.nextElementSibling; // 获取 <a> 标签的下一个兄弟元素（即 .subb）
    if (subbMenu) {
        if (subbMenu.style.display === 'block') {
            subbMenu.style.display = 'none'; // 如果已显示，点击后隐藏
        } else {
            subbMenu.style.display = 'block'; // 如果未显示，点击后显示
        }
    }
}

// 添加点击空白处隐藏下拉菜单的逻辑
document.addEventListener('click', function(event) {
    const dropdownLinks = document.querySelectorAll('.breadcrumb li a.text-red'); // 获取所有下拉菜单的触发元素
    dropdownLinks.forEach(link => {
        const subbMenu = link.nextElementSibling; // 获取对应的下拉菜单
        if (subbMenu && subbMenu.style.display === 'block') {
            if (!subbMenu.contains(event.target) && !link.contains(event.target)) {
                subbMenu.style.display = 'none'; // 如果点击的位置不在下拉菜单或触发元素内，隐藏下拉菜单
            }
        }
    });
});


//7. encoding.js
// URL编码/解码

function encodeUrl() {
    const input = document.getElementById('inputText').value;
    console.log("进行URL编码的输入:", input);
    document.getElementById('outputText').value = encodeURIComponent(input);
    console.log("编码后的结果:", document.getElementById('outputText').value);
}

function decodeUrl() {
    try {
        const input = document.getElementById('inputText').value;
        console.log("进行URL解码的输入:", input);
        document.getElementById('outputText').value = decodeURIComponent(input);
        console.log("解码后的结果:", document.getElementById('outputText').value);
    } catch (e) {
        document.getElementById('errorMessage').textContent = "解码错误：无效的URL编码";
        console.error("解码错误:", e);
    }
}

//8. formatting.js
// JSON格式化功能
function formatText() {
    const inputText = document.getElementById('inputText').value;
    const indentSize = parseInt(document.getElementById('indent').value, 10);
    const errorMessage = document.getElementById('errorMessage');

    let formattedText = '';

    // 尝试解析 JSON，如果成功则使用 JSON.stringify 格式化
    try {
        const parsedJson = JSON.parse(inputText);
        formattedText = JSON.stringify(parsedJson, null, indentSize);
        errorMessage.textContent = ''; // 清空错误信息
    } catch (error) {
        // 如果 JSON 解析失败，尝试使用 js_beautify 格式化
        errorMessage.textContent = `JSON 解析错误：${error.message}（已尝试按 JavaScript 代码格式化）`;
        formattedText = js_beautify(inputText, indentSize, ' ');
    }

    // 将格式化后的内容输出到文本框
    document.getElementById('outputText').value = formattedText;
}

// 引入 js_beautify 函数
function js_beautify(js_source_text, indent_size, indent_character, indent_level) {
 
    var input, output, token_text, last_type, last_text, last_word, current_mode, modes, indent_string;
    var whitespace, wordchar, punct, parser_pos, line_starters, in_case;
    var prefix, token_type, do_block_just_closed, var_line, var_line_tainted;
 
 
 
    function trim_output() {
        while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string)) {
            output.pop();
        }
    }
 
    function print_newline(ignore_repeated) {
        ignore_repeated = typeof ignore_repeated === 'undefined' ? true : ignore_repeated;
 
        trim_output();
 
        if (!output.length) {
            return; // no newline on start of file
        }
 
        if (output[output.length - 1] !== "\n" || !ignore_repeated) {
            output.push("\n");
        }
        for (var i = 0; i < indent_level; i++) {
            output.push(indent_string);
        }
    }
 
 
 
    function print_space() {
        var last_output = output.length ? output[output.length - 1] : ' ';
        if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) { // prevent occassional duplicate space
            output.push(' ');
        }
    }
 
 
    function print_token() {
        output.push(token_text);
    }
 
    function indent() {
        indent_level++;
    }
 
 
    function unindent() {
        if (indent_level) {
            indent_level--;
        }
    }
 
 
    function remove_indent() {
        if (output.length && output[output.length - 1] === indent_string) {
            output.pop();
        }
    }
 
 
    function set_mode(mode) {
        modes.push(current_mode);
        current_mode = mode;
    }
 
 
    function restore_mode() {
        do_block_just_closed = current_mode === 'DO_BLOCK';
        current_mode = modes.pop();
    }
 
 
    function in_array(what, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === what) {
                return true;
            }
        }
        return false;
    }
 
 
 
    function get_next_token() {
        var n_newlines = 0;
        var c = '';
 
        do {
            if (parser_pos >= input.length) {
                return ['', 'TK_EOF'];
            }
            c = input.charAt(parser_pos);
 
            parser_pos += 1;
            if (c === "\n") {
                n_newlines += 1;
            }
        }
        while (in_array(c, whitespace));
 
        if (n_newlines > 1) {
            for (var i = 0; i < 2; i++) {
                print_newline(i === 0);
            }
        }
        var wanted_newline = (n_newlines === 1);
 
 
        if (in_array(c, wordchar)) {
            if (parser_pos < input.length) {
                while (in_array(input.charAt(parser_pos), wordchar)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos === input.length) {
                        break;
                    }
                }
            }
 
            // small and surprisingly unugly hack for 1E-10 representation
            if (parser_pos !== input.length && c.match(/^[0-9]+[Ee]$/) && input.charAt(parser_pos) === '-') {
                parser_pos += 1;
 
                var t = get_next_token(parser_pos);
                c += '-' + t[0];
                return [c, 'TK_WORD'];
            }
 
            if (c === 'in') { // hack for 'in' operator
                return [c, 'TK_OPERATOR'];
            }
            return [c, 'TK_WORD'];
        }
 
        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }
 
        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }
 
        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }
 
        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }
 
        if (c === ';') {
            return [c, 'TK_END_COMMAND'];
        }
 
        if (c === '/') {
            var comment = '';
            // peek for comment /* ... */
            if (input.charAt(parser_pos) === '*') {
                parser_pos += 1;
                if (parser_pos < input.length) {
                    while (!(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/') && parser_pos < input.length) {
                        comment += input.charAt(parser_pos);
                        parser_pos += 1;
                        if (parser_pos >= input.length) {
                            break;
                        }
                    }
                }
                parser_pos += 2;
                return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
            }
            // peek for comment // ...
            if (input.charAt(parser_pos) === '/') {
                comment = c;
                while (input.charAt(parser_pos) !== "\x0d" && input.charAt(parser_pos) !== "\x0a") {
                    comment += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input.length) {
                        break;
                    }
                }
                parser_pos += 1;
                if (wanted_newline) {
                    print_newline();
                }
                return [comment, 'TK_COMMENT'];
            }
 
        }
 
        if (c === "'" || // string
            c === '"' || // string
            (c === '/' &&
                ((last_type === 'TK_WORD' && last_text === 'return') || (last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EOF' || last_type === 'TK_END_COMMAND')))) { // regexp
            var sep = c;
            var esc = false;
            c = '';
 
            if (parser_pos < input.length) {
 
                while (esc || input.charAt(parser_pos) !== sep) {
                    c += input.charAt(parser_pos);
                    if (!esc) {
                        esc = input.charAt(parser_pos) === '\\';
                    } else {
                        esc = false;
                    }
                    parser_pos += 1;
                    if (parser_pos >= input.length) {
                        break;
                    }
                }
 
            }
 
            parser_pos += 1;
            if (last_type === 'TK_END_COMMAND') {
                print_newline();
            }
            return [sep + c + sep, 'TK_STRING'];
        }
 
        if (in_array(c, punct)) {
            while (parser_pos < input.length && in_array(c + input.charAt(parser_pos), punct)) {
                c += input.charAt(parser_pos);
                parser_pos += 1;
                if (parser_pos >= input.length) {
                    break;
                }
            }
            return [c, 'TK_OPERATOR'];
        }
 
        return [c, 'TK_UNKNOWN'];
    }
 
 
    //----------------------------------
 
    indent_character = indent_character || ' ';
    indent_size = indent_size || 4;
 
    indent_string = '';
    while (indent_size--) {
        indent_string += indent_character;
    }
 
    input = js_source_text;
 
    last_word = ''; // last 'TK_WORD' passed
    last_type = 'TK_START_EXPR'; // last token type
    last_text = ''; // last token text
    output = [];
 
    do_block_just_closed = false;
    var_line = false;
    var_line_tainted = false;
 
    whitespace = "\n\r\t ".split('');
    wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
    punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |='.split(' ');
 
    // words which should always start on new line.
    line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');
 
    // states showing if we are currently in expression (i.e. "if" case) - 'EXPRESSION', or in usual block (like, procedure), 'BLOCK'.
    // some formatting depends on that.
    current_mode = 'BLOCK';
    modes = [current_mode];
 
    indent_level = indent_level || 0;
    parser_pos = 0; // parser position
    in_case = false; // flag for parser that case/default has been processed, and next colon needs special attention
    while (true) {
        var t = get_next_token(parser_pos);
        token_text = t[0];
        token_type = t[1];
        if (token_type === 'TK_EOF') {
            break;
        }
 
        switch (token_type) {
 
            case 'TK_START_EXPR':
                var_line = false;
                set_mode('EXPRESSION');
                if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR') {
                    // do nothing on (( and )( and ][ and ]( ..
                } else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                    print_space();
                } else if (in_array(last_word, line_starters) && last_word !== 'function') {
                    print_space();
                }
                print_token();
                break;
 
            case 'TK_END_EXPR':
                print_token();
                restore_mode();
                break;
 
            case 'TK_START_BLOCK':
 
                if (last_word === 'do') {
                    set_mode('DO_BLOCK');
                } else {
                    set_mode('BLOCK');
                }
                if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                    if (last_type === 'TK_START_BLOCK') {
                        print_newline();
                    } else {
                        print_space();
                    }
                }
                print_token();
                indent();
                break;
 
            case 'TK_END_BLOCK':
                if (last_type === 'TK_START_BLOCK') {
                    // nothing
                    trim_output();
                    unindent();
                } else {
                    unindent();
                    print_newline();
                }
                print_token();
                restore_mode();
                break;
 
            case 'TK_WORD':
 
                if (do_block_just_closed) {
                    print_space();
                    print_token();
                    print_space();
                    break;
                }
 
                if (token_text === 'case' || token_text === 'default') {
                    if (last_text === ':') {
                        // switch cases following one another
                        remove_indent();
                    } else {
                        // case statement starts in the same line where switch
                        unindent();
                        print_newline();
                        indent();
                    }
                    print_token();
                    in_case = true;
                    break;
                }
 
 
                prefix = 'NONE';
                if (last_type === 'TK_END_BLOCK') {
                    if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                        prefix = 'NEWLINE';
                    } else {
                        prefix = 'SPACE';
                        print_space();
                    }
                } else if (last_type === 'TK_END_COMMAND' && (current_mode === 'BLOCK' || current_mode === 'DO_BLOCK')) {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_END_COMMAND' && current_mode === 'EXPRESSION') {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_WORD') {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_START_BLOCK') {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_END_EXPR') {
                    print_space();
                    prefix = 'NEWLINE';
                }
 
                if (last_type !== 'TK_END_BLOCK' && in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                    print_newline();
                } else if (in_array(token_text, line_starters) || prefix === 'NEWLINE') {
                    if (last_text === 'else') {
                        // no need to force newline on else break
                        print_space();
                    } else if ((last_type === 'TK_START_EXPR' || last_text === '=') && token_text === 'function') {
                        // no need to force newline on 'function': (function
                        // DONOTHING
                    } else if (last_type === 'TK_WORD' && (last_text === 'return' || last_text === 'throw')) {
                        // no newline between 'return nnn'
                        print_space();
                    } else if (last_type !== 'TK_END_EXPR') {
                        if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
                            // no need to force newline on 'var': for (var x = 0...)
                            if (token_text === 'if' && last_type === 'TK_WORD' && last_word === 'else') {
                                // no newline for } else if {
                                print_space();
                            } else {
                                print_newline();
                            }
                        }
                    } else {
                        if (in_array(token_text, line_starters) && last_text !== ')') {
                            print_newline();
                        }
                    }
                } else if (prefix === 'SPACE') {
                    print_space();
                }
                print_token();
                last_word = token_text;
 
                if (token_text === 'var') {
                    var_line = true;
                    var_line_tainted = false;
                }
 
                break;
 
            case 'TK_END_COMMAND':
 
                print_token();
                var_line = false;
                break;
 
            case 'TK_STRING':
 
                if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK') {
                    print_newline();
                } else if (last_type === 'TK_WORD') {
                    print_space();
                }
                print_token();
                break;
 
            case 'TK_OPERATOR':
 
                var start_delim = true;
                var end_delim = true;
                if (var_line && token_text !== ',') {
                    var_line_tainted = true;
                    if (token_text === ':') {
                        var_line = false;
                    }
                }
 
                if (token_text === ':' && in_case) {
                    print_token(); // colon really asks for separate treatment
                    print_newline();
                    break;
                }
 
                in_case = false;
 
                if (token_text === ',') {
                    if (var_line) {
                        if (var_line_tainted) {
                            print_token();
                            print_newline();
                            var_line_tainted = false;
                        } else {
                            print_token();
                            print_space();
                        }
                    } else if (last_type === 'TK_END_BLOCK') {
                        print_token();
                        print_newline();
                    } else {
                        if (current_mode === 'BLOCK') {
                            print_token();
                            print_newline();
                        } else {
                            // EXPR od DO_BLOCK
                            print_token();
                            print_space();
                        }
                    }
                    break;
                } else if (token_text === '--' || token_text === '++') { // unary operators special case
                    if (last_text === ';') {
                        // space for (;; ++i)
                        start_delim = true;
                        end_delim = false;
                    } else {
                        start_delim = false;
                        end_delim = false;
                    }
                } else if (token_text === '!' && last_type === 'TK_START_EXPR') {
                    // special case handling: if (!a)
                    start_delim = false;
                    end_delim = false;
                } else if (last_type === 'TK_OPERATOR') {
                    start_delim = false;
                    end_delim = false;
                } else if (last_type === 'TK_END_EXPR') {
                    start_delim = true;
                    end_delim = true;
                } else if (token_text === '.') {
                    // decimal digits or object.property
                    start_delim = false;
                    end_delim = false;
 
                } else if (token_text === ':') {
                    // zz: xx
                    // can't differentiate ternary op, so for now it's a ? b: c; without space before colon
                    if (last_text.match(/^\d+$/)) {
                        // a little help for ternary a ? 1 : 0;
                        start_delim = true;
                    } else {
                        start_delim = false;
                    }
                }
                if (start_delim) {
                    print_space();
                }
 
                print_token();
 
                if (end_delim) {
                    print_space();
                }
                break;
 
            case 'TK_BLOCK_COMMENT':
 
                print_newline();
                print_token();
                print_newline();
                break;
 
            case 'TK_COMMENT':
 
                // print_newline();
                print_space();
                print_token();
                print_newline();
                break;
 
            case 'TK_UNKNOWN':
                print_token();
                break;
        }
 
        last_type = token_type;
        last_text = token_text;
    }
 
    return output.join('');
 
}

// 修复层级缩进（保留原有逻辑，用于简单格式化）
function fixIndentation(jsonString, indentSize) {
    const lines = jsonString.split('\n');
    let fixedJson = '';
    let currentIndentLevel = 0;

    // 遍历每一行
    lines.forEach((line) => {
        const trimmedLine = line.trim();

        // 处理闭合符号
        if (trimmedLine.endsWith('{') || trimmedLine.endsWith('[')) {
            // 开头的 { 或 [，增加缩进
            fixedJson += ' '.repeat(currentIndentLevel * indentSize) + trimmedLine + '\n';
            currentIndentLevel++;
        } else if (trimmedLine.endsWith('}') || trimmedLine.endsWith(']') || trimmedLine.startsWith('},') || trimmedLine.startsWith('],')) {
            // 结尾的 } 或 ]，或者 }, 或 ],，减少缩进
            currentIndentLevel--;
            fixedJson += ' '.repeat(currentIndentLevel * indentSize) + trimmedLine + '\n';
        } else {
            // 普通行，按当前缩进层级处理
            fixedJson += ' '.repeat(currentIndentLevel * indentSize) + trimmedLine + '\n';
        }
    });

    return fixedJson.trim(); // 去掉最后的空行
}

// 分块处理大文件
function formatLargeText(inputText, indentSize) {
    const chunkSize = 10000; // 每块的大小
    let formattedText = '';
    let position = 0;

    while (position < inputText.length) {
        const chunk = inputText.slice(position, position + chunkSize);
        formattedText += js_beautify(chunk, indentSize, ' ');
        position += chunkSize;
    }

    return formattedText;
}

// 修改 formatText 函数以支持大文件
function formatText() {
    const inputText = document.getElementById('inputText').value;
    const indentSize = parseInt(document.getElementById('indent').value, 10);
    const errorMessage = document.getElementById('errorMessage');

    let formattedText = '';

    // 尝试解析 JSON，如果成功则使用 JSON.stringify 格式化
    try {
        const parsedJson = JSON.parse(inputText);
        formattedText = JSON.stringify(parsedJson, null, indentSize);
        errorMessage.textContent = ''; // 清空错误信息
    } catch (error) {
        // 如果 JSON 解析失败，尝试使用 js_beautify 格式化
        errorMessage.textContent = `JSON 解析错误：${error.message}（已尝试按 JavaScript 代码格式化）`;

        // 如果是大文件，分块处理
        if (inputText.length > 100000) { // 100KB 以上的文件视为大文件
            formattedText = formatLargeText(inputText, indentSize);
        } else {
            formattedText = js_beautify(inputText, indentSize, ' ');
        }
    }

    // 将格式化后的内容输出到文本框
    document.getElementById('outputText').value = formattedText;
}

//9.gzip.js
// Gzip 加密
function encodeGzip() {
    try {
        const input = document.getElementById('inputText').value;
        if (!input) {
            throw new Error("输入内容不能为空！");
        }

        // 将字符串转换为 Uint8Array
        const data = new TextEncoder().encode(input);

        // 使用 pako 进行 Gzip 压缩
        const compressed = pako.gzip(data);

        // 将压缩后的数据转换为 Base64 字符串
        const base64String = btoa(String.fromCharCode.apply(null, compressed));

        // 显示结果
        document.getElementById('outputText').value = base64String;
        document.getElementById('errorMessage').textContent = '';
    } catch (e) {
        document.getElementById('errorMessage').textContent = "Gzip 加密错误：" + e.message;
    }
}

// Gzip 解密
function decodeGzip() {
    try {
        const input = document.getElementById('inputText').value;
        if (!input) {
            throw new Error("输入内容不能为空！");
        }

        // 将 Base64 字符串转换为 Uint8Array
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // 使用 pako 进行 Gzip 解压
        const decompressed = pako.ungzip(bytes);

        // 将解压后的数据转换为字符串
        const output = new TextDecoder().decode(decompressed);

        // 显示结果
        document.getElementById('outputText').value = output;
        document.getElementById('errorMessage').textContent = '';
    } catch (e) {
        document.getElementById('errorMessage').textContent = "Gzip 解密错误：" + e.message;
    }
}

//10. hex.js
// 16进制转字符串
function encodehex() {
    console.log("调用了 encodehex() 函数"); // 调试信息
    const input = document.getElementById('inputText').value.trim();
    const outputText = document.getElementById('outputText');
    const errorMessage = document.getElementById('errorMessage');

    // 清空错误信息
    errorMessage.textContent = '';

    try {
        // 检查输入是否为有效的16进制字符串
        if (!/^[0-9a-fA-F]+$/i.test(input)) {
            throw new Error('输入内容不是有效的16进制字符串！');
        }

        // 将16进制字符串转换为字符串
        let result = '';
        for (let i = 0; i < input.length; i += 2) {
            const hexPair = input.substr(i, 2);
            const char = String.fromCharCode(parseInt(hexPair, 16));
            result += char;
        }

        outputText.value = result;
        console.log("转换结果：", result); // 调试信息
    } catch (error) {
        errorMessage.textContent = error.message;
        console.error("发生错误：", error.message); // 调试信息
    }
}

// 字符串转16进制
function decodehex() {
    console.log("调用了 decodehex() 函数"); // 调试信息
    const input = document.getElementById('inputText').value.trim();
    const outputText = document.getElementById('outputText');
    const errorMessage = document.getElementById('errorMessage');

    // 清空错误信息
    errorMessage.textContent = '';

    try {
        // 将字符串转换为16进制字符串
        let result = '';
        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            const hexValue = charCode.toString(16).padStart(2, '0');
            result += hexValue;
        }

        outputText.value = result.toUpperCase(); // 输出为大写的16进制形式
        console.log("转换结果：", result.toUpperCase()); // 调试信息
    } catch (error) {
        errorMessage.textContent = error.message;
        console.error("发生错误：", error.message); // 调试信息
    }
}
//11.Unicode.js
// Unicode与中文互转 (改进版)
function encodeUnicode() {
    try {
        const input = document.getElementById('inputText').value;
        console.log("进行Unicode编码的输入:", input);
        
        let encoded = '';
        for (let i = 0; i < input.length; i++) {
            const code = input.charCodeAt(i);
            if (code >= 0xD800 && code <= 0xDBFF) {
                // 高代理项（High Surrogate）
                const nextCode = input.charCodeAt(i + 1);
                if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
                    // 低代理项（Low Surrogate），组合成代理对
                    encoded += `\\u${code.toString(16).padStart(4, '0')}`;
                    encoded += `\\u${nextCode.toString(16).padStart(4, '0')}`;
                    i++; // 跳过下一个字符（已处理）
                }
            } else {
                // 基本平面字符（BMP）
                encoded += `\\u${code.toString(16).padStart(4, '0')}`;
            }
        }
        
        document.getElementById('outputText').value = encoded;
        console.log("编码后的结果:", encoded);
        document.getElementById('errorMessage').textContent = "";
    } catch (e) {
        document.getElementById('errorMessage').textContent = "编码错误：无效的输入";
        console.error("编码错误:", e);
    }
}

function decodeUnicode() {
    try {
        const input = document.getElementById('inputText').value;
        console.log("进行Unicode解码的输入:", input);
        const decoded = input.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g, (_, p1, p2) => {
            const codePoint = parseInt(p1 || p2, 16);
            return String.fromCodePoint(codePoint);
        });
        
        document.getElementById('outputText').value = decoded;
        console.log("解码后的结果:", decoded);
        document.getElementById('errorMessage').textContent = "";
    } catch (e) {
        document.getElementById('errorMessage').textContent = "解码错误：无效的Unicode编码";
        console.error("解码错误:", e);
    }
}


//12. punycode.js

// Punycode编码/解码
function encodePunycode() {
  const input = document.getElementById('inputText').value;
  console.log("进行 Punycode 编码的输入:", input);
  
  if (input === '') {
    document.getElementById('errorMessage').textContent = "请输入有效的Unicode域名——中文/日文/韩文等域名，如：百度.中国";
    return;
  }
  
  try {
    const encoded = punycode.toASCII(input);
    document.getElementById('outputText').value = encoded;
    console.log("编码后的结果:", encoded);
    document.getElementById('errorMessage').textContent = '';
  } catch (e) {
    document.getElementById('errorMessage').textContent = "编码错误：" + e.message;
    console.error("编码错误:", e);
  }
}

function decodePunycode() {
  const input = document.getElementById('inputText').value;
  console.log("进行 Punycode 解码的输入:", input);
  
  if (input === '') {
    document.getElementById('errorMessage').textContent = "请输入有效的 ASCII域名";
    return;
  }
  
  try {
    const decoded = punycode.toUnicode(input);
    document.getElementById('outputText').value = decoded;
    console.log("解码后的结果:", decoded);
    document.getElementById('errorMessage').textContent = '';
  } catch (e) {
    document.getElementById('errorMessage').textContent = "解码错误：" + e.message;
    console.error("解码错误:", e);
  }
}