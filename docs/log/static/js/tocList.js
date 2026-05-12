document.addEventListener('DOMContentLoaded', () => {
    const logBox = document.querySelector('.log-box');
    if (!logBox) return;

    const headings = logBox.querySelectorAll('h3');
    const tocList = document.getElementById('tocList');
    const toc = document.getElementById('toc');
    const tocButton = document.getElementById('tocButton');

    if (!headings.length || !tocList) return;

    // ✅ 1. 给每个 h3 生成【绝对安全】的 ID
    headings.forEach((heading, index) => {
        heading.id = `version-${index}`;
    });

    // ✅ 2. 生成目录
    headings.forEach((heading, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = `#version-${index}`;
        a.textContent = heading.textContent.trim();

        a.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.getElementById(`version-${index}`);
            if (!target) return;

            // 平滑滚动
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // 更新地址栏
            history.replaceState(null, '', `#version-${index}`);

            // 移动端 / 小屏时自动关闭目录
            if (window.innerWidth < 768) {
                toc.style.display = 'none';
            }
        });

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // ✅ 3. 目录按钮切换
    tocButton?.addEventListener('click', () => {
        toc.style.display =
            toc.style.display === 'none' ? 'block' : 'none';
    });

    // ✅ 4. 页面加载时定位锚点
    const initAnchor = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#version-')) {
            const target = document.querySelector(hash);
            target?.scrollIntoView({ behavior: 'auto' });
        }
    };

    window.addEventListener('hashchange', initAnchor);
    initAnchor();

    console.log(`✅ 目录初始化完成，共 ${headings.length} 条`);
});
