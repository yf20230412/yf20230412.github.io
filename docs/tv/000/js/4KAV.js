var rule = {
author: '风言锋语88/240701/第二版',
title: '4KAV',
类型: '影视',
host: 'https://4k-av.com',
hostJs: '',
headers: {'User-Agent': 'IOS_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/fyclassfyfilter/page-fypage.html[/fyclassfyfilter]',
filter_url: '{{fl.class}}',
detailUrl: '',
searchUrl: '/s?q=**',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '剧集&电影',
class_url: 'tv&movie',
filter_def: {},

play_parse: true,
lazy: `js:
if (/m3u8|mp4/.test(input)) {
input = { jx: 0, parse: 0, url: input }
} else {
let kurl = request(input).match(/<source src="(.*?)"/)[1];
input = { jx: 0, parse: 0, url: kurl }
}
`,

limit: 9,
double: false,
推荐: '*',
一级: '.NTMitem;a&&title;img&&src;.tags&&Text;a&&href',
二级: `js:
let khtml = request(input);
VOD = {};
VOD.vod_id = input;
VOD.vod_name = pdfh(khtml, '#MainContent_titleh12&&div:eq(1)&&Text');
VOD.type_name = pdfh(khtml, '.tags--span&&Text');
VOD.vod_pic = pdfh(khtml, '#MainContent_poster&&img&&src');
VOD.vod_remarks = pdfh(khtml, '.videodetail&&label:eq(0)&&Text');
VOD.vod_year = pdfh(khtml, '.videodetail&&a&&Text');
VOD.vod_area = pdfh(khtml, '.videodetail&&label:eq(1)&&Text');
VOD.vod_director = '小鱼';
VOD.vod_actor = '小鱼';
VOD.vod_content = pdfh(khtml, '.videodesc&&Text');
VOD.vod_play_from = '🌺风言锋语88🌺';

let klists = [];
let kcode = pdfa(khtml, 'ul#rtlist&&li');
if ( kcode == 0) {
    kcode = pdfa(khtml, '#MainContent_poster&&a');
    kcode.forEach((kc) => {
    let kname = pdfh(kc, 'a&&title').replace('电影海报','');
    let khref = pdfh(kc, 'a&&href').replace('poster.jpg','');
    let klist = kname + '$' + khref;
    klists.push(klist);
    });
    VOD.vod_play_url = klists.join('#');
} else {
    kcode;
    kcode.forEach((kc) => {
    let kname = pdfh(kc, 'span&&Text');
    let khref = pdfh(kc, 'img&&src').replace('screenshot.jpg','');
    let klist = kname + '$' + khref;
    klists.push(klist);
    });
    VOD.vod_play_url = klists.join('#');
}
`,
搜索: '*',

filter: {
"tv":[
{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"动作","v":"/tag/动作"},{"n":"剧情","v":"/tag/剧情"},{"n":"冒险","v":"/tag/冒险"},{"n":"喜剧","v":"/tag/喜剧"},{"n":"国产剧","v":"/tag/国产剧"},{"n":"恐怖","v":"/tag/恐怖"},{"n":"战争","v":"/tag/战争"},{"n":"科幻","v":"/tag/科幻"},{"n":"动画","v":"/tag/动画"},{"n":"韩剧","v":"/tag/韩剧"},{"n":"犯罪","v":"/tag/犯罪"},{"n":"纪录片","v":"/tag/纪录片"}]},
{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"2024","v":"/2024"},{"n":"2023","v":"/2023"},{"n":"2022","v":"/2022"},{"n":"2021","v":"/2021"},{"n":"2020","v":"/2020"},{"n":"2019","v":"/2019"}]}
]
}
}