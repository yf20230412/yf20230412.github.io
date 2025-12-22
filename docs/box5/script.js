function Toast(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 2%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(m)
        }, d * 1000);
    }, duration);
}
const list = [

    {
        "url": "http://2015888.xyz",
        "name": "🏰小鱼多线",
        "color": "#48c0a4"
    },
    {
        "url": "https://vip.nxog.top",
        "name": "🏰欧歌多线",
        "color": "#48c0a4"
    },

    {
        color: "#48c0a4",
        url: "https://bitbucket.org/xduo/cool/raw/main/line.json",
        name: "🏰多多多线"
    },

    {
        color: "#48c0a4",
        url: "https://qixing.myhkw.com/DC.txt",
        name: "🏰天微多线"
    },

    {
        color: "#48c0a4",
        url: "https://12586.kstore.space/123.txt",
        name: "🏰匿名多线"
    },

    {
        color: "#808000",
        url: "",
        name: "🌸以下是单仓"
    },

    {
        "url": "http://www.2015888.xyz/tv",
        "name": "🚀小鱼线路",
        "color": "#91ad70"
    },
    {
        "url": "http://www.饭太硬.com/tv",
        "name": "🚀饭太硬线路",
        "color": "#91ad70"
    },
    {
        "url": "http://肥猫.com",
        "name": "🚀肥猫线路",
        "color": "#91ad70"
    },
    {
        "url": "http://我不是.摸鱼儿.com",
        "name": "🚀摸鱼线路",
        "color": "#91ad70"
    },
    {
        "url": "http://www.mpanso.com/小米/DEMO.json",
        "name": "🛳小米线路",
        "color": "#91ad70"
    },
    {
        "url": "http://tvbox.王二小放牛娃.top",
        "name": "🛳放牛线路",
        "color": "#91ad70"
    },
    {
        "url": "https://vip.nxog.top/m/",
        "name": "🛳欧歌线路",
        "color": "#91ad70"
    },
    {
        "url": "http://bobohome.ignorelist.com:20247/潇洒/",
        "name": "🛳潇洒线路",
        "color": "#91ad70"
    },
    {
        "url": "https://gh.2015888.xyz/https://raw.githubusercontent.com/yoursmile66/TVBox/main/XC.json",
        "name": "🛳南风线路",
        "color": "#91ad70"
    },

    {
        "url": "http://ttkx.cc:55/天天开心",
        "name": "🚗天天开心",
        "color": "#91ad70"
    },
    {
        "url": "https://gitee.com/yiwu369/6758/raw/master/青龙/1.json",
        "name": "🚗青龙线路",
        "color": "#91ad70"
    },
    {
        "url": "http://ok321.top/tv",
        "name": "🚗OK线路",
        "color": "#91ad70"
    },
    {
        "url": "http://gh.2015888.xyz/raw.githubusercontent.com/xyq254245/xyqonlinerule/main/XYQTVBox.json",
        "name": "🚗香雅情线路",
        "color": "#91ad70"
    },
    {
        "url": "http://7337.kstore.space/twvip/自用测试.json",
        "name": "🚗天微线路",
        "color": "#91ad70"
    },

    {
        "url": "https://gh.2015888.xyz/https://raw.githubusercontent.com/gaotianliuyun/gao/master/js.json",
        "name": "🛵高天流云",
        "color": "#91ad70"
    },
    {
        "url": "https://gitee.com/kevinr/tvbox/raw/master/soeasy/config.json",
        "name": "🛵SoEasy线路",
        "color": "#91ad70"
    },
    {
        "url": "https://yydf.540734621.xyz/QQ/yydf2024.json",
        "name": "🛵业余线路",
        "color": "#91ad70"
    },
    {
        "url": "http://cdn.qiaoji8.com/tvbox.json",
        "name": "🛵巧计线路",
        "color": "#91ad70"
    },
    {
        "url": "https://cdn04132025.gitlink.org.cn/api/v1/repos/wykj/ys/raw/master/ya.json",
        "name": "🛵无意线路",
        "color": "#91ad70"
    },

    {
        color: "#7398Ab",
        url: "https://gitlab.com/duomv/dzhipy/-/raw/main/index.json",
        name: "🌹ZY-Player源"
    },

    {
        color: "#7398Ab",
        url: "",
        name: "🌺以下是uz影视源"
    },

    {
        color: "#7398Ab",
        url: "http://gh.2015888.xyz/raw.githubusercontents.com/Yswag/uzVideo/main/js/spider_sources.json",
        name: "🐯大佬扩展源"
    },

    {
        color: "#7398Ab",
        url: "https://raw.githubusercontents.com/YYDS678/uzVideo/refs/heads/main/video_sources_default.json",
        name: "🐝采集源"
    },

    {
        color: "#7398Ab",
        url: "https://raw.gitmirror.com/YYDS678/uzVideo/refs/heads/main/video_sources_sese.json",
        name: "🐝sese源"
    }

];
$("#ul").html(() => {
    let html = "";
    list.forEach(function(v) {
        // html+="<li style='background:"+v.color+"'>"+v.name+"<br/>"+v.color+"</li>";
        html += "<li style='background:" + v.color + "' onclick='copy(this)'><input type=\"hidden\" value='" + v.url + "'>" + v.name + "<br/>" + "<span>" + v.url + "</span>" + "</li>";
    });
    return html;
});
//复制到剪切板 函数
function copy(that) {
    $(that).children("input").attr("type", "text").select();
    document.execCommand("Copy"); // 执行浏览器复制命令
    $(that).children("input").attr("type", "hidden");
    Toast("小鱼提醒：复制成功，请前往tvbox接口粘贴食用", 500);
}

var musicFiles = [
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/秋风吹起.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/待我.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/云要散了何必再追.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/大风吹倒梧桐树.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/此去半生.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/有风无风皆自由.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/我知道你最近很累.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/灿烂的你.mp3',
    'https://raw.gitcode.com/yf1688/api/raw/main/background_music/记忆烈酒.mp3'
];

var bgMusic = document.getElementById('bg-music');
var toggleBtn = document.getElementById('toggle-btn');
var statusMessage = document.getElementById('status-message');
var musicPlaying = false;

function getRandomMusic() {
    var randomIndex = Math.floor(Math.random() * musicFiles.length);
    return musicFiles[randomIndex];
}

function loadRandomMusic() {
    var randomMusic = getRandomMusic();
    bgMusic.src = randomMusic;
    // 预加载音乐
    bgMusic.load();
}

function showStatus(message) {
    statusMessage.innerText = message;
    statusMessage.style.display = 'block';
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 2000); // 2秒后隐藏提示
}

function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        toggleBtn.innerHTML = '<div class="play-icon"></div>';
        showStatus('音乐已暂停');
        musicPlaying = false;
    } else {
        bgMusic.play().then(() => {
            toggleBtn.innerHTML = '<div class="stop-icon"></div>';
            showStatus('正在为你播放音乐');
            musicPlaying = true;
        }).catch((error) => {
            console.error('自动播放失败：', error);
            showStatus('播放失败，请重试');
        });
    }
}

// 预加载音乐
loadRandomMusic();

toggleBtn.addEventListener('click', toggleMusic);