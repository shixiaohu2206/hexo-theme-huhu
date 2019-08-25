# HEXO-THEME-HUHU

![huhu](/source/images/huhu.png)

## 介绍

- 一个在 Hexo 博客上开发的主题，主题会持续更新。
- 简单、突出文字，是开发的初衷

## 安装

```bash
git clone https://github.com/shixiaohu2206/hexo-theme-huhu.git themes/huhu
```

修改 Hexo 的根目录下的 \_config.yml 中的 theme 为 utone

## google

google 广告、google gtm、google-site-verification·
在根目录配置\_config.yml 中添加

```yml
#google-site-verification
google_site_verification: ''

#google gtm
gtm_id: ''

#google gtm
google_ad_client: ''
```

## valine 评论

[valine 官网教程](https://valine.js.org)

在根目录配置\_config.yml 中添加

```yml
#valine评论
valine:
  API_ID: ''
  API_KEY: ''
```

## 畅言评论

[畅言官网](http://changyan.kuaizhan.com)

在根目录配置\_config.yml 中添加

```yml
#畅言评论
changyan:
  appid: ''
  conf: ''
```

## 兼容性

使用了 Flex 布局，不支持 IE8

## Todo

- 站内搜索
- 相册
