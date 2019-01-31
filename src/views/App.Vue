<template>
  <div class="view-app">
    <!-- 头部栏 START -->
    <div class="topheader overflow-hidden">
      <a href="//md.ironmaxi.com" class="title-link left">
        <h1 class="title">IRM Markdowner | <span>沉浸式写作</span></h1>
      </a>
      <ul class="nav right">
        <li class="nav-item">
          <a href="https://github.com/hadeshe93/irm-markdowner" target="_blank">源码地址</a>
        </li>
        <li class="nav-item">
          <a href="https://github.com/hadeshe93/irm-markdowner/issues/new" target="_blank">提需求</a>
        </li>
        <li class="nav-item">
          <a href="javascript:void();">关注Hades</a>
        </li>
        <li class="nav-item">
          <iframe allowtransparency="true" frameborder="0" scrolling="0" width="90px" height="20px" class="github-star"
            src="http://ghbtns.com/github-btn.html?user=hadeshe93&amp;repo=irm-markdowner&amp;type=watch&amp;count=true&amp;size=middle"></iframe>
        </li>
      </ul>
    </div>
    <!-- 头部栏 END -->

    <!-- 行为按钮组 START -->
    <div class="btn-group">
      <button type="button" class="btn copy-button" ref="clipboarddBtn"
        data-clipboard-action="copy" data-clipboard-target="#outputCtt"
        v-show="status === APP_STATUS.PREVIEW">全选内容</button>
      <button type="button" class="btn convert-button" 
        v-show="status === APP_STATUS.PREVIEW"
        @click="toggleAppStatus(APP_STATUS.EDIT)">返回编辑</button>
      <button type="button" class="btn convert-button" 
        v-show="status === APP_STATUS.EDIT"
        @click="toggleAppStatus(APP_STATUS.PREVIEW)">预览效果</button>
    </div>
    <!-- 行为按钮组 END -->

    <!-- 编辑框 START -->
    <textarea id="input" spellcheck="false" v-model="editorContent"
      v-show="status === APP_STATUS.EDIT"
      @input="editorContentChangedHandler(editorContent)"></textarea>
    <!-- 编辑框 END -->

    <!-- 预览框 START -->
    <div id="output" v-show="status === APP_STATUS.PREVIEW">
      <div class="themes-config">
        <div class="theme-wrapper">
          <label>页面主题选择：</label><select class="page-theme"></select>
        </div>
        <div class="theme-wrapper">
          <label>代码主题选择：</label><select class="code-theme"></select>
        </div>
      </div>
      <div class="wrapper" id="outputCtt" v-html="previewContent"></div>
    </div>
    <!-- 预览框 END -->
  </div>
</template>

<script>
  import imgQrcodeScan from '@ASSETS/imgs/qrcode_scan.png';
  // markdown 转换器
  import converter from '@SRC/plugins/converter';
  import codeThemes from '@SRC/plugins/codeThemes';
  // 剪贴板
  import Clipboard from 'clipboard';

  // 剪贴板实例容器
  let clipboard = null;

  // 应用的当前状态
  const APP_STATUS = {
    // 编辑状态
    EDIT: {},
    // 预览状态
    PREVIEW: {}
  };

  export default {
    name: "app",
    data() {
      return {
        imgQrcodeScan,

        editorContent: '',
        previewContent: '',

        APP_STATUS,
        status: APP_STATUS.EDIT,
      };
    },
    methods: {
      // 切换状态
      toggleAppStatus (status) {
        this.status = status;
      },
      // 编辑器内容变化回调
      editorContentChangedHandler (editorContent) {
        this.updatePreview(editorContent);
      },
      // 更新预览视图
      updatePreview (editorContent) {
        this.previewContent = converter.makeHtml(editorContent);
      },
    },
    created () {
      console.log(WPP_THEMES);
      this.$http.get('/dist/demo.md', {
        params: { _t: +new Date() },
        responseType: 'text',
      }).then(rsp => {
        const demo = rsp.data;
        this.editorContent = demo;
        this.updatePreview(demo);
      });
    },
    mounted () {
      // new codeThemes({
      //   prefixUrl: './themes/'
      // });
      clipboard = new Clipboard(this.$refs['clipboarddBtn']);
      clipboard.on('success', (e) => {
        console.log('复制成功');
        this.$weui.toast('复制成功', 500);
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
      });
      clipboard.on('error', (e) => {
        this.$weui.alert('复制失败，原因请查看控制台');
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    },
    destroyed () {
      clipboard.destroy();
    }
  }
</script>

<style lang="less" scoped>
</style>