import 'assets://js/lib/crypto-js.js';

const aggConfig = {
  headers: {
    default: { 'User-Agent': 'okhttp/3.12.11', 'content-type': 'application/json; charset=utf-8' }
  },
  platform: {
    西饭: { host: 'https://xifan-api-cn.youlishipin.com', url1: '/xifan/drama/portalPage', url2: '/xifan/drama/getDuanjuInfo', search: '/xifan/search/getSearchList' }
  },
  platformList: [
    { name: '西饭短剧', id: '西饭' }
  ],
  search: { limit: 30, timeout: 6000 }
};

const ruleFilterDef = {
  西饭: { area: '' }
};

// 公共工具
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

async function init() {
  return true;
}

async function home() {
  const classes = aggConfig.platformList.map(p => ({ type_name: p.name, type_id: p.id }));
  return JSON.stringify({ class: classes, filters: {} });
}

async function recommend() {
  return await category("西饭", 1, false, ruleFilterDef["西饭"]);
}

async function category(tid, pg, filter, extend) {
  const plat = aggConfig.platform[tid];
  const area = extend?.area || ruleFilterDef[tid]?.area || '';
  const [typeId, typeName] = area.split('@');
  const page = parseInt(pg) || 1;
  const videos = [];
  try {
    const ts = Math.floor(Date.now() / 1000);
    const url = `${plat.host}${plat.url1}?reqType=aggregationPage&offset=${(page - 1) * 30}&categoryId=${typeId}&quickEngineVersion=-1&scene=&categoryNames=${encodeURIComponent(typeName || '')}&categoryVersion=1&density=1.5&pageID=page_theater&version=2001001&androidVersionCode=28&requestId=${ts}aa498144140ef297&appId=drama&teenMode=false&userBaseMode=false&session=eyJpbmZvIjp7InVpZCI6IiIsInJ0IjoiMTc0MDY1ODI5NCIsInVuIjoiT1BHXzFlZGQ5OTZhNjQ3ZTQ1MjU4Nzc1MTE2YzFkNzViN2QwIiwiZnQiOiIxNzQwNjU4Mjk0In19&feedssession=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dHlwIjowLCJidWlkIjoxNjMzOTY4MTI2MTQ4NjQxNTM2LCJhdWQiOiJkcmFtYSIsInZlciI6MiwicmF0IjoxNzQwNjU4Mjk0LCJ1bm0iOiJPUEdfMWVkZDk5NmE2NDdlNDUyNTg3NzUxMTZjMWQ3NWI3ZDAiLCJpZCI6IjNiMzViZmYzYWE0OTgxNDQxNDBlZjI5N2JkMDY5NGNhIiwiZXhwIjoxNzQxMjYzMDk0LCJkYyI6Imd6cXkifQ.JS3QY6ER0P2cQSxAE_OGKSMIWNAMsYUZ3mJTnEpf-Rc`;
    const res = JSON.parse(await request(url, { headers: aggConfig.headers.default }));
    const elements = res?.result?.elements || [];
    elements.forEach(s => (s.contents || []).forEach(v => {
      const d = v.duanjuVo;
      if (d) {
        videos.push({
          vod_id: `西饭@${d.duanjuId}#${d.source}`,
          vod_name: d.title,
          vod_pic: d.coverImageUrl,
          vod_remarks: `${d.total}集`
        });
      }
    }));
  } catch (e) {}
  return JSON.stringify({ list: videos, page, pagecount: page + 1, limit: videos.length, total: videos.length });
}

async function detail(id) {
  const [platId, ...rest] = id.split('@');
  const did = rest.join('@');
  const [duanjuId, source] = did.split('#');
  const plat = aggConfig.platform[platId];
  let vod = { vod_id: id, vod_name: '未知', vod_pic: '', vod_remarks: '', vod_content: '', vod_play_from: '', vod_play_url: '' };
  try {
    const url = `${plat.host}${plat.url2}?duanjuId=${duanjuId}&source=${source}`;
    const res = JSON.parse(await request(url));
    if (res?.result) {
      const d = res.result;
      const u = (d.episodeList || []).map(e => `${e.index}$${e.playUrl}`).join('#');
      vod = {
        ...vod,
        vod_name: d.title,
        vod_pic: d.coverImageUrl,
        vod_remarks: d.updateStatus === 'over' ? `${d.total}集 已完结` : `更新${d.total}集`,
        vod_play_from: '西饭短剧',
        vod_play_url: u
      };
    }
  } catch (e) { vod.vod_name = '加载失败'; }
  return JSON.stringify({ list: [vod] });
}

async function play(flag, id) {
  return JSON.stringify({ parse: 0, url: id });
}

async function search(wd, quick, pg) {
  const page = parseInt(pg) || 1;
  const videos = [];
  try {
    const ts = Math.floor(Date.now() / 1000);
    const plat = aggConfig.platform.西饭;
    const url = `${plat.host}${plat.search}?reqType=search&offset=${(page - 1) * 30}&keyword=${encodeURIComponent(wd)}&quickEngineVersion=-1&scene=`;
    const res = await request(url);
    const data = (JSON.parse(res)?.result?.elements || []).map(vod => {
      const dj = vod.duanjuVo || {};
      return {
        vod_id: `西饭@${dj.duanjuId}#${dj.source}`,
        vod_name: dj.title,
        vod_pic: dj.coverImageUrl,
        vod_remarks: `西饭短剧｜${dj.total}集`
      };
    });
    if (data) videos.push(...data);
  } catch {}
  return JSON.stringify({
    list: videos,
    page,
    pagecount: page + 1,
    limit: videos.length,
    total: videos.length * (page + 1)
  });
}

export function __jsEvalReturn() {
  return { init, home, homeVod: recommend, category, detail, play, proxy: null, search };
}
