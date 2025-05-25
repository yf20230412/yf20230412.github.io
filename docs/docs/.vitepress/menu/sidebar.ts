// vite/.vitepress/menu/sidebar.ts左侧栏
import { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Sidebar = {
  // /blog/表示对这个文件夹下的所有md文件做侧边栏配置  
  '/blog/': [
      {
        text: '小鱼影视TV',
        collapsed: false,  //控制展开和隐藏
        items: [
          { text: '小鱼影视更新日志', link: 'https://yf1688.top/log/' },
          { text: '小鱼影视必看技巧', link: '/blog/小鱼影视必看技巧' },   
          { text: '小鱼影视内置打包修改', link: '/blog/影视内置打包修改' }
        ]        
      },
      {
        text: '手机去广系列',
        collapsed: false,  //控制展开和隐藏
        items: [
          { text: 'GKD在线规则订阅', link: '/blog/GKD' },
		  { text: 'GKD官方博客', link: 'https://gkd.li/'}
        ]        
      },
      {
        text: '生活随笔',
        collapsed: false,
        items: [
          { text: 'Allinone部署', link: '/blog/Allinone部署' },
          { text: 'serv00免费10年虚拟主机', link: '/blog/sev00' },
          { text: 'markdown语法扩展', link: '/blog/markdown' },
          { text: 'git冲突处理流程', link: '/blog/git冲突处理流程' },
          { text: 'AI人工智能聚合', link: '/blog/AI人工智能聚合' },
          { text: '影视仓内置多仓教程', link: '/blog/影视仓内置多仓教程' }          
        ]        
      },      
      {
        text: '关于我',
        items: [
          { text: '打赏💰', link: 'https://yf1688.top/588/' },
          { text: '联系☎️', link: 'https://yf1688.top/wo/' },
          { text: '主页🚀', link: 'https://yf1688.top/533/' },
          { text: '掘金💻', link: 'https://juejin.cn/' }
          
        ]
      }
  ]
};