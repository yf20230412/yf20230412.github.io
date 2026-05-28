/**
 * 新韩剧网(hanju7.com)爬虫
 * 版本：2.7 - 使用 wvplayer 全屏播放
 */

const baseUrl = 'https://www.hanju7.com';
const headers = {
    'Referer': baseUrl,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

function safeText(el) {
    if (!el) return '';
    return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim();
}

function fixUrl(url, doc) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (doc && typeof doc.fixUrl === 'function') return doc.fixUrl(url);
    return baseUrl.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url);
}

function extractList(doc, isSearch) {
    var items = doc.querySelectorAll('.list ul li, .txt ul li');
    var list = [];
    for (var i = 0; i < items.length; i++) {
        var el = items[i];
        if (el.id === 't') continue;
        var link = el.querySelector('a[href^="/detail/"]');
        var img = el.querySelector('.tu');
        var vodId = link ? fixUrl(link.getAttribute('href'), doc) : '';
        var vodName = '';
        if (isSearch) {
            var nameEl = el.querySelector('#name a');
            vodName = nameEl ? safeText(nameEl) : '';
        } else {
            vodName = link ? link.getAttribute('title') || safeText(link) : '';
        }
        var vodPic = img ? fixUrl(img.getAttribute('data-original') || img.getAttribute('src'), doc) : '';
        var vodRemarks = '';
        var tipEl = el.querySelector('.tip');
        if (tipEl) {
            vodRemarks = safeText(tipEl);
        } else if (isSearch) {
            var actorEl = el.querySelector('#actor');
            vodRemarks = actorEl ? safeText(actorEl) : '';
        }
        if (!vodId || !vodName) continue;
        list.push({ vod_id: vodId, vod_name: vodName, vod_pic: vodPic, vod_remarks: vodRemarks });
    }
    return list;
}

function extractPlayList(doc) {
    var items = doc.querySelectorAll('.play ul li a');
    var eps = [];
    for (var i = 0; i < items.length; i++) {
        var a = items[i];
        var title = safeText(a);
        var onclick = a.getAttribute('onclick');
        var match = onclick ? onclick.match(/bb_a\('([^']+)'/) : null;
        var playId = match ? match[1] : '';
        if (playId) {
            eps.push(title + '$' + playId);
        }
    }
    return eps.join('#');
}

async function init(cfg) { return; }

async function homeContent(filter) {
    return {
        class: [
            { type_id: "1", type_name: "韩剧" },
            { type_id: "3", type_name: "韩国电影" },
            { type_id: "4", type_name: "韩国综艺" },
            { type_id: "hot", type_name: "排行榜" },
            { type_id: "new", type_name: "最新更新" }
        ],
        filters: {}
    };
}

async function homeVideoContent() {
    var res = await fetch(baseUrl + '/', { headers: headers });
    if (res.error || !res.doc) return Result.error(res.error || '请求失败');
    return { list: extractList(res.doc, false) };
}

async function categoryContent(tid, pg, filter, extend) {
    pg = parseInt(pg) || 1;
    var realPg = pg - 1;
    var ext = extend || {};
    var year = ext.year || '';
    var sort = ext.sort || '';
    
    if (tid === 'hot' || tid === 'new') {
        var url = baseUrl + '/' + tid + '.html';
        var res = await fetch(url, { headers: headers });
        if (res.error || !res.doc) return Result.error(res.error || '请求失败');
        var items = res.doc.querySelectorAll('.list_txt ul li');
        var list = [];
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            var link = el.querySelector('a');
            var vodId = link ? fixUrl(link.getAttribute('href'), res.doc) : '';
            var vodName = link ? safeText(link) : '';
            if (vodId && vodName) list.push({ vod_id: vodId, vod_name: vodName, vod_pic: '', vod_remarks: '' });
        }
        return { page: pg, pagecount: 1, list: list, total: list.length };
    }
    
    var url = baseUrl + '/list/' + tid + '-' + year + '-' + sort + '-' + realPg + '.html';
    var res = await fetch(url, { headers: headers });
    if (res.error || !res.doc) return Result.error(res.error || '请求失败');
    var list = extractList(res.doc, false);
    var pageLinks = res.doc.querySelectorAll('.page a');
    var maxPage = pg;
    for (var i = 0; i < pageLinks.length; i++) {
        var pageNum = parseInt(pageLinks[i].textContent);
        if (!isNaN(pageNum) && pageNum > maxPage) maxPage = pageNum;
    }
    return { page: pg, pagecount: maxPage > pg ? maxPage : pg, list: list, total: list.length };
}

async function detailContent(ids) {
    var id = Array.isArray(ids) ? ids[0] : ids;
    var res = await fetch(fixUrl(id), { headers: headers });
    if (res.error || !res.doc) return Result.error(res.error || '请求失败');
    var doc = res.doc;
    
    var name = '', pic = '', remarks = '', year = '', actor = '', content = '';
    var titleEl = doc.querySelector('.name dd');
    if (titleEl) name = safeText(titleEl);
    var picEl = doc.querySelector('.pic img');
    if (picEl) pic = fixUrl(picEl.getAttribute('data-original') || picEl.getAttribute('src'), doc);
    var infoItems = doc.querySelectorAll('.info dl');
    for (var i = 0; i < infoItems.length; i++) {
        var dt = infoItems[i].querySelector('dt');
        var dd = infoItems[i].querySelector('dd');
        if (!dt || !dd) continue;
        var label = safeText(dt);
        var value = safeText(dd);
        if (label === '状态：') remarks = value;
        else if (label === '主演：') actor = value;
        else if (label === '上映：') year = value.split('-')[0];
    }
    var contentEl = doc.querySelector('.juqing');
    if (contentEl) content = safeText(contentEl);
    var playUrl = extractPlayList(doc);
    if (!playUrl) playUrl = '第1集$' + id;
    
    return {
        code: 1, msg: "数据列表", page: 1, pagecount: 1, limit: 1, total: 1,
        list: [{ vod_id: id, vod_name: name, vod_pic: pic, vod_remarks: remarks, vod_year: year, vod_actor: actor, vod_content: content, vod_play_from: '新韩剧网', vod_play_url: playUrl }]
    };
}

async function searchContent(key, quick, pg) {
    pg = parseInt(pg) || 1;
    var res = await fetch(baseUrl + '/search/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'show=searchkey&keyboard=' + encodeURIComponent(key)
    });
    if (res.error || !res.doc) return Result.error(res.error || '请求失败');
    var doc = res.doc;
    var items = doc.querySelectorAll('.txt ul li');
    var list = [];
    for (var i = 0; i < items.length; i++) {
        var el = items[i];
        if (el.id === 't') continue;
        var link = el.querySelector('#name a');
        if (!link) continue;
        var vodId = fixUrl(link.getAttribute('href'), doc);
        var vodName = safeText(link);
        if (vodId && vodName) list.push({ vod_id: vodId, vod_name: vodName, vod_pic: '', vod_remarks: '' });
    }
    return { code: 1, msg: "数据列表", list: list, page: pg, pagecount: 1, limit: list.length, total: list.length };
}

// 使用 wvplayer 全屏播放
async function playerContent(flag, id, vipFlags) {
    var detailId = id.split('_')[0];
    var playPageUrl = baseUrl + '/detail/' + detailId + '.html';
    
    return {
        type: 'wvplayer',
        url: playPageUrl,
        headers: headers,
        script: `
            (function() {
                var playId = '${id}';
                // 查找并点击播放按钮
                var links = document.querySelectorAll('.play ul li a');
                for (var i = 0; i < links.length; i++) {
                    var a = links[i];
                    var onclick = a.getAttribute('onclick');
                    if (onclick && onclick.indexOf(playId) !== -1) {
                        a.click();
                        break;
                    }
                }
            })();
        `
    };
}

async function action(actionStr) { return; }

var routes = {
    homeVideoContent: function() { return false; },
    categoryContent: function() { return false; },
    detailContent: function() { return false; },
    searchContent: function() { return false; },
    playerContent: function(flag, id, vipFlags) {
        return baseUrl + '/detail/' + id.split('_')[0] + '.html';
    }
};

var spider = { init, homeContent, homeVideoContent, categoryContent, detailContent, searchContent, playerContent, action };
spider;