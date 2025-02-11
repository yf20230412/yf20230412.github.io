swal({
            title: '关注微信公众号',
            text: "公众号∶【风言锋语88】",
            type: 'input',
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonText: "确 认",
            imageUrl: '../../jiemi/static/img/wechat-qr.jpg', imageSize: '200x200',
            inputPlaceholder: "关注微信公众号后台回复∶验证码",
            showLoaderOnConfirm: true,
        }, function(inputValue) {
            if (inputValue != '2025') {
                swal.showInputError('输入错误，关注公众号后台回复∶验证码');
                return;
            } else {
                swal.close('xiaoyu');
                return;
            }
        });