#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#当用pyroid3打开文件时，保存文件路径与脚本路径一致，已设置保存路径/sdcard/传输文件/OK影视/脚本/。则只需要更改就好。反之，直接点击脚本运行，保存目录为手机根目录
import os
import requests
from urllib.parse import urlparse

def get_original_url(url):
    try:
        headers = {
    'User-Agent': 'okhttp/5.0.0-alpha.14'  # 将User-Agent设置为'okhttp/5.0.0-alpha.14'
}
        response = requests.get(url, headers=headers)
        print(f"状态码: {response.status_code}")
        print(f"响应内容: {response.text}")
        if response.history:
            redirect_url = response.url
            print(f"重定向URL: {redirect_url}")  # 打印重定向URL
            return redirect_url
        else:
            return url
    except Exception as e:
        print(f"发生错误: {e}")
        return None
        
def extract_filename_base(domain):
    # 找到最后一个点的位置
    last_dot_index = domain.rfind('.')
    # 如果存在最后一个点，返回最后一个点之前的部分作为文件名的基础部分
    return domain[:last_dot_index] if last_dot_index != -1 else domain

def write_url_to_file(url, filename_base, counter):
    try:
        # 构建完整的文件路径
        directory = "/sdcard/传输文件/OK影视/脚本/"
        if not os.path.exists(directory):
            os.makedirs(directory)  # 如果目录不存在，则创建目录
        filename = os.path.join(directory, f"{filename_base}_{counter}.txt")        
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(url)
        print(f"URL 已写入到文件：{filename}")
        return True
    except Exception as e:
        print(f"无法将 URL 写入文件: {e}")
        return False

def print_report(input_url, original_url, write_success, filename_base, counter):
    print("\n--- 结果报告 ---")
    print(f"输入的URL: {input_url}")
    print(f"真实URL: {original_url}")
    if write_success:
        print(f"真实URL已成功写入文件：{filename_base}_{counter}.txt")
    else:
        print("未选择写入文件或写入失败。")

def main():
    counter = 1  # 初始化文件序号
    while True:
        url = input("输入URL: ")
        original_url = get_original_url(url)
        
        parsed_url = urlparse(url)
        domain = parsed_url.netloc  # 获取域名部分
        print(f"主机名（Host）: {domain}")  # 打印主机名
        
        # 如果URL没有'/'路径，则从域名中提取文件名的基础部分
        if not parsed_url.path:
            filename_base = extract_filename_base(domain)
        else:
            # 如果URL有'/'路径，则从路径中提取文件名的基础部分
            filename_base = parsed_url.path.split('/')[-1] if parsed_url.path else 'original_url'
        
        if not filename_base:
            filename_base = 'original_url'
        
        # 如果filename_base包含点，去除扩展名
        if '.' in filename_base:
            filename_base = filename_base.rsplit('.', 1)[0]  # 去除最后一个扩展名
        
        print(f"获取到的真实URL: {original_url}")
        write_choice = input("是否将真实URL写入文件? 输入回车写入，输入2不写入: ")
        write_success = False
        if write_choice == '':  # 输入回车
            write_success = write_url_to_file(original_url, filename_base, counter)
        elif write_choice == '2':  # 输入2
            write_success = False  # 不写入文件
        else:
            print("无效的输入，请重新运行脚本并选择正确的选项。")
                    
        print_report(url, original_url, write_success, filename_base, counter)
        
        continue_choice = input("是否继续输入URL? 输入1继续，输入2结束: ")
        if continue_choice == '2':
            print("脚本运行结束。")
            break
        counter += 1

if __name__ == "__main__":
    main()