/* .vitepress/theme/index.ts*/

import DefaultTheme from 'vitepress/theme';
import './custom.css';
import confetti from "./confetti.vue";
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('MyGlobalComponent' /*... */);
    app.component("confetti", confetti);

    // 使用不蒜子，统计访问量组件
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: MyLayout
};
