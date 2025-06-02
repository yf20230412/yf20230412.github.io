function grin(tag) {
    var myField;
    tag = ' ' + tag + ' ';
    if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
        myField = document.getElementById('comment');
    } else {
        return false;
    }
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = tag;
        myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        myField.value = myField.value.substring(0, startPos) +
            tag +
            myField.value.substring(endPos, myField.value.length);
        cursorPos += tag.length;
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
    } else {
        myField.value += tag;
        myField.focus();
    }
}
/* ]]> */
<
/script> <
link href = "https://guihet.com/wp-content/themes/Kratos/inc/owo/OwO.min.css"
rel = "stylesheet"
type = "text/css" / >


    <
    div class = "commentshow" >
    <
    /div> < /
div >


    <
    script >
    jQuery('.comment-body').parent().hover(
        function() {
            jQuery(this).find('.useragent').show();
        },
        function() {
            jQuery(this).find('.useragent').hide();
        });
jQuery('.comment-body').parent().click(
    function() {
        jQuery(this).find('.useragent').show();
    }); <
/script> < /
article > <
    /section> < /
div > <
    /div> < /
div > <
    script >
    //监听控件Radio和checkbox状态改变事件
    var radioArr = document.getElementsByName("gender");
var radioTA = document.getElementById("qiandiv");
radioTA.style.display = "none";
for (var i = 0; i < radioArr.length; i++) {
    radioArr[i].addEventListener("click", function() {
        var checkboxTB = document.getElementsByName("radiokuozhan");
        if (this.value == "gens" && this.checked) {
            radioTA.style.display = "inline";
            for (var i = 0; i < checkboxTB.length; i++) {
                checkboxTB[i].checked = true;
            }
        } else {
            radioTA.style.display = "none";
            for (var i = 0; i < checkboxTB.length; i++) {
                if (checkboxTB[i].value == "group-title") {
                    checkboxTB[i].checked = true;
                } else {
                    checkboxTB[i].checked = false;
                }
            }
        }
    });
}
//TXT转M3U  
const mt = new Map([
    ["4K电影", "fmm"],
    ["AMC", "fmm"],
    ["ANIMAX", "fmm"],
    ["ANIMAXHD", "fmm"],
    ["AXN", "fmm"],
    ["AnimalPlanet", "fmm"],
    ["ArirangTV", "fmm"],
    ["BBCEarth", "fmm"],
    ["BBCLifestyle", "fmm"],
    ["BBCWORLDNEWSASIA", "fmm"],
    ["BLUEAntExtreme", "fmm"],
    ["BOOMERANG", "fmm"],
    ["BabyFirst", "fmm"],
    ["BabyTV", "fmm"],
    ["BeautifulLife", "fmm"],
    ["BloombergTV", "fmm"],
    ["BlueAntEntertainment", "fmm"],
    ["CBN幸福剧场", "fmm"],
    ["CBeebies", "fmm"],
    ["CCTV1", "fmm"],
    ["CCTV10", "fmm"],
    ["CCTV11", "fmm"],
    ["CCTV12", "fmm"],
    ["CCTV13", "fmm"],
    ["CCTV14", "fmm"],
    ["CCTV15", "fmm"],
    ["CCTV16", "fmm"],
    ["CCTV17", "fmm"],
    ["CCTV2", "fmm"],
    ["CCTV3", "fmm"],
    ["CCTV3D", "fmm"],
    ["CCTV4", "fmm"],
    ["CCTV4AME", "fmm"],
    ["CCTV4EUO", "fmm"],
    ["CCTV4K", "fmm"],
    ["CCTV4欧洲", "fmm"],
    ["CCTV4美洲", "fmm"],
    ["CCTV5+", "fmm"],
    ["CCTV5", "fmm"],
    ["CCTV6", "fmm"],
    ["CCTV7", "fmm"],
    ["CCTV8", "fmm"],
    ["CCTV8K", "fmm"],
    ["CCTV9", "fmm"],
    ["CETV1", "fmm"],
    ["CETV2", "fmm"],
    ["CETV3", "fmm"],
    ["CETV4", "fmm"],
    ["CGTN", "fmm"],
    ["CGTNDoc", "fmm"],
    ["CGTN俄语", "fmm"],
    ["CGTN法语", "fmm"],
    ["CGTN纪录", "fmm"],
    ["CGTN西语", "fmm"],
    ["CGTN记录", "fmm"],
    ["CGTN阿语", "fmm"],
    ["CHC动作电影", "fmm"],
    ["CHC家庭影院", "fmm"],
    ["CHC高清电影", "fmm"],
    ["CI罪案侦查频道", "fmm"],
    ["CNBC", "fmm"],
    ["CNBCASIA财经台", "fmm"],
    ["CNC", "fmm"],
    ["CNCartoon", "fmm"],
    ["CNN", "fmm"],
    ["CNNNews", "fmm"],
    ["CS", "fmm"],
    ["CTS", "fmm"],
    ["ChampionTV1", "fmm"],
    ["ChampionTV2", "fmm"],
    ["ChengSinTV", "fmm"],
    ["ChengTeTV", "fmm"],
    ["CinemaxHD", "fmm"],
    ["CosmosBuddhistMissionaryTV", "fmm"],
    ["CostarTV", "fmm"],
    ["CrimeInvestigation", "fmm"],
    ["CtiEntertainment", "fmm"],
    ["CtiVariety", "fmm"],
    ["DIVA", "fmm"],
    ["DMAX", "fmm"],
    ["DOX-CINEMA", "fmm"],
    ["DOXTV", "fmm"],
    ["DOX_YAQU", "fmm"],
    ["DOX_xinzhi", "fmm"],
    ["DW", "fmm"],
    ["DaliTV", "fmm"],
    ["Discovery-Asia", "fmm"],
    ["DiscoveryHD", "fmm"],
    ["Discovery科学", "fmm"],
    ["Disney", "fmm"],
    ["DisneyJunior", "fmm"],
    ["EBCDrama", "fmm"],
    ["EBCFinancialNews", "fmm"],
    ["EBCMovies", "fmm"],
    ["EBCNews", "fmm"],
    ["EBCSuper", "fmm"],
    ["EBCVariety", "fmm"],
    ["EBCWesternMovies", "fmm"],
    ["EBCYoYoTV", "fmm"],
    ["EFTV", "fmm"],
    ["ELEVENsports1", "fmm"],
    ["ELTA_Ent", "fmm"],
    ["ELTV生活英语台", "fmm"],
    ["EVE", "fmm"],
    ["EbcAsiaNews", "fmm"],
    ["EbcAsiaWeishi", "fmm"],
    ["FOXHD", "fmm"],
    ["FOXMOVIES", "fmm"],
    ["FOXSports", "fmm"],
    ["FOXSports2", "fmm"],
    ["FTV", "fmm"],
    ["FTVNews", "fmm"],
    ["FXHD", "fmm"],
    ["FoodNetwork", "fmm"],
    ["FoxFamilyMovies", "fmm"],
    ["FoxLive", "fmm"],
    ["FoxSports3", "fmm"],
    ["GDTV3", "fmm"],
    ["GDTV4", "fmm"],
    ["GDTV6", "fmm"],
    ["GDTV8", "fmm"],
    ["GDTVECO", "fmm"],
    ["GDTVENT", "fmm"],
    ["GDTVMOV", "fmm"],
    ["GDTVSHAO", "fmm"],
    ["GTVDramaHD", "fmm"],
    ["GTVEntertainment", "fmm"],
    ["GTVOneHD", "fmm"],
    ["GTVVarietyHD", "fmm"],
    ["GlobalNews", "fmm"],
    ["GoldSunTV", "fmm"],
    ["GoodTV", "fmm"],
    ["GoodTV2", "fmm"],
    ["G导视", "fmm"],
    ["HBLS", "fmm"],
    ["HBO", "fmm"],
    ["HBOFamily", "fmm"],
    ["HBOHD", "fmm"],
    ["HBOHits", "fmm"],
    ["HBOSignature", "fmm"],
    ["HGTV", "fmm"],
    ["HISTORY", "fmm"],
    ["HITS", "fmm"],
    ["HMC", "fmm"],
    ["HUBEI2", "fmm"],
    ["HUBEI3", "fmm"],
    ["HUBEI4", "fmm"],
    ["HUBEI5", "fmm"],
    ["HUBEI7", "fmm"],
    ["HUBEI8", "fmm"],
    ["HakkaTV", "fmm"],
    ["History2", "fmm"],
    ["HistoryChannel", "fmm"],
    ["History历史频道", "fmm"],
    ["HwaZanTV", "fmm"],
    ["IFUN动漫台", "fmm"],
    ["IHOT爱世界", "fmm"],
    ["IHOT爱体育", "fmm"],
    ["IHOT爱动漫", "fmm"],
    ["IHOT爱历史", "fmm"],
    ["IHOT爱喜剧", "fmm"],
    ["IHOT爱奇谈", "fmm"],
    ["IHOT爱娱乐", "fmm"],
    ["IHOT爱家庭", "fmm"],
    ["IHOT爱幼教", "fmm"],
    ["IHOT爱怀旧", "fmm"],
    ["IHOT爱悬疑", "fmm"],
    ["IHOT爱探索", "fmm"],
    ["IHOT爱旅行", "fmm"],
    ["IHOT爱时尚", "fmm"],
    ["IHOT爱极限", "fmm"],
    ["IHOT爱江湖", "fmm"],
    ["IHOT爱浪漫", "fmm"],
    ["IHOT爱猎奇", "fmm"],
    ["IHOT爱玩具", "fmm"],
    ["IHOT爱电竞", "fmm"],
    ["IHOT爱科学", "fmm"],
    ["IHOT爱科幻", "fmm"],
    ["IHOT爱经典", "fmm"],
    ["IHOT爱美食", "fmm"],
    ["IHOT爱解密", "fmm"],
    ["IHOT爱谍战", "fmm"],
    ["IHOT爱赛车", "fmm"],
    ["IHOT爱都市", "fmm"],
    ["IHOT爱院线", "fmm"],
    ["IHOT爱青春", "fmm"],
    ["IPTV3+", "fmm"],
    ["IPTV5+", "fmm"],
    ["IPTV6+", "fmm"],
    ["IPTV8+", "fmm"],
    ["IPTVEFEL", "fmm"],
    ["IPTV少儿动画", "fmm"],
    ["IPTV热播剧场", "fmm"],
    ["IPTV相声小品", "fmm"],
    ["IPTV经典电影", "fmm"],
    ["IPTV魅力时尚", "fmm"],
    ["J2", "fmm"],
    ["JETVariety", "fmm"],
    ["KMTV", "fmm"],
    ["LNSY1", "fmm"],
    ["LNTV-FINANCE", "fmm"],
    ["LNTV-SPORT", "fmm"],
    ["LNTV2", "fmm"],
    ["LNTV3", "fmm"],
    ["LNTV5", "fmm"],
    ["LNTV6", "fmm"],
    ["LNTV7", "fmm"],
    ["LNTV8", "fmm"],
    ["LSTIME", "fmm"],
    ["Lifetime", "fmm"],
    ["LoveNature", "fmm"],
    ["MAX极速汽车", "fmm"],
    ["MOMOkids", "fmm"],
    ["MTV", "fmm"],
    ["MTVLive", "fmm"],
    ["MyCinemaEurope", "fmm"],
    ["NEWTV东北热剧", "fmm"],
    ["NEWTV中国功夫", "fmm"],
    ["NEWTV军事评论", "fmm"],
    ["NEWTV军旅剧场", "fmm"],
    ["NEWTV古装剧场", "fmm"],
    ["NEWTV家庭剧场", "fmm"],
    ["NEWTV明星大片", "fmm"],
    ["NEWTV欢乐剧场", "fmm"],
    ["NEWTV武博世界", "fmm"],
    ["NEWTV海外剧场", "fmm"],
    ["NEWTV潮妈辣婆", "fmm"],
    ["NEWTV炫舞未来", "fmm"],
    ["NEWTV精品体育", "fmm"],
    ["NEWTV精品大剧", "fmm"],
    ["NEWTV精品纪录", "fmm"],
    ["NEWTV超级体育", "fmm"],
    ["NEWTV超级电影", "fmm"],
    ["NEWTV超级电视剧", "fmm"],
    ["NEWTV超级综艺", "fmm"],
    ["NEWTV金牌综艺", "fmm"],
    ["NEXTTVMovie", "fmm"],
    ["NEXTTVZonghe", "fmm"],
    ["NHK", "fmm"],
    ["NHKWorld", "fmm"],
    ["NOW新闻台", "fmm"],
    ["NextTVNews", "fmm"],
    ["NickJr", "fmm"],
    ["Nickelodeon", "fmm"],
    ["PiliPuppet", "fmm"],
    ["PublicTV", "fmm"],
    ["PublicTV2", "fmm"],
    ["PublicTV3HD", "fmm"],
    ["RTDoc", "fmm"],
    ["RTHK31", "fmm"],
    ["RTHK32", "fmm"],
    ["RTNews", "fmm"],
    ["SBN", "fmm"],
    ["SETCity", "fmm"],
    ["SETInews", "fmm"],
    ["SETNews", "fmm"],
    ["SETTaiwan", "fmm"],
    ["SETZonghe", "fmm"],
    ["SITV七彩戏剧", "fmm"],
    ["SITV劲爆体育", "fmm"],
    ["SITV极速汽车", "fmm"],
    ["SITV法治天地", "fmm"],
    ["SITV都市剧场", "fmm"],
    ["SITV金色学堂", "fmm"],
    ["SinDaTV", "fmm"],
    ["SinJiTVHD", "fmm"],
    ["SkyNews", "fmm"],
    ["Smart知识台", "fmm"],
    ["StarChineseMovies", "fmm"],
    ["StarMoviesHD", "fmm"],
    ["TACT", "fmm"],
    ["TOPTVHD", "fmm"],
    ["TRACESportStars", "fmm"],
    ["TRT-World", "fmm"],
    ["TVBJ2", "fmm"],
    ["TVBS", "fmm"],
    ["TVBS亚洲", "fmm"],
    ["TVBS新闻", "fmm"],
    ["TVBS欢乐", "fmm"],
    ["TVBS精采", "fmm"],
    ["TVBclassic", "fmm"],
    ["TVB明珠台", "fmm"],
    ["TVB星河", "fmm"],
    ["TVB翡翠台", "fmm"],
    ["TaiwanPlus", "fmm"],
    ["ThaiPBS", "fmm"],
    ["TienLiangTVHD", "fmm"],
    ["UniqueNews", "fmm"],
    ["UniqueUSTVHDUSTVHD", "fmm"],
    ["VOA美国之音", "fmm"],
    ["VideolandDrama", "fmm"],
    ["VideolandJapanese", "fmm"],
    ["VideolandMaxTV", "fmm"],
    ["VideolandMovies", "fmm"],
    ["VideolandOnTV", "fmm"],
    ["VideolandSportsHD", "fmm"],
    ["WETV", "fmm"],
    ["WHTV1", "fmm"],
    ["WHTV2", "fmm"],
    ["WHTV3", "fmm"],
    ["WHTV4", "fmm"],
    ["WHTV5", "fmm"],
    ["WHTV6", "fmm"],
    ["WHTV7", "fmm"],
    ["WarnerTV", "fmm"],
    ["XFBY", "fmm"],
    ["YANBIAN1", "fmm"],
    ["ZChannel", "fmm"],
    ["abcaus", "fmm"],
    ["afc", "fmm"],
    ["aljazeera", "fmm"],
    ["anhui", "fmm"],
    ["asiatravel", "fmm"],
    ["asiazonghe", "fmm"],
    ["beijing", "fmm"],
    ["beijingjishi", "fmm"],
    ["bestv", "fmm"],
    ["bingtuan", "fmm"],
    ["catchplay", "fmm"],
    ["cdtv1", "fmm"],
    ["cdtv2", "fmm"],
    ["cdtv3", "fmm"],
    ["cdtv4", "fmm"],
    ["cdtv5", "fmm"],
    ["cdtv6", "fmm"],
    ["channelnewsasia", "fmm"],
    ["channelv", "fmm"],
    ["chongqing", "fmm"],
    ["cinemaworld", "fmm"],
    ["cmusic", "fmm"],
    ["cnex", "fmm"],
    ["cqccn", "fmm"],
    ["daai", "fmm"],
    ["daai2", "fmm"],
    ["davinci", "fmm"],
    ["dianjingtiantang", "fmm"],
    ["discovery", "fmm"],
    ["diyicaijing", "fmm"],
    ["dongfang", "fmm"],
    ["dongnan", "fmm"],
    ["dox_juchang", "fmm"],
    ["dox_xinyi", "fmm"],
    ["dox_yijia", "fmm"],
    ["dox_yinglun", "fmm"],
    ["doxyinghua", "fmm"],
    ["dreamworks", "fmm"],
    ["eata_sports1", "fmm"],
    ["eata_sports3", "fmm"],
    ["elevensports2", "fmm"],
    ["elta_sports2", "fmm"],
    ["elta_yingju", "fmm"],
    ["elta_zonghehd", "fmm"],
    ["eltv", "fmm"],
    ["emeidianying", "fmm"],
    ["etoday", "fmm"],
    ["euronews", "fmm"],
    ["eurosport", "fmm"],
    ["eyelvyou", "fmm"],
    ["eyexiju", "fmm"],
    ["fashionone", "fmm"],
    ["fashiontv", "fmm"],
    ["fenghuangxianggang", "fmm"],
    ["fenghuangzhongwen", "fmm"],
    ["fenghuangzixun", "fmm"],
    ["fooldplanet", "fmm"],
    ["france24", "fmm"],
    ["ftv-1", "fmm"],
    ["ftv-taiwan", "fmm"],
    ["ftv-zongyi", "fmm"],
    ["gansu", "fmm"],
    ["gstv", "fmm"],
    ["gtv_youxi", "fmm"],
    ["guangdong", "fmm"],
    ["guangxi", "fmm"],
    ["guizhou", "fmm"],
    ["hebei", "fmm"],
    ["heilongjiang", "fmm"],
    ["henan", "fmm"],
    ["hkguojicaijing", "fmm"],
    ["hks", "fmm"],
    ["hongkong603", "fmm"],
    ["hongkongkai", "fmm"],
    ["huanghe", "fmm"],
    ["huanxiao", "fmm"],
    ["huanyucaijing", "fmm"],
    ["huanyuzonghe", "fmm"],
    ["huayi_yingju", "fmm"],
    ["huayimbc", "fmm"],
    ["hubei", "fmm"],
    ["hunan", "fmm"],
    ["ifun1", "fmm"],
    ["ifun2", "fmm"],
    ["ifun3", "fmm"],
    ["jiajiakt", "fmm"],
    ["jiangsu", "fmm"],
    ["jiangxi", "fmm"],
    ["jilin", "fmm"],
    ["jinwenjiang", "fmm"],
    ["jinyingjishi", "fmm"],
    ["jinyingkatong", "fmm"],
    ["jisuqiche", "fmm"],
    ["kaku", "fmm"],
    ["kangba", "fmm"],
    ["liaoning", "fmm"],
    ["longhuadonghua", "fmm"],
    ["loupe", "fmm"],
    ["luxetv", "fmm"],
    ["lvyou", "fmm"],
    ["mandi_japan", "fmm"],
    ["meilizuqiu", "fmm"],
    ["meiyamovie", "fmm"],
    ["mezzo", "fmm"],
    ["mtvlivehd", "fmm"],
    ["muzzikzz4000", "fmm"],
    ["my101", "fmm"],
    ["mykids", "fmm"],
    ["nanfang", "fmm"],
    ["natgeo", "fmm"],
    ["natgeowild", "fmm"],
    ["natlgeo", "fmm"],
    ["nhkworldp", "fmm"],
    ["ningxia", "fmm"],
    ["outdoor", "fmm"],
    ["qicaixiju", "fmm"],
    ["qinghai", "fmm"],
    ["quanjishi", "fmm"],
    ["roller", "fmm"],
    ["sansha", "fmm"],
    ["sctv2", "fmm"],
    ["sctv3", "fmm"],
    ["sctv4", "fmm"],
    ["sctv5", "fmm"],
    ["sctv7", "fmm"],
    ["sctv8", "fmm"],
    ["sctv9", "fmm"],
    ["sd_gonggong", "fmm"],
    ["sd_nongke", "fmm"],
    ["sd_qilu", "fmm"],
    ["sd_shaoer", "fmm"],
    ["sd_shenghuo", "fmm"],
    ["sd_tiyu", "fmm"],
    ["sd_yingshi", "fmm"],
    ["sd_zongyi", "fmm"],
    ["setxiju", "fmm"],
    ["shandong", "fmm"],
    ["shanghaidongfangyingshi", "fmm"],
    ["shanghaijishi", "fmm"],
    ["shanghaiwaiyu", "fmm"],
    ["shangshixinwen", "fmm"],
    ["shanxi", "fmm"],
    ["shanxi_", "fmm"],
    ["shenghuoshishang", "fmm"],
    ["shengming", "fmm"],
    ["shenzhen", "fmm"],
    ["sichuan", "fmm"],
    ["sport-golfplus", "fmm"],
    ["sport-sports_net", "fmm"],
    ["sport-trendsport", "fmm"],
    ["sport_tennis", "fmm"],
    ["sport_unlimited", "fmm"],
    ["sport_unlimited2", "fmm"],
    ["sports-golfch", "fmm"],
    ["sports_net_2", "fmm"],
    ["starmov", "fmm"],
    ["starmovieyule", "fmm"],
    ["starsports", "fmm"],
    ["taiwanxiju", "fmm"],
    ["tfc", "fmm"],
    ["tianjin", "fmm"],
    ["tlc", "fmm"],
    ["traceurban", "fmm"],
    ["travelchannel", "fmm"],
    ["tv5monde", "fmm"],
    ["tvN", "fmm"],
    ["tvbfinanceinformationchannel", "fmm"],
    ["viutv", "fmm"],
    ["wangluoqipai", "fmm"],
    ["weilaojingcai", "fmm"],
    ["weixin", "fmm"],
    ["wolvesvalley", "fmm"],
    ["wuxingtiyu", "fmm"],
    ["wxxw", "fmm"],
    ["xiamen", "fmm"],
    ["xindongman", "fmm"],
    ["xingfucai", "fmm"],
    ["xinjiang", "fmm"],
    ["xizang", "fmm"],
    ["xuandong", "fmm"],
    ["yangguangweishi", "fmm"],
    ["youman", "fmm"],
    ["youxiancaijingzixun", "fmm"],
    ["youxianxinwen", "fmm"],
    ["youxifengyun", "fmm"],
    ["yuanzhumin", "fmm"],
    ["yunnan", "fmm"],
    ["zgjt", "fmm"],
    ["zhejiang", "fmm"],
    ["zhujiang", "fmm"],
    ["七彩戏剧", "fmm"],
    ["三佳购物", "fmm"],
    ["三沙卫视", "fmm"],
    ["上海外语", "fmm"],
    ["上海教育", "fmm"],
    ["上海第一财经", "fmm"],
    ["上海都市", "fmm"],
    ["上视新闻", "fmm"],
    ["世界地理", "fmm"],
    ["东南卫视", "fmm"],
    ["东方卫视", "fmm"],
    ["东方影视", "fmm"],
    ["东方财经", "fmm"],
    ["东方购物", "fmm"],
    ["东莞新闻综合", "fmm"],
    ["东风卫视", "fmm"],
    ["中华特产", "fmm"],
    ["中华美食", "fmm"],
    ["中国交通", "fmm"],
    ["中国天气", "fmm"],
    ["中国教育1台", "fmm"],
    ["中国教育2台", "fmm"],
    ["中国教育3台", "fmm"],
    ["中国教育4台", "fmm"],
    ["中天新闻台", "fmm"],
    ["中学生", "fmm"],
    ["中视", "fmm"],
    ["中视新闻", "fmm"],
    ["中视新闻台", "fmm"],
    ["中视经典", "fmm"],
    ["中视菁采", "fmm"],
    ["中视购物", "fmm"],
    ["之江记录", "fmm"],
    ["乌兰察布", "fmm"],
    ["乌海新闻综合", "fmm"],
    ["乌海都市生活", "fmm"],
    ["乐游", "fmm"],
    ["书画", "fmm"],
    ["云南卫视", "fmm"],
    ["云南娱乐", "fmm"],
    ["云南影视", "fmm"],
    ["云南都市", "fmm"],
    ["五星体育", "fmm"],
    ["亚洲新闻", "fmm"],
    ["京视剧场", "fmm"],
    ["人间卫视", "fmm"],
    ["优优宝贝", "fmm"],
    ["优漫卡通", "fmm"],
    ["优购物", "fmm"],
    ["佛山公共", "fmm"],
    ["佛山影视", "fmm"],
    ["佛山综合", "fmm"],
    ["先锋乒羽", "fmm"],
    ["全纪实", "fmm"],
    ["公视", "fmm"],
    ["公视戏剧台", "fmm"],
    ["兴安", "fmm"],
    ["兵器科技", "fmm"],
    ["兵团卫视", "fmm"],
    ["内蒙古IPTV", "fmm"],
    ["内蒙古农牧", "fmm"],
    ["内蒙古卫视", "fmm"],
    ["内蒙古少儿", "fmm"],
    ["内蒙古文体娱乐", "fmm"],
    ["内蒙古新闻综合", "fmm"],
    ["内蒙古经济生活", "fmm"],
    ["内蒙古蒙语卫视", "fmm"],
    ["内蒙古蒙语文化", "fmm"],
    ["农林卫视", "fmm"],
    ["凤凰中文", "fmm"],
    ["凤凰卫视中文台", "fmm"],
    ["凤凰卫视电影台", "fmm"],
    ["凤凰卫视资讯台", "fmm"],
    ["凤凰卫视香港台", "fmm"],
    ["凤凰资讯", "fmm"],
    ["动漫秀场", "fmm"],
    ["劲爆体育", "fmm"],
    ["包头新闻综合", "fmm"],
    ["包头生活服务", "fmm"],
    ["包头经济频道", "fmm"],
    ["北京IPTV4K", "fmm"],
    ["北京体育休闲", "fmm"],
    ["北京卫视", "fmm"],
    ["北京影视", "fmm"],
    ["北京文艺", "fmm"],
    ["北京新闻", "fmm"],
    ["北京生活", "fmm"],
    ["北京纪实科教", "fmm"],
    ["北京财经", "fmm"],
    ["北京青年", "fmm"],
    ["半岛新闻", "fmm"],
    ["华视", "fmm"],
    ["华视新闻", "fmm"],
    ["华语影院", "fmm"],
    ["南方卫视", "fmm"],
    ["卡酷少儿", "fmm"],
    ["卫生健康", "fmm"],
    ["卫视中文", "fmm"],
    ["卫视中文台", "fmm"],
    ["厦门1", "fmm"],
    ["厦门2", "fmm"],
    ["厦门3", "fmm"],
    ["厦门卫视", "fmm"],
    ["发现之旅", "fmm"],
    ["台视", "fmm"],
    ["台视新闻", "fmm"],
    ["台视综合", "fmm"],
    ["台视财经", "fmm"],
    ["吉林卫视", "fmm"],
    ["呼伦贝尔", "fmm"],
    ["呼伦贝尔文化旅游", "fmm"],
    ["呼伦贝尔新闻综合", "fmm"],
    ["呼伦贝尔生活资讯", "fmm"],
    ["呼和浩特", "fmm"],
    ["呼和浩特影视娱乐", "fmm"],
    ["呼和浩特新闻综合", "fmm"],
    ["呼和浩特都市生活", "fmm"],
    ["咪咕体育", "fmm"],
    ["咪咕音乐", "fmm"],
    ["哈哈炫动", "fmm"],
    ["哒啵电竞", "fmm"],
    ["哒啵赛事", "fmm"],
    ["嘉佳卡通", "fmm"],
    ["四川乡村", "fmm"],
    ["四川卫视", "fmm"],
    ["四川妇女儿童", "fmm"],
    ["四川影视文艺", "fmm"],
    ["四川文化旅游", "fmm"],
    ["四川新闻", "fmm"],
    ["四川科教", "fmm"],
    ["四川经济", "fmm"],
    ["四海钓鱼", "fmm"],
    ["国学", "fmm"],
    ["增城电视台", "fmm"],
    ["大湾区卫视", "fmm"],
    ["大爱一台", "fmm"],
    ["大爱电视", "fmm"],
    ["天元围棋", "fmm"],
    ["天津卫视", "fmm"],
    ["央广购物", "fmm"],
    ["央视台球", "fmm"],
    ["央视高网", "fmm"],
    ["女性时尚", "fmm"],
    ["好享购物", "fmm"],
    ["宁夏卫视", "fmm"],
    ["安多卫视", "fmm"],
    ["安徽公共", "fmm"],
    ["安徽农业科教", "fmm"],
    ["安徽卫视", "fmm"],
    ["安徽国际", "fmm"],
    ["安徽影视", "fmm"],
    ["安徽经济生活", "fmm"],
    ["安徽综艺体育", "fmm"],
    ["家家购物", "fmm"],
    ["家庭理财", "fmm"],
    ["家有购物", "fmm"],
    ["寰宇新闻", "fmm"],
    ["山东体育", "fmm"],
    ["山东农科", "fmm"],
    ["山东卫视", "fmm"],
    ["山东少儿", "fmm"],
    ["山东教育", "fmm"],
    ["山东文旅", "fmm"],
    ["山东新闻", "fmm"],
    ["山东生活", "fmm"],
    ["山东综艺", "fmm"],
    ["山东齐鲁", "fmm"],
    ["山西卫视", "fmm"],
    ["山西影视", "fmm"],
    ["山西社会与法治", "fmm"],
    ["山西经济", "fmm"],
    ["山西黄河", "fmm"],
    ["岭南戏曲", "fmm"],
    ["巴彦淖尔影视娱乐", "fmm"],
    ["巴彦淖尔新闻综合", "fmm"],
    ["巴彦淖尔经济生活", "fmm"],
    ["年代ERANewsHD", "fmm"],
    ["年代MUCH", "fmm"],
    ["幸福娱乐", "fmm"],
    ["幸福空间居家台", "fmm"],
    ["广东4K", "fmm"],
    ["广东体育", "fmm"],
    ["广东公共", "fmm"],
    ["广东卫视", "fmm"],
    ["广东嘉佳卡通", "fmm"],
    ["广东少儿", "fmm"],
    ["广东广电", "fmm"],
    ["广东影视", "fmm"],
    ["广东新闻", "fmm"],
    ["广东民生", "fmm"],
    ["广东珠江", "fmm"],
    ["广东经济科教", "fmm"],
    ["广东综艺", "fmm"],
    ["广州影视", "fmm"],
    ["广州新闻", "fmm"],
    ["广州法治", "fmm"],
    ["广州竞赛", "fmm"],
    ["广州综合", "fmm"],
    ["广西卫视", "fmm"],
    ["康巴卫视", "fmm"],
    ["延边卫视", "fmm"],
    ["弈坛春秋", "fmm"],
    ["影迷数位电影", "fmm"],
    ["影迷电影", "fmm"],
    ["影迷纪实", "fmm"],
    ["快乐垂钓", "fmm"],
    ["快乐购", "fmm"],
    ["怀旧剧场", "fmm"],
    ["成都公共", "fmm"],
    ["成都影视文艺", "fmm"],
    ["成都新闻综合", "fmm"],
    ["成都经济资讯", "fmm"],
    ["成都都市生活", "fmm"],
    ["摄影", "fmm"],
    ["收藏天下", "fmm"],
    ["文化精品", "fmm"],
    ["文物宝库", "fmm"],
    ["新动漫", "fmm"],
    ["新疆体育健康", "fmm"],
    ["新疆卫视", "fmm"],
    ["新疆少儿", "fmm"],
    ["新疆汉语经济", "fmm"],
    ["新疆汉语综艺", "fmm"],
    ["新视觉", "fmm"],
    ["无线新闻台", "fmm"],
    ["无线财经台", "fmm"],
    ["早期教育", "fmm"],
    ["时尚购物", "fmm"],
    ["明珠台", "fmm"],
    ["星空卫视", "fmm"],
    ["晴彩中原", "fmm"],
    ["智林体育台", "fmm"],
    ["杭锦旗综合", "fmm"],
    ["欢笑剧场", "fmm"],
    ["欢腾购物", "fmm"],
    ["武术世界", "fmm"],
    ["每日影院", "fmm"],
    ["民视", "fmm"],
    ["民视台湾台", "fmm"],
    ["民视新闻台", "fmm"],
    ["民视旅游台", "fmm"],
    ["民视第一台", "fmm"],
    ["民视综艺台", "fmm"],
    ["求索动物", "fmm"],
    ["求索生活", "fmm"],
    ["求索科学", "fmm"],
    ["求索纪录", "fmm"],
    ["求索记录", "fmm"],
    ["汕头经济", "fmm"],
    ["汕头综合", "fmm"],
    ["江苏休闲体育", "fmm"],
    ["江苏优漫卡通", "fmm"],
    ["江苏公共新闻", "fmm"],
    ["江苏卫视", "fmm"],
    ["江苏国际", "fmm"],
    ["江苏城市", "fmm"],
    ["江苏影视", "fmm"],
    ["江苏教育电视台", "fmm"],
    ["江苏综艺", "fmm"],
    ["江西卫视", "fmm"],
    ["江西少儿", "fmm"],
    ["江西教育", "fmm"],
    ["江西新闻", "fmm"],
    ["江西经济生活", "fmm"],
    ["汽摩", "fmm"],
    ["河北卫视", "fmm"],
    ["河南4K", "fmm"],
    ["河南乡村", "fmm"],
    ["河南公共", "fmm"],
    ["河南卫视", "fmm"],
    ["河南国际", "fmm"],
    ["河南新闻", "fmm"],
    ["河南梨园", "fmm"],
    ["河南民生", "fmm"],
    ["河南法治", "fmm"],
    ["河南电视剧", "fmm"],
    ["河南都市", "fmm"],
    ["法治天地", "fmm"],
    ["浙江卫视", "fmm"],
    ["浙江国际", "fmm"],
    ["浙江少儿", "fmm"],
    ["浙江教科影视", "fmm"],
    ["浙江数码时代", "fmm"],
    ["浙江新闻", "fmm"],
    ["浙江民生休闲", "fmm"],
    ["浙江经济生活", "fmm"],
    ["浦东电视台", "fmm"],
    ["海南公共", "fmm"],
    ["海南卫视", "fmm"],
    ["海南少儿", "fmm"],
    ["海南文旅", "fmm"],
    ["海南经济", "fmm"],
    ["海峡卫视", "fmm"],
    ["海豚综合", "fmm"],
    ["深圳卫视", "fmm"],
    ["深圳都市", "fmm"],
    ["清华", "fmm"],
    ["游戏风云", "fmm"],
    ["湖北卫视", "fmm"],
    ["湖南卫视", "fmm"],
    ["湖南国际", "fmm"],
    ["湖南娱乐", "fmm"],
    ["湖南教育", "fmm"],
    ["湖南爱晚", "fmm"],
    ["湖南电影", "fmm"],
    ["湖南电视剧", "fmm"],
    ["湖南经视", "fmm"],
    ["湖南都市", "fmm"],
    ["湖南金鹰卡通", "fmm"],
    ["潮州综合", "fmm"],
    ["澳亚卫视", "fmm"],
    ["澳视澳门", "fmm"],
    ["澳门莲花", "fmm"],
    ["爱上4K", "fmm"],
    ["爱尔达娱乐台", "fmm"],
    ["爱看导视", "fmm"],
    ["环球奇观", "fmm"],
    ["环球旅游", "fmm"],
    ["甘肃卫视", "fmm"],
    ["生态环境", "fmm"],
    ["生活时尚", "fmm"],
    ["电竞天堂", "fmm"],
    ["电视指南", "fmm"],
    ["百事通", "fmm"],
    ["百姓健康", "fmm"],
    ["百视通", "fmm"],
    ["福建公共", "fmm"],
    ["福建少儿", "fmm"],
    ["福建教育", "fmm"],
    ["福建文体", "fmm"],
    ["福建新闻", "fmm"],
    ["福建旅游", "fmm"],
    ["福建电视剧", "fmm"],
    ["福建经济", "fmm"],
    ["福建综合", "fmm"],
    ["移动戏曲", "fmm"],
    ["第一剧场", "fmm"],
    ["精选", "fmm"],
    ["纪实人文", "fmm"],
    ["纯享4K", "fmm"],
    ["置业频道", "fmm"],
    ["翡翠台", "fmm"],
    ["耀才财经", "fmm"],
    ["老故事", "fmm"],
    ["聚鲨环球精选", "fmm"],
    ["芒果互娱", "fmm"],
    ["苏州4K", "fmm"],
    ["茶", "fmm"],
    ["莲花卫视", "fmm"],
    ["西安1", "fmm"],
    ["西安丝路频道", "fmm"],
    ["西安商务资讯", "fmm"],
    ["西安影视频道", "fmm"],
    ["西安教育", "fmm"],
    ["西安新闻综合", "fmm"],
    ["西安都市频道", "fmm"],
    ["西藏卫视", "fmm"],
    ["西藏藏语卫视", "fmm"],
    ["视纳华仁纪实", "fmm"],
    ["视纳华仁纪实频道", "fmm"],
    ["证券服务", "fmm"],
    ["财富天下", "fmm"],
    ["贵州卫视", "fmm"],
    ["赤峰", "fmm"],
    ["赤峰影视娱乐", "fmm"],
    ["赤峰新闻综合", "fmm"],
    ["赤峰经济服务", "fmm"],
    ["足球频道", "fmm"],
    ["车迷", "fmm"],
    ["辽宁卫视", "fmm"],
    ["达拉特旗综合", "fmm"],
    ["通辽", "fmm"],
    ["通辽城市服务", "fmm"],
    ["通辽新闻综合", "fmm"],
    ["都市剧场", "fmm"],
    ["鄂尔多斯", "fmm"],
    ["鄂尔多斯新闻综合", "fmm"],
    ["鄂尔多斯经济服务", "fmm"],
    ["鄂尔多斯蒙语频道", "fmm"],
    ["采昌影剧", "fmm"],
    ["重广融媒", "fmm"],
    ["重庆卫视", "fmm"],
    ["重庆少儿", "fmm"],
    ["重庆影视", "fmm"],
    ["重庆文体娱乐", "fmm"],
    ["重庆新农村", "fmm"],
    ["重庆新闻", "fmm"],
    ["重庆时尚生活", "fmm"],
    ["重庆汽摩", "fmm"],
    ["重庆社会与法", "fmm"],
    ["重庆科教", "fmm"],
    ["重庆移动", "fmm"],
    ["金砖电视", "fmm"],
    ["金色学堂", "fmm"],
    ["金鹰卡通", "fmm"],
    ["金鹰纪实", "fmm"],
    ["钱江都市", "fmm"],
    ["阿拉善", "fmm"],
    ["陕西体育休闲", "fmm"],
    ["陕西公共", "fmm"],
    ["陕西卫视", "fmm"],
    ["陕西影视", "fmm"],
    ["陕西新闻资讯", "fmm"],
    ["陕西生活", "fmm"],
    ["陕西西部电影", "fmm"],
    ["陕西都市青春", "fmm"],
    ["陶瓷", "fmm"],
    ["青海卫视", "fmm"],
    ["靓妆", "fmm"],
    ["靖天卡通", "fmm"],
    ["靖天国际", "fmm"],
    ["靖天戏剧", "fmm"],
    ["靖天日本", "fmm"],
    ["靖天日本台", "fmm"],
    ["靖天映画", "fmm"],
    ["靖天欢乐", "fmm"],
    ["靖天电影", "fmm"],
    ["靖天电影台", "fmm"],
    ["靖天综合", "fmm"],
    ["靖天育乐", "fmm"],
    ["靖天资讯", "fmm"],
    ["靖洋卡通", "fmm"],
    ["靖洋戏剧", "fmm"],
    ["风云剧场", "fmm"],
    ["风云足球", "fmm"],
    ["风云音乐", "fmm"],
    ["风尚生活", "fmm"],
    ["风尚购物", "fmm"],
    ["香港卫视", "fmm"],
    ["香港国际财经台", "fmm"],
    ["高尔夫网球", "fmm"],
    ["魅力足球", "fmm"],
    ["黑莓动画", "fmm"],
    ["黑莓电影", "fmm"],
    ["黑龙江卫视", "fmm"],
    ["龙华偶像", "fmm"],
    ["龙华影剧", "fmm"],
    ["龙华戏剧", "fmm"],
    ["龙华日韩", "fmm"],
    ["龙华日韩台", "fmm"],
    ["龙华洋片", "fmm"],
    ["龙华电影", "fmm"],
    ["龙华经典", "fmm"]
]);

function tran2m3ugroup() {
    document.getElementById("rtips").innerHTML = "Tip：";
    var source = document.getElementById("tvsource-input").value.trim();
    var slists = source.split('\n');
    var result = "#EXTM3U\r\n";
    var groupname = "未分组";
    var countall = 0; //直播源数量
    var countgroups = 0; //分组数量

    var grouptitle = "";
    var tvglogo = "";
    var tvgid = "";
    var tvgname = "";
    var mods = ""; //模式

    var boolgrouptitle = false;
    var booltvglogo = false;
    var booltvgid = false;
    var booltvgname = false;

    var boolqianta = document.getElementById("qianta").checked;

    if (source.search(/^.*?,\s*[A-Za-z0-9]{3,8}:\/\/.*?$/igm) >= 0) {
        console.log("开始TXT转M3U");
    } else {
        document.getElementById("contents").value = "异常！！没有检测到有效直播源，请检查输入是否正确！！";
        return;
    }
    var checkboxes = document.querySelectorAll('input[type="checkbox"]'); //后续改为选择相同Name的
    for (var i = 0; i < checkboxes.length; i++) {
        var mycheckbox = checkboxes[i];
        if (mycheckbox.checked) {
            switch (mycheckbox.value) {
                case "group-title":
                    boolgrouptitle = true;
                    break;
                case "tvg-logo":
                    booltvglogo = true;
                    break;
                case "tvg-id":
                    booltvgid = true;
                    break;
                case "tvg-name":
                    booltvgname = true;
                    break;
                default:
                    //console.log("default");
                    break;
            }
        } else {
            //console.log("未选中");
        }
    }
    var radios = document.querySelectorAll('input[type="radio"]'); //后续改为选择相同Name的
    for (var rs = 0; rs < radios.length; rs++) {
        var myradio = radios[rs];
        if (myradio.checked) {
            switch (myradio.value) {
                case "defs":
                    mods = "defs";
                    break;
                case "gens":
                    mods = "gens";
                    break;
                default:
                    break;
            }
        }
    }

    for (var i = 0; i <= slists.length - 1; i++) {
        var regex = /^(.*?),\s*([A-Za-z0-9]{3,8}:\/\/.*?)$/i;
        var remat = slists[i].match(regex);
        if (remat !== null) {
            var tvtitle = remat[1].trim();
            if (booltvgid) {
                tvgid = 'tvg-id="" ';
            }
            if (booltvgname) {
                tvgname = 'tvg-name="" ';
            }
            if (booltvglogo) {
                tvglogo = 'tvg-logo="" ';
            }
            if (boolgrouptitle) {
                grouptitle = 'group-title="' + groupname + '" ';
            }
            if (mods == "gens") {
                //暂时使用范明明的数据
                if (tvtitle.includes("卫视")) {
                    if (mt.has(tvtitle)) {
                        if (booltvgid) {
                            tvgid = 'tvg-id="' + tvtitle + '" ';
                        }
                        if (booltvgname) {
                            tvgname = 'tvg-name="' + tvtitle + '" ';
                        }
                        if (booltvglogo) {
                            tvglogo = 'tvg-logo="' + 'https://live.fanmingming.com/tv/' + tvtitle + '.png' + '" ';
                        }
                    }
                } else if (/cctv/i.test(tvtitle)) {
                    var regcc = /cctv[^1-9]*?(\d+[\+K]?)/i;
                    var rematcc = tvtitle.match(regcc);
                    if (rematcc !== null) {
                        var strcc = "CCTV" + rematcc[1];
                        if (booltvgid) {
                            tvgid = 'tvg-id="' + strcc + '" ';
                        }
                        if (booltvgname) {
                            tvgname = 'tvg-name="' + strcc + '" ';
                        }
                        if (booltvglogo) {
                            tvglogo = 'tvg-logo="' + 'https://live.fanmingming.com/tv/' + strcc + '.png' + '" ';
                        }
                    }
                } else if (mt.has(tvtitle)) {
                    //加上这一句，那么刚开始判断卫视的代码就多余了。
                    if (booltvgid) {
                        tvgid = 'tvg-id="' + tvtitle + '" ';
                    }
                    if (booltvgname) {
                        tvgname = 'tvg-name="' + tvtitle + '" ';
                    }
                    if (booltvglogo) {
                        tvglogo = 'tvg-logo="' + 'https://live.fanmingming.com/tv/' + tvtitle + '.png' + '" ';
                    }
                }
                //继续过滤,扩展数据为空时不显示
                if (boolqianta) {
                    if (tvgid == 'tvg-id="" ') {
                        tvgid = "";
                    }
                    if (tvgname == 'tvg-name="" ') {
                        tvgname = "";
                    }
                    if (tvglogo == 'tvg-logo="" ') {
                        tvglogo = "";
                    }
                }
            }

            var tname = "#EXTINF:-1 " + tvgid + tvgname + tvglogo + grouptitle + "," + tvtitle + "\r\n";
            var regexname = / ,[^,]*?$/i;
            tname = tname.replace(regexname, function(match) {
                return match.trim() + "\r\n";
            });
            var turl = remat[2].trim() + "\r\n";
            result += tname + turl;
            countall = countall + 1;
        } else {
            if (slists[i].trim() !== "") {
                if (slists[i].toLowerCase().indexOf("#genre#") != -1) {
                    var regs = /[,，]\s*#\s*genre\s*#/gi;
                    groupname = slists[i].trim().replace(regs, "");
                } else {
                    groupname = slists[i].trim();
                }
                countgroups = countgroups + 1;
            }
        }
    }
    document.getElementById("contents").value = result;
    document.getElementById("rtips").innerHTML = "Tip：共转换 " + countgroups + " 个分组，" + countall + " 个源。";
}

//数组去重
function unique(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
//M3U转TXT
function m3u2txtupdate() {
    var source = document.getElementById("tvsource-input").value;
    document.getElementById("rtips").innerHTML = "Tip：";
    if (source.search(/#EXTINF:/i) >= 0) {
        if (source.search(/group-title/i) >= 0) {
            var groupall = []; // all the group name
            var myresult = "";
            var countall = 0;
            var flaggen = ""; //选项标记,分组行添加#genre#标识
            var checkboxes = document.querySelectorAll('input[type="checkbox"]'); //后续改为直接取ID或者取Name组
            for (var i = 0; i < checkboxes.length; i++) {
                var mycheckbox = checkboxes[i];
                if (mycheckbox.checked) {
                    switch (mycheckbox.value) {
                        case "flaggen":
                            flaggen = "flaggen"; //分组行添加#genre#标识
                            break;
                        default:
                            //console.log("default92");
                            break;
                    }
                } else {
                    //console.log("未选中");
                }
            }

            var regpta = /(?<=group-title\s*=\s*\").*?(?=\")/igm;
            var resarr = source.match(regpta);
            for (var va = 0; va <= resarr.length - 1; va++) {
                if (resarr[va].trim() == "") {
                    resarr[va] = "未分组";
                }
            }
            groupall = unique(resarr);
            var lines = source.split("#EXTINF:");
            for (var i = 0; i < groupall.length; i++) {
                if (flaggen != "") {
                    myresult = myresult + groupall[i] + ",#genre#" + "\r\n";
                } else {
                    myresult = myresult + groupall[i] + "\r\n";
                }
                for (var j = 0; j <= lines.length - 1; j++) {
                    if (lines[j].search(/group-title/ig) >= 0) {
                        try {
                            var patsa = /(?<=group-title\s*=\s*\").*?(?=\")/igm;
                            var stra = lines[j].match(patsa)[0];
                            if (stra.trim() == "") {
                                stra = "未分组";
                            }
                            if (groupall[i] == stra) {
                                var patsb = /(?<=group-title\s*=.*?,)[^,]*?$/igm;
                                var patsc = /^\s*[A-Za-z0-9]{3,8}:\/\/.*?$/igm;
                                var strb = lines[j].match(patsb)[0];
                                var strc = lines[j].match(patsc)[0];
                                myresult = myresult + strb.trim() + "," + strc.trim() + "\r\n";
                                countall = countall + 1;
                            }
                        } catch {
                            //console.log("错误！")
                        }
                    }
                }
            }
            document.getElementById("contents").value = myresult;
            document.getElementById("rtips").innerHTML = "Tip：共转换 " + groupall.length + " 个分组，" + countall + " 个源。";
        } else {
            var slists = source.replace(/[\r\n]+/g, '@');
            var r = slists.match(/,([^,@]+)@([^@]+)/g)
            if (r) {
                result = r.map(m => m.replace(/,/g, '').replace(/@/g, ',').replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')).join('\r\n');
            }
            if (result) {
                document.getElementById("contents").value = result;
            }
            document.getElementById("rtips").innerHTML = "Tip：";
        }
    } else {
        document.getElementById("rtips").innerHTML = "Tip：";
        document.getElementById("contents").value = "格式异常！请输入正确的M3U文本！";
    }
}
//提取台标
function getlogos() {
    var source = document.getElementById("tvsource-input").value;
    document.getElementById("rtips").innerHTML = "Tip：";
    if (source.search(/#EXTM3U/i) >= 0) {
        var strres = "TVLOGO\r\n";
        var counts = 0;
        if (source.search(/#EXTINF:.*?tvg-logo/i) >= 0) {
            var mylines = source.split("#EXTINF:");
            for (var j = 0; j <= mylines.length - 1; j++) {

            }
        }
        document.getElementById("contents").value = strres;
    } else {
        document.getElementById("rtips").innerHTML = "Tip：提取台标只支持 M3U 格式文件！";
    }
}
//提取台标
function getlogos() {
    var source = document.getElementById("tvsource-input").value;
    document.getElementById("rtips").innerHTML = "Tip：";
    if (source.search(/#EXTM3U/i) >= 0) {
        var strres = "TVLOGO\r\n";
        var counts = 0;
        if (source.search(/#EXTINF:.*?tvg-logo/i) >= 0) {
            var mylines = source.split("#EXTINF:");
            for (var j = 0; j <= mylines.length - 1; j++) {
                try {
                    var strtitle = "未定义";
                    var strlogo = "";
                    if (mylines[j].search(/tvg-name/i) >= 0) {
                        var patsa = /(?<=tvg-name\s*=\s*\").*?(?=\")/igm;
                        strtitle = mylines[j].match(patsa)[0];
                    } else if (mylines[j].search(/tvg-logo/i) >= 0) {
                        var patsb = /(?<=tvg-logo.*?,)[^,]*?\n/igm;
                        strtitle = mylines[j].match(patsb)[0];
                    } else {
                        continue;
                    }
                    var patsc = /(?<=tvg-logo\s*=\s*\").*?(?=\")/igm;
                    strlogo = mylines[j].match(patsc)[0];
                    strres = strres + strtitle.trim() + "," + strlogo.trim() + "\r\n";
                    counts = counts + 1;
                } catch {
                    continue;
                }
            }
        } else {
            strres = "  当前 M3U 文件不包含台标，请检查！";
        }
        document.getElementById("contents").value = strres;
        document.getElementById("rtips").innerHTML = "Tip：共提取 " + counts + " 个台标";
    } else {
        document.getElementById("contents").value = "提取台标只支持 M3U 格式文件！";
        document.getElementById("rtips").innerHTML = "Tip：提取台标只支持 M3U 格式文件！";
    }
}
//清除屏幕
function m3ucleararea() {
    document.getElementById("tvsource-input").value = "";
    document.getElementById("contents").value = "";
    document.getElementById("rtips").innerHTML = "Tip：";
}



if (!(location.host.match(/yf1688.top/))) {
    window.location = "https://a.2015888.xyz/";
}