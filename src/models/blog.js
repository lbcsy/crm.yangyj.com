import { fetchList } from 'services/blog';

export default {
    namespace: 'blog',
    state: {
        data: [],
        paging: {
            page: 1,
            size: 0,
            total: 0,
        },
        detail: {},
    },
    reducers: {
        changePaging__(state, { payload }) {
            return {
                ...state,
                paging: payload,
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
        * fetchList({ payload }, { call, put }) {
            const res = yield call(fetchList, payload);
            if(res.code < 0) {
               return false;
            }
            yield put({ type: 'changePaging__', payload: res.paging });
            yield put({ type: 'changeData__', payload: res.data });
        }
    }
}