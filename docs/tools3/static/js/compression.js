// 普通压缩功能
function compressText() {
    const inputText = document.getElementById('inputText').value;
    const errorMessage = document.getElementById('errorMessage');

    // 检查输入是否为有效 JSON
    try {
        JSON.parse(inputText);
        // 如果有效，清空错误信息
        errorMessage.textContent = '';
    } catch (error) {
        // 如果无效，显示错误信息
        errorMessage.textContent = `压缩错误：${error.message}`;
    }

    // 无论输入是否有效，都执行压缩操作
    const compressedText = compressJson(inputText);
    document.getElementById('outputText').value = compressedText;
}

// 压缩 JSON 字符串
function compressJson(jsonString) {
    // 去掉多余的空格和空行，但保留符号
    let compressed = jsonString
       .replace(/\s*\n\s*/g, '') // 去掉换行和换行周围的空格
       .replace(/\s+/g, ''); // 将所有空格都删除


    // 只在 }, 这种形式下添加换行，不单独空出一行所以是一个\n
    // compressed = compressed.replace(/\},/g, '},\n');
    
    
    // 只在 },  { 这种形式下添加换行（包括},与{之间有空白字符的情况）并单独空一行,所以是两个\n
    compressed = compressed.replace(/},\s*(?={)/g, '},\n\n');
 
    
          
    // 处理最后一个 }, 确保它后面有换行
    if (compressed.endsWith('}')) {
        compressed += '\n';
    }

    return compressed;
}
