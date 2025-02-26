// 屏蔽F12和右键
function click(e) {
    if (document.all) {
        if (event.button == 2 || event.button == 3) {
            alert("你想干什么？");
            return false;
        }
    } else if (document.layers) {
        if (e.which == 3) {
            return false;
        }
    }
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
}

document.oncontextmenu = function() {
    return false;
};

document.onkeydown = function(e) {
    if (window.event) {
        e = window.event;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 67 || e.keyCode === 73)) {
        alert("快捷键已禁用");//禁用Ctrl+Shift+C和Ctrl+Shift+I
        return false;
    }
};

// 屏蔽F12键的打开控制台功能
document.onkeydown = function(e) {
    if (window.event) {
        e = window.event;
    }
    if (e.keyCode === 123) {
        return false;
    }
};


/*
// 检测开发者工具
setInterval(function() {
    const devToolsOpened = /./.test.toString().length !== 33;
    if (devToolsOpened) {
        alert('开发者工具已打开，请关闭后继续浏览！');
        window.location.reload();
    }
}, 1000);
*/