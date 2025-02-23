document.addEventListener('DOMContentLoaded', () => {
    const outputBox = document.getElementById('output');
    const scrollButton = document.getElementById('scrollButton');

    // 初始化变量
    let startY = 0; // 触摸起始的Y坐标
    let isScrolling = false; // 是否正在滚动
    let scrollDirection = null; // 滑动方向（'up' 或 'down'）

    // 监听触摸开始事件
    outputBox.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY; // 获取触摸起始点的Y坐标
        isScrolling = false; // 重置滚动状态
        scrollDirection = null; // 重置滑动方向
    });

    // 监听触摸移动事件
    outputBox.addEventListener('touchmove', (event) => {
        const currentY = event.touches[0].clientY; // 当前触摸点的Y坐标
        const deltaY = currentY - startY; // 滑动距离

        // 判断是否为上下滑动（可以设置一个阈值来判断）
        if (Math.abs(deltaY) > 10) {
            isScrolling = true; // 标记为正在滚动
            // 判断滑动方向
            scrollDirection = deltaY > 0 ? 'down' : 'up';
        }
    });

    // 监听触摸结束事件
    outputBox.addEventListener('touchend', () => {
        if (isScrolling) {
            // 判断当前滚动位置
            if (outputBox.scrollTop === 0) {
                // 如果在顶部，显示“跳转底部”
                scrollButton.textContent = '跳转底部';
                scrollButton.style.backgroundColor = '#009966'; // 绿色
            } else if (outputBox.scrollTop >= outputBox.scrollHeight - outputBox.clientHeight) {
                // 如果在底部，显示“返回顶部”
                scrollButton.textContent = '返回顶部';
                scrollButton.style.backgroundColor = '#ff5722'; // 橙色
            } else {
                // 根据滑动方向显示按钮文本
                if (scrollDirection === 'up') {
                    // 向上滑动，显示“跳转底部”
                    scrollButton.textContent = '跳转底部';
                    scrollButton.style.backgroundColor = '#009966'; // 绿色
                } else if (scrollDirection === 'down') {
                    // 向下滑动，显示“返回顶部”
                    scrollButton.textContent = '返回顶部';
                    scrollButton.style.backgroundColor = '#ff5722'; // 橙色
                }
            }
            // 显示滚动按钮
            scrollButton.style.display = 'block';
        }
    });

    // 监听全局点击事件（隐藏滚动按钮）
    document.addEventListener('click', (event) => {
        if (!outputBox.contains(event.target)) {
            // 如果点击的是输出框外的区域，隐藏滚动按钮
            scrollButton.style.display = 'none';
        }
    });

    // 滚动按钮的点击事件
    scrollButton.addEventListener('click', () => {
        if (scrollButton.textContent === '跳转底部') {
            // 如果按钮显示“跳转底部”，滚动到底部
            outputBox.scrollTop = outputBox.scrollHeight;
        } else if (scrollButton.textContent === '返回顶部') {
            // 如果按钮显示“返回顶部”，滚动到顶部
            outputBox.scrollTop = 0;
        }
    });

    // 监听输出框的滚动事件，动态更新按钮文本
    outputBox.addEventListener('scroll', () => {
        if (outputBox.scrollTop === 0) {
            // 如果滚动到顶部，按钮显示“跳转底部”
            scrollButton.textContent = '跳转底部';
        } else if (outputBox.scrollTop >= outputBox.scrollHeight - outputBox.clientHeight) {
            // 如果滚动到底部，按钮显示“返回顶部”
            scrollButton.textContent = '返回顶部';
        }
    });
});

//进度条

document.addEventListener('DOMContentLoaded', () => {
    const outputBox = document.getElementById('output');
    const progressBar = document.getElementById('progressBar');

    // 监听输出框的滚动事件
    outputBox.addEventListener('scroll', () => {
        // 计算当前滚动位置的百分比
        const scrollPosition = outputBox.scrollTop;
        const totalScrollHeight = outputBox.scrollHeight - outputBox.clientHeight;
        const scrollPercentage = (scrollPosition / totalScrollHeight) * 100;

        // 更新进度条的宽度
        progressBar.style.width = `${scrollPercentage}%`;
    });
});