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
import users from '../views/users.vue'; // 用户管理-user组件
import roles from '../views/roles.vue'; // 权限管理-roles组件
import rights from '../views/rights.vue'; // 权限管理-rights组件
import goods from '../views/goods.vue'; // 商品管理-rights组件
import categories from '../views/categories.vue'; // 商品管理-categories组件
import orders from '../views/orders.vue'; // 订单管理-orders组件
import bread from '../components/bread.vue'; // 面包屑导航组件
// 注册成全局组件
Vue.component('bread', bread);

// 2.配置路由规则
const routes = [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
        path: '/index',
        component: index,
        // 设置路由元信息
        meta: { isLogin: true },
        // 子路由
        children: [
            { path: '/users', component: users },
            { path: '/roles', component: roles },
            { path: '/rights', component: rights },
            { path: '/goods', component: goods },
            { path: '/categories', component: categories },
            { path: '/orders', component: orders },
        ]
    },
];


// 3.实例化路由对象
const router = new VueRouter({
    routes
});

// 4.注册全局导航守卫 判断登录
router.beforeEach((to, from, next) => {
    // 检查路由元信息
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