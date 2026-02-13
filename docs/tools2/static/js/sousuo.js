// 左侧导航栏点击跳转到对应分类
function show_tool_list(categoryId) {
  const targetCategory = document.querySelector(`.category-card[data-category-id="${categoryId}"]`);
  if (targetCategory) {
    // 移除所有分类的active类
    document.querySelectorAll('.nk-menu-item').forEach(item => {
      item.classList.remove('active');
    });

    // 给当前点击的菜单项添加active类
    const menuItem = document.querySelector(`.nk-menu-item[data-id="${categoryId}"]`);
    if (menuItem) {
      menuItem.classList.add('active');
    }

    // 滚动到目标分类
    targetCategory.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // 添加scroll-margin-top样式
    targetCategory.style.scrollMarginTop = '80px';

    // 添加高亮效果
    targetCategory.style.transition = 'none';
    targetCategory.style.boxShadow = '0 0 0 2px rgba(100, 180, 255, 0.5)';

    // 2秒后移除高亮效果
    setTimeout(() => {
      targetCategory.style.transition = 'box-shadow 0.3s ease';
      targetCategory.style.boxShadow = 'none';
    }, 2000);
  }
}

// 搜索功能，确保搜索功能在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchkw');
  const toolLinks = document.querySelectorAll('.tool-link');
  
  // 监听搜索框输入
  if(searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim().toLowerCase();
      let anyMatchFound = false;
      
      // 先显示所有分类卡片
      document.querySelectorAll('.category-card').forEach(card => {
        card.style.display = '';
      });
      
      // 如果搜索框为空，显示所有工具
      if(searchTerm === '') {
        toolLinks.forEach(link => {
          link.parentElement.style.display = '';
        });
        return;
      }
      
      // 遍历所有工具链接
      toolLinks.forEach(link => {
        const title = link.getAttribute('title')?.toLowerCase() || '';
        const text = link.textContent.toLowerCase();
        
        // 检查标题或文本是否包含搜索词
        if (title.includes(searchTerm) || text.includes(searchTerm)) {
          link.parentElement.style.display = '';
          anyMatchFound = true;
        } else {
          link.parentElement.style.display = 'none';
        }
      });
      
      // 隐藏没有匹配项的分类卡片
      document.querySelectorAll('.category-card').forEach(card => {
        const visibleTools = card.querySelectorAll('.col-6:not([style*="display: none"])').length > 0;
        card.style.display = visibleTools ? '' : 'none';
      });
    });
  }
  
  // 添加Ctrl+F快捷键聚焦搜索框
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      if(searchInput) searchInput.focus();
    }
  });
  
  // 为所有分类卡片添加默认的scroll-margin-top
  document.querySelectorAll('.category-card').forEach(card => {
    card.style.scrollMarginTop = '80px';
  });
});