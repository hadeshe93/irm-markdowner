# 微信公众号排版编辑器

[![pipeline status](https://gitlab.com/ironmaxtory/irm-markdowner/badges/master/pipeline.svg)](https://gitlab.com/ironmaxtory/irm-markdowner/commits/master)

一个离线也能用的，交互更友好的，微信公众号排版编辑器。

- 在线地址: <https://md.ironmaxi.com/>
- Issue 或建议: <https://github.com/hadeshe93/irm-markdowner/issues/new>

## 说明
该项目是 fork 了大神[小胡子哥](https://github.com/barretlee)的[线上排版编辑器](https://github.com/barretlee/online-markdown)。实际上，项目的代码和体验一直我都感觉挺别扭的，所以将其彻底重构了一番。

新版访问地址：[https://md.ironmax.com](https://md.ironmax.com)

新版界面：![新版界面](https://cdn.ironmaxi.com/images/upload/20190327112803.jpg)

操作效果：![操作效果](https://cdn.ironmaxi.com/images/upload/20190327145500.gif)

大体介绍一下，我在原项目的基础上做了什么工作：  
+ [x] 🛠 添加调试模式，支持本地调试；
+ [x] 🎗 引入 Vue，虽然没必要，但是有了数据双向绑定，代码写起来简洁，维护起来方便；
+ [x] 🔭 添加实时预览功能，左侧写出来的 Markdown 文字，右侧立即预览，没有延迟；
+ [x] 😎 左侧与右侧视图同步滚动，进一步提升使用体验；
+ [x] 💅 点击复制内容，所有文字及排版样式统统拷贝进剪贴板，不用再多按一次 `crtl + c`；
+ [x] 🗃 根据微信公众编辑器的样式及限制，多做了一些兼容；
+ [x] 🌈 增加了 3 种不同样式的 blockqoute；
+ [x] 🔐 站点升级 https 协议；
+ [x] 🗞 Service Worker 加持，只要访问过一次线上地址，那么静态资源都会被缓存，离线可用！
+ [x] 📦 Gitlab CI/CD 加持，只要往 master 主干提交代码，项目便可以自动打包构建，并部署到我的个人服务器中，而且还能自动帮我 push 到 github 仓库中，省去了我人工操作的步骤，非常优雅！

这里，再次感谢原作者提供的绝妙灵感。

好用的话，不妨给个 Star 🌟 ！

## 关于我
<img width="200" src="https://cdn.ironmaxi.com/images/upload/qrcode_2018.png" alt="微信公众号"/>

## LICENSE
MIT. 感谢 [@Phodal](https://github.com/phodal) & [@barretlee](https://github.com/barretlee).
