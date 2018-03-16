import router from 'umi/router';
import { message } from 'antd';
import { fetchLogout, fetchCurrentUser, fetchLogin } from '../services/global';

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
            // 前端退出登录
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
            // 服务端退出登录
            yield call(fetchLogout);
        },
        * fetchCurrentUser(action, { call, put, select }) {
            const res = yield call(fetchCurrentUser);
            if(!res.code) {
                yield put({ type: 'changeLoginStatus__', payload: true });
                yield put({type: 'fetchCurrentUser__', payload: res.dataset});
            }
        },
        * fetchLogin({ payload }, { call, put, select }) {
            const res = yield call(fetchLogin, payload);
            if(!res.code) {
                message.success(res.message);
                yield put({ type: 'changeLoginStatus__', payload: true });
                const selfURLParams = new URL(window.location.href);
                let redirectURL = decodeURIComponent(selfURLParams.searchParams.get('redirectURL'));
                if(redirectURL) {
                    const redirectURLParams = new URL(redirectURL);
                    if(selfURLParams.host === redirectURLParams.host) {
                        router.push(`${redirectURLParams.pathname}${redirectURLParams.search}`);
                    } else {
                        window.location.href = redirectURL;
                    }
                } else {
                    router.push('/');
                }
            } else {
                message.error(res.message);
            }
        }
    }
}