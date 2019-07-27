// 导入 vue
import Vue from 'vue';

// 1.导入 vue-router 模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 1.注册组件
import login from '../views/login.vue'; // 登录组件
import index from '../views/index.vue'; // 后台组件

// 2.配置路由规则
const routes = [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/index', component: index },
];

// 3.实例化路由对象
const router = new VueRouter({
    routes
});

// 4.导出 router
export default router;