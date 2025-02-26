<!--音乐🎶-->
    <audio id="bg-music" loop></audio>
    <!-- 音乐播放器 -->
    <div class="music-player">
        <!-- 隐藏时的左侧边框 -->
        <div class="toggle-border" onclick="togglePlayer()"></div>
        <!-- 音乐列表 -->
        <ul class="music3" id="music-list3"></ul>
        <!-- 播放器内容 -->
        <div class="controls-container">
            <!-- 第一排按钮 -->
            <div class="controls-row">
                <button id="prev-btn" class="circle-btn">
                    <div class="prev-icon"></div>
                </button>
                <button id="toggle-btn" class="circle-btn">
                    <div class="play-icon"></div>
                </button>
                <button id="next-btn" class="circle-btn">
                    <div class="next-icon"></div>
                </button>
                <button id="list-btn" class="circle-btn">
                    <div class="list-icon">
                        <div>
                        </div> <!-- 这里的div元素不能遗漏 -->
                    </div>
                </button>
            </div>
            <!-- 新增的第二排按钮 -->
            <div class="controls-row-secondary">
                <button id="rewind-btn" class="circle-btn">
                    <div class="rewind-icon">⏪</div>
                </button>
                <button class="circle-btn" disabled></button> <!-- 占位按钮 -->
                <button id="fast-forward-btn" class="circle-btn">
                    <div class="fast-forward-icon">⏩</div>
                </button>
                <button class="circle-btn" disabled></button> <!-- 占位按钮 -->
            </div>
            <!-- 音量控制滑块 -->
            <input type="range" id="volume-control" min="0" max="1" step="0.1" value="0.5">
            <p class="fengyanfengyu">公众号：风言锋语88</p>
        </div>
    </div>

    <!-- 状态消息 -->
    <div id="status-message"></div>
    <!--完-->