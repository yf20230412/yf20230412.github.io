// URL编码/解码
        function encodeString() {
            const input = document.getElementById('inputText').value;
            document.getElementById('outputText').value = encodeURIComponent(input);
        }
        
        function decodeString() {
            try {
                const input = document.getElementById('inputText').value;
                document.getElementById('outputText').value = decodeURIComponent(input);
            } catch (e) {
                document.getElementById('errorMessage').textContent = "解码错误：无效的URL编码";
            }
        }