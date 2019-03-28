const lcStorage = {
    set (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get (key) {
        let ret = null;
        try {
            ret = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },

    remove (key) {
        localStorage.removeItem(key);
    },

    clear (key) {
        localStorage.clear();
    }
};


export default lcStorage;