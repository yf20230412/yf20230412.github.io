// 地址发布页 https://www.czzy.site
// 地址发布页 https://cz01.vip
var rule = {
    title: '厂长资源',
    //host: 'https://www.czzy88.com',
    host:'https://www.czzy.site',
    //hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});HOST = html.match(/推荐访问<a href="(.*)"/)[1];print("厂长跳转地址 =====> " + HOST)',
	hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src=jsp.pdfh(html,"li:eq(3)&&a&&href");print(src);HOST=src',
    url: '/fyclassfyfilter',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}{{fl.class}}{{fl.area}}{{fl.year}}/page/fypage',
    filter: 'H4sIAAAAAAAAA42W2VLiQBSG3yXXVkFwXF9lyrIaiRCERIGowXLKDQRUxBnFtdQqRXBBZRydkfVlsnHlK0y3GLppE7C4Sv/fOaf779OnWGCC4izPjbsjzOj3BWaKk5lRBoQ4wPQxAghy8EtNxPVSBX7PgoDEvWOzcBkBSI0VmqsFZrGvteow042HuRDPhR0eWf4g9d1ntVbqQvJACPt4v4R5Ix9Xk/kuIaJPAuZGUgV9t2LPeiVxwgeEdnr1uKaU813TB/3mVurprmDIBLX9XFfQZ4LNs+vu4Fw75fNf9TIL4bdqQo29KJXsWzXZJVACsoSslHnBax51K208FHv5H+R46BEVqt3l4eF7hYZ4NyfQkfs57eSuVyS8kc9FkTnHtV6hKOBzrLFR+kLsJLA46tPe16p6Pvv7qJavekVyAUkM81So0ljTa/ta9qFXtB/GAQ+gK6fOtY2GepnvFR6FRqP290YkHqUyG/v2sLnX0NIFYyvTrad4WQJCFPaWMGO+H6V6pO4cKP9+qZtlZnEMBbemx0QAhMN4fMDZoZ5udIwPYm70tWYJim4lPTfuHz9W8T4iwBt2TKDyfr7NqmsN/TZnzXIRLoLB+M/m4bU1GATiPLKjzSbz2mrMmvVLM8j5NpoqKLUTa9QjRiWRJLXqrR0ZJMu3hpg16fNhLh1Xt39bcwEeTlFMbl8aFzYH8krvV0ocKbOpLeWt4YgoeOc7zp89QSPMEp5HY7wN5tbVV5tDzfBoBxi9f1HLRRv7eRAh62vLGW0pa81OSW5cX1u507M7NhuV0HvC6GrMSNr4ii4/zBFoSls5simPUJHca+JAKSetYfQ0oz4Om6AVN43Eqc2VzRHYlVI/t8bmJNjVbVJfrjeP6jbVAS8QF6AnSrb9D/iO/tdTD3rtxhqdhEeSsK36WVFPrtu09TTG8ju2jTKFm18v36i1PduE/sA0TmnkGnjM0HfvxlgjA5+eNSZ72ljz7El5zdhgcscUlDkQIv5Dvf5RKhdfHIIup+ubWQOlcbwvEGo/rfaTqotWXaTK0ipLqk5adRIqO0KpcIFQh2l1mFSHaHWIVAdpdZBUB2h1gFRpr1jSK5b2iiW9YmmvWNIrlvaKZQUPoTvZH3DNie+WQGEmKBE4O+J0QtxphSMNSQgfg7//UTJ+MJULAAA=',
    searchUrl: '/daoyongjiekoshibushiyoubing?q=**&f=_all&p=fypage',
    
    searchable: 2,
    filterable: 0,
    headers: {
        'User-Agent': 'PC_UA',
        // 'Cookie': 'esc_search_captcha=1'
    },
    class_name: '全部&豆瓣电影Top250&国产剧&最新电影&电视剧&美剧&韩剧&日剧&华语电影&欧美电影&韩国电影&日本电影&番剧',
    class_url: 'movie_bt&/dbtop250&/gcj&/zuixindianying&/dongmanjuchangban&/meijutt&/hanjutv&/movie_bt_series/rj&/movie_bt_series/huayudianying&/movie_bt_series/meiguodianying&/movie_bt_series/hanguodianying&/movie_bt_series/ribendianying&/fanju',
    tab_rename:{'在线观看':'🌺风言锋语88🌺'},
    play_parse: true,
    lazy: `js:
        pdfh = jsp.pdfh;
        var html = request(input);
        var ohtml = pdfh(html, '.videoplay&&Html');
        var url = pdfh(ohtml, "body&&iframe&&src");
        if (url) {
            var _obj={};
            eval(pdfh(request(url),'body&&script&&Html')+'\\n_obj.player=player;_obj.rand=rand');
            function js_decrypt(str, tokenkey, tokeniv) {
                eval(getCryptoJS());
                var key = CryptoJS.enc.Utf8.parse(tokenkey);
                var iv = CryptoJS.enc.Utf8.parse(tokeniv);
                return CryptoJS.AES.decrypt(str, key, {iv: iv,padding: CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
            };
            let config = JSON.parse(js_decrypt(_obj.player,'VFBTzdujpR9FWBhe', _obj.rand));
            input = {
                 jx: 0,
                 url: config.url,
                 parse: 0
            };
        }else if (/decrypted/.test(ohtml)) {
            var phtml = pdfh(ohtml, "body&&script:not([src])&&Html");
            eval(getCryptoJS());
            var script = phtml.match(/var.*?\\)\\);/g)[0];
            var data = [];
            eval(script.replace(/md5/g, 'CryptoJS').replace('eval', 'data = '));
            input = {
                jx: 0,
                url: data.match(/url:.*?['"](.*?)['"]/)[1],
                parse: 0
            }


        } 
    `,
    推荐: '.bt_img;ul&&li;*;*;*;*',
    double: true,
    一级: '.bt_img&&ul&&li;h3.dytit&&Text;img.lazy&&data-original;.jidi&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.moviedteail_list li&&a&&Text",
        "img": "div.dyimg img&&src",
        "desc": ".moviedteail_list li:eq(3) a&&Text;.moviedteail_list li:eq(2) a&&Text;.moviedteail_list li:eq(1) a&&Text;.moviedteail_list li:eq(7)&&Text;.moviedteail_list li:eq(5)&&Text",
        "content": ".yp_context&&Text",
        "tabs": ".mi_paly_box span",
        "lists": ".paly_list_btn:eq(#id) a"
    },
    搜索: `js:
    let cookie = getItem(RULE_CK,'');
    // let cookie = '';
    log('储存的cookie:'+cookie);
    let hhtml=request(input,{withHeaders:true,headers:{Cookie:cookie}});
    let json = JSON.parse(hhtml);
    let html = json.body;
    let setCk = Object.keys(json).find(it=>it.toLowerCase()==='set-cookie');
    cookie = setCk ? json[setCk] : cookie;
    // 3个set-Cookie
    if (Array.isArray(cookie)) {
        cookie = cookie.join(';');
    }
    cookie = cookie.split(';')[0];
    log('set-cookie:'+cookie);
    let code='';
    if(/erphp-search-captcha/.test(html)){
        code = jsp.pdfh(html,'.erphp-search-captcha--button&&Text');
        if(code.includes('=')){
            let a = code.replace('=','').replace(/ /g,'');
            code = eval(a);
            log('回答验证码:'+a+' 答案:'+code);
        }
        let key = jsp.pdfh(html,'.erphp-search-captcha&&input&&name');
        let body = key+'='+code;
        post(input,{body:body,headers:{Cookie:cookie}});
        setItem(RULE_CK,cookie);
        html = getHtml(input);
    }
    // log(html);
    VODS = [];
    let lis=pdfa(html,'.search_list&&ul&&li');
    log(lis.length);
    lis.forEach(function(it){
        VODS.push({
            vod_id: pd(it,'a&&href',input),
			vod_name: pdfh(it,'h3.dytit&&Text'),
			vod_pic: pd(it,'img.lazy&&data-original',input),
			vod_remarks: pdfh(html,'.jidi&&Text')
        });
    
    });
    
    `,

}