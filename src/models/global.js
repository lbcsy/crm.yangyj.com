
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

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
        changeLoginStatus(state, { payload }) {
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
        * fetchCurrentUser(action, { call, put, select }) {
            yield call(delay, 3000);
            // 登录失败代码
            // yield put({type: 'changeLoginStatus', payload: false});
            // 自动登录成功代码
            yield put({type: 'changeLoginStatus', payload: true});
            yield put({type: 'fetchCurrentUser__', payload: {
                    id: 1,
                    name: '杨圆建',
                    avatar: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4'
                }});
        }
    }
}