<?php

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

    // 🚨根据 Content-Type 的字符编码转换响应内容
    if (strpos($contentType, 'charset=') !== false) {
        $charset = substr($contentType, strpos($contentType, 'charset=') + 8);
        $response = mb_convert_encoding($response, 'UTF-8', $charset);
    }

    // 去除响应体开头的空格
    $response = ltrim($response);               

    // 检查响应体是否以2423开头
    if (strpos($response, '2423') === 0) {
        // 执行AES解密逻辑
        aesDecryptLogic($response);
    } elseif (preg_match('/[^\x00-\x7F]/', substr($response, 0, 20))) {
        // 如果前20个字符包含非ASCII字符（乱码），执行乱码逻辑
        handleGarbageLogic($response);
    } else {
        // 如果不是乱码且不以2423开头，直接尝试解析为JSON
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

// 辅助函数：将16进制字符串转换为文本字符串
function hexToText($hexString) {
    try {
        $text = hex2bin($hexString);
        if ($text === false) {
            throw new Exception("无法解码为文本");
        }
        return mb_convert_encoding($text, "UTF-8", "UTF-8");
    } catch (Exception $e) {
        return $hexString; // 如果无法解码为文本，则保留原16进制字符串
    }
}

// AES解密函数
function aesDecrypt($ciphertextHex, $key, $iv) {
    $keyBytes = mb_convert_encoding($key, "UTF-8", "UTF-8");
    $ivBytes = mb_convert_encoding($iv, "UTF-8", "UTF-8");
    $ciphertext = hex2bin($ciphertextHex);

    try {
        $decryptedText = openssl_decrypt($ciphertext, "aes-128-cbc", $keyBytes, OPENSSL_RAW_DATA, $ivBytes);
        if ($decryptedText === false) {
            throw new Exception(openssl_error_string());
        }
        return $decryptedText;
    } catch (Exception $e) {
        return "解密失败: " . $e->getMessage();
    }
}

// AES解密逻辑
function aesDecryptLogic($encryptedText) {
    // 1. 从文本开头2423开始查找，直到第一次遇到2324，取中间的数字作为key
    // 限制范围为文本开头的30个字符
    $range = substr($encryptedText, 0, 30); // 提取开头30个字符
    if (preg_match('/2423([0-9a-fA-F]+)2324/', $range, $matches)) {
        $keyHex = $matches[1]; // 提取2423和2324之间的内容
        $keyText = hexToText($keyHex);
        $keyText = str_pad($keyText, 16, '0', STR_PAD_RIGHT);
        //😍echo "提取到的Key密码（文本字符串）: " . $keyText . "\n";
    } else {
        echo "未找到Key密码！\n";
        return;
    }
    

    // 2. 从文本末尾开始向前查找，找到倒数第26个字符开始的3137
    // 截取3137之后的所有内容作为IV
    $ivStartIndex = strlen($encryptedText) - 26;
    if (preg_match('/3137([0-9a-fA-F]+)/', substr($encryptedText, $ivStartIndex), $matches)) {
        $ivHex = $matches[1];
        $ivText = hexToText($ivHex);
        $ivText = str_pad($ivText, 16, '0', STR_PAD_RIGHT);
        //😍echo "提取到的IV偏移量（文本字符串）: " . $ivText . "\n";
    } else {
        echo "未找到IV偏移量！\n";
        return;
    }

    // 3. 提取2324到3137之间的内容作为要解密的文本
    if (preg_match('/2324([0-9a-fA-F]+)3137/', $encryptedText, $matches)) {
        $ciphertextHex = $matches[1];
        //😍echo "提取到的加密内容: " . $ciphertextHex . "\n";
    } else {
        echo "未找到加密文本！\n";
        return;
    }

    // 4. 解密并输出结果
    $decryptedText = aesDecrypt($ciphertextHex, $keyText, $ivText);
    echo  $decryptedText . "\n";
}

// 处理乱码逻辑
function handleGarbageLogic($response) {
    // 如果开头是乱码，执行从响应体末尾开始向前查找 '**' 的操作
    $start_index = strrpos($response, '**');
    if ($start_index === false) {        
        // 如果未找到 '**' 符号，直接输出原始内容
        //😍echo "未能找到“ ** ”标记。输出原加密文本内容:\n";
        echo $response;
        return;
    }

    // 提取 '**' 后面的所有内容
    $text_after = substr($response, $start_index + strlen('**'));

    // 解码 Base64 文本
    $decoded_bytes = base64_decode($text_after, true);
    if ($decoded_bytes === false) {
        echo "Base64 解码失败。无效的 Base64 数据.\n";
        echo "要解码的文本: " . $text_after . "\n";
        return;
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
}
?>
