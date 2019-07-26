import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 导入 vue-router 模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入 ElementUI 模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入 base.css 样式
import './assets/css/base.css';

// 1.注册组件
import login from './components/login.vue'; // 登录组件
import index from './components/index.vue'; // 后台组件

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

// 4.挂载路由
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
