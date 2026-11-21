// docs/.vitepress/menu/navbar.ts右侧导航栏
import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [

    {
        text: '首页',
        link: '/' // 表示docs/index.md
    },
    {
         text: '写在前面',
         link: '/blog/写在前面'  // 表示docs/blog/写在前面.md
    },
    {
        text: '小鱼影视',
        link: '/blog/' // 表示docs/blog/index.md
    },
    {
        text: '关于我',
        items: [
            {
                text: '联系☎️',
                link: 'https://a.2015888.xyz/wo/'
            },
            {
                text: '博客园🖥',
                link: 'https://www.cnblogs.com/'
            }
        ]
    }
]