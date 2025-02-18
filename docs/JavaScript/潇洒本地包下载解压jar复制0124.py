# 指定保存文件目录/storage/emulated/0/
# 指定解压路径,强制覆盖保存到根目录/storage/emulated/0/下的子目录 TVBoxOSC文件夹
# 运行逻辑:
	#1.用指定的url获取需要的链接,
	#2.根据获取到的url链接,下载前获取文件大小,并判断是否为空包,由用户决定是否下载,如若无法获取文件大小,也有用户决定是否直接下载,
	#3.将下载好的文件强制解压到TVBoxOSC目录
	#4.从TVBoxOSC/tvbox/复制到指定的目录改名xiaoyu.txt.jar并保存

# 设定当文件大小＜100kb为空包,用户决定是否下载
# 自动从/storage/emulated/0/TVBoxOSC/tvbox/spider.jar复制到/storage/emulated/0/风言锋语88/风言锋语/jar/  中,并重命名为 xiaoyu.txt.jar
import requests
import os
import zipfile
import shutil

def fetch_and_extract_url():
    # 目标URL
    url = "https://9877.kstore.space/Market/market.json"
    
    try:
        # 发送GET请求获取JSON数据
        response = requests.get(url)
        response.raise_for_status()  # 检查请求是否成功
        
        # 解析JSON数据
        data = response.json()
        
        # 遍历JSON数据
        for category in data:
            if category.get("name") == "检查更新":
                for item in category.get("list", []):
                    if item.get("name") == "单线路":
                        file_url = item.get("url")
                        if file_url and file_url.endswith(".zip"):
                            print("找到符合条件的链接:", file_url)
                            # 获取文件大小
                            file_size = get_remote_file_size(file_url)
                            if file_size is None:
                                print("无法获取文件大小。")
                                user_input = input("按回车键继续下载，或输入 2 停止下载: ")
                                if user_input == "2":
                                    print("用户选择停止下载，脚本结束。")
                                    return None
                            else:
                                # 打印文件大小
                                print(f"文件大小: {file_size / 1024 / 1024:.2f} MB")
                                
                                # 如果文件大小小于 100KB，提示用户
                                if file_size < 100 * 1024:
                                    print("警告: 文件大小＜ 100KB，可能是空包,等待作者重新上传。")
                                    user_input = input("按回车键继续下载，或输入 2 停止下载: ")
                                    if user_input == "2":
                                        print("用户选择停止下载，脚本结束。")
                                        return None
                            
                            # 下载文件
                            downloaded_file = download_file(file_url, "/storage/emulated/0/")
                            if downloaded_file:
                                # 解压文件
                                extract_zip(downloaded_file, "/storage/emulated/0/")
                                # 复制并重命名 spider.jar 文件
                                copy_spider_jar()
                            return file_url
        
        print("未找到符合条件的链接")
        return None
    
    except requests.exceptions.RequestException as e:
        print("请求出错:", e)
        return None

def get_remote_file_size(url):
    try:
        # 发送GET请求获取文件大小
        with requests.get(url, stream=True) as response:
            response.raise_for_status()
            file_size = int(response.headers.get("Content-Length", 0))
            if file_size == 0:
                # 如果Content-Length为0，尝试通过流式下载计算大小
                file_size = 0
                for chunk in response.iter_content(chunk_size=8192):
                    file_size += len(chunk)
                    if file_size > 100 * 1024:  # 如果文件大小超过100KB，直接返回
                        break
            return file_size
    
    except requests.exceptions.RequestException as e:
        print(f"获取文件大小失败: {e}")
        return None

def download_file(url, save_dir):
    try:
        # 确保保存目录存在，如果不存在则创建
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
        
        # 提取文件名
        file_name = os.path.basename(url)
        save_path = os.path.join(save_dir, file_name)
        
        # 发送GET请求下载文件
        print(f"正在下载文件: {file_name}...")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # 写入文件
        with open(save_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        
        print(f"文件已保存到: {save_path}")
        return save_path
    
    except requests.exceptions.RequestException as e:
        print(f"下载文件失败: {e}")
        return None

def extract_zip(zip_path, extract_dir):
    try:
        # 确保解压目录存在，如果不存在则创建
        if not os.path.exists(extract_dir):
            os.makedirs(extract_dir)
        
        # 打开压缩包
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # 遍历压缩包中的每个文件
            for file in zip_ref.namelist():
                # 构造目标文件路径
                target_path = os.path.join(extract_dir, file)
                
                # 如果目标路径已存在，则删除
                if os.path.exists(target_path):
                    if os.path.isfile(target_path):
                        os.remove(target_path)
                    elif os.path.isdir(target_path):
                        shutil.rmtree(target_path)
                
                # 解压文件
                zip_ref.extract(file, extract_dir)
        
        print(f"压缩包已解压到: {extract_dir}")
        return extract_dir
    
    except zipfile.BadZipFile:
        print("错误: 文件不是有效的 ZIP 文件")
        return None
    except Exception as e:
        print(f"解压文件失败: {e}")
        return None

def copy_spider_jar():
    # 源文件路径
    src_path = "/storage/emulated/0/TVBoxOSC/tvbox/spider.jar"
    # 目标目录
    dest_dir = "/storage/emulated/0/风言锋语88/风言锋语/jar/"
    # 目标文件路径（重命名为 xiaoyu.txt.jar）
    dest_path = os.path.join(dest_dir, "xiaoyu.txt.jar")
    
    try:
        # 确保目标目录存在，如果不存在则创建
        if not os.path.exists(dest_dir):
            os.makedirs(dest_dir)
        
        # 复制文件并重命名
        shutil.copy(src_path, dest_path)
        print(f"文件已复制并重命名为: {dest_path}")
    
    except Exception as e:
        print(f"复制或重命名文件失败: {e}")

if __name__ == "__main__":
    fetch_and_extract_url()