console.log("Navigation导航文件加载开始");

(function() {
  // 定义HTML结构
  const htmlTemplate = `
    <div class="daohang-info">
		  <div class="marquee-container">
			  <span class="marquee-content" style="font-size: 20px;">
				  遇见湖北，遇见美好，大美武汉欢迎大家来做客！ 反诈宣传：
				  <span id="xiaoyu" style="font-size: 26px;">
					  小鱼一言获取中...
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
                left: 0;
                width: 100%;
                text-align: center;
                background-color: #000;
                padding: 12px 0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                z-index: 999;
                overflow: hidden; /* 确保内容超出时不会溢出 */
                transition: background-color 0.5s ease; /* 背景色过渡动画 */
            }
            
            .daohang-info.white-bg {
                background-color: white; /* 白色背景的类 */
            }
            
            .daohang-info.hidden {
                opacity: 0;
                height: 0;
                padding: 0;
                visibility: hidden;
            }

            .marquee-container {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
            }

            .marquee-content {
                display: inline-block;
                animation: marquee 10s linear 2 forwards, gradientFlow 5s ease infinite;
                padding-left: 100%;
                font-weight: 700;
                color: red; /* 固定红色 */
                white-space: nowrap;
            }
            
            #xiaoyu {
                animation: gradientFlow 5s ease infinite; /* 单独应用渐变动画 */
                background: linear-gradient(90deg, #0eaf6d, #ff6ac6, #e6d205, #8b2ce0, #ff6384, #08dfb4);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
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

            /* 文字滚动动画 */
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

  // 在 DOM 加载完成后插入 HTML 结构并初始化逻辑
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('afterbegin', htmlTemplate);

    // 检查是否正确插入
    const daohangInfo = document.querySelector('.daohang-info');
    if (daohangInfo) {
      console.log("HTML模板已正确插入到<body>中。");
    } else {
      console.error("HTML模板未正确插入到<body>中。");
    }

    // 初始化一言内容
        const sentences = [
            "诈骗分子常常利用人们的旅游心理进行诈骗。",
            "请不要轻信陌生人的低价旅游套餐，谨防诈骗。",
            "在旅游过程中，注意保护个人信息，避免被诈骗。",
            "遇到可疑的旅游推销，请及时报警。",
            "不要轻易点击不明链接，防止个人信息泄露。",
            "旅游诈骗手段多样，一定要提高警惕。"
        ];
        const xiaoyuDom = document.querySelector('#xiaoyu');
        if (xiaoyuDom) {
            xiaoyuDom.innerText = sentences[Math.floor(Math.random() * sentences.length)];
        }

    // 监听动画结束，切换背景色
        const marqueeContent = document.querySelector('.marquee-content');
        let animationCount = 0;
        
        marqueeContent.addEventListener('animationend', function(e) {
            if (e.animationName === 'marquee') {
                animationCount++;
                console.log(`动画播放次数: ${animationCount}`);
                
                if (animationCount >= 2) {
                    daohangInfo.classList.add('white-bg');
                    console.log('导航栏背景已切换为白色');
                }
            }
        });
    });
})();

console.log("Navigation导航文件加载完成");