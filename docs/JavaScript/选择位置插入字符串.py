def read_file(file_name):
    try:
        with open(file_name, 'r', encoding='utf-8') as file:
            content = file.read()
        print(f"文件 '{file_name}' 读取成功，内容长度：{len(content)}字符。")
        return content
    except FileNotFoundError:
        print(f"错误：文件 '{file_name}' 未找到。")
        return ""
    except IOError as e:
        print(f"IO错误：读取文件 '{file_name}' 时发生错误 - {e}")
        return ""

def insert_after_all_occurrences(content, marker, insert_str):
    # 确保标记和插入字符串不为空
    if not marker or not insert_str:
        print("错误：标记字符串或插入字符串不能为空。")
        return content
    
    # 找到所有标记字符串的出现，并在每个标记后面插入新字符串
    start = 0
    while marker in content[start:]:
        end = content.find(marker, start)
        if end != -1:
            content = content[:end + len(marker)] + insert_str + content[end + len(marker):]
            start = end + len(marker) + len(insert_str)
        else:
            break  # 如果找不到标记，退出循环
    return content

def insert_string(file_name, marker, insert_str):
    try:
        content = read_file(file_name)
        if content:
            new_content = insert_after_all_occurrences(content, marker, insert_str)
            with open(file_name, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"文件 '{file_name}' 更新成功。")
        else:
            print(f"错误：无法更新空内容到文件 '{file_name}'。")
    except IOError as e:
        print(f"IO错误：写入文件 '{file_name}' 时发生错误 - {e}")

def main():
    file_name = input("请输入文件名：")
    marker = input("请输入用作插入位置的标记字符串：")
    insert_str = input("请输入要插入的字符串：")
    
    insert_string(file_name, marker, insert_str)

if __name__ == "__main__":
    main()