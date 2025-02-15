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
    const allControls = ['jsonControls', 'urlControls', 'base64Controls', 'gzipControls', 'tvboxControls'];
    allControls.forEach(id => {
        document.getElementById(id).style.display = id === controlsId ? 'flex' : 'none';
    });

    // 显示或隐藏交换按钮
    document.getElementById('swapButton').style.display = showSwapButton ? 'inline-block' : 'none';

    // 设置菜单项的激活状态
    const allLinks = ['jsonFormatLink', 'urlLink', 'base64Link', 'gzipLink', 'tvboxLink'];
    allLinks.forEach(id => {
        document.getElementById(id).classList.toggle('active', id === activeLinkId);
    });

    // 清空错误提示
    document.getElementById('errorMessage').textContent = '';
}

// 激活 JSON 格式化功能
function activateJsonFormat() {
    activateFunction(
        "输入JSON内容...",
        "格式化或压缩后的JSON...",
        "jsonControls",
        "jsonFormatLink"
    );
}

// 激活 Url 编码解码功能
function activateUrl() {
    activateFunction(
        "输入需要Url编码或解码的内容...",
        "Url处理结果...",
        "urlControls",
        "urlLink"
    );
}

// 激活 Base64 编码解码功能
function activateBase64() {
    activateFunction(
        "输入需要Base64编码或解码的内容...",
        "Base64处理结果...",
        "base64Controls",
        "base64Link",
        true // 显示交换按钮
    );
}

// 激活 Gzip 加密解密功能
function activateGzip() {
    activateFunction(
        "输入需要 Gzip 加密或解密的内容...",
        "Gzip 处理结果...",
        "gzipControls",
        "gzipLink",
        true // 显示交换按钮
    );
}

function activatetvbox() {
    activateFunction(
        "tvboxControls",
        "tvboxFormatLink"
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