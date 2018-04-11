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
            const res = yield call(getList, params);
            yield put({ type: 'changeTotal__', payload: res.total });
            yield put({ type: 'changeList__', payload: res.data });
        },
        * getDetail({ payload }, { call, put }) {
            yield put({ type: 'changeDetail__', payload: {} });
            if(!+payload) {
                return false;
            }
            const res = yield call(getDetail, payload);
            yield put({ type: 'changeDetail__', payload: res.data });
        },
        * addDetail({ payload }, { call }) {
            const res = yield call(addDetail, payload);
            message.success(res.msg);

            router.push(`/blog/article/detail/${res.data.id}`);
        },
        * updateDetail({ payload }, { call }) {
            const res = yield call(updateDetail, payload);
            message.success(res.msg);

            router.push(`/blog/article/detail/${payload.id}`);
        },
        * delDetail({ payload, location, cb }, { call, put, select }) {
            const res = yield call(delDetail, payload);
            message.success(res.msg);

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