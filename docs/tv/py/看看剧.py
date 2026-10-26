import re, json, time, uuid, hashlib, hmac
try:
    import requests as _requests
except Exception:
    _requests = None


class Spider:
    def __init__(self):
        self.site = "https://www.kkju.app"
        self.api = self.site + "/api/app"
        self.name = "看看剧"
        self.header = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; SM-S9080) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "Referer": self.site,
            "Accept": "application/json, text/plain, */*",
        }
        self.s = self.session = self.sess = _requests.Session() if _requests else None
        self._extend = {}
        self._device = "web-" + str(uuid.uuid4())
        self._salt = "cms_device_salt_v1_2024cms_app_sign_key_v1_2024_secure"
        self._cats = None
        self._filter_map = {}
        self._home_items = None

    def getName(self):
        return self.name

    def getDependence(self):
        return []

    def manualVideoCheck(self):
        return False

    def isVideoFormat(self, url):
        if not url:
            return False
        u = str(url).lower()
        return u.endswith((".m3u8", ".mp4", ".flv", ".mkv", ".ts", ".avi", ".mp3", ".m4a", ".wav", ".flac")) or "m3u8" in u

    def destroy(self):
        pass

    def action(self, action):
        return {}

    def init(self, extend=""):
        self._extend = {}
        if isinstance(extend, dict):
            self._extend = extend
        elif isinstance(extend, str) and extend.strip():
            try:
                e = json.loads(extend)
                if isinstance(e, dict):
                    self._extend = e
            except Exception:
                pass

    def _sign_headers(self, method, path, params, body_raw=None):
        q = "&".join("%s=%s" % (k, params[k]) for k in sorted(params.keys())) if params else ""
        ts = str(int(time.time()))
        nonce = str(uuid.uuid4())
        dkey = hmac.new(self._salt.encode("utf-8"), self._device.encode("utf-8"), hashlib.sha256).hexdigest()
        parts = [method, path, q, ts, nonce, "web"]
        bh = ""
        if body_raw is not None:
            bh = hashlib.sha256(body_raw.encode("utf-8")).hexdigest()
            parts.append(bh)
        canon = "\n".join(parts)
        sig = hmac.new(dkey.encode("utf-8"), canon.encode("utf-8"), hashlib.sha256).hexdigest()
        h = dict(self.header)
        h["X-Device-ID"] = self._device
        h["X-Platform"] = "web"
        h["X-App-Version"] = "web"
        h["X-Timestamp"] = ts
        h["X-Nonce"] = nonce
        h["X-Signature"] = sig
        if bh:
            h["X-Body-Hash"] = bh
        return h

    def _api_get(self, path, params=None):
        params = params or {}
        params = {k: v for k, v in params.items() if v is not None and v != ""}
        h = self._sign_headers("GET", "/api/app" + path, params)
        url = self.api + path
        if self.s is not None:
            try:
                r = self.s.get(url, params=params, headers=h, timeout=20)
                if r.status_code == 200:
                    return json.loads(r.text)
            except Exception:
                pass
        try:
            import urllib.request
            import urllib.parse
            qs = urllib.parse.urlencode(params)
            req = urllib.request.Request(url + ("?" + qs if qs else ""), headers=h)
            with urllib.request.urlopen(req, timeout=20) as resp:
                return json.loads(resp.read().decode("utf-8", "ignore"))
        except Exception:
            return None

    def _api_post(self, path, body):
        raw = json.dumps(body, separators=(",", ":"), ensure_ascii=False)
        h = self._sign_headers("POST", "/api/app" + path, {}, body_raw=raw)
        h["Content-Type"] = "application/json"
        url = self.api + path
        if self.s is not None:
            try:
                r = self.s.post(url, data=raw.encode("utf-8"), headers=h, timeout=30)
                if r.status_code == 200:
                    return json.loads(r.text)
            except Exception:
                pass
        try:
            import urllib.request
            req = urllib.request.Request(url, data=raw.encode("utf-8"), headers=h)
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8", "ignore"))
        except Exception:
            return None

    def _u(self, u):
        if not u:
            return u
        u = u.strip()
        if u.startswith("//"):
            return "https:" + u
        if u.startswith("http"):
            return u
        if u.startswith("/"):
            return self.site + u
        return u

    def _clean_pic(self, pic):
        if not pic:
            return ""
        pic = pic.strip()
        if "?" in pic:
            head, tail = pic.split("?", 1)
            if tail.startswith("http"):
                return head
        return pic

    def _cats_data(self):
        if self._cats is not None:
            return self._cats
        cats = []
        d = self._api_get("/categories")
        if isinstance(d, dict) and d.get("code") == 200 and isinstance(d.get("data"), list):
            for c in d["data"]:
                try:
                    cats.append({"id": int(c["id"]), "name": str(c.get("name") or "")})
                except Exception:
                    continue
        if not cats:
            cats = [
                {"id": 2, "name": "电影"},
                {"id": 1, "name": "电视剧"},
                {"id": 3, "name": "AI漫剧"},
                {"id": 4, "name": "短剧"},
                {"id": 5, "name": "动漫"},
                {"id": 6, "name": "综艺"},
                {"id": 8, "name": "体育赛事"},
                {"id": 7, "name": "VIP专享"},
            ]
        self._cats = cats
        return cats

    def _filters_data(self, cid):
        if cid in self._filter_map:
            return self._filters[cid]
        out = {"class": [], "year": [], "area": [], "lang": []}
        d = self._api_get("/categories/%d" % cid)
        if isinstance(d, dict) and d.get("code") == 200:
            f = (d.get("data") or {}).get("filters") or {}
            for k in out.keys():
                v = f.get(k)
                if isinstance(v, list):
                    out[k] = [str(x) for x in v if str(x)]
        self._filter_map[cid] = out
        return out

    def _filters(self):
        out = {}
        for c in self._cats_data():
            f = self._filters_data(c["id"])
            fl = []
            for key, label in (("class", "类型"), ("area", "地区"), ("year", "年份"), ("lang", "语言")):
                vals = f.get(key) or []
                fl.append({"key": key, "name": label, "value": [{"n": "全部", "v": ""}] + [{"n": v, "v": v} for v in vals]})
            out[str(c["id"])] = fl
        return out

    def _item(self, v):
        try:
            vid = v.get("id")
            name = str(v.get("name") or "").strip()
            if not vid or not name:
                return None
            remarks = str(v.get("remarks") or "").strip()
            if not remarks:
                remarks = " · ".join([x for x in [str(v.get("year") or ""), str(v.get("area") or "")] if x])
            if v.get("isVip"):
                remarks = (remarks + " · VIP") if remarks else "VIP"
            return {
                "vod_id": str(vid),
                "vod_name": name,
                "vod_pic": self._u(self._clean_pic(str(v.get("pic") or ""))),
                "vod_year": str(v.get("year") or ""),
                "vod_area": str(v.get("area") or ""),
                "vod_remarks": remarks,
            }
        except Exception:
            return None

    def _items(self, data):
        out = []
        if not isinstance(data, dict):
            return out
        for v in data.get("list") or []:
            it = self._item(v)
            if it:
                out.append(it)
        return out

    def _home_list(self):
        if self._home_items is not None:
            return self._home_items
        d = self._api_get("/videos/recent", {"limit": 28})
        self._home_items = self._items((d or {}).get("data") or {})
        return self._home_items

    def homeContent(self, filter=None):
        classes = [{"type_id": str(c["id"]), "type_name": c["name"]} for c in self._cats_data()]
        return {"class": classes, "filters": self._filters(), "list": self._home_list()}

    def homeVideoContent(self):
        return {"list": self._home_list()}

    def _match_local(self, v, cls, area, lang):
        if area and str(v.get("area") or "") != area:
            return False
        if lang and str(v.get("lang") or "") != lang:
            return False
        if cls:
            ext = str(v.get("classExtend") or "")
            parts = [p.strip() for p in re.split(r"[,，/、]", ext) if p.strip()]
            if cls not in parts:
                return False
        return True

    def categoryContent(self, tid, pg=1, filter=None, extend=None):
        try:
            pg = int(pg)
        except Exception:
            pg = 1
        if pg < 1:
            pg = 1
        try:
            cid = int(str(tid).strip())
        except Exception:
            cid = 2
        cats = self._cats_data()
        if cid not in [c["id"] for c in cats]:
            cid = cats[0]["id"]
        ext = extend if isinstance(extend, dict) else {}
        cls = str(ext.get("class") or "").strip()
        area = str(ext.get("area") or "").strip()
        year = str(ext.get("year") or "").strip()
        lang = str(ext.get("lang") or "").strip()
        page_size = 28
        local = bool(cls or area or lang)
        if not local:
            params = {"page": pg, "page_size": page_size}
            if year:
                params["year"] = year
            d = self._api_get("/categories/%d/videos" % cid, params)
            data = (d or {}).get("data") or {}
            total = 0
            try:
                total = int(data.get("total") or 0)
            except Exception:
                total = 0
            items = self._items(data)
            pagecount = (total + page_size - 1) // page_size if total else 1
            return {"list": items, "page": pg, "pagecount": pagecount, "limit": page_size, "total": total}
        base = {"page_size": page_size}
        if year:
            base["year"] = year
        need = pg * page_size
        matches = []
        server_total = 0
        exhausted = False
        for sp in range(1, 41):
            params = dict(base)
            params["page"] = sp
            d = self._api_get("/categories/%d/videos" % cid, params)
            data = (d or {}).get("data") or {}
            try:
                server_total = int(data.get("total") or 0)
            except Exception:
                pass
            lst = data.get("list") or []
            if not lst:
                exhausted = True
                break
            for v in lst:
                if self._match_local(v, cls, area, lang):
                    it = self._item(v)
                    if it:
                        matches.append(it)
            if len(matches) >= need:
                break
            if sp * page_size >= server_total and server_total:
                exhausted = True
                break
        start = (pg - 1) * page_size
        items = matches[start:start + page_size]
        if len(matches) >= need and not exhausted:
            pagecount = pg + 1
        else:
            pagecount = (len(matches) + page_size - 1) // page_size if matches else 1
        return {"list": items, "page": pg, "pagecount": pagecount, "limit": page_size, "total": len(matches)}

    def searchContent(self, key, quick=False, pg="1"):
        try:
            pg = int(pg)
        except Exception:
            pg = 1
        if pg < 1:
            pg = 1
        page_size = 28
        d = self._api_get("/videos/search", {"keyword": str(key), "page": pg, "page_size": page_size})
        data = (d or {}).get("data") or {}
        total = 0
        try:
            total = int(data.get("total") or 0)
        except Exception:
            total = 0
        items = self._items(data)
        pagecount = (total + page_size - 1) // page_size if total else 1
        return {"list": items, "page": pg, "pagecount": pagecount, "limit": page_size, "total": total}

    def detailContent(self, ids):
        vid = ids
        if isinstance(ids, (list, tuple)):
            vid = ids[0] if ids else ""
        vid = str(vid or "").strip()
        if not vid:
            return {"list": []}
        try:
            vid_int = int(vid)
        except Exception:
            return {"list": []}
        d = self._api_get("/videos/%d" % vid_int)
        if not isinstance(d, dict) or d.get("code") != 200:
            return {"list": []}
        v = d.get("data") or {}
        name = str(v.get("name") or "").strip()
        if not name:
            return {"list": []}
        groups = v.get("playGroups") or []
        play_from = []
        play_url = []
        for g in groups:
            code = str(g.get("code") or "")
            gname = str(g.get("name") or code)
            eps = g.get("playUrls") or []
            if not code or not eps:
                continue
            parts = []
            for idx, ep in enumerate(eps):
                ename = str(ep.get("name") or (idx + 1))
                parts.append("%s$%d@%s@%d" % (ename, vid_int, code, idx))
            play_from.append(gname)
            play_url.append("#".join(parts))
        if not play_from:
            return {"list": []}
        remarks = str(v.get("remarks") or "").strip()
        if not remarks:
            remarks = " · ".join([x for x in [str(v.get("year") or ""), str(v.get("area") or "")] if x])
        if v.get("isVip"):
            remarks = (remarks + " · VIP") if remarks else "VIP"
        score = str(v.get("doubanScore") or "")
        if score in ("0.0", "0", ""):
            score = ""
        return {"list": [{
            "vod_id": str(vid_int),
            "vod_name": name,
            "vod_pic": self._u(self._clean_pic(str(v.get("pic") or ""))),
            "vod_year": str(v.get("year") or ""),
            "vod_area": str(v.get("area") or ""),
            "vod_actor": str(v.get("actor") or ""),
            "vod_director": str(v.get("director") or ""),
            "vod_content": str(v.get("content") or ""),
            "vod_remarks": remarks,
            "vod_score": score,
            "vod_play_from": "$$$".join(play_from),
            "vod_play_url": "$$$".join(play_url),
        }]}

    def playerContent(self, flag, ids, vipFlags=None):
        url = ids
        if isinstance(ids, (list, tuple)):
            url = ids[0] if ids else ""
        url = str(url or "").strip()
        if not url:
            return {"parse": 0, "url": "", "header": dict(self.header)}
        if url.startswith("http") and self.isVideoFormat(url):
            return {"parse": 0, "url": url, "header": dict(self.header)}
        m = re.match(r"^(\d+)@([^@]+)@(\d+)$", url)
        if m:
            vid_int = int(m.group(1))
            code = m.group(2)
            idx = int(m.group(3))
            d = self._api_post("/play/token", {"videoId": vid_int, "episode": idx, "groupCode": code})
            if isinstance(d, dict) and d.get("code") == 200:
                play_url = ((d.get("data") or {}).get("playUrl") or "").strip()
                if play_url:
                    return {"parse": 0, "url": play_url, "header": dict(self.header)}
            dd = self._api_get("/videos/%d" % vid_int)
            if isinstance(dd, dict) and dd.get("code") == 200:
                for g in (dd.get("data") or {}).get("playGroups") or []:
                    if str(g.get("code") or "") != code:
                        continue
                    eps = g.get("playUrls") or []
                    if 0 <= idx < len(eps):
                        raw = str(eps[idx].get("url") or "")
                        if raw and self.isVideoFormat(raw):
                            return {"parse": 0, "url": raw, "header": dict(self.header)}
                        if raw:
                            return {"parse": 1, "url": raw, "header": dict(self.header)}
            return {"parse": 0, "url": "", "header": dict(self.header)}
        if url.startswith("http"):
            return {"parse": 1, "url": url, "header": dict(self.header)}
        return {"parse": 0, "url": "", "header": dict(self.header)}

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
