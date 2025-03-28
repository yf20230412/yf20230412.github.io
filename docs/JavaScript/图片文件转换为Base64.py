import base64

def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

# 原始图片路径，你需替换为实际图片路径
image_path = "/storage/emulated/0/github/yf20230412.github.io/docs/static/music/999.jpg"  
base64_result = image_to_base64(image_path)

# 保存的文件路径
save_path = "/storage/emulated/0/风言锋语88/风言锋语/base64_result.txt"
with open(save_path, 'w') as file:
    file.write(base64_result)

