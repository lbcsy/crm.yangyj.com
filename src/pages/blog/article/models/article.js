import { getList, getDetail, addDetail, updateDetail, delDetail, } from '../services/article';
import router from "umi/router";
import { message } from 'antd';

export default {
    namespace: 'blogArticle',
    state: {
        page: 1,
        size: 10,
        total: 0,
        list: [],
        detail: {},
    },
    reducers: {
        changePage__(state, { payload }) {
            state.page = +payload;
        },
        changeSize__(state, { payload }) {
            state.size = +payload;
        },
        changeTotal__(state, { payload }) {
            state.total = +payload;
        },
        changeList__(state, { payload }) {
            state.list = payload;
        },
        changeDetail__(state, { payload }) {
            state.detail = payload;
        },
    },
    effects: {
        * getList({ payload }, { call, put, select }) {
            yield put({ type: 'changeList__', payload: {} });
            const state = yield select(state => state);
            const { blogArticle } = state;
            const params = {
                page: blogArticle.page,
                size: blogArticle.size,
                ...payload,
            };
            if(params.page) {
                yield put({ type: 'changePage__', payload: params.page });
            }
            if(params.size) {
                yield put({ type: 'changeSize__', payload: params.size });
            }
            const response = yield call(getList, params);
            if(response.status === 'error') {
                return false;
            }
            yield put({ type: 'changeTotal__', payload: response.total });
            yield put({ type: 'changeList__', payload: response.data });
        },
        * getDetail({ payload }, { call, put }) {
            yield put({ type: 'changeDetail__', payload: {} });
            if(!+payload) {
                return false;
            }
            const response = yield call(getDetail, payload);
            if(response.status === 'error') {
                return false;
            }
            yield put({ type: 'changeDetail__', payload: response.data });
        },
        * addDetail({ payload }, { call }) {
            const response = yield call(addDetail, payload);
            if(response.status === 'error') {
                return false;
            }
            message.success(response.message);

            router.push(`/blog/article/detail/${response.data.id}`);
        },
        * updateDetail({ payload }, { call }) {
            const response = yield call(updateDetail, payload);
            if(response.status === 'error') {
                return false;
            }
            message.success(response.message);

            router.push(`/blog/article/detail/${payload.id}`);
        },
        * delDetail({ payload, location, cb }, { call, put, select }) {
            const response = yield call(delDetail, payload);
            if(response.status === 'error') {
                return false;
            }
            message.success(response.message);

            if(location) {
                const state = yield select(state => state);
                const { blogArticle } = state;
                const { list } = blogArticle;
                let newData = [];
                list.map(item => {
                    if(+item.id !== payload) {
                        newData.push(item);
                    }
                    return false;
                });
                if(!newData.length) {
                    router.push({
                        pathname: location.pathname,
                        query: {
                            ...location.query,
                            page: blogArticle.page-1 || 1,
                            t: new Date().getTime(),
                        },
                    });
                }
                yield put({ type: 'changeList__', payload: newData });
            }

            if(cb) {
                cb();
            }
        }
    }
}