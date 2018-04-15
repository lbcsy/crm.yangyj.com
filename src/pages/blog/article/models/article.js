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
            const { status, data, total } = yield call(getList, params);
            if(!status) {
                return false;
            }
            yield put({ type: 'changeTotal__', payload: total });
            yield put({ type: 'changeList__', payload: data });
        },
        * getDetail({ payload }, { call, put }) {
            yield put({ type: 'changeDetail__', payload: {} });
            if(!+payload) {
                return false;
            }
            const { status, data } = yield call(getDetail, payload);
            if(!status) {
                return false;
            }
            yield put({ type: 'changeDetail__', payload: data });
        },
        * addDetail({ payload }, { call }) {
            const { status, msg, data = {} } = yield call(addDetail, payload);
            if(!status) {
                return false;
            }
            message.success(msg);

            router.push(`/blog/article/detail/${data.id}`);
        },
        * updateDetail({ payload }, { call }) {
            const { status, msg } = yield call(updateDetail, payload);
            if(!status) {
                return false;
            }
            message.success(msg);

            router.push(`/blog/article/detail/${payload.id}`);
        },
        * delDetail({ payload, location, cb }, { call, put, select }) {
            const { status, msg } = yield call(delDetail, payload);
            if(!status) {
                return false;
            }
            message.success(msg);

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