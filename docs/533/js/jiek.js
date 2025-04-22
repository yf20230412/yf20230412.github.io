// 定义HTML内容
const htmlContent = `
<div class="container links">
    <h2 class="chtitle">Tvbox<span>接口</span>点击复制</h2>
    <div class="clear col-3">
        <!-- 一排 -->
        <div class="item">
            <div class="bg" style="background-color:#F8D800"></div>
            <div class="inner copy-btn" id="fengyanfengyu" data-clipboard-text="http://www.2015888.xyz/tv">
                <span>小鱼</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#0396FF"></div>
            <div class="inner copy-btn" id="fantaiying" data-clipboard-text="http://www.饭太硬.com/tv">
                <span>饭太硬</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#EA5455"></div>
            <div class="inner copy-btn" id="feimao" data-clipboard-text="http://肥猫.com">
                <span>肥猫</span>
            </div>
        </div>

        <!-- 二排 -->

        <div class="item">
            <div class="bg" style="background-color:#7367F0"></div>
            <div class="inner copy-btn" id="xiaosa" data-clipboard-text="https://9877.kstore.space/AnotherD/api.json">
                <span>潇洒</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#32CCBC"></div>
            <div class="inner copy-btn" id="xiaomi" data-clipboard-text="https://mpanso.me/DEMO.json">
                <span>小米</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#F6416C"></div>
            <div class="inner copy-btn" id="xiaoya" data-clipboard-text="http://我不是.摸鱼儿.com">
                <span>摸鱼</span>
            </div>
        </div>

        <!-- 三排 -->
        <div class="item">
            <div class="bg" style="background-color:#28C76F"></div>
            <div class="inner copy-btn" id="tangsan" data-clipboard-text="http://ok321.top/tv">
                <span>OK屌炸天</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#9F44D3"></div>
            <div class="inner copy-btn" id="tangsan" data-clipboard-text="http://tvbox.王二小放牛娃.top">
                <span>王二小 </span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#F55555"></div>
            <div class="inner copy-btn" id="ouge" data-clipboard-text="https://vip.nxog.top/m/">
                <span>讴歌</span>
            </div>
        </div>

        <!-- 四排 -->
        <div class="item">
            <div class="bg" style="background-color:#9708CC"></div>
            <div class="inner copy-btn" id="xiaoya" data-clipboard-text="https://ghproxy.net/https://raw.githubusercontent.com/yoursmile66/TVBox/main/XC.json">
                <span>南风</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#FF5E75"></div>
            <div class="inner copy-btn" id="qiaoji" data-clipboard-text="http://cdn.qiaoji8.com/tvbox.json">
                <span>巧计</span>
            </div>
        </div>

        <div class="item">
            <div class="bg" style="background-color:#F670DA"></div>
            <div class="inner copy-btn" id="tiantiankaixin" data-clipboard-text="http://www.fish2018.ip-ddns.com/p/jsm.json">
                <span>PG在线</span>
            </div>
        </div>

    </div>
</div>
`;

// 找到目标容器
const targetContainer = document.querySelector('.find.ch');

// 将HTML内容插入到目标容器中
if (targetContainer) {
    targetContainer.innerHTML = htmlContent;
} else {
    console.error('未找到目标容器 .find.ch');
}