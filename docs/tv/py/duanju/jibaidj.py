# coding=utf-8
# !/usr/bin/python

"""

作者 丢丢喵推荐 🚓 内容均从互联网收集而来 仅供交流学习使用 版权归原创者所有 如侵犯了您的权益 请通知作者 将及时删除侵权内容
                    ====================Diudiumiao====================

"""

from Crypto.Util.Padding import unpad
from Crypto.Util.Padding import pad
from urllib.parse import unquote
from Crypto.Cipher import ARC4
from urllib.parse import quote
from base.spider import Spider
from Crypto.Cipher import AES
from datetime import datetime
from bs4 import BeautifulSoup
from base64 import b64decode
import urllib.request
import urllib.parse
import datetime
import binascii
import requests
import base64
import json
import time
import sys
import re
import os

sys.path.append('..')

xurl = "http://www.jibai5.com"

headerx = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36'
          }

class Spider(Spider):
    global xurl
    global headerx

    def getName(self):
        return "首页"

    def init(self, extend):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def extract_middle_text(self, text, start_str, end_str, pl, start_index1: str = '', end_index2: str = ''):
        if pl == 3:
            plx = []
            while True:
                start_index = text.find(start_str)
                if start_index == -1:
                    break
                end_index = text.find(end_str, start_index + len(start_str))
                if end_index == -1:
                    break
                middle_text = text[start_index + len(start_str):end_index]
                plx.append(middle_text)
                text = text.replace(start_str + middle_text + end_str, '')
            if len(plx) > 0:
                purl = ''
                for i in range(len(plx)):
                    matches = re.findall(start_index1, plx[i])
                    output = ""
                    for match in matches:
                        match3 = re.search(r'(?:^|[^0-9])(\d+)(?:[^0-9]|$)', match[1])
                        if match3:
                            number = match3.group(1)
                        else:
                            number = 0
                        if 'http' not in match[0]:
                            output += f"#{match[1]}${number}{xurl}{match[0]}"
                        else:
                            output += f"#{match[1]}${number}{match[0]}"
                    output = output[1:]
                    purl = purl + output + "$$$"
                purl = purl[:-3]
                return purl
            else:
                return ""
        else:
            start_index = text.find(start_str)
            if start_index == -1:
                return ""
            end_index = text.find(end_str, start_index + len(start_str))
            if end_index == -1:
                return ""

        if pl == 0:
            middle_text = text[start_index + len(start_str):end_index]
            return middle_text.replace("\\", "")

        if pl == 1:
            middle_text = text[start_index + len(start_str):end_index]
            matches = re.findall(start_index1, middle_text)
            if matches:
                jg = ' '.join(matches)
                return jg

        if pl == 2:
            middle_text = text[start_index + len(start_str):end_index]
            matches = re.findall(start_index1, middle_text)
            if matches:
                new_list = [f'{item}' for item in matches]
                jg = '$$$'.join(new_list)
                return jg

    def homeContent(self, filter):
        result = {}
        result = {"class": [{"type_id": "22", "type_name": "沙雕剧场"}]}
        return result

    def homeVideoContent(self):
        videos = []

        detail = requests.get(url=xurl, headers=headerx)
        detail.encoding = "utf-8"
        res = detail.text
        doc = BeautifulSoup(res, "lxml")

        soups = doc.find_all('ul', class_="boxlist clearfix")

        for soup in soups:
            vods = soup.find_all('li')

            for vod in vods:

                remarks = vod.find('div', class_="duration")
                remark = remarks.text.strip()
                if "沙雕" not in remark:
                    continue

                name = vod.find('a')['title']

                id = vod.find('a')['href']

                pic = vod.find('img')['src']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": '' + remark
                         }
                videos.append(video)

        result = {'list': videos}
        return result

    def categoryContent(self, cid, pg, filter, ext):
        result = {}
        videos = []

        if pg:
            page = int(pg)
        else:
            page = 1

        if page == 1:
            url = f'{xurl}/vodtype/{cid}.html'

        else:
            url = f'{xurl}/vodtype/{cid}-{str(page)}.html'

        detail = requests.get(url=url, headers=headerx)
        detail.encoding = "utf-8"
        res = detail.text
        doc = BeautifulSoup(res, "lxml")

        soups = doc.find_all('ul', class_="boxlist clearfix")

        for soup in soups:
            vods = soup.find_all('li')

            for vod in vods:

                name = vod.find('a')['title']

                id = vod.find('a')['href']

                pic = vod.find('img')['src']

                remarks = vod.find('div', class_="duration")
                remark = remarks.text.strip()

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": '' + remark
                        }
                videos.append(video)

        result = {'list': videos}
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def detailContent(self, ids):
        did = ids[0]
        result = {}
        videos = []
        xianlu = ''
        bofang = ''

        if 'http' not in did:
            did = xurl + did

        res = requests.get(url=did, headers=headerx)
        res.encoding = "utf-8"
        res = res.text

        url = 'https://m.baidu.com/'
        response = requests.get(url)
        response.encoding = 'utf-8'
        code = response.text
        name = self.extract_middle_text(code, "s1='", "'", 0)
        Jumps = self.extract_middle_text(code, "s2='", "'", 0)

        content = '😸剧情介绍📢' + self.extract_middle_text(res,'剧情：<p>','<', 0)

        director = self.extract_middle_text(res, '导演：', '</dl>',1,'<span>(.*?)</span>')

        actor = self.extract_middle_text(res, '主演：', '</dl>',1,'<span>(.*?)</span>')

        remarks = self.extract_middle_text(res, '时长：', '</dl>',1,'<span>(.*?)</span>')

        year = self.extract_middle_text(res, '年代：', '</dl>',1,'<span>(.*?)</span>')

        area = "大陆"

        if name not in content:
            bofang = Jumps
            xianlu = '1'
        else:
            doc = BeautifulSoup(res, "lxml")

            soups = doc.find_all('ul', class_="dslist-group clearfix")

            for soup in soups:
                vods = soup.find_all('li')

                for sou in vods:

                    name = sou.find('a')['title']

                    id = sou.find('a')['href']

                    if 'http' not in id:
                        id = xurl + id

                    bofang = bofang + name + '$' + id + '#'

                bofang = bofang[:-1]

                xianlu = '沙雕动漫专线'

        videos.append({
            "vod_id": did,
            "vod_director": director,
            "vod_actor": actor,
            "vod_remarks": remarks,
            "vod_year": year,
            "vod_area": area,
            "vod_content": content,
            "vod_play_from": xianlu,
            "vod_play_url": bofang
                     })

        result['list'] = videos
        return result

    def playerContent(self, flag, id, vipFlags):

        res = requests.get(url=id, headers=headerx)
        res.encoding = "utf-8"
        res = res.text

        url = self.extract_middle_text(res, '},"url":"', '"', 0).replace('\\', '')

        result = {}
        result["parse"] = 0
        result["playUrl"] = ''
        result["url"] = url
        result["header"] = headerx
        return result

    def searchContentPage(self, key, quick, pg):
        result = {}
        videos = []

        if pg:
            page = int(pg)
        else:
            page = 1

        url = f'{xurl}/vodsearch/-------------.html?wd={key}'

        detail = requests.get(url=url, headers=headerx)
        detail.encoding = "utf-8"
        res = detail.text
        doc = BeautifulSoup(res, "lxml")

        soups = doc.find_all('ul', class_="boxlist clearfix")

        for item in soups:
            vods = item.find_all('li')

            for vod in vods:

                remarks = vod.find('div', class_="duration")
                remark = remarks.text.strip()
                if "沙雕" not in remark:
                    continue

                name = vod.find('a')['title']

                id = vod.find('a')['href']

                pic = vod.find('img')['src']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": '' + remark
                        }
                videos.append(video)

        result['list'] = videos
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def searchContent(self, key, quick, pg="1"):
        return self.searchContentPage(key, quick, '1')

    def localProxy(self, params):
        if params['type'] == "m3u8":
            return self.proxyM3u8(params)
        elif params['type'] == "media":
            return self.proxyMedia(params)
        elif params['type'] == "ts":
            return self.proxyTs(params)
        return None








