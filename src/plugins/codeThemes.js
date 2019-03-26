class CodeThemes {
    constructor (options) {
        const DEFAULT_OPTIONS = {
            theme: 'github',
            id: 'codeThemeId',
        };
        
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
        };
        this.link = null;
        this.patchStyle = null;
        this.init(this.options);
    }

    // 初始化
    init (options) {
        const head = document.querySelector('head');
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.id = options.id;
        link.href = options.prefixUrl + options.theme + '.css';

        head.appendChild(link);

        this.link = link;
    }

    // 更新
    update (theme) {
        const options = this.options;
        this.link.href = options.prefixUrl + theme + '.css';
    }
}

export default CodeThemes;
