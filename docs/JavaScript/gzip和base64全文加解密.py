# 运行环境：python3;需要下载Pydroid3-权限插件
# coding: utf-8
# File  : drpy解密与加密.py
# 功能描述：该脚本提供文件的gzip加密、gzip解密、base64解码和Base64编码功能。
#           脚本会提示用户输入文件路径和选择操作类型。
# Author: 小鱼
# Date  : 2024/07/10
#当用pyroid3打开文件时，保存文件路径与脚本路径一致，反之，直接点击脚本运行，保存目录为手机根目录

#  搜索🅰️default_dir自定义输入目录
# 🅱️由于权限问题，python3可能无法运行中自定义输入输出目录

import base64  # 导入base64模块，用于Base64编码和解码
import gzip  # 导入gzip模块，用于gzip压缩和解压缩
import os  # 导入os模块，用于处理文件和目录
import time  # 导入time模块，用于生成时间戳

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

# 根据操作类型处理文件的函数
def process_file(input_path, operation,output_path=None):
    try:
        with open(input_path, 'rb') as file:  # 以二进制模式读取文件
            original_content = file.read()

        processed_content = None  # 初始化处理后的内容
        operation_type = ""  # 初始化操作类型

        # 根据用户选择的操作类型处理文件
        if operation == '1':  # gzip加密
            processed_content = gzip_compress_and_base64_encode(original_content)
            operation_type = "gzip加密"
        elif operation == '2':  # gzip解密
            processed_content = gzip_decompress_and_base64_decode(original_content)
            operation_type = "gzip解密"
        elif operation == '3':  # base64解码
            with open(input_path, 'r', encoding='utf-8') as file:  # 以文本模式读取文件
                original_content = file.read()
            processed_content = base64_decode(original_content)
            operation_type = "base64解码"
        elif operation == '4':  # Base64编码
            with open(input_path, 'r', encoding='utf-8') as file:  # 以文本模式读取文件
                original_content = file.read()
            processed_content = base64_encode(original_content)
            operation_type = "Base64编码"

        # 生成输出文件名，包含操作类型和时间戳
        timestamp = time.strftime("%m%d%H%M%S")
        output_filename = f"{os.path.splitext(os.path.basename(input_path))[0]}_{operation_type}_{timestamp}{os.path.splitext(input_path)[1]}"
        output_path = os.path.join(os.path.dirname(input_path), output_filename)

        # 将处理后的内容写入新文件
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(processed_content)

        print(f"处理后的内容已写入到 '{output_path}'")

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

def main():
    """主函数，用于处理用户输入和文件操作。"""
    default_dir = '/storage/emulated/0/风言锋语88/风言锋语/脚本💯👿/'  # 默认目录
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
        file_path = os.path.join(user_dir, input("请输入要运行的文件名：").strip())
        if not os.path.isfile(file_path):
            print(f"错误：文件 '{file_path}' 不存在。")
            continue

        operation = input("请输入操作类型（gzip加密 '1'，gzip解密 '2'，Base64解码 '3'，Base64编码 '4'）：")
        while operation not in ['1', '2', '3', '4']:
            print("无效的操作类型，请重新输入。")
            operation = input("请输入操作类型（gzip加密 '1'，gzip解密 '2'，Base64解码 '3'，Base64编码 '4'）：")

        output_path = get_custom_output_path(file_path)  # 获取用户自定义的输出路径

        process_file(file_path, operation, output_path)  # 处理文件

        if not continue_running():
            print("程序结束。")
            break

if __name__ == "__main__":
    main()