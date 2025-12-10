var rule = {
    author: '🌺风言锋语88🌺',
    title: '短剧天堂',
    host: 'https://duanjutt.tv',
    hostJs: '',
    headers: {'User-Agent': 'MOBILE_UA'},
    编码: 'utf-8',
    timeout: 5000,
    homeUrl: '/',
    url: '/vodshow/fyfilter---fypage---.html',
    filter_url: '{{fl.cateId}}--{{fl.by}}---{{fl.letter}}',
    detailUrl: '',
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    class_name: '逆袭&甜宠&虐恋&穿越&重生&都市&现代言情&古装&古代言情&战神&神医&神豪&超能&萌宝&复仇&脑洞&赘婿&玄幻&热血&其他',
    class_url: '1&2&3&4&5&20&21&22&23&24&25&26&27&28&29&30&31&32&33&34',
    tab_rename:{'DPlayer-H5播放器':'🌺风言锋语88🌺'},
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        5: {cateId: '5'},
        20: {cateId: '20'},
        21: {cateId: '21'},
        22: {cateId: '22'},
        23: {cateId: '23'},
        24: {cateId: '24'},
        25: {cateId: '25'},
        26: {cateId: '26'},
        27: {cateId: '27'},
        28: {cateId: '28'},
        29: {cateId: '29'},
        30: {cateId: '30'},
        31: {cateId: '31'},
        32: {cateId: '32'},
        33: {cateId: '33'},
        34: {cateId: '34'}
    },
    play_parse: true,
    parse_url: '',
    lazy: `js:
var kcode = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
var kurl = kcode.url;
input = {
parse: 0, url: kurl, header: {"User-Agent": 'MOBILE_UA', "Referer":"https://duanjutt.tv"}
}`,
    limit: 9,
    double: false,
    推荐: '*;*;*;*;*',
    一级: '.myui-vodlist li;a&&title;a&&data-original;.text-right&&Text;a&&href',
    二级: {
//名称;类型
        "title": "h1&&Text;.data:eq(0)&&a:eq(0)&&Text",
//图片
        "img": ".picture&&img&&data-original",
//主要描述;年份;地区;演员;导演
        "desc": ".data:eq(1)&&Text;.data:eq(0)&&a:eq(-1)&&Text;.data:eq(0)&&a:eq(-2)&&Text;.data--span:eq(2)&&Text;.data--span:eq(3)&&Text",
//简介
        "content": ".data:eq(-1)&&Text",
//线路数组
        "tabs": ".nav-tabs:has(li)&&a",
//线路标题
        "tab_text": "body&&Text",
//播放数组 选集列表
        "lists": ".myui-content__list:eq(#id)&&a",
//选集标题
        "list_text": "body&&Text",
//选集链接
        "list_url": "a&&href"
    },
    搜索: '.myui-vodlist__media .thumb;*;*;*;*',
    filter: 'H4sIAAAAAAAAA+3WW0sbQRQH8Pf9GPOcQkxMrb55N97vV3xI7UJFa0HXgoRA2k1UqolWgrFQY1sVYiFewIY2i/hlMruTb+GG/ueMJW95C+zbzm92z8zD+XM2qrEm1ragRdmKvsXa2FLE0MNvmI+tRd7p7tq5s3huz11/iKxuurAQZWsuV+Lb4mehyu6iicV8/9jJfOPX38EBYvH10P64Bw6qt68eRfEzuJm4spNyMmfgEIstxnx0vVXdMPR1dT1eyNo3qZrr8WS+YuZRggq3A9pJOiAdJJ2QTpIuSBdJN6SbpAfSQ9IL6SXpg/SRhCFhkn5IP8kAZIBkEDJIMgQZIhmGDJOMQEZIRiGjJGOQMZJxyDjJBGSCZBIySTIFmSKZhkyTzEBmSGYhsyRzkDmSecg8if9FK6z69F+vvN5SfWKnj3jpoKZP7Gyxkr1HAWPZfVXWLZdK9m0GO2+XjQ3VzDcJvruNnY2l9+t69Vht0aexgL+eKJkP/M8nmRm/Skf6tmydi3zcNpNyVyWNH1yIc/LAc6/5SiXO3j1xLnPSm71sedlqmGyF6siW2+x835L9HlLZusyJu1/SX6rzi0lhPkhvUX64z69Ppb9SabtIla0d6a1enrw8NUqegvXMKpH4Yt/L+RFUs0r8PuFXj9Kf/Q+mE/yvzF9QTSnHLIgfcelqPvFksWwdS/fmk5enxsiTFnsC8UnvbkgNAAA='
}