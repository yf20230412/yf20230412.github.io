// JSON格式化功能
              function formatText() {
            const inputText = document.getElementById('inputText').value;
            const indentSize = parseInt(document.getElementById('indent').value, 10);
            const errorMessage = document.getElementById('errorMessage');
        
            try {
        // 尝试解析输入的 JSON 字符串
        JSON.parse(inputText);
        errorMessage.textContent = ''; // 清空错误信息
            } catch (error) {
        // 如果 JSON 无效，显示错误信息
        errorMessage.textContent = `JSON 解析错误：${error.message}`;
            }
        
            // 无论 JSON 是否有效，都执行格式化缩进
            const formattedText = fixIndentation(inputText, indentSize);
            document.getElementById('outputText').value = formattedText;
        }
        
        // 修复层级缩进
        function fixIndentation(jsonString, indentSize) {
            const lines = jsonString.split('\n');
            let fixedJson = '';
            let currentIndentLevel = 0;
        
            // 遍历每一行
            lines.forEach((line) => {
        const trimmedLine = line.trim();
        
        // 处理闭合符号
        if (trimmedLine === '{' || trimmedLine === '[') {
            // 开头的 { 或 [，不缩进
            fixedJson += trimmedLine + '\n';
            currentIndentLevel++;
        } else if (trimmedLine === '}' || trimmedLine === ']' || trimmedLine.startsWith('},') || trimmedLine.startsWith('],')) {
            // 结尾的 } 或 ]，或者 }, 或 ],，不缩进
            currentIndentLevel--;
            fixedJson += trimmedLine + '\n'; // 清除前面的缩进空格
        } else {
            // 普通行，按当前缩进层级处理
            fixedJson += ' '.repeat(currentIndentLevel * indentSize) + trimmedLine + '\n';
        }
            });
        
            return fixedJson.trim(); // 去掉最后的空行
        }