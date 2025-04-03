// 允许跨域请求
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

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
    'User-Agent': 'okhttp/5.0.0-alpha.14'
  }
};

// 忽略 SSL 证书验证
if (link.startsWith('https://')) {
  fetchOptions.agent = new HttpsProxyAgent(corsProxy);
}

// 执行 fetch 请求
fetch(corsProxy + link, fetchOptions)
  .then(response => {
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