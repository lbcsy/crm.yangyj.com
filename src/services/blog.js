import { stringify  } from 'qs';
import request from '../utils/request';

export async function getList(params) {
    return request(`/api/admin/blog${params && '?' + stringify(params)}`);
}

export async function getDetail(id) {
    return request(`/api/admin/blog/${id}`);
}

export async function delDetail(id) {
    return request(`/api/admin/blog/${id}`, {
        method: 'DELETE',
    });
}