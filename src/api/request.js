/*
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 17:23:02
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-11-29 15:21:34
 * @FilePath: \vue3-project\src\api\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import config from './config';
import store from '@/store';
import Cookies from 'js-cookie';

const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

const request = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: true,
});

// Add a request interceptor
request.interceptors.request.use(
    (config) => {
        // Modify headers here if needed
        config.headers['Content-Type'] = 'application/json';
        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        // Dynamically set the token
        const token = store.state.token || Cookies.get('token');
        if (token) {
            config.headers['token'] = token;
        }

        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
request.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

export default request;