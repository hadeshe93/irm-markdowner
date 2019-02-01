import showdown from 'showdown';

showdown.extension('list', function () {
  return [{
    type:   'output',
    filter: function (source) {
      source = source.replace(/<p>(.*)<\/p>/gi, function (match, pre) {
        if(pre && pre.indexOf('<code') > -1){
          return '<p class="mt5 mb5">' + pre + '</p>';
        } else {
          return '<p>' + pre + '</p>';
        }
      });

      source = source.replace(/<table>([.\s\S]*)<\/table>/gi, function (match, pre) {
        if(pre){
          return '<section class="table-wrapper"><table>' + pre + '</table></section>';
        }
      });

      source = source.replace(/<li>(.*)<\/li>/gi, function (match, pre) {
        if(pre){
          return '<p class="list-item"><span class="list-item-prefix"></span>' + pre + '</p>';
        }
      });

      source = source.replace(/<ul>([.\s\S]*)<\/ul>/gi, function (match, pre) {
        if(pre){
          return '' + pre + '';
        }
      });

      return source;
    }
  }];
});
