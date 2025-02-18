# 运行逻辑:
	#根据给定的url链接,获取到饭太硬jar的url链接,然后下载jar,重新命名为fan.txt 将文件分别保存到'/风言锋语88/风言锋语/jar/'  和 '/github/box/jar/'文件夹中
import requests
import base64
import re
import os

# 保存文件的目录
save_dir1 = "/storage/emulated/0/风言锋语88/风言锋语/jar/"
save_dir2 = "/storage/emulated/0/github/box/jar/"

# 目标URL
url = 'http://www.饭太硬.com/tv'
#url = input("请输入URL: ")

# 请求头
headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent': 'okhttp/3.'
}

# 发送GET请求
response = requests.get(url, headers=headers)

# 检查请求是否成功
if response.status_code == 200:
    # 查找'**'在响应中的位置
    start_index = response.text.find('**')
    
    if start_index != -1:
        # 提取'**'后面的文本
        text_after = response.text[start_index + len('**'):]
        
        # 解码Base64文本
        try:
            decoded_bytes = base64.b64decode(text_after)
            decoded_text = decoded_bytes.decode('utf-8')
            
            # 打印解码后的文本
            print("解码后的文本内容如下：")
            print(decoded_text)
            
            # 使用正则表达式查找所有以 https://fs-im-kefu.7moor-fs1.com/ 开头或者https://www.fs-im-kefu.7moor-fs1.com/开头且以.txt 结尾的链接
            pattern = r'https:\/\/(?:www\.)?fs-im-kefu\.7moor-fs1\.com\/[^\s]*\.txt\b'
            matches = re.findall(pattern, decoded_text)
            
            # 输出找到的链接
            if matches:
                print("成功获取链接：")
                for match in matches:
                    print(match)
                    
                    # 发送POST请求
                    post_response = requests.post(match)
                    print(f"状态码: {post_response.status_code}")  # 打印状态码
                    
                    # 检查响应状态码
                    if post_response.status_code == 200:
                        # 用户选择是否保存文件
                        user_input = input("是否下载jar，按回车键下载jar文件，输入2不下载: ")

                        if user_input == '':
                            # 提取URL中的文件名并修改为"fan",直接指定文件名为"fan.txt"
                            filename = "fan.txt"
                            
                            # 检查目录是否存在，如果不存在则创建
                            if not os.path.exists(save_dir1):
                                os.makedirs(save_dir1)
                            if not os.path.exists(save_dir2):
                                os.makedirs(save_dir2)

                            # 将文件保存到第一个目录
                            full_save_path1 = os.path.join(save_dir1, filename)
                            with open(full_save_path1, 'wb') as file:
                                file.write(post_response.content)  # 使用response.content来获取二进制内容
                            print(f"文件已保存为{full_save_path1}")

                            # 将文件保存到第二个目录
                            full_save_path2 = os.path.join(save_dir2, filename)
                            with open(full_save_path2, 'wb') as file:
                                file.write(post_response.content)  # 使用response.content来获取二进制内容
                            print(f"文件已保存为{full_save_path2}")

                        elif user_input == '2':
                            print("您选择了不保存文件。")
                        else:
                            print("输入无效，未保存文件。")
                    else:
                        print(f"请求失败，状态码：{post_response.status_code}")
            else:
                print("未找到符合条件的链接。")
        except base64.binascii.Error:
            print("Base64解码失败。")
        except UnicodeDecodeError:
            print("文本解码失败。")
    else:
        print("未找到'**'")
else:
    print(f"请求失败，状态码: {response.status_code}")