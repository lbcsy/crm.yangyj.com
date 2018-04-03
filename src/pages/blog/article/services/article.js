import { stringify  } from 'qs';
import request from 'utils/request';

export async function getList(params) {
    return request(`/api/admin/blog/article${params && '?' + stringify(params)}`);
}

export async function getDetail(id) {
    return request(`/api/admin/blog/article/${id}`);
}

export async function addDetail(params) {
    return request(`/api/admin/blog/article`, {
        method: 'POST',
        body: {
            ...params
        },
    });
}

export async function updateDetail(params) {
    return request(`/api/admin/blog/article/${params.id}`, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}

export async function delDetail(id) {
    return request(`/api/admin/blog/article/${id}`, {
        method: 'DELETE',
    });
}