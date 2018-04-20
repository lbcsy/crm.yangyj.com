import { stringify  } from 'qs';
import REQUEST from 'utils/request';
import API from 'common/api';

export async function getList(params) {
    return REQUEST(`${API.BLOG_ARTICLE}${params && '?' + stringify(params)}`);
}

export async function getDetail(id) {
    return REQUEST(`${API.BLOG_ARTICLE}/${id}`);
}

export async function addDetail(params) {
    return REQUEST(`${API.BLOG_ARTICLE}`, {
        method: 'POST',
        body: {
            ...params
        },
    });
}

export async function updateDetail(params) {
    return REQUEST(`${API.BLOG_ARTICLE}/${params.id}`, {
        method: 'PUT',
        body: {
            ...params
        },
    });
}

export async function delDetail(id) {
    return REQUEST(`${API.BLOG_ARTICLE}/${id}`, {
        method: 'DELETE',
    });
}