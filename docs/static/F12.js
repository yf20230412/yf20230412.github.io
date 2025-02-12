//屏蔽F12和右键
function click(e) {
    if (document.all) {
        if (event.button == 2 || event.button == 3) {
            alert("你想干什么？");
            oncontextmenu = 'return false';
        }
    }
    if (document.layers) {
        if (e.which == 3) {
            oncontextmenu = 'return false';
        }
    }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
}
document.onmousedown = click;
document.oncontextmenu = new Function("return false;")
document.onkeydown = document.onkeyup = document.onkeypress = function() {
    if (window.event.keyCode == 123) {
        window.event.returnValue = false;
        return (false);
    }
}


// 检测开发者工具
setInterval(function() {
    const devToolsOpened = /./.test.toString().length !== 33;
    if (devToolsOpened) {
        alert('开发者工具已打开，请关闭后继续浏览！');
        window.location.reload();
    }
}, 1000);