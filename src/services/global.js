// eslint-disable-next-line
import { stringify  } from 'qs';
import request from '../utils/request';

export async function logout() {
    return request('/api/admin/logout', {
        method: 'PUT',
    });
}

export async function currentUser() {
    return request('/api/admin/currentUser');
}

export async function login(params) {
    return request('/api/admin/login', {
        method: 'PUT',
        body: {
            ...params
        },
    });
}

export async function editPassword(params) {
    return request('/api/admin/editPassword', {
        method: 'PUT',
        body: {
            ...params
        },
    });
}