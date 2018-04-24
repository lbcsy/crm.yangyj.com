export default {
    // hashHistory: true,
    disableDynamicImport: true,
    disableServiceWorker: true,
    disableFastClick: true,
    plugins: [

        ['umi-plugin-dva', { immer: true}],
        ['umi-plugin-routes', {
            // 排除相关路由
            exclude: [
                ({ path, exact, component }) => /components|models|services/.test(component),
            ],
            update(routes) {
                return routes.map(item => {
                    const { path } = item;
                    return {
                        ...item,
                        path: path && path.split('/').map(path => path.replace(/\:$/, '?')).join('/'),
                    }
                });
            }
        }],
    ],
    loading: './src/components/Loading',
};