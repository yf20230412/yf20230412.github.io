// 定义手机端和电脑端的HTML内容
const mobileMenu = `
            <!-- main header @s -->
        <div class="nk-header nk-header-fluid nk-header-fixed is-light">
            <div class="container-xl">
                <div class="nk-header-wrap link-between">
                    <div class="nk-menu-trigger mr-sm-2 d-lg-none">
                        <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-menu"></em></a>
                    </div>
                    <div class="nk-header-brand">
                        <a href="/" class="logo-link text-base"><img src="https://master.2015888.xyz/icon/logo.png" class="hide-mb-sm">小鱼工具箱 </a>
                    </div>
                    <!-- .nk-header-brand -->
                    <div class="nk-header-tools nk-header-menu mobile-menu" data-content="headerNav">
                        <div class="nk-header-mobile">
                            <div class="nk-header-brand">
                                <a href="/" class="logo-link text-base">
                                    <span class="nio-version" style="font-size: 21px;position: inherit;">工具箱 </span>
                                </a>
                            </div>
                            <div class="nk-menu-trigger mr-n2">
                                <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-arrow-left"></em></a>
                            </div>
                        </div>
                        <!-- Menu -->
                        <ul class="nk-menu nk-menu-main">
                            <li class="nk-menu-item active">
                                <a href="/tools2" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="">
                                    <!-- <em class="icon ni ni-home"></em> -->
                                    <span class="nk-menu-text">首页</span>
                                </a>
                            </li>


                            <li class="nk-menu-item">
                                <a href="https://qm.qq.com/cgi-bin/qm/qr?k=pNKAZGDj__3sPQyJydHuu3y72Uy4SmLN&jump_from=webapi&authKey=sk92oq7P3G6E2YUw7SZrLE2jsvpX9oJghp2gEC80L2N4uCVQ0L5N4uN93XX7dAE7" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">TVBox粉丝群</span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="https://yf1688.top/1115/" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">APP发布页</span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="https://www.2015888.xyz/img/wxzsm.jpg" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">赞助本站</span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="/222" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">申请收录</span>
                                </a>
                            </li>
                            <hr>
                            <li class="nk-menu-item" data-id="1"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(1)">推荐</a></li>

                            <li class="nk-menu-item" data-id="3"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(3)">网盘</a></li>

                            <li class="nk-menu-item" data-id="8"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(8)">AI智能</a></li>

                            <li class="nk-menu-item" data-id="11"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(11)">检索</a></li>

                            <li class="nk-menu-item" data-id="4"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(4)">工具</a></li>

                            <li class="nk-menu-item" data-id="5"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(5)">开发</a></li>

                            <li class="nk-menu-item" data-id="10"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(10)">影视</a></li>

                            <li class="nk-menu-item" data-id="14"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(14)">TV</a></li>

                            <li class="nk-menu-item" data-id="9"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(9)">论坛</a></li>

                            <li class="nk-menu-item" data-id="12"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(12)">图片</a></li>

                            <li class="nk-menu-item" data-id="13"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(13)">图床</a></li>

                            <li class="nk-menu-item" data-id="15"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(15)">采集</a></li>

                            <li class="nk-menu-item" data-id="7"><a class="nk-menu-link nk-ibx-action-item" href="javascript:show_tool_list(7)">站务</a></li>

                        </ul>
                    </div>
                    <!-- .nk-header-menu -->
                    <div class="no-gutters">
                        <ul class="nk-quick-nav">
                            <li class="dropdown">
                                <a href="javascript:;" class="progress-rating dark-switch">
                                    <span class="nk-menu-icon">
                                        <em class="icon ni ni-moon"></em>
                                        <em class="icon ni ni-sun d-none"></em>
                                    </span>
                                </a>
                            </li>

                            <!-- .dropdown -->
                        </ul>
                        <!-- .nk-quick-nav -->
                    </div>
                    <!-- .nk-header-tools -->
                </div>
                <!-- .nk-header-wrap -->
            </div>
            <!-- .container-fliud -->
        </div>
        <!-- main header @e -->
        <!-- content @s -->

        <div class="nk-content nk-content-lg nk-content-fluid pt-5 pb-5 bannerbg">
            <div class="container-xl">
                <div class="form-control-wrap circle">
                    <div class="form-text-hint-lx" onclick="search()">
                        <span class="overline-title"><em class="icon ni ni-search"></em></span>
                    </div>
                    <form id="searchForm" action="#" method="get" target="_blank">
                        <input type="text" class="form-control form-control-lx btn-round" name="word" id="searchkw" placeholder="搜索" autocomplete="off">
                    </form>
                </div>
            </div>
        </div>

        <!-- content @s -->
        `;

const desktopMenu = `
            <!-- main header @s -->
        <div class="nk-header nk-header-fluid nk-header-fixed is-light">
            <div class="container-xl">
                <div class="nk-header-wrap link-between">
                    <div class="nk-menu-trigger mr-sm-2 d-lg-none">
                        <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-menu"></em></a>
                    </div>
                    <div class="nk-header-brand">
                        <a href="/" class="logo-link text-base"><img src="https://master.2015888.xyz/icon/logo.png" class="hide-mb-sm">小鱼工具箱 </a>
                    </div>
                    <!-- .nk-header-brand -->
                    <div class="nk-header-tools nk-header-menu mobile-menu" data-content="headerNav">
                        <div class="nk-header-mobile">
                            <div class="nk-header-brand">
                                <a href="/" class="logo-link text-base">
                                    <span class="nio-version" style="font-size: 21px;position: inherit;">工具箱 </span>
                                </a>
                            </div>
                            <div class="nk-menu-trigger mr-n2">
                                <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-arrow-left"></em></a>
                            </div>
                        </div>
                        <!-- Menu -->
                        <ul class="nk-menu nk-menu-main">
                            <li class="nk-menu-item active">
                                <a href="/tools2" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="">
                                    <!-- <em class="icon ni ni-home"></em> -->
                                    <span class="nk-menu-text">首页</span>
                                </a>
                            </li>


                            <li class="nk-menu-item">
                                <a href="https://qm.qq.com/cgi-bin/qm/qr?k=pNKAZGDj__3sPQyJydHuu3y72Uy4SmLN&jump_from=webapi&authKey=sk92oq7P3G6E2YUw7SZrLE2jsvpX9oJghp2gEC80L2N4uCVQ0L5N4uN93XX7dAE7" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">TVBox粉丝群</span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="https://yf1688.top/1115/" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">APP发布页</span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="https://www.2015888.xyz/img/wxzsm.jpg" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">赞助本站</span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="/222" class="nk-menu-link nk-ibx-action-item" data-original-title="" title="" target="_blank">
                                    <!-- <em class="icon ni ni-home"></em>-->
                                    <span class="nk-menu-text">申请收录</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <!-- .nk-header-menu -->
                    <div class="no-gutters">
                        <ul class="nk-quick-nav">
                            <li class="dropdown">
                                <a href="javascript:;" class="progress-rating dark-switch">
                                    <span class="nk-menu-icon">
                                        <em class="icon ni ni-moon"></em>
                                        <em class="icon ni ni-sun d-none"></em>
                                    </span>
                                </a>
                            </li>

                            <!-- .dropdown -->
                        </ul>
                        <!-- .nk-quick-nav -->
                    </div>
                    <!-- .nk-header-tools -->
                </div>
                <!-- .nk-header-wrap -->
            </div>
            <!-- .container-fliud -->
        </div>
        <!-- main header @e -->
        <!-- content @s -->

        <div class="nk-content nk-content-lg nk-content-fluid pt-5 pb-5 bannerbg">
            <div class="container-xl">
                <div class="form-control-wrap circle">
                    <div class="form-text-hint-lx" onclick="search()">
                        <span class="overline-title"><em class="icon ni ni-search"></em></span>
                    </div>
                    <form id="searchForm" action="#" method="get" target="_blank">
                        <input type="text" class="form-control form-control-lx btn-round" name="word" id="searchkw" placeholder="搜索" autocomplete="off">
                    </form>
                </div>
            </div>
        </div>

        <!-- content @s -->
        <div class="nk-content nk-content-fluid p-0">
            <div class="nk-block">
                <div class="card">
                    <div class="card-inner p-2">
                        <div class="container-xl">
                            <nav>
                                <ul class="breadcrumb breadcrumb-pipe">
                                    <li class="breadcrumb-item fs-16px category-all active"><a href="javascript:show_tool_list(0)">全部</a></li>
                                    <li class="breadcrumb-item fs-16px category-item" data-id="1"><a href="javascript:show_tool_list(1)">推荐</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="3"><a href="javascript:show_tool_list(3)">网盘</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="8"><a href="javascript:show_tool_list(8)">AI智能</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="11"><a href="javascript:show_tool_list(11)">检索</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="4"><a href="javascript:show_tool_list(4)">工具</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="5"><a href="javascript:show_tool_list(5)">开发</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="10"><a href="javascript:show_tool_list(10)">影视</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="14"><a href="javascript:show_tool_list(14)">TV</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="9"><a href="javascript:show_tool_list(9)">论坛</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="12"><a href="javascript:show_tool_list(12)">图片</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="13"><a href="javascript:show_tool_list(13)">图床</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="15"><a href="javascript:show_tool_list(15)">采集</a></li>

                                    <li class="breadcrumb-item fs-16px category-item" data-id="7"><a href="javascript:show_tool_list(7)">站务</a></li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- content @s -->
        `;

// 获取菜单容器元素
const menuContainer = document.querySelector('.nk-wrap');

// 根据设备类型插入相应的内容
if (window.matchMedia('(max-width: 768px)').matches) {
    // 手机端
    menuContainer.innerHTML = mobileMenu;
} else {
    // 电脑端
    menuContainer.innerHTML = desktopMenu;
}

// 监听窗口大小变化，动态切换内容
window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
        menuContainer.innerHTML = mobileMenu;
    } else {
        menuContainer.innerHTML = desktopMenu;
    }
});