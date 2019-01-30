import '@ASSETS/style/index.styl';

import Vue from 'vue';
import App from '@VIEWS/App';

const appElm = document.getElementById('app');

const app = new Vue({
    render: (h) => h(App)
}).$mount(appElm);