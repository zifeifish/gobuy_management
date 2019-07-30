// 导入axios模块
import axios from 'axios';
// 导入vue
import Vue from 'vue'
// 导入router
import router from '../router/router'

// 多基地址设置
export const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/',
});

// 抽取 login
http.login = ({ username, password }) => {
    return http.post('login', {
        username,
        password
    })
};

// 抽取 menus
http.menus = () => {
    return http.get('menus')
};

// 抽取 rights
http.rights = () => {
    return http.get('rights/list')
};
// 抽取 用户列表 users
http.users = ({ query, pagenum, pagesize }) => {
    return http.get('users', {
        params: {
            query,
            pagenum,
            pagesize
        }
    })
};

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 请求头设置带token
    config.headers.Authorization = window.localStorage.token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 在响应数据中检查token是否有效 防止伪造token
    if (response.data.meta.status == 400 && response.data.meta.msg == '无效token') {
        // 提示还没有登录
        Vue.prototype.$message.error('抱歉~您还未登录,请先完成登录验证~');
        // 导航到登录页面
        router.push('/login');
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
