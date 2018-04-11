export default {
    // hashHistory: true,
    disableDynamicImport: true,
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
                    let newPath = path.replace('_', "?");
                    return {
                        ...item,
                        path: newPath,
                    }
                });
            }
        }],
    ],
    loading: './src/components/PageLoading',
};