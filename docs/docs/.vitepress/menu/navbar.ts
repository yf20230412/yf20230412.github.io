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
        text: '小鱼影视TV',
        link: '/blog/' // 表示docs/blog/index.md
    },
    {
        text: '个人网站',
        items: [           
            {
                text: 'TVBox接口',
                link: '/box2/'
            },
            {
                text: '小鱼书签导航',
                link: '/tools/'
            },
            {
                text: 'VIP音乐格式转MP3',
                link: '/888/'
            }
        ]
    },
    {
        text: '关于我',
        items: [
            {
                text: '小鱼影视🎞',
                link: '/1115/'
            },            
            {
                text: '免责声明📄',
                link: '/916/'
            },
            {
                text: '打赏💰',
                link: '/588/'
            },
            {
                text: '联系☎️',
                link: '/wo/'
            },
            {
                text: '掘金💻',
                link: 'https://juejin.cn'
            },
            {
                text: '博客园🖥',
                link: 'https://www.cnblogs.com/'
            }
        ]
    }
]