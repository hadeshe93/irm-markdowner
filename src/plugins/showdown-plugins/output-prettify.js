import showdown from 'showdown';

showdown.extension('output-prettify', function () {
  return [{
    type:   'output',
    filter: function (source) {
      // 给 code 元素外层的 p 标签加点样式
      source = source.replace(/<p>(.*)<\/p>/gi, function (match, pre) {
        if(pre && pre.indexOf('<code') > -1){
          return '<p class="mt5 mb5">' + pre + '</p>';
        } else {
          return '<p>' + pre + '</p>';
        }
      });

      // 给 table 加一层外衣，便于重载样式
      source = source.replace(/<table>([.\s\S]*)<\/table>/gi, function (match, pre) {
        if(pre){
          return '<section class="table-wrapper"><table>' + pre + '</table></section>';
        }
      });

      // 给 ul 加一层外衣，便于重载样式
      // 微信公众号也不支持多层嵌套，最多两层
      source = source.replace(/<ul>([\s\S]*?)<\/ul>/gi, function (match, pre) {
        if (pre) {
          return '<section class="ul-wrapper"><ul>' + pre + '</ul></section>';
        }
      });

      // 给 ol 加一层外衣，便于重载样式
      // 微信公众号也不支持多层嵌套，最多两层
      source = source.replace(/<ol>([\s\S]*?)<\/ol>/gi, function (match, pre) {
        if (pre) {
          return '<section class="ol-wrapper"><ol>' + pre + '</ol></section>';
        }
      });

      // 将 a 替换成 span，因为 a 在公众号文章里也会被转化掉
      source = source.replace(/<a [\s\S]*?>([\s\S]*?)<\/a>/gi, function (match, pre) {
        if (pre) {
          return '<span class="text-link">' + pre + '</span>';
        }
      });

      // 给所有的 pre 和 code 元素加上 prettyprint 样式，让其能被 google/code-prettify 插件自动高亮
      source = source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
        if (pre) {
          return '<pre class="prettyprint linenums" style="font-size:12px;"><code' + codeClass + ' style="font-size:12px;">';
        } else {
          return ' <code class="prettyprint code-in-text" style="font-size:12px;">';
        }
      });

      // 给 pre 里面的内容加一层父容器
      source = source.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/gi, function (match, preClass, content) {
        return '<pre '+ preClass +'><section class="pre-content">'+ content +'</section></pre>';
      });

      return source;
    }
  }];
});

