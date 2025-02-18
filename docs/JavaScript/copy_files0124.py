# 运行逻辑:
	#将目标文件夹中的xiaoyu.txt复制到/github/box/jar/目录下
import shutil
import os

# 源文件路径
source_dir = "/storage/emulated/0/风言锋语88/风言锋语/jar/"
file_to_copy = "xiaoyu.txt"

# 目标目录路径
target_dirs = [
    #"/storage/emulated/0/github/api/jar/",
    "/storage/emulated/0/github/box/jar/"
]

# 复制文件
source_file = os.path.join(source_dir, file_to_copy)

if os.path.exists(source_file):
    for target_dir in target_dirs:
        target_file = os.path.join(target_dir, file_to_copy)
        
        # 如果目标目录不存在，则创建
        os.makedirs(target_dir, exist_ok=True)
        
        # 复制文件并覆盖已存在的文件
        shutil.copy(source_file, target_file)
        print(f"文件 {file_to_copy} 已复制到 {target_dir}")
else:
    print(f"文件 {file_to_copy} 不存在于源目录中")

print("复制完成")