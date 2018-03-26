// eslint-disable-next-line
import { stringify  } from 'qs';
import request from '../utils/request';

export async function fetchList(params) {
    return request(`/api/admin/blog${params && '?' + stringify(params)}`);
}