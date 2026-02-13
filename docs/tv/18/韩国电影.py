# coding=utf-8
import sys
import json
import time
import urllib.parse
import re
import base64
from lxml import etree

sys.path.append('..')
from base.spider import Spider

class Spider(Spider):
    def getName(self):
        return "韩国电影"

    def init(self, extend):
        print("=============韩国电影优化版初始化===========")

    # 统一管理请求头，模拟真实浏览器绕过简单的防火墙
    def get_headers(self):
        return {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Referer": "https://koreanpornmovie.com/",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
        }

    def homeContent(self, filter):
        result = {}
        cateManual = {
            "最新视频": "latest",
            "最长的视频": "longest",
            "随机视频": "random"
        }
        classes = []
        for k, v in cateManual.items():
            classes.append({'type_name': k, 'type_id': v})
        result['class'] = classes
        return result

    def homeVideoContent(self):
        videos = self.getVideos('https://koreanpornmovie.com/', 1)
        return {'list': videos}

    def categoryContent(self, tid, pg, filter, extend):
        result = {}
        try:
            page_num = int(pg)
        except:
            page_num = 1

        # 构建 URL
        if page_num > 1:
            url = 'https://koreanpornmovie.com/page/{0}/'.format(page_num)
            if tid != 'latest':
                url += '?filter={0}'.format(tid)
        else:
            url = 'https://koreanpornmovie.com/'
            if tid != 'latest':
                url += '?filter={0}'.format(tid)

        videos = self.getVideos(url, page_num)
        result['list'] = videos
        result['page'] = page_num
        result['pagecount'] = 999
        result['limit'] = 20
        result['total'] = 9999
        return result

    def detailContent(self, array):
        tid = array[0]
        url = 'https://koreanpornmovie.com/{0}/'.format(tid)
        rsp = self.fetch(url, headers=self.get_headers())
        html = rsp.text
        
        video = self.getDetail(html, tid)
        play_url = self.getPlayUrl(html, url)

        # 播放源和地址构建
        playFrom = ['韩国情色电影']
        playList = ['立即播放$' + play_url] if play_url else []

        return {
            'list': [{
                'vod_id': tid,
                'vod_name': video['title'],
                'vod_pic': video['pic'],
                'type_name': video['type'],
                'vod_area': "韩国",
                'vod_remarks': video['remarks'],
                'vod_actor': video['actor'],
                'vod_content': video['content'],
                'vod_play_from': '$$$'.join(playFrom),
                'vod_play_url': '$$$'.join(playList)
            }]
        }

    def getVideos(self, url, pg):
        videos = []
        try:
            rsp = self.fetch(url, headers=self.get_headers())
            root = etree.HTML(rsp.text)
            video_list = root.xpath('//article[contains(@class, "thumb-block")]')

            for item in video_list:
                try:
                    link = item.xpath('.//a/@href')[0]
                    vid = link.strip('/').split('/')[-1]
                    title = item.xpath('.//a/@title')[0].strip() if item.xpath('.//a/@title') else "Video"
                    
                    # 优先取 data-main-thumb 
                    img = item.xpath('./@data-main-thumb')
                    if not img:
                        img = item.xpath('.//img/@src')
                    
                    duration = item.xpath('.//span[@class="duration"]//text()')
                    remarks = "".join(duration).strip()

                    videos.append({
                        "vod_id": vid,
                        "vod_name": title,
                        "vod_pic": img[0] if img else "",
                        "vod_remarks": remarks
                    })
                except: continue
        except: pass
        return videos

    def getDetail(self, html, tid):
        root = etree.HTML(html)
        detail = {'title': tid, 'pic': '', 'type': '韩国电影', 'actor': '', 'content': '', 'remarks': ''}
        try:
            detail['title'] = root.xpath('//h1/text()')[0].strip()
            detail['pic'] = root.xpath('//meta[@property="og:image"]/@content')[0]
            detail['actor'] = ' / '.join(root.xpath('//div[@id="video-actors"]//a/text()'))
            detail['content'] = "".join(root.xpath('//div[@class="video-description"]//p/text()')).strip()
            detail['remarks'] = "".join(root.xpath('//span[@class="duration"]//text()')).strip()
        except: pass
        return detail

    def getPlayUrl(self, html, url):
        play_url = ''

        # 方法 0: 针对你提到的 2026 版广告页，直接取 Schema 直链 (最稳)
        meta_pattern = r'itemprop="contentURL" content="([^"]+)"'
        meta_match = re.search(meta_pattern, html)
        if meta_match:
            play_url = meta_match.group(1)

        # 方法 1: 原有的 meta 标签
        if not play_url:
            meta_match = re.search(r'<meta property="og:video" content="([^"]+)"', html)
            if meta_match: play_url = meta_match.group(1)

        # 方法 2: 修复 Iframe Base64 (加入 URL 解码，防止广告脚本干扰)
        if not play_url:
            iframe_match = re.search(r'player-x\.php\?q=([^"\']+)', html)
            if iframe_match:
                try:
                    b64_str = urllib.parse.unquote(iframe_match.group(1))
                    b64_str += "=" * ((4 - len(b64_str) % 4) % 4)
                    decoded = base64.b64decode(b64_str).decode('utf-8')
                    mp4_match = re.search(r'src="([^"]+\.mp4)"', decoded)
                    if mp4_match: play_url = mp4_match.group(1).replace('&amp;', '&')
                except: pass

        # 方法 3 & 4: 直接搜索与 JS 提取
        if not play_url:
            mp4_matches = re.findall(r'https?://[^\s"\']+\.mp4', html)
            if mp4_matches:
                for m in mp4_matches:
                    if 'koreanporn.stream' in m:
                        play_url = m
                        break
                if not play_url: play_url = mp4_matches[0]

        # 补全链接与处理空格
        if play_url:
            play_url = play_url.replace(' ', '%20') # 解决空格导致的 404
            if play_url.startswith('//'):
                play_url = 'https:' + play_url
            elif not play_url.startswith('http'):
                play_url = urllib.parse.urljoin(url, play_url)

        return play_url

    def searchContent(self, key, quick, page='1'):
        url = 'https://koreanpornmovie.com/?s={0}'.format(urllib.parse.quote(key))
        if int(page) > 1:
            url = 'https://koreanpornmovie.com/page/{0}/?s={1}'.format(page, urllib.parse.quote(key))
        return {'list': self.getVideos(url, int(page))}

    def playerContent(self, flag, id, vipFlags):
        return {
            "parse": 0,
            "url": id,
            "header": self.get_headers() # 关键：播放器也需要 Referer 才能过某些节点的校验
        }

    def isVideoFormat(self, url):
        return any(ext in url.lower() for ext in ['.mp4', '.m3u8', '.mkv'])

    def manualVideoCheck(self):
        return True

    def localProxy(self, param):
        return []
