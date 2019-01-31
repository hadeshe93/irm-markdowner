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
        this.init(this.options);
    }

    init (options) {
        const head = document.querySelector('head');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = options.id;
        link.href = options.prefixUrl + options.theme;
        head.appendChild(link);
        this.link = link;
    }

    update (theme) {
        const options = this.options;
        this.link.href = options.prefixUrl + theme;
    }
}

/**
 * new CodeThemes({
 *  theme: <string>,
 *  id: <string>,
 *  prefixUrl: <string>,
 * });
 */

export default CodeThemes;