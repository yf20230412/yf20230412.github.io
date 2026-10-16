// 等待页面DOM全部加载完成后再执行所有代码，彻底解决元素获取null问题
document.addEventListener('DOMContentLoaded', function() {
    const linkInput = document.getElementById('linkInput');
    const parseBtn = document.getElementById('parseBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultPanel = document.getElementById('resultPanel');
    const otherUidEl = document.getElementById('otherUid');
    const awemeIdEl = document.getElementById('awemeId');
    const selfUidEl = document.getElementById('selfUid');
    const otherProfileProtocolEl = document.getElementById('otherProfileProtocol');
    const awemeProtocolEl = document.getElementById('awemeProtocol');
    const selfProfileProtocolEl = document.getElementById('selfProfileProtocol');
    const debugShortLinkEl = document.getElementById('debugShortLink');
    const debugLongLinkEl = document.getElementById('debugLongLink');
    const copyBtns = document.querySelectorAll('.copy-btn');

    // 全局变量，用于临时存放解码后的完整链接（给解析流程用）
    let decodedGlobalLink = '';

    // 1. 提取短链接
    function extractValidLink(text) {
        const shortUrlReg = /https?:\/\/v\.douyin\.com\/[^\s]+/;
        const match = text.match(shortUrlReg);
        if (match && match.length > 0) {
            return match[0].replace(/[。,，！？、…'""''、；：]+$/, '');
        }
        return null;
    }

    // 2. 请求 PHP 获取重定向
    async function getRealLongUrl(shortUrl) {
        try {
            const apiUrl = `parse.php?url=${encodeURIComponent(shortUrl)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (data.success) {
                return data.url;
            } else {
                console.error('PHP解析失败反馈:', data);
                return null;
            }
        } catch (err) {
            console.error('请求 PHP 接口发生网络错误:', err);
            return null;
        }
    }

    // 3. 核心解析
    function parseLink(link) {
        const result = {
            otherUid: '',
            awemeId: '',
            selfUid: ''
        };

        // --- 提取作品ID ---
        const awemeIdMatch1 = link.match(/\/(\d+)\/\?region=/);
        const awemeIdMatch2 = link.match(/\/(?:video|note)\/(\d+)/);
        if (awemeIdMatch1 && awemeIdMatch1[1]) {
            result.awemeId = awemeIdMatch1[1];
        } else if (awemeIdMatch2 && awemeIdMatch2[1]) {
            result.awemeId = awemeIdMatch2[1];
        }

        // --- 提取他人UID ---
        const otherUidMatch = link.match(/"social_author_id":"(\d+)"/);
        if (otherUidMatch && otherUidMatch[1]) {
            result.otherUid = otherUidMatch[1];
        }

        // --- 提取自己UID ---
        const selfUidMatch = link.match(/"social_share_user_id":"(\d+)"/);
        if (selfUidMatch && selfUidMatch[1]) {
            result.selfUid = selfUidMatch[1];
        }

        return result;
    }

    // 4. 主流程
    async function startParse() {
        const inputValue = linkInput.value.trim();
        if (!inputValue) {
            alert('请先粘贴抖音分享链接');
            return;
        }

        const shortLink = extractValidLink(inputValue);
        if (!shortLink) {
            alert('未在输入框中找到有效的 v.douyin.com 短链接');
            return;
        }

        console.log('【1. 提取到的短链接】->', shortLink);

        // 渲染短链接到界面上
        debugShortLinkEl.textContent = shortLink;

        parseBtn.textContent = '正在重定向...';
        parseBtn.disabled = true;

        const realLink = await getRealLongUrl(shortLink);

        parseBtn.textContent = '解析链接';
        parseBtn.disabled = false;

        if (!realLink) {
            alert('短链接解析失败，请检查网络或 PHP 环境');
            return;
        }

        console.log('【2. PHP返回的重定向长链接】->', realLink);

        // 进行解码并将结果渲染到界面长链容器中
        decodedGlobalLink = decodeURIComponent(realLink);
        debugLongLinkEl.textContent = decodedGlobalLink;

        console.log('【3. 解码后的长链接(用于正则匹配)】->', decodedGlobalLink);

        // 执行正则匹配
        const parsedData = parseLink(decodedGlobalLink);

        // 渲染参数解析结果
        otherUidEl.textContent = parsedData.otherUid || '未找到';
        awemeIdEl.textContent = parsedData.awemeId || '未找到';
        selfUidEl.textContent = parsedData.selfUid || '未找到';

        // 生成 Schema 协议
        otherProfileProtocolEl.textContent = parsedData.otherUid ? `snssdk1128://user/profile/${parsedData.otherUid}` : '无';
        awemeProtocolEl.textContent = parsedData.awemeId ? `snssdk1128://aweme/detail/${parsedData.awemeId}` : '无';
        selfProfileProtocolEl.textContent = parsedData.selfUid ? `snssdk1128://user/profile/${parsedData.selfUid}` : '无';

        resultPanel.classList.add('active');
    }

    // 5. 复制按钮
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl && targetEl.textContent && !['未找到', '无'].includes(targetEl.textContent)) {
                navigator.clipboard.writeText(targetEl.textContent).then(() => {
                    this.textContent = '已复制';
                    setTimeout(() => {
                        this.textContent = this.dataset.originTxt || '复制';
                    }, 1500);
                });
            }
        });
        // 保存原始按钮文字，复制后恢复
        btn.dataset.originTxt = btn.textContent;
    });

    // 6. 解析按钮事件
    parseBtn.addEventListener('click', startParse);
    linkInput.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            startParse();
        }
    });

    // ========== 修复后的清空按钮事件 ==========
    clearBtn.addEventListener('click', function() {
        // 1. 清空输入框
        linkInput.value = '';
        // 2. 隐藏结果面板
        resultPanel.classList.remove('active');
        // 3. 清空调试链接
        debugShortLinkEl.textContent = '';
        debugLongLinkEl.textContent = '';
        // 4. 清空UID、作品ID
        otherUidEl.textContent = '';
        awemeIdEl.textContent = '';
        selfUidEl.textContent = '';
        // 5. 清空跳转协议
        otherProfileProtocolEl.textContent = '';
        awemeProtocolEl.textContent = '';
        selfProfileProtocolEl.textContent = '';
        // 6. 重置解析按钮状态
        parseBtn.textContent = '解析链接';
        parseBtn.disabled = false;
        // 7. 清空全局缓存链接
        decodedGlobalLink = '';
        // 强制页面重绘，兜底刷新
        linkInput.focus();
    });
});