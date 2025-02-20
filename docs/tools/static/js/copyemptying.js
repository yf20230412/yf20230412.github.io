// 复制与清空
        function clearInput() {
            document.getElementById('inputText').value = '';
            document.getElementById('outputText').value = '';
            document.getElementById('errorMessage').textContent = '';
        }
        
        function copyOutput() {
            const output = document.getElementById('outputText');
            output.select();
            document.execCommand('copy');
            alert('已复制到剪贴板！');
        }