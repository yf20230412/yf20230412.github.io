muban.mxpro.二级.title = 'h1&&Text;.module-info-tag&&Text';
muban.mxpro.二级.desc = '.module-info-item:eq(4)&&Text;;;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text';
muban.mxpro.二级.tabs = '#y-playList&&span';
muban.mxpro.二级.lists = '.module-play-list:eq(#id)&&a';
var rule = {
    title:'桃子影视', //原91free
    模板:'mxpro',
    host:'https://www.taozi007.com',
    "url": "/show/fyfilter.html",
    class_parse: '.navbar-items&&a[href*=type];a&&title;a&&href;(\\d+).html',
    lazy:$js.toString(()=>{
      var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        if(html.from!='ty'){
        if (/\\.m3u8|\\.mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        } else {
            url = unescape(base64Decode(url))
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        }
        }else{
        const key = {
        "words": [
            1447445076,
            2053404010,
            1884436806,
            1463969893
        ],
        "sigBytes": 16
        }
        const iv = {
            "words": [
                942945847,
                959918642,
                875967541,
                842610233
            ],
            "sigBytes": 16
        }
        eval(getCryptoJS)
    let data = CryptoJS.AES.decrypt(text, key, {
        'iv': iv
        }).toString(CryptoJS.enc.Utf8);
    let data_json = JSON.parse(data);
    let url = data_json.url;
    input = {
                jx: 0,
                url: url,
                parse: 0
            }
    }
}),
    推荐: '*',
    double: false, // 推荐内容是否双层定
    searchUrl:'/search/**----------fypage---.html',
    "filterable": 1,
    "filter": "H4sIAAAAAAAAA+2Y204bVxSG32WuqTQMkDS5y/l8PqfKRVQhNWqbSk1aqYqQSIxdQ4INiOC4NiE0OJAIgwGLwrjGL+M9M36LjNlr/Wu7LWjUkrSp5o7vW94z+zDM+jWPrG7r4BePrK/7f7IOWmp43kskrS7r/t1v+03+8e43P/Rv//B+WycXWomFtg7BGugiO1UMf0+WALWRhWa9yDUNXPPSL5ruMNUIuOanV2gCAhj3ZNGfGudxGjBuflxt1nicBswlNdHKv+W5aDDm6U/WZJ5tGLjTrtIGFSvqmWtsEHOkDZqbb+VTfHENXGu9yXsby1QjwLhsxdvc4nEasNCtjCrUeaEasEFrz6VGwLXg6YrUCDAuV/KKizxOA+Y581bGEWCeW79JjUDmUjHnUukYN1pR7hsepwHjhrLhTqk0n5cwVlJq+NmyP5znxYDlUF95TxvhMJwrM36RXG/WpriswTz2YLkcLAzKsYMjHXuhHv6eL67BOAapEeBoV+ekRoBjyNXVaE7KwsZBGWUNxgFLjcB4aIyaBuOAjZVoMLZQLSVkC9vQ8Z+zWW3W6sZ/DnOULXTs7s/Jbf9p+P3i95t+n/h9pu8T32f6XvG9pu8R32N6R7xj+m7x3aa3xdudG1POecujxsYw/2FjoM2NOUTiEMxhModhjpA5AnOUzFGYY2SOwRwncxzmBJkTMCfJnIQ5ReYUzGkyp2HOkDkDc5bMWZhzZM7BnCdzHuYCmQswF8lchLlE5hLMZTKXYa6QuQJzlcxVmGtkrsFcJ3Md5gaZGzA3ydyEuUXmFsxtMrdh7M8OkOt8ULzMhHKz8qCAOx8UL7feylWlGKqH98IBfPmm63qVyY76V/cePpBX0vKQSqc66g++/O77/vZc7nRZzp7Fhexc8JpbO0GUSNCanvBelNTjdZXg+XWoSHFkaV25eJFpwGt3ZNmvv+PXroYoMUaVfpbIQYAaNkYAtUxKZVe5pgFzqWVVcoPnogHnuDnrTXP8IcD+JZJentMEAe73PBXuKN9PA+5XH5c9I4jaI/9ZNEolw98jk21DlMjxd2PTbhFn90i1c4zZNVJNVcLUoaZneSg4jiB/iiAfOEo40uods9U70uods9U70uods9U70uqdjlZ/AD78838bYeBtWa9trteW9drmem1Zr22u15b12uZ6bVmvba7XlvWGf8aRyooj1acZqXr2KlK1O/3QjNH2Q8CrfJcvIn6iHMwOck0DrplZ8Mf4owUBamMv/UV8gdEgHX3nryzB2HSQ4XhHgGu+mlUFNAYNUeKXV3Ql1hDgfo2x8Nd8Pw1RoqaqhNtU5ftpMGulNaMWAvZzbqv5+y+8nxok7s2odAFxbxvkOVpV5TGOdBpwzcKIl3f5mhpkX1ZUI4d92YZ/PbaFUSwMXbyxGozuH+YB6f5tQG1xPgxdXNMQB6H4m4oVB5I4kMSB5GMEkt69CiStwWF/noMFQZSwEiw1gkqaX8UaMG6i7I2UeJwGeZkmvQ3+XkIgL+G15iY3VwK83rcyrdc8FwLU3Hdq6SXXNOB+hdVgmJsyAcZNznhVBC4N0hs3vHS26U5ILOlQ2Ifqr36NT4gA11h5Ejx+xqM17F1jL9SbLj6eaTA61o7fTv6yeUdMInFj36vGHn/hiANFHCisOFD8VwJFnxko4kc3fnQ/lUd34D3r+3paICUAAA==",
    "filter_url": "{{fl.类型}}-{{fl.地区}}-{{fl.排序}}-{{fl.剧情}}-{{fl.语言}}-{{fl.字母}}---fypage---{{fl.年份}}",
    "filter_def": {
        "1": {
            "类型": "1"
        },
        "2": {
            "类型": "2"
        },
        "3": {
            "类型": "3"
        },
        "4": {
            "类型": "4"
        },
        "5": {
            "类型": "5"
        }
    }
}