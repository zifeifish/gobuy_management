// 导入 vue
import Vue from 'vue';

// 1.导入 vue-router 模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入element-ui  Message
import { Message } from 'element-ui';

// 1.注册组件
import login from '../views/login.vue'; // 登录组件
import index from '../views/index.vue'; // 后台组件
import user from '../views/user.vue'; // 用户管理-user组件

// 2.配置路由规则
const routes = [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
        path: '/index',
        component: index,
        meta: { isLogin: true },
        children:[
            {path:'/user',component:user}
        ]
    },
];


// 3.实例化路由对象
const router = new VueRouter({
    routes
});

// 4.注册全局导航守卫 判断登录
router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        // 判断localStorage中是否有token
        if (window.localStorage.getItem("token")) {
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

// 5.导出 router
export default router;