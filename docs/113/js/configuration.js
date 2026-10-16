// ====== 动态渲染课程 ======
const lessonsContainer = document.getElementById('lessonsContainer');

function renderSingleLesson(lesson) {
    return `
        <div class="lesson-wrap" data-lesson-id="${lesson.id}">
            <div class="lesson-item" data-src="${lesson.url}" data-name="${lesson.title}">
                ${lesson.title}
            </div>
            <div class="video-box">
                <button class="video-close">×</button>
                <p class="video-name"></p>
                <video controls preload="metadata" playsinline webkit-playsinline></video>
                <div class="video-controls-bar">
                    <select class="speed-control">
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1" selected>1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

function renderChapter(chapter) {
    const sectionsHtml = chapter.sections.map((section, idx) => {
        // 提取序号和标题
        const match = section.title.match(/^(\d+\.\d+(?:[-_]\d+)?)\s*(.*)$/);
        let numberPart = '';
        let titlePart = section.title;
        
        if (match) {
            numberPart = match[1];
            titlePart = match[2];
        }
        
        return `
            <div class="sub-lesson-item" data-src="${section.url}" data-name="${section.title}">
                <span class="lesson-number">
                    <span class="number-text">${numberPart}</span>
                    <span class="flower-icon">📚</span>
                </span>
                <span class="lesson-title">${titlePart}</span>
            </div>
            <div class="video-box">
                <div class="video-switch-wrap">
                    <button class="switch-btn prev-btn">⏮ 上一节</button>
                    <button class="switch-btn next-btn">下一节 ⏭</button>
                </div>
                <button class="video-close">×</button>
                <p class="video-name"></p>
                <video controls preload="metadata" playsinline webkit-playsinline></video>
                <div class="video-controls-bar">
                    <select class="speed-control">
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1" selected>1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                </div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="lesson-wrap" data-chapter-id="${chapter.id}">
            <div class="lesson-item main-lesson">
                ${chapter.title}
                <span class="arrow-icon">▼</span>
            </div>
            <div class="sub-lesson-list">
                ${sectionsHtml}
            </div>
        </div>
    `;
}

function loadAllCourses() {
    let html = '';
    for (const key in COURSE_CONFIG) {
        const course = COURSE_CONFIG[key];
        if (course.type === 'chapter') {
            html += renderChapter(course);
        } else if (course.type === 'single') {
            html += renderSingleLesson(course);
        }
    }
    lessonsContainer.innerHTML = html;
}

loadAllCourses();

// ====== 全局变量 ======
let currentPlayingItem = null;
let isEndedHandling = false;
const floatBtnBox = document.getElementById('floatBtnBox');
const toTopBtn = document.getElementById('toTopBtn');
const toBottomBtn = document.getElementById('toBottomBtn');
const searchInput = document.getElementById('lessonSearch');

// ====== 完整学习统计功能 ======
function getLearningData() {
    const defaultData = { stats: {}, progress: {}, settings: {} };
    const saved = localStorage.getItem('learning_stats_v2');
    if(saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return defaultData;
}

function saveLearningData(data) {
    localStorage.setItem('learning_stats_v2', JSON.stringify(data));
}

function trackPlay(videoName) {
    const data = getLearningData();
    if(!data.stats[videoName]) {
        data.stats[videoName] = { playCount: 0, completed: false, lastPlay: null, totalTime: 0 };
    }
    data.stats[videoName].playCount++;
    data.stats[videoName].lastPlay = new Date().toISOString();
    saveLearningData(data);
}

function trackComplete(videoName) {
    const data = getLearningData();
    if(!data.stats[videoName]) {
        data.stats[videoName] = { playCount: 0, completed: false, lastPlay: null, totalTime: 0 };
    }
    if(!data.stats[videoName].completed) {
        data.stats[videoName].completed = true;
        saveLearningData(data);
        updateStats();
    }
}

function trackPlayTime(videoName, duration) {
    if(duration < 0.5) return;
    const data = getLearningData();
    if(!data.stats[videoName]) {
        data.stats[videoName] = { playCount: 0, completed: false, lastPlay: null, totalTime: 0 };
    }
    data.stats[videoName].totalTime = (data.stats[videoName].totalTime || 0) + duration;
    saveLearningData(data);
}

function updateStats() {
    const allItems = document.querySelectorAll('.lesson-item:not(.main-lesson), .sub-lesson-item');
    const completedItems = Array.from(allItems).filter(item => item.classList.contains('completed'));
    const total = allItems.length;
    const completed = completedItems.length;
    const progress = total > 0 ? Math.floor((completed / total) * 100) : 0;
    
    const totalLessonsEl = document.getElementById('totalLessons');
    const completedLessonsEl = document.getElementById('completedLessons');
    const studyProgressEl = document.getElementById('studyProgress');
    
    if(totalLessonsEl) totalLessonsEl.textContent = total;
    if(completedLessonsEl) completedLessonsEl.textContent = completed;
    if(studyProgressEl) studyProgressEl.textContent = progress + '%';
    
    const learningData = getLearningData();
    learningData.progress = { total, completed, progress, lastUpdate: Date.now() };
    saveLearningData(learningData);
}

function showToast(message, isError = false) {
    const oldToast = document.querySelector('.custom-toast');
    if(oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 49%;
        left: 50%;
        transform: translateX(-50%);
        background: ${isError ? 'rgba(220,53,69,0.9)' : 'rgba(0,0,0,0.8)'};
        color: #ffff00;
        padding: 10px 20px;
        border-radius: 30px;
        font-size: 13px;
        z-index: 2000;
        max-width: 80%;
        white-space: nowrap;
        width: max-content;
        pointer-events: none;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function markAsCompleted(item) {
    if(!item.classList.contains('completed')) {
        item.classList.add('completed');
        const videoName = item.dataset.name || item.textContent.trim();
        trackComplete(videoName);
        updateStats();
        showToast('🎉 恭喜完成：' + videoName);
    }
}

function restoreCompletedStatus() {
    const data = getLearningData();
    const allItems = document.querySelectorAll('.lesson-item:not(.main-lesson), .sub-lesson-item');
    
    allItems.forEach(item => {
        const videoName = item.dataset.name || item.textContent.trim();
        if(data.stats[videoName] && data.stats[videoName].completed) {
            item.classList.add('completed');
        }
    });
    updateStats();
}

function showLearningDetails() {
    const data = getLearningData();
    const stats = data.stats;
    const completedCount = Object.values(stats).filter(s => s.completed).length;
    const totalPlayCount = Object.values(stats).reduce((sum, s) => sum + (s.playCount || 0), 0);
    const totalTime = Object.values(stats).reduce((sum, s) => sum + (s.totalTime || 0), 0);
    const totalMinutes = Math.floor(totalTime / 60);
    
    const recentList = Object.entries(stats)
        .filter(([_, s]) => s.lastPlay)
        .sort((a, b) => new Date(b[1].lastPlay) - new Date(a[1].lastPlay))
        .slice(0, 5);
    
    let details = `📊 学习统计\n━━━━━━━━━━━━━\n`;
    details += `📚 已完成: ${completedCount} 节\n`;
    details += `🎬 总播放: ${totalPlayCount} 次\n`;
    details += `⏱️ 学习时长: ${totalMinutes} 分钟\n\n`;
    
    if(recentList.length > 0) {
        details += `🕐 最近学习:\n`;
        recentList.forEach(([name, s]) => {
            const shortName = name.length > 25 ? name.substring(0, 22) + '...' : name;
            details += `  • ${shortName} (${s.playCount}次)\n`;
        });
    } else {
        details += `暂无学习记录\n`;
    }
    details += `\n━━━━━━━━━━━━━\n点击确定继续学习！`;
    alert(details);
}

// ====== 播放进度与加载管理 ======
function savePlayProgress(videoSrc, currentTime, duration) {
    if(videoSrc && currentTime > 0 && duration - currentTime > 5) {
        const progressData = { currentTime: currentTime, timestamp: Date.now(), duration: duration };
        localStorage.setItem(`video_progress_${videoSrc}`, JSON.stringify(progressData));
    }
}

function loadPlayProgress(videoElement, videoSrc) {
    const saved = localStorage.getItem(`video_progress_${videoSrc}`);
    if(saved) {
        try {
            const progress = JSON.parse(saved);
            if(progress.currentTime && progress.currentTime > 5 && progress.currentTime < videoElement.duration) {
                const resume = confirm(`上次播放到 ${Math.floor(progress.currentTime)} 秒，是否继续？`);
                if(resume) {
                    videoElement.currentTime = progress.currentTime;
                    return true;
                } else {
                    localStorage.removeItem(`video_progress_${videoSrc}`);
                }
            }
        } catch(e) {}
    }
    return false;
}

function showLoading(videoElement) {
    const parentBox = videoElement.closest('.video-box');
    if(!parentBox) return;
    
    let loadingTip = parentBox.querySelector('.loading-tip');
    if(!loadingTip) {
        loadingTip = document.createElement('div');
        loadingTip.className = 'loading-tip';
        loadingTip.textContent = '🎬 加载中...';
        parentBox.appendChild(loadingTip);
    }
    loadingTip.style.display = 'block';
    
    const handleCanPlay = () => {
        if(loadingTip) loadingTip.style.display = 'none';
        videoElement.removeEventListener('canplay', handleCanPlay);
    };
    videoElement.addEventListener('canplay', handleCanPlay, { once: true });
    
    setTimeout(() => { if(loadingTip) loadingTip.style.display = 'none'; }, 8000);
}

function closeCurrentVideo(videoBoxEl) {
    if (!videoBoxEl) return;
    const videoEl = videoBoxEl.querySelector('video');
    if(videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
        videoEl._isManualClear = true;
        videoEl.src = '';
        setTimeout(() => { if (videoEl) videoEl._isManualClear = false; }, 100);
    }
    videoBoxEl.style.display = 'none';
    const prevElement = videoBoxEl.previousElementSibling;
    if(prevElement && prevElement.classList) {
        prevElement.classList.remove('active');
    }
    currentPlayingItem = null;
}

// ====== 核心：视频控制与全屏兼容 ======
function initVideoEvents(video) {
    if(video._eventsInitialized) return;
    video._eventsInitialized = true;
    
    let playStartTime = null;
    let lastSavedTime = 0;
    
    video.addEventListener('play', () => { playStartTime = Date.now(); });
    
    video.addEventListener('pause', () => {
        if(playStartTime) {
            const duration = (Date.now() - playStartTime) / 1000;
            const videoBox = video.closest('.video-box');
            const prevEl = videoBox ? videoBox.previousElementSibling : null;
            const videoName = prevEl ? (prevEl.dataset.name || prevEl.textContent.trim()) : 'unknown';
            if(duration > 0.5) trackPlayTime(videoName, duration);
            playStartTime = null;
        }
    });
    
    video.addEventListener('timeupdate', () => {
        if(video.src && video.currentTime > 0 && video.duration) {
            if(Math.floor(video.currentTime) - lastSavedTime >= 5) {
                savePlayProgress(video.src, video.currentTime, video.duration);
                lastSavedTime = Math.floor(video.currentTime);
            }
        }
    });
    
    let lastTapTime = 0;
    video.addEventListener('touchend', (e) => {
        const currentTime = Date.now();
        const tapDelay = currentTime - lastTapTime;
        if (tapDelay < 300 && tapDelay > 0) {
            e.preventDefault();
            const rect = video.getBoundingClientRect();
            const touchX = e.changedTouches[0].clientX - rect.left;
            if (touchX < rect.width / 2) {
                video.currentTime = Math.max(0, video.currentTime - 5);
                showToast(`⏪ 后退5秒`);
            } else {
                video.currentTime = Math.min(video.duration, video.currentTime + 5);
                showToast(`⏩ 前进5秒`);
            }
        }
        lastTapTime = currentTime;
    });
    
   
    video.addEventListener('ended', async () => {
        if(isEndedHandling) return;
        isEndedHandling = true;
        
        const parentBox = video.closest('.video-box');
        const currentItem = parentBox ? parentBox.previousElementSibling : null;
        
        if(playStartTime) {
            const duration = (Date.now() - playStartTime) / 1000;
            const videoName = currentItem ? (currentItem.dataset.name || currentItem.textContent.trim()) : 'unknown';
            if(duration > 0.5) trackPlayTime(videoName, duration);
            playStartTime = null;
        }
        
        if(currentItem && !currentItem.classList.contains('completed')) {
            markAsCompleted(currentItem);
        }

        // 【核心修改点】：删除了之前创建新按钮的全部逻辑
        // 只保留这一段：如果是全屏状态，自动退出全屏回到普通网页状态
        if (document.fullscreenElement || document.webkitFullscreenElement || video.webkitDisplayingFullscreen) {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (video.webkitExitFullscreen) { // 兼容 iOS 设备的视频全屏
                    video.webkitExitFullscreen();
                }
            } catch (err) {
                console.log('自动退出全屏失败:', err);
            }
        }
        
        // 播放完后保持在当前界面，让用户可以看到原有的“×”关闭按钮
        isEndedHandling = false;
    });


    // 【配套修改点】：确保播放时移除按钮
    video.addEventListener('play', () => { 
        playStartTime = Date.now(); 
    });

        
    video.addEventListener('error', (e) => {
        if (!video.src || video.src === '' || video._isManualClear) return;
        console.error('视频加载失败:', e);
        const parentBox = video.closest('.video-box');
        if(parentBox) {
            const errorTip = document.createElement('div');
            errorTip.className = 'error-tip';
            errorTip.textContent = '⚠️ 视频加载失败，请检查链接';
            parentBox.appendChild(errorTip);
            setTimeout(() => errorTip.remove(), 3000);
        }
        showToast('⏳ 视频加载中……', true);
    });

    const speedControl = video.closest('.video-box')?.querySelector('.speed-control');
    if(speedControl) {
        speedControl.addEventListener('change', (e) => { video.playbackRate = parseFloat(e.target.value); });
    }
    
    const savedVolume = localStorage.getItem('video_volume');
    video.volume = savedVolume ? parseFloat(savedVolume) : 0.8;
    video.addEventListener('volumechange', () => { localStorage.setItem('video_volume', video.volume); });
}


function playVideo(item, videoBox, video, videoTitle, src, name) {
    // 唤醒抖音 APP 的 Scheme 协议
    if (src && src.startsWith('snssdk1128://')) {
        window.location.href = src;
        showToast('正在唤起抖音APP...');
        markAsCompleted(item);
        return;
    }

    // 如果是抖音的网页直链或代理链接，用新标签页/模拟点击打开
    if (src && (src.includes('aweme.snssdk.com') || src.includes('douyin.com') || src.includes('ixigua.com') || src.includes('proxy.php'))) {
        let realUrl = src;
        if (src.includes('proxy.php')) {
            const urlParams = new URLSearchParams(src.split('?')[1]);
            realUrl = urlParams.get('url') || src;
        }

        const a = document.createElement('a');
        a.href = realUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showToast('🚀 已为您在浏览器中打开视频');
        markAsCompleted(item);
        return;
    }

    if(!src || src.includes('VIDEO_URL_')) {
        showToast('⚠️ 视频链接未配置，请联系管理员', true);
        return;
    }
    
    document.querySelectorAll('.lesson-item, .sub-lesson-item').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.video-box').forEach(box => box.style.display = 'none');
    document.querySelectorAll('video').forEach(v => { v.pause(); v.src = ''; });
    
    item.classList.add('active');
    if(videoTitle) videoTitle.innerText = name;
    showLoading(video);
    video.src = src;
    videoBox.style.display = 'block';
    
    const hasProgress = loadPlayProgress(video, src);
    if(!hasProgress) video.currentTime = 0;

    video.play().catch(err => {
        console.log("自动播放拦截:", err);
        showToast('⚠️ 请点击视频播放按钮', true);
    });
    
    trackPlay(name);
    currentPlayingItem = item;
    
    setTimeout(() => { item.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 150);
    if(item.classList.contains('sub-lesson-item')) updateSwitchBtnState(item);
}




function updateSwitchBtnState(activeSubItem) {
    const subListWrap = activeSubItem.closest('.sub-lesson-list');
    if(!subListWrap) return;
    
    const allSubItems = Array.from(subListWrap.querySelectorAll('.sub-lesson-item'));
    const currIndex = allSubItems.indexOf(activeSubItem);
    const currVideoBox = activeSubItem.nextElementSibling;
    
    if(currVideoBox) {
        const prevBtn = currVideoBox.querySelector('.prev-btn');
        const nextBtn = currVideoBox.querySelector('.next-btn');
        if(prevBtn) currIndex === 0 ? prevBtn.classList.add('disable-state') : prevBtn.classList.remove('disable-state');
        if(nextBtn) currIndex === allSubItems.length - 1 ? nextBtn.classList.add('disable-state') : nextBtn.classList.remove('disable-state');
    }
}

// ====== 核心修复：事件委托逻辑优化 ======
function initAppEventDelegation() {
    lessonsContainer.addEventListener('click', function(e) {
        const target = e.target;

        // 1. 大课时展开/折叠（主章标题）
        if (target.classList.contains('main-lesson') || target.closest('.main-lesson')) {
            e.stopPropagation();
            const mainLessonEl = target.classList.contains('main-lesson') ? target : target.closest('.main-lesson');
            const subList = mainLessonEl.nextElementSibling;
            const arrow = mainLessonEl.querySelector('.arrow-icon');
            if(subList) {
                const isOpen = subList.style.display === 'block';
                subList.style.display = isOpen ? 'none' : 'block';
                if(arrow) arrow.textContent = isOpen ? '▼' : '▲';
            }
            return;
        }

        // 2. 核心修复点：使用 .closest() 完美向上兼容多级嵌套标签的点击判断
        const playableItem = target.closest('.sub-lesson-item') || target.closest('.lesson-item');
        
        if (playableItem && !playableItem.classList.contains('main-lesson')) {
            e.stopPropagation();
            const videoBox = playableItem.nextElementSibling;
            const video = videoBox?.querySelector('video');
            if(videoBox && video) {
                if(!video._eventsInitialized) initVideoEvents(video);
                playVideo(
                    playableItem, 
                    videoBox, 
                    video, 
                    videoBox.querySelector('.video-name'), 
                    playableItem.dataset.src, 
                    playableItem.dataset.name || playableItem.textContent.trim()
                );
            }
            return;
        }

        // 3. 视频手动关闭按钮
        if (target.classList.contains('video-close')) {
            e.stopPropagation();
            closeCurrentVideo(target.parentElement);
            return;
        }

        // 4. 上一节课切换
        if (target.classList.contains('prev-btn')) {
            e.stopPropagation();
            if (target.classList.contains('disable-state')) {
                showToast('已经是第一节课，没有上一节啦', true);
                return;
            }
            const subList = target.closest('.sub-lesson-list');
            if(subList) {
                const allSubItems = Array.from(subList.querySelectorAll('.sub-lesson-item'));
                let currIdx = allSubItems.findIndex(item => item.classList.contains('active'));
                if (currIdx > 0) allSubItems[currIdx - 1].click();
            }
            return;
        }

        // 5. 下一节课切换
        if (target.classList.contains('next-btn')) {
            e.stopPropagation();
            if (target.classList.contains('disable-state')) {
                showToast('已经是最后一节课，没有下一节啦', true);
                return;
            }
            const subList = target.closest('.sub-lesson-list');
            if(subList) {
                const allSubItems = Array.from(subList.querySelectorAll('.sub-lesson-item'));
                let currIdx = allSubItems.findIndex(item => item.classList.contains('active'));
                if (currIdx !== -1 && currIdx < allSubItems.length - 1) allSubItems[currIdx + 1].click();
            }
            return;
        }
    });
}

// ====== 侧边栏播放列表管理 ======
const playlistToggleBtn = document.getElementById('playlistToggleBtn');
const playlistSidebar = document.getElementById('playlistSidebar');
const closePlaylistBtn = document.getElementById('closePlaylistBtn');

function buildPlaylist() {
    const allItems = Array.from(document.querySelectorAll('.lesson-item:not(.main-lesson), .sub-lesson-item'));
    const playlistContent = document.getElementById('playlistContent');
    if(!playlistContent) return;
    
    playlistContent.innerHTML = '';
    allItems.forEach((item, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.textContent = `${index + 1}. ${item.dataset.name || item.textContent.trim()}`;
        if(item.classList.contains('completed')) {
            playlistItem.style.opacity = '0.7';
            playlistItem.style.textDecoration = 'line-through';
        }
        playlistItem.addEventListener('click', () => {
            item.click();
            playlistSidebar.classList.remove('open');
        });
        playlistContent.appendChild(playlistItem);
    });
}

if(playlistToggleBtn) {
    playlistToggleBtn.addEventListener('click', () => { buildPlaylist(); playlistSidebar.classList.add('open'); });
}
if(closePlaylistBtn) {
    closePlaylistBtn.addEventListener('click', () => playlistSidebar.classList.remove('open'));
}
document.addEventListener('click', (e) => {
    if(playlistSidebar && playlistSidebar.classList.contains('open')) {
        if(!playlistSidebar.contains(e.target) && e.target !== playlistToggleBtn) {
            playlistSidebar.classList.remove('open');
        }
    }
});

// ====== 工具辅助功能 ======
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        document.querySelectorAll('.lesson-wrap').forEach(wrap => {
            wrap.style.display = wrap.textContent.toLowerCase().includes(searchText) ? 'block' : 'none';
        });
    });
}

if(toTopBtn) toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
if(toBottomBtn) toBottomBtn.addEventListener('click', () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));

let scrollTimer = null;

window.addEventListener('scroll', () => {
    if (!floatBtnBox) return;

    if (window.scrollY > 200) {
        // 通过添加类名来触发 CSS 的淡入效果
        floatBtnBox.classList.add('active-show');
        
        if (scrollTimer) clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(() => {
            // 5秒无动作，移除类名，触发 CSS 淡出效果
            floatBtnBox.classList.remove('active-show');
        }, 5000);
    } else {
        floatBtnBox.classList.remove('active-show');
        if (scrollTimer) clearTimeout(scrollTimer);
    }
});


const statsCard = document.getElementById('statsCard');
if(statsCard) statsCard.addEventListener('click', showLearningDetails);

// 键盘控制支持
document.addEventListener('keydown', (e) => {
    const activeVideo = document.querySelector('.video-box[style*="display: block"] video');
    if(!activeVideo) return;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            activeVideo.paused ? activeVideo.play() : activeVideo.pause();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            activeVideo.currentTime = Math.max(0, activeVideo.currentTime - 5);
            showToast(`⏪ 后退5秒`);
            break;
        case 'ArrowRight':
            e.preventDefault();
            activeVideo.currentTime = Math.min(activeVideo.duration, activeVideo.currentTime + 5);
            showToast(`⏩ 前进5秒`);
            break;
        case 'f':
        case 'F':
            e.preventDefault();
            if(activeVideo.requestFullscreen) activeVideo.requestFullscreen();
            else if(activeVideo.webkitEnterFullscreen) activeVideo.webkitEnterFullscreen();
            break;
        case 'Escape':
            const closeBtn = activeVideo.closest('.video-box')?.querySelector('.video-close');
            if(closeBtn) closeBtn.click();
            break;
    }
});

// 手机手势切换
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});
document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    if(Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
        const activeVideoBox = document.querySelector('.video-box[style*="display: block"]');
        if(activeVideoBox) {
            const btn = diffX > 0 ? activeVideoBox.querySelector('.prev-btn') : activeVideoBox.querySelector('.next-btn');
            if(btn && !btn.classList.contains('disable-state')) {
                btn.click();
                showToast(diffX > 0 ? '👈 上一节' : '👉 下一节');
            }
        }
    }
});

// ====== 初始化主入口 ======
document.addEventListener('DOMContentLoaded', () => {
    initAppEventDelegation();
    restoreCompletedStatus();
    console.log('✅ 音标课堂系统：样式更新与Bug修复完成，高兼容运行中。');
    
    setTimeout(() => { showToast('🎧 欢迎来到英语音标课堂'); }, 500);
});
