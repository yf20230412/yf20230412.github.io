<?php

//允许跨域请求
header("Access-Control-Allow-Origin: *");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    if (!empty($url)) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'okhttp/3.');  // 设置 User-Agent
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    // 自动跟随重定向
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);           // 最大重定向次数
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
       'User-Agent: okhttp/3.',
       'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
   ));

        // 忽略 SSL 证书验证
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        $response = curl_exec($ch);
        if ($response === false) {
            // 输出 CURL 错误信息
            echo curl_error($ch);
        } else {
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($httpCode == 200) {
                // 检查响应内容是否为图片
                $content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
                if (strpos($content_type, 'image') !== false) {
                    // 如果是图片，保存为临时文件
                    $temp_image_path = tempnam(sys_get_temp_dir(), 'img');
                    file_put_contents($temp_image_path, $response);

                    // 将图片后缀改为 .txt
                    $temp_txt_path = $temp_image_path . '.txt';
                    rename($temp_image_path, $temp_txt_path);

                    // 读取 .txt 文件内容
                    $response = file_get_contents($temp_txt_path);

                    // 删除临时文件
                    unlink($temp_txt_path);
                }

                // 从响应体末尾开始向前查找 '**'
                $start_index = strrpos($response, '**');
                if ($start_index !== false) {
                    // 提取 '**' 后面的所有内容
                    $text_after = substr($response, $start_index + strlen('**'));

                    // 解码 Base64 文本
                    $decoded_bytes = base64_decode($text_after, true);
                    if ($decoded_bytes !== false) {
                        // 将解码后的字节数据转换为 UTF-8 字符串
                        $decoded_text = mb_convert_encoding($decoded_bytes, 'UTF-8', 'UTF-8');

                        // 去除注释行（以 // 开头，以 }, 或 ", 结尾的行）
                        $decoded_text = preg_replace('/^\s*\/\/.*?[\},"]\s*$/m', '', $decoded_text);

                        // 尝试解析为 JSON
                        $json_data = json_decode($decoded_text);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            // 如果是有效的 JSON，格式化输出
                            $formatted_json = json_encode($json_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                            echo $formatted_json;
                        } else {
                            // 如果不是有效的 JSON，直接输出原始文本内容
                            echo $decoded_text;
                        }
                    } else {
                        // 直接输出原始内容（Base64 解码失败）
                        echo $response;
                    }
                } else {
                    // 直接输出原始内容（未找到 '**' 符号）
                    echo $response;
                }
            } else {
                // 直接输出原始内容（HTTP 请求失败）
                echo $response;
            }
        }
        curl_close($ch);
    } else {
        // 直接输出错误信息（URL 为空）
        echo "URL is empty.";
    }
}
?>