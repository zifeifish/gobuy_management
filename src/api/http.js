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

// 查询用户列表 users
http.users = ({ query, pagenum, pagesize }) => {
    return http.get('users', {
        params: {
            query,
            pagenum,
            pagesize
        }
    })
};

// 添加用户
http.addUsers = ({ username, password, email, mobile }) => {
    return http.post('users', {
        username,
        password,
        email,
        mobile,
    })
};

// 根据id查询用户信息 users/id
http.editUsers = (id) => {
    return http.get('users/' + id);
};

// 编辑用户提交 users/id
http.putEditUsers = (id, { email, mobile }) => {
    return http.put('users/' + id, {
        email,
        mobile
    });
};

// 删除用户 users/id
http.deleteUsers = (id) => {
    return http.delete('users/' + id);
};

// 角色列表 roles
http.rolesList = () => {
    return http.get('roles');
};

// 根据id 查询角色 roles/id
http.idRole = (id) => {
    return http.get('roles/' + id);
};

// 分配用户角色 users/:id/role
http.setRole = (id, rid) => {
    return http.put(`users/${id}/role`, {
        rid
    });
};

// 分配用户角色 users/:id/role
http.setRole = (id, rid) => {
    return http.put(`users/${id}/role`, {
        rid
    });
};

// 删除角色指定权限 请求路径：roles/:roleId/rights/:rightId
http.delRoleRight = (roleId, rightId) => {
    return http.delete(`roles/${roleId}/rights/${rightId}`);
};

// 角色授权 请求路径：roles/:roleId/rights
http.setRoleRight = ({roleId, rids}) => {
    return http.post(`roles/${roleId}/rights`, {
        rids:rids
    });
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
