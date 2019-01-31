import axios from 'axios';

// 所有 api 请求均在该域名下
axios.defaults.baseURL = '';
// 请求超时时间
axios.defaults.timeout = 5000;
// POST 请求的默认 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(error);
});

/**
 * 设置响应拦截器
 */
axios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    console.error('网络错误，请联系系统管理员~');
    return Promise.reject(error);
});

export default axios;