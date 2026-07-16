import 'assets://js/lib/crypto-js.js';

const aggConfig = {
  keys: 'd3dGiJc651gSQ8w1',
  charMap: {
    '+': 'P', '/': 'X', '0': 'M', '1': 'U', '2': 'l', '3': 'E', '4': 'r', '5': 'Y', '6': 'W', '7': 'b', '8': 'd', '9': 'J',
    'A': '9', 'B': 's', 'C': 'a', 'D': 'I', 'E': '0', 'F': 'o', 'G': 'y', 'H': '_', 'I': 'H', 'J': 'G', 'K': 'i', 'L': 't',
    'M': 'g', 'N': 'N', 'O': 'A', 'P': '8', 'Q': 'F', 'R': 'k', 'S': '3', 'T': 'h', 'U': 'f', 'V': 'R', 'W': 'q', 'X': 'C',
    'Y': '4', 'Z': 'p', 'a': 'm', 'b': 'B', 'c': 'O', 'd': 'u', 'e': 'c', 'f': '6', 'g': 'K', 'h': 'x', 'i': '5', 'j': 'T',
    'k': '-', 'l': '2', 'm': 'z', 'n': 'S', 'o': 'Z', 'p': '1', 'q': 'V', 'r': 'v', 's': 'j', 't': 'Q', 'u': '7', 'v': 'D',
    'w': 'w', 'x': 'n', 'y': 'L', 'z': 'e'
  },
  headers: {
    default: { 'User-Agent': 'okhttp/3.12.11', 'content-type': 'application/json; charset=utf-8' }
  },
  platform: {
    七猫: { host: 'https://api-store.qmplaylet.com', url1: '/api/v1/playlet/index', url2: 'https://api-read.qmplaylet.com/player/api/v1/playlet/info', search: '/api/v1/playlet/search' }
  },
  platformList: [
     { name: '七猫短剧', id: '七猫' }
   ],
   search: { limit: 30, timeout: 6000 }
 };

const ruleFilterDef = {
  七猫: { area: '0' }
};

// 保留原版全部工具函数，不修改
function base64Encode(text) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
}
function base64Decode(text) {
  return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
}
async function request(url, options = {}) {
  const { method = 'GET', headers = {}, body, timeout = 5000 } = options;
  const isPost = method.toUpperCase() === 'POST';
  let requestBody = body && typeof body === 'object' ? JSON.stringify(body) : body;
  if (typeof req !== 'undefined') {
    return (await req(url, {
      method,
      headers: { ...aggConfig.headers.default, ...headers },
      body: isPost ? requestBody : null,
      timeout
    })).content;
  }
}
async function md5(str) {
  return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex).toLowerCase();
}
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// 【核心】完全复制原版的加密拼接，没有改动，保留 unescape(encodeURIComponent)
async function getQmParamsAndSign() {
  const sessionId = Date.now().toString();
  const data = {
    "static_score": "0.8",
    "uuid": "00000000-7fc7-08dc-0000-000000000000",
    "device-id": "20250220125449b9b8cac84c2dd3d035c9052a2572f7dd0122edde3cc42a70",
    "sourceuid": "aa7de295aad621a6",
    "refresh-type": "0",
    "model": "22021211RC",
    "client-id": "aa7de295aad621a6",
    "brand": "Redmi",
    "sys-ver": "12",
    "phone-level": "H",
    "wlb-uid": "aa7de295aad621a6",
    "session-id": sessionId
  };
  const jsonStr = JSON.stringify(data);
  const base64Str = base64Encode(unescape(encodeURIComponent(jsonStr)));
  let qmParams = '';
  for (const c of base64Str) {
    qmParams += aggConfig.charMap[c] || c;
  }
  const paramsStr = `AUTHORIZATION=app-version=10001application-id=com.duoduo.readchannel=unknownis-white=net-env=5platform=androidqm-params=${qmParams}reg=${aggConfig.keys}`;
  const sign = await md5(paramsStr);
  return { qmParams, sign };
}

async function getHeaderX() {
  const { qmParams, sign } = await getQmParamsAndSign();
  return {
    'net-env': '5',
    'reg': '',
    'channel': 'unknown',
    'is-white': '',
    'platform': 'android',
    'application-id': 'com.duoduo.read',
    'authorization': '',
    'app-version': '10001',
    'user-agent': 'webviewversion/0',
    'qm-params': qmParams,
    'sign': sign
  };
}

async function init() {
  return true;
}

async function home(filter) {
  const classes = aggConfig.platformList.map(p => ({ type_name: p.name, type_id: p.id }));
  return JSON.stringify({ class: classes, filters: {} });
}

async function homeVod() { return await recommend(); }

async function recommend() {
  const area = ruleFilterDef["七猫"]?.area || '';
  const videos = await category("七猫", 1, false, { area });
  const list = JSON.parse(videos).list.slice(0, 10);
  return JSON.stringify({ list });
}

async function category(tid, pg, filter, extend) {
  const plat = aggConfig.platform[tid];
  const area = (extend?.area !== undefined ? extend.area : ruleFilterDef[tid]?.area) || '';
  const page = parseInt(pg) || 1;
  const videos = [];
  if (!plat) return JSON.stringify({ list: videos, page, pagecount: 1, limit: 0, total: 0 });
  try {
    // 原版签名拼接，没有加&分隔，完全和聚合一致
    const sign = await md5(`operation=1playlet_privacy=1tag_id=${area}${aggConfig.keys}`);
    const url = `${plat.host}${plat.url1}?tag_id=${area}&playlet_privacy=1&operation=1&sign=${sign}`;
    const res = JSON.parse(await request(url, { headers: { ...await getHeaderX(), ...aggConfig.headers.default } }));
    (res?.data?.list || []).forEach(i => videos.push({
      vod_id: `七猫@${encodeURIComponent(i.playlet_id)}`,
      vod_name: i.title,
      vod_pic: i.image_link,
      vod_remarks: `${i.total_episode_num}集`
    }));
  } catch (e) { }
  return JSON.stringify({ list: videos, page, pagecount: page + 1, limit: videos.length, total: videos.length });
}

async function detail(id) {
  const [platId, ...rest] = id.split('@');
  const did = rest.join('@');
  const plat = aggConfig.platform[platId];
  if (!plat) return JSON.stringify({ list: [{ vod_id: id, vod_name: '平台不支持', vod_play_url: '' }] });
  let vod = { vod_id: id, vod_name: '未知', vod_pic: '', vod_remarks: '', vod_content: '', vod_play_from: '', vod_play_url: '' };
  try {
    if (platId === '七猫') {
      const didDecoded = decodeURIComponent(did);
      // 原版不带&的签名，原样保留
      const sign = await md5(`playlet_id=${didDecoded}${aggConfig.keys}`);
      const url = `${plat.url2}?playlet_id=${didDecoded}&sign=${sign}`;
      const res = JSON.parse(await request(url, { headers: { ...await getHeaderX(), ...aggConfig.headers.default } }));
      if (res?.data) {
        const d = res.data;
        vod = {
          ...vod,
          vod_name: d.title,
          vod_pic: d.image_link,
          vod_remarks: `${d.total_episode_num}集`,
          vod_content: d.intro,
          vod_play_from: '七猫短剧',
          vod_play_url: (d.play_list || []).map(i => `${i.sort}$${i.video_url}`).join('#')
        };
      }
    }
  } catch (e) { vod.vod_name = '加载失败'; }
  return JSON.stringify({ list: [vod] });
}

async function play(flag, id) {
  if (/七猫/.test(flag)) {
    return JSON.stringify({ parse: 0, url: id });
  }
  return JSON.stringify({ parse: 0, url: id });
}

async function search(wd, quick, pg) {
  const page = parseInt(pg) || 1;
  const videos = [];
  try {
    // 原版搜索签名拼接，原样复制
    const sign = await md5(`operation=2playlet_privacy=1search_word=${wd}${aggConfig.keys}`);
    const url = `${aggConfig.platform.七猫.host}${aggConfig.platform.七猫.search}?search_word=${encodeURIComponent(wd)}&playlet_privacy=1&operation=2&sign=${sign}`;
    const res = JSON.parse(await request(url, {
      headers: { ...await getHeaderX(), ...aggConfig.headers.default },
      timeout: aggConfig.search.timeout
    }));
    (res?.data?.list || []).forEach(i => {
      videos.push({
        vod_id: `七猫@${encodeURIComponent(i.playlet_id)}`,
        vod_name: i.title,
        vod_pic: i.image_link,
        vod_remarks: `七猫短剧｜${i.total_episode_num}集`
      });
    });
  } catch {}
  return JSON.stringify({
    list: videos,
    page,
    pagecount: page + 1,
    limit: videos.length,
    total: videos.length
  });
}

export function __jsEvalReturn() {
  return { init, home, homeVod, category, detail, play, proxy: null, search };
}
