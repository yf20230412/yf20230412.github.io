var rule = {
    title:'千百视频[密]',
    host:'https://www.qlu5.cc/',
    url: '/vodtype/fyclass-fypage.html',
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_name: '国产传媒&国产自拍&网曝流出&主播系列&日韩 AV & AV 解说 &欧美精品&次元动漫&麻豆传媒&天美传媒&精东影业&果冻传媒', //静态分类名称拼接
    class_url: '25&20&26&21&22&24&23&27&35&37&38&39', //静态分类标识拼接
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '',
    double: true,
    一级: '.content-list&&li;a&&title;img&&data-original;.note&&Text;a&&href',
    二级: '*',
    搜索: 'content-list&&li;a&&title;img&&data-original;.note&&Text;a&&href',
}