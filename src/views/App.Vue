<template>
  <div class="view-app">
    <!-- 头部栏 START -->
    <div class="topheader overflow-hidden">
      <a href="http://md.ironmaxi.com" class="title-link left">
        <h1 class="title">Wechat Markdowner | <span>沉浸式写作</span></h1>
      </a>
      <ul class="nav right">
        <li class="nav-item">
          <a href="https://github.com/ironmaxtory/wechat-markdowner" target="_blank">源码地址</a>
        </li>
        <li class="nav-item">
          <a href="https://github.com/ironmaxtory/wechat-markdowner/issues/new" target="_blank">提需求</a>
        </li>
        <li class="nav-item">
          <a href="javascript:void();">关注Hades</a>
        </li>
        <li class="nav-item">
          <iframe allowtransparency="true" frameborder="0" scrolling="0" width="90px" height="20px" class="github-star"
            src="http://ghbtns.com/github-btn.html?user=ironmaxtory&amp;repo=wechat-markdowner&amp;type=watch&amp;count=true&amp;size=middle"></iframe>
        </li>
      </ul>
    </div>
    <!-- 头部栏 END -->

    <!-- 编辑框 START -->
    <textarea id="input" spellcheck="false"></textarea>
    <!-- 编辑框 END -->
  </div>
</template>

<script>
  import imgQrcodeScan from '@ASSETS/imgs/qrcode_scan.png';

  export default {
    name: "app",
    data() {
      return {
        imgQrcodeScan,
      };
    }
  }
</script>

<style lang="less" scoped>
</style>