<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./static/img/favicon.ico">
    <link rel="apple-touch-icon" href="./static/img/favicon.ico">
    <link rel="shortcut icon" href="./static/img/favicon.ico">
    <link rel="Bookmark" href="./static/img/favicon.ico">
    <link rel="stylesheet" href="./static/css/style.css">
    <link rel="stylesheet" href="./static/css/popup.css">
    <title>TVBox接口解密</title>
</head>

<body>
    <h1>TVBox接口解密</h1>

    <div id="input-container">
        <div id="input-wrapper">
            <input type="text" id="input-field" placeholder="点击等待,下拉选择..." onclick="toggleOptions()" autocomplete="off">
            <button id="clear-input-button" onclick="clearInput()">×</button>
            <div id="optionsList" class="options"></div>
        </div>
        <button onclick="copyInput()">复制接口</button>
        <button onclick="getIPTV()">一键解码</button>
    </div>

    <div id="error-message"></div>
    <div id="loading-message">接口正在解密，请稍候～</div>

    <div id="output-container">
        <textarea id="output" rows="30" cols="100" readonly></textarea>
        <div id="button-container">
            <button id="copy-output-button" onclick="copyOutput()">复制内容</button>
            <button id="download-jar-button" onclick="downloadJar()">下载Jar</button>
            <button id="home-button" onclick="goToHome()">主页</button>
            <button id="clear-button" onclick="clearOutput()">一键清空</button>
        </div>
    </div>
    <footer>
        <div align="center">
            <a target="_blank" href="https://mp.weixin.qq.com/s/zFyqLSwj5FXkMiupb5XdDQ" title="微信公众号：风言锋语88" alt="微信公众号：风言锋语88">
                微信公众号：<mark>风言锋语88</mark>
            </a>
        </div>
    </footer>

    <!-- 弹窗遮罩 -->
    <div id="overlay" class="overlay">
        <div class="popup">
            <!-- 添加微信公众号图片 -->
            <div class="wechat-qr">
                <img src="./static/img/wechat-qr.jpg" alt="微信公众号二维码">
                <p style="font-size: 26px; color: #00ccff;margin: 0;">关注公众号</p>
                <p id="textToCopy" style="font - size: 18px; color: #9900ff;">风言锋语88</p>
                <p style="font-size: 20px; color: #00F5FF; margin: 0;">
                    <span style="font-size: 24px; color: orange; font-weight: bold;">后台</span>
                    <span style="font-weight: bold;"> 回复</span>
                    <span style="color: red; font-size: 24px; font-weight: bold;">验证码</span>
                </p>
            </div>
            <h2>获取密码</h2>
            <input type=" text" id="captcha-input" placeholder="关注公众号，将获取到的密码填入此处...">
            <button onclick="checkCaptcha(event)">提交</button>
            <p id="captcha-error" style="color: red; display: none;">验证码错误，请重试！</p>
        </div>
    </div>



    <script src="./static/js/jm.js"></script>
    <script src="./static/js/popup.js"></script>

</body>

</html>