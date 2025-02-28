//方法一、使用原生 JavaScript 加载 JS 文件
//引用格式<script src="../888/automusic.js"></script>
// 加载 CSS
var link = document.createElement("link");
link.href = "https://yf1688.top/static/music/yybfq.css";
link.rel = "stylesheet";
link.type = "text/css";
document.head.appendChild(link);

// 插入 DIV
document.body.insertAdjacentHTML('beforeend', `
    <!--音乐🎶-->
    <audio id="bg-music" loop></audio>
    <!--音乐播放器-->
    <div class="music-player">
        <!--隐藏时的左侧边框-->
        <div class="toggle-border" onclick="togglePlayer()"></div>
        <!--音乐列表-->
        <ul class="music3" id="music-list3"></ul>
        <!--播放器内容-->
        <div class="controls-container">
            <!--第一排按钮-->
            <div class="controls-row">
                <button id="prev-btn" class="circle-btn"><div class="prev-icon"></div></button>
                <button id="toggle-btn" class="circle-btn"><div class="play-icon"></div></button>
                <button id="next-btn" class="circle-btn"><div class="next-icon"></div></button>
                <button id="list-btn" class="circle-btn"><div class="list-icon"><div></div></div></button>
            </div>
            <!--新增的第二排按钮-->
            <div class="controls-row-secondary">
                <button id="rewind-btn" class="circle-btn"><div class="rewind-icon">⏪</div></button>
                <button class="circle-btn" disabled></button>
                <button id="fast-forward-btn" class="circle-btn"><div class="fast-forward-icon">⏩</div></button>
                <button class="circle-btn" disabled></button>
            </div>
            <!--音量控制滑块-->
            <input type="range" id="volume-control" min="0" max="1" step="0.1" value="0.5">
            <p class="fengyanfengyu">公众号：风言锋语88</p>
        </div>
    </div>
    <!--状态消息-->
    <div id="status-message"></div>
    <!--完-->
`);

// 加载 JS
var script = document.createElement("script");
script.src = "https://yf1688.top/static/music/yybfq.js";
script.onload = function () {
    console.log("JS 文件加载成功");
};
script.onerror = function () {
    console.error("JS 文件加载失败");
};
document.head.appendChild(script);


/*
//方法二、使用jquer库,但必须在网页部分加入<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> 库

// 加载 CSS
$("<link>").attr({
    href: "https://yf1688.top/static/music/yybfq.css",
    rel: "stylesheet",
    type: "text/css"
}).appendTo('head');

// 插入 DIV
$('body').append(`
    <!--音乐🎶-->
    <audio id="bg-music" loop></audio>
    <!--音乐播放器-->
    <div class="music-player">
        <!--隐藏时的左侧边框-->
        <div class="toggle-border" onclick="togglePlayer()"></div>
        <!--音乐列表-->
        <ul class="music3" id="music-list3"></ul>
        <!--播放器内容-->
        <div class="controls-container">
            <!--第一排按钮-->
            <div class="controls-row">
                <button id="prev-btn" class="circle-btn"><div class="prev-icon"></div></button>
                <button id="toggle-btn" class="circle-btn"><div class="play-icon"></div></button>
                <button id="next-btn" class="circle-btn"><div class="next-icon"></div></button>
                <button id="list-btn" class="circle-btn"><div class="list-icon"><div></div></div></button>
            </div>
            <!--新增的第二排按钮-->
            <div class="controls-row-secondary">
                <button id="rewind-btn" class="circle-btn"><div class="rewind-icon">⏪</div></button>
                <button class="circle-btn" disabled></button>
                <button id="fast-forward-btn" class="circle-btn"><div class="fast-forward-icon">⏩</div></button>
                <button class="circle-btn" disabled></button>
            </div>
            <!--音量控制滑块-->
            <input type="range" id="volume-control" min="0" max="1" step="0.1" value="0.5">
            <p class="fengyanfengyu">公众号：风言锋语88</p>
        </div>
    </div>
    <!--状态消息-->
    <div id="status-message"></div>
    <!--完-->
`);

// 加载 JS
$.ajax({
    url: 'https://yf1688.top/static/music/yybfq.js',
    dataType: "script",
    cache: true,
    async: false
});

*/