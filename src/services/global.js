// eslint-disable-next-line
import { stringify  } from 'qs';
import REQUEST from 'utils/request';
import API from 'common/api';

export async function logout() {
    return REQUEST(API.LOGOUT, {
        method: 'PUT',
    });
}

export async function currentUser() {
    return REQUEST(API.CURRENT_USER);
}

export async function login(params) {
    return REQUEST(API.LOGIN, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}

export async function editPassword(params) {
    return REQUEST(API.EDIT_PASSWORD, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}