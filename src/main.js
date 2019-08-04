import Vue from 'vue';
import App from './App.vue';

import moment from 'moment'

// 注册全局的过滤器
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
});

Vue.config.productionTip = false;

// 导入 ElementUI 模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入 base.less 样式
import './assets/css/base.less';

// 导入抽取的router
import router from './router/router'

// 4.挂载路由
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
