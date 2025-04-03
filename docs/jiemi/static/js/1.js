// 获取前端传递的链接
const link = new URLSearchParams(window.location.search).get('link');

if (!link) {
  showError('链接不能为空', link);
  return;
}

// 初始化 fetch 请求
const fetchOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: {
    'User-Agent': 'okhttp/5.0.0-alpha.14',
    'Accept': '*/*' // 这里表示接受所有类型的内容，可以根据需要更改为特定的MIME类型
  }
};

// 执行 fetch 请求（不使用 CORS 代理）
fetch(link, fetchOptions)
  .then(response => {
    // 检查响应状态码是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 获取最终的真实链接
    const realLink = response.url;
    showSuccess(realLink, link);
  })
  .catch(error => {
    showError(`fetch 错误: ${error.message}`, link);
  });

// 显示错误信息
function showError(message, originalLink) {
  console.error(message);
  alert(`错误: ${message}\n原始链接: ${originalLink}`);
}

// 显示成功信息
function showSuccess(realLink, originalLink) {
  console.log(`真实链接: ${realLink}\n原始链接: ${originalLink}`);
  alert(`真实链接: ${realLink}\n原始链接: ${originalLink}`);
}