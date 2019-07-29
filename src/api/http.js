// 导入axios模块
import axios from 'axios';

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
    return http.get('menus',
        {
            // 设置请求头
            headers: {
                'Authorization': window.localStorage.token,
            }
        }
    )
};
