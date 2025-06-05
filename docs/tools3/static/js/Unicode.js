// Unicode与中文互转
function encodeUnicode() {
    try {
        const input = document.getElementById('inputText').value;
        console.log("进行Unicode编码的输入:", input);
        const encoded = escape(input).replace(/%u/g, "\\u");
        document.getElementById('outputText').value = encoded;
        console.log("编码后的结果:", document.getElementById('outputText').value);
    } catch (e) {
        document.getElementById('errorMessage').textContent = "编码错误：无效的输入";
        console.error("编码错误:", e);
    }
}

function decodeUnicode() {
    try {
        const input = document.getElementById('inputText').value;
        console.log("进行Unicode解码的输入:", input);
        const decoded = unescape(input.replace(/\\u/g, "%u"));
        document.getElementById('outputText').value = decoded;
        console.log("解码后的结果:", document.getElementById('outputText').value);
    } catch (e) {
        document.getElementById('errorMessage').textContent = "解码错误：无效的Unicode编码";
        console.error("解码错误:", e);
    }
}