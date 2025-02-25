var musicFiles = [];

var bgMusic = document.getElementById('bg-music');
var toggleBtn = document.getElementById('toggle-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var listBtn = document.getElementById('list-btn');
var musicList = document.getElementById('music-list');
var statusMessage = document.getElementById('status-message');
var volumeControl = document.getElementById('volume-control');
var currentIndex = 0;
var musicPlaying = false;

// 加载音乐列表
function loadMusicList() {
    fetch('https://yf1688.top/static/music/music-list.json')
        .then(response => response.json())
        .then(data => {
            musicFiles = data.musicFiles;
            musicFiles.forEach((music, index) => {
                var li = document.createElement('li');
                li.innerText = music.split('/').pop();
                li.addEventListener('click', () => {
                    playSelectedMusic(index);
                });
                musicList.appendChild(li);
            });

            currentIndex = Math.floor(Math.random() * musicFiles.length);
            playSelectedMusic(currentIndex);
        })
        .catch(error => {
            console.error('加载音乐列表失败：', error);
            showStatus('无法加载音乐列表，请检查网络连接。');
        });
}

function playSelectedMusic(index) {
    currentIndex = index;
    bgMusic.src = musicFiles[index];
    bgMusic.play().then(() => {
        toggleBtn.innerHTML = '<div class="pause-icon"></div>';
        showStatus('正在播放：' + musicFiles[index].split('/').pop());
        musicPlaying = true;
    }).catch((error) => {
        console.error('播放失败：', error);
        showStatus('您的浏览器不支持自动播放音乐，请手动点击播放器继续欣赏歌曲吧~');
    });
}

// 上一首
function playPrev() {
    currentIndex = (currentIndex - 1 + musicFiles.length) % musicFiles.length;
    playSelectedMusic(currentIndex);
}

// 下一首
function playNext() {
    currentIndex = (currentIndex + 1) % musicFiles.length;
    playSelectedMusic(currentIndex);
}

//音乐列表隐藏展开
function toggleMusicList() {
    musicList.style.display = musicList.style.display === 'block' ? 'none' : 'block';
}

function showStatus(message) {
    statusMessage.innerText = message;
    statusMessage.style.display = 'block';
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000); //消息停留时间
}

function toggleMusic() {
    if (musicPlaying) {
        if (bgMusic.paused) {
            bgMusic.play();
            toggleBtn.innerHTML = '<div class="pause-icon"></div>';
            showStatus('继续播放音乐');
        } else {
            bgMusic.pause();
            toggleBtn.innerHTML = '<div class="play-icon"></div>';
            showStatus('音乐已暂停');
        }
    } else {
        bgMusic.play().then(() => {
            toggleBtn.innerHTML = '<div class="pause-icon"></div>';
            showStatus('正在为你播放音乐');
            musicPlaying = true;
        }).catch((error) => {
            console.error('自动播放失败：', error);
            showStatus('播放失败，请手动点击播放');
        });
    }
}

volumeControl.addEventListener('input', () => {
    const volume = parseFloat(volumeControl.value);
    bgMusic.volume = volume;

    document.querySelectorAll('.fengyanfengyu').forEach(text => {
        text.style.color = volume >= 0.6 ? '#ff69b4' : '#00cc66';
    }); //音量多少调节颜色变化
});

function togglePlayer() {
    var player = document.querySelector('.music-player');
    player.classList.toggle('expanded');
    if (!player.classList.contains('expanded')) {
        closeMusicList();
    }
}

function closeMusicList() {
    if (musicList.style.display === 'block') {
        musicList.style.display = 'none';
    }
}

let hideTimer;

function hidePlayer() {
    const player = document.querySelector('.music-player');
    if (player.classList.contains('expanded')) {
        player.classList.remove('expanded');
        closeMusicList();
    }
    clearTimeout(hideTimer);
}

function resetTimer() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePlayer, 5000);
}  //表示5秒后自动隐藏播放器

document.addEventListener('DOMContentLoaded', () => {
    loadMusicList();

    const player = document.querySelector('.music-player');
    player.addEventListener('mouseover', resetTimer);
    player.addEventListener('mouseout', resetTimer);
    player.addEventListener('click', resetTimer);

    setTimeout(() => {
        togglePlayer();
        resetTimer();
    }, 3000);  //设置网页加载3秒后弹出播放器

    prevBtn.addEventListener('click', () => {
        playPrev();
        resetTimer();
    });
    toggleBtn.addEventListener('click', () => {
        toggleMusic();
        resetTimer();
    });
    nextBtn.addEventListener('click', () => {
        playNext();
        resetTimer();
    });
    listBtn.addEventListener('click', () => {
        toggleMusicList();
        resetTimer();
    });
    volumeControl.addEventListener('input', () => {
        resetTimer();
    });
});