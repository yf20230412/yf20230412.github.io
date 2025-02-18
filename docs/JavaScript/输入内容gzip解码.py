import gzip
import base64

encoded_data = "H4sIAKuvjGYC/0WSbXKCQAyGb8M5UQcRqgU7DFal2mllKBa/pqNjQexl2M1yi7LZpP2175PNJnkDEJ1FfbIgOqtsKLzMEv6HvH1aUN2UV1pdRA4c8Fwdb+oE1fCpneeowrG0M1Rx0qWiSl3xXWkle6G0Y4wt66bMdHV5PeijXedIsxSPfgHxFJ8MfNlfaAW9e7u4oxqdaATwD1BvUWVTatKNBVEF5GK9w3pfR3QS4CGLDO6PqOJjmxd45VyaKsbYbqxGK+w9em5KD6tXgXCuqOopVAlV7x6J/eDfD61IWwqOBNrYsuabWSqTggHHYMBJujl5zTgPQ7BR7w55UfNQ9h4IWnuo3nbs0mzNAKQrddpymjuBaE0gNpOmcjkt/1EXnyFKxP6V026lsv+ahmOxf+EbY5uammWaf8T4IzDOCeiDUxouiIGdcyZWN/ALQpTFCIwCAAA="

# 先进行 base64 解码
data = base64.b64decode(encoded_data)

try:
    # 进行 gzip 解压缩
    decompressed_data = gzip.decompress(data).decode('utf-8')
    print(decompressed_data)
except gzip.BadGzipFile:
    print("不是有效的 gzip 编码数据")
