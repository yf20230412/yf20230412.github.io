// 普通压缩功能
        function compressText() {
            const inputText = document.getElementById('inputText').value;
            const errorMessage = document.getElementById('errorMessage');
        
            try {
        // 尝试解析输入的 JSON 字符串
        JSON.parse(inputText);
        errorMessage.textContent = ''; // 清空错误信息
            } catch (error) {
        // 如果 JSON 无效，显示错误信息
        errorMessage.textContent = `压缩错误：${error.message}`;
            }
        
            // 无论 JSON 是否有效，都执行压缩操作
            const compressedText = compressJson(inputText);
            document.getElementById('outputText').value = compressedText;
        }
        
        // 压缩 JSON 字符串
        function compressJson(jsonString) {
            // 去掉所有空格和空行
            let compressed = jsonString.replace(/\s+/g, '');
        
            // 在 }, ], ]}, }}}, 等情况下添加换行
            compressed = compressed.replace(/([}\]])+,/g, '$1,\n');
        
            return compressed;
        }