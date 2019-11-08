# HEXO-THEME-HUHU

![huhu](/source/images/huhu.png)

## 介绍

- 简单、突出文字，是开发的初衷
- 一个在 Hexo 博客上开发的主题，主题会持续更新
- 近日服务器搬迁完成，腾出时间来完善一下博客文档

## 安装

```bash
git clone https://github.com/shixiaohu2206/hexo-theme-huhu.git themes/hexo-theme-huhu
```

在项目根目录操作以上命令，并修改根目录下的 `_config.yml` 中的 theme 为 `hexo-theme-huhu`

本主题需要安装`shelljs`，因为 requiresJS 打包时，需要执行 bash 命令

```bash
npm install --save shelljs
```

## 新建 about 页面

about 页面没有单独 layout，直接以 markdown 渲染

```bash
hexo new page "about"
```

## 新建 tags、categories、friends 页面

tags、categories、friends 有单独的 layout，所以新增命令后，需要在对应的文件中新增 layout 参数

```bash
hexo new page "tags"

hexo new page "friends"

hexo new page "categories"
```

请自行添加，例如：

```markdown
---
layout: tags
---
```

### friends 友链

在根目录下的 `_config.yml` 中新增配置，例如：

```yml
friends:
  - name: Don Lex
    time: '2019-10-12'
    url: 'https://www.donlex.cn/'
    logo: 'https://www.donlex.cn/images/avatar.png'
    intro: '码农'
```

## 站内搜索

目前支持两种站内搜索方案：

1. swiftype
2. 使用自生成搜索文件

默认使用生成搜索文件的方案，因为依赖第三方，始终不是很稳定的赶脚，而且会加载许多第三方的服务文件，导致博客加载速度过慢

如果配置了`swiftype`，则优先使用 swiftype 方案

### 自生成搜索文件

安装`hexo-generator-json-content`插件，用于生成站内搜索生成文件

```bash
npm install --save hexo-generator-json-content
```

在根目录下的 `_config.yml` 中新增配置，如下:

```yml
#https://github.com/alexbruno/hexo-generator-json-content
jsonContent:
  dateFormat: YYYY/MM/DD
  pages: false
  posts:
    tags: true
    title: true
    date: true
    text: true
    permalink: true
    photos: true
  file: content.json
```

### swiftype

[swiftype](https://app.swiftype.com)

搜索使用了 swiftype 第三方服务，比较方便，网上相关教程很多，但教程比较老，swiftype 但设置有一点不同，但是大同小异

使用了 swiftype 搜索服务，需要自行去注册账号。
记录官方提供的安装代码中 appKey，在根目录下的 `_config.yml` 中新增 `swiftype`

```yml
#swiftype
swiftype:
  appKey: ''
```

## Google 相关配置

如果使用 GTM 统计、Goole 站点、Google 广告等，则在根目录配置`_config.yml` 中添加配置

```yml
#google-site-verification 添加在meta信息中
google_site_verification: ''

#google gtm
gtm_id: ''

#google gtm
google_ad_client: ''
```

## 代码高亮

本主题支持 highlight.js 官方的 css，[highlight.js 官网](https://highlightjs.org/static/demo/)看中哪个颜色搭配，复制 css 样式替换`themes\huhu\source\style\highlight.styl`

新增 hljs 参数，并设为 trye，不然无法使用 highlight.js 官方的 css

```yml
highlight:
  enable: true
  hljs: true #新增hljs参数，并设为trye，不然无法使用highlight.js 官方的 css
  line_number: false #暂不支持行号
  auto_detect: false #这一项也关闭，若开启有可能报错
  tab_replace:
```

## 文章评论

支持两种方案，二选一

1. valine
2. 畅言

### valine 评论

[https://valine.js.org](https://valine.js.org)

在根目录配置 `_config.yml` 中添加

```yml
#valine评论
valine:
  API_ID: ''
  API_KEY: ''
```

### 畅言评论

[http://changyan.kuaizhan.com](http://changyan.kuaizhan.com)

在根目录配置 `_config.yml` 中添加

```yml
#畅言评论
changyan:
  appid: ''
  conf: ''
```

## RSS

安装插件`hexo-generator-feed`

```bash
npm install --save hexo-generator-feed
```

在根目录配置 `_config.yml` 中添加

```yml
#rss
feed:
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: ''
  order_by: -date
  icon: icon.png
```

## 兼容性

使用了 Flex 布局，不支持 IE8

## 自定义

其他的自定义，修改也很方便，比如更换打赏二维码、Follow 地址在，都在主题的配置中`themes\huhu\_config.yml`，各位大佬请自行修改
