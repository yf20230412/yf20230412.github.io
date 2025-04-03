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
    xhr.open("POST", "https://2015888.xyz/jiemi/get_jiemi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("url=" + input);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            document.getElementById("loading-message").style.display = "none";

            if (xhr.status == 200) {
                var response = xhr.responseText;
                if (response.trim() === "") {
                    showErrorMessage("PHP脚本未获取到内容，请检查链接是否正确。");
                } else {
                    document.getElementById("output").value = response;
                }
            } else {
                showErrorMessage("请求失败，请检查网络或稍后重试。");
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



//下载jar
function downloadJar() {
    var outputField = document.getElementById("output");
    var inputField = document.getElementById("input-field");
    var outputContent = outputField.value;
    var inputContent = inputField.value;

    if (outputContent.trim() === "") {
        alert("输出框为空，无法提取链接！");
        return;
    }

    if (inputContent.trim() === "") {
        alert("输入框为空，无法获取链接！");
        return;
    }

    // 从输出框中提取 spider 属性下的链接（使用正则）
    var linkMatch = outputContent.match(/"spider":\s*"(.*?)(?=[";])/);
    var fileLink = null;

    if (linkMatch && linkMatch[1]) {
        var spiderLink = linkMatch[1].trim(); // 提取的内容

        // 检查是否是以 http 或 https 开头
        if (spiderLink.startsWith("http://") || spiderLink.startsWith("https://")) {
            fileLink = spiderLink; // 直接使用该链接
        }
        // 检查是否是以 ./ 开头
        else if (spiderLink.startsWith("./")) {
            // 提取相对路径
            var relativePath = spiderLink.substring(2); // 去掉 './'

            // 从输入框中提取基础链接（使用正则）
            var baseLinkMatch = inputContent.match(/(http[s]?:\/\/[^\/]+\/[^\/]*)\//);
            if (!baseLinkMatch || !baseLinkMatch[1]) {
                alert("未找到基础链接，无法构建完整链接！");
                return;
            }
            var baseLink = baseLinkMatch[1] + '/'; // 保留基础链接的最后一个斜杠

            // 拼接成完整链接
            fileLink = baseLink + relativePath;
        }
    } else {
        alert("输出框中未找到 spider 属性下的链接！");
        return;
    }

    // 先提示用户获取到的链接
    //😀alert(`获取到的jar链接是：${fileLink}`);

    // 定义允许的后缀列表（统一小写）
    const allowedExtensions = ['.txt', '.json', '.jar', '.js', '.zip', '.bmp', '.jpg', '.webp', '.png'];

    // 将链接转换为小写，以便不区分大小写
    const lowerCaseFileLink = fileLink.toLowerCase();

    // 判断链接后缀是否为允许的后缀之一
    if (fileLink && !allowedExtensions.some(ext => lowerCaseFileLink.endsWith(ext))) {
        // 提示用户正在解密链接
        alert("正在解密jar链接，请点击确定后，耐心等待5秒左右，如不能触发浏览器自动下载,请根据剪切板的链接，手动完成下载...");
        // 😍如果链接后缀不在允许的列表中，则调用 
        fetch('./static/js/get_real_link.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `link=${encodeURIComponent(fileLink)}`
            })
            .then(response => {
                console.log('Response:', response); // 打印响应对象
                return response.json();
            })
            .then(data => {
                console.log('Data:', data); // 打印返回的数据
                if (data.success) {
                    const realLink = data.realLink;
                    //😍alert(`解密后jar真实下载地址：${realLink}`); // 调试信息
                    // 复制真实链接到剪切板
                    navigator.clipboard.writeText(realLink)
                        .then(() => {
                            alert(`密解后jar下载地址已复制到剪切板！`);
                        })
                        .catch(err => {
                            alert(`复制到剪切板失败：${err}`);
                        });

                    // 提取文件名
                    const fileName = realLink.substring(realLink.lastIndexOf('/') + 1);

                    // 创建下载链接
                    const downloadLink = document.createElement('a');
                    downloadLink.href = realLink;
                    downloadLink.download = fileName || 'downloaded_file.jar'; // 使用提取的文件名，如果没有则使用默认名
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                } else {
                    alert(`获取真实链接失败：${data.message}，原始链接: ${fileLink}，后端处理中的链接: ${data.originalLink}`);
                }
            })
            .catch(error => {
                alert(`请求失败：${error.message}，原始链接: ${fileLink}`);
            });
    } else {
        // 如果链接后缀在允许的列表中，则直接下载
        //😍alert(`jar下载链接：${fileLink}`); // 调试信息

        function downloadFile(fileLink, customFileName = 'downloaded_file.jar') {
            // 提取文件名
            const fileName = fileLink.substring(fileLink.lastIndexOf('/') + 1);

            // 创建下载链接
            const downloadLink = document.createElement('a');
            downloadLink.href = fileLink;
            downloadLink.download = fileName || customFileName;

            // 执行下载
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }

        // 判断fileLink是否以http://bobohome.ignorelist.com或https://bobohome.ignorelist.com开头
        if (fileLink && (
                fileLink.startsWith('http://bobohome.ignorelist.com') ||
                fileLink.startsWith('https://bobohome.ignorelist.com')
            )) {
            alert(`警告⚠️ : 如果无法触发下载，请将浏览器UA设置成  okhttp/5.0.0然后再重新点击下载`);
        }
        downloadFile(fileLink);

    }

}


//一键清空
function clearOutput() {
    var inputField = document.getElementById("input-field");
    var outputField = document.getElementById("output");

    // 检查输入框和输出框是否都为空
    if (inputField.value.trim() === "" && outputField.value.trim() === "") {
        showErrorMessage("输入框和输出框都为空，无需清空！"); // 提示错误信息
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