// 创建 intro 部分
function createIntro() {
    // 创建 intro 容器
    const introDiv = document.createElement('div');
    introDiv.className = 'ch intro';

    // 创建 container
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    // 创建 hello
    const helloDiv = document.createElement('div');
    helloDiv.className = 'hello';

    // 创建 slogan
    const sloganH1 = document.createElement('h1');
    sloganH1.id = 'slogan';
    sloganH1.textContent = '思考中...';
    helloDiv.appendChild(sloganH1);

    // 创建 h2
    const h2 = document.createElement('h2');
    const circleDiv = document.createElement('div');
    circleDiv.className = 'circle';
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        circleDiv.appendChild(span);
    }
    h2.appendChild(circleDiv);
    h2.appendChild(document.createTextNode(' 小鱼'));
    helloDiv.appendChild(h2);

    containerDiv.appendChild(helloDiv);
    introDiv.appendChild(containerDiv);

    return introDiv;
}

// 创建 about 部分
function createAbout() {
    // 创建 about 容器
    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'ch about';

    // 创建 container
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    // 创建 chtitle
    const chtitleH2 = document.createElement('h2');
    chtitleH2.className = 'chtitle';
    chtitleH2.innerHTML = 'Who is <span> </span>';
    containerDiv.appendChild(chtitleH2);

    // 创建 clear
    const clearDiv = document.createElement('div');
    clearDiv.className = 'clear';

    // 创建 introduct
    const introductDiv = document.createElement('div');
    introductDiv.className = 'introduct';

    // 创建 avatar
    const avatarImg = document.createElement('img');
    avatarImg.className = 'avatar';
    avatarImg.src = 'https://q1.qlogo.cn/g?b=qq&nk=1010164222&s=640';
    introductDiv.appendChild(avatarImg);

    // 创建 p 段落
    const p1 = document.createElement('p');
    p1.innerHTML = '&nbsp;&nbsp;🔸 学习是一个永无止境的过程，你知道的越多，你不知道的也会越多，然而，正是在这有限的时光里，若能坚持每日多学一点，哪怕只是微小的进步，你终将一步步迈向那个理想中的自己。<br>&nbsp;&nbsp;因为，正如古语所言：“不积跬步，无以至千里；不积小流，无以成江海。”每一份努力，都不会被辜负；每一次坚持，都在为你的未来默默铺路。相信自己，用汗水浇灌希望的种子，用行动书写属于自己的辉煌篇章。终有一天，你会成为那个光芒万丈的自己！';
    introductDiv.appendChild(p1);

    const p2 = document.createElement('p');
    p2.style.paddingBottom = '1em';
    p2.textContent = 'How lucky to meet you!';
    introductDiv.appendChild(p2);

    const p3 = document.createElement('p');
    p3.innerHTML = '你好，我是小鱼 <sup>Small fish</sup> ，对有趣的世界和可能有趣的你充满好奇，热爱折腾~';
    introductDiv.appendChild(p3);

    const p4 = document.createElement('p');
    p4.textContent = '茫茫人海，感恩与你不期而遇。期待着我们共同成长，成为更好的自己。在学习的路上，我们不孤单，因为有你，有我，有这无尽星空的见证。';
    introductDiv.appendChild(p4);

    const chatboxDiv = document.createElement('div');
    chatboxDiv.className = 'chatbox';
    const lineDiv = document.createElement('div');
    lineDiv.className = 'line loading';
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        lineDiv.appendChild(span);
    }
    chatboxDiv.appendChild(lineDiv);
    introductDiv.appendChild(chatboxDiv);

    clearDiv.appendChild(introductDiv);

    // 创建 skill 列表
    const skillUl = document.createElement('ul');
    skillUl.className = 'skill clear';

    const skills = [
        { name: '颜值', width: '77%', desc: '若非群玉山头见 会向瑶台月下逢' },
        { name: '身材', width: '80%', desc: '似撼天狮子下云端 如摇地貔貅临座上' },
        { name: '三观', width: '88%', desc: '三观永远比五官正~' },
        { name: '钱包', width: '35%', desc: '手机不贴膜 上厕所不折纸' },
        { name: '梦想实现', width: '46%', desc: '相距很远 努力实现' },
        { name: '生活态度', width: '76%', desc: '颇为满意 小有不足' },
        { name: '未来期望', width: '94%', desc: '实现理想 彼此幸福~' },
        { name: '迷茫指数', width: '50%', desc: '时而清醒 时而迷茫' }
    ];

    skills.forEach(skill => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = skill.name;
        li.appendChild(p);

        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress';

        const innerDiv = document.createElement('div');
        innerDiv.style.width = skill.width;
        progressDiv.appendChild(innerDiv);

        const span = document.createElement('span');
        span.textContent = skill.desc;
        progressDiv.appendChild(span);

        li.appendChild(progressDiv);
        skillUl.appendChild(li);
    });

    clearDiv.appendChild(skillUl);
    containerDiv.appendChild(clearDiv);
    aboutDiv.appendChild(containerDiv);

    return aboutDiv;
}

// 将内容插入到 main 容器中
function insertContentIntoMain() {
    const mainDiv = document.querySelector('.main');
    if (!mainDiv) {
        console.error('未找到类为 "main" 的容器，请确保页面中存在 <div class="main"></div>');
        return;
    }

    mainDiv.innerHTML = ''; // 清空容器
    mainDiv.appendChild(createIntro());
    mainDiv.appendChild(createAbout());
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', insertContentIntoMain);
