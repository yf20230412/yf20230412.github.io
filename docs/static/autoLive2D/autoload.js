try {
    $("<link>").attr({href: "https://yf1688.top/static/autoLive2D/waifu.css?v=1.4.2", rel: "stylesheet", type: "text/css"}).appendTo('head');
    $('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
    $.ajax({url: "https://yf1688.top/static/autoLive2D/waifu-tips.js?v=1.4.2", dataType:"script", cache: true, success: function() {
        $.ajax({url: "https://yf1688.top/static/autoLive2D/live2d.js?v=1.0.5", dataType:"script", cache: true, success: function() {
            /* 可直接修改部分参数 */
            live2d_settings['hitokotoAPI'] = "hitokoto.cn";  // 一言 API
            live2d_settings['modelId'] = 5;                  // 默认模型 ID
            live2d_settings['modelTexturesId'] = 1;          // 默认材质 ID
            live2d_settings['modelStorage'] = false;         // 不储存模型 ID
            /* 在 initModel 前添加 */
            initModel("https://yf1688.top/static/autoLive2D/waifu-tips.json");
        }});
    }});
} catch(err) { console.log("[Error] JQuery is not defined.") }


/*引用库*/
/*
<!-- waifu-tips.js 依赖 JQuery 库 -->
    <script src="https://live2d.fghrsh.net/assets/1.4.2/jquery.min.js"></script>
    
    <!-- 实现拖动效果，需引入 JQuery UI -->
    <script src="https://live2d.fghrsh.net/assets/1.4.2/jquery-ui.min.js"></script>
    
 */   
