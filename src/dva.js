import { message } from 'antd';

export function config() {
    return {
        onError(err, dispatch) {
            err.preventDefault();
            message.destroy();
            message.error(err.message);
        },
    };
};