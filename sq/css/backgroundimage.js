    // 图片URL数组
    const backgrounds = [
        'images/background1.jpg',
        'images/background2.jpg',
        'images/background3.jpg',
		'images/background4.jpg',
		'images/background5.jpg',
		'images/background6.jpg',
		'images/background7.jpg',
		'images/background8.jpg',
		'images/background9.jpg',
		'images/background10.jpg',
        // 添加更多图片路径...
    ];

    // 随机选择一张背景图片并设置为body的背景
    function setBackgroundImage() {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
    }

    // 页面加载时执行
    window.onload = setBackgroundImage;	