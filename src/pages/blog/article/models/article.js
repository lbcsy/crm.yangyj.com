import {
  addDetail,
  delDetail,
  getDetail,
  getList,
  saveDetail,
} from '../services/article';
import router from 'umi/router';
import {message} from 'antd';

export default {
  namespace: 'blog_article',
  state: {
    page: 1,
    size: 10,
    total: 0,
    list: [],
    detail: {},
  },
  reducers: {
    changePage__(state, {payload}) {
      state.page = +payload;
    },
    changeSize__(state, {payload}) {
      state.size = +payload;
    },
    changeTotal__(state, {payload}) {
      state.total = +payload;
    },
    changeList__(state, {payload}) {
      state.list = payload;
    },
    changeDetail__(state, {payload}) {
      state.detail = payload;
    },
  },
  effects: {
    * getList({payload}, {call, put, select}) {
      const state = yield select(state => state);
      const {blog_article} = state;
      const params = {
        page: blog_article.page,
        size: blog_article.size,
        ...payload,
      };
      if (params.page) {
        yield put({type: 'changePage__', payload: params.page});
      }
      if (params.size) {
        yield put({type: 'changeSize__', payload: params.size});
      }
      const response = yield call(getList, params);
      if (response.status !== 'success') {
        return false;
      }
      yield put({type: 'changeTotal__', payload: response.total || 0});
      yield put({type: 'changeList__', payload: response.data});
    },
    * getDetail({payload}, {call, put}) {
      if (!+payload) {
        return false;
      }
      const response = yield call(getDetail, payload);
      if (response.status !== 'success') {
        return false;
      }
      yield put({type: 'changeDetail__', payload: response.data});
    },
    * addDetail({payload}, {call}) {
      const response = yield call(addDetail, payload);
      if (response.status !== 'success') {
        return false;
      }
      message.success(response.message);

      router.push(`/blog/article/detail/${response.data.id}`);
    },
    * saveDetail({payload}, {call}) {
      const response = yield call(saveDetail, payload);
      if (response.status !== 'success') {
        return false;
      }
      message.success(response.message);

      router.push(`/blog/article/detail/${payload.id}`);
    },
    * delDetail({payload, location}, {call, put, select}) {
      const response = yield call(delDetail, payload);
      if (response.status !== 'success') {
        return false;
      }
      message.success(response.message);

      if (location) {
        const state = yield select(state => state);
        const {blog_article} = state;
        const {list} = blog_article;
        let newData = [];
        list.map(item => {
          if (+item.id !== payload) {
            newData.push(item);
          }
          return false;
        });
        if (!newData.length) {
          router.push({
            pathname: location.pathname,
            query: {
              ...location.query,
              page: blog_article.page - 1 || 1,
              t: new Date().getTime(),
            },
          });
        }
        yield put({type: 'changeList__', payload: newData});
      }

      return true;
    },
  },
};