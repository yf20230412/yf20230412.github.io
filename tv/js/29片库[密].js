function decrypt(data) {
    let key = CryptoJS.enc.Hex.parse("8c37c83890bfc29d2937f0d238be8590");
    let iv = CryptoJS.enc.Hex.parse("f77865a7525a64d1a70cbeffee5e7287");
    let encrypted = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(data)
    }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    return encrypted;
}

function generateRandomDigit(minDigits, maxDigits) {
    const min = Math.pow(10, minDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}


function getSign(url) {
    try {
        let sign_url = url.split('com')[1];
        let ts = parseInt(new Date().getTime() / 1000);
        //let ts = '1717108925';
        let fixStr = 'EMiBcROEI5JhZ1gQChsnhbdmFR0dz';
        //log(sign_url);
        //log(ts);
        //let sign_array = [sign_url, ts, 'zG30QXMK6kHSuSARiTLQ', '362533993', fixStr];
        let mixStr = generateRandomString(20);
        //let mixStr = 'bzn3fasRS6Eh48UhikiS';
        let numStr = generateRandomDigit(1, 9);
        //let numStr = '130420954';
        let sign_array = [sign_url, ts, mixStr, numStr, fixStr];
        sign_url = sign_array.join('-');
        //log(sign_url);
        let sign_str = md5(sign_url);
        let real_url = url + '?sign=' + sign_array.slice(1, -1).join('-') + '-' + sign_str;
        return real_url;
    } catch (e) {
        return url
    }
}

globalThis.decrypt = decrypt;
globalThis.getSign = getSign;
var rule = {
    title: '29片库',
    hostUrls: [
        'https://gitee.com/nataliya00300/m14ymg0zwbrzezq8wqfyzw1cu/raw/master/gd.json',
        'https://gitcode.net/aivideo/gaode/-/raw/master/gd.json',
        'https://02fangfeng.ffibfl.com/gd.json',
    ],
    hostJs: $js.toString(() => {
        log(rule.hostUrls);
        let ok_url;
        let ok_json;
        for (let url of rule.hostUrls) {
            log(url)
            try {
                let html = request(url, {timeout: 2000});
                ok_json = JSON.parse(html);
                ok_url = url;
                break;
            } catch (e) {
                log('发生了错误:' + e.message);
            }
        }
        log(ok_url);
        log(ok_json);
        for (let u of ok_json) {
            let u1 = decrypt(u);
            log(u1);
            try {
                let h1 = post(u1 + '/api/server/ping', {timeout: 2000});
                log(h1);
                if (/newcode/.test(h1)) {
                    HOST = u1;
                    break;
                }
            } catch (e) {
                log(e.message);
            }

        }
        //HOST = decrypt(ok_json[0]);
    }),
    //host: 'https://02apijd.minyjt.com',
    //host:'https://02apir3.y6gzd6cwztfg5.xyz/',
    url: '/api/v2/module/page_info?id=fyclass&page=fypage',
    detailUrl: '/api/movie/play?id=fyid',
    searchUrl: '/api/movie/search_v2?keywords=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    headers: {
        userid: 5162258,
        token: 'lioVKSXjszRapR12lU5CaM96fJvainA4',
        deviceid: 'GD52e0d8788eebaa44b36bc633bb618c24od',
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    //图片来源: '@Accept-Encoding=identity@User-Agent=ExoSourceManager/9.9.9.9 (Linux;Android 13) ExoPlayerLib/2.18.0',
    图片来源: '@User-Agent=Dalvik/2.1.0 (Linux; U; Android 13; 23049RAD8C Build/TKQ1.221114.001)',

    class_parse: $js.toString(() => {
        let cfg_url = input + '/api/app/getConfigV1';
        let nav_url = input + '/api/module/get_nav';
        //log(input);
        //log(nav_url);
        let html = post(cfg_url);
        let json = JSON.parse(html);
        //log(decrypt(json.newdata));
        html = post(nav_url, {headers: rule.headers});
        json = JSON.parse(html);
        //log(decrypt(json.newdata));
        let navs = [];
        let data = JSON.parse(decrypt(json.newdata));
        let lis = data.data.list;
        //log(lis);
        lis.forEach((it) => {
            navs.push({
                type_id: it.id,
                type_name: it.title,
            })
        });
        input = navs;

    }),
    cate_exclude: '',
    play_parse: true,
    double: true,
    推荐: $js.toString(() => {
        // let html=request(input);
        // let data=pdfa(html,'');
        VODS = [];
    }),
    一级: $js.toString(() => {
        // log(MY_CATE);
        let cateUrl = '';
        let cateData = {};
        let cateBody = '';
        if (['108', '124', '59', '155', '120', '60'].includes(MY_CATE)) {
            cateUrl = rule.host + '/api/movie/index';
            cateData = {
                'category_id': MY_CATE,
                'type_id': 0,
                'sub_category_id': 2,
                'product_id': '',
                'page': MY_PAGE,
                'row': 16,
            }
            cateBody = buildUrl('', cateData).slice(1);
        } else {
            cateUrl = rule.host + '/api/v2/module/page_info';
            let _id = MY_CATE;
            if (_id == 2) {
                _id = 25;
            }
            cateData = {
                'id': _id,
                'page': MY_PAGE
            }
            cateBody = buildUrl('', cateData).slice(1);
        }
        log(cateUrl);
        log(cateData);
        log(cateBody);
        let html = post(cateUrl, {headers: rule.headers, body: cateBody});
        // log(html);
        let json = JSON.parse(html);
        let data = JSON.parse(decrypt(json.newdata));
        //log(data);
        if (!/success|ok/.test(data.msg)) {
            log(data.msg);
            VODS = [];
        } else {
            let ret = data.data.list.filter(it => ![1, 2, 3, 4, 5, 6, 7, 8, 9, 63].includes(it.id));
            log(ret);
            log('len(ret):' + ret.length);
            let d = [];
            ret.forEach(it => {
                if (it && typeof (it) == 'object' && it.title && !Array.isArray(it.data)) {
                    d.push({
                        title: it.title,
                        desc: it.duration,
                        img: getSign(it.cover),
                        url: it.id,
                        content: it.tags ? it.tags.map(k => k.title).join(',') : ''
                    });

                } else if (Array.isArray(it.data)) {
                    let d1 = it.data.map(i => {
                        return {
                            title: i.title,
                            desc: i.duration + "|" + i.real_click_num,
                            img: getSign(i.cover),
                            url: i.id,
                            content: i.tags ? i.tags.map(k => k.title).join(',') : ''
                        }
                    });
                    d = d.concat(d1);
                }
            });
            setResult(d);
        }
    }),
    二级: $js.toString(() => {
        //log(MY_URL);
        let html = post(MY_URL.split('?')[0], {headers: rule.headers, body: MY_URL.split('?')[1]});
        // log(html);
        let json = JSON.parse(html);
        let data = JSON.parse(decrypt(json.newdata));
        data = data.data;
        // log(data);
        VOD = {
            vod_name: data.title,
            vod_type: data.tags ? data.tags.map(k => k.title).join(',') : '',
            vod_pic: data.cover,
            vod_remarks: data.click_num_str,
            vod_content: data.create_time + '|' + data.score,
            vod_play_from: '在线观看',
            vod_play_url: '立即播放$' + data.url
        };
    }),
    搜索: $js.toString(() => {
        let html = post(MY_URL.split('?')[0], {headers: rule.headers, body: MY_URL.split('?')[1]});
        // log(html);
        let json = JSON.parse(html);
        let data = JSON.parse(decrypt(json.newdata));
        data = data.data;
        //log(data);
        let ret = data.movies;
        let d = [];
        ret.forEach(i => {
            d.push({
                title: i.title,
                desc: i.click_num_str,
                img: getSign(i.cover),
                url: i.id,
                content: i.tags ? i.tags.map(k => k.title).join(',') : ''
            });
        });
        setResult(d);
        // VODS = [];
    }),
    lazy: $js.toString(() => {
        // https://n43mr4.yyylly.com/20240319/TBZcy2a8/index.m3u8 可播
        let real_url = getSign(input);
        input = {parse: 0, url: real_url, js: ''};
    }),
}