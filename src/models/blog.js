import { getArticleList, getArticleDetail, addArticleDetail, updateArticleDetail, delArticleDetail, } from 'services/blog';
import router from "umi/router";
import { message } from 'antd';

export default {
    namespace: 'blog',
    state: {
        article: {
            page: 1,
            size: 10,
            total: 0,
            list: [],
            detail: {},
        }
    },
    reducers: {
        changeArticlePage__(state, { payload }) {
            return {
                ...state,
                article: {
                    ...state.article,
                    page: +payload,
                },
            }
        },
        changeArticleSize__(state, { payload }) {
            return {
                ...state,
                article: {
                    ...state.article,
                    size: +payload,
                },
            }
        },
        changeArticleTotal__(state, { payload }) {
            return {
                ...state,
                article: {
                    ...state.article,
                    total: +payload,
                },
            }
        },
        changeArticleList__(state, { payload }) {
            return {
                ...state,
                article: {
                    ...state.article,
                    list: payload,
                },
            }
        },
        changeArticleDetail__(state, { payload }) {
            return {
                ...state,
                article: {
                    ...state.article,
                    detail: payload,
                },
            }
        },
    },
    effects: {
        * getArticleList({ payload }, { call, put, select }) {
            yield put({ type: 'changeArticleList__', payload: {} });
            const state = yield select(state => state);
            const { blog } = state;
            const { article } = blog;
            const params = {
                page: article.page,
                size: article.size,
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
                const { blog } = state;
                const { article } = blog;
                const { list } = article;
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
                            page: article.page-1 || 1,
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