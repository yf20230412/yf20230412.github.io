var rule = {
    title: '快手直播',
   host: 'https://live.kuaishou.com',
    url: '/live_api/non-gameboard/list?pageSize=30&page=fypage&filterType=0&gameId=fyfilter',
    class_name: '热门&网游&手游&单机&棋牌&娱乐&综合&文化',
    class_url: '热门&网游&手游&单机&棋牌&娱乐&综合&文化',
    filterable: 1,
    filter_url: '{{fl.area}}',
    filter: {  
    "网游":[{"key":"area","name":"分区","value":[
    {"n":"无畏契约","v":"22146"},{"n":"守望先锋","v":"13"},{"n":"地下城与勇士","v":"3"},{"n":"大话西游2","v":"32"},{"n":"逆战","v":"22106"},{"n":"传奇","v":"7"},{"n":"穿越火线","v":"2"},{"n":"梦幻西游","v":"22"},{"n":"DOTA2","v":"12"},{"n":"热血传奇","v":"22658"},{"n":"英雄联盟","v":"1"},{"n":"QQ飞车","v":"4"}]}],
    
    "手游":[{"key":"area","name":"分区","value":[
    {"n":"王者荣耀","v":"1001"},{"n":"和平精英","v":"22008"},{"n":"原神","v":"22181"},{"n":"吃鸡手游","v":"22621"},{"n":"火影忍者","v":"1011"},{"n":"金铲铲之战","v":"22494"},{"n":"蛋仔派对","v":"22337"},{"n":"元梦之星","v":"22698"},{"n":"崩坏：星穹铁道","v":"22645"},{"n":"香肠派对","v":"22024"},{"n":"传奇世界","v":"22094"},{"n":"超凡先锋","v":"22315"},{"n":"英雄联盟手游","v":"22196"},{"n":"迷你世界","v":"1051"},{"n":"新天龙八部手游","v":"22683"},{"n":"光遇","v":"22200"},{"n":"逆水寒手游","v":"22656"},{"n":"斗罗大陆：魂师对决","v":"22470"},{"n":"天龙八部手游","v":"1039"},{"n":"热血江湖","v":"22463"},{"n":"征途系列","v":"22300"},{"n":"使命召唤手游","v":"22130"},{"n":"明日之后","v":"22069"},{"n":"大话西游手游","v":"22092"},{"n":"巅峰极速","v":"22647"},{"n":"羊了个羊","v":"22612"},{"n":"魔域手游","v":"22489"},{"n":"问道手游","v":"22014"},{"n":"汤姆猫跑酷","v":"1022"},{"n":"宝可梦大探险","v":"22416"},{"n":"第五人格","v":"22018"},{"n":"QQ飞车手游","v":"1054"},{"n":"英雄杀","v":"22222"},{"n":"天天酷跑","v":"1005"},{"n":"QQ炫舞","v":"22076"},{"n":"开心消消乐","v":"1012"},{"n":"完美世界手游","v":"22617"},{"n":"暗区突围","v":"22484"},{"n":"幻世九歌","v":"22507"},{"n":"魔兽争霸","v":"19"}]}],
    
    "单机":[{"key":"area","name":"分区","value":[
{"n":"黑神话悟空","v":"22762"},{"n":"植物大战僵尸","v":"22193"},{"n":"红色警戒","v":"22189"},{"n":"街机游戏","v":"15"},{"n":"经典单机","v":"22088"},{"n":"奥特曼传奇英雄2","v":"22743"},{"n":"奥特曼传奇英雄","v":"22689"}]}],

    "棋牌":[{"key":"area","name":"分区","value":[
    {"n":"天天象棋","v":"22185"},{"n":"三国杀","v":"20"},{"n":"斗地主","v":"6"},{"n":"象棋","v":"10"},{"n":"欢乐斗地主","v":"1017"},{"n":"指尖四川麻将","v":"22427"},{"n":"欢乐麻将","v":"1026"},
    {"n":"麻将","v":"9"},{"n":"中国象棋","v":"1037"},{"n":"五子棋","v":"22260"}]}],

    "娱乐":[{"key":"area","name":"分区","value":[
    {"n":"脱口秀","v":"1000005"},{"n":"才艺","v":"1000004"},{"n":"颜值","v":"1000006"},{"n":"音乐","v":"1000003"},{"n":"舞蹈","v":"1000002"},{"n":"情感","v":"1000007"},{"n":"明星","v":"1000001"},
    {"n":"购物","v":"1000020"},{"n":"科普","v":"1000023"},{"n":"媒体","v":"1000021"}]}],
    
    "综合":[{"key":"area","name":"分区","value":[
    {"n":"萌宠","v":"1000010"}, {"n":"购物","v":"1000020"},{"n":"媒体","v":"1000021"},{"n":"文玩","v":"1000019"},{"n":"美妆","v":"1000011"},{"n":"教育","v":"1000022"},{"n":"旅游","v":"1000014"},{"n":"田园","v":"1000015"},{"n":"汽车","v":"1000008"},{"n":"美食","v":"1000009"},{"n":"钓鱼","v":"1000012"},{"n":"母婴","v":"1000018"},{"n":"其它","v":"1000024"}]}],
    
        "文化":[{"key":"area","name":"分区","value":[
{"n":"科普","v":"1000023"},{"n":"教育","v":"1000022"}]}]    
},
   
    searchUrl: 'search?keyword=**',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'PC_UA'
    },
    timeout: 5000,
    limit: 8,
    play_parse: true,
    
    lazy:`js:
   let rid = input.match(/\\/(\\d+)/)[1];
   
function getRealUrl(live_url) {
    let [i, b] = live_url.split('?');
    let r = i.split('/').pop();
    let s = r.replace(/\.(flv|m3u8)/, '');
    let c_tmp = b.split('&').filter(n => n);
    let n = {};
    let c_tmp2 = [];
    c_tmp.forEach(function(tmp, index) {
        if (index < 3) {
           n[tmp.split('=')[1]] = tmp.split('=')[1];
        } else {
            c_tmp2.push(tmp);
        }
    });
    let tmp2 = c_tmp2.join('&');
    n[tmp2.split('=')[0]] = tmp2.split('=')[1];
    let fm = decodeURIComponent(n.fm).split('&')[0];
    let u = base64Decode(fm);
    let p = u.split('_')[0];
    let f = new Date().getTime() + '0000';
    let ll = n.wsTime;
    let t = '0';
    let h = [p, t, s, f, ll].join('_');
    let m = md5(h);
    return (i + '?wsSecret=' + m + '&wsTime=' + ll + '&u=' + t + '&seqid=' + f + '&' + c_tmp2.pop()).replace('hls', 'flv').replace('m3u8', 'flv');
}

let purl = JSON.parse(request('https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=' + rid)).data.stream.flv.multiLine[0].url;

input = {
    jx: 0,
    url: getRealUrl(purl),
    parse: 0,
   header: rule.headers
 
}
`,

    
    一级 : $js.toString(() => {
    let d = [];
    
    let hpjy = MY_FL.area || '22008'; //和平精英
    let tkx = MY_FL.area || '1000005'; //脱口秀
    let yxlm = MY_FL.area || '1'; //英雄联盟
    let jddj = MY_FL.area || '22088'; //经典单机
    let wz = MY_FL.area || '1001'; //王者荣耀
    let mc = MY_FL.area || '1000010'; //萌宠
    let hlddz = MY_FL.area || '1017'; //欢乐斗地主
    let kp = MY_FL.area || '1000023'; //科普

let list;
if (hpjy && MY_CATE === '热门') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + hpjy)).data.list;
} else if (tkx && MY_CATE === '娱乐' ) {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/non-gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + tkx)).data.list;
}else if (yxlm && MY_CATE === '网游') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + yxlm)).data.list;
} else if (jddj && MY_CATE === '单机') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + jddj)).data.list;
} else if (wz && MY_CATE === '手游') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + wz)).data.list;
} else if (hlddz && MY_CATE === '棋牌') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + hlddz)).data.list;
} else if (mc && MY_CATE === '综合') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/non-gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + mc)).data.list;
} else if (kp && MY_CATE === '文化') {
  list = JSON.parse(request('https://live.kuaishou.com/live_api/non-gameboard/list?pageSize=20&page=' + MY_PAGE + '&filterType=0&gameId=' + kp)).data.list;  
}    
       list.forEach(it => {
                        var title1 = it.caption;
                        var desc1 = '🆙' + it.author.name + (it.watchingCount == '' ? '' : '｜👥' + it.watchingCount);
                        var picUrl1 = it.poster;
                        var urls = it.playUrls[0].adaptationSet.representation.map(function(it1) {
                            return '快手' + it1.name + "，" + it1.url
                        }).join("；");
                        var url1 = it.author.id + "┃" + it.author.name + "┃" + it.poster + "┃" + it.watchingCount + "┃" + it.author.description + "┃" + it.caption + "┃" + urls + "┃" + it.gameInfo.name;
                        d.push({
                            title: title1,
                            desc: desc1,
                            pic_url: picUrl1,
                            url: url1
                        });
                })
                
setResult(d);            
            }),
  
  
  二级 : $js.toString(() => {
            let info = input.split("┃");
            VOD = {
                player_type: 2,
                vod_id: info[0],
                vod_name: info[5],
                vod_pic: info[2],
                type_name: "快手•" + info[7],
                vod_remarks: '🚪 房间号：' + info[0],
                vod_director: '🚪 房间号：' + info[0],
                vod_actor: '🆙 ' + info[1] + '｜ 👥 人气：' + info[3],
                vod_content: info[4],
            };
            // 清晰度从高到低排序
            var yuanhua = '';
            var languang = '';
            var chaoqing = '';
            var gaoqing = '';
            var biaoqing = '';
            var liuchang = '';
            var qita = '';
            info[6].split("；").map(function(it) {
                // 清晰度
                var qingxidu = it.split("，")[0].replace("快手", "");
                var play_info = qingxidu + "$" + it.split("，")[1] + "#";
                if(qingxidu === '原画') {
                    yuanhua = play_info;
                }
                else if(/蓝光/.test(qingxidu)) {
                    languang = play_info + languang;
                }
                else if(qingxidu === '超清') {
                    chaoqing = play_info;
                }
                else if(qingxidu === '高清') {
                    gaoqing = play_info;
                }
                else if(qingxidu === '标清') {
                    biaoqing = play_info;
                }
                else if(qingxidu === '流畅') {
                    liuchang = play_info;
                }
                else {
                    qita = qita + play_info;
                }
            })
            let playFrom = [];
            let playList = [];
            playFrom.append('🌺风言锋语88🌺（若播放失败需切换EXO播放器）');
            playList.append(yuanhua + languang + chaoqing + gaoqing + biaoqing + liuchang + qita);

            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
  
  
  }),
  
  
    搜索: '*'
    

    
}