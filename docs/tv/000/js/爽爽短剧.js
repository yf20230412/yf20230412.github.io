var rule = {
    title: '爽爽短剧',
    host: 'https://ssdj.cc',
    url: '/tag/fyclass/page/fypage/',
    searchUrl: 'https://ssdj.cc/search/**/page/fypage/',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    class_name: '言情类&奇幻/穿越类&都市/现实类&动作/复仇类',
    class_url: '甜宠&穿越&都市&复仇',
    filter: 'H4sIAAAAAAAAA5WTyU7CUBSG36VrnoBXMSxYdKUSF2pCSJMiMjgAaojgkGqAJhS1AipKK+Flenvbt7DlDC3u2NzkO/P5c25JkZ1HYT8r2Z2SsqsWlaxyWDxQlYxSyO+rEYlGTU7diI/ze0fqOqwQm82PsH8dmxPQMuCTrYnnDoKR7leqGLFhojjRHv6P2zBxPZgQKwGQz3NmSTYC17fnwnmjygDkC7tjYd2jD4F8UQ3/9Al9CFpOy2UUaa2C+fm2WmEWzg/Ac9SbskO9EHh+sy4WLmu8Bs6zXmVnRnkAKV2DQUrRGHi3Rk+aBu0GwDqbhrikfggpXzAdJ74YQJOwshQ/J9tqglk4P0DqfoRtJJcTA+82aXuOI88sWo+ZIqLJwu7IL1u+PsKgDRPHffWEtaIIAO6y+IzOkFoAsK9VE21SHgGUEMOm59a3VkKvBX26UoTk8r+TX4bAc0A3nAOAd7u78ssXtBsA5/06gV4VD4ZY3lB22pT8nhf/tivsavTyH0qZOO7djf4dRQDEemh/xQXOSFsEAAA=',
    headers: {
        'User-Agent': MOBILE_UA,
    },
    double: true,
    play_parse: true,
    lazy: $js.toString(() => {
        let html = jsp.pdfh(fetch(input), '.player-box&&script&&Html').replace(/\\|const playUrls =|;/g, '')
        input = JSON.parse(html).wwm3u8
    }),
    推荐: '.items-container;li;.thumb&&alt;.thumb&&src;.remarks&&Text;a&&href',
    一级: $js.toString(() => {
        let d = []
        input = `https://ssdj.cc/tag/${MY_FL.type || MY_CATE}/page/${MY_PAGE}/`
        let html = jsp.pdfa(fetch(input), '.container:eq(-2) li')
        html.forEach(it => {
            d.push({
                title: jsp.pdfh(it, 'h3&&Text'),
                desc: jsp.pdfh(it, '.remarks&&Text'),
                img: jsp.pd(it, 'img&&src'),
                url: jsp.pd(it, '.image-line&&href'),
            })
        })
        setResult(d)
    }),
    二级: {
        title: 'h1&&Text;.detail_list&&ul:eq(1)&&li&&a:eq(2)&&Text',
        img: '',
        desc: '',
        content: '.detail&&span&&Text',
        tabs: '.menu-item-1930',
        lists: '.swiper:eq(#id) a',
    },
    搜索: '.container li;.thumb&&alt;.thumb&&src;.remarks&&Text;a&&href',
}