// 弹窗HTML模板
const updateModalTemplate = `
<div id="updateModal" class="update-modal-modal">
    <div class="update-modal-modal-content">
        <span class="update-modal-close-btn" onclick="closeUpdateNotice()">&times;</span>
        <div class="update-modal-update-content">
            <h2 style="text-align: center;">✨ 公告 ✨</h2>
            <div class="update-modal-notice-text">请勿频繁刷新订阅..</div>
            
            <strong>㊀ · 更新日志 📝</strong>
            <div class="update-modal-update-section">
                <div class="update-modal-update-date">• 2025.4.1</div>
                <div class="update-modal-update-item">维护 Gather「删除 •咪咕源 / 当作节目表吧」</div>
                <div class="update-modal-update-item">维护 Live「修复 斗鱼部分直播间 不显示BUG」</div>
                <div class="update-modal-update-date">• 2025.2.8</div>
                <div class="update-modal-update-item">维护 Gather「修复 •部分源」</div>
                <div class="update-modal-update-item">维护 Live「修复生成错误 BUG」</div>
                <div class="update-modal-update-date">• 2025.2.4</div>
                <div class="update-modal-update-item">重启 Gather「删除 •IPV6 源 / •国际「汇集」」</div>
                <div class="update-modal-update-item">重启 Live「备份文件为1月1号 / 更新周期改为 30 分钟」</div>
                <div class="update-modal-update-date">• 2024.12.28</div>
                <div class="update-modal-update-item">维护 Live「优化 抖音 在线判断 / 更改主播有效期为 30 天」</div>
            </div>

            <strong>㊁ · 使用说明 📘</strong>
            <div class="update-modal-update-section">
                <div class="update-modal-update-item">请在播放器中使用..</div>
                <div class="update-modal-update-item">疑难杂症,请移步 Github..</div>
                <div class="update-modal-update-item">特殊频道,请保持订阅与播放IP一致,且限制UA白名单..</div>
            </div>
        </div>
    </div>
</div>
`;

// 弹窗CSS样式
const updateModalStyle = `
<style>
 :root {--primary-color: #4F46E5;--secondary-color: #818CF8;--background-color: #F3F4F6;--card-color: #FFFFFF;--text-color: #1F2937;--hover-color: #6366F1;}.update-modal-modal {display: none;position: fixed;z-index: 1000;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);backdrop-filter: blur(4px);font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;min-height: 100vh;padding: 2rem 1rem;color: var(--text-color);}* {margin: 0;padding: 0;box-sizing: border-box;}.update-modal-modal-content {background-color: var(--card-color);margin: 2rem auto;padding: 2rem;border-radius: 1rem;width: 90%;max-width: 600px;max-height: 85vh;position: relative;box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);display: flex;flex-direction: column;}.update-modal-update-content {overflow-y: auto;padding-right: 1rem;margin-right: -1rem;scrollbar-width: thin;scrollbar-color: #CBD5E1 transparent;}.update-modal-update-content::-webkit-scrollbar {width: 6px;}.update-modal-update-content::-webkit-scrollbar-track {background: transparent;}.update-modal-update-content::-webkit-scrollbar-thumb {background-color: #CBD5E1;border-radius: 3px;}.update-modal-update-content::-webkit-scrollbar-thumb:hover {background-color: #94A3B8;}.update-modal-close-btn {position: absolute;right: 1.5rem;top: 1.5rem;font-size: 1.5rem;cursor: pointer;color: #6B7280;transition: color 0.2s ease;z-index: 1;}.update-modal-close-btn:hover {color: var(--text-color);}.update-modal-update-content h2 {font-size: 1.5rem;margin-bottom: 1rem;color: var(--primary-color);position: sticky;top: 0;background-color: var(--card-color);padding: 0.5rem 0;}.update-modal-update-section {border-left: 2px solid #E5E7EB;padding-left: 1rem;margin-bottom: 1.5rem;}.update-modal-update-date {font-weight: 600;color: var(--primary-color);margin-bottom: 0.5rem;}.update-modal-update-item {margin-bottom: 0.5rem;padding-left: 1rem;position: relative;}.update-modal-update-item::before {content: "◦";position: absolute;left: 0;color: #6B7280;}.update-modal-notice-text {color: #EF4444;font-weight: 500;text-align: center;margin-bottom: 1rem;padding: 0.5rem;border: 1px solid #FCA5A5;border-radius: 0.5rem;background-color: #FEF2F2;}@media (min-width: 640px) {.update-modal-subscription-grid {grid-template-columns: repeat(2, 1fr);}}
</style>
`;

// 初始化弹窗
function initUpdateNotice() {
    // 将HTML模板插入到body中
    document.body.insertAdjacentHTML('beforeend', updateModalTemplate);
    // 将CSS样式插入到head中
    document.head.insertAdjacentHTML('beforeend', updateModalStyle);
}

// 显示弹窗
function showUpdateNotice() {
    const modal = document.getElementById('updateModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// 关闭弹窗
function closeUpdateNotice() {
    const modal = document.getElementById('updateModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 初始化弹窗并显示
function setupAndShowUpdateNotice() {
    initUpdateNotice();
    showUpdateNotice();
}

// 确保在页面加载完成后初始化
window.onload = setupAndShowUpdateNotice();
