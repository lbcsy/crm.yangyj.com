import { delay } from 'roadhog-api-doc';
import config from './src/common/config';

const { apiPrefix } = config;

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
    [`${apiPrefix}/admin/logout`](req, res) {
        res.send({
            code: 0,
            message: '成功',
        })
    },
    [`${apiPrefix}/admin/login`](req, res) {
        const status = Math.round((Math.random()));
        if(status) {
            res.send({
                code: 0,
                message: '成功',
            })
        } else {
            res.send({
                code: -1,
                message: '登录失败',
            })
        }
    },
    [`${apiPrefix}/admin/currentUser`](req, res) {
        // const status = Math.round((Math.random()));
        res.send({
            code: 0,
            message: '成功',
            dataset: {
                id: 1,
                name: '杨圆建',
                avatar: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4',
            }
        })
    },
};

export default noProxy ? {} : delay(proxy, 1000);