from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import time
from datetime import datetime, timezone, timedelta
import binascii
import os
import re

# 公共工具函数
def hex_to_text(hex_string):
    """将16进制字符串转换为文本字符串"""
    try:
        text = bytes.fromhex(hex_string).decode('utf-8')
    except UnicodeDecodeError:
        text = hex_string
    return text

def convert_timestamp_to_beijing_time(timestamp):
    """将时间戳转换为北京时间"""
    try:
        timestamp_seconds = int(timestamp) / 1000.0
        utc_time = datetime.utcfromtimestamp(timestamp_seconds)
        beijing_time = utc_time + timedelta(hours=8)
        return beijing_time.strftime("%Y-%m-%d %H:%M:%S")
    except ValueError:
        return "无效的时间戳"

def save_to_file(content, save_path="/storage/emulated/0/风言锋语88/凯速/", prefix="解密"):
    """保存内容到指定路径"""
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"{prefix}_{current_time}.json"
    file_path = os.path.join(save_path, file_name)
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
    print(f"结果已保存到文件：{file_path}")

# 加密相关函数
def generate_iv():
    """生成初始化向量"""
    timestamp = str(int(time.time() * 1000))
    padded_timestamp = timestamp.ljust(16, '0')
    hex_timestamp = binascii.hexlify(timestamp.encode()).decode()
    return padded_timestamp, hex_timestamp, timestamp

def get_user_key():
    """获取用户输入的密钥"""
    while True:
        user_input = input("请输入密钥（不超过16个字符）：")
        if len(user_input) > 16:
            print("密钥长度不能超过16个字符，请重新输入！")
        else:
            padded_key = user_input.ljust(16, '0')
            hex_key = binascii.hexlify(user_input.encode()).decode()
            return padded_key, hex_key

def get_plaintext():
    """获取明文内容"""
    while True:
        choice = input("请输入要加密的内容（1）或输入加密文件路径（2）或指定加密文件 /凯速/99.json（3）：")
        if choice == "1":
            return input("请输入要加密的文本内容：")
        elif choice == "2":
            file_path = input("请输入文本文件路径：")
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    return file.read()
            print("文件不存在，请重新输入！")
        elif choice == "3":
            file_path = "/storage/emulated/0/风言锋语88/凯速/99.json"
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    return file.read()
            print(f"指定的文件不存在：{file_path}")
        else:
            print("无效的选择，请重新输入！")

def encrypt(plaintext, key, iv):
    """执行加密操作"""
    cipher = AES.new(key.encode(), AES.MODE_CBC, iv=iv.encode())
    ciphertext = cipher.encrypt(pad(plaintext.encode("utf-8"), AES.block_size))
    return binascii.hexlify(ciphertext).decode()

# 解密相关函数
def get_encrypted_text():
    """获取加密文本"""
    while True:
        choice = input("请输入要解密的内容（1）或输入解密文件路径（2）或指定解密文件 /凯速/77.jso（3）：")
        if choice == "1":
            return input("请输入要解密的内容：").strip()
        elif choice == "2":
            file_path = input("请输入文本文件路径：").strip()
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    return file.read().strip()
            print("文件不存在，请重新输入！")
        elif choice == "3":
            file_path = "/storage/emulated/0/风言锋语88/凯速/77.json"
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    return file.read().strip()
            print(f"指定的文件不存在：{file_path}")
        else:
            print("无效的选择，请重新输入！")

def aes_decrypt(ciphertext_hex, key, iv):
    """执行解密操作"""
    cipher = AES.new(key.encode(), AES.MODE_CBC, iv=iv.encode())
    try:
        return unpad(cipher.decrypt(bytes.fromhex(ciphertext_hex)), AES.block_size).decode()
    except Exception as e:
        return f"解密失败: {str(e)}"

# 主流程控制
def encryption_flow():
    """加密流程"""
    plaintext = get_plaintext()
    key, hex_key = get_user_key()
    iv, hex_timestamp, timestamp = generate_iv()
    
    encrypted = encrypt(plaintext, key, iv)
    output_content = f"2423{hex_key}2324{encrypted}{hex_timestamp}"
    #😍print(f"加密结果: {encrypted}")
    #😍print(f"包含密钥偏移量的加密结果: {output_content}")
    print(f"密钥: {key}\n偏移量: {iv}\n时间戳: {timestamp}")
    print(f"北京时间: {convert_timestamp_to_beijing_time(timestamp)}")
    
    if input("加密成功!是否保存加密结果？(y/n): ").lower() == 'y':
        save_to_file(output_content, prefix="加密")

def decryption_flow():
    """解密流程"""
    encrypted_text = get_encrypted_text()
    
    # 提取密钥
    key_match = re.search(r"2423([0-9a-fA-F]+)2324", encrypted_text)
    if not key_match:
        print("未找到密钥！")
        return
    key_text = hex_to_text(key_match.group(1)).ljust(16, '0')
    
    # 提取IV和时间戳
    if len(encrypted_text) < 26:
        print("文本长度不足！")
        return
    iv_hex = encrypted_text[-26:]
    iv_text = hex_to_text(iv_hex).ljust(16, '0')
    timestamp_str = iv_text[:13]
    
    # 提取加密内容
    ciphertext_match = re.search(r"2324([0-9a-fA-F]+)", encrypted_text[:-26])
    if ciphertext_match:
        ciphertext_hex = ciphertext_match.group(1)
        #😍print(f"提取到的加密文本（Hex格式）: {ciphertext_hex}")
    else:
        print("未找到加密文本！")
        return
    
    # 解密和输出
    decrypted = aes_decrypt(ciphertext_match.group(1), key_text, iv_text)    
    #😍print(f"解密结果: {decrypted}")
    print(f"密钥: {key_text}\n偏移量: {iv_text}")
    print(f"时间戳: {timestamp_str} -> {convert_timestamp_to_beijing_time(timestamp_str)}")
    if input("解密成功!是否保存解密结果？(y/n): ").lower() == 'y':
        save_to_file(decrypted, prefix="解密")

def main():
    """主菜单"""
    while True:
        print("\n===== AES加解密工具 =====")
        choice = input("请选择操作：\n1. 加密\n2. 解密\n3. 退出\n> ")
        
        if choice == '1':
            encryption_flow()
        elif choice == '2':
            decryption_flow()
        elif choice == '3':
            break
        else:
            print("无效的选择！")

if __name__ == "__main__":
    main()