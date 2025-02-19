from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import re
from datetime import datetime, timedelta
import os

def hex_to_text(hex_string):
    """将16进制字符串转换为文本字符串"""
    try:
        text = bytes.fromhex(hex_string).decode('utf-8')
        return text
    except UnicodeDecodeError:
        return hex_string  # 如果无法解码为文本，则保留原十六进制字符串
    except ValueError as e:
        print(f"十六进制字符串无效: {e}")
        return ""

def aes_decrypt(ciphertext_hex, key, iv):
    """AES解密函数"""
    key_bytes = key.encode('utf-8')
    iv_bytes = iv.encode('utf-8')
    ciphertext = bytes.fromhex(ciphertext_hex)

    cipher = AES.new(key_bytes, AES.MODE_CBC, iv_bytes)
    try:
        decrypted_text = unpad(cipher.decrypt(ciphertext), AES.block_size)
        return decrypted_text.decode('utf-8')
    except Exception as e:
        return f"解密失败: {str(e)}"

def convert_timestamp_to_beijing_time(timestamp):
    """将时间戳转换为北京时间"""
    try:
        # 将时间戳转换为秒级时间戳
        timestamp_seconds = int(timestamp) / 1000.0
        # 创建 UTC 时间
        utc_time = datetime.utcfromtimestamp(timestamp_seconds)
        # 转换为北京时间（UTC+8）
        beijing_time = utc_time + timedelta(hours=8)
        return beijing_time.strftime("%Y-%m-%d %H:%M:%S")
    except ValueError:
        return "无效的时间戳"

def get_encrypted_text():
    """获取加密文本，支持手动输入、文件路径或指定文件"""
    while True:
        choice = input("请选择解密内容输入方式：\n1. 直接输入要解密的内容 \n2. 输入解密文件路径 \n3. 指定解密文件 /凯速/99.json \n>")
        if choice == "1":
            encrypted_text = input("直接输入要解密的内容：").strip()
            return encrypted_text
        elif choice == "2":
            file_path = input("输入解密文件路径：").strip()
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    encrypted_text = file.read().strip()
                return encrypted_text
            else:
                print("文件不存在，请重新输入！")
        elif choice == "3":
            file_path = "/storage/emulated/0/风言锋语88/凯速/99.json"
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    encrypted_text = file.read().strip()
                return encrypted_text
            else:
                print(f"指定的文件不存在：{file_path}")
        else:
            print("无效的选择，请重新输入！")

def save_to_file(content, save_path="/storage/emulated/0/风言锋语88/凯速/"):
    """将解密结果保存到指定路径"""
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"99解密.json"
    file_path = os.path.join(save_path, file_name)
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
    print(f"解密结果已保存到文件：{file_path}")

def main():
    # 获取加密文本
    encrypted_text = get_encrypted_text()
    #😍print(f"原始加密文本: {encrypted_text}\n")
    # 1. 从文本开头50个字符内,从2423开始查找，直到遇到第一个2324，取中间的数字作为key
    key_match = re.search(r"2423([0-9a-fA-F]+)2324", encrypted_text[:50])
    if key_match:
        key_hex = key_match.group(1)
        # 将16进制转换为文本字符串
        #😍print(f"提取到的Key（十六进制）: {key_hex}")
        key_text = hex_to_text(key_hex)
        # 如果不足16位，在后面补0
        key_text = key_text.ljust(16, '0')
        print(f"提取到的Key密码（文本字符串）: {key_text}")
    else:
        print("未找到Key密码！")
        return

    # 2. 从文本末尾截取最后26个字符作为iv_hex的值
    if len(encrypted_text) >= 26:
        iv_hex = encrypted_text[-26:]  # 截取最后26个字符
        #😍print(f"提取到的IV（十六进制）: {iv_hex}")
        # 将16进制转换为文本字符串
        iv_text = hex_to_text(iv_hex)
        # 如果不足16位，在后面补0
        iv_text = iv_text.ljust(16, '0')
        print(f"提取到的IV偏移量（文本字符串）: {iv_text}")
    else:
        print("文本长度不足26个字符，无法提取IV偏移量！")
        return
        
    # 提取从2324开始到文本倒数第26位数字之前的内容作为加密文本
    iv_start_index = len(encrypted_text) - 26  # 倒数第26位的起始位置
    ciphertext_match = re.search(r"2324([0-9a-fA-F]+)", encrypted_text[:iv_start_index])
    if ciphertext_match:
        ciphertext_hex = ciphertext_match.group(1)
        #😍print(f"提取到的加密文本（Hex格式）: {ciphertext_hex}")
    else:
        print("未找到加密文本！")
        return

    # 3. 提取iv_text的前13位字符作为时间戳
    timestamp_str = iv_text[:13]  # 提取前13位字符
    beijing_time = convert_timestamp_to_beijing_time(timestamp_str)
    print(f"提取到的时间戳: {timestamp_str}")
    print(f"提取到的时间戳对应的北京时间: {beijing_time}")

    # 4. 解密并输出结果
    decrypted_text = aes_decrypt(ciphertext_hex, key_text, iv_text)
    #😍print(f"解密后的文本内容: {decrypted_text}")

    # 保存解密结果到文件
    save_choice = input("是否将解密结果保存到文件？(y/n): ").strip().lower()
    if save_choice == "y":
        save_to_file(decrypted_text)

if __name__ == "__main__":
    main()
