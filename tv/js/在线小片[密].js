var rule = {
    title: '在线小黄片',
    "author": "xxxxx",
    host: 'https://www.zxxhp17.top',
    url: '/vod/type/id/fyclass/page/fypage.html',
    class_name: '在线国产&国产精品&绿帽淫妻&国产乱伦&美女主播&黑料视频&香港三级&国产探花&怀旧AV&精品动漫&日本乱伦&AV解说&VR专区&精品欧美&SWAG&人妖系列&星空无限&国际传媒&葫芦影业&精东影业&香蕉视频',
 class_url:'#&6&7&8&9&10&12&20&28&29&30&31&32&34&35&36&37&38&39&40',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'PC_UA',
    },

    timeout: 5000,
    //class_parse: '.nav&&a;a&&Text;a&&href',
    cate_exclude: '',
    play_parse: true,
    /*lazy:`js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
		log(url)
		if (html.encrypt == '1') {
			url = unescape(url)
		} else if (html.encrypt == '2') {
			url = unescape(base64Decode(url))
		}
		if (/\\.m3u8|\\.mp4/.test(url)) {
			input = {
				jx: 0,
				url: url,
				parse: 0
			}
		} else {
			input
		}
	`,*/
    double: true,
    limit: 6,
    //推荐: '.appel-main;ul.thumbnail-group&&li;*;*;*;*',
    一级: 'body&&.item;a&&title;img&&data-original;.time&&Text;a&&href',
    二级: {
    title: '',
    img: '',
    desc: '',
    content: '',
    tabs: '',
    lists: '.mox&&a',
  },
    搜索: 'body&&.item;*;*;*;*',
}