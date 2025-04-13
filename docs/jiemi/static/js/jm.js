var inputField = document.getElementById("input-field");
var clearInputButton = document.getElementById("clear-input-button");
var optionsList = document.getElementById("optionsList");

inputField.addEventListener("input", function() {
    if (inputField.value.trim() !== "") {
        clearInputButton.style.display = "flex";
    } else {
        clearInputButton.style.display = "none";
    }
});

function clearInput() {
    inputField.value = "";
    clearInputButton.style.display = "none";
    optionsList.style.display = "none"; // 清空输入框时隐藏选项列表
}

// 缓存数据，避免重复请求
let cachedData = null;

async function fetchData() {
    // 如果已有缓存，直接返回
    if (cachedData) return cachedData;

    try {
        const response = await fetch('./static/js/M.json', {
            cache: 'no-store', // 😍禁用缓存，确保获取最新数据
        });

        if (!response.ok) throw new Error(`HTTP 错误！状态码: ${response.status}`);

        const data = await response.json();
        cachedData = data; // 缓存数据
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error; // 抛出错误，由调用者处理
    }
}

function renderOptions(data) {
    const optionsList = document.getElementById('optionsList');
    const inputContainer = document.getElementById('input-container');

    optionsList.innerHTML = '';
    optionsList.style.width = `${inputContainer.offsetWidth}px`;

    if (data.urls && data.urls.length > 0) {
        data.urls.forEach(item => {
            const option = document.createElement('div');
            option.classList.add('option');
            option.onclick = () => selectOption(item.url);

            const name = document.createElement('span');
            name.textContent = item.name;

            const url = document.createElement('span');
            url.textContent = item.url;
            url.classList.add('url');

            const scrollable = document.createElement('div');
            scrollable.classList.add('scrollable');
            scrollable.appendChild(url);

            option.appendChild(name);
            option.appendChild(scrollable);
            optionsList.appendChild(option);
        });
    } else {
        optionsList.innerHTML = '<div class="error">无可用数据</div>';
    }
}

function toggleOptions() {
    const optionsList = document.getElementById('optionsList');

    if (optionsList.style.display === 'block') {
        optionsList.style.display = 'none';
        return;
    }

    // 显示加载状态
    optionsList.innerHTML = '<div class="loading">加载中...</div>';
    optionsList.style.display = 'block';

    fetchData()
        .then(data => {
            renderOptions(data);
        })
        .catch(error => {
            console.error('加载失败:', error);
            optionsList.innerHTML = '<div class="error">加载失败，请刷新重试</div>';
        });
}



// 选择选项并更新输入框
function selectOption(url) {
    inputField.value = url; // 将选择的URL填充到输入框中
    optionsList.style.display = 'none'; // 隐藏选项列表
    clearInputButton.style.display = "flex"; // 激活清除按钮
}

// 点击输入框外部时关闭选项列表
document.addEventListener('click', function(event) {
    if (!event.target.closest('#input-wrapper')) {
        optionsList.style.display = 'none'; // 否则隐藏选项列表
    }
});

function getIPTV() {
    var input = inputField.value;

    if (input === "") {
        showErrorMessage("请输入接口链接！");
        return;
    }

    document.getElementById("loading-message").style.display = "block";
    document.getElementById("error-message").style.display = "none";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://www.2015888.xyz/jiemi/get_jiemi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("url=" + input);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            document.getElementById("loading-message").style.display = "none";

            if (xhr.status == 200) {
                var response = xhr.responseText;
                if (response.trim() === "") {
                    showErrorMessage("脚本未获取到内容，请检查链接是否正确。");
                } else {
                    try {
                        // 尝试解析JSON字符串
                        var jsonObject = JSON.parse(response);
                        // 格式化JSON字符串，缩进为2个空格
                        var formattedResponse = JSON.stringify(jsonObject, null, 2);
                        // 将格式化后的字符串赋值到output中
                        document.getElementById("output").value = formattedResponse;
                    } catch (error) {
                        // 如果解析失败，直接显示原始响应内容
                        document.getElementById("output").value = response;
                        showErrorMessage("JSON解析失败，请检查网络或稍后重试。");
                    }
                }
            } else {
                showErrorMessage("请求失败，状态码：" + xhr.status + "，请检查网络或稍后重试。");
            }
        }
    };
}




function toggleLoading(isLoading) {
    if (isLoading) {
        document.body.style.cursor = "progress";
    } else {
        document.body.style.cursor = "default";
    }
}

function copyInput() {
    if (inputField.value === "") {
        showErrorMessage("输入框为空，无法复制！");
        return;
    }
    inputField.select();
    document.execCommand("copy");
    alert("已复制接口链接到剪贴板！");
}

function copyOutput() {
    var outputField = document.getElementById("output");
    if (outputField.value.trim() === "") {
        showErrorMessage("输出框为空，无法复制！");
        return;
    }
    outputField.select();
    document.execCommand("copy");
    alert("已复制内容到剪贴板！");
}



// 下载jar（支持重定向）
function downloadJar() {
    const outputField = document.getElementById("output");
    const inputField = document.getElementById("input-field");
    const outputContent = outputField.value;
    const inputContent = inputField.value;

    // 验证输入
    if (!outputContent.trim()) {
        alert("输出框为空，无法提取链接！");
        return;
    }
    if (!inputContent.trim()) {
        alert("输入框为空，无法获取链接！");
        return;
    }

    // 提取spider链接
    const linkMatch = outputContent.match(/"spider":\s*"(.*?)(?=[";])/);
    if (!linkMatch?.[1]) {
        alert("输出框中未找到spider属性下的链接！");
        return;
    }

    // 构建完整URL
    let fileLink = buildFileLink(linkMatch[1].trim(), inputContent);
    if (!fileLink) return;

    // 处理重定向下载
    handleRedirectDownload(fileLink);
}

// 构建文件链接
function buildFileLink(spiderLink, baseContent) {
    if (spiderLink.startsWith("http")) {
        return spiderLink;
    }
    if (spiderLink.startsWith("./")) {
        const baseMatch = baseContent.match(/(https?:\/\/[^/]+\/)/);
        if (!baseMatch) {
            alert("未找到基础链接！");
            return null;
        }
        return baseMatch[1] + spiderLink.slice(2);
    }
    alert("不支持的链接格式！");
    return null;
}

// 处理重定向下载
async function handleRedirectDownload(originalUrl) {
    try {
        // 第一步：检查重定向
        const finalUrl = await getFinalUrl(originalUrl);
        
        // 第二步：用户确认
        if (finalUrl !== originalUrl) {
            if (!confirm(`链接已重定向到：\n${finalUrl}\n\n是否下载？`)) return;
        } else {
            alert(`即将下载：${finalUrl}`);
        }

        // 第三步：执行下载
        await attemptDownload(finalUrl);
        
    } catch (error) {
        alert(`下载失败：${error.message}\n最后尝试直接下载...`);
        window.open(originalUrl, "_blank"); // 终极回退方案
    }
}

// 获取最终URL（处理重定向）
async function getFinalUrl(url) {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'manual',
            headers: { 'User-Agent': 'okhttp' }
        });

        // 处理重定向
        if (response.status >= 300 && response.status < 400) {
            const redirectUrl = response.headers.get('Location');
            if (redirectUrl) {
                return redirectUrl.startsWith('http') 
                    ? redirectUrl 
                    : new URL(redirectUrl, url).href;
            }
        }
        return url;
    } catch {
        return url; // 如果检查失败，返回原URL
    }
}

// 尝试多种下载方式
async function attemptDownload(url) {
    // 方法1：直接下载（最快）
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'file.jar';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => link.remove(), 100);
        return;
    } catch (error) {
        console.log('直接下载失败，尝试Blob方式...');
    }

    // 方法2：Blob下载（需要UA）
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'okhttp' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = url.split('/').pop() || 'file.jar';
        link.click();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
        throw new Error(`Blob下载失败：${error.message}`);
    }
}











//一键清空
function clearOutput() {
    var inputField = document.getElementById("input-field");
    var outputField = document.getElementById("output");

    // 检查输入框和输出框是否都为空
    if (inputField.value.trim() === "" && outputField.value.trim() === "") {
        showErrorMessage("无数据，无需清空！😂"); // 提示错误信息
        return;
    }

    // 清空输入框和输出框
    inputField.value = "";
    outputField.value = "";
    clearInputButton.style.display = "none";
    optionsList.style.display = 'none'; // 清空输出时隐藏选项列表
}

function showErrorMessage(message) {
    var errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

document.getElementById("output").readOnly = true;