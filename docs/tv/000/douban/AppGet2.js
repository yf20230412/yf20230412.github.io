// 自动生成于 7/9/2025, 6:46:13 PM
// 原始文件: APPG[模板].js
// 用法
/*
    {
		"key": "咖啡",
		"name": "☕️┃咖啡┃App🌺",
		"type": 3,
		"api": "./douban/drpy3.min.js",
		"searchable": 1,
		"quickSearch": 1,
		"filterable": 1,
		"ext": "./douban/AppGet2.js?type=url&params=域名$key$iv",
		"timeout": 10
    },
例:
    {
		"key": "咖啡",
		"name": "☕️┃咖啡┃App🌺",
		"type": 3,
		"api": "./douban/drpy3.min.js",
		"searchable": 1,
		"quickSearch": 1,
		"filterable": 1,
		"ext": "./douban/AppGet2.js?type=url&params=https://cdn-tupic-duofun-neimenggu.56uxi.com/2.txt$qwertyuiopqwertt$@咖啡[APP]",
		"timeout": 10
    },
*/

globalThis.Decrypt = function(word) {
    let key = CryptoJS.enc.Utf8.parse(rule.key);
    let iv = CryptoJS.enc.Utf8.parse(rule.key);
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
globalThis.Encrypt = function(word) {
    let key = CryptoJS.enc.Utf8.parse(rule.key);
    let iv = CryptoJS.enc.Utf8.parse(rule.key);
    let encrypt = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    let encryptedStr = encrypt.toString(CryptoJS.enc.base64);
    return encryptedStr.toString();
}
var rule = {
    类型: '影视',
    host: '',
    title: 'APPG[模版]',
    desc: 'APPG[模版]',
    homeUrl: '/api.php/qijiappapi.index/initV119',
    url: '/api.php/qijiappapi.index/typeFilterVodList?fyfilter',
    detailUrl: '/api.php/qijiappapi.index/vodDetail?vod_id=fyid',
    filter_url: 'area={{fl.area or "全部"}}&year={{fl.year or "全部"}}&type_id=fyclass&page=fypage&sort={{fl.sort or "最新"}}&lang={{fl.lang or "全部"}}&class={{fl.class or "全部"}}',
    searchUrl: '/api.php/qijiappapi.index/searchList?keywords=**&type_id=0&page=fypage',
    searchable: 1,
    filterable: 1,
    quickSearch: 1,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    play_parse: true,
    cate_exclude: '网址|专题',
    hostJs: $js.toString(() => {
    try {
        HOST = rule.params.split('$')[0];
        let reqUrl = HOST;
        let fetchRes = request(reqUrl);
        let decRes = Decrypt(fetchRes);
        if (decRes && /^https?:\/\//i.test(decRes)) {
            HOST = decRes;
        } else if (fetchRes && /^https?:\/\//i.test(fetchRes)) {
            HOST = fetchRes;
        } else {
            HOST = reqUrl;
        }
    } catch (e) {
            HOST = rule.params.split('$')[0];
    }
}),
    预处理: $js.toString(() => {
    let parts = rule.params.split('$');
    rule.key = parts[1] || ''; // key是第一个$后的内容
    rule.Iv = (parts[2] ? parts[2].split('@')[0] : rule.key) || rule.key; // iv是$到@之间的内容，否则回退key
}),
    class_parse: $js.toString(() => {
        let html = request(input);
        let html1 = Decrypt(JSON.parse(html).data);
        let list = JSON.parse(html1);
        let data = list;
        let filterMap = {
            "class": "类型",
            "area": "地区",
            "lang": "语言",
            "year": "年份",
            "letter": "字母",
            "by": "排序",
            "sort": "排序"
        };
        let filters = {};
        let classes = [];
        let json_data = data["type_list"];
        for (let item of json_data) {
            let typeExtendStr = item["type_extend"] || "{}";
            let typeExtend;
            try {
                typeExtend = JSON.parse(typeExtendStr);
            } catch (e) {
                console.error("解析分类扩展信息失败:", typeExtendStr);
                typeExtend = {};
            }
            let defaultLangs = ["国语", "粤语", "英语", "韩语", "日语"];
            let originalLangs = (typeExtend.lang || "").split(",").map(l => l.trim()).filter(l => l);
            let mergedLangs = originalLangs.concat(defaultLangs).filter((item, index, arr) => arr.indexOf(item) === index);
            typeExtend.lang = mergedLangs.join(",");
            let currentYear = new Date().getFullYear();
            let defaultYears = Array.from({
                length: 20
            }, (_, i) => currentYear - i);
            if (!typeExtend.year || typeExtend.year.trim() === "") {
                typeExtend.year = defaultYears.join(',');
            } else {
                var originalYears = typeExtend.year.split(',')
                    .map(function(y) {
                        return parseInt(y.trim(), 10);
                    })
                    .filter(function(y) {
                        return !isNaN(y);
                    });
                typeExtend.year = defaultYears.join(',');
            }
            typeExtend["sort"] = "最新,最热,最赞";
            classes.push({
                "type_name": item["type_name"],
                "type_id": item["type_id"]
            });
            let typeId = String(item["type_id"]);
            filters[typeId] = [];
            for (let key in typeExtend) {
                if (key in filterMap && typeof typeExtend[key] === "string" && typeExtend[key].trim()) {
                    let values = typeExtend[key].split(",").map(v => v.trim()).filter(v => v);
                    let options = [{
                        "n": "全部",
                        "v": ""
                    }].concat(
                        values.map(v => ({
                            "n": v.trim(),
                            "v": v.trim()
                        }))
                    );
                    filters[typeId].push({
                        key: key,
                        name: filterMap[key],
                        value: options
                    });
                }
            }
        }
        homeObj.filter = filters;
        input = classes;
    }),
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let html1 = Decrypt(JSON.parse(html).data);
        let list = JSON.parse(html1).recommend_list;
        list.forEach(item => {
            d.push({
                title: item.vod_name,
                desc: item.vod_remarks,
                pic_url: item.vod_pic,
                url: item.vod_id,
            })
        });
        setResult(d);
    }),
    二级: $js.toString(() => {
        let html = request(input);
        let html1 = Decrypt(JSON.parse(html).data);
        let list = JSON.parse(html1);
        VOD = {
            vod_id: list.vod.vod_id,
            vod_name: list.vod.vod_name,
            type_name: list.vod.vod_class,
            vod_pic: list.vod.vod_pic,
            vod_remarks: list.vod.vod_remarks,
            vod_year: list.vod.vod_year,
            vod_area: list.vod.vod_area,
            vod_actor: list.vod.vod_actor,
            vod_director: list.vod.vod_director,
            vod_content: list.vod.vod_content
        };
        let playlist = list.vod_play_list;
        let playmap = {};
        let excludeRegex = /(映画|1080P|MAX|广告)/i;
        let priorityList = ['4K','腾讯','芒果','优质'];
        let sortOrder = (a, b) => {
            let getPriority = s => {
                let index = priorityList.findIndex(keyword => s.includes(keyword));
                return index !== -1 ? index + 1 : 99;
            };
            return getPriority(a) - getPriority(b);
        };
        for (let i in playlist) {
            let item = playlist[i];
            let form = item.player_info.show;
            if (excludeRegex.test(form)) continue;
            if (!playmap[form]) playmap[form] = [];
            for (let j in item.urls) {
                let urlItem = item.urls[j];
                if (!urlItem.url || urlItem.url.trim() === "") continue;
                let url = urlItem.url;
                playmap[form].push(
                    `${urlItem.name.trim()}$${url}*${item.player_info.parse}*token=${urlItem.token}`
                );
            }
        }
        for (let form in playmap) {
            if (playmap[form].length === 0) {
                delete playmap[form]; // 删除空线路
            }
        }
        let sortedForms = Object.keys(playmap).sort(sortOrder).filter(Boolean);
        VOD.vod_play_from = sortedForms.map(form => `小鱼🐬┃${form}`).join('$$$');
        VOD.vod_play_url = sortedForms.map(form => playmap[form].join('#')).join('$$$');
    }),
    lazy: $js.toString(() => {
    let params = input.split('*');
    let purl = params[0];
    let parse = params[1];
    let token = params[2].replace('token=', '');
    let PlayRegex = /(\.mp4|\.m3u8)$/i;
    let processed = false;
    let isPlayUrl = PlayRegex.test(purl);
    let isHttpUrl = purl.startsWith('http');
    let isHttpParse = parse.startsWith('http');
    if (isHttpParse && !parse.includes('url=')) {  // 只有不含 'url=' 时才处理
    parse = parse + (parse.includes('?') ? '&url=' : '?url=');
}
    if (isPlayUrl && !isHttpParse) {
        input = {
            parse: 0,
            url: purl
        };
        processed = true;
    }
    if (!processed && isHttpParse) {
        let prefix = parse;
        let url = prefix + purl;
            let html = request(url);
         url = JSON.parse(html).url;
        input = {
            parse: 0,
            url: url
        };
        processed = true;
    }
    if (!processed && !isPlayUrl && !isHttpParse) {
        let tryEncrypt = (url) => {
            let encryptedUrl = Encrypt(url);
            let formData = `parse_api=${parse}&url=${encodeURIComponent(encryptedUrl)}&token=${token}`;
            let formData1 = `parse_api=${parse}&url=${encryptedUrl}&token=${token}`;
            let options = {
                method: 'POST',
                body: formData
            };
            let apiUrl = rule.host + '/api.php/qijiappapi.index/vodParse';
            let html = request(apiUrl, options);
            let data = JSON.parse(html).data;
            if (!data || (Array.isArray(data) && data.length === 0)) {
                options.body = formData1;
                html = request(apiUrl, options);
                data = JSON.parse(html).data;
            }
            if (data && !(Array.isArray(data) && data.length === 0)) {
                try {
                    let jdata = Decrypt(data);
                    let outerData = JSON.parse(jdata);
                    let innerData = JSON.parse(outerData.json);
                    input = {
                        parse: 0,
                        url: innerData.url
                    };
                    return true;
                } catch (e) {
                }
            }
            return false;
        };
        if (!tryEncrypt(purl)) {
            if (!tryEncrypt(encodeURIComponent(purl))) {
                input = {
                    jx: 1,
                    parse: 1,
                    url: purl
                };
            }
        }
    }
}),
    搜索: $js.toString(() => {
        let d = [];
        let html = request(input);
        let html1 = Decrypt(JSON.parse(html).data);
        let list = JSON.parse(html1).search_list;
        list.forEach(it => {
            d.push({
                title: it.vod_name,
                url: it.vod_id,
                desc: it.vod_remarks,
                content: it.vod_blurb,
                pic_url: it.vod_pic,
            });
        });
        setResult(d);
    }),
}