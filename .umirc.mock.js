import { delay } from 'roadhog-api-doc';
import config from './src/common/config';

const { apiPrefix } = config;

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
    [`${apiPrefix}/admin/logout`](req, res) {
        res.send({
            code: 0,
            message: '注销成功',
        })
    },
    [`${apiPrefix}/admin/currentUser`](req, res) {
        const status = Math.round((Math.random()));
        if(status) {
            res.send({
                code: 0,
                message: '已登录',
                dataset: {
                    id: 1,
                    name: '杨圆建',
                    avatar: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4',
                }
            })
        } else {
            res.status(401).send({
                code: -1,
                message: '未登录',
            })
        }
    },
};

export default noProxy ? {} : delay(proxy, 1000);