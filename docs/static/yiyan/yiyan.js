(function xiaoyu() {
    // 定义一个数组，存储多条文本
    var sentences = [
        "诈骗分子常常利用人们的旅游心理进行诈骗。",
        "请不要轻信陌生人的低价旅游套餐，谨防诈骗。",
        "在旅游过程中，注意保护个人信息，避免被诈骗。",
        "遇到可疑的旅游推销，请及时报警。",
        "不要轻易点击不明链接，防止个人信息泄露。",
        "旅游诈骗手段多样，一定要提高警惕。"
    ];

    // 随机选择一条文本
    var randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    // 获取页面中的 DOM 元素并设置其文本内容
    var dom = document.querySelector('#xiaoyu');
    Array.isArray(dom) ? dom[0].innerText = randomSentence : dom.innerText = randomSentence;
})();