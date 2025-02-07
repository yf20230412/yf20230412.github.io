        document.addEventListener('DOMContentLoaded', function() {
            const wechat = document.getElementById('wechat');
            const alipay = document.getElementById('alipay');
            const qrCode = document.querySelector('.qr-code');
            const rewardText = document.getElementById('reward-text');

            wechat.addEventListener('click', function() {
                updateActive(wechat, '1.jpg', '请使用微信扫一扫进行打赏：');
            });

            alipay.addEventListener('click', function() {
                updateActive(alipay, '支付宝.jpg', '请使用支付宝扫一扫进行打赏：');
            });

            paypal.addEventListener('click', function() {
                updateActive(paypal, '支付宝1.jpg');
            });

            function updateActive(activeElement, qrSrc, text) {
                // 移除所有图片的active类
                wechat.classList.remove('active');
                alipay.classList.remove('active');
                                paypal.classList.remove('active');
                // 添加active类到当前点击的图片
                activeElement.classList.add('active');

                // 更新二维码图片
                qrCode.src = qrSrc;

                // 更新提示文字
                rewardText.textContent = text;
            }
        });