import router from 'umi/router';
import { fetchLogout, fetchCurrentUser } from '../services/global';

export default {
    namespace: 'global',
    state: {
        collapsed: false,
        loginStatus: undefined,
        currentUser: {},
    },
    reducers: {
        changeCollapsed__(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            }
        },
        changeLoginStatus__(state, { payload }) {
            return {
                ...state,
                loginStatus: payload,
            }
        },
        fetchCurrentUser__(state, { payload }) {
            return {
                ...state,
                currentUser: payload,
            }
        }
    },
    effects: {
        * fetchLogout(action, { call, put, select }) {
            // 退出登录
            yield call(fetchLogout);
            // 注销登录状态
            yield put({ type: 'changeLoginStatus__', payload: false });
            yield put({ type: 'fetchCurrentUser__', payload: {} });
            let query = {};
            if(window.location.pathname !== '/') {
                query.redirectURL = encodeURIComponent(window.location.href);
            }
            router.push({
                pathname: '/login',
                query,
            });
        },
        * fetchCurrentUser(action, { call, put, select }) {
            const res = yield call(fetchCurrentUser);
            if(!res.code) {
                yield put({ type: 'changeLoginStatus__', payload: true });
                yield put({type: 'fetchCurrentUser__', payload: res.dataset});
            }
        }
    }
}