---
layout: home

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page

title: XiaoYu博客
titleTemplate: Hi，终于等到你
editLink: true
lastUpdated: true

hero:
  name: "XiaoYu博客"
  text: "Hi，终于等到你！"
  tagline: 影视盒子迷、全栈开发者、云原生追随者、只为热爱❤️‍🔥
  image:
        # 首页右边的图片
        src: /logo.png
        # 图片的描述
        alt: avatar
        # 按钮相关
  actions:
    - theme: brand
      text: 写在前面
      link: /blog/写在前面      
      
    - theme: alt
      text: 小鱼影视TV
      link: /blog/
      
    - theme: alt
      text: 书签导航
      link: https://a.2015888.xyz/tools

features:

  - title: 个人主页
    icon: 
      src: /dog.svg    
    details: 主要分享tvbox软件相关内容
    link: https://a.2015888.xyz/533
    linkText: 跳转主页

  - title: 微信公众号：风言锋语88
    icon: 
      src: /weixin.svg    
    details: 分享影视盒子、接口，想白嫖你就来
    link: https://a.2015888.xyz/gzh
    linkText: 查看详情
    
  - title: 云原生技术
    icon:
      src: /kk.svg
    details: 平平无奇但是热爱学习的云原生追随者
    link: /blog/云原生系列
---


<!-- 自定义组件 这里的<home />是调用home.vue组件-->

<script setup>

// 导入 home.vue 组件
// import home from './.vitepress/components/home.vue';

// 导入 confetti.vue 组件
import confetti from './.vitepress/theme/confetti.vue';

</script>
<!-- 取消分页组件
<home />-->
<confetti />
<!--
<p>本站总访问量 <span id="busuanzi_value_site_pv" /> 次</p>
-->