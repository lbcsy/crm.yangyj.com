import { stringify  } from 'qs';
import request from 'utils/request';

export async function getArticleList(params) {
    return request(`/api/admin/blog/article${params && '?' + stringify(params)}`);
}

export async function getArticleDetail(id) {
    return request(`/api/admin/blog/article/${id}`);
}

export async function addArticleDetail(params) {
    return request(`/api/admin/blog/article`, {
        method: 'POST',
        body: {
            ...params
        },
    });
}

export async function updateArticleDetail(params) {
    return request(`/api/admin/blog/article/${params.id}`, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}

export async function delArticleDetail(id) {
    return request(`/api/admin/blog/article/${id}`, {
        method: 'DELETE',
    });
}