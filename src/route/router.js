// 导入 vue
import Vue from 'vue';

// 1.导入 vue-router 模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入element-ui
import { Message } from 'element-ui';

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

// 注册全局导航守卫 判断登录
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('index') != -1) {
        // 判断sessionStorage中是否有token
        if (window.sessionStorage.getItem("token")) {
            next();
        } else {
            Message.error("请先登录");
            // 编程式导航到首页
            router.push("/login");
        }
    } else {
        next()
    }
});

// 4.导出 router
export default router;