import re
import json
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from base.spider import Spider

# 忽略 SSL 警告
requests.packages.urllib3.disable_warnings()

class Spider(Spider):
    def getName(self): 
        return "雪月映画"
    
    def init(self, extend=""):
        super().init(extend)
        self.base_url = "https://taoo.xyz"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': self.base_url + '/',
            'Connection': 'keep-alive'
        }
        self.session = requests.Session()
        retries = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
        adapter = HTTPAdapter(pool_connections=20, pool_maxsize=20, max_retries=retries)
        self.session.mount('https://', adapter)
        self.session.mount('http://', adapter)

    def destroy(self):
        if hasattr(self, 'session'): 
            self.session.close()

    def fetch(self, url):
        try:
            return self.session.get(url, headers=self.headers, timeout=15, verify=False)
        except Exception as e:
            print(f"Fetch error: {e}")
            return None

    def homeContent(self, filter):
        cats = [
            {"type_name": "=== 分类 ===", "type_id": "ignore"},
            {"type_name": "R18", "type_id": "category/r18"},
            {"type_name": "R15", "type_id": "category/r15"},
            {"type_name": "=== 功能 ===", "type_id": "ignore"},
            {"type_name": "🎲随机文章", "type_id": "random"},
        ]
        return {'class': [c for c in cats if c['type_id'] != 'ignore']}

    def categoryContent(self, tid, pg, filter, extend):
        if tid == "random":
            return {'list': [], 'page': 1, 'pagecount': 1, 'limit': 20, 'total': 0}
        
        # 处理分页URL
        if "/" in tid:
            if int(pg) > 1:
                url = f"{self.base_url}/{tid}/{pg}/"
            else:
                url = f"{self.base_url}/{tid}/"
        else:
            if int(pg) > 1:
                url = f"{self.base_url}/category/{tid}/{pg}/"
            else:
                url = f"{self.base_url}/category/{tid}/"
        
        return self._get_post_list(url, int(pg))

    def _get_post_list(self, url, pg):
        resp = self.fetch(url)
        vlist = []
        if resp and resp.status_code == 200:
            resp.encoding = 'utf-8'
            html = resp.text
            
            # 提取文章列表 - 使用 item 类
            items = re.findall(r'<div class="item[^>]*>(.*?)</div>\s*</div>\s*(?=<div class="item|</div><ol class="page-navigator|$)', html, re.S)
            
            if not items:
                items = re.findall(r'<div class="item[^>]*>(.*?)</div>(?=\s*<div class="item|</div>\s*<ol class="page-navigator|</div>\s*<footer)', html, re.S)
            
            for item in items:
                # 提取链接
                href_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>', item)
                if not href_match:
                    continue
                href = href_match.group(1)
                
                # 过滤无效链接
                if any(x in href for x in ['.css', '.js', 'wp-includes', '/category/', '/tags.html', '/telegram.html']):
                    continue
                
                # 提取图片
                img_match = re.search(r'data-original=["\']([^"\']+)["\']', item)
                if not img_match:
                    img_match = re.search(r'src=["\']([^"\']+)["\']', item)
                pic = img_match.group(1) if img_match else ""
                
                # 过滤占位图
                if pic and ('BrowserPreview_tmp' in pic or 'loading' in pic.lower()):
                    img_match2 = re.search(r'data-original=["\']([^"\']+)["\']', item)
                    if img_match2:
                        pic = img_match2.group(1)
                    else:
                        pic = ""
                
                # 提取标题
                title_match = re.search(r'alt=["\']([^"\']+)["\']', item)
                if not title_match:
                    title_match = re.search(r'<div class="item-link-text">([^<]+)</div>', item)
                name = title_match.group(1) if title_match else ""
                
                name = name.strip()
                if not name or len(name) > 200 or name.startswith('.'):
                    continue
                
                # 补全链接
                if href.startswith('//'):
                    href = 'https:' + href
                elif href.startswith('/'):
                    href = self.base_url + href
                
                if pic.startswith('//'):
                    pic = 'https:' + pic
                elif pic.startswith('/'):
                    pic = self.base_url + pic
                
                vlist.append({
                    'vod_id': href,
                    'vod_name': name,
                    'vod_pic': pic,
                    'vod_remarks': '点击查看',
                    'style': {"type": "rect", "ratio": 1.33}
                })
        
        # 解析分页
        total_pages = pg
        if resp and resp.status_code == 200:
            page_nav = re.search(r'<ol class="page-navigator">(.*?)</ol>', resp.text, re.S)
            if page_nav:
                nav_html = page_nav.group(1)
                # 提取所有页码数字
                page_numbers = re.findall(r'>(\d+)</a>', nav_html)
                if page_numbers:
                    try:
                        total_pages = max(int(p) for p in page_numbers)
                    except:
                        pass
                else:
                    # 从 href 中提取
                    page_hrefs = re.findall(r'href=["\'][^"\']+/(\d+)/?["\']', nav_html)
                    if page_hrefs:
                        try:
                            total_pages = max(int(p) for p in page_hrefs)
                        except:
                            pass
        
        return {
            'list': vlist, 
            'page': pg, 
            'pagecount': total_pages if total_pages > pg else pg + 1,
            'limit': 20, 
            'total': 9999
        }

    def searchContent(self, key, quick, pg=1):
        if int(pg) > 1:
            url = f"{self.base_url}/page/{pg}/"
        else:
            url = self.base_url
        
        try:
            resp = self.session.post(
                url, 
                headers=self.headers, 
                data={'s': key},
                timeout=15,
                verify=False
            )
        except:
            return {'list': [], 'page': 1, 'pagecount': 1, 'limit': 20, 'total': 0}
        
        if not resp or resp.status_code != 200:
            return {'list': [], 'page': 1, 'pagecount': 1, 'limit': 20, 'total': 0}
        
        resp.encoding = 'utf-8'
        html = resp.text
        
        vlist = []
        items = re.findall(r'<div class="item[^>]*>(.*?)</div>(?=\s*<div class="item|</div>\s*<ol class="page-navigator)', html, re.S)
        
        for item in items:
            href_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>', item)
            if not href_match:
                continue
            href = href_match.group(1)
            
            if any(x in href for x in ['.css', '.js', 'wp-includes', '/category/', '/tags.html']):
                continue
            
            img_match = re.search(r'data-original=["\']([^"\']+)["\']', item)
            if not img_match:
                img_match = re.search(r'src=["\']([^"\']+)["\']', item)
            pic = img_match.group(1) if img_match else ""
            
            if pic and 'BrowserPreview_tmp' in pic:
                img_match2 = re.search(r'data-original=["\']([^"\']+)["\']', item)
                if img_match2:
                    pic = img_match2.group(1)
                else:
                    pic = ""
            
            title_match = re.search(r'alt=["\']([^"\']+)["\']', item)
            if not title_match:
                title_match = re.search(r'<div class="item-link-text">([^<]+)</div>', item)
            name = title_match.group(1) if title_match else ""
            
            name = name.strip()
            if not name:
                continue
            
            if href.startswith('/'):
                href = self.base_url + href
            if pic.startswith('//'):
                pic = 'https:' + pic
            elif pic.startswith('/'):
                pic = self.base_url + pic
            
            vlist.append({
                'vod_id': href,
                'vod_name': name,
                'vod_pic': pic,
                'vod_remarks': '搜索结果',
                'style': {"type": "rect", "ratio": 1.33}
            })
        
        # 解析搜索分页
        total_pages = pg
        page_nav = re.search(r'<ol class="page-navigator">(.*?)</ol>', html, re.S)
        if page_nav:
            nav_html = page_nav.group(1)
            page_numbers = re.findall(r'>(\d+)</a>', nav_html)
            if page_numbers:
                try:
                    total_pages = max(int(p) for p in page_numbers)
                except:
                    pass
        
        return {'list': vlist, 'page': pg, 'pagecount': total_pages if total_pages > pg else pg + 1, 'limit': 20, 'total': 9999}

    def detailContent(self, ids):
        url = ids[0]
        resp = self.fetch(url)
        if not resp:
            return {'list': []}

        resp.encoding = 'utf-8'
        html = resp.text
        
        vod = {
            'vod_id': url,
            'vod_name': '',
            'vod_pic': '',
            'type_name': '写真',
            'vod_content': '',
            'vod_play_from': '雪月映画',
            'vod_play_url': ''
        }

        # 提取标题
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html)
        if h1:
            vod['vod_name'] = h1.group(1).strip()
        else:
            title_match = re.search(r'<title>(.*?)</title>', html)
            if title_match:
                vod['vod_name'] = title_match.group(1).replace(' - ❄️雪月映画❄️', '').strip()
        
        # 提取描述
        desc_match = re.search(r'<meta name="description"[^>]*content=["\']([^"\']+)["\']', html)
        if desc_match:
            vod['vod_content'] = desc_match.group(1)[:200]

        # 从 virtual-gallery-data JSON 中提取图片
        img_urls = []
        
        gallery_match = re.search(r'<script[^>]*id="virtual-gallery-data"[^>]*>(.*?)</script>', html, re.S)
        if gallery_match:
            try:
                gallery_data = json.loads(gallery_match.group(1).strip())
                items = gallery_data.get('items', [])
                for item in items:
                    img_url = item.get('original') or item.get('display')
                    if img_url:
                        if img_url.startswith('//'):
                            img_url = 'https:' + img_url
                        elif img_url.startswith('/'):
                            img_url = self.base_url + img_url
                        img_urls.append(img_url)
            except json.JSONDecodeError:
                pass
        
        # 备选：从 data-fancybox 提取
        if not img_urls:
            fancybox_matches = re.findall(r'<a[^>]+data-fancybox=["\']gallery["\'][^>]*href=["\']([^"\']+)["\']', html)
            for src in fancybox_matches:
                if src.startswith('//'):
                    src = 'https:' + src
                elif src.startswith('/'):
                    src = self.base_url + src
                if src not in img_urls:
                    img_urls.append(src)
        
        # 再备选：从 post-item-img 提取
        if not img_urls:
            img_matches = re.findall(r'<img[^>]+class=["\'][^"\']*post-item-img[^"\']*["\'][^>]+data-original=["\']([^"\']+)["\']', html)
            for src in img_matches:
                if src.startswith('//'):
                    src = 'https:' + src
                elif src.startswith('/'):
                    src = self.base_url + src
                if src not in img_urls:
                    img_urls.append(src)

        # 生成播放链接 - 直接拼接成 pics:// 格式
        if img_urls:
            valid_images = [u for u in img_urls if 'matomo.php' not in u and 'acgimg.top' not in u and 'BrowserPreview_tmp' not in u]
            if valid_images:
                vod['vod_play_url'] = f'pics://{"&&".join(valid_images)}'
                vod['vod_play_from'] = "写真集"
            else:
                vod['vod_play_url'] = f"在线观看${url}"
        else:
            vod['vod_play_url'] = f"在线观看${url}"

        return {'list': [vod]}

    def playerContent(self, flag, id, vipFlags):
        # 如果已经是 pics:// 格式，直接返回
        if id.startswith("pics://"):
            return {"parse": 0, "playUrl": "", "url": id, "header": ""}
        
        # 兼容处理：如果传入的是纯图片链接（用 && 分隔）
        if "&&" in id and not id.startswith("http"):
            images = id.split("&&")
            images = [img for img in images if img and img.startswith('http')]
            if images:
                ret = f'pics://{"&&".join(images)}'
            else:
                ret = id
        elif id.startswith("http"):
            ret = id
        else:
            ret = id
        
        return {"parse": 0, "playUrl": "", "url": ret, "header": ""}