console.log("Navigation导航文件加载开始");

(function() {
  // 定义HTML结构
  const htmlTemplate = `
        <div class="daohang-info">
            <div class="marquee-container">
                <span class="marquee-content">
                    遇见湖北，遇见美好，大美武汉欢迎大家来做客！ 反诈宣传：
                    <span id="xiaoyu" >小鱼一言获取中...
                    </span>
                </span>
            </div>
        </div>
    `;

  // 定义CSS样式
  const cssStyles = `
        <style>
            /* 一言置顶显示 */
            .daohang-info {
                position: fixed;
                top: 0;
                width: 100%;
                text-align: center;
                background-color: #black;
                padding: 12px 0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                z-index: 999;
            }

            .marquee-container {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
            }

            .marquee-content {
                display: inline-block;
                animation: marquee 12s linear infinite;  /* 动画持续时间为 12 秒，线性过渡，无限循环 */
                padding-left: 100%;
                font-size: 20px;
                font-weight: 700;
                background: linear-gradient(90deg, #0eaf6d, #ff6ac6, #e6d205, #8b2ce0,#ff6384,#08dfb4);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                position: relative;
            }

            /* 流动渐变动画 */
            @keyframes gradientFlow {
                0% {
                    background-position: 0% 50%;
                }

                50% {
                    background-position: 100% 50%;
                }

                100% {
                    background-position: 0% 50%;
                }
            }

            .marquee-content {
                background-size: 200% auto;
                animation: marquee 28s linear infinite, gradientFlow 5s ease infinite;
            }

            @keyframes marquee {
                0% {
                    transform: translateX(0);
                }

                100% {
                    transform: translateX(-100%);
                }
            }

            /* 适配移动端 */
            @media (max-width: 768px) {
                .marquee-content {
                    font-size: 16px;
                    animation-duration: 8s;
                }
            }
        </style>
    `;

  // 将CSS插入到<head>中
  document.head.insertAdjacentHTML('beforeend', cssStyles);

  // 确保在文档加载完成后将HTML插入到<body>中
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('afterbegin', htmlTemplate);

    // 检查是否正确插入
    const daohangInfo = document.querySelector('.daohang-info');
    if (daohangInfo) {
      console.log("HTML模板已正确插入到<body>中。");
    } else {
      console.error("HTML模板未正确插入到<body>中。");
    }

    // 确保 DOM 更新完成后再查询元素
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 初始化一言内容
        const sentences = [
          "诈骗分子常常利用人们的旅游心理进行诈骗。",
          "请不要轻信陌生人的低价旅游套餐，谨防诈骗。",
          "在旅游过程中，注意保护个人信息，避免被诈骗。",
          "遇到可疑的旅游推销，请及时报警。",
          "不要轻易点击不明链接，防止个人信息泄露。",
          "旅游诈骗手段多样，一定要提高警惕。"
        ];

        // 随机选择一条文本
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        // 获取页面中的 DOM 元素并设置其文本内容
        const dom = document.querySelector('#xiaoyu');
        if (dom) {
          dom.innerText = randomSentence;
        } else {
          console.error("元素 #xiaoyu 在 DOM 中找不到.");
        }

        // 滚动通知逻辑
        let scrollCount = 0; // 滚动计数器
        const maxScrolls = 2; // 最大滚动次数

        // 定义滚动事件处理函数
        function handleScroll() {
          scrollCount++;
          if (scrollCount >= maxScrolls) {
            // 达到滚动次数后隐藏通知
            dom.style.display = 'none';
            console.log("滚动通知已隐藏。");
            // 移除滚动事件监听器
            window.removeEventListener('scroll', handleScroll);
          }
        }

        // 监听滚动事件
        window.addEventListener('scroll', handleScroll);

      });
    });
  });
})();

console.log("Navigation导航文件加载完成");