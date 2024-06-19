var rule = {
    title: '网飞猫[优]',
    host: 'https://www.ncat1.app',
    // url: '/show/fyclass-----2-fypage.html',
    url: '/show/fyclass-fyfilter-fypage.html',
    filter_url: '{{fl.类型}}-{{fl.地区}}-{{fl.语言}}-{{fl.年份}}-{{fl.排序}}',
    searchUrl: '/search?k=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    //class_parse: '#nav-swiper&&.nav-swiper-slide;a&&Text;a&&href;/(\\w+).html',
    //cate_exclude: 'Netflix|今日更新|专题列表|排行榜',
    class_name:'连续剧&电影&综艺记录&动漫&短剧',
    class_url:'2&1&4&3&6',
    tab_order: ['超清','4K(高峰不卡)','蓝光','极速蓝光'],
    tab_rename:{'超清':'🌺风言锋语88🌺超清','4K(高峰不卡)':'🌺风言锋语88🌺4K'},
    play_parse: true,
    lazy: '',
    limit: 20,
    推荐: '.section-box:eq(2)&&.module-box-inner&&.module-item;*;*;*;*',
    double: false,
    一级: '.module-box-inner&&.module-item;.v-item-title:eq(-1)&&Text;img&&data-original;.v-item-bottom&&span&&Text;a&&href',
    二级: {
        title: '.detail-title&&Text;.detail-tags&&a:eq(-2)&&Text',
        img: '.detail-pic&&img&&data-original',
        desc: '.detail-info-row-main:eq(-2)&&Text;.detail-tags&&a&&Text;.detail-tags&&a:eq(1)&&Text;.detail-info-row-main:eq(1)&&Text;.detail-info-row-main&&Text',
        content: '.detail-desc&&Text',
        tabs: '.source-item-label',
        lists: '.episode-list:eq(#id) a',
    },
    搜索: '.search-result-list&&a;.title&&Text;*;.search-result-item-header&&Text;a&&href;.desc&&Text',
    图片替换: 'https://www.ncat1.app=>https://vres.a357899.cn',
    预处理: $js.toString(() => {
        let html = request(rule.host);
        let scripts = pdfa(html, 'script');
        let img_script = scripts.find(it => pdfh(it, 'script&&src').includes('rdul.js'));
        if (img_script) {
            let img_url = img_script.match(/src="(.*?)"/)[1];
            //console.log(img_url);
            let img_html = request(img_url);
            let img_host = img_html.match(/'(.*?)'/)[1];
            log(img_host);
            rule.图片替换 = 'https://www.ncat1.app=>' + img_host;
        }
    }),
    filter: 'H4sIAAAAAAAAA+2Zz08bRxTH/xefOdgGtTi3HlqpUpVLe6hURREHV4qa0kN/qFWEZLANxhBsEDFx7AIpGEyCf0CQY9bY/md2Ztf/RWf95r0ZR+3LtqGRqviC+LzvzOzs7Nt531k/isQid755FPku+VvkTsS76In9jchMZHHh+6TNvyw8/Dk5briowiJbH6XrQVhBZGkGoneTP3378MGvOnz3068+++Lzr0kV66cyndWiBtJKVRVBDYC0fN3tV1EDQM3LXZgxNaAml4syVdKaBtLSebnyDDUAGjPf8vovcEwA0k63xXUPNQAac+XcK23jmAB0D7U1008Daas7o/IZagA0Zu6p66zjmADUb2tVFC6xHwBphWP/iNYagLRmRzgN1ABQc28O/WZbaxpoLo0Td3CIcwEw2qaf2ydtDLRmBw1vfQ3XDMB6tt5uzzzbAEjLDL2XNdQAUPOXN0XV0ZqGpXuBCmksqm2x6Zg0Jg6TxuL4dFRexUXoNkSlr0PYYnRSlt3WRAsdMg+gLa8Hk2NAiJZlsKWCuCwAtJx7NVk9x+UEoGsfnJl+GmhZNi6MpoHGfPXEaBpotoPXRtNA2uO2cE5QAzBjtu0x23Y/t3s9on4a6N6390W2i/cOQNd7feXXhng9AJMuh3JjqB4GZQwyXXWY8fp7skQPh5jmnCmoDiKHb5xhatHaVSj3OtiC2Np2RHtXZPFNMUxPojb0CirVy/gwiOkqg1dwXdehjcgO0T1nO24PtzENdqr7rYZfT5lUJw6V6pW+ao+DA9BNXh4bTYOVaEbTYCWv0TRYyWs0DVaCWv0Awi6CuL5ye33rfUcOswjxaHxOx8b/WvFZE5+143ETj9vxmInH7HjUxKMUj0XH0zwiLRa9r/4kqEH0zQbRoEHUNEhMNoglEtH76o9pMP9mg/mgwbxpICtXcg9fhUD7ODGxsHJrRzgFs7DEkwvr9W5EMYdXMaNXU7KEL0ncDntpfNJmXf1WRuRw350LpnFvRvX6b8yJpjDmhDMZnHHhjARrFrjizZghrrBzhoczJ0FhovvTEMYMceaEMzVBQaPraQhjQNSWZ56RhjBGkDNfo3RfdFdwLgC3bUAoHLllA8LZhH9rPTgLwVkP1l681ShxJoMzJ9PCOS2cH3DhnH1PhTNfl6llefNy4hxnQqFO/9wpkPsywGzebKHkCh5X1JgTqSzue+dU0AFCGQimaHMnZ5UH/vMUagCkVfKyjFVFQxjj4fUK1rEMgPodPhcV2mQAUPtk8YFKK5Dgf8rMYVGtPW53AHRUcy5Fo4g7PwBtd7/vyKe40hpMOd9Qa0jlfAxhLMJfWqDb+mbAlc23l/N3+1rwbmZg+s1g+s1gan1snlqf/7n1mbst6+M5L0T/CaYzAGnVA9dxvFOqwcQ0t2bb9NZAWuZCFI5Mb8OhDBP36Z8xTNznfa/SFUe0OQHQbPMrXqWJUwUwJffvP/1zBo2zBl8mF378YVFrGmie3M8zjGHiDJosP3NvaEcFmP6cMC0j0zLyIZeRj/55GTFh+ymPUqv+H5R6AJTqu1XRxBOLBppVuajON5jqANTvbOh38tgPgK639tjbPcDrAYQpK+yv28zJij3fMudw9tdt7myf7Yhm2rySAbz3zFEpsvQnK+G0IDwhAAA=',
    一级f: `js:
    let urls = [
    'https://www.ncat1.app/show/1-----1-1.html',
    'https://www.ncat1.app/show/2-----1-1.html',
    'https://www.ncat1.app/show/3-----1-1.html',
    'https://www.ncat1.app/show/4-----1-1.html',
    'https://www.ncat1.app/show/6-----1-1.html',
    ];
    let filters = {};
    pdfa = jsp.pdfa;
    pdfh = jsp.pdfh;
    for(let url of urls){
    let fclass = url.match(/show\\/(\\d+)-/)[1];
    console.log(fclass);
    let html = request(url);
    let tabs = pdfa(html, '.filter-row');
    let data = [];
    for (let tab of tabs) {
        let title = pdfh(tab, 'strong&&Text').replace(':','');
        let lis = pdfa(tab, 'a');
        let _map = {key: title, name: title};
        let value = [];
        for (let li of lis) {
            let n = pdfh(li, 'a&&Text').trim();
            let v=n;
            if(/全部|地区|类型/.test(n)){
                v = '';
            }else if(/综合/.test(n)){
                v = '1';
            }else{
                v = pdfh(li,'a&&href');
                try {
                    v = v.match(/-(.*?)1-1\.html/)[1].replace(/-/g,'');
                }catch (e) {
                    v = v.match(/-(.*?)-1\.html/)[1].replace(/-/g,'');
                }
                v = decodeURIComponent(v);
            }
            value.push({
                'n': n, 'v': v
            });
        }
        _map['value'] = value;
        data.push(_map);
    }
    filters[fclass] = data;
    }
    VODS = [filters];
    console.log(gzip(JSON.stringify(filters)));
    `,
}