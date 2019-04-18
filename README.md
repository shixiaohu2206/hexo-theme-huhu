# HEXO-THEME-UTONE

> [Utone](https://github.com/shixiaohu2206/hexo-theme-utone)是一个在 Hexo 博客上开发的主题.

### [Demo](https://shixiaohu2206.github.io/index.html) （Myself Blog）

### 介绍

这是一款及其简单素雅的 Hexo 主题（懒）

### 初衷

写博客的初衷就是为了记录学习的过程与生活的点滴。文字的突出展示，与简单风格是我完成这个主题的初衷。

### 安装

```bash
git clone https://github.com/shixiaohu2206/hexo-theme-utone.git themes/utone
```

修改 Hexo 的根目录下的 `_config.yml` 中的 `theme` 为 `utone`

### 配置

```yml
# 菜单导航
menu:
  home: /
  archives: /archives
  about: /about
  RSS: /atom.xml

#logo
logo: /images/logo.png

# favicon
favicon: /images/favicon.ico

# rss
rss: /atom.xml
```

### ABOUT 页面

about 页面，没有单独写一个 layout，使用 markdown 文件来进行展示

```bash
hexo new page about
```

### 腾讯公益 404 页面

在项目根目录 source 文件夹下新建 404.html，`homePageUrl` 改为站点链接

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="generator" content="Hexo 3.8.0" />
    <meta charset="UTF-8" />
    <title>404</title>
  </head>
  <body></body>
</html>
<script
  type="text/javascript"
  src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"
  charset="utf-8"
  homePageUrl="https://blog.utone.xyz/"
  homePageName="回到我的主页"
></script>
```

### 站内搜索

在`_config.yml`文件中添加以下配置，并安装插件 hexo-generator-json-content

```yml
# 修改url
url: https://blog.utone.xyz/

# 开启站内搜索
site_search: true

# 站内搜索生成文件配置 https://github.com/alexbruno/hexo-generator-json-content
jsonContent:
  meta: false
  pages: false
  dateFormat: 'Y-m-d H:i'
  posts:
    title: true
    date: true
    path: true
    text: true
    raw: false
    content: false
    slug: false
    updated: false
    comments: false
    link: false
    permalink: true
    excerpt: false
    categories: false
    tags: true
```

### 博客使用的插件

- hexo-admin：后台管理 Hexo 博客
- hexo-all-minifier：压缩静态文件
- hexo-deployer-git：部署博客
- hexo-generator-json-content：生成站内搜索文件

### 兼容性

使用了 Flex 布局，不支持 IE8

### Actions list

- 2019/1/31，Pull requests 至 Hexo 官方主题库
- 2019/2/1，增加 RSS 订阅，压缩静态文件，增加 404 腾讯公益页面
- 2019/2/11，增加站内搜索功能
- 2019/2/11，年后第一天上班，发现主题已被 Hexo 官方主题库收录（[Link](https://hexo.io/themes/)）

### TODO

1. 响应式
2. 博客文章评论
3. 文章浏览次数统计
4. 相片册页面
5. ~~RSS 订阅~~
6. 赞赏功能
7. ~~站内搜索功能~~
