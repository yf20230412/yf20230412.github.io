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
                text: '小鱼影视🎞',
                link: 'https://2015888.xyz/1115/'
            },            
            {
                text: '免责声明📄',
                link: 'https://2015888.xyz/916/'
            },
            {
                text: '打赏💰',
                link: 'https://2015888.xyz/588/'
            },
            {
                text: '联系☎️',
                link: 'https://2015888.xyz/wo/'
            }
        ]
    }
]