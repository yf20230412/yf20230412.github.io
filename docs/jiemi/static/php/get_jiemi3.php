<?php
//没有AES-128-CBC解码功能
header("Access-Control-Allow-Origin: *"); // 允许跨域请求
header("Content-Type: text/html; charset=utf-8"); // 设置默认输出编码为UTF-8

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    if (empty($url)) {
        http_response_code(400); // Bad Request
        echo "URL is empty.";
        exit;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_USERAGENT, 'okhttp/3');  // 设置 User-Agent
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    // 自动跟随重定向
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);           // 最大重定向次数
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    ));

    // 忽略 SSL 证书验证（生产环境中不建议禁用）
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_ENCODING, ''); // 自动解压缩

    $response = curl_exec($ch);
    if ($response === false) {
        // 输出 CURL 错误信息
        echo "CURL Error: " . curl_error($ch);
        curl_close($ch);
        exit;
    }

    // 获取 HTTP 状态码
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    // 获取 Content-Type 响应头
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

    if ($httpCode != 200) {
        echo "HTTP Error: 状态代码 " . $httpCode . " returned.";
        curl_close($ch);
        exit;
    }

    // 根据 Content-Type 的字符编码转换响应内容
    if (strpos($contentType, 'charset=') !== false) {
        $charset = substr($contentType, strpos($contentType, 'charset=') + 8);
        $response = mb_convert_encoding($response, 'UTF-8', $charset);
    }

    // 去除响应体开头的空格
    $response = ltrim($response);               
    // 检查响应体开头是否包含乱码（前 20 个字符中是否包含非 ASCII 字符）
    $is_garbage = preg_match('/[^\x00-\x7F]/', substr($response, 0, 20));

    if ($is_garbage) {
         // 如果开头是乱码，提示用户
        //😍echo "检测到接口文本内容已加密。解密成功...\n";
        // 如果开头是乱码，执行从响应体末尾开始向前查找 '**' 的操作
        $start_index = strrpos($response, '**');
        if ($start_index === false) {        
            
            // 如果未找到 '**' 符号，直接输出原始内容
            //😍echo "未能找到“ ** ”标记。输出原加密文本内容:\n";
            echo $response;
            curl_close($ch);
            exit;
        }

        // 提取 '**' 后面的所有内容
        $text_after = substr($response, $start_index + strlen('**'));

        // 解码 Base64 文本
        $decoded_bytes = base64_decode($text_after, true);
        if ($decoded_bytes === false) {
            echo "Base64 解码失败。无效的 Base64 数据.\n";
            echo "要解码的文本: " . $text_after . "\n";
            curl_close($ch);
            exit;
        }
        // 去除注释行（以 // 开头，以 }, 或 ", 结尾的行）
        $decoded_text = preg_replace('/^\s*\/\/.*?[\},"]\s*$/m', '', $decoded_bytes);
                   
        // 尝试解析为 JSON
        $json_data = json_decode($decoded_text);
        if (json_last_error() === JSON_ERROR_NONE) {
            // 如果是有效的 JSON，格式化输出
            $formatted_json = json_encode($json_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            echo $formatted_json;
        } else {
            // 如果不是有效的 JSON，直接输出原始文本内容
            //😍echo "解密接口文本内容不是有效的JSON。输出解密后的接口文本内容：\n";
            echo $decoded_text;
        }
    } else {
        // 如果开头不是乱码，直接尝试解析为 JSON
        $json_data = json_decode($response);
        if (json_last_error() === JSON_ERROR_NONE) {
            // 如果是有效的 JSON，格式化输出
            $formatted_json = json_encode($json_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            echo $formatted_json;
        } else {
            // 如果不是有效的 JSON，直接输出原始内容
            //😍echo "接口文本内容不是有效的JSON，输出接口文本:\n";
            echo $response;
        }
    }

    curl_close($ch);
}
?>