document.addEventListener('DOMContentLoaded', () => {
    // 获取所有h3标签（版本标题，格式固定为 vX.X.X 开头）
    const headings = document.querySelectorAll('.log-box h3');
    const tocList = document.getElementById('tocList');
    const tocButton = document.getElementById('tocButton');
    const toc = document.getElementById('toc');

    // 生成基于vX.X.X版本号的安全ID（如 v2.8.9 → v2-8-9）
    const generateSafeId = (text, index) => {
        // 严格匹配 vX.X.X 格式（X为数字，支持V/v开头，忽略前后空格）
        const versionMatch = text.match(/\b[vV]\s*\d+\.\d+\.\d+\b/); // \b确保单词边界，忽略版本号前后空格
        if (!versionMatch) {
            console.warn(`无效版本格式: ${text}，使用默认ID`);
            return `version-${index}`; // 保底处理（理论上无需触发）
        }
        
        // 提取版本号并处理为 vx-x-x 格式
        const version = versionMatch[0]
            .trim() // 去除前后空格
            .toLowerCase() // 统一小写
            .replace(/\./g, '-'); // 点转连字符
        
        return `version-${index}-${version}`; // 最终ID格式：version-0-v2-8-9
    };

    // 1. 为每个h3标签添加id和数据属性
    headings.forEach((heading, index) => {
        heading.id = generateSafeId(heading.textContent, index);
        heading.dataset.tocIndex = index; // 调试用数据属性
        console.log(`生成ID：${heading.id}，对应标题：${heading.textContent}`); // 调试日志
    });

    // 2. 生成目录项
    headings.forEach((heading, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        // 目录项显示完整标题（包括版本号和描述，保留表情符号）
        link.textContent = heading.textContent;
        link.href = `#${heading.id}`; // 链接到生成的安全ID
        link.dataset.targetId = heading.id; // 调试用数据属性

        // 点击事件：平滑滚动并隐藏目录
        link.onclick = (e) => {
            e.preventDefault();
            toc.style.display = 'none'; // 点击后隐藏目录
            
            const target = document.getElementById(heading.id);
            if (!target) {
                console.error(`目标元素不存在：${heading.id}`);
                return;
            }

            // 平滑滚动到目标，兼容不同浏览器
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });

            // 强制更新URL哈希（解决部分浏览器不更新的问题）
            history.replaceState(null, null, `#${heading.id}`);
        };

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    // 3. 目录按钮切换显示状态
    tocButton?.addEventListener('click', () => {
        toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
    });

    // 4. 处理初始哈希值（支持直接访问锚点链接）
    const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const target = document.getElementById(hash);
            target?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // 加载时处理初始哈希

    // 5. 调试信息
    console.log(`成功初始化目录，检测到 ${headings.length} 个版本标题`);
    console.log('生成的ID列表：', [...headings].map(h => h.id));
});
