// eslint-disable-next-line
import { stringify  } from 'qs';
import request from '../utils/request';

export async function fetchLogout() {
    return request('/api/admin/logout');
}

export async function fetchCurrentUser() {
    return request('/api/admin/currentUser');
}