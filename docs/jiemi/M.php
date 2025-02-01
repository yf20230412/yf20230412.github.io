<?php
header('Content-Type: application/json');

//允许跨域请求
header("Access-Control-Allow-Origin: *");

// 指定要获取的JSON数据的URL
$jsonUrl = 'https://cdn09022024.gitlink.org.cn/api/v1/repos/yf1688/box/raw/master/M.json'; // 替换为您的实际URL

// 获取JSON数据
$jsonData = file_get_contents($jsonUrl);

// 检查获取数据是否成功
if ($jsonData === FALSE) {
    echo json_encode(['error' => '无法获取数据']);
    exit;
}

// 输出获取到的JSON数据
echo $jsonData;
?>