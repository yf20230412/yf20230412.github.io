# 文件保存路径/storage/emulated/0/风言锋语88/风言锋语/
# 功能:支持任何tvbox加密文件的解密
# "User-Agent": "okhttp/5.0.0-alpha.14"
import requests
import random
import time
import base64
import os
import time
from datetime import datetime, timedelta
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad


# 尝试导入 json 模块
try:
    import json
except ImportError:
    json = None
# 尝试导入 json5 模块,相对于json能有效格式化注释
try:
    import json5
except ImportError:
    json5 = None

# ======================
# 网页请求相关函数
# ======================

# 设置User-Agent为okhttp/5.0.0-alpha.14
def get_webpage_source(url, timeout=10):
    # 请求超时时间，默认值为10秒
    headers = {
    #请求头包含了用户代理信息、可接受的内容类型、语言偏好、编码方式、连接保持和升级不安全请求的设置
        "User-Agent": "okhttp/5.0.0-alpha.14",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Proxy-Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1"
    }

    try:
        # 发送GET请求
        response = requests.get(url, headers=headers, timeout=timeout)
        # 检查请求是否成功
        response.raise_for_status()
        print(f"\n状态码: {response.status_code}")
        print(f"\n链接: {response.url}") 
        # 返回网页的HTML源码
        return response.text                
    except requests.RequestException as e:
        print(f"\n请求失败：{e}")
        return None

def save_to_file(content, file_path="/storage/emulated/0/风言锋语88/风言锋语/"):
    if content:
        # 获取当前的北京时间
        beijing_time = datetime.utcnow() + timedelta(hours=8)  # UTC+8
        filename = os.path.join(file_path, f"接口_{beijing_time.strftime('%Y_%H%M%S')}.json")

        # 确保目录存在
        try:
            os.makedirs(file_path, exist_ok=True)
        except Exception as e:
            print(f"创建目录时出错: {e}")
            return

        try:
            with open(filename, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"\n网页源码已保存到文件 （/风言锋语88/风言锋语/目录查看🔎）文件名为：{filename}")
        except Exception as e:
            print(f"\n保存文件时出错: {e}")
    else:
        print("\n没有内容可保存")


# ======================
# 解密相关函数
# ======================
def is_garbled(text):
    if not text:
        return False #为空,函数直接返回 `False`，表示没有乱码

    # 定义允许的字符范围（包括空格、制表符、换行符等常见字符）
    allowed_chars = {' ', '\t', '\n', '\r'}  # 可以根据需要扩展

    # 去除开头的空格和换行
    text = text.lstrip()

    # 检查是否以｛ 开头
    if text.startswith('｛ '):
        return False #函数直接返回 `False`，表示没有乱码

    # 检查前5个字符是否有乱码
    for char in text[:5]:
        if (ord(char) < 32 and char not in allowed_chars) or ord(char) > 126:
            return True #函数直接返回 `True`，表示有乱码

    # 检查是否以BM开头
    if text.startswith('BM'):
        return True #函数直接返回 `True`，表示有乱码

    return False #函数直接返回 `False`，表示没有乱码


def process_garbled_text(text):
    """
    处理包含乱码的文本
    :param text: 包含乱码的文本
    :return: 处理后的文本
    """
    # 从末尾开始向前查找 '**'
    index = text.rfind('**')
    if index == -1:
        print("\n未找到 '**' 标记，解密失败。")
        return text  # 返回原始文本
    # 提取 '**' 后面的所有内容
    base64_data = text[index + 2:]
    try:
        # Base64解码
        decoded_bytes = base64.b64decode(base64_data)
        # 按UTF-8编码规则解码成字符串
        return decoded_bytes.decode('utf-8')
    except Exception as e:
        print(f"\n解码失败：{e}")
        return text  # 返回原始文本

def aes_decrypt(ciphertext, key, iv):
    """
    使用AES-CBC模式解密
    :param ciphertext: 密文
    :param key: 密钥
    :param iv: 偏移量
    :return: 解密后的明文
    """
    try:
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted = unpad(cipher.decrypt(ciphertext), AES.block_size)
        return decrypted.decode('utf-8')
    except Exception as e:
        print(f"\n解密失败：{e}")
        return None

def process_aes_encrypted_text(text):
    """
    处理AES加密的文本
    :param text: 加密后的文本
    :return: 处理后的文本
    """
    # 1. 检查是否以2423开头
    if not text.startswith("2423"):
        print("\n未以2423开头，无法进行解密。")
        return text
    
    # 2. 提取密钥
    key_start = 4  # 2423的长度是4
    key_end = text.find("2324", key_start, key_start + 50)
    if key_end == -1:
        print("\n未找到2324，无法提取密钥。")
        return text
    hex_key = text[key_start:key_end]
    
    # 🍎将十六进制字符串转换为普通字符串
    try:
        key_str = bytes.fromhex(hex_key).decode('utf-8')
    except Exception as e:
        print(f"\n转换密钥失败 😂：{e}")
        return text
    
    # 计算需要补零的数量
    padding_length = 16 - len(key_str)
    if padding_length > 0:
        key_str += '0' * padding_length
    elif padding_length < 0:
        key_str = key_str[:16]  # 截断到16个字符
    
    # 🍎将字符串转换回字节
    key = key_str.encode('utf-8')
    
    # 3. 提取IV
    iv_hex = text[-26:]
    
    # 🍎将十六进制字符串转换为普通字符串
    try:
        iv_str = bytes.fromhex(iv_hex).decode('utf-8')
    except Exception as e:
        print(f"\n转换IV失败：{e}")
        return text
    
    # 计算需要补零的数量
    padding_length = 16 - len(iv_str)
    if padding_length > 0:
        iv_str += '0' * padding_length
    elif padding_length < 0:
        iv_str = iv_str[:16]  # 截断到16个字符
    
    # 🍎将字符串转换回字节
    iv = iv_str.encode('utf-8')
    
    # 4. 提取密文
    ciphertext_start = key_end + 4  # 2324的长度是4
    ciphertext_end = len(text) - 26
    ciphertext_hex = text[ciphertext_start:ciphertext_end]
    
    # 将十六进制字符串转换为字节
    try:
        ciphertext = bytes.fromhex(ciphertext_hex)
    except Exception as e:
        print(f"\n转换密文失败：{e}")
        return text
    
    # 5. 解密
    decrypted_text = aes_decrypt(ciphertext, key, iv)
    if decrypted_text:
        return decrypted_text
    else:
        print("\n解密失败。")
        return text

# ======================
# JSON格式化处理
# ======================
def format_json_content(text):
    """
    尝试格式化文本为JSON，支持处理含注释的非标准JSON
    :param text: 输入的文本
    :return: 格式化后的文本
    """
    # 尝试标准JSON解析
    try:
        data = json.loads(text)
        formatted = json.dumps(data, indent=2, ensure_ascii=False)
        return formatted
    except json.JSONDecodeError:
        pass
    except Exception as e:
        pass

    # 尝试json5解析（如果可用）
    try:
        import json5
        data = json5.loads(text)
        formatted = json.dumps(data, indent=2, ensure_ascii=False)
        return formatted
    except ImportError:
        pass
    except Exception as e:
        pass

    # 自定义简单缩进处理
    def simple_indent(text):
        indent_level = 0
        result = []
        indent_str = '  '
        in_string = False
        escape = False
        for char in text:
            if char == '"' and not escape:
                in_string = not in_string
            if char == '\\' and in_string:
                escape = not escape
            else:
                escape = False

            if not in_string:
                if char in '{[':
                    result.append(char)
                    indent_level += 1
                    result.append('\n' + indent_str * indent_level)
                    continue
                elif char in '}]':
                    indent_level = max(indent_level - 1, 0)
                    result.append('\n' + indent_str * indent_level)
                    result.append(char)
                    continue
                elif char == ',':
                    result.append(char)
                    result.append('\n' + indent_str * indent_level)
                    continue
                elif char == ':':
                    result.append(': ')
                    continue
            result.append(char)
        return ''.join(result)

    # 尝试自定义缩进处理
    try:
        return simple_indent(text)
    except Exception as e:
        return text
    
# ======================
# 主程序逻辑
# ======================    
if __name__ == "__main__":
    # 目标网页URL
    url = input("请输入目标网页的URL：")
    # 获取网页源码
    webpage_source = get_webpage_source(url)
    
    if webpage_source:
        # 判断是否包含乱码
        if is_garbled(webpage_source):
            print("\n检测到网页源码存在加密🔐，正在解密📝...")
            # 处理乱码
            processed_text = process_garbled_text(webpage_source)
            if processed_text:
                # 询问用户是否查看解密后的内容
                while True:
                    view_choice = input("\n-----✅✅ 解密成功 🎉🎉----- \n是否查看解密后的网页内容？(y/n)：")
                    if view_choice.lower() == 'y':
                        print("\n以下是解密后的网页内容：\n")
                        formatted_text = format_json_content(processed_text)
                        print(formatted_text)
                        webpage_source = processed_text
                        break
                    elif view_choice.lower() == 'n':
                        print("\n跳过查看解密后的网页内容。")
                        webpage_source = processed_text
                        break
                    else:
                        print("输入错误，请输入'y'或'n'。")
            else:
                print("\n 解密🔓-失败。")
        else:
            # 检查是否符合AES加密条件
            if webpage_source.startswith("2423"):
                print("\n检测到网页源码存在AES加密🔐，正在解密📝...")
                processed_text = process_aes_encrypted_text(webpage_source)
                if processed_text:
                    # 询问用户是否查看解密后的内容
                    while True:
                        view_choice = input("\n-----✅✅ AES解密成功 🎉🎉----- \n是否查看解密后的网页内容？(y/n)：")
                        if view_choice.lower() == 'y':
                            print("\n以下是解密后的网页内容：\n")
                            formatted_text = format_json_content(processed_text)
                            print(formatted_text)
                            webpage_source = processed_text
                            break
                        elif view_choice.lower() == 'n':
                            print("\n跳过查看解密后的网页内容。")
                            webpage_source = processed_text
                            break
                        else:
                            print("输入错误，请输入'y'或'n'。")
                else:
                    print("\nAES解密失败。")
            else:
                # 询问用户是否查看原始内容
                while True:
                    view_choice = input("\n\n是否查看获取的网页内容？(y/n)：")
                    if view_choice.lower() == 'y':
                        print("\n以下是获取的网页内容：")
                        formatted_text = format_json_content(webpage_source)
                        print(formatted_text)
                        break
                    elif view_choice.lower() == 'n':
                        print("\n跳过查看获取的网页内容。")
                        break
                    else:
                        print("输入错误，请输入'y'或'n'。")
        
        # 询问用户是否保存
        while True:
            save_choice = input(" \n是否要保留网页源码到文件？(y/n)：")
            if save_choice.lower() == 'y':
                formatted_text = format_json_content(webpage_source)
                # 保存内容去掉注释部分,格式化
                save_to_file(formatted_text)
                # 保存内容为原始响应内容,为格式化
                #save_to_file(webpage_source)
                break
            elif save_choice.lower() == 'n':
                print("\n未保存网页源码。")
                break
            else:
                print("输入错误，请输入'y'或'n'。")
        
    time.sleep(random.uniform(1, 5))  # 随机延迟1到5秒