import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import CONFIG from 'common/config';
import STORAGE from 'utils/storage';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
async function checkResponse(response) {
    let res = await response.json();
    if (response.status >= 200 && response.status < 300) {
        if(res.status !== 'success') {
            message.error(res.message || '系统故障');
        }
        return res;
    }
    res.status = 'error';

    const errText = (codeMessage[response.status] || response.statusText) || res.message;
    notification.error({
        message: `请求错误 ${response.status}`,
        description: errText,
    });
    if(window.location.pathname !== '/login') {
        if(response.status === 401) {
            window.g_dispatch({
                type: 'global/logout',
            });
        }
    }
    return res;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    const defaultOptions = {
        // credentials: 'include',
        headers: {},
    };
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            newOptions.headers = {
                ...newOptions.headers,
            };
        }
    }

    const access_token = STORAGE.get('access_token');
    if(access_token) {
        newOptions.headers.Authorization = `Bearer ${access_token}`;
    }
    newOptions.headers.Accept = 'application/json';


    return fetch(`${CONFIG.BASE_URL}${url}`, newOptions)
        .then(checkResponse)
}