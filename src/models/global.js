import router from 'umi/router';
import { message } from 'antd';
import { logout, currentUser, login, editPassword } from 'services/global';
import STORAGE from 'utils/storage';

export default {
    namespace: 'global',
    state: {
        collapsed: false,
        loginStatus: undefined,
        currentUser: {},
        editPasswordModalVisible: false,
    },
    reducers: {
        changeCollapsed__(state, { payload }) {
            state.collapsed = payload;
        },
        changeLoginStatus__(state, { payload }) {
            state.loginStatus = payload;
        },
        changeCurrentUser__(state, { payload }) {
            state.currentUser = payload;
        },
        changeEditPasswordModalVisible__(state, { payload }) {
            state.editPasswordModalVisible = payload;
        },
    },
    effects: {
        * logout(action, { call, put }) {
            // 前端退出登录
            STORAGE.remove('api_token');
            yield put({ type: 'changeLoginStatus__', payload: false });
            yield put({ type: 'changeCurrentUser__', payload: {} });
            let query = {};
            if(window.location.pathname !== '/') {
                query.redirectURL = encodeURIComponent(window.location.href);
            }
            router.push({
                pathname: '/login',
                query,
            });
            // 服务端退出登录
            yield call(logout);
        },
        * currentUser(action, { call, put }) {
            const res = yield call(currentUser);
            yield put({ type: 'changeLoginStatus__', payload: true });
            yield put({type: 'changeCurrentUser__', payload: res.data});
        },
        * login({ payload }, { call, put }) {
            const res = yield call(login, payload);
            const { msg, data } = res;
            message.success(msg);
            STORAGE.put('api_token', data.api_token);
            yield put({ type: 'changeLoginStatus__', payload: true });
            const selfURLParams = new URL(window.location.href);
            let redirectURL = decodeURIComponent(selfURLParams.searchParams.get('redirectURL'));
            if(redirectURL && redirectURL !== 'null') {
                console.log(redirectURL);
                const redirectURLParams = new URL(redirectURL);
                if(selfURLParams.host === redirectURLParams.host) {
                    router.push(`${redirectURLParams.pathname}${redirectURLParams.search}`);
                } else {
                    window.location.href = redirectURL;
                }
            } else {
                router.push('/');
            }
        },
        * editPassword({ payload }, { call, put }) {
            const res = yield call(editPassword, payload);
            message.success(res.msg);
            yield put({ type: 'changeEditPasswordModalVisible__', payload: false });
        }
    }
}