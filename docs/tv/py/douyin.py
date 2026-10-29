# coding=utf-8
# !/usr/bin/python
from urllib.parse import quote, unquote
from base.spider import Spider
from base64 import b64decode, b64encode
import requests
import base64
import json
import time
import sys
import re
import os

sys.path.append('..')

# ================ 分类配置 ================
CLASSES = [    
    {"type_id": "4_103", "type_name": "游戏"},
    {"type_id": "4_105", "type_name": "舞蹈"},
    {"type_id": "4_101", "type_name": "聊天"},
    {"type_id": "4_106", "type_name": "文化"},
    {"type_id": "4_107", "type_name": "生活"},
    {"type_id": "4_108", "type_name": "运动"},
    {"type_id": "4_102", "type_name": "音乐"},
    {"type_id": "4_104", "type_name": "二次元"},
]

# 游戏子分类（用于 filters）
GAME_FILTERS = [
    {"n": "全部", "v": "4_103"},
    {"n": "王者荣耀", "v": "4_103_1_2_1_1010045"},
    {"n": "英雄联盟", "v": "4_103_1_2_1_1010014"},    
    {"n": "金铲铲之战", "v": "4_103_1_2_1_1010055"},
    {"n": "魔兽争霸3", "v": "4_103_1_2_1_1010350"},
    {"n": "和平精英", "v": "4_103_1_1_1_1010032"},
    {"n": "三角洲行动", "v": "4_103_1_1_1_1011032"},
    {"n": "地下城与勇士", "v": "4_103_1_6_1_1010092"},
    {"n": "单机游戏", "v": "4_103_1_3"},
    {"n": "射击游戏", "v": "4_103_1_1"},
    {"n": "竞技游戏", "v": "4_103_1_2"},
]

FILTERS = {
    "4_103": [
        {"key": "cate", "name": "分类", "value": GAME_FILTERS}
    ]
}


class Spider(Spider):

    def __init__(self):
        super().__init__()
        self.dy_ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36"
        self.dy_a_bogus = "a" * 188
        self.dy_ttwid = ""

    def getName(self):
        return "抖音直播"

    def init(self, extend=""):
        pass

    def isVideoFormat(self, url):
        video_formats = ['.m3u8', '.mp4', '.flv', '.ts']
        return any(str(url).lower().endswith(fmt) for fmt in video_formats)

    def manualVideoCheck(self):
        return False

    def destroy(self):
        pass

    # ================ 首页 ================
    def homeContent(self, filter):
        result = {
            "class": CLASSES,
            "filters": FILTERS
        }
        return result

    def homeVideoContent(self):
        pass

    # ================ 工具方法 ================
    def _dy_get_ttwid_cookie(self):
        if self.dy_ttwid:
            return self.dy_ttwid
        try:
            s = requests.Session()
            s.get("https://live.douyin.com/", headers={"User-Agent": self.dy_ua}, timeout=5)
            payload = {
                "region": "cn",
                "aid": 6383,
                "needFid": False,
                "service": "live.douyin.com",
                "migrate_info": {"tier": "", "from_model": "pc"},
            }
            res = s.post(
                "https://ttwid.bytedance.com/ttwid/union/register/",
                json=payload,
                headers={
                    "User-Agent": self.dy_ua,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                timeout=5
            )
            set_cookie = res.headers.get("Set-Cookie", "")
            match = re.search(r"ttwid=([^;]+)", set_cookie)
            if match:
                self.dy_ttwid = match.group(1)
                return self.dy_ttwid
        except Exception as e:
            print(f"抖音 ttwid 获取异常: {e}")
        return ""

    def _dy_split_category(self, path):
        """
        解析分类路径
        例如:
          4_103          → partition=103, partitionType=4
          4_103_1_2_1_1010014 → partition=1010014, partitionType=1
        """
        seg = [s for s in str(path).split("_") if s]
        if len(seg) < 2:
            return {"partition": "105", "partitionType": "4"}
        # 取最后两个有效段
        return {"partition": seg[-1], "partitionType": seg[-2]}

    def _dy_extract_cdn_url(self, room):
        stream_url = room.get("stream_url", {}) if room else {}
        hls_map = stream_url.get("hls_pull_url_map") or {}
        flv_map = stream_url.get("flv_pull_url") or {}
        qualities = ["FULL_HD1", "HD1", "SD1", "SD2"]

        for q in qualities:
            if hls_map.get(q):
                return hls_map[q].replace("http://", "https://")

        for q in qualities:
            if flv_map.get(q):
                return flv_map[q].replace("http://", "https://")

        if stream_url.get("hls_pull_url"):
            return stream_url["hls_pull_url"].replace("http://", "https://")

        return None

    def e64(self, text):
        try:
            return b64encode(text.encode('utf-8')).decode('utf-8')
        except Exception:
            return ""

    def d64(self, encoded_text):
        try:
            return b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        except Exception:
            return ""

    # ================ 分类列表 ================
    def categoryContent(self, tid, pg, filter, extend):
        result = {
            "list": [],
            "page": pg,
            "pagecount": 9999,
            "limit": 90,
            "total": 999999
        }
        videos = []
    
        try:
            cate_path = tid
            if extend and isinstance(extend, dict) and extend.get("cate"):
                cate_path = extend.get("cate")
            elif not cate_path:
                cate_path = "4_103"
    
            p = max(0, int(pg or 1) - 1)
            ttwid = self._dy_get_ttwid_cookie()
            cat_info = self._dy_split_category(cate_path)
    
            params = {
                "aid": "6383",
                "app_name": "douyin_web",
                "live_id": "1",
                "device_platform": "web",
                "language": "zh-CN",
                "cookie_enabled": "true",
                "screen_width": "1280",
                "screen_height": "720",
                "browser_language": "zh-CN",
                "browser_platform": "Windows",
                "browser_name": "Chrome",
                "browser_version": "151.0.0.0",
                "os_name": "Windows",
                "os_version": "10",
                "count": "15",
                "offset": str(p * 15),
                "partition": cat_info["partition"],
                "partition_type": cat_info["partitionType"],
                "req_from": "2",
                "a_bogus": self.dy_a_bogus,
            }
            headers = {
                "User-Agent": self.dy_ua,
                "Referer": f"https://live.douyin.com/categorynew/{cate_path}",
            }
            if ttwid:
                headers["Cookie"] = f"ttwid={ttwid}"
    
            url = "https://live.douyin.com/webcast/web/partition/detail/room/v2/"
            resp = requests.get(url, params=params, headers=headers, timeout=8)
    
            if resp.status_code == 200:
                data = resp.json()
                items = data.get("data", {}).get("data", []) or []
                for it in items:
                    room = it.get("room", {}) or {}
                    owner = room.get("owner", {}) or {}
    
                    # 标题
                    title = room.get("title") or owner.get("nickname") or "抖音直播"
    
                    # 封面
                    cover = (room.get("cover", {}) or {}).get("url_list", [""])[0] or \
                            (owner.get("avatar_thumb", {}) or {}).get("url_list", [""])[0]
    
                    # 正确的房间号（优先 web_rid，对应 live.douyin.com/后面的数字）
                    web_rid = (
                        owner.get("web_rid")
                        or room.get("web_rid")
                        or room.get("id_str")
                        or room.get("owner_user_id")
                        or owner.get("sec_uid")
                        or ""
                    )
    
                    # 主播名
                    nickname = owner.get("nickname") or ""
    
                    # 主播名
                    nickname = owner.get("nickname") or ""
                    
                    # 在线人数
                    user_count = room.get("user_count", 0)                    
                    
                    # 直链
                    play_url = self._dy_extract_cdn_url(room)
                    
                    if web_rid or play_url:
                        encoded_url = self.e64(play_url) if play_url else ""
                        
                        # 把标题、主播名、人数、分类名一起打包
                        extra = {
                            "title": title,
                            "nickname": nickname,
                            "user_count": user_count
                        }
                        encoded_extra = self.e64(json.dumps(extra, ensure_ascii=False))
                        
                        vod_id = f"{web_rid}@@{encoded_url}@@{encoded_extra}"
                    
                        # 备注：主播名 + 在线人数
                        remarks_parts = []
                        if nickname:
                            remarks_parts.append(nickname)
                        if user_count:
                            remarks_parts.append(f"🔥{user_count}")
                        vod_remarks = "┃".join(remarks_parts) if remarks_parts else "抖音直播"
                    
                        videos.append({
                            "vod_id": vod_id,
                            "vod_name": title,
                            "vod_pic": cover or "",
                            "vod_remarks": vod_remarks
                        })
    
        except Exception as e:
            print(f"抖音分类解析失败: {e}")
            result["pagecount"] = 1
    
        result["list"] = videos
        return result
    
    # ================ 详情 ================
    def detailContent(self, ids):
        result = {"list": []}
        try:
            did = ids[0] if isinstance(ids, list) else ids
            parts = str(did).split("@@")
    
            rid = parts[0] if parts else ""
            direct_url = self.d64(parts[1]) if len(parts) > 1 and parts[1] else ""
    
            # 解析打包的额外信息
            title = f"抖音直播 - {rid}"
            nickname = ""
            user_count = 0
    
            if len(parts) > 2 and parts[2]:
                try:
                    extra = json.loads(self.d64(parts[2]))
                    title = extra.get("title") or title
                    nickname = extra.get("nickname") or ""
                    user_count = extra.get("user_count") or 0
                except Exception:
                    # 兼容旧格式（只有标题）
                    title = self.d64(parts[2]) or title
    
            play_url = direct_url if direct_url else f"https://live.douyin.com/{rid}"
    
            # 主演栏显示：主播名 + 在线人数
            actor_text = nickname
            if user_count:
                actor_text = f"{nickname}┃人气值🔥：{user_count}" if nickname else f"人气值🔥：{user_count}"
    
            result["list"].append({
                "vod_id": did,
                "vod_name": title,
                "vod_director": f"🚪房间号：{rid}",           # 导演 → 房间号
                "vod_actor": actor_text,                    # 演员 → 主播名 + 人数
                "vod_content": f"欢迎观看抖音直播",
                "vod_play_from": "小鱼专线",
                "vod_play_url": f"高清直播${play_url}"
            })
        except Exception as e:
            print(f"抖音详情错误: {e}")
            result["list"].append({
                "vod_id": ids[0] if ids else "",
                "vod_content": "获取失败",
                "vod_play_from": "哎呀翻车啦",
                "vod_play_url": "翻车啦$https://www.baidu.com"
            })
        return result

    # ================ 播放 ================
    def playerContent(self, flag, id, vipFlags):
        return {
            "parse": 0,
            "playUrl": "",
            "url": id,
            "header": {
                "User-Agent": self.dy_ua,
                "Referer": "https://live.douyin.com/"
            }
        }

    # ================ 搜索（暂未实现） ================
    def searchContent(self, key, quick, pg="1"):
        return self.searchContentPage(key, quick, pg)

    def searchContentPage(self, key, quick, pg):
        return {
            "list": [],
            "page": pg,
            "pagecount": 1,
            "limit": 90,
            "total": 0
        }

    def localProxy(self, params):
        return None