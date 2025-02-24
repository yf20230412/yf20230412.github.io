// 引入流行音乐的歌曲列表
import { popMusicFiles } from './流行音乐.js';

// 使用流行音乐的歌曲列表
var musicFiles = popMusicFiles;

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
    var pausedTime = 0; // 用于记录暂停时的时间点
    var isPaused = false; // 用于记录是否暂停

    // 加载音乐列表
    function loadMusicList() {
        musicFiles.forEach((music, index) => {
            var li = document.createElement('li');
            li.innerText = music.split('/').pop(); // 显示文件名
            li.addEventListener('click', () => {
                playSelectedMusic(index);
            });
            musicList.appendChild(li);
        });
    }

    // 播放选中的音乐
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

    // 显示/隐藏音乐列表
    function toggleMusicList() {
        musicList.style.display = musicList.style.display === 'block' ? 'none' : 'block';
    }

    // 显示状态信息
    function showStatus(message) {
        statusMessage.innerText = message;
        statusMessage.style.display = 'block';
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000); // 消息显示时间
    }

    // 切换播放/暂停
    function toggleMusic() {
        if (musicPlaying) {
            if (bgMusic.paused) {
                bgMusic.currentTime = pausedTime; // 恢复暂停时的时间点
                bgMusic.play();
                toggleBtn.innerHTML = '<div class="pause-icon"></div>';
                showStatus('继续播放音乐');
                isPaused = false;
            } else {
                bgMusic.pause();
                pausedTime = bgMusic.currentTime; // 记录暂停时的时间点
                toggleBtn.innerHTML = '<div class="play-icon"></div>';
                showStatus('音乐已暂停');
                isPaused = true;
            }
        } else {
            bgMusic.play().then(() => {
                toggleBtn.innerHTML = '<div class="pause-icon"></div>';
                showStatus('正在为你播放音乐');
                musicPlaying = true;
                isPaused = false;
            }).catch((error) => {
                console.error('自动播放失败：', error);
                showStatus('播放失败，请手动点击播放');
            });
        }
    }

    // 音量控制事件监听
    volumeControl.addEventListener('input', () => {
        const volume = parseFloat(volumeControl.value); // 获取当前音量值
        bgMusic.volume = volume; // 设置音乐音量

        // 根据音量值动态改变公众号文字颜色
        document.querySelectorAll('.fengyanfengyu').forEach(text => {
            if (volume >= 0.6) {
                text.style.color = '#ff69b4'; // 粉红色
            } else {
                text.style.color = '#00cc66'; // 绿色
            }
        });
    });

    // 播放器展开/隐藏切换
    function togglePlayer() {
        var player = document.querySelector('.music-player');
        player.classList.toggle('expanded');

        // 如果播放器被隐藏，并且音乐列表处于展开状态，则关闭音乐列表
        if (!player.classList.contains('expanded')) {
            closeMusicList();
        }
    }

    // 关闭音乐列表的函数
    function closeMusicList() {
        if (musicList.style.display === 'block') {
            musicList.style.display = 'none';
        }
    }

    // 自动隐藏播放器和音乐列表
    let hideTimer;

    function hidePlayer() {
        const player = document.querySelector('.music-player');
        if (player.classList.contains('expanded')) {
            player.classList.remove('expanded');
            closeMusicList(); // 关闭音乐列表
        }
        clearTimeout(hideTimer);
    }

    function resetTimer() {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(hidePlayer, 5000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadMusicList();
        playSelectedMusic(currentIndex);

        const player = document.querySelector('.music-player');
        player.addEventListener('mouseover', resetTimer);
        player.addEventListener('mouseout', resetTimer);
        player.addEventListener('click', resetTimer);

        setTimeout(() => {
            togglePlayer();
            resetTimer();
        }, 3000);

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