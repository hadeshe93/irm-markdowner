;(function(){
  function excuteResponsive(config){
    var isEffective = false;
    var DEFAULT_CONFIG = {};
    DEFAULT_CONFIG.DRAFT_WIDTH = 750;
    DEFAULT_CONFIG.UNIT_PX = 100;
    DEFAULT_CONFIG.MIN_WIDTH = 480;
    DEFAULT_CONFIG.MAX_WIDTH = 750;
    DEFAULT_CONFIG.COMMON_FONTSIZE = 14;
    DEFAULT_CONFIG.CAN_SYNC_BODY_FONTSIZE = true;
  
    if (typeof config === 'boolean' ){
      if (config) {
        config = DEFAULT_CONFIG;
        isEffective = true;
      } else {
        isEffective = false;
      }
    } else if (config instanceof Object) {
      var temp = {};
      for (var key in DEFAULT_CONFIG) {
        if (DEFAULT_CONFIG.hasOwnProperty(key)) {
          temp[key] = config[key] || DEFAULT_CONFIG[key];
        }
      }
      config = temp;
      isEffective = true;
    }
  
    if (!isEffective) return ;
  
    var DRAFT_WIDTH = config.DRAFT_WIDTH; //设计稿的设备像素宽，现为iPhone6的设备像素宽750px
    var SCALE = DRAFT_WIDTH / config.UNIT_PX; //设置 100px = 1rem 的转换规则
    var MIN_WIDTH = config.MIN_WIDTH;
    var MAX_WIDTH = config.MAX_WIDTH;
    var COMMON_FONTSIZE = config.COMMON_FONTSIZE;
    var CAN_SYNC_BODY_FONTSIZE = config.CAN_SYNC_BODY_FONTSIZE;
    var dpr = window.devicePixelRatio;
  
    var changeRootFontsize = function(){
      /* 设定：MIN_WIDTH <= deviceWidth <= MAX_WIDTH */
      var innerWidth = window.innerWidth * dpr;
      var deviceWidth = innerWidth > MAX_WIDTH ? MAX_WIDTH: (innerWidth < MIN_WIDTH ? MIN_WIDTH : innerWidth);
      var htmlElem = document.documentElement;
      var body = document.getElementsByTagName('body')[0];
      htmlElem.style.fontSize = deviceWidth / SCALE + 'px';
      /* 这段代码感觉可被参考，暂时不删 */
      // if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      //   /* Mobile or Tablet */
      //   htmlElem.style.fontSize = deviceWidth / SCALE + 'px';
      // }else {
      //   /* PC */
      //   htmlElem.style.fontSize = "100px";
      // }
      if (CAN_SYNC_BODY_FONTSIZE) {
        body.style.fontSize = COMMON_FONTSIZE/config.UNIT_PX + 'rem';
      }
    };
  
    if(document.addEventListener){
      document.addEventListener('DOMContentLoaded', function(){
        var head = document.documentElement.getElementsByTagName('head')[0];
        var vpMetas = document.documentElement.getElementsByTagName('meta');
        var vpMeta = null;
        var noVpMeta = false;
        for (var i=0; i<vpMetas.length; i++) {
          if (vpMetas[i]['name'] === 'viewport') {
            vpMeta = vpMetas[i]; break;
          }
        }
        if (!vpMeta) {
          noVpMeta = true;
          vpMeta = document.createElement('meta');
          vpMeta.setAttribute('name', 'viewport');
        }
        // vpMeta.setAttribute('content', 'width=device-width, initial-scale='+ 1/dpr +', maximum-scale='+ 1/dpr +', minimum-scale='+ 1/dpr +' user-scalable=0');
        vpMeta.setAttribute('content', 'width=device-width, initial-scale='+ 1 +', maximum-scale='+ 1 +', minimum-scale='+ 1 +' user-scalable=no');
        if (noVpMeta) {
          head.appendChild(vpMeta);
        }
        changeRootFontsize();
      }, false);
    }
    window.onresize = function(){
      changeRootFontsize();
    }
  }

  var html = document.documentElement;
  html.style="display: none";
  excuteResponsive({});
  html.style="";
})();