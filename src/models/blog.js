import { getList, getDetail, addDetail, saveDetail, delDetail, } from 'services/blog';
import router from "umi/router";
import { message } from 'antd';

export default {
    namespace: 'blog',
    state: {
        page: 1,
        size: 10,
        total: 0,
        list: [],
        detail: {},
    },
    reducers: {
        changePage__(state, { payload }) {
            return {
                ...state,
                page: +payload,
            }
        },
        changeSize__(state, { payload }) {
            return {
                ...state,
                size: +payload,
            }
        },
        changeTotal__(state, { payload }) {
            return {
                ...state,
                total: +payload,
            }
        },
        changeData__(state, { payload }) {
            return {
                ...state,
                list: payload,
            }
        },
        changeDetail__(state, { payload }) {
            return {
                ...state,
                detail: payload,
            }
        },
    },
    effects: {
        * getList({ payload }, { call, put, select }) {
            const state = yield select(state => state);
            const { blog } = state;
            const params = {
                page: blog.page,
                size: blog.size,
                ...payload,
            };
            if(params.page) {
                yield put({ type: 'changePage__', payload: params.page });
            }
            if(params.size) {
                yield put({ type: 'changeSize__', payload: params.size });
            }
            const res = yield call(getList, params);
            if(+res.code < 0) {
               return false;
            }
            yield put({ type: 'changeTotal__', payload: res.total });
            yield put({ type: 'changeData__', payload: res.data });
        },
        * getDetail({ payload }, { call, put }) {
            yield put({ type: 'changeDetail__', payload: {} });
            if(!+payload) {
                return false;
            }
            const res = yield call(getDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            yield put({ type: 'changeDetail__', payload: res.data });
        },
        * addDetail({ payload }, { call, put }) {
            const res = yield call(addDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            message.success(res.message);

            router.push(`/blog/detail/${res.data.id}`);
        },
        * saveDetail({ payload }, { call, put }) {
            const res = yield call(saveDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            message.success(res.message);

            router.push(`/blog/detail/${payload.id}`);
        },
        * delDetail({ payload, location, cb }, { call, put, select }) {
            const res = yield call(delDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            message.success(res.message);

            if(location) {
                const state = yield select(state => state);
                const { blog } = state;
                const { list } = blog;
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
                            page: blog.page-1 || 1,
                            t: new Date().getTime(),
                        },
                    });
                }
                yield put({ type: 'changeData__', payload: newData });
            }

            if(cb) {
                cb();
            }
        }
    }
}