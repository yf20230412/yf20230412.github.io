import requests
import re
import os

# 保存文件的目录
save_dir = "/storage/emulated/0/风言锋语88/风言锋语/jar/"
# 目标URL
url = 'http://tv.laohu.cool/tvbox.json'

# 请求头
headers = {
    'User-Agent': 'okhttp/3.'
}

# 发送GET请求
response = requests.get(url, headers=headers)

# 检查请求是否成功
if response.status_code == 200:
    # 直接查找符合条件的链接
    pattern = r'https?://tv\.laohu\.cool/[^\s]+\.jar'
    matches = re.findall(pattern, response.text)
    
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
                    # 指定保存文件的名称为lh.txt
                    save_filename = 'lh.txt'
                    full_save_path = os.path.join(save_dir, save_filename)

                    # 检查目录是否存在，如果不存在则创建
                    if not os.path.exists(save_dir):
                        os.makedirs(save_dir)

                    # 检查文件是否存在
                    if os.path.exists(full_save_path):
                        cover_input = input(f"文件 {full_save_path} 已存在，是否覆盖？按回车键覆盖，输入2取消: ")
                        if cover_input == '2':
                            print("您选择了不覆盖文件。")
                            continue  # 继续处理下一个链接
                        elif cover_input != '':
                            print("输入无效，未保存文件。")
                            continue  # 继续处理下一个链接

                    # 将响应内容写入文件，自动覆盖同名文件
                    with open(full_save_path, 'wb') as file:
                        file.write(post_response.content)  # 使用response.content来获取二进制内容
                    print(f"文件已保存为{full_save_path}")
                elif user_input == '2':
                    print("您选择了不保存文件。")
                else:
                    print("输入无效，未保存文件。")
            else:
                print(f"请求失败，状态码：{post_response.status_code}")
    else:
        print("未找到符合条件的链接。")
else:
    print(f"请求失败，状态码: {response.status_code}")