import router from 'umi/router';
import {message} from 'antd';
import {currentUser, editPassword, login, logout} from 'services/global';
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
    changeCollapsed__(state, {payload}) {
      state.collapsed = payload;
    },
    changeLoginStatus__(state, {payload}) {
      state.loginStatus = payload;
    },
    changeCurrentUser__(state, {payload}) {
      state.currentUser = payload;
    },
    changeEditPasswordModalVisible__(state, {payload}) {
      state.editPasswordModalVisible = payload;
    },
  },
  effects: {
    * logout(action, {call, put}) {
      // 服务端退出登录
      yield call(logout);

      // 前端退出登录
      STORAGE.remove('access_token');
      yield put({type: 'changeLoginStatus__', payload: false});
      yield put({type: 'changeCurrentUser__', payload: {}});
      let query = {};
      if (window.location.pathname !== '/') {
        query.redirectURL = encodeURIComponent(window.location.href);
      }
      router.push({
        pathname: '/login',
        query,
      });
    },
    * currentUser(action, {call, put}) {
      const response = yield call(currentUser);
      if (response.status !== 'success') {
        return false;
      }
      yield put({type: 'changeLoginStatus__', payload: true});
      yield put({type: 'changeCurrentUser__', payload: response.data});
    },
    * login({payload}, {call, put}) {
      const response = yield call(login, payload);
      if (response.status !== 'success') {
        return false;
      }
      message.success(response.message);

      STORAGE.put('access_token', response.data.access_token);
      yield put({type: 'changeLoginStatus__', payload: true});
      const selfURLParams = new URL(window.location.href);
      let redirectURL = decodeURIComponent(
          selfURLParams.searchParams.get('redirectURL'));
      if (redirectURL && redirectURL !== 'null') {
        console.log(redirectURL);
        const redirectURLParams = new URL(redirectURL);
        if (selfURLParams.host === redirectURLParams.host) {
          router.push(
              `${redirectURLParams.pathname}${redirectURLParams.search}`);
        } else {
          window.location.href = redirectURL;
        }
      } else {
        router.push('/');
      }
    },
    * editPassword({payload}, {call, put}) {
      const response = yield call(editPassword, payload);
      if (response.status !== 'success') {
        return false;
      }
      message.success(response.message);
      yield put({type: 'changeEditPasswordModalVisible__', payload: false});
    },
  },
};