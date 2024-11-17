import {load, _} from 'assets://js/lib/cat.js';

let key = 'naerxun';
let siteKey = '';
let siteType = 0;
let url = 'https://www.naerxun.net';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36';

async function request (reqUrl, mth) {
  const res = await req (reqUrl, {
    method: mth || 'get',
    headers: {
      'User-Agent': UA,
      referer: url,
    },
    postType: mth === 'post' ? 'form' : '',
  });
  return res.content;
}

async function init(cfg) {
  siteKey = cfg.skey;
  siteType = cfg.stype;
}

async function home (filter) {
  let classes = [
    {
      type_id: '2',
      type_name: '电视剧',
    },
    {
      type_id: '1',
      type_name: '电影',
    },    
    {
      type_id: '3',
      type_name: '综艺',
    },
    {
      type_id: '4',
      type_name: '动漫',
    },
  ];
  let filterObj = {'1':[{key:'cateId',name:'类型',value:[{n:'全部',v:'1'},{n:'动作片',v:'6'},{n:'喜剧片',v:'7'},{n:'爱情片',v:'8'},{n:'科幻片',v:'9'},{n:'恐怖片',v:'10'},{n:'剧情片',v:'11'},{n:'战争片',v:'12'},{n:'动画片',v:'24'},{n:'纪录片',v:'23'},],},{key:'classez',name:'剧情',value:[{n:'全部',v:''},{n:'喜剧',v:'喜剧'},{n:'爱情',v:'爱情'},{n:'恐怖',v:'恐怖'},{n:'动作',v:'动作'},{n:'科幻',v:'科幻'},{n:'剧情',v:'剧情'},{n:'战争',v:'战争'},{n:'警匪',v:'警匪'},{n:'犯罪',v:'犯罪'},{n:'动画',v:'动画'},{n:'奇幻',v:'奇幻'},{n:'武侠',v:'武侠'},{n:'冒险',v:'冒险'},{n:'枪战',v:'枪战'},{n:'恐怖',v:'恐怖'},{n:'悬疑',v:'悬疑'},{n:'惊悚',v:'惊悚'},{n:'经典',v:'经典'},{n:'青春',v:'青春'},{n:'文艺',v:'文艺'},{n:'微电影',v:'微电影'},{n:'古装',v:'古装'},{n:'历史',v:'历史'},{n:'运动',v:'运动'},{n:'农村',v:'农村'},{n:'儿童',v:'儿童'},{n:'网络电影',v:'网络电影'},],},{key:'area',name:'地区',value:[{n:'全部',v:''},{n:'大陆',v:'大陆'},{n:'香港',v:'香港'},{n:'台湾',v:'台湾'},{n:'美国',v:'美国'},{n:'法国',v:'法国'},{n:'英国',v:'英国'},{n:'日本',v:'日本'},{n:'韩国',v:'韩国'},{n:'德国',v:'德国'},{n:'泰国',v:'泰国'},{n:'印度',v:'印度'},{n:'意大利',v:'意大利'},{n:'西班牙',v:'西班牙'},{n:'加拿大',v:'加拿大'},{n:'其他',v:'其他'},],},{key:'year',name:'年份',value:[{n:'全部',v:''},{n:'2024',v:'2024'},{n:'2023',v:'2023'},{n:'2022',v:'2022'},{n:'2021',v:'2021'},{n:'2020',v:'2020'},{n:'2019',v:'2019'},{n:'2018',v:'2018'},{n:'2017',v:'2017'},{n:'2016',v:'2016'},{n:'2015',v:'2015'},{n:'2014',v:'2014'},{n:'2013',v:'2013'},{n:'2012',v:'2012'},{n:'2011',v:'2011'},{n:'2010',v:'2010'},],},{key:'lang',name:'语言',value:[{n:'全部',v:''},{n:'国语',v:'国语'},{n:'英语',v:'英语'},{n:'粤语',v:'粤语'},{n:'闽南语',v:'闽南语'},{n:'韩语',v:'韩语'},{n:'日语',v:'日语'},{n:'法语',v:'法语'},{n:'德语',v:'德语'},{n:'其它',v:'其它'},],},],'2':[{key:'cateId',name:'类型',value:[{n:'全部',v:'2'},{n:'国产剧',v:'13'},{n:'香港剧',v:'14'},{n:'韩国剧',v:'15'},{n:'欧美剧',v:'16'},{n:'台湾剧',v:'20'},{n:'日本剧',v:'21'},{n:'其它剧',v:'22'},{n:'网红短剧',v:'33'},],},{key:'classez',name:'剧情',value:[{n:'全部',v:''},{n:'古装',v:'古装'},{n:'战争',v:'战争'},{n:'青春偶像',v:'青春偶像'},{n:'喜剧',v:'喜剧'},{n:'家庭',v:'家庭'},{n:'犯罪',v:'犯罪'},{n:'动作',v:'动作'},{n:'奇幻',v:'奇幻'},{n:'剧情',v:'剧情'},{n:'历史',v:'历史'},{n:'经典',v:'经典'},{n:'乡村',v:'乡村'},{n:'情景',v:'情景'},{n:'商战',v:'商战'},{n:'网剧',v:'网剧'},{n:'其他',v:'其他'},],},{key:'area',name:'地区',value:[{n:'全部',v:''},{n:'内地',v:'内地'},{n:'韩国',v:'韩国'},{n:'香港',v:'香港'},{n:'台湾',v:'台湾'},{n:'日本',v:'日本'},{n:'美国',v:'美国'},{n:'泰国',v:'泰国'},{n:'英国',v:'英国'},{n:'新加坡',v:'新加坡'},{n:'其他',v:'其他'},],},{key:'year',name:'年份',value:[{n:'全部',v:''},{n:'2024',v:'2024'},{n:'2023',v:'2023'},{n:'2022',v:'2022'},{n:'2021',v:'2021'},{n:'2020',v:'2020'},{n:'2019',v:'2019'},{n:'2018',v:'2018'},{n:'2017',v:'2017'},{n:'2016',v:'2016'},{n:'2015',v:'2015'},{n:'2014',v:'2014'},{n:'2013',v:'2013'},{n:'2012',v:'2012'},{n:'2011',v:'2011'},{n:'2010',v:'2010'},{n:'2009',v:'2009'},{n:'2008',v:'2008'},{n:'2006',v:'2006'},{n:'2005',v:'2005'},{n:'2004',v:'2004'},],},{key:'lang',name:'语言',value:[{n:'全部',v:''},{n:'国语',v:'国语'},{n:'英语',v:'英语'},{n:'粤语',v:'粤语'},{n:'闽南语',v:'闽南语'},{n:'韩语',v:'韩语'},{n:'日语',v:'日语'},{n:'其它',v:'其它'},],},],'3':[{key:'cateId',name:'类型',value:[{n:'全部',v:'3'},{n:'大陆综艺',v:'25'},{n:'日韩综艺',v:'26'},{n:'港台综艺',v:'27'},{n:'欧美综艺',v:'28'},],},{key:'classez',name:'剧情',value:[{n:'全部',v:''},{n:'选秀',v:'选秀'},{n:'情感',v:'情感'},{n:'访谈',v:'访谈'},{n:'播报',v:'播报'},{n:'旅游',v:'旅游'},{n:'音乐',v:'音乐'},{n:'美食',v:'美食'},{n:'纪实',v:'纪实'},{n:'曲艺',v:'曲艺'},{n:'生活',v:'生活'},{n:'游戏互动',v:'游戏互动'},{n:'财经',v:'财经'},{n:'求职',v:'求职'},],},{key:'area',name:'地区',value:[{n:'全部',v:''},{n:'内地',v:'内地'},{n:'港台',v:'港台'},{n:'日韩',v:'日韩'},{n:'欧美',v:'欧美'},],},{key:'year',name:'年份',value:[{n:'全部',v:''},{n:'2024',v:'2024'},{n:'2023',v:'2023'},{n:'2022',v:'2022'},{n:'2021',v:'2021'},{n:'2020',v:'2020'},{n:'2019',v:'2019'},{n:'2018',v:'2018'},{n:'2017',v:'2017'},{n:'2016',v:'2016'},{n:'2015',v:'2015'},{n:'2014',v:'2014'},{n:'2013',v:'2013'},{n:'2012',v:'2012'},{n:'2011',v:'2011'},{n:'2010',v:'2010'},{n:'2009',v:'2009'},{n:'2008',v:'2008'},{n:'2007',v:'2007'},{n:'2006',v:'2006'},{n:'2005',v:'2005'},{n:'2004',v:'2004'},],},{key:'lang',name:'语言',value:[{n:'全部',v:''},{n:'国语',v:'国语'},{n:'英语',v:'英语'},{n:'粤语',v:'粤语'},{n:'闽南语',v:'闽南语'},{n:'韩语',v:'韩语'},{n:'日语',v:'日语'},{n:'其它',v:'其它'},],},],'4':[{key:'cateId',name:'类型',value:[{n:'全部',v:'4'},{n:'国产动漫',v:'29'},{n:'日韩动漫',v:'30'},{n:'欧美动漫',v:'31'},{n:'其它动漫',v:'32'},],},{key:'classez',name:'剧情',value:[{n:'全部',v:''},{n:'情感',v:'情感'},{n:'科幻',v:'科幻'},{n:'热血',v:'热血'},{n:'推理',v:'推理'},{n:'搞笑',v:'搞笑'},{n:'冒险',v:'冒险'},{n:'萝莉',v:'萝莉'},{n:'校园',v:'校园'},{n:'动作',v:'动作'},{n:'机战',v:'机战'},{n:'运动',v:'运动'},{n:'战争',v:'战争'},{n:'少年',v:'少年'},{n:'少女',v:'少女'},{n:'社会',v:'社会'},{n:'原创',v:'原创'},{n:'亲子',v:'亲子'},{n:'益智',v:'益智'},{n:'励志',v:'励志'},{n:'其他',v:'其他'},],},{key:'area',name:'地区',value:[{n:'全部',v:''},{n:'国产',v:'国产'},{n:'日本',v:'日本'},{n:'欧美',v:'欧美'},{n:'其他',v:'其他'},],},{key:'year',name:'年份',value:[{n:'全部',v:''},{n:'2024',v:'2024'},{n:'2023',v:'2023'},{n:'2022',v:'2022'},{n:'2021',v:'2021'},{n:'2020',v:'2020'},{n:'2019',v:'2019'},{n:'2018',v:'2018'},{n:'2017',v:'2017'},{n:'2016',v:'2016'},{n:'2015',v:'2015'},{n:'2014',v:'2014'},{n:'2013',v:'2013'},{n:'2012',v:'2012'},{n:'2011',v:'2011'},{n:'2010',v:'2010'},{n:'2009',v:'2009'},{n:'2008',v:'2008'},{n:'2007',v:'2007'},{n:'2006',v:'2006'},{n:'2005',v:'2005'},{n:'2004',v:'2004'},],},{key:'lang',name:'语言',value:[{n:'全部',v:''},{n:'国语',v:'国语'},{n:'英语',v:'英语'},{n:'粤语',v:'粤语'},{n:'闽南语',v:'闽南语'},{n:'韩语',v:'韩语'},{n:'日语',v:'日语'},{n:'其它',v:'其它'}]}]};
  return JSON.stringify({
    class: classes,
    filters: filterObj,
  });
}

async function homeVod() {
  let html = await request(url);
  let $ = load(html);
  let items = $('.shoutu-vodlist.box1').eq(0).find('li>a');
  let videos = [];
  for (const it of items) {
    const a = $ (it);
    const img = $ (a).find ('img').first ().attr ('data-original');
    videos.push ({
      vod_id: a.attr('href'),
      vod_name: a.attr('title'),
      vod_pic: img,
    });
  }
 return JSON.stringify({
  list: videos,
  });
}

async function category (tid, pg, filter, extend) {
  let reqUrl = url + `/show/${extend.cateId ? extend.cateId : tid}-${extend.area ? extend.area : ''}--${extend.classez ? extend.classez : ''}-${extend.lang ? extend.lang : ''}----${pg > 1 ? pg : ''}---${extend.year ? extend.year : ''}.html`;
  let html = await request (reqUrl);
  let videos = [];
  const $ = load (html);
  for (const it of $ ('.shoutu-vodlist>li')) {
    const a = $ (it).find ('a')[0];
    const img = $ (a).find ('img').eq(0).attr ('data-original');
    videos.push ({
      vod_id: a.attribs.href,
      vod_name: a.attribs.title,
      vod_pic: img,
    });
  }
  const hasMore = videos.length > 0;
  const pgCount = hasMore ? parseInt (pg) + 1 : parseInt (pg);
  return JSON.stringify ({
    page: parseInt (pg),
    pagecount: pgCount,
    limit: 24,
    total: 24 * pgCount,
    list: videos,
  });
}

async function detail (id) {
  const detailUrl = url + `${id}.html`;
  let detail = await request (detailUrl, 'get');
  const $ = load (detail);
  var vod = {
    vod_id: id,
    vod_name: $ ('.shoutu-media shoutu-content .shoutu-media-bd h1').text (),
    vod_type: $ ('.tag a').first ().text (),
    vod_year: $ ('.tag a').text ().match (/\d+/)[0],
    vod_area: $ ('.text-branch').text (),
    vod_content: $ ('.desc').text ().replace (/\s+/g, '').replace (/简介：/, ''),
  };
  const playMap = {};
  const tabs = $ ('.page-row .panel-hd h3').slice (0, -3);
  const playlists = $ ('.page-row .panel-bd ul').slice (1, -3);
  _.each (tabs, (tab, i) => {
    const from = $ (tab).text ();
    const list = playlists.eq (i).find ('li a');
    _.each (list, it => {
      const $it = $ (it);
      const title = $it.text ();
      const playUrl = $it.attr ('href');
      if (!playMap.hasOwnProperty (from)) {
        playMap[from] = [];
      }
      playMap[from].push (title + '$' + playUrl);
    });
  });
  vod.vod_play_from = _.keys (playMap).join ('$$$');
  const urls = _.values (playMap);
  const vod_play_url = _.map (urls, urlist => urlist.join ('#'));
  vod.vod_play_url = vod_play_url.join ('$$$');
  return JSON.stringify ({
    list: [vod],
  });
}

async function play (flag, id, flags) {
  const link = url + id;
  const html = await request (link);
  const $ = load (html);
  const js = JSON.parse ($ ('script:contains(player_aaaa)').html ().replace ('var player_aaaa=', ''));
  const playUrl = js.url.replaceAll ('",');
  return JSON.stringify ({
    parse: 0,
    url: playUrl,
  });
}

async function search (wd, quick) {
  const html = await request (url + `/search/${wd}-------------.html`);
  const $ = load (html);
  let videos = [];
  for (const it of $ ('.shoutu-vodlist>li')) {
    const a = $ (it).find ('a')[0];
    const img = $ (a).find ('img').first ().attr ('data-original');
    videos.push ({
      vod_id: a.attribs.href,
      vod_name: a.attribs.title,
      vod_pic: img,
    });
  }
  const limit = 24;
  return JSON.stringify ({
    limit: limit,
    list: videos,
  });
}

export function __jsEvalReturn() {
  return {
      init: init,
      home: home,
      homeVod: homeVod,
      category: category,
      detail: detail,
      play: play,
      search: search,
  };
}