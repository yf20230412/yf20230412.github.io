import re, json, base64
try:
    import requests as _requests
except Exception:
    _requests = None


class Spider:
    def __init__(self):
        self.site = "https://www.kugou.com"
        self.name = "QQ音乐"
        self.header = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; SM-S9080) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "Referer": self.site,
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }
        self.s = self.session = self.sess = _requests.Session() if _requests else None
        self.ua = "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        self.search_api = "https://songsearch.kugou.com/song_search_v2"
        self.rank_api = "http://mobilecdn.kugou.com/api/v3/rank/song"
        self.resolve_apis = [
            "https://musicserver.haitangw.cc/v1/music/resolve-url",
            "https://musicapi.haitangw.net/v1/music/resolve-url",
        ]
        self.getdata_api = "https://wwwapi.kugou.com/yy/index.php"
        self.cats = [
            {"type_id": "chart:8888", "type_name": "TOP500"},
            {"type_id": "chart:6666", "type_name": "飙升榜"},
            {"type_id": "chart:74534", "type_name": "新歌榜"},
            {"type_id": "chart:82831", "type_name": "网络热歌榜"},
            {"type_id": "kw:流行歌曲", "type_name": "流行"},
            {"type_id": "kw:摇滚", "type_name": "摇滚"},
            {"type_id": "kw:纯音乐", "type_name": "纯音乐"},
            {"type_id": "kw:粤语歌曲", "type_name": "粤语"},
            {"type_id": "kw:电音", "type_name": "电音"},
            {"type_id": "kw:古典音乐", "type_name": "古典"},
            {"type_id": "kw:儿歌大全", "type_name": "儿歌"},
            {"type_id": "kw:影视原声", "type_name": "影视原声"},
            {"type_id": "kw:民谣", "type_name": "民谣"},
            {"type_id": "kw:DJ舞曲", "type_name": "DJ舞曲"},
            {"type_id": "kw:古风歌曲", "type_name": "古风"},
        ]

    def getDependence(self):
        return []

    def manualVideoCheck(self):
        return False

    def isVideoFormat(self, url):
        if not url:
            return False
        u = str(url).lower()
        return u.endswith((".m3u8", ".mp4", ".flv", ".mkv", ".ts", ".avi")) or "m3u8" in u

    def destroy(self):
        pass

    def action(self, action):
        return {}

    def init(self, extend=""):
        pass

    def _get(self, url, referer=None):
        h = dict(self.header)
        h["User-Agent"] = self.ua
        if referer:
            h["Referer"] = referer
        if self.s is not None:
            try:
                r = self.s.get(url, headers=h, timeout=12, allow_redirects=True)
                if r.status_code < 400:
                    return r.text
            except Exception:
                pass
        try:
            import urllib.request
            req = urllib.request.Request(url, headers=h)
            with urllib.request.urlopen(req, timeout=12) as resp:
                return resp.read().decode("utf-8", "ignore")
        except Exception:
            return ""

    def _post(self, url, data):
        body = json.dumps(data).encode("utf-8")
        h = dict(self.header)
        h["User-Agent"] = self.ua
        h["Content-Type"] = "application/json"
        if self.s is not None:
            try:
                r = self.s.post(url, data=body, headers=h, timeout=12)
                if r.status_code < 500:
                    return r.text
            except Exception:
                pass
        try:
            import urllib.request
            req = urllib.request.Request(url, data=body, headers=h)
            with urllib.request.urlopen(req, timeout=12) as resp:
                return resp.read().decode("utf-8", "ignore")
        except Exception:
            return ""

    def _u(self, u):
        if not u:
            return u
        u = u.strip()
        if u.startswith("//"):
            return "https:" + u
        if u.startswith("http"):
            return u
        if u.startswith("/"):
            m = re.match(r"(https?://[^/]+)", self.site)
            return (m.group(1) if m else self.site) + u
        return self.site.rstrip("/") + "/" + u.lstrip("/")

    def _b64e(self, s):
        return base64.urlsafe_b64encode(str(s or "").encode("utf-8")).decode("ascii").rstrip("=")

    def _b64d(self, s):
        try:
            s = str(s or "")
            return base64.urlsafe_b64decode(s + "=" * (-len(s) % 4)).decode("utf-8", "ignore")
        except Exception:
            return ""

    def _fmt_dur(self, sec):
        try:
            sec = int(sec)
        except Exception:
            sec = 0
        return "%d:%02d" % (sec // 60, sec % 60)

    def _clean(self, t):
        return _html_unescape(re.sub(r"</?em>", "", str(t or ""))).strip()

    def _split_name(self, fn):
        fn = self._clean(fn)
        if " - " in fn:
            parts = fn.split(" - ")
            return parts[0].strip(), " - ".join(parts[1:]).strip() or fn
        return "", fn

    def _mk_qsong(self, it):
        fh = it.get("FileHash") or ""
        if not fh:
            return None
        album_id = str(it.get("AlbumID") or "")
        singer, title = self._split_name(it.get("FileName"))
        pic = str(it.get("Image") or "").replace("{size}", "400")
        dur = it.get("Duration") or 0
        vid = "qsong:%s:%s:%s:%s:%s:%s" % (fh, album_id, self._b64e(title), self._b64e(singer), self._b64e(pic), dur)
        return {"vod_id": vid, "vod_name": title or "未知歌曲", "vod_pic": pic,
                "vod_remarks": ("%s %s" % (singer, self._fmt_dur(dur))).strip()}

    def _mk_csong(self, it):
        h = it.get("hash") or ""
        if not h:
            return None
        singer, title = self._split_name(it.get("filename"))
        pic = str(it.get("album_sizable_cover") or "").replace("{size}", "400")
        dur = it.get("duration") or 0
        vid = "csong:%s:%s:%s:%s:%s" % (h, self._b64e(title), self._b64e(singer), self._b64e(pic), dur)
        return {"vod_id": vid, "vod_name": title or it.get("songname") or "未知歌曲", "vod_pic": pic,
                "vod_remarks": ("%s %s" % (singer, self._fmt_dur(dur))).strip()}

    def _get_json(self, url, tries=5):
        import time
        txt = ""
        for i in range(tries):
            txt = self._get(url)
            try:
                d = json.loads(txt)
                data = d.get("data") or {}
                if data.get("lists") or data.get("info") or int(data.get("total") or 0) == 0:
                    break
            except Exception:
                pass
            if i < tries - 1:
                try:
                    time.sleep(1)
                except Exception:
                    pass
        try:
            return json.loads(txt)
        except Exception:
            return {}

    def _search_songs(self, kw, pg, pagesize=30):
        try:
            from urllib.parse import urlencode
            url = self.search_api + "?" + urlencode({"keyword": kw, "page": pg, "pagesize": pagesize,
                "userid": 0, "platform": "WebFilter", "tag": "em", "filter": 2,
                "iscorrection": 1, "privilege_filter": 0})
        except Exception:
            return [], 0
        out, total = [], 0
        try:
            data = (self._get_json(url).get("data") or {})
            total = int(data.get("total") or 0)
            for it in data.get("lists") or []:
                v = self._mk_qsong(it)
                if v:
                    out.append(v)
        except Exception:
            pass
        return out, total

    def _chart_songs(self, rankid, pg, pagesize=30):
        try:
            from urllib.parse import urlencode
            url = self.rank_api + "?" + urlencode({"rankid": rankid, "plat": 0, "page": pg,
                                                  "pagesize": pagesize, "version": 9108})
        except Exception:
            return [], 0
        txt = self._get(url)
        out, total = [], 0
        try:
            d = json.loads(txt)
            data = d.get("data") or {}
            total = int(data.get("total") or 0)
            for it in data.get("info") or []:
                v = self._mk_csong(it)
                if v:
                    out.append(v)
        except Exception:
            pass
        return out, total

    def _parse_vid(self, vid):
        parts = str(vid).split(":")
        kind = parts[0] if parts else ""
        rid = parts[1] if len(parts) > 1 else ""
        album_id = parts[2] if kind == "qsong" and len(parts) > 2 else ""
        idx = 3 if kind == "qsong" else 2
        title = self._b64d(parts[idx]) if len(parts) > idx else ""
        singer = self._b64d(parts[idx + 1]) if len(parts) > idx + 1 else ""
        pic = self._b64d(parts[idx + 2]) if len(parts) > idx + 2 else ""
        dur = parts[idx + 3] if len(parts) > idx + 3 else ""
        return kind, rid, album_id, title, singer, pic, dur

    def homeContent(self, filter=None):
        songs, _ = self._chart_songs("8888", 1)
        return {"class": self.cats, "list": songs}

    def homeVideoContent(self):
        songs, _ = self._chart_songs("8888", 1)
        return {"list": songs}

    def categoryContent(self, tid, pg=1, filter=None, extend=None):
        try:
            pg = int(pg)
        except Exception:
            pg = 1
        if pg < 1:
            pg = 1
        t = str(tid or "")
        songs, total = [], 0
        if t.startswith("chart:"):
            songs, total = self._chart_songs(t.split(":", 1)[1], pg)
        elif t.startswith("kw:"):
            songs, total = self._search_songs(t.split(":", 1)[1], pg)
        else:
            return {"list": [], "page": pg, "pagecount": 1, "limit": 30, "total": 0}
        pagecount = max(1, (total + 29) // 30) if total else 1
        return {"list": songs, "page": pg, "pagecount": pagecount, "limit": 30, "total": total}

    def detailContent(self, ids):
        vid = ids[0] if isinstance(ids, (list, tuple)) and ids else str(ids or "")
        vid = str(vid).strip()
        kind, rid, album_id, title, singer, pic, dur = self._parse_vid(vid)
        if not rid:
            return {"list": []}
        name = (title or "未知歌曲").replace("$", "").replace("#", "")
        desc = ("歌手：%s\n时长：%s" % (singer, self._fmt_dur(dur))).strip()
        eps = "$$$".join(["%s$play:%s:%s" % (name, lv, vid) for lv in ("exhigh", "lossless", "standard")])
        return {"list": [{"vod_id": vid, "vod_name": name, "vod_pic": pic,
                          "vod_content": desc, "vod_play_from": "高清$$$无损$$$流畅",
                          "vod_play_url": eps}]}

    def searchContent(self, key, quick=False, pg="1"):
        try:
            pg = int(pg)
        except Exception:
            pg = 1
        if not key:
            return {"list": []}
        songs, _ = self._search_songs(str(key), pg)
        return {"list": songs}

    def _resolve_url(self, rid, album_id, level="exhigh"):
        payload = {"source": "kg", "rid": str(rid), "level": level or "exhigh"}
        for api in self.resolve_apis:
            try:
                d = json.loads(self._post(api, payload) or "")
                if d.get("code") in (0, 200) or d.get("message") == "ok":
                    url = ((d.get("data") or {}).get("url") or d.get("url") or "").strip()
                    if url:
                        return url
            except Exception:
                pass
        try:
            from urllib.parse import urlencode
            url = self.getdata_api + "?" + urlencode({"r": "play/getdata", "hash": rid, "album_id": album_id or ""})
            d = json.loads(self._get(url) or "")
            url = ((d.get("data") or {}).get("play_url") or "").strip()
            if url:
                return url
        except Exception:
            pass
        return ""

    def playerContent(self, flag, ids, vipFlags=None):
        vid = ids[0] if isinstance(ids, (list, tuple)) and ids else str(ids or "")
        vid = str(vid).strip()
        if vid.startswith("play:"):
            vid = vid[5:]
        level = "exhigh"
        head, _, rest = vid.partition(":")
        if head in ("standard", "exhigh", "lossless"):
            level, vid = head, rest
        kind, rid, album_id, title, singer, pic, dur = self._parse_vid(vid)
        url = self._resolve_url(rid, album_id, level) if rid else ""
        return {"parse": 0, "url": url, "header": dict(self.header)}

    def localProxy(self, param):
        u = param.get("url", "") if isinstance(param, dict) else ""
        if not u:
            return [403, "text/plain", b"", None]
        h = dict(self.header)
        if self.s is not None:
            try:
                r = self.s.get(u, headers=h, timeout=15)
                return [200, r.headers.get("Content-Type", "application/octet-stream"), r.content, None]
            except Exception:
                pass
        try:
            import urllib.request
            req = urllib.request.Request(u, headers=h)
            with urllib.request.urlopen(req, timeout=15) as resp:
                return [200, resp.headers.get("Content-Type", "application/octet-stream"), resp.read(), None]
        except Exception:
            return [403, "text/plain", b"", None]


def _html_unescape(s):
    import html as _h
    return _h.unescape(s) if s else s
