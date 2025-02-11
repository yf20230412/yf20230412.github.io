document.addEventListener('DOMContentLoaded', function () {
            const urlList = document.getElementById('url-list');
            const jsonUrl = 'https://yf1688.top/static/M.json'; // JSON 文件链接
        
            fetch(jsonUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络请求失败');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // 打印数据到控制台
                    if (data.urls && Array.isArray(data.urls)) {
                        data.urls.forEach((item, index) => {
                            const row = document.createElement('tr');
        
                            // 名称列
                            const nameCell = document.createElement('td');
                            nameCell.textContent = item.name;
                            row.appendChild(nameCell);
        
                            // URL列
                            const urlCell = document.createElement('td');
                            const urlLink = document.createElement('a');
                            urlLink.href = item.url;
                            urlLink.textContent = item.url;
                            urlLink.target = '_blank'; // 在新标签页打开链接
                            urlCell.appendChild(urlLink);
                            row.appendChild(urlCell);
        
                            // 操作列（复制按钮）
                            const actionCell = document.createElement('td');
                            const copyButton = document.createElement('button');
                            copyButton.className = 'copy-button';
                            copyButton.textContent = '复制';
                            copyButton.addEventListener('click', () => {
                                copyToClipboard(item.url);
                            });
                            actionCell.appendChild(copyButton);
                            row.appendChild(actionCell);
        
                            urlList.appendChild(row);
                        });
                    } else {
                        console.error('JSON 格式不正确：未找到 urls 数组');
                        alert('JSON 文件格式不正确，请检查数据');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('无法加载数据，请检查网络或 JSON 文件');
                });
        });
        
        // 复制到剪贴板函数
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    alert('链接已复制到剪贴板！');
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    alert('复制失败，请手动复制链接');
                });
        }