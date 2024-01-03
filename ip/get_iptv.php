
<?php
// Get the channel name from the request
$channel = $_POST["url"];

// Build the URL with the channel name
$url = "https://api.pearktrue.cn/api/tv/search.php?name=$channel";

// Initialize the output variable
$output = "";

// Get the source code of the URL
$page = 1;
do {
    $url_with_page = $url . "&page=$page";
    $source = file_get_contents($url_with_page);
    $json = json_decode($source, true);
    
    // Check if the response has an error code or message
    if (isset($json["code"]) && $json["code"] == 201) {
        break;
    } elseif (isset($json["msg"]) && $json["msg"] == "获取失败,当前页码无数据") {
        break;
    }
    
    // Add the source to the output
    $output .= $source;
    $page++;
} while (true);

// Find the data in the output
$pattern = '/\\{
            "videoname": "(.*?)",
            "updatetime": "(.*?)",
            "link": "(.*?)"
        },/';
preg_match_all($pattern, $output, $matches);

// Output the data
if (count($matches[0]) > 0) {
    for ($i = 0; $i < count($matches[0]); $i++) {
        echo "{$matches[1][$i]},{$matches[3][$i]}<br>";
    }
} else {
    echo "抱歉，我无法找到相关内容。";
}
?>