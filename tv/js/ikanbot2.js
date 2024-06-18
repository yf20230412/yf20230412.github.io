var rule = {
    title:'爱看机器人[虫]',
    // host:'https://v.ikanbot.com',
    host:'https://v.aikanbot.com',
    url:'/hot/index-fyclass-fyfilter-p-fypage.html[/hot/index-fyclass-fyfilter.html]',
    //https://www.ikanbot.com/search?q=%E6%96%97%E7%BD%97%E5%A4%A7&p=2
    // searchUrl:'/search?q=**&p=fypage',
	searchUrl:'/search?q=**&p=fypage[/search?q=**]',
    searchable:2,
    quickSearch:0,
    filterable:1,
    filter_url:'{{fl.tag}}',
    图片来源:'@Referer=https://v.ikanbot.com/@User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    filter:{
        "movie":[{"key":"tag","name":"标签","value":[{"n":"热门","v":"热门"},{"n":"最新","v":"最新"},{"n":"经典","v":"经典"},{"n":"豆瓣高分","v":"豆瓣高分"},{"n":"冷门佳片","v":"冷门佳片"},{"n":"华语","v":"华语"},{"n":"欧美","v":"欧美"},{"n":"韩国","v":"韩国"},{"n":"日本","v":"日本"},{"n":"动作","v":"动作"},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"悬疑","v":"悬疑"},{"n":"恐怖","v":"恐怖"},{"n":"治愈","v":"治愈"},{"n":"豆瓣top250","v":"豆瓣top250"}]}]
        ,"tv":[{"key":"tag","name":"标签","value":[{"n":"热门","v":"热门"},{"n":"美剧","v":"美剧"},{"n":"英剧","v":"英剧"},{"n":"韩剧","v":"韩剧"},{"n":"日剧","v":"日剧"},{"n":"国产剧","v":"国产剧"},{"n":"港剧","v":"港剧"},{"n":"日本动画","v":"日本动画"},{"n":"综艺","v":"综艺"},{"n":"纪录片","v":"纪录片"}]}]
    },
    filter_def:{
		movie:{tag:'热门'},
		tv:{tag:'国产剧'},
	},
    filter获取方法:`
    let value = [];
    $('ul').eq(2).find('li').each(function() {
      // console.log($(this).text());
      let n = $(this).text().trim();
      value.push({
      'n': n, 'v': n
      });
    });
    // 电影执行:
    let data = {'movie': [{'key': 'tag', 'name': '标签', 'value': value}]};
    console.log(JSON.stringify(data));
    
    //剧集执行:
    let data = {'tv': [{'key': 'tag', 'name': '标签', 'value': value}]};
    console.log(JSON.stringify(data));
    `,
    headers:{'User-Agent':'PC_UA',},
    class_name:'剧集&电影',
    class_url:'tv&movie',
	play_parse:true,
	double:true,
	tab_remove:['wjm3u8','ikm3u8','sdm3u8','M3U8','jinyingm3u8','fsm3u8','ukm3u8'],//移除某个线路及相关的选集
	tab_order:['bfzym3u8','1080zyk','kuaikan','lzm3u8','ffm3u8','snm3u8','qhm3u8','gsm3u8','zuidam3u8','bjm3u8','wolong','xlm3u8','yhm3u8'],//线路顺序,按里面的顺序优先，没写的依次排后面
	tab_rename:{'bfzym3u8':'暴风','1080zyk':'优质','kuaikan':'快看','lzm3u8':'量子','ffm3u8':'非凡','snm3u8':'索尼','qhm3u8':'奇虎','haiwaikan':'海外看','gsm3u8':'光速','zuidam3u8':'最大','bjm3u8':'八戒','wolong':'卧龙','xlm3u8':'新浪','yhm3u8':'樱花','tkm3u8':'天空','jsm3u8':'极速','wjm3u8':'无尽','sdm3u8':'闪电','kcm3u8':'快车','jinyingm3u8':'金鹰','fsm3u8':'飞速','tpm3u8':'淘片','lem3u8':'鱼乐','dbm3u8':'百度','tomm3u8':'番茄','ukm3u8':'U酷','ikm3u8':'爱坤','hnzym3u8':'红牛资源','hnm3u8':'红牛','68zy_m3u8':'68','kdm3u8':'酷点','bdxm3u8':'北斗星','hhm3u8':'豪华','kbm3u8':'快播'},//线路名替换如:lzm3u8替换为量子资源
    推荐:'.v-list;div.item;*;*;*;*', //这里可以为空，这样点播不会有内容
    // 一级:'.v-list&&div.item;p&&Text;img&&src;;a&&href', //一级的内容是推荐或者点播时候的一级匹配
	一级:'.v-list&&div.item;p&&Text;img&&data-src;;a&&href', //一级的内容是推荐或者点播时候的一级匹配
    // 二级:二级,
    二级:`js:
        pdfh = jsp.pdfh;
        function getToken(html1) {
            let currentId = pdfh(html1, '#current_id&&value');
            let eToken = pdfh(html1, '#e_token&&value');
            if (!currentId || !eToken) return '';
            let idLength = currentId.length;
            let subId = currentId.substring(idLength - 4, idLength);
            let keys = [];
            for (let i = 0; i < subId.length; i++) {
                let curInt = parseInt(subId[i]);
                let splitPos = curInt % 3 + 1;
                keys[i] = eToken.substring(splitPos, splitPos + 8);
                eToken = eToken.substring(splitPos + 8, eToken.length);
            }
            return keys.join('');
        }
        try {
            VOD={};
            let html1 = request(input);
            VOD.vod_id = pdfh(html1, '#current_id&&value');
            VOD.vod_name = pdfh(html1, 'h2&&Text');
            VOD.vod_pic = pdfh(html1, '.item-root&&img&&data-src');
            VOD.vod_actor = pdfh(html1, '.meta:eq(4)&&Text');
            VOD.vod_area = pdfh(html1, '.meta:eq(3)&&Text');
            VOD.vod_year = pdfh(html1, '.meta:eq(2)&&Text');
            VOD.vod_remarks = '';
            VOD.vod_director = '';
            VOD.vod_content = pdfh(html1, '#line-tips&&Text');
            // log(VOD);
            var v_tks = getToken(html1);
            log('v_tks ===> ' + v_tks);
            input = HOST + '/api/getResN?videoId=' + input.split('/').pop() + '&mtype=2&token='+v_tks;
            let html = request(input, {
                headers: {
                    'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                    'Referer': MY_URL,
                }
            });
            print(html);
            html = JSON.parse(html);
            let episodes = html.data.list;
            let playMap = {};
            if (typeof play_url === 'undefined') {
                var play_url = ''
            }
            let map = {}
            let arr = []
            let name = {
                'bfzym3u8': '🌺风言锋语88🌺+暴风',
                '1080zyk': '🌺风言锋语88🌺+优质',
                'kuaikan': '🌺风言锋语88🌺+快看',
                'lzm3u8': '🌺风言锋语88🌺+量子',
                'ffm3u8': '🌺风言锋语88🌺+非凡',
                'haiwaikan': '海外看',
                'gsm3u8': '光速',
                'zuidam3u8': '最大',
                'bjm3u8': '八戒',
                'snm3u8': '索尼',
                'wolong': '卧龙',
                'xlm3u8': '新浪',
                'yhm3u8': '樱花',
                'tkm3u8': '天空',
                'jsm3u8': '极速',
                'wjm3u8': '无尽',
                'sdm3u8': '闪电',
                'kcm3u8': '快车',
                'jinyingm3u8': '金鹰',
                'fsm3u8': '飞速',
                'tpm3u8': '淘片',
                'lem3u8': '鱼乐',
                'dbm3u8': '百度',
                'tomm3u8': '番茄',
                'ukm3u8': 'U酷',
                'ikm3u8': '爱坤',
                'hnzym3u8': '红牛资源',
                'hnm3u8': '红牛',
                '68zy_m3u8': '68',
                'kdm3u8': '酷点',
                'bdxm3u8': '北斗星',
                'qhm3u8': '奇虎',
                'hhm3u8': '豪华'
            };
            episodes.forEach(function(ep) {
                let data = JSON.parse(ep['resData']);
                data.map(val => {
                    if(!map[val.flag]){
                        map[val.flag] = [val.url.replaceAll('##','#')]
                    } else {
                        map[val.flag].push(val.url.replaceAll('##','#'))
                    }
                })
            });
            for (var key in map) {
                if ('bfzym3u8' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 1
                    })
                } else if ('1080zyk' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 2
                    })
                } else if ('kuaikan' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 3
                    })
                } else if ('lzm3u8' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 4
                    })
                } else if ('ffm3u8' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 5
                    })
                } else if ('snm3u8' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 6
                    })
                } else if ('qhm3u8' == key) {
                    arr.push({
                        flag: name[key],
                        url: map[key],
                        sort: 7
                    })
                } else {
                    arr.push({
                        flag: (name[key]) ? name[key] : key,
                        url: map[key],
                        sort: 8
                    })
                }
            }
            arr.sort((a, b) => a.sort - b.sort);
            let playFrom = [];
            let playList = [];
            arr.map(val => {
                if (!/undefined/.test(val.flag)) {
                    playFrom.push(val.flag);
                    playList.push(val.url);
                }
            })
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
            // log(VOD);
        } catch (e) {
            log('获取二级详情页发生错误:' + e.message)
        }`,
    // 搜索:'#search-result&&.media;h5&&a&&Text;a&&img&&data-src;.label&&Text;a&&href',//第三个是描述，一般显示更新或者完结
	搜索:'.col-md-8&&.media;h5&&a&&Text;a&&img&&data-src;.label&&Text;a&&href',//第三个是描述，一般显示更新或者完结
    lazy:`
    if(/\\.m3u8$/.test(input)){
        input = {
            parse:0,
            url:getProxyUrl()+'&url='+input,
            jx:0
        }
    }
    `,
    proxy_rule: `js:
    let url = input.url;
    let m3u8 = fixAdM3u8Ai(url);
    input = [200,'application/vnd.apple.mpegurl',m3u8]
  `
}