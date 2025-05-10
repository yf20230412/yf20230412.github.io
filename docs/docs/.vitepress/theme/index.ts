/* .vitepress/theme/index.ts */
// 导入默认主题
import DefaultTheme from 'vitepress/theme';
// 导入自定义CSS
import './custom.css';
// 导入彩花纸屑效果组件
import confetti from "./confetti.vue";
// 导入Vitepress提供的浏览器环境判断工具
import { inBrowser } from 'vitepress'
// 保留不蒜子导入但暂时不使用（想启用时取消注释下一行）
// import busuanzi from 'busuanzi.pure.js'
// 导入自定义布局组件
import MyLayout from './MyLayout.vue'

export default {
  // 继承默认主题的所有配置
  ...DefaultTheme,
  // 增强应用功能
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('MyGlobalComponent' /*... */);
    app.component("confetti", confetti);

    /* 不蒜子统计暂时禁用（想启用时取消注释以下代码块）
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
    */
  },
  // 使用自定义布局组件
  Layout: MyLayout
};