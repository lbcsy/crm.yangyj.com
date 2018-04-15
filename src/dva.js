// eslint-disable-next-line
import router from "umi/router";

export function config() {
    return {
        onError(err, dispatch) {
            err.preventDefault();

            const status = err.name;

            if (status === 401) {
                dispatch({
                    type: 'global/logout',
                });
            }
            // if (status === 403) {
            //     router.push('/403');
            // }
            // if (status <= 504 && status >= 500) {
            //     router.push('/500');
            // }
            // if (status >= 404 && status < 422) {
            //     router.push('/404');
            // }
        },
    };
};