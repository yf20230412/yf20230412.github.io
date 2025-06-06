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

// 添加点击空白处隐藏下拉菜单的逻辑
document.addEventListener('click', function(event) {
    const dropdownLinks = document.querySelectorAll('.breadcrumb li a.text-red'); // 获取所有下拉菜单的触发元素
    dropdownLinks.forEach(link => {
        const subbMenu = link.nextElementSibling; // 获取对应的下拉菜单
        if (subbMenu && subbMenu.style.display === 'block') {
            if (!subbMenu.contains(event.target) && !link.contains(event.target)) {
                subbMenu.style.display = 'none'; // 如果点击的位置不在下拉菜单或触发元素内，隐藏下拉菜单
            }
        }
    });
});
