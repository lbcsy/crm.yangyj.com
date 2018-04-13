import fetch from 'dva/fetch';
import CONFIG from 'common/config';
import storage from 'utils/storage';

async function checkResponse(response) {
    const data = await response.json();
    const code = data.code;
    if(code>=0) {
        return {
            ...data,
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
    let newOptions = { ...defaultOptions, ...options };

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
            ...newOptions.headers,
        };
    }

    const apiToken = storage.get('api_token');
    if(apiToken) {
        newOptions.headers.Authorization = `Bearer ${apiToken}`;
    }

    return fetch(`${CONFIG.BASE_URL}${url}`, newOptions)
        .then(checkResponse);
}