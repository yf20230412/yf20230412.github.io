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