<?php

header("Access-Control-Allow-Origin: *"); // 允许跨域请求
header("Content-Type: text/html; charset=utf-8"); // 设置默认输出编码为UTF-8


// 自定义简单缩进处理函数
function simple_indent($response) {
    $indent_level = 0;      // 当前缩进级别
    $result = '';           // 最终结果
    $in_string = false;     // 是否在字符串中
    $escape = false;        // 是否在转义字符中
    $skip_comment = false;  // 是否在跳过注释中
    $comment_type = '';     // 注释类型：'//' 或 '/*'

    for ($i = 0; $i < strlen($response); $i++) {
        $char = $response[$i];

        // 处理注释跳过逻辑
        if ($skip_comment) {
            if ($comment_type === '//') {
                // 单行注释：跳过到行尾
                if ($char === "\n" || $char === "\r") {
                    $skip_comment = false;  // 结束跳过
                    $comment_type = '';
                    // 添加换行符并保持当前缩进
                    $result .= "\n" . str_repeat('  ', $indent_level);
                }
                continue; // 跳过注释内容
            } elseif ($comment_type === '/*') {
                // 多行注释：检查结束标记
                if ($char === '*' && $i < strlen($response) - 1 && $response[$i + 1] === '/') {
                    $skip_comment = false;  // 结束跳过
                    $comment_type = '';
                    $i++; // 跳过 '/' 字符
                }
                continue; // 跳过注释内容
            }
        }

        // 处理字符串状态
        if ($char == '"' && !$escape) {
            $in_string = !$in_string; // 切换字符串状态
        }

        // 处理转义字符
        if ($in_string && $char == '\\') {
            $escape = !$escape; // 切换转义状态
        } else {
            $escape = false; // 退出转义状态
        }

        // 检测注释开始（仅在非字符串状态下）
        if (!$in_string && !$skip_comment) {
            if ($char === '/' && $i < strlen($response) - 1) {
                $next_char = $response[$i + 1];
                if ($next_char === '/') {
                    $skip_comment = true; // 开始单行注释
                    $comment_type = '//';
                    $i++; // 跳过第二个 '/'
                    continue;
                } elseif ($next_char === '*') {
                    $skip_comment = true; // 开始多行注释
                    $comment_type = '/*';
                    $i++; // 跳过 '*'
                    continue;
                }
            }
        }

        // 处理缩进（仅在非字符串且非注释状态）
        if (!$in_string && !$skip_comment) {
            if ($char == '{') {
                if ($indent_level > 0) { // 如果不是最外层的 '{'
                    // 遇到 '{' 增加缩进，并在前面加 4 个空格
                    $result .= '    ' . $char . "\n" . str_repeat('  ', ++$indent_level);
                } else {
                    // 最外层的 '{' 不加空格，只增加缩进
                    $result .= $char . "\n" . str_repeat('  ', ++$indent_level);
                }
                continue;
            } elseif ($char == '}') {
                // 遇到 '}' 减少缩进
                $result .= "\n" . str_repeat('  ', --$indent_level) . $char;
                continue;
            } elseif ($char == '[') {
                // 遇到 '[' 增加缩进
                $result .= $char . "\n" . str_repeat('  ', ++$indent_level);
                continue;
            } elseif ($char == ']') {
                // 遇到 ']' 减少缩进
                $result .= "\n" . str_repeat('  ', --$indent_level) . $char;
                continue;
            } elseif ($char == ',') {
                // 遇到 ',' 保持当前缩进
                $result .= $char . "\n" . str_repeat('  ', $indent_level);
                continue;
            } elseif ($char == ':') {
                // 遇到 ':' 添加空格
                $result .= ': ';
                continue;
            }
        }
        // 添加当前字符到结果
        $result .= $char;
    }
    return $result; // 返回最终结果
}


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
    curl_setopt($ch, CURLOPT_USERAGENT, 'okhttp/5.0.0-alpha.14');  // 设置 User-Agent
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    // 自动跟随重定向
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);           // 最大重定向次数
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Proxy-Connection' => 'keep-alive'
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
            // 如果是有效的 JSON，按 2 个空格格式化输出
            $options = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
            $formatted_json = json_encode($json_data, $options);
        // 使用 str_replace 函数将 4 个空格替换为 2 个空格
            $formatted_json = str_replace('    ', '  ', $formatted_json);
            echo $formatted_json;
        } else {
            // 如果不是有效的 JSON，尝试自定义缩进处理
            //😍echo "接口文本内容不是有效的 JSON，尝试格式化输出：\n";
            echo simple_indent($response);
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
        return $text;
    } catch (Exception $e) {
        return $hexString; // 如果无法解码为文本，则保留原16进制字符串
    }
}

// AES解密函数
function aesDecrypt($ciphertextHex, $key, $iv) {
    $ciphertext = hex2bin($ciphertextHex);

    try {
        $decryptedText = openssl_decrypt($ciphertext, "aes-128-cbc", $key, OPENSSL_RAW_DATA, $iv);
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
    // 限制范围为文本开头的50个字符
    $range = substr($encryptedText, 0, 50); // 提取开头50个字符
    if (preg_match('/2423([0-9a-fA-F]+)2324/', $range, $matches)) {
        $keyHex = $matches[1]; // 提取2423和2324之间的内容
        $keyText = hexToText($keyHex);
        $keyText = str_pad($keyText, 16, '0', STR_PAD_RIGHT);
        //😍echo "提取到的Key密码（文本字符串）: " . $keyText . "\n";
    } else {
        echo "未找到Key密码！\n";
        return;
    }
    

    // 2. 从文本末尾开始向前查找，截取最后26个字符
        $ivHex = substr($encryptedText, -26); // 从末尾开始向前取26个字符
        $ivText = hexToText($ivHex); // 将16进制转换为字符串
        $ivText = str_pad($ivText, 16, '0', STR_PAD_RIGHT);  // 不足16位用0补足
        //😍echo "提取到的IV偏移量（文本字符串）: " . $ivText . "\n";    

    // 3. 提取2324到倒数第26位之间的内容作为要解密的文本
    // 找到2324的起始位置
    $startPos = strpos($encryptedText, '2324');
    if ($startPos === false) {
        echo "未找到2324标记！\n";
        return;
    }

    // 计算倒数第26位的位置
    $endPos = strlen($encryptedText) - 26;

    // 提取从2324开始到倒数第26位之前的内容
    $ciphertextHex = substr($encryptedText, $startPos + 4, $endPos - ($startPos + 4));

    //输出提取到的加密内容
    //😍echo "提取到的加密内容: " . $ciphertextHex . "\n";


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
        // 如果是有效的 JSON，按 2 个空格格式化输出
        $options = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
        $formatted_json = json_encode($json_data, $options);
    // 使用 str_replace 函数将 4 个空格替换为 2 个空格
        $formatted_json = str_replace('    ', '  ', $formatted_json);
        echo $formatted_json;
    } else {
        // 如果不是有效的 JSON，尝试自定义缩进处理
        //😍echo "接口文本内容不是有效的 JSON，尝试格式化输出：\n";
        echo simple_indent($response);
}

}
?>
