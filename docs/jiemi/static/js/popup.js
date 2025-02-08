// 页面加载完成后显示弹窗
window.onload = function() {
    document.getElementById('overlay').style.display = 'flex';
};

// 验证码验证逻辑
function checkCaptcha() {
    const captchaInput = document.getElementById('captcha-input').value;
    const correctCaptcha = '2025'; // 设置正确的验证码

    if (captchaInput === correctCaptcha) {
        // 验证码正确，关闭弹窗
        document.getElementById('overlay').style.display = 'none';
    } else {
        // 验证码错误，显示错误提示
        document.getElementById('captcha-error').style.display = 'block';
    }
}
// 点击公众号自动复制到剪切板
const textToCopy = document.getElementById('textToCopy');
textToCopy.addEventListener('click', function() {
    const text = this.textContent;
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('已复制到剪贴板：' + text);
});

// 弹窗时避免输入框内容被输入法遮挡
document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.querySelector('.popup input'); // 假设输入框是弹窗中的第一个input
    const popup = document.querySelector('.popup');

    inputField.addEventListener('focus', function () {
        // 当输入框被激活时，将弹窗向上移动
        popup.style.transform = 'translateY(-20%)'; // 根据需要调整移动的距离
    });

    inputField.addEventListener('blur', function () {
        // 当输入框失去焦点时，将弹窗恢复原位
        popup.style.transform = 'translateY(0)';
    });
});
