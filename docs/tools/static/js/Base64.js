// Base64 编码
        function encodeBase64() {
            const inputText = document.getElementById('inputText').value;
            try {
                const encodedText = btoa(encodeURIComponent(inputText)); // 先进行URI编码，再进行Base64编码
                document.getElementById('outputText').value = encodedText;
                document.getElementById('errorMessage').textContent = '';
            } catch (error) {
                document.getElementById('errorMessage').textContent = '编码失败：输入内容包含非ASCII字符';
            }
        }

        // Base64 解码
        function decodeBase64() {
            const inputText = document.getElementById('inputText').value;
            try {
                const decodedText = decodeURIComponent(atob(inputText)); // 先进行Base64解码，再进行URI解码
                document.getElementById('outputText').value = decodedText;
                document.getElementById('errorMessage').textContent = '';
            } catch (error) {
                document.getElementById('errorMessage').textContent = '解码失败：输入内容不是有效的Base64编码';
            }
        }