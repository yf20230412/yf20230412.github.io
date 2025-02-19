from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import time
from datetime import datetime, timezone, timedelta
import binascii
import os

def generate_iv():
    # 获取当前时间的13位时间戳（毫秒级时间戳）
    timestamp = str(int(time.time() * 1000))
    # 补足到16位字符
    padded_timestamp = timestamp.ljust(16, '0')
    # 转换为16进制字符串
    hex_timestamp = binascii.hexlify(timestamp.encode()).decode()
    return padded_timestamp, hex_timestamp, timestamp

# 将时间戳转换为北京时间
def convert_timestamp_to_beijing_time(timestamp):
    # 将毫秒级时间戳转换为秒级时间戳
    timestamp_seconds = timestamp / 1000.0
    # 创建 UTC 时间
    utc_time = datetime.utcfromtimestamp(timestamp_seconds)
    # 创建北京时间（UTC+8）
    beijing_time = utc_time + timedelta(hours=8)
    return beijing_time

def get_user_key():
    while True:
        user_input = input("请输入密钥（不超过16个字符）：")
        if len(user_input) > 16:
            print("密钥长度不能超过16个字符，请重新输入！")
        else:
            # 如果密钥长度不足16个字符，用零补足
            padded_key = user_input.ljust(16, '0')
            # 转换为16进制字符串
            hex_key = binascii.hexlify(user_input.encode()).decode()
            return padded_key, hex_key

def get_plaintext():
    while True:
        choice = input("请选择加密内容输入方式：\n1. 直接输入要加密的内容 \n2. 输入加密文件路径 \n3. 指定加密文件 /凯速/9988.json \n>")
        if choice == "1":
            plaintext = input("直接输入要加密的内容：")
            return plaintext
        elif choice == "2":
            file_path = input("输入加密文件路径：")
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    plaintext = file.read()
                return plaintext
            else:
                print("文件不存在，请重新输入！")
        elif choice == "3":
            # 指定固定的文件路径
            file_path = "/storage/emulated/0/风言锋语88/凯速/9988.json"
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as file:
                    plaintext = file.read()
                return plaintext
            else:
                print(f"指定的文件不存在：{file_path}")
        else:
            print("无效的选择，请重新输入！")

def encrypt(plaintext, key, iv):
    # 将密钥和IV转换为字节
    key_bytes = key.encode()
    iv_bytes = iv.encode()
    
    # 创建AES加密器
    cipher = AES.new(key_bytes, AES.MODE_CBC, iv=iv_bytes)
    # 对明文进行PKCS7填充并加密
    ciphertext = cipher.encrypt(pad(plaintext.encode("utf-8"), AES.block_size))
    # 返回加密结果的16进制表示
    return binascii.hexlify(ciphertext).decode()

def save_to_file(content, file_name=None):
    if file_name is None:
        # 获取当前时间的分钟到秒
        current_time = time.strftime("%Y%m%d_%H%M%S", time.localtime())
        file_name = f"99.json"
    file_path = "/storage/emulated/0/风言锋语88/凯速/" + file_name
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
    print(f"加密结果已保存到文件：{file_path}")

# 主程序
if __name__ == "__main__":
    # 获取用户输入的明文内容
    plaintext = get_plaintext()
    # 获取用户输入的密钥
    key, hex_key = get_user_key()
    # 生成IV
    iv, hex_timestamp, timestamp = generate_iv()
    # 转换时间戳为北京时间
    beijing_time = convert_timestamp_to_beijing_time(int(timestamp))
    formatted_time = beijing_time.strftime("%Y-%m-%d %H:%M:%S")
    # 执行加密
    encrypted = encrypt(plaintext, key, iv)
    
    # 构造包含解锁密钥和偏移量加密内容
    output_content = f"2423{hex_key}2324{encrypted}{hex_timestamp}"
    
    print(f"密钥key: {key}")
    print(f"偏移量IV: {iv}")
    print(f"时间戳: {timestamp}")
    print(f"北京时间: {formatted_time}")
    #print(f"\n加密结果: {encrypted}")
    #print(f"包含密钥偏移量的加密结果: {output_content}")
    
    # 提示用户是否保存到文件
    save_choice = input("是否将包含密钥偏移量的加密结果保存到文件？(y/n): ").strip().lower()
    if save_choice == "y":
        save_to_file(output_content)
