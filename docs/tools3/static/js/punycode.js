// Punycode编码/解码
function encodePunycode() {
  const input = document.getElementById('inputText').value;
  console.log("进行 Punycode 编码的输入:", input);
  
  if (input === '') {
    document.getElementById('errorMessage').textContent = "请输入有效的Unicode域名——中文/日文/韩文等域名，如：百度.中国";
    return;
  }
  
  try {
    const encoded = punycode.toASCII(input);
    document.getElementById('outputText').value = encoded;
    console.log("编码后的结果:", encoded);
    document.getElementById('errorMessage').textContent = '';
  } catch (e) {
    document.getElementById('errorMessage').textContent = "编码错误：" + e.message;
    console.error("编码错误:", e);
  }
}

function decodePunycode() {
  const input = document.getElementById('inputText').value;
  console.log("进行 Punycode 解码的输入:", input);
  
  if (input === '') {
    document.getElementById('errorMessage').textContent = "请输入有效的 ASCII域名";
    return;
  }
  
  try {
    const decoded = punycode.toUnicode(input);
    document.getElementById('outputText').value = decoded;
    console.log("解码后的结果:", decoded);
    document.getElementById('errorMessage').textContent = '';
  } catch (e) {
    document.getElementById('errorMessage').textContent = "解码错误：" + e.message;
    console.error("解码错误:", e);
  }
}