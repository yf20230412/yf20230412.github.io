$('.copy-btn').click(function() {
    let id = $(this).attr('id')
    copy('#' + id)
})

function copy(id) {
    let clipboard = new ClipboardJS(id);
    clipboard.on('success', function(e) {
        console.log(e);
        alert('小鱼提醒：复制成功，请前往tvbox接口粘贴食用')
        clipboard.destroy(); //解决多次弹窗问题
    });
    clipboard.on('error', function(e) {
        console.log(e);
        alert('请重新复制')
        clipboard.destroy(); //解决多次弹窗问题
    });
}