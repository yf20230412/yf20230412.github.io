// @name 咖啡直播
// @author modified by ChatGPT
// @description 咖啡直播体育赛事录像回放，按影视壳子模板改写
// @version 1.1.0

const host = 'https://kafeizhibo.com';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': host + '/pc/replay',
    'Origin': host
};

// ========== 工具函数 ==========

function fixUrl(path) {
    if (!path) return '';
    if (String(path).startsWith('http')) return path;
    if (String(path).startsWith('//')) return 'https:' + path;
    return host + (String(path).startsWith('/') ? '' : '/') + path;
}

function safeText(value, fallback = '') {
    if (value === undefined || value === null) return fallback;
    return String(value).trim();
}

function safeNumber(value, fallback = '') {
    if (value === undefined || value === null || value === '') return fallback;
    return String(value);
}

function cleanName(name) {
    return safeText(name, '播放').replace(/[$#]/g, ' ').trim() || '播放';
}

function cleanPlayUrl(url) {
    return safeText(url).replace(/#/g, '%23');
}

function buildQuery(params = {}) {
    const arr = [];
    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === '') continue;
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return arr.join('&');
}

function getContent(res) {
    if (!res) return '';
    if (typeof res === 'string') return res;
    if (typeof res.content === 'string') return res.content;
    if (typeof res.body === 'string') return res.body;
    if (typeof res.data === 'string') return res.data;
    if (typeof res.content === 'object') return JSON.stringify(res.content);
    if (typeof res.body === 'object') return JSON.stringify(res.body);
    if (typeof res.data === 'object') return JSON.stringify(res.data);
    return '';
}

async function requestJson(url, params = {}) {
    const query = buildQuery(params);
    const finalUrl = query ? `${url}${url.includes('?') ? '&' : '?'}${query}` : url;
    const r = await req(finalUrl, { headers });
    const content = getContent(r);
    if (!content) return null;
    return JSON.parse(content);
}

function isOk(data) {
    return data && (data.code === 200 || data.code === '200') && data.data;
}

// ========== 分类配置 ==========

const classes = [
    { type_id: 'all', type_name: '全部' },
    { type_id: '1', type_name: '足球' },
    { type_id: '2', type_name: '篮球' },
    { type_id: 'nba', type_name: 'NBA' }
];

const filters = {
    'all': [
        { key: 'league', name: '联赛', value: [
            { n: '全部', v: '' },
            { n: 'NBA', v: 'NBA' },
            { n: 'CBA', v: 'CBA' },
            { n: '英超', v: '英超' },
            { n: '西甲', v: '西甲' },
            { n: '意甲', v: '意甲' },
            { n: '德甲', v: '德甲' },
            { n: '欧冠', v: '欧冠' }
        ]}
    ],
    '1': [
        { key: 'league', name: '联赛', value: [
            { n: '全部', v: '' },
            { n: '英超', v: '英超' },
            { n: '西甲', v: '西甲' },
            { n: '意甲', v: '意甲' },
            { n: '德甲', v: '德甲' },
            { n: '法甲', v: '法甲' },
            { n: '欧冠', v: '欧冠' },
            { n: '中超', v: '中超' }
        ]}
    ],
    '2': [
        { key: 'league', name: '联赛', value: [
            { n: '全部', v: '' },
            { n: 'NBA', v: 'NBA' },
            { n: 'CBA', v: 'CBA' },
            { n: 'WNBA', v: 'WNBA' }
        ]}
    ],
    'nba': [
        { key: 'league', name: '联赛', value: [
            { n: 'NBA', v: 'NBA' }
        ]}
    ]
};

// ========== API 请求 ==========

async function fetchRecordings(page = 1, size = 30, league = '', type = '') {
    const params = { page, size };
    if (league) {
        params.league = league;
    } else if (type && type !== 'all' && type !== 'nba') {
        params.type = type;
    }
    return await requestJson(`${host}/api/v1/recordings`, params);
}

async function fetchMatchRecordings(matchId) {
    return await requestJson(`${host}/api/v1/match/${encodeURIComponent(matchId)}/recordings`);
}

// ========== 数据解析 ==========

function parseVideoList(items = [], showScore = true) {
    if (!Array.isArray(items)) return [];

    return items.map(item => {
        const home = safeText(item.home_team, '主队');
        const away = safeText(item.away_team, '客队');
        const league = safeText(item.league_name, '赛事');
        const title = `${home} vs ${away} (${league})`;

        const homeScore = safeNumber(item.home_score, '-');
        const awayScore = safeNumber(item.away_score, '-');
        const score = `${homeScore} - ${awayScore}`;
        const time = safeText(item.start_time);
        const count = safeNumber(item.recording_count, '0');

        let pic = item.cover_image || item.home_team_logo || item.away_team_logo || '';
        pic = fixUrl(pic);
        if (pic.includes('default_cover')) {
            pic = fixUrl(item.home_team_logo || item.away_team_logo || '');
        }

        return {
            vod_id: String(item.match_id || item.id || ''),
            vod_name: title,
            vod_pic: pic,
            vod_remarks: showScore ? `${score} | ${time} | ${count}个录像` : time
        };
    }).filter(v => v.vod_id && v.vod_name);
}

function buildEpisodeLine(items = [], prefix = '录像') {
    const arr = [];
    if (!Array.isArray(items)) return '';

    items.forEach((rec, idx) => {
        const url = cleanPlayUrl(rec.video_url || rec.url || rec.play_url || '');
        if (!url) return;
        const name = cleanName(rec.title || rec.name || `${prefix}${idx + 1}`);
        arr.push(`${name}$${url}`);
    });

    return arr.join('#');
}

// ========== 壳子接口实现 ==========

async function init(cfg) {
    return JSON.stringify({});
}

async function home(filter) {
    try {
        return JSON.stringify({
            class: classes,
            filters: filters
        });
    } catch (e) {
        return JSON.stringify({ class: [] });
    }
}

async function homeVod() {
    try {
        const data = await fetchRecordings(1, 30);
        const list = isOk(data) ? parseVideoList(data.data) : [];
        return JSON.stringify({ list });
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
}

async function category(tid, pg, filter, extend = {}) {
    try {
        const page = parseInt(pg) || 1;
        const size = tid === 'nba' ? 20 : 30;
        let league = '';
        let type = '';

        if (extend && extend.league) {
            league = extend.league;
        } else if (tid === 'nba') {
            league = 'NBA';
        } else if (tid !== 'all') {
            type = tid;
        }

        const data = await fetchRecordings(page, size, league, type);
        const list = isOk(data) ? parseVideoList(data.data) : [];
        const pagecount = list.length >= size ? page + 1 : page;

        return JSON.stringify({
            page: page,
            pagecount: pagecount,
            limit: size,
            total: list.length,
            list: list
        });
    } catch (e) {
        return JSON.stringify({
            page: parseInt(pg) || 1,
            pagecount: 0,
            limit: 0,
            total: 0,
            list: []
        });
    }
}

async function detail(id) {
    try {
        const matchId = String(id || '').trim();
        if (!matchId) return JSON.stringify({ list: [] });

        const data = await fetchMatchRecordings(matchId);
        if (!isOk(data)) return JSON.stringify({ list: [] });

        const root = data.data || {};
        const match = root.match || {};
        const replays = root.replays || [];
        const highlights = root.highlights || [];

        const home = safeText(match.home_team, '主队');
        const away = safeText(match.away_team, '客队');
        const league = safeText(match.league_name, '赛事');
        const title = `${home} vs ${away} (${league})`;
        const score = `${safeNumber(match.home_score, '-')} - ${safeNumber(match.away_score, '-')}`;
        const time = safeText(match.start_time);
        const round = safeText(match.match_round);

        const playFrom = [];
        const playUrls = [];

        const replayLine = buildEpisodeLine(replays, '录像');
        if (replayLine) {
            playFrom.push('全场录像');
            playUrls.push(replayLine);
        }

        const highlightLine = buildEpisodeLine(highlights, '集锦');
        if (highlightLine) {
            playFrom.push('比赛集锦');
            playUrls.push(highlightLine);
        }

        const pic = fixUrl(match.cover_image || match.home_team_logo || match.away_team_logo || '');

        const vodInfo = {
            vod_id: matchId,
            vod_name: title,
            vod_pic: pic,
            vod_remarks: score,
            vod_content: `${league} ${round} ${home} vs ${away}，比分 ${score}，比赛时间：${time}`,
            vod_play_from: playFrom.join('$$$'),
            vod_play_url: playUrls.join('$$$'),
            type_name: league
        };

        return JSON.stringify({ list: [vodInfo] });
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
}

async function search(wd, quick, pg = 1) {
    try {
        const keyword = safeText(wd).toLowerCase();
        if (!keyword) return JSON.stringify({ page: 1, pagecount: 0, list: [] });

        // 咖啡直播接口没有明显的搜索 API，这里沿用原逻辑：拉取较多录像后本地筛选
        const data = await fetchRecordings(1, 100);
        if (!isOk(data) || !Array.isArray(data.data)) {
            return JSON.stringify({ page: 1, pagecount: 0, list: [] });
        }

        const filtered = data.data.filter(item => {
            const home = safeText(item.home_team).toLowerCase();
            const away = safeText(item.away_team).toLowerCase();
            const league = safeText(item.league_name).toLowerCase();
            return home.includes(keyword) || away.includes(keyword) || league.includes(keyword);
        });

        const list = parseVideoList(filtered);

        return JSON.stringify({
            page: parseInt(pg) || 1,
            pagecount: 1,
            limit: list.length,
            total: list.length,
            list: list
        });
    } catch (e) {
        return JSON.stringify({
            page: parseInt(pg) || 1,
            pagecount: 0,
            list: []
        });
    }
}

async function play(flag, id, flags) {
    try {
        const url = cleanPlayUrl(id);
        return JSON.stringify({
            parse: 0,
            url: url,
            header: {
                'User-Agent': headers['User-Agent'],
                'Referer': host,
                'Origin': host
            }
        });
    } catch (e) {
        return JSON.stringify({
            parse: 0,
            url: id || ''
        });
    }
}

export default {
    init: init,
    home: home,
    homeVod: homeVod,
    category: category,
    detail: detail,
    search: search,
    play: play
};