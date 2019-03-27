import showdown from 'showdown';

// blockquote 组件
showdown.extension('language-blockquote', function () {
    return [{
      type: 'language',
      filter (source) {
        // 提示
        source = source.replace(/::: tip(.*)[\n\r]([\s\S]*?):::/g, function (match, type, content) {
            type = type.trim() || 'TIP';
            return '<blockquote class="tip"><section class="blockquote-title">'+ type +'</section>' + content + '</blockquote>'
        });

        // 警告
        source = source.replace(/::: warn(.*)[\n\r]([\s\S]*?):::/g, function (match, type, content) {
            type = type.trim() || 'WARN';
            return '<blockquote class="warn"><section class="blockquote-title">'+ type +'</section>' + content + '</blockquote>'
        });

        // 危险
        source = source.replace(/::: danger(.*)[\n\r]([\s\S]*?):::/g, function (match, type, content) {
            type = type.trim() || 'DANGER';
            return '<blockquote class="danger"><section class="blockquote-title">'+ type +'</section>' + content + '</blockquote>'
        });

        return source;
      },
    }];
  });