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
    <div class="tools-bar-wrapper">
      <div class="tools-bar">
        <!-- 代码主题选择组 -->
        <div class="themes-group">
          <div class="theme-wrapper">
            <label>代码主题选择：</label>
            <select class="code-theme" v-model="codeTheme" 
              @change="codeThemeChangedHandler(codeTheme)">
              <option v-for="(theme, idx) in CODE_THEMES" :key="idx" :value="theme">
                {{ theme }}
              </option>
            </select>
          </div>
        </div>
        <!-- 按钮组 -->
        <div class="btn-group">
          <button class="btn copy-button" ref="clipboarddBtn"
            data-clipboard-action="copy" data-clipboard-target="#output">复制全部内容</button>
        </div>
      </div>
    </div>
    <!-- 行为按钮组 END -->

    <!-- 操作框 START -->
    <div class="markdowner-wrapper">
      <!-- 编辑框 START -->
      <div class="input-wrapper">
        <textarea id="input" ref="input" spellcheck="false" v-model="editorContent"
          placeholder="即刻，在这里写下你的 markdown 格式文章 ..."
          @scroll="!isPreviewScrollLocked && scrollHandler($event.target)"
          ></textarea>
      </div>
      <!-- 编辑框 END -->

      <!-- 预览框 START -->
      <div class="output-wrapper">
        <div id="output" ref="output" v-html="previewContent" @scroll="!isEditorScrollLocked && scrollHandler($event.target)"></div>
      </div>
      <!-- 预览框 END -->
    </div>
    <!-- 操作框 END -->

    <!-- 编辑框 START -->
    <!-- <div class="input-wrapper" v-show="status === APP_STATUS.EDIT">
      <textarea id="input" spellcheck="false" v-model="editorContent"
        @input="editorContentChangedHandler(editorContent)"></textarea>
    </div> -->
    <!-- 编辑框 END -->

    <!-- 预览框 START -->
    <!-- <div class="output-wrapper" v-show="status === APP_STATUS.PREVIEW">
      <div id="output" v-html="previewContent"></div>
    </div> -->
    <!-- 预览框 END -->
  </div>
</template>

<script>
  import Vue from 'vue';
  import _function from 'lodash/function';
  import imgQrcodeScan from '@ASSETS/imgs/qrcode_scan.png';
  // markdown 转换器
  import converter from '@SRC/plugins/converter';
  import codeThemes from '@SRC/plugins/codeThemes';
  import '@ASSETS/scripts/google-code-prettify/run_prettify';
  // 剪贴板
  import Clipboard from 'clipboard';

  // 剪贴板实例容器
  let clipboard = null;

  // 代码主题改变器
  let codeThemeChanger = null;

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

        editorElm: null,
        previewElm: null,
        editorScrollTop: 0,
        previewScrollTop: 0,

        isEditorScrollLocked: false,
        isPreviewScrollLocked: false,

        // 默认主题
        codeTheme: 'github-v2',

        APP_STATUS,
        status: APP_STATUS.EDIT,
      };
    },
    computed: {
      CODE_THEMES () {
        // 去除掉 '.css' 的后缀
        return WPP_CODE_THEMES.map(theme => theme.slice(0, -4));
      },
      scrollHandler () {
        return this.getScrollThrottleHandler();
      },
    },
    watch: {
      editorContent (newVal, oldVal) {
        this.editorContentChangedHandler(newVal);
      },
    },
    methods: {
      // 获取滚动回调的节流函数
      getScrollThrottleHandler () {
        return _function.throttle((target) => {
          const targetID = target.getAttribute('id');
          const scrollPercent = target.scrollTop / (target.scrollHeight - target.clientHeight);
          let destScrollTop = 0;
          let destElm = null;

          switch (targetID) {
            case 'input':
              destElm = this.previewElm;
              this.previewElm.scrollTop = (destElm.scrollHeight - destElm.clientHeight) * scrollPercent;
              this.isEditorScrollLocked && clearTimeout(this.isEditorScrollLocked);
              this.isEditorScrollLocked = setTimeout(() => {
                  this.isEditorScrollLocked = false;
                }, 500);
              break;
            case 'output':
              destElm = this.editorElm;
              this.editorElm.scrollTop = (destElm.scrollHeight - destElm.clientHeight) * scrollPercent;
              this.isPreviewScrollLocked && clearTimeout(this.isPreviewScrollLocked);
              this.isPreviewScrollLocked = setTimeout(() => {
                  this.isPreviewScrollLocked = false;
                }, 500);
              break;
          }
        }, 16, {
          leading: true,
          trailing: true
        });
      },
      // 切换状态
      toggleAppStatus (status) {
        this.status = status;
      },
      // 代码主题改变回调
      codeThemeChangedHandler (codeTheme) {
        codeThemeChanger.update(codeTheme);
      },
      // 编辑器内容变化回调
      editorContentChangedHandler (editorContent) {
        console.log('编辑器内容变化回调');
        this.updatePreview(editorContent);
      },
      // 更新预览视图
      updatePreview (editorContent) {
        this.previewContent = converter.makeHtml(editorContent);
        // 等待 DOM 更新完毕
        Vue.nextTick(() => {
          PR.prettyPrint();

          this.scrollHandler(this.editorElm);
        });
      },
    },
    created () {
      this.$http.get('./demo.md', {
        params: { _t: +new Date() },
        responseType: 'text',
      }).then(rsp => {
        const demo = rsp.data;
        this.editorContent = demo;
      });
    },
    updated () {
      // const ulElms = document.querySelectorAll('#output > ul');
      // const olElms = document.querySelectorAll('#output > ol');
      // let ulWrapper = document.createElement('section');
      // let olWrapper = document.createElement('section');
      // if (ulElms.length > 0) {
      // }
    },
    mounted () {
      this.editorElm = this.$refs['input'];
      this.previewElm = this.$refs['output'];

      codeThemeChanger = new codeThemes({
        prefixUrl: './themes/',
        theme: this.codeTheme,
      });

      clipboard = new Clipboard(this.$refs['clipboarddBtn']);
      clipboard.on('success', (e) => {
        this.$weui.toast('复制成功', 1000);
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