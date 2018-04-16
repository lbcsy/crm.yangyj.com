export function config() {
    return {
        onError(err, dispatch) {
            err.preventDefault();

            const httpStatus = err.name;

            if(window.location.pathname === '/login') {
                return false;
            }

            if (httpStatus === 401) {
                dispatch({
                    type: 'global/logout',
                });
            }
        },
    };
};