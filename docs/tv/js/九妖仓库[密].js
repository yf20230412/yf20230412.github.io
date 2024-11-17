var rule = {
  title: '91仓库',
  host: 'https://kd1f21jq-2dei-bs.91cangku29.buzz',
  url: '/type/fyclass/fypage',
  searchUrl: '/search/**/n/fypage',
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: '国产传媒&日本&国产&韩国&欧美&动画&91精选&当前热门&本月最热&本月收藏&上月热门&国产视频&中文字幕&国产&日本有&日本无&欧美无&强乱&制服诱惑&直播主播&激情动漫&明星换脸&抖阴视频&女明星&网-曝-门&理三级&AV解说&S调教&萝莉少女&极品媚黑&女同恋&玩偶姐姐&人系列',//静态分类名称拼接
   class_url: '158&180&181&159&182&160&376&388&389&390&391&328&329&330&331&332&333&334&335&336&337&338&339&340&343&345&346&347&348&349&350&351&353',//静态分类标识拼接
  play_parse: true,
  lazy: '',
  limit: 6,
  推荐: '',
  double: true,
  一级: 'body&&.stui-vodlist__item;a&&title;img&&src;;a&&href',
  二级: {
    title: '',
    img: '',
    desc: '',
    content: '',
    tabs: '',
    lists: 'body&&.group-box',
  },
  搜索: '.stui-vodlist&&li;a&&title;img&&src;;a&&href',
}