import router from "umi/router";
import { message } from 'antd';

export default {
    onError(err, dispatch) {
        err.preventDefault();

        const status = err.name;

        if (status === 401) {
            message.error(err.message);

            dispatch({
                type: 'global/fetchLogout',
            });
            return;
        }
        if (status === 403) {
            router.push('/403');
            return;
        }
        if (status <= 504 && status >= 500) {
            router.push('/500');
            return;
        }
        if (status >= 404 && status < 422) {
            router.push('/404');
            return;
        }
        message.error(err.message);
    },
};