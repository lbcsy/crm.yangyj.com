import { getArticleList, getArticleDetail, addArticleDetail, updateArticleDetail, delArticleDetail, } from '../services/article';
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
        changeArticlePage__(state, { payload }) {
            return {
                ...state,
                page: +payload,
            }
        },
        changeArticleSize__(state, { payload }) {
            return {
                ...state,
                size: +payload,
            }
        },
        changeArticleTotal__(state, { payload }) {
            return {
                ...state,
                total: +payload,
            }
        },
        changeArticleList__(state, { payload }) {
            return {
                ...state,
                list: payload,
            }
        },
        changeArticleDetail__(state, { payload }) {
            return {
                ...state,
                detail: payload,
            }
        },
    },
    effects: {
        * getArticleList({ payload }, { call, put, select }) {
            yield put({ type: 'changeArticleList__', payload: {} });
            const state = yield select(state => state);
            const { blogArticle } = state;
            const params = {
                page: blogArticle.page,
                size: blogArticle.size,
                ...payload,
            };
            if(params.page) {
                yield put({ type: 'changeArticlePage__', payload: params.page });
            }
            if(params.size) {
                yield put({ type: 'changeArticleSize__', payload: params.size });
            }
            const res = yield call(getArticleList, params);
            if(+res.code < 0) {
               return false;
            }
            yield put({ type: 'changeArticleTotal__', payload: res.total });
            yield put({ type: 'changeArticleList__', payload: res.data });
        },
        * getArticleDetail({ payload }, { call, put }) {
            yield put({ type: 'changeArticleDetail__', payload: {} });
            if(!+payload) {
                return false;
            }
            const res = yield call(getArticleDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            yield put({ type: 'changeArticleDetail__', payload: res.data });
        },
        * addArticleDetail({ payload }, { call }) {
            const res = yield call(addArticleDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            message.success(res.message);

            router.push(`/blog/article/detail/${res.data.id}`);
        },
        * updateArticleDetail({ payload }, { call }) {
            const res = yield call(updateArticleDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            message.success(res.message);

            router.push(`/blog/article/detail/${payload.id}`);
        },
        * delArticleDetail({ payload, location, cb }, { call, put, select }) {
            const res = yield call(delArticleDetail, payload);
            if(+res.code < 0) {
                return false;
            }
            message.success(res.message);

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
                yield put({ type: 'changeArticleList__', payload: newData });
            }

            if(cb) {
                cb();
            }
        }
    }
}