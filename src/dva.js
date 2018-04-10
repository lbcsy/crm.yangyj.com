import { message } from 'antd';

export function config() {
    return {
        onError(err, dispatch) {
            err.preventDefault();

            message.error(err.message || '系统故障');

            const code = err.code;

            if(code === -1001) {
                dispatch({
                    type: 'global/logout',
                });
            }

        },
    };
};