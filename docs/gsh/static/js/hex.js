//16进制转字符串
function encodehex() {
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
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}


//字符串转16进制
function decodehex() {
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
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
