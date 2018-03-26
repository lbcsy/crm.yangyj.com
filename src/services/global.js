// eslint-disable-next-line
import { stringify  } from 'qs';
import request from '../utils/request';

export async function fetchLogout() {
    return request('/api/admin/logout', {
        method: 'POST',
    });
}

export async function fetchCurrentUser() {
    return request('/api/admin/currentUser');
}

export async function fetchLogin(params) {
    return request('/api/admin/login', {
        method: 'POST',
        body: {
            ...params
        },
    });
}

export async function fetchEditPassword(params) {
    return request('/api/admin/editPassword', {
        method: 'POST',
        body: {
            ...params
        },
    });
}