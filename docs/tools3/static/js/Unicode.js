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