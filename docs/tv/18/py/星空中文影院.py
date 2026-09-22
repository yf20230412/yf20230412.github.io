# coding: utf-8
# ============================================================
# 站点：星空中文影院
# 主域名：https://bide7o35.xkxk11.cyou/
# 备用域名：www.xkyy123.cc / www.xkys123.cc（发布页公布，未验证可达）
# 类型：自研模板影视站（非 MacCMS）
# 结构：
#   分类   /t/{tid}.html        视频分类（data-tid）
#   图文   /a/{tid}.html        小说/图片分类
#   分页   /t/{tid}-{page}.html
#   详情   /s/{id}.html
#   播放页 /s-p/{id}-{line}-{ep}.html（player_data JSON 内联直链）
#   搜索   /sou/-.html?wd={kw}
# 播放：player_data.url 直链 m3u8，ytm3u8 线路，encrypt=0
# m3u8：多码率，无 KEY，有广告分片目录，分片可达
# 广告锚点：/20260918/xxxx/1500kb/hls/（动态，按实际取值）
# 特殊：Cloudflare 前置，Set-Cookie server_session；请求需带 UA
# 最后验证：2026-09-20
# ============================================================
import json
import re
import html
import base64
import urllib.parse
from urllib.parse import quote, urljoin, unquote, urlparse
from concurrent.futures import ThreadPoolExecutor

from base.spider import Spider as BaseSpider


class Spider(BaseSpider):

    # m3u8 是否需要走代理清洗（m3u8_analyzer 取证：suspicious_ad_dirs 非空）
    NEED_CLEAN = True

    # ============ 播放地址提取管线常量（法则32） ============
    MEDIA_EXT = (".m3u8", ".mp4", ".mkv", ".flv", ".avi", ".m4v", ".mov", ".ts")
    PLAYER_VARS = ("player_data", "player_aaaa", "player_conf", "playerData", "vid_data")
    URL_KEYS = ("url", "play_url", "playUrl", "video_url", "videoUrl", "src",
                "source", "m3u8", "hls", "file", "purl", "vurl")
    FALLBACK_PATTERNS = (
        r'https?://[^\s"\'<>()\\]+?\.m3u8[^\s"\'<>()\\]*',
        r'https?://[^\s"\'<>()\\]+?\.mp4[^\s"\'<>()\\]*',
        r'["\']((?:https?:)?\\?/\\?/[^\s"\'<>]+?\.m3u8[^\s"\'<>]*)["\']',
    )

    def __init__(self):
        # 零网络：只做本地初始化
        self.extend = ""
        self.host = "https://bide7o35.xkxk11.cyou"
        self.ua = "Mozilla/5.0 (Linux; Android 14; 22127RK46C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        self.headers = {
            "User-Agent": self.ua,
            "Referer": self.host + "/",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9",
        }
        # 分类静态硬编码（法则16/17）
        self.classes = [
            {"type_id": "t_1", "type_name": "国产"},
            {"type_id": "t_6", "type_name": "自拍"},
            {"type_id": "t_7", "type_name": "乱伦毁三观"},
            {"type_id": "t_24", "type_name": "无码"},
            {"type_id": "t_50", "type_name": "有码"},
            {"type_id": "t_25", "type_name": "中字"},
            {"type_id": "t_26", "type_name": "欧美"},
            {"type_id": "t_27", "type_name": "动漫"},
            {"type_id": "t_28", "type_name": "三级片"},
            {"type_id": "t_29", "type_name": "AV解说"},
            {"type_id": "t_9", "type_name": "传媒"},
            {"type_id": "t_2", "type_name": "网红"},
            {"type_id": "t_15", "type_name": "学生妹"},
            {"type_id": "t_3", "type_name": "萝莉"},
            {"type_id": "t_51", "type_name": "黑料"},
            {"type_id": "t_13", "type_name": "福利姬"},
            {"type_id": "t_14", "type_name": "吃瓜"},
            {"type_id": "t_5", "type_name": "探花"},
            {"type_id": "t_4", "type_name": "大秀"},
            {"type_id": "t_58", "type_name": "制服"},
            {"type_id": "t_18", "type_name": "OnlyFans"},
            {"type_id": "t_23", "type_name": "AI换脸"},
            {"type_id": "t_41", "type_name": "Cosplay"},
            {"type_id": "a_42", "type_name": "都市小说"},
            {"type_id": "a_43", "type_name": "乱伦小说"},
            {"type_id": "a_44", "type_name": "学生小说"},
            {"type_id": "a_45", "type_name": "仙侠小说"},
            {"type_id": "a_46", "type_name": "自拍图片"},
            {"type_id": "a_47", "type_name": "亚洲色图"},
            {"type_id": "a_48", "type_name": "欧美色图"},
            {"type_id": "a_49", "type_name": "卡通色图"},
        ]
        self.filters = {}

    def getName(self):
        return "星空中文影院"

    def getDependence(self):
        return []

    def init(self, extend=""):
        # 零网络
        self.extend = extend or ""

    def destroy(self):
        pass

    # ---------------- 基础请求 ----------------
    def _fetch_text(self, url, referer=None, timeout=20):
        try:
            h = dict(self.headers)
            if referer:
                h["Referer"] = referer
            r = self.fetch(url, headers=h, timeout=timeout)
            if not r or getattr(r, "status_code", 0) != 200:
                return ""
            content = getattr(r, "content", b"") or b""
            if content:
                return content.decode("utf-8", errors="ignore")
            return getattr(r, "text", "") or ""
        except Exception as e:
            self.log({"action": "fetch_fail", "url": url, "error": type(e).__name__})
            return ""

    # ---------------- 通用列表解析 ----------------
    def _parse_list(self, text, page_url):
        """解析列表：视频用 .card，图集用 .art-card（结构已验证）"""
        if not text:
            return []
        if 'class="art-card"' in text:
            return self._parse_art_list(text, page_url)
        return self._parse_card_list(text, page_url)

    def _parse_card_list(self, text, page_url):
        result = []
        parts = re.split(r'<div class="card">', text)[1:]
        for seg in parts:
            try:
                m_link = re.search(r'<a class="title"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', seg, re.S)
                if not m_link:
                    m_link = re.search(r'<a[^>]*class="[^"]*title[^"]*"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', seg, re.S)
                if not m_link:
                    continue
                href = m_link.group(1).strip()
                name = re.sub(r'<[^>]+>', '', m_link.group(2)).strip()
                name = html.unescape(name)
                vod_id = self._url_to_id(href)
                if not vod_id:
                    continue
                pic = ""
                m_pic = re.search(r'<a class="pic"[^>]*style="[^"]*background-image:url\(([^)]+)\)', seg)
                if m_pic:
                    pic = m_pic.group(1).strip().strip('\'"')
                else:
                    m_img = re.search(r'<img[^>]+src="([^"]+)"', seg)
                    if m_img:
                        pic = m_img.group(1).strip()
                if pic and not pic.startswith("http"):
                    pic = urljoin(page_url, pic)
                remark = ""
                badges = re.findall(r'<span class="badge">(.*?)</span>', seg)
                if badges:
                    remark = badges[0].strip()
                m_hits = re.search(r'<span class="sub-hits">(.*?)</span>', seg)
                if m_hits:
                    remark = (remark + " " + m_hits.group(1).strip()).strip()
                result.append({
                    "vod_id": vod_id,
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": remark,
                })
            except Exception:
                continue
        return result

    def _parse_art_list(self, text, page_url):
        """解析 /a/ 图集列表（<a class="art-card" href="/ak/{id}.html">）"""
        result = []
        for m in re.finditer(r'<a class="art-card"[^>]*href="([^"]+)"[^>]*title="([^"]*)"[^>]*>(.*?)</a>', text, re.S):
            try:
                href = m.group(1).strip()
                name = html.unescape(m.group(2).strip())
                inner = m.group(3)
                m_id = re.search(r'/ak/(\d+)\.html', href)
                if not m_id:
                    continue
                pic = ""
                m_img = re.search(r'<img[^>]+(?:data-src|src)="([^"]+)"', inner)
                if m_img:
                    pic = m_img.group(1).strip()
                    if pic and not pic.startswith("http"):
                        pic = urljoin(page_url, pic)
                remark = ""
                m_blurb = re.search(r'<div class="art-card-blurb">(.*?)</div>', inner, re.S)
                if m_blurb:
                    remark = re.sub(r'<[^>]+>', '', m_blurb.group(1)).strip()
                result.append({
                    "vod_id": "ak_" + m_id.group(1),
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": remark,
                })
            except Exception:
                continue
        return result
    @staticmethod
    def _url_to_id(href):
        """从 /s/12345.html 提取 12345"""
        m = re.search(r'/s/(\d+)\.html', href)
        if m:
            return m.group(1)
        m = re.search(r'/(\d+)\.html', href)
        return m.group(1) if m else ""

    def _parse_tid(self, tid):
        """type_id 形如 t_1 / a_42，返回 (前缀, 数字id)"""
        s = str(tid or "")
        if "_" in s:
            p, _, n = s.partition("_")
            return p, n
        return "t", s

    # ---------------- 首页 ----------------
    def homeContent(self, filter):
        return {"class": self.classes, "filters": self.filters if filter else {}}

    def getHomeContent(self, filter):
        return self.homeContent(filter)

    def homeVideoContent(self):
        text = self._fetch_text(self.host + "/")
        lst = self._parse_list(text, self.host + "/")
        return {"list": lst}

    # ---------------- 分类 ----------------
    def categoryContent(self, tid, pg, filter, extend):
        page = str(pg or "1")
        prefix, num = self._parse_tid(tid)
        if page == "1":
            url = "%s/%s/%s.html" % (self.host, prefix, num)
        else:
            url = "%s/%s/%s-%s.html" % (self.host, prefix, num, page)
        text = self._fetch_text(url)
        lst = self._parse_list(text, url)
        # 总页数：只认分页容器内的 "当前页/总页数"（形如 1/37798）
        pagecount = 9999
        pager = re.search(r'<[^>]+class="[^"]*(?:page|pager|fenye)[^"]*"[^>]*>(.*?)</[a-z]+>', text, re.S | re.I)
        scope = pager.group(1) if pager else text
        m = re.search(r'<span[^>]*class="[^"]*current[^"]*"[^>]*>\s*(\d+)\s*</span>\s*/\s*(\d+)', scope)
        if not m:
            m = re.search(r'\b(\d+)\s*/\s*(\d{2,})\b', scope)
        if m:
            try:
                pc = int(m.group(2))
                if 1 <= pc <= 200000:
                    pagecount = pc
            except Exception:
                pass
        return {
            "list": lst,
            "page": int(page),
            "pagecount": pagecount,
            "limit": len(lst) or 20,
            "total": pagecount * (len(lst) or 20),
        }
    @staticmethod
    def _norm_ids(ids):
        if ids is None:
            return ""
        if isinstance(ids, (list, tuple)):
            if not ids:
                return ""
            ids = ids[0]
        if isinstance(ids, bytes):
            ids = ids.decode("utf-8", errors="ignore")
        return str(ids).strip()

    def _skeleton(self, vid, title="", pic="", remarks=""):
        pid = str(vid).split("|$|")[0].replace("$", "|")
        return {"list": [{
            "vod_id": vid,
            "vod_name": title or "视频",
            "vod_pic": pic or "",
            "vod_remarks": remarks or "",
            "vod_content": remarks or "",
            "vod_play_from": "播放",
            "vod_play_url": "播放$" + pid,
        }]}

    def detailContent(self, ids):
        raw = self._norm_ids(ids)
        if not raw:
            return {"list": []}
        try:
            vod_id = raw.split("|$|")[0]
            # 图集分支（pics://，法则34）
            if vod_id.startswith("ak_"):
                return self._detail_art(vod_id[3:])
            url = "%s/s/%s.html" % (self.host, vod_id)
            text = self._fetch_text(url, referer=self.host + "/")
            if not text or len(text) < 500:
                return self._skeleton(vod_id, "视频")
            name = ""
            for pat in (r'<h1[^>]*>(.*?)</h1>',
                        r'<meta property="og:title" content="([^"]+)"',
                        r'<title>(.*?)</title>'):
                m = re.search(pat, text, re.S)
                if m:
                    name = re.sub(r'<[^>]+>', '', m.group(1)).strip()
                    name = html.unescape(name)
                    if name:
                        break
            if name:
                name = re.sub(r'[_\-|]\s*星空中文影院.*$', '', name).strip()
            pic = ""
            for pat in (r'<meta property="og:image" content="([^"]+)"',
                        r'<div class="poster"><img src="([^"]+)"'):
                m = re.search(pat, text)
                if m:
                    pic = m.group(1).strip()
                    break
            if pic and not pic.startswith("http"):
                pic = urljoin(url, pic)
            remark = ""
            m = re.search(r'<p class="meta">类型：(.*?)</p>', text, re.S)
            if m:
                remark = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            play_names = []
            play_urls = []
            for m in re.finditer(r'<a class="line-play"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', text, re.S):
                href = m.group(1).strip()
                lname = re.sub(r'<[^>]+>', '', m.group(2)).strip()
                play_names.append(lname or "播放")
                play_urls.append("%s$%s" % (lname or "播放", urljoin(url, href)))
            if not play_names:
                return self._skeleton(vod_id, name, pic, remark)
            vod = {
                "vod_id": raw,
                "vod_name": name or "视频",
                "vod_pic": pic,
                "vod_remarks": remark,
                "vod_content": remark,
                "vod_play_from": "$$$".join(play_names),
                "vod_play_url": "$$$".join(play_urls),
            }
            return {"list": [vod]}
        except Exception as e:
            self.log({"detail": "exception", "ids": raw, "error": type(e).__name__})
            return self._skeleton(raw)

    def _detail_art(self, art_id):
        """图文详情：图集走 pics://，小说走 novel://（法则34）。
        小说正文不在 detailContent 内联（避免 $/#/换行污染 vod_play_url），
        只给短 ID，由 playerContent 现取现组装。"""
        url = "%s/ak/%s.html" % (self.host, art_id)
        text = self._fetch_text(url, referer=self.host + "/")
        if not text or len(text) < 500:
            return self._skeleton("ak_" + art_id, "内容")
        name = ""
        m = re.search(r'<h1[^>]*>(.*?)</h1>', text, re.S)
        if m:
            name = html.unescape(re.sub(r'<[^>]+>', '', m.group(1)).strip())
        remark = ""
        m = re.search(r'<p class="art-page-meta">(.*?)</p>', text, re.S)
        if m:
            remark = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        body = ""
        m = re.search(r'<div class="article-content[^"]*">(.*?)</div>', text, re.S)
        if m:
            body = m.group(1)
        if not body:
            return self._skeleton("ak_" + art_id, name, "", remark)

        imgs = []
        seen = set()
        for m in re.finditer(r'<img[^>]+src="([^"]+)"', body):
            src = m.group(1).strip()
            if not src or src in seen:
                continue
            low = src.lower()
            if any(k in low for k in ("logo", "icon", "avatar", "loading", "banner")):
                continue
            if not src.startswith("http"):
                src = urljoin(url, src)
            seen.add(src)
            imgs.append(src)

        txt = re.sub(r'<br\s*/?>', '\n', body)
        txt = re.sub(r'</p>', '\n', txt)
        txt = re.sub(r'<[^>]+>', '', txt)
        txt = html.unescape(txt)
        txt = txt.replace('\u00a0', ' ').replace('\u3000', ' ')
        txt = re.sub(r'\n{3,}', '\n\n', txt).strip()

        # 图集：正文全是图片 → pics://
        if imgs and len(txt) < 200:
            payload = "&&".join([u + "@Referer=" + self.host + "/" for u in imgs])
            vod = {
                "vod_id": "ak_" + art_id,
                "vod_name": name or "图集",
                "vod_pic": imgs[0],
                "vod_remarks": remark,
                "vod_content": remark,
                "vod_play_from": "图集",
                "vod_play_url": "图集$pics://" + payload,
            }
            return {"list": [vod]}

        # 小说：只给短 ID，正文交给 playerContent 现取（避免污染 vod_play_url）
        if txt:
            vod = {
                "vod_id": "ak_" + art_id,
                "vod_name": name or "小说",
                "vod_pic": imgs[0] if imgs else "",
                "vod_remarks": remark,
                "vod_content": remark or txt[:100],
                "vod_play_from": "小说",
                "vod_play_url": "正文$nv_%s" % art_id,
            }
            return {"list": [vod]}

        return self._skeleton("ak_" + art_id, name, imgs[0] if imgs else "", remark)
    def searchContent(self, key, quick, pg="1"):
        page = str(pg or "1")
        url = "%s/sou/-%s.html?wd=%s" % (self.host, page, quote(str(key or ""), safe=""))
        text = self._fetch_text(url, referer=self.host + "/")
        lst = self._parse_list(text, url)
        return {"list": lst, "page": int(page)}

    # ================= 播放地址提取管线（法则32） =================
    def _is_media_url(self, url):
        if not url or not str(url).startswith("http"):
            return False
        path = str(url).split("?")[0].split("#")[0].lower()
        if path.endswith(self.MEDIA_EXT):
            return True
        low = str(url).lower()
        return ("/hls/" in low and "m3u8" in low) or "playlist.m3u8" in low

    def _grab_json_object(self, text, start_idx):
        """平衡括号截取完整 JSON 文本"""
        if start_idx < 0 or start_idx >= len(text) or text[start_idx] != "{":
            return ""
        depth = 0
        in_str = False
        esc = False
        quote_ch = ""
        for i in range(start_idx, len(text)):
            ch = text[i]
            if in_str:
                if esc:
                    esc = False
                elif ch == "\\":
                    esc = True
                elif ch == quote_ch:
                    in_str = False
                continue
            if ch in ('"', "'"):
                in_str = True
                quote_ch = ch
                continue
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return text[start_idx:i + 1]
        return ""

    def _loose_json(self, raw):
        if not raw:
            return None
        candidates = [raw]
        candidates.append(raw.replace("\\/", "/"))
        if '"' not in raw and "'" in raw:
            candidates.append(raw.replace("'", '"'))
        fixed = re.sub(r",\s*([}\]])", r"\1", raw)
        fixed = re.sub(r'([{,]\s*)([A-Za-z_]\w*)(\s*:)', r'\1"\2"\3', fixed)
        candidates.append(fixed)
        for c in candidates:
            try:
                obj = json.loads(c)
                if isinstance(obj, (dict, list)):
                    return obj
            except Exception:
                continue
        return None

    def _normalize_url(self, raw):
        if not raw:
            return ""
        s = str(raw).strip().strip('"').strip("'")
        s = s.replace("\\/", "/").replace("\\u002f", "/").replace("\\u002F", "/")
        s = s.replace('" + "', "").replace("' + '", "")
        try:
            s = html.unescape(s)
        except Exception:
            pass
        for _ in range(2):
            if "%3A%2F%2F" in s or "%3a%2f%2f" in s:
                try:
                    s = urllib.parse.unquote(s)
                except Exception:
                    break
            else:
                break
        if re.fullmatch(r"[A-Za-z0-9+/=_-]{16,}", s or ""):
            try:
                pad = s.replace("-", "+").replace("_", "/")
                pad += "=" * (-len(pad) % 4)
                dec = base64.b64decode(pad).decode("utf-8", "ignore")
                if dec.startswith("http"):
                    s = dec
            except Exception:
                pass
        return s.strip()

    def _walk_json(self, node, bag, depth=0):
        if depth > 6 or node is None:
            return
        if isinstance(node, dict):
            for k, v in node.items():
                if isinstance(v, str):
                    if str(k).lower() in self.URL_KEYS or self._is_media_url(self._normalize_url(v)):
                        bag.append(v)
                else:
                    self._walk_json(v, bag, depth + 1)
        elif isinstance(node, list):
            for v in node:
                if isinstance(v, str):
                    if self._is_media_url(self._normalize_url(v)):
                        bag.append(v)
                else:
                    self._walk_json(v, bag, depth + 1)

    def _extract_play_candidates(self, text, page_url):
        bag = []
        if not text:
            return bag
        # L2 播放器变量
        for var in self.PLAYER_VARS:
            for m in re.finditer(re.escape(var) + r'\s*=\s*', text):
                brace = text.find("{", m.end())
                if brace < 0 or brace - m.end() > 8:
                    continue
                raw = self._grab_json_object(text, brace)
                obj = self._loose_json(raw)
                if obj is not None:
                    self._walk_json(obj, bag)  # L3 递归
                elif raw:
                    for p in self.FALLBACK_PATTERNS:
                        bag.extend(re.findall(p, raw))
        # L3 内联 JSON
        for m in re.finditer(r'<script[^>]*type=["\']application/json["\'][^>]*>(.*?)</script>', text, re.S):
            obj = self._loose_json(m.group(1).strip())
            if obj is not None:
                self._walk_json(obj, bag)
        # L5 全文正则
        for p in self.FALLBACK_PATTERNS:
            for hit in re.findall(p, text):
                bag.append(hit if isinstance(hit, str) else hit[0])
        return bag

    def _pick_playable(self, bag):
        seen, cands = set(), []
        for raw in bag:
            u = self._normalize_url(raw)
            if not u or u in seen or not u.startswith("http"):
                continue
            seen.add(u)
            cands.append(u)

        def score(u):
            s = 0
            low = u.lower()
            if ".m3u8" in low:
                s += 10
            elif ".mp4" in low:
                s += 8
            if any(k in low for k in ("auth_key", "token", "sign", "expire")):
                s += 2
            if "/ad" in low or "advert" in low:
                s -= 5
            return -s

        cands.sort(key=score)
        return cands

    def playerContent(self, flag, id, vipFlags):
        ua = self.ua
        raw_id = str(id or "").strip()
        # 剥离 "名称$地址"
        if "$" in raw_id:
            raw_id = raw_id.split("$", 1)[1].strip()
        if not raw_id:
            return {"parse": 0, "url": "", "header": {}}

        # 非视频协议直通（法则8）
        if raw_id.startswith("pics://"):
            return {"parse": 0, "url": raw_id,
                    "header": {"User-Agent": ua, "Referer": self.host + "/"}}
        if raw_id.startswith("novel://"):
            return {"parse": 0, "url": raw_id,
                    "header": {"User-Agent": ua, "Referer": self.host + "/"}}

        # 小说短 ID：nv_{art_id} → 现取正文组装 novel://
        if raw_id.startswith("nv_"):
            return self._novel_payload(raw_id[3:])

        # L1 直链
        if self._is_media_url(raw_id):
            return self._wrap_play(raw_id, ua)

        # 播放页 URL
        if raw_id.startswith("http"):
            page_url = raw_id
        else:
            page_url = urljoin(self.host + "/", raw_id)
        text = self._fetch_text(page_url, referer=self.host + "/")

        # L2-L5
        bag = self._extract_play_candidates(text, page_url)
        cands = self._pick_playable(bag)
        if cands:
            self.log({"stage": "extract", "result": "hit", "count": len(cands)})
            return self._wrap_play(cands[0], ua, referer=page_url)

        self.log({"stage": "extract", "result": "all_layers_miss", "page": page_url})
        return {"parse": 1, "url": page_url,
                "header": {"User-Agent": ua, "Referer": self.host + "/"}}

    def _novel_payload(self, art_id):
        """按 art_id 现取小说正文，组装 novel:// 明文 JSON（法则34）"""
        ua = self.ua
        try:
            url = "%s/ak/%s.html" % (self.host, art_id)
            text = self._fetch_text(url, referer=self.host + "/")
            if not text:
                return {"parse": 0, "url": "", "header": {}, "msg": "抓取失败"}
            name = ""
            m = re.search(r'<h1[^>]*>(.*?)</h1>', text, re.S)
            if m:
                name = html.unescape(re.sub(r'<[^>]+>', '', m.group(1)).strip())
            body = ""
            m = re.search(r'<div class="article-content[^"]*">(.*?)</div>', text, re.S)
            if m:
                body = m.group(1)
            txt = re.sub(r'<br\s*/?>', '\n', body)
            txt = re.sub(r'</p>', '\n', txt)
            txt = re.sub(r'<[^>]+>', '', txt)
            txt = html.unescape(txt)
            txt = txt.replace('\u00a0', ' ').replace('\u3000', ' ')
            txt = re.sub(r'\n{3,}', '\n\n', txt).strip()
            if not txt:
                return {"parse": 0, "url": "", "header": {}, "msg": "正文为空"}
            chapter = {"title": name or "正文", "content": txt}
            return {"parse": 0,
                    "url": "novel://" + json.dumps(chapter, ensure_ascii=False),
                    "header": {"User-Agent": ua, "Referer": self.host + "/"}}
        except Exception as e:
            self.log({"novel": "exception", "art_id": art_id, "error": type(e).__name__})
            return {"parse": 0, "url": "", "header": {}}
    def _wrap_play(self, url, ua, referer=""):
        header = {"User-Agent": ua}
        if referer:
            header["Referer"] = referer
        if self.NEED_CLEAN and ".m3u8" in url.lower():
            return {"parse": 0, "url": self._m3u8_proxy_url(url), "header": header}
        return {"parse": 0, "url": url, "header": header}

    # ================= m3u8 广告过滤（五层管线） =================
    
    def _m3u8_proxy_url(self, url):
        if url:
            url = url.replace("\\/", "/")
        url = str(url or "")
        # 已经是代理地址就先剥一层
        if "url=" in url and not url.startswith("http"):
            url = urllib.parse.unquote(url.lstrip("?&").split("url=", 1)[1])
        return "http://127.0.0.1:9978/m3u8.m3u8?url=" + quote(url, safe="")
    

    def localProxy(self, param):
        try:
            # 取出 url
            if isinstance(param, dict):
                target = param.get("url", "") or param.get("source", "")
            else:
                target = str(param or "")
    
            # 剥壳：从任意形式里取出真实 url
            target = urllib.parse.unquote(target)
            if "url=" in target and not target.startswith("http"):
                target = urllib.parse.parse_qs(target.lstrip("?&")).get("url", [""])[0]
                target = urllib.parse.unquote(target)
    
            if not target or not re.match(r"^https?://", target, re.I):
                return [400, "text/plain", b"invalid url"]
    
            resp = self.fetch(target, headers=self.headers, timeout=20)
            if not resp or getattr(resp, "status_code", 0) != 200:
                return [502, "text/plain", b"fetch failed"]
            content = getattr(resp, "content", b"") or b""
            if not content and getattr(resp, "text", ""):
                content = resp.text.encode("utf-8", errors="ignore")
            if not content:
                return [502, "text/plain", b"empty content"]
    
            if b"#EXTM3U" in content[:256]:
                cleaned = self._clean_m3u8(content.decode("utf-8", errors="ignore"), target)
                return [200, "application/vnd.apple.mpegurl", cleaned.encode("utf-8")]
            return [200, "application/octet-stream", content]
        except Exception as e:
            return [500, "text/plain", ("localProxy error: %s" % type(e).__name__).encode("utf-8")]

    def _clean_m3u8(self, text, source_url):
        lines = [l.strip() for l in str(text or "").replace("\r", "").split("\n") if l.strip()]
        if not lines:
            return "#EXTM3U\n"

        # 第1层：图片流检测（只打标记）
        is_img = self._is_fake_image_stream(text, source_url)

        # 第2层：多码率主表
        if any(l.startswith("#EXT-X-STREAM-INF") for l in lines):
            return self._clean_m3u8_multi(lines, source_url)

        # 第3层：正片目录锚点
        main_dir = self._resolve_main_dir(lines, source_url, is_image_stream=is_img)

        # 第4层：分片过滤
        segments, removed, kept = self._filter_segments(lines, source_url, main_dir)

        # 第5层：全滤兜底（误杀过半即回退）
        if removed > 0 and (kept == 0 or removed > kept):
            self.log({"stage": "clean", "fallback": "no_filter",
                      "removed": removed, "kept": kept, "anchor": main_dir})
            out = [self._rewrite_m3u8_tag(l, source_url) for l in lines]
            return "\n".join(out) + "\n"

        if removed:
            self.log({"stage": "clean", "removed": removed, "kept": kept, "anchor": main_dir})

        out = self._dedup_tags(segments, source_url)
        return "\n".join(out) + "\n"

    def _is_fake_image_stream(self, text, source_url):
        IMAGE_EXT = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp")
        VIDEO_EXT = (".ts", ".m4s", ".mp4", ".aac", ".m4a")
        has_video = False
        has_image = False
        for line in str(text or "").split("\n"):
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            path = line.split("?")[0].split("#")[0].lower()
            if path.endswith(VIDEO_EXT):
                has_video = True
            elif path.endswith(IMAGE_EXT):
                has_image = True
        return has_image and not has_video

    def _clean_m3u8_multi(self, lines, source_url):
        out = []
        for line in lines:
            if line.startswith("#"):
                out.append(line)
                continue
            child = urljoin(source_url, line)
            if ".m3u8" in child.lower():
                out.append(self._m3u8_proxy_url(child))
            else:
                out.append(child)
        return "\n".join(out) + "\n"

    def _resolve_main_dir(self, lines, source_url, is_image_stream=False):
        import posixpath
        base_dir = posixpath.dirname(urlparse(source_url).path)
        if not base_dir.endswith("/"):
            base_dir += "/"

        if is_image_stream:
            counter = {}
            for line in lines:
                if not line or line.startswith("#"):
                    continue
                p = urlparse(urljoin(source_url, line)).path
                d = posixpath.dirname(p)
                if d and d != "/":
                    counter[d + "/"] = counter.get(d + "/", 0) + 1
            if counter:
                return max(counter.items(), key=lambda kv: kv[1])[0]
            return base_dir

        for line in lines:
            if not line.startswith("#EXT-X-KEY") or "URI=" not in line:
                continue
            m = re.search(r'URI="([^"]+)"', line)
            if not m:
                continue
            key_uri = m.group(1)
            key_path = urlparse(
                key_uri if key_uri.startswith("http") else urljoin(source_url, key_uri)
            ).path
            key_dir = posixpath.dirname(key_path)
            if key_dir and key_dir != "/":
                return key_dir + "/"
        return base_dir

    def _filter_segments(self, lines, source_url, main_dir):
        segments = []
        pending = []
        removed = 0
        kept = 0
        for line in lines:
            if line.startswith("#EXTINF"):
                pending = [line]
                continue
            if pending and line.startswith("#"):
                pending.append(line)
                continue
            if pending:
                media_url = urljoin(source_url, line)
                media_path = urlparse(media_url).path
                if media_path.startswith(main_dir):
                    segments.extend(pending)
                    segments.append(media_url)
                    kept += 1
                else:
                    removed += 1
                pending = []
                continue
            if line.startswith("#"):
                segments.append(line)
            else:
                segments.append(urljoin(source_url, line))
        return segments, removed, kept

    def _dedup_tags(self, segments, source_url):
        NOISE = ("#EXT-X-DISCONTINUITY", "#EXT-X-KEY:METHOD=NONE")
        out = []
        for line in segments:
            line = self._rewrite_m3u8_tag(line, source_url)
            if line in NOISE:
                if not out or out[-1] in NOISE:
                    continue
            out.append(line)
        while len(out) > 1 and out[-1] in NOISE:
            out.pop()
        return out

    def _rewrite_m3u8_tag(self, line, source_url):
        if line.startswith("#EXT-X-KEY") or line.startswith("#EXT-X-MAP"):
            def repl(match):
                uri = match.group(1)
                if uri.startswith(("http://", "https://")):
                    return 'URI="' + uri + '"'
                return 'URI="' + urljoin(source_url, uri) + '"'
            return re.sub(r'URI="([^"]+)"', repl, line)
        if line and not line.startswith("#"):
            if line.startswith(("http://", "https://")):
                return line
            return urljoin(source_url, line)
        return line

    # ---------------- 推荐 ----------------
    def recommendContent(self, ids, pg):
        try:
            raw = self._norm_ids(ids)
            vod_id = raw.split("|$|")[0] if raw else ""
            if not vod_id:
                return {"list": []}
            url = "%s/s/%s.html" % (self.host, vod_id)
            text = self._fetch_text(url, referer=self.host + "/")
            lst = self._parse_list(text, url)
            # 去掉自身
            lst = [x for x in lst if str(x.get("vod_id")) != str(vod_id)]
            return {"list": lst[:12]}
        except Exception:
            return {"list": []}