import { fetchList } from 'services/blog';

export default {
    namespace: 'blog',
    state: {
        page: 1,
        size: 10,
        total: 0,
        data: [],
    },
    reducers: {
        changePage__(state, { payload }) {
            return {
                ...state,
                page: parseInt(payload, 10),
            }
        },
        changeSize__(state, { payload }) {
            return {
                ...state,
                size: parseInt(payload, 10),
            }
        },
        changeTotal__(state, { payload }) {
            return {
                ...state,
                total: parseInt(payload, 10),
            }
        },
        changeData__(state, { payload }) {
            return {
                ...state,
                data: payload,
            }
        },
    },
    effects: {
        * fetchList({ payload }, { call, put, select }) {
            const blog = yield select(state => state.blog);
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
            const res = yield call(fetchList, params);
            if(res.code < 0) {
               return false;
            }
            yield put({ type: 'changeTotal__', payload: res.total });
            yield put({ type: 'changeData__', payload: res.data });
        }
    }
}