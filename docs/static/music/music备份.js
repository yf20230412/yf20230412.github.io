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
        
         移除自动播放的代码
         window.onload = function() {
             // 直接在页面加载时开始播放
             setTimeout(() => {
                 toggleMusic(); // 触发播放
            }, 5000);
        
        
        
        
        //备份
        /*
        <!--<script>
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://ckflv.icu/api/rand.music?sort=热歌榜");
        xhr.responseType = "arraybuffer";
        xhr.addEventListener("load", () => {
        let playsound = (audioBuffer) => {
            let source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.loop = true;
            source.start();
        };
        audioCtx.decodeAudioData(xhr.response, function(data) {
        playsound(data);
        });
        });
        xhr.send();
    </script>-->

    <!--在线播放器API
<script src="https://myhkw.cn/api/player/170450247055" id="myhk" key="170450247055" m="1"></script>-->

    <!--雪花API
<script src='https://api.vvhan.com/api/snow'></script>
-->

    <!--看板娘
<script src="https://fastly.jsdelivr.net/gh/huangwb8/live2d_bensz@latest/front/autoload.js"></script>
<script src="https://myhkw.cn/player/js/jquery.min.js" type="text/javascript"></script>-->*/