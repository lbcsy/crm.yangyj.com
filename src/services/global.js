// eslint-disable-next-line
import { stringify  } from 'qs';
import request from 'utils/request';
import API from 'common/api';

export async function logout() {
    return request(API.LOGOUT, {
        method: 'PUT',
    });
}

export async function currentUser() {
    return request(API.CURRENT_USER);
}

export async function login(params) {
    return request(API.LOGIN, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}

export async function editPassword(params) {
    return request(API.EDIT_PASSWORD, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}