var rule = {
    title: '草莓',
    author: "淡蛋",
    host: 'https://caomei4429.top',
    url: '/index.php/vod/type/id/fyclass/page/fypage.html',
    class_name: '国产视频&网曝黑料&国产乱伦&日韩精品&中文字幕&欧美视频&动漫视频&国产传媒&桃传媒&麻豆传媒&天美传媒&91制片厂&星空传媒&精东影业&蜜桃传媒&水果解说',
    class_url: '96&97&103&113&114&121&122&105&134&106&107&108&109&110&111&112',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**/',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,
    //class_parse: 'body&&.sou-tag,0&&.sou-tag;a&&Text;a&&href',
    cate_exclude: '',
    play_parse: true,
    lazy: `js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
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
	`,
    double: true,
    limit: 6,
    //推荐: '.row&&dl;h5&&Text;.nature&&data-original;;a&&href',
    一级: ".row&&dl;h5&&Text;.nature&&data-original;;a&&href",
    二级: {
        title: 'h6&&Text',
        img: '',
        //desc: '.detail-actor&&Text',
        //content: '.text&&Text',
        tabs: 'body&&.btn',
        lists: 'body&&.btn',
        tab_text: 'a&&Text',
        list_text: 'a&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '.row&&dl;*;*;*;*',
}