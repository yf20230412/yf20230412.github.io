
# 在与脚本同一目录下输入一个input.html的文件,在同目录下生成一个output.md文件
import html2text

# 读取HTML文件
with open('input.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# 转换为Markdown
markdown_content = html2text.html2text(html_content)

# 保存为Markdown文件
with open('output.md', 'w', encoding='utf-8') as file:
    file.write(markdown_content)