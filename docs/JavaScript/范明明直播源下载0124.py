# 运行逻辑:
#	根据给定的url链接,下载文件并保存到'/风言锋语88/风言锋语/txt/'文件夹中
import os
import requests

def download_file(url, save_path):
    try:
        # 发送GET请求
        response = requests.get(url)
        response.raise_for_status()  # 检查请求是否成功

        # 确保目标文件夹存在
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        # 写入文件
        with open(save_path, 'wb') as file:
            file.write(response.content)
        
        print(f"文件已成功下载到: {save_path}")
    except requests.exceptions.RequestException as e:
        print(f"下载文件时发生错误: {e}")

# 定义下载的URL和保存路径
url = "https://gh.2015888.xyz/https://raw.githubusercontent.com/fanmingming/live/refs/heads/main/tv/m3u/ipv6.m3u"
save_path = "/storage/emulated/0/风言锋语88/风言锋语/txt/ipv6.m3u"

# 调用函数
download_file(url, save_path)