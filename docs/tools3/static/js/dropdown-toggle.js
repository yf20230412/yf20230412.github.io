
    function toggleDropdown(event) {
        event.stopPropagation(); // 阻止事件冒泡
        const subbMenu = event.target.nextElementSibling; // 获取 <a> 标签的下一个兄弟元素（即 .subb）
        if (subbMenu) {
            if (subbMenu.style.display === 'block') {
                subbMenu.style.display = 'none'; // 如果已显示，点击后隐藏
            } else {
                subbMenu.style.display = 'block'; // 如果未显示，点击后显示
            }
        }
    }

    // 点击空白处隐藏下拉菜单

