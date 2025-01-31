var rule = {
    title:'腾云驾雾',
    host:'https://v.%71%71.com',
    // homeUrl:'/channel/choice?listpage=1&channel=choice&sort=18&_all=1',
    homeUrl:'/x/bu/pagesheet/list?_all=1&append=1&channel=choice&listpage=1&offset=0&pagesize=21&iarea=-1&sort=18',
    detailUrl:'https://node.video.%71%71.com/x/api/float_vinfo2?cid=fyid',
    // searchUrl:'https://node.video.%71%71.com/x/api/msearch?keyWord=**',
    searchUrl:'/x/search/?q=**&stag=fypage',
    // searchUrl:'http://s.video.qq.com/smartbox?plat=2&ver=0&num=29&otype=json&query=**',
    searchable:2,
    filterable:1,
    multi:1,
    // url:'/channel/fyclass?listpage=fypage&channel=fyclass&sort=18&_all=1',
    url:'/x/bu/pagesheet/list?_all=1&append=1&channel=fyclass&listpage=1&offset=((fypage-1)*21)&pagesize=21&iarea=-1',
    filter_url:'sort={{fl.sort or 75}}&iyear={{fl.iyear}}&year={{fl.year}}&itype={{fl.type}}&ifeature={{fl.feature}}&iarea={{fl.area}}&itrailer={{fl.itrailer}}&gender={{fl.sex}}',
    filter:{"choice":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"83"},{"n":"好评","v":"81"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"tv":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"79"},{"n":"好评","v":"16"}]},{"key":"feature","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"爱情","v":"1"},{"n":"古装","v":"2"},{"n":"悬疑","v":"3"},{"n":"都市","v":"4"},{"n":"家庭","v":"5"},{"n":"喜剧","v":"6"},{"n":"传奇","v":"7"},{"n":"武侠","v":"8"},{"n":"军旅","v":"9"},{"n":"权谋","v":"10"},{"n":"革命","v":"11"},{"n":"现实","v":"13"},{"n":"青春","v":"14"},{"n":"猎奇","v":"15"},{"n":"科幻","v":"16"},{"n":"竞技","v":"17"},{"n":"玄幻","v":"18"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"movie":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"83"},{"n":"好评","v":"81"}]},{"key":"type","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"犯罪","v":"4"},{"n":"励志","v":"2"},{"n":"喜剧","v":"100004"},{"n":"热血","v":"100061"},{"n":"悬疑","v":"100009"},{"n":"爱情","v":"100005"},{"n":"科幻","v":"100012"},{"n":"恐怖","v":"100010"},{"n":"动画","v":"100015"},{"n":"战争","v":"100006"},{"n":"家庭","v":"100017"},{"n":"剧情","v":"100022"},{"n":"奇幻","v":"100016"},{"n":"武侠","v":"100011"},{"n":"历史","v":"100021"},{"n":"老片","v":"100013"},{"n":"西部","v":"3"},{"n":"记录片","v":"100020"}]},{"key":"year","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"variety":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"23"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"cartoon":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"83"},{"n":"好评","v":"81"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"-1"},{"n":"内地","v":"1"},{"n":"日本","v":"2"},{"n":"欧美","v":"3"},{"n":"其他","v":"4"}]},{"key":"type","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"玄幻","v":"9"},{"n":"科幻","v":"4"},{"n":"武侠","v":"13"},{"n":"冒险","v":"3"},{"n":"战斗","v":"5"},{"n":"搞笑","v":"1"},{"n":"恋爱","v":"7"},{"n":"魔幻","v":"6"},{"n":"竞技","v":"20"},{"n":"悬疑","v":"17"},{"n":"日常","v":"15"},{"n":"校园","v":"16"},{"n":"真人","v":"18"},{"n":"推理","v":"14"},{"n":"历史","v":"19"},{"n":"经典","v":"3"},{"n":"其他","v":"12"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"child":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"76"},{"n":"好评","v":"20"}]},{"key":"sex","name":"性别","value":[{"n":"全部","v":"-1"},{"n":"女孩","v":"1"},{"n":"男孩","v":"2"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"-1"},{"n":"内地","v":"3"},{"n":"日本","v":"2"},{"n":"其他","v":"1"}]},{"key":"iyear","name":"年龄段","value":[{"n":"全部","v":"-1"},{"n":"0-3岁","v":"1"},{"n":"4-6岁","v":"2"},{"n":"7-9岁","v":"3"},{"n":"10岁以上","v":"4"},{"n":"全年龄段","v":"7"}]}],"doco":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"74"}]},{"key":"itrailer","name":"出品方","value":[{"n":"全部","v":"-1"},{"n":"BBC","v":"1"},{"n":"国家地理","v":"4"},{"n":"HBO","v":"3175"},{"n":"NHK","v":"2"},{"n":"历史频道","v":"7"},{"n":"ITV","v":"3530"},{"n":"探索频道","v":"3174"},{"n":"ZDF","v":"3176"},{"n":"腾讯自制","v":"15"},{"n":"合作机构","v":"6"},{"n":"其他","v":"5"}]},{"key":"type","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"自然","v":"4"},{"n":"美食","v":"10"},{"n":"社会","v":"3"},{"n":"人文","v":"6"},{"n":"历史","v":"1"},{"n":"军事","v":"2"},{"n":"科技","v":"8"},{"n":"财经","v":"14"},{"n":"探险","v":"15"},{"n":"罪案","v":"7"},{"n":"竞技","v":"12"},{"n":"旅游","v":"11"}]}]},
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:5000,
    // class_parse:'.site_channel a;a&&Text;a&&href;channel/(.*)',
    cate_exclude:'会员|游戏|全部',
    class_name:'少儿&动漫&电视剧&电影&精选&综艺&纪录片',
   class_url:'child&cartoon&tv&movie&choice&variety&doco',
    limit:20,
    play_parse:true,
    // 手动调用解析请求json的url,此lazy不方便
    /*
    lazy: `js:
    let Fyjx = JSON.parse(request('https://raw.gitcode.com/yf1688/api/raw/main/titi.json')).parses[0].url;

    // 定义需要屏蔽的字段
    const blockedField = 'http://154.12.28.5:5244';

    let response = JSON.parse(request(Fyjx + input, {
        headers: {
            'User-Agent': 'Dalvik/2.1.0(Linux;U;Android10;PDHM00Build/QKQ1.191222.002)'
        }
    }));

    // 检查返回的 URL 是否包含屏蔽字段
    if (response.url.includes(blockedField)) {
        throw new Error('该链接已被屏蔽');
    }

    input = {
        jx: 0,
        url: response.url,
        parse: 0,
        header: JSON.stringify({
            'user-agent': 'okhttp/4.1.0'
        })
    };
`,
*/
    推荐:'.list_item;img&&alt;img&&src;a&&Text;a&&data-float',
    一级:'.list_item;img&&alt;img&&src;a&&Text;a&&data-float',
    二级:'js:VOD={};let d=[];let video_list=[];let video_lists=[];let list=[];let QZOutputJson;let html=fetch(input,fetch_params);let sourceId=/get_playsource/.test(input)?input.match(/id=(\\d*?)&/)[1]:input.split("cid=")[1];let cid=sourceId;let detailUrl="https://v.%71%71.com/detail/m/"+cid+".html";log("详情页:"+detailUrl);var pdfh=jsp.pdfh;var pd=jsp.pd;try{let json=JSON.parse(html);VOD={vod_url:input,vod_name:json.c.title,type_name:json.typ.join(","),vod_actor:json.nam.join(","),vod_year:json.c.year,vod_content:"公众号《风言锋语88》提醒您:请勿相信影片中的广告，以免上当受骗。🥇┃"+json.c.description,vod_remarks:json.rec,vod_pic:urljoin2(input,json.c.pic)}}catch(e){log("解析片名海报等基础信息发生错误:"+e.message)}if(/get_playsource/.test(input)){eval(html);let indexList=QZOutputJson.PlaylistItem.indexList;indexList.forEach(function(it){let dataUrl="https://s.video.qq.com/get_playsource?id="+sourceId+"&plat=2&type=4&data_type=3&range="+it+"&video_type=10&plname=qq&otype=json";eval(fetch(dataUrl,fetch_params));let vdata=QZOutputJson.PlaylistItem.videoPlayList;vdata.forEach(function(item){d.push({title:item.title,pic_url:item.pic,desc:item.episode_number+"\\t\\t\\t播放量："+item.thirdLine,url:item.playUrl})});video_lists=video_lists.concat(vdata)})}else{let json=JSON.parse(html);video_lists=json.c.video_ids;let url="https://v.qq.com/x/cover/"+sourceId+".html";if(video_lists.length===1){let vid=video_lists[0];url="https://v.qq.com/x/cover/"+cid+"/"+vid+".html";d.push({title:"在线播放",url:url})}else if(video_lists.length>1){for(let i=0;i<video_lists.length;i+=30){video_list.push(video_lists.slice(i,i+30))}video_list.forEach(function(it,idex){let o_url="https://union.video.qq.com/fcgi-bin/data?otype=json&tid=682&appid=20001238&appkey=6c03bbe9658448a4&union_platform=1&idlist="+it.join(",");let o_html=fetch(o_url,fetch_params);eval(o_html);QZOutputJson.results.forEach(function(it1){it1=it1.fields;let url="https://v.qq.com/x/cover/"+cid+"/"+it1.vid+".html";d.push({title:it1.title,pic_url:it1.pic160x90.replace("/160",""),desc:it1.video_checkup_time,url:url,type:it1.category_map&&it1.category_map.length>1?it1.category_map[1]:""})})})}}let yg=d.filter(function(it){return it.type&&it.type!=="正片"});let zp=d.filter(function(it){return!(it.type&&it.type!=="正片")});VOD.vod_play_from=yg.length<1?"🌺风言锋语88🌺":"🌺风言锋语88🌺$$$🌺风言锋语88🌺  预告及花絮";VOD.vod_play_url=yg.length<1?d.map(function(it){return it.title+"$"+it.url}).join("#"):[zp,yg].map(function(it){return it.map(function(its){return its.title+"$"+its.url}).join("#")}).join("$$$");',
    搜索:'js:let d=[];pdfa=jsp.pdfa;pdfh=jsp.pdfh;pd=jsp.pd;let html=request(input);let baseList=pdfa(html,"body&&.result_item_v");baseList.forEach(function(it){let longText=pdfh(it,".result_title&&Text");let shortText=pdfh(it,".sub&&Text");let fromTag=pdfh(it,".result_source&&Text");let score=pdfh(it,".result_score&&Text");let content=pdfh(it,".desc_text&&Text");let url=pdfh(it,".result_title&&a&&href");let img=pd(it,".figure_pic&&src");url="https://node.video.qq.com/x/api/float_vinfo2?cid="+url.match(/.*\\/(.*?)\\.html/)[1];log(shortText+"|"+url);if(fromTag.match(/腾讯/)){d.push({title:longText.split(shortText)[0],img:img,url:url,content:content,desc:"⭐"+longText.split(shortText)[1]+"-"+shortText+" "+score})}});setResult(d);',
    // 搜索:'json:item;word;dc;class;id;sn',
}
