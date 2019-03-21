function throttle (fn, wait) {
    let start = 0;
    let timer = null;
    return function () {
        let now = +new Date();
        const self = this;
        const args = Array.prototype.slice.call(arguments, 0);

        if (now - start >= wait) {
            start = now;
            fn.apply(self, args);
        } else {
            timer && window.clearTimeout(timer);
            timer = window.setTimeout(function(){
                fn.apply(self, args);
            }, wait);
        }
    };
}

export default {
    throttle
};