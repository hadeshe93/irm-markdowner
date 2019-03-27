import showdown from 'showdown';

// 自动给文章加个尾部
showdown.extension('output-wechat-tail', function () {
  return [{
    type:   'output',
    filter: function (source) {
      source = source + 
        '<hr/>' + 
        '<p style="text-align:center;color:#999;font-size:13px;">' +
            '<img style="width:220px;" src="https://cdn.ironmaxi.com/images/upload/qrcode_2018.png" alt="微信公众号"/>'+ 
            '<br/>觉得本文不错的话，分享一下给小伙伴吧~' +
        '</p>';

      return source;
    }
  }];
});

