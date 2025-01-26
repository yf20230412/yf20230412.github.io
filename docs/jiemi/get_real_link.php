<?php
// 获取前端传递的链接
$link = isset($_POST['link']) &&!empty($_POST['link'])? urldecode($_POST['link']) : '';
// 注释掉下面这行打印语句
// echo "接收到的链接: ". $link. "<br>"; 

if (empty($link)) {
    echo json_encode(array('success' => false,'message' => '链接不能为空', 'originalLink' => $link));
    exit;
}

// 初始化 cURL
$ch = curl_init();

// 设置 cURL 选项
curl_setopt($ch, CURLOPT_URL, $link);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // 自动跟随重定向
curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // 最大重定向次数
curl_setopt($ch, CURLOPT_USERAGENT, 'okhttp/3');
curl_setopt($ch, CURLOPT_HEADER, false);
// 忽略 SSL 证书验证
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 

// 执行 cURL 请求
$response = curl_exec($ch);

// 检查是否有错误
if (curl_errno($ch)) {
    $errorMessage = curl_error($ch);
    echo json_encode(array('success' => false,'message' => "cURL 错误: $errorMessage", 'originalLink' => $link));
} else {
    // 获取最终的真实链接
    $realLink = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    echo json_encode(array('success' => true,'realLink' => $realLink, 'originalLink' => $link));
}

// 关闭 cURL
curl_close($ch);
?>
