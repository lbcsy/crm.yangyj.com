import fetch from 'dva/fetch';
// eslint-disable-next-line
import { notification, message } from 'antd';

async function checkResponse(response) {
    const data = await response.json();
    const code = +data.code;
    if(code >= 0) {
        return {
            ...data,
            code: +data.code,
        };
    }
    const err = data.msg || '系统故障';
    const error = new Error(err);
    error.code = data.code;
    error.response = response;
    throw error;
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
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                ...newOptions.headers,
            };
        }
    }

    let baseUrl;
    baseUrl = url;
    // const baseUrl = `http://api.zentrust.cn${url}`;
    baseUrl = `http://dev.yangyj.com${url}`;

    return fetch(baseUrl, newOptions)
        .then(checkResponse);
}