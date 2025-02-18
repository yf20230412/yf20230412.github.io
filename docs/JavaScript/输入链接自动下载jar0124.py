import requests
import os

# 提示用户输入目标URL
url = input("请输入目标URL：")

# 发送POST请求或者get请求
response = requests.post(url)
print(f"状态码: {response.status_code}")  # 打印状态码

# 检查响应状态码
if response.status_code == 200:
    # 用户选择是否保存文件
    user_input = input("请求成功，按回车键保存文件，输入2不保存: ")

    if user_input == '':
        # 提取URL中的文件名
        filename = os.path.basename(url).split('?')[0].split('#')[0]  # 去除URL中的查询参数和片段
        file_extension = os.path.splitext(filename)[1]  # 获取文件扩展名
        save_filename = os.path.splitext(filename)[0] + '.txt'  # 替换文件扩展名为.txt

        # 指定保存文件的目录
        save_dir = "/storage/emulated/0/风言锋语88/风言锋语/jar/"

        # 检查目录是否存在，如果不存在则创建
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)

        # 将文件保存到指定的目录
        full_save_path = os.path.join(save_dir, save_filename)

        # 检查文件是否存在
        if os.path.exists(full_save_path):
            cover_input = input(f"文件 {full_save_path} 已存在，是否覆盖？按回车键覆盖，输入2取消: ")
            if cover_input == '2':
                print("您选择了不覆盖文件。")
                exit()  # 使用exit()来终止程序
            elif cover_input != '':
                print("输入无效，未保存文件。")
                exit()  # 使用exit()来终止程序

        # 将响应内容写入文件，自动覆盖同名文件
        with open(full_save_path, 'wb') as file:
            file.write(response.content)  # 使用response.content来获取二进制内容
        print(f"文件已保存为{full_save_path}")
    elif user_input == '2':
        print("您选择了不保存文件。")
    else:
        print("输入无效，未保存文件。")
else:
    print(f"请求失败，状态码：{response.status_code}")