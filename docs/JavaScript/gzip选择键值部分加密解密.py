#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : drpy解密与加密.py
# 功能描述：输入文件名，在输入键名对文件部分加密解密gzip加密、gzip解密
#           脚本会提示用户输入文件路径和选择操作类型。
#
#当用pyroid3打开文件时，保存文件路径与脚本路径一致，反之，直接点击脚本运行，保存目录为手机根目录
#
# Author: 小鱼
# Date  : 2024/07/11

import base64  # 导入base64模块，用于Base64编码和解码
import gzip  # 导入gzip模块，用于gzip压缩和解压缩
import os  # 导入os模块，用于处理文件和目录
import time  # 导入time模块，用于生成时间戳
import json  # 导入json模块，用于处理JSON数据

# 对字节数据进行gzip压缩并Base64编码的函数
def gzip_compress_and_base64_encode(data):
    compressed = gzip.compress(data)  # 使用gzip模块压缩数据
    return base64.b64encode(compressed).decode('utf-8')  # 使用base64模块对压缩后的数据进行Base64编码

# 对Base64编码的gzip数据进行解码和解压缩的函数
def gzip_decompress_and_base64_decode(data):
    decompressed = base64.b64decode(data)  # 使用base64模块解码数据
    return gzip.decompress(decompressed).decode('utf-8', errors='ignore')  # 使用gzip模块对解码后的数据进行解压缩

# 对字符串进行Base64编码的函数
def base64_encode(data):
    return base64.b64encode(data.encode('utf-8')).decode('utf-8')  # 将字符串编码为Base64

# 对Base64编码的字符串进行解码的函数
def base64_decode(data):
    return base64.b64decode(data).decode('utf-8', errors='ignore')  # 将Base64编码的字符串解码为原始字符串

# 检查字符串是否是Base64编码
def is_base64_encoded(s):
    try:
        base64.b64decode(s)
        return True
    except Exception:
        return False

# 根据操作类型处理文件的函数
def process_file(input_path, operation, key_name=None, output_path=None):
    try:
        with open(input_path, 'rb') as file:
            original_content = file.read()

        if operation in ['1', '2']:
            if operation == '1':  # gzip加密
                processed_content = gzip_compress_and_base64_encode(original_content)
            elif operation == '2':  # gzip解密
                processed_content = gzip_decompress_and_base64_decode(original_content)       
        elif operation == '9':
            # 读取JSON数据
            with open(input_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            
            # 检查键名是否存在且是否全匹配
            keys_found = {key for item in data for key in item.keys()}
            if key_name not in keys_found:
                print(f"键名 '{key_name}' 在数据中不存在，请重新输入正确的键名。")
                return None  # 如果键名不存在，则返回None

            # 用户输入正确的键名后，提示用户选择操作
            operation_for_key = input(f"请输入要对键值 '{key_name}' 执行的操作类型（gzip加密 '1'，gzip解密 '2'）：")
            while operation_for_key not in ['1', '2']:
                print("无效的操作类型，请重新输入。")
                operation_for_key = input(f"请输入要对键值 '{key_name}' 执行的操作类型（gzip加密 '1'，gzip解密 '2'）：")

            # 执行用户选择的操作
            processed_data = []
            for item in data:
                if key_name in item:
                    original_value = item[key_name].encode('utf-8')
                    if operation_for_key == '1':
                        processed_value = gzip_compress_and_base64_encode(original_value)
                    elif operation_for_key == '2':
                        processed_value = gzip_decompress_and_base64_decode(original_value)
                    item[key_name] = processed_value
                processed_data.append(item)

            processed_content = json.dumps(processed_data, ensure_ascii=False, indent=4).encode('utf-8')
            operation_type = f"{key_name}键的处理"

            # 生成输出文件名和写入文件的逻辑
            timestamp = time.strftime("%m%d%H%M%S")
            output_filename = f"{os.path.splitext(os.path.basename(input_path))[0]}_{operation_type}_{timestamp}{os.path.splitext(input_path)[1]}"
            if output_path is None:
                output_path = os.path.join(os.path.dirname(input_path), output_filename)

            with open(output_path, 'wb') as file:
                file.write(processed_content)

            print(f"处理后的内容已写入到 '{output_path}'")
            return output_path  # 返回输出文件的路径

    except FileNotFoundError:
        print(f"文件未找到，请检查路径 '{input_path}' 是否正确。")
    except PermissionError:
        print(f"没有权限写入到 '{output_path}'。")
    except Exception as e:
        print(f"处理文件时发生错误: {e}")        
def continue_running():
    """询问用户是否继续程序运行，返回布尔值"""
    while True:
        user_input = input("是否继续程序运行？(y/n): ").strip().lower()
        if user_input in ['y', 'n']:
            return user_input == 'y'
        else:
            print("无效的输入，请输入 'y' 继续或 'n' 结束。")

def validate_path(path, default_dir):
    """验证输入的路径是否有效，如果为空则返回默认路径"""
    if path == "":
        return default_dir
    elif os.path.isdir(path) and (path.startswith("/storage/emulated/0/") or path.startswith("/sdcard/")):
        return path
    else:
        raise ValueError("输入的路径无效或不存在，请输入以 '/storage/emulated/0/' 或 '/sdcard/' 开头的路径。")

def get_custom_output_path(file_path):
    """获取用户自定义的输出路径，如果用户输入无效，则提示重新输入，否则使用原文件的目录"""
    while True:
        output_path_input = input("请输入自定义输出路径（留空则默认与原文件同一目录）: ").strip()
        if not output_path_input:
            return os.path.dirname(file_path)  # 使用原文件目录
        elif output_path_input.startswith("/storage/emulated/0/") or output_path_input.startswith("/sdcard/"):
            if os.path.exists(output_path_input):
                return output_path_input
            else:
                print(f"输入的路径 '{output_path_input}' 不存在，请重新输入。")
        else:
            print("输入的路径无效或不存在，请输入以 '/storage/emulated/0/' 或 '/sdcard/' 开头的路径。")

def continue_running():
    """询问用户是否继续程序运行，返回布尔值"""
    while True:
        user_input = input("是否继续程序运行？输入 '1'继续或'2'结束: ").strip().lower()
        if user_input in ['1', '2']:
            return user_input == '1'
        print("无效的输入，请输入 '1' 继续或 '2' 结束。")
        
# 主函数
def main():
    default_dir = '/storage/emulated/0/风言锋语88/风言锋语/脚本/'  # 默认目录
    max_attempts = 3  # 设置最大尝试次数为3次

    for _ in range(max_attempts):
        user_dir_input = input(f"请输入默认目录路径（直接回车则使用 '{default_dir}'）: ").strip()
        try:
            user_dir = validate_path(user_dir_input, default_dir)
            break
        except ValueError as e:
            print(e)
            if _ < max_attempts - 1:
                print(f"剩余尝试次数 {max_attempts - _ - 1}。")
            else:
                print("输入路径错误次数超过限制，程序将退出。")
                return

    while True:
        # 验证并获取用户目录路径
        for _ in range(max_attempts):
            user_dir_input = input(f"请输入默认目录路径（直接回车则使用 '{default_dir}'）: ").strip()
            try:
                user_dir = validate_path(user_dir_input, default_dir)
                break
            except ValueError as e:
                print(e)
                if _ < max_attempts - 1:
                    print(f"剩余尝试次数 {max_attempts - _ - 1}。")
                else:
                    print("输入路径错误次数超过限制，程序将退出。")
                    return

        # 循环直到用户正确输入文件名和操作类型
        while True:
            file_path = os.path.join(user_dir, input("请输入要运行的文件名：").strip())
            if not os.path.isfile(file_path):
                print(f"错误：文件 '{file_path}' 不存在。")
                continue

            operation = input("请输入操作类型（部分键名操作 '9'）：")
            while operation not in ['9']:
                print("无效的操作类型，请重新输入。")
                operation = input("请输入操作类型（部分键名操作 '9'）：")

            if operation == '9':
                # 循环直到用户输入正确的键名
                while True:
                    key_name = input("请输入要操作的键名：").strip()
                    with open(file_path, 'r', encoding='utf-8') as file:
                        data = json.load(file)
                    if any(key_name == key for items in data for key in items):
                        break  # 如果键名存在，跳出循环
                    else:
                        print(f"键名 '{key_name}' 在数据中不存在，请重新输入正确的键名。")

                output_path = process_file(file_path, operation, key_name=key_name)
                if output_path:
                    print(f"处理后的内容已写入到 '{output_path}'")

            # 询问用户是否继续运行程序
            if not continue_running():
                print("程序结束。")
                break

if __name__ == "__main__":
    main()