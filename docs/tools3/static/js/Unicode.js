// Unicode与中文互转 (改进版)
function encodeUnicode() {
    try {
        const input = document.getElementById('inputText').value;
        console.log("进行Unicode编码的输入:", input);
        const encoded = Array.from(input).map(char => 
            char.codePointAt(0) > 0xFFFF 
                ? `\\u{${char.codePointAt(0).toString(16)}}`  // 处理辅助平面字符
                : `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
        ).join('');
        
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