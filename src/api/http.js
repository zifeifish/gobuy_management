// 导入axios模块
import axios from 'axios';

// 多基地址设置
export const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/',
});

// 抽取axios
http.login = ({ username, password }) => {
    return http.post('login', {
        username,
        password
    })
}
