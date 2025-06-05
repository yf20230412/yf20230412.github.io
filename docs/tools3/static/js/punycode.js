// Punycode编码/解码
function encodePunycode() {
  try {
    const input = document.getElementById('inputText').value;
    console.log("进行Punycode编码的输入:", input);
    const encoded = punycode.toASCII(input);
    document.getElementById('outputText').value = encoded;
    console.log("编码后的结果:", document.getElementById('outputText').value);
  } catch (e) {
    document.getElementById('errorMessage').textContent = "编码错误：无效的输入";
    console.error("编码错误:", e);
  }
}

function decodePunycode() {
  try {
    const input = document.getElementById('inputText').value;
    console.log("进行Punycode解码的输入:", input);
    const decoded = punycode.toUnicode(input);
    document.getElementById('outputText').value = decoded;
    console.log("解码后的结果:", document.getElementById('outputText').value);
  } catch (e) {
    document.getElementById('errorMessage').textContent = "解码错误：无效的Punycode编码";
    console.error("解码错误:", e);
  }
}