import showdown from 'showdown';
import './showdown-plugins/output-prettify';
import './showdown-plugins/language-blockquote';

const converter = new showdown.Converter({
    /**
     * 扩展
     */
    extensions: [
        'output-prettify', 
        'language-blockquote'
    ],
    /**
     * Enable support for setting image dimensions from within markdown syntax
     * ![foo](foo.jpg =100x80)     simple, assumes units are in px
     * ![bar](bar.jpg =100x*)      sets the height to "auto"
     * ![baz](baz.jpg =80%x5em)  Image with width of 80% and height of 5em
     */
    parseImgDimensions: true,
    /**
     * Enable support for strikethrough syntax. 
     * ~~strikethrough~~ as <del>strikethrough</del>
     */
    strikethrough: true,
    /**
     * Enable support for GFM code block style.
     */
    // ghCodeBlocks: true,
    /**
     * Enable support for tables syntax
     */
    tables: true,
    /**
     * Enable support for GFM tasklists. 
     * - [x] This task is done
     * - [ ] This is still pending
     */
    tasklists: true,
    /**
     * Prevents weird effects in live previews due to incomplete input
     */
    // smoothLivePreview: true,
    /**
     * Parses line breaks as <br>, without needing 2 spaces at the end of the line (since v1.5.1)
     */
    // simpleLineBreaks: true,
    // completeHTMLDocument: true,
    /**
     * Enable emoji support. Ex: this is a :smile: emoji For more info on available emojis, see https://github.com/showdownjs/showdown/wiki/Emojis (since v.1.8.0)
     */
    emoji: true,
});

converter.setFlavor('github');

export default converter;