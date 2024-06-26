var rule = {
  title: '路视频[密]',
  host: 'https://juwhnzlulemfg.buzz',
  url: '/video/type/fyclass/fypage.html',
  searchUrl: '/video/lookup/**/L/fypage.html',
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: '无码专区&制服诱惑&三级伦理&AI换脸&中文字幕&卡通动漫&欧美系列&美女主播&国产自拍&熟女人妻&萝莉少女&女同性爱&多人群交&美乳巨乳&强奸乱伦&抖阴视频&韩国主播&网红头条&网爆黑料&欧美无码&女优明星&SM调教&AV解说',//静态分类名称拼接
   class_url: '21&25&27&29&30&32&35&36&38&40&42&44&46&48&49&50&51&52&53&54&55&56&57',//静态分类标识拼接
  play_parse: true,
  lazy: '',
  limit: 6,
  推荐: '',
  double: true,
  一级: '.justify-content-start&&a;a&&Text;img&&src;;a&&href',
  二级: {
    title: '',
    img: '',
    desc: '',
    content: '',
    tabs: '',
    lists: '.table-bordered&&tr:not(:contains(播放地址))',
  },
  搜索: 'body&&figure;a&&title;img&&src;;a&&href',
}