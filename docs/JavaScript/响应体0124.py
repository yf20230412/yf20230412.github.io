#功能:输入链接,选择浏览器标识,发送post请求。显示所有响应体内容和响应头,以及缓存时间,解密,下载响应体内容保存文件到风言锋语文件夹
import requests
from datetime import datetime
import os
import base64
import json


def send_post_request():
    # 提示用户输入URL
    url = input("请输入URL: ")
    #url = "http://www.饭太硬.com/tv"
    
    # 提示用户选择User-Agent
    user_agent_prompt = """
请选择User-Agent标识类型：
  1. 直接回车选择 okhttp/5.0.0-alpha.14
  2. 选择 Chrome (Android)
  3. 选择 Chrome (PC)
  4. 选择 IE 11
  5. 选择 iPhone
请输入选项（默认1）："""
    user_agent_choice = input(user_agent_prompt).strip() or "1"  # 默认选择1（okhttp）
    
    # 根据用户选择设置User-Agent
    user_agents = {
        "1": "okhttp/5.0.0-alpha.14",
        "2": "Mozilla/5.0 (Linux; Android 11; M2007J1SC) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.117 Mobile Safari/537.36",
        "3": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
        "4": "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
        "5": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"
    }
    user_agent = user_agents.get(user_agent_choice, user_agents["1"])  # 默认选择okhttp
    
    # 定义请求头
    headers = {
        'Content-Type': 'application/json',
        'Accept': '',
        'User-Agent': user_agent
    }
    
    # 定义请求体（这里使用一个简单的JSON示例）
    data = {
        "key1": "value1",
        "key2": "value2"
    }
    
    try:
        # 发送Get请求并计算响应时间
        start_time = datetime.now()
        response = requests.get(url, json=data, headers=headers)
        end_time = datetime.now()
        
        # 计算响应时间（单位：秒）
        response_time = (end_time - start_time).total_seconds()
      

        # 获取HTTP状态码
        status_code = response.status_code

        # 获取响应头的所有内容
        response_headers = response.headers

        # 获取响应内容大小（字节）
        response_size = len(response.content)

        # 将响应内容大小转换为KB字节（KB）
        response_size_kb = response_size / 1024

        # 将响应内容大小转换为兆字节（MB）
        response_size_mb = response_size / (1024 * 1024)

        # 输出响应内容大小和响应时间
        print("\n响应内容大小:", response_size, "字节")
        print("响应内容大小（KB）:", round(response_size_kb, 3), "KB")  # 保留三位小数
        print("响应内容大小（MB）:", round(response_size_mb, 2), "MB")  # 保留两位小数
        print("响应时间:", response_time, "秒")

        # 输出HTTP状态码
        print("\nHTTP状态码:", status_code)

        # 输出响应头的所有内容（带中文提示）
        print("\n响应头内容（带中文提示）:")
        header_descriptions = {
            "Content - Type": "内容类型",
            "Content - Length": "内容长度",
            "Cache - Control": "缓存控制",
            "ETag": "资源标识符",
            "Expires": "资源过期时间",
            "Last - Modified": "最后修改时间",
            "Age": "资源缓存时间",
            "Vary": "缓存匹配头",
            "Server": "服务器信息",
            "Date": "响应日期"
        }
        for key, value in response_headers.items():
            description = header_descriptions.get(key, "未知字段")
            print(f"{key} ({description}): {value}")

        # 输出缓存相关的响应头信息（带中文提示）
        print("\n缓存相关响应头信息（带中文提示）:")
        cache_headers = {
            "Cache - Control": response_headers.get("Cache - Control", "未提供"),
            "ETag": response_headers.get("ETag", "未提供"),
            "Expires": response_headers.get("Expires", "未提供"),
            "Last - Modified": response_headers.get("Last - Modified", "未提供"),
            "Age": response_headers.get("Age", "未提供"),
            "Vary": response_headers.get("Vary", "未提供")
        }
        cache_descriptions = {
            "Cache - Control": "缓存控制策略",
            "ETag": "资源唯一标识符",
            "Expires": "资源过期时间",
            "Last - Modified": "资源最后修改时间",
            "Age": "资源从缓存中获取的时间",
            "Vary": "缓存匹配头"
        }
        for key, value in cache_headers.items():
            description = cache_descriptions.get(key, "未知字段")
            print(f"{key} ({description}): {value}")

        # 提示用户是否打印响应内容
        print_response_prompt = "\n是否打印响应内容？\n  1. 直接回车打印\n  2. 不打印并结束程序\n请输入选项（默认1）："
        print_response_choice = input(print_response_prompt).strip() or "1"  # 默认选择1（打印）

        if print_response_choice!= "2":
            print("\n响应体内容:")
            print(response.text)

            # 提示用户是否需要解密响应体内容
            decrypt_prompt = """
是否需要解密响应体后再下载保存？
  1. 直接回车表示无需解密，直接下载保存
  2. 解密后下载
请输入选项（默认1）："""
            decrypt_choice = input(decrypt_prompt).strip() or "1"  # 默认选择1（无需解密）

            # 循环确认选择
            while True:
                confirm_choice = input("请确认您的选择（输入相同的选项以确认）：").strip()

                # 检查输入有效性
                if confirm_choice in ["", "1", "2"]:  # 允许回车、1或2
                    break
                else:
                    print("无效选项，请输入回车、1 或 2。")

            # 再次确认输入
            second_choice = input("请再次确认您的选择：").strip()
            while confirm_choice!= second_choice:
                print("输入不一致，请重新选择。")
                confirm_choice = input("请确认您的选择（输入相同的选项以确认）：").strip()
                second_choice = input("请再次确认您的选择：").strip()

            # 定义保存路径
            save_directory = "/storage/emulated/0/风言锋语88/"
            if not os.path.exists(save_directory):
                os.makedirs(save_directory)

            # 生成文件名（强制改为.json后缀，命名到分钟）
            file_name = datetime.now().strftime("%d%H%M")

            if confirm_choice == "2":  # 解密逻辑
                # 解密流程
                print("\n开始解密响应体内容...")

                # 从响应体内容末尾开始向前查找 '**'
                response_text = response.text
                index = response_text.rfind("**")  # 从文本内容最后面开始向前查找,直至遇到第一个 "**"结束查找

                # 检查是否找到解密标识
                if index == -1:
                    print("未找到解密标识 '**'，无法解密。")
                    return

                # 提取 '**' 后面的所有内容
                encrypted_text = response_text[index + 2:].strip()
                print(f"加密文本: {encrypted_text}")  # 调试输出加密文本

                try:
                    # 对截取后的文本进行Base64解码
                    decoded_bytes = base64.b64decode(encrypted_text.encode("ascii"))
                    # 将解码后的字节按UTF-8编码规则解码成字符串
                    decoded_text = decoded_bytes.decode("utf-8")

                    # 打印解密后的内容
                    print("\n解密后的内容:")
                    print(decoded_text)

                    # 保存解密后的内容
                    file_path = os.path.join(save_directory, file_name + "_decoded.json")
                    with open(file_path, "w", encoding="utf-8") as file:
                        file.write(decoded_text)

                    print(f"解密后的内容已保存到：{file_path}")

                    # 尝试将解密后的内容解析为JSON并保存为JSON文件
                    try:
                        json_data = json.loads(decoded_text)
                        json_file_path = os.path.join(save_directory, file_name + ".json")
                        with open(json_file_path, "w", encoding="utf-8") as json_file:
                            json.dump(json_data, json_file, ensure_ascii=False, indent=4)
                        print(f"解密后的内容已保存为JSON格式到：{json_file_path}")
                    except json.JSONDecodeError as e:
                        print(f"解密后的内容不是有效的JSON，无法保存为JSON格式: {e}")
                except Exception as e:
                    print("解密失败:", e)
            else:
                # 直接保存响应体内容
                file_path = os.path.join(save_directory, file_name + ".json")
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(response.text)

                print(f"响应体内容已保存到：{file_path}")
        else:
            print("程序结束，未打印响应内容。")

    except requests.exceptions.RequestException as e:
        print("请求失败:", e)


if __name__ == "__main__":
    send_post_request()