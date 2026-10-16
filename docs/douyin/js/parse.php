<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

if (empty($_GET['url'])) {
    echo json_encode(['success' => false, 'message' => '缺少url参数']);
    exit;
}

$shortUrl = $_GET['url'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $shortUrl);
// 模拟一个更真实的手机浏览器 User-Agent
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // 追踪重定向
curl_setopt($ch, CURLOPT_AUTOREFERER, true);
// ====== 关键修改：取消 NOBODY，必须下载内容流，否则抖音不给重定向 ======
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

curl_exec($ch);
$realUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL); // 获取最终长链接
curl_close($ch);

if ($realUrl && $realUrl !== $shortUrl) {
    echo json_encode(['success' => true, 'url' => $realUrl]);
} else {
    echo json_encode(['success' => false, 'message' => '追踪重定向失败，仍为原链接', 'url' => $realUrl]);
}
