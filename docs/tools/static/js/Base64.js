// Base64 编码
function encodeBase64() {
    const inputText = document.getElementById('inputText').value;
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
    const inputText = document.getElementById('inputText').value;
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
