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